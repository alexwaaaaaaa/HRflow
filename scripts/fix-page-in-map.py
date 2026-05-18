#!/usr/bin/env python3
"""
Fix script: removes <Page> from inside .map() callbacks and wraps the top-level return.

Usage:
  python3 scripts/fix-page-in-map.py <file-path>
  python3 scripts/fix-page-in-map.py --list   (list files with the problem)
"""

import sys
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def find_pages(directory):
    result = []
    for root, dirs, files in os.walk(directory):
        for f in files:
            if f == 'page.tsx':
                result.append(os.path.join(root, f))
    return result

def balance_parens(content, start):
    """Find the matching closing paren starting from 'start' (which should be '(')."""
    depth = 0
    i = start
    while i < len(content):
        if content[i] == '(':
            depth += 1
        elif content[i] == ')':
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return -1

def find_page_in_map(content):
    """
    Find if <Page> is inside a .map() callback.
    Returns (page_open_start, page_open_end, page_close_start, page_close_end) or None.
    """
    if '@/components/ui/Page' not in content:
        return None
    
    # Find all <Page occurrences
    page_match = re.search(r'<Page\s[\s\S]*?>', content)
    if not page_match:
        return None
    
    page_open_start = page_match.start()
    page_open_end = page_match.end()
    
    # Find the matching </Page>
    # Walk forward from page_open_start, counting <Page> and </Page>
    depth = 0
    i = page_open_start
    page_close_start = -1
    while i < len(content):
        if content[i:].startswith('<Page') and (len(content) <= i + 5 or content[i + 5] in ' \n\t>'):
            depth += 1
            i += 5
        elif content[i:].startswith('</Page>'):
            depth -= 1
            if depth == 0:
                page_close_start = i
                break
            i += 7
        else:
            i += 1
    
    if page_close_start == -1:
        return None
    
    page_close_end = page_close_start + len('</Page>')
    
    # Check if this <Page> is inside a .map() callback
    # by looking at what's before it
    before_page = content[:page_open_start]
    
    # Find the last 'return (' before <Page
    last_return_match = None
    for m in re.finditer(r'\breturn\s*\(', before_page):
        last_return_match = m
    
    if not last_return_match:
        return None
    
    last_return_start = last_return_match.start()
    
    # Check if this return is inside a .map() callback
    # by looking for .map( before this return that hasn't been closed
    before_return = before_page[:last_return_start]
    
    # Find the last .map( before the return
    # Find all .map( occurrences and take the last one
    map_positions = [m.start() for m in re.finditer(r'\.map\s*\(', before_return)]
    if not map_positions:
        return None
    
    last_map_pos = map_positions[-1]
    
    # Check if the .map( is still open between last_map_pos and last_return_start
    between = before_return[last_map_pos:] + before_page[last_return_start:]
    
    depth_brace = 0
    depth_paren = 0
    for ch in between:
        if ch == '{': depth_brace += 1
        elif ch == '}': depth_brace -= 1
        elif ch == '(': depth_paren += 1
        elif ch == ')': depth_paren -= 1
    
    # If we're still inside a callback (depth > 0), the return is inside the map
    if depth_brace <= 0 and depth_paren <= 0:
        return None
    
    return (page_open_start, page_open_end, page_close_start, page_close_end)

def fix_file(file_path):
    """Fix the Page placement in a file."""
    content = open(file_path).read()
    
    result = find_page_in_map(content)
    if not result:
        return False, "no Page-in-map problem found"
    
    page_open_start, page_open_end, page_close_start, page_close_end = result
    
    # Extract the Page opening tag
    page_open_tag = content[page_open_start:page_open_end]
    
    # Extract the inner content between <Page> and </Page>
    inner_content = content[page_open_end:page_close_start]
    
    # Remove the <Page> and </Page> from their current location
    # We need to handle the surrounding whitespace carefully
    
    # Find the line start before <Page>
    line_start = content.rfind('\n', 0, page_open_start) + 1
    # Find the line end after </Page>
    line_end = content.find('\n', page_close_end)
    if line_end == -1:
        line_end = len(content)
    else:
        line_end += 1  # include the newline
    
    # The content before the <Page> line (up to but not including the line)
    before_page_line = content[:line_start]
    # The content after the </Page> line
    after_page_line = content[line_end:]
    
    # Reconstruct without the Page wrapper
    without_page = before_page_line + inner_content + after_page_line
    
    # Now find the top-level return ( in the default export function
    export_match = re.search(r'export\s+default\s+function\s+\w+[^{]*\{', without_page)
    if not export_match:
        return False, "no export default function found"
    
    func_body_start = export_match.end()
    
    # Find all 'return (' occurrences after func_body_start
    # The top-level one has the smallest indentation
    best_idx = -1
    best_indent = float('inf')
    
    for m in re.finditer(r'\n([ \t]*)return\s*\(', without_page[func_body_start:]):
        indent_len = len(m.group(1))
        if indent_len <= best_indent:
            best_indent = indent_len
            best_idx = func_body_start + m.start() + 1  # position of 'return'
    
    if best_idx == -1:
        return False, "no top-level return found"
    
    # Find the opening paren of this return
    paren_offset = without_page.index('(', best_idx)
    
    # Balance parens
    close_paren = balance_parens(without_page, paren_offset)
    if close_paren == -1:
        return False, "could not balance parens"
    
    jsx_start = paren_offset + 1
    jsx_end = close_paren
    
    inner_jsx = without_page[jsx_start:jsx_end]
    
    # Wrap with <Page>
    wrapped_jsx = f"\n        {page_open_tag}\n{inner_jsx}\n        </Page>\n    "
    
    fixed_content = without_page[:jsx_start] + wrapped_jsx + without_page[jsx_end:]
    
    with open(file_path, 'w') as f:
        f.write(fixed_content)
    
    return True, "fixed"

def main():
    args = sys.argv[1:]
    
    if not args:
        print("Usage: python3 scripts/fix-page-in-map.py <file-path> | --list | --all")
        sys.exit(1)
    
    if args[0] == '--list':
        app_dir = os.path.join(ROOT, 'app/(app)')
        all_pages = find_pages(app_dir)
        problems = []
        for f in all_pages:
            try:
                content = open(f).read()
                if find_page_in_map(content):
                    problems.append(f)
            except:
                pass
        for p in sorted(problems):
            print(p.replace(ROOT + '/', ''))
        print(f'Total: {len(problems)}')
        return
    
    if args[0] == '--all':
        app_dir = os.path.join(ROOT, 'app/(app)')
        all_pages = find_pages(app_dir)
        files_to_process = []
        for f in all_pages:
            try:
                content = open(f).read()
                if find_page_in_map(content):
                    files_to_process.append(f)
            except:
                pass
    else:
        files_to_process = [args[0]]
    
    fixed = 0
    skipped = 0
    errors = 0
    
    for file_path in files_to_process:
        try:
            success, msg = fix_file(file_path)
            if success:
                print(f"  ✅ Fixed: {file_path.replace(ROOT + '/', '')}")
                fixed += 1
            else:
                print(f"  ⏭️  Skipped: {file_path.replace(ROOT + '/', '')} — {msg}")
                skipped += 1
        except Exception as e:
            print(f"  ❌ Error: {file_path.replace(ROOT + '/', '')}: {e}")
            errors += 1
    
    print(f"\nDone. Fixed: {fixed} | Skipped: {skipped} | Errors: {errors}")

if __name__ == "__main__":
    main()
