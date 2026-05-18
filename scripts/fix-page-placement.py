#!/usr/bin/env python3
"""
Fix script: moves <Page> from inside .map() callbacks to the top-level return.

The migrate-misc-bulk.mjs script sometimes inserts <Page> inside a .map()
callback's return() instead of the component's top-level return(). This
script detects and fixes that pattern.

Usage:
  python3 scripts/fix-page-placement.py <file-path>
  python3 scripts/fix-page-placement.py --all
"""

import sys
import os
import re
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def find_pages(directory):
    """Find all page.tsx files recursively."""
    result = []
    for root, dirs, files in os.walk(directory):
        for f in files:
            if f == "page.tsx":
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

def balance_jsx_tags(content, start, tag_name):
    """Find the matching closing tag for an opening tag at 'start'."""
    open_tag = f"<{tag_name}"
    close_tag = f"</{tag_name}>"
    depth = 0
    i = start
    while i < len(content):
        if content[i:].startswith(open_tag) and (len(content) <= i + len(open_tag) or content[i + len(open_tag)] in ' \n\t>'):
            depth += 1
            i += len(open_tag)
        elif content[i:].startswith(close_tag):
            depth -= 1
            if depth == 0:
                return i
            i += len(close_tag)
        else:
            i += 1
    return -1

def extract_page_props(content):
    """Extract the <Page ...> opening tag."""
    m = re.search(r'<Page\s[\s\S]*?>', content)
    if not m:
        return None, -1, -1
    return m.group(0), m.start(), m.end()

def find_top_level_return(content):
    """Find the top-level return ( in the default export function."""
    # Find the export default function
    m = re.search(r'export\s+default\s+function\s+\w+[^{]*\{', content)
    if not m:
        return -1, -1
    
    func_body_start = m.end()
    
    # Find all 'return (' occurrences after func_body_start
    # The top-level one has the smallest indentation
    best_idx = -1
    best_indent = float('inf')
    
    for m2 in re.finditer(r'\n([ \t]*)return\s*\(', content[func_body_start:]):
        indent_len = len(m2.group(1))
        if indent_len <= best_indent:
            best_indent = indent_len
            best_idx = func_body_start + m2.start() + 1  # position of 'return'
    
    if best_idx == -1:
        return -1, -1
    
    # Find the opening paren
    paren_offset = content.index('(', best_idx)
    
    # Balance parens
    close_paren = balance_parens(content, paren_offset)
    
    return paren_offset + 1, close_paren  # jsxStart, jsxEnd

def has_page_in_map_problem(content):
    """Check if <Page> is inside a .map() callback."""
    if "@/components/ui/Page" not in content:
        return False
    
    page_idx = content.find("<Page")
    if page_idx == -1:
        return False
    
    before_page = content[:page_idx]
    
    # Find the last 'return (' before <Page
    last_return = before_page.rfind("return (")
    if last_return == -1:
        return False
    
    # Check if there's a .map( between the last 'return (' and <Page
    # that hasn't been closed
    before_return = before_page[:last_return]
    
    # Look for .map( patterns
    map_patterns = ['.map((', '.map(d =>', '.map((d,', '.map((kpi', '.map((item',
                    '.map((row', '.map((plan', '.map((step', '.map((q,', '.map((opt',
                    '.map((tab', '.map((s,', '.map((t,', '.map((c,', '.map((e,',
                    '.map((n,', '.map((f,', '.map((m,', '.map((p,', '.map((r,',
                    '.map((v,', '.map((i,', '.map((j,', '.map((k,', '.map((l,',
                    '.map((a,', '.map((b,', '.map((g,', '.map((h,', '.map((u,',
                    '.map((val', '.map((dept', '.map((emp', '.map((user',
                    '.map((ticket', '.map((award', '.map((survey', '.map((event',
                    '.map((benefit', '.map((card', '.map((link', '.map((metric',
                    '.map((stat', '.map((doc', '.map((file', '.map((role',
                    '.map((team', '.map((goal', '.map((task', '.map((action',
                    '.map((phase', '.map((stage', '.map((level', '.map((type',
                    '.map((cat', '.map((tag', '.map((badge', '.map((chip',
                    '.map((filter', '.map((col', '.map((node', '.map((edge',
                    '.map((point', '.map((bar', '.map((line', '.map((area',
                    '.map((pie', '.map((slice', '.map((segment', '.map((section',
                    '.map((group', '.map((cluster', '.map((bucket', '.map((bin',
                    '.map((range', '.map((period', '.map((month', '.map((week',
                    '.map((day', '.map((hour', '.map((year', '.map((quarter',
                    '.map((cycle', '.map((sprint', '.map((milestone',
                    '.map((location', '.map((place', '.map((site', '.map((venue',
                    '.map((city', '.map((country', '.map((region', '.map((zone',
                    '.map((territory', '.map((district', '.map((province',
                    '.map((state', '.map((county', '.map((unit', '.map((floor',
                    '.map((room', '.map((desk', '.map((seat', '.map((position',
                    '.map((slot', '.map((spot', '.map((space',
                    '.map((sw,', '.map((tkt,', '.map((kpi,', '.map((d,',
                    '.map((w,', '.map((x,', '.map((y,', '.map((z,',
                    '.map((o,', '.map((q,', '.map((idx,', '.map((index,',
                    '.map((num,', '.map((el,', '.map((elem,', '.map((entry,',
                    '.map((obj,', '.map((data,', '.map((info,', '.map((detail,',
                    '.map((record,', '.map((result,', '.map((output,',
                    '.map((input,', '.map((value,', '.map((key,', '.map((id,',
                    '.map((name,', '.map((label,', '.map((title,', '.map((text,',
                    '.map((desc,', '.map((msg,', '.map((note,', '.map((comment,',
                    '.map((item,', '.map((list,', '.map((arr,', '.map((set,',
                    '.map((map,', '.map((dict,', '.map((hash,', '.map((tree,',
                    '.map((graph,', '.map((path,', '.map((route,', '.map((url,',
                    '.map((link,', '.map((href,', '.map((src,', '.map((img,',
                    '.map((icon,', '.map((logo,', '.map((avatar,', '.map((photo,',
                    '.map((image,', '.map((video,', '.map((audio,', '.map((file,',
                    '.map((doc,', '.map((pdf,', '.map((csv,', '.map((json,',
                    '.map((xml,', '.map((html,', '.map((css,', '.map((js,',
                    '.map((ts,', '.map((tsx,', '.map((jsx,', '.map((md,',
                    '.map((txt,', '.map((log,', '.map((err,', '.map((warn,',
                    '.map((info,', '.map((debug,', '.map((trace,', '.map((fatal,',
                    '.map((critical,', '.map((error,', '.map((warning,',
                    '.map((success,', '.map((failure,', '.map((pending,',
                    '.map((active,', '.map((inactive,', '.map((enabled,',
                    '.map((disabled,', '.map((visible,', '.map((hidden,',
                    '.map((open,', '.map((closed,', '.map((expanded,',
                    '.map((collapsed,', '.map((selected,', '.map((checked,',
                    '.map((unchecked,', '.map((focused,', '.map((blurred,',
                    '.map((hovered,', '.map((pressed,', '.map((released,',
                    '.map((dragged,', '.map((dropped,', '.map((resized,',
                    '.map((moved,', '.map((scrolled,', '.map((zoomed,',
                    '.map((rotated,', '.map((flipped,', '.map((mirrored,',
                    '.map((inverted,', '.map((reversed,', '.map((sorted,',
                    '.map((filtered,', '.map((grouped,', '.map((aggregated,',
                    '.map((summarized,', '.map((totaled,', '.map((averaged,',
                    '.map((counted,', '.map((ranked,', '.map((scored,',
                    '.map((rated,', '.map((weighted,', '.map((normalized,',
                    '.map((scaled,', '.map((transformed,', '.map((converted,',
                    '.map((formatted,', '.map((parsed,', '.map((serialized,',
                    '.map((deserialized,', '.map((encoded,', '.map((decoded,',
                    '.map((encrypted,', '.map((decrypted,', '.map((hashed,',
                    '.map((signed,', '.map((verified,', '.map((validated,',
                    '.map((sanitized,', '.map((escaped,', '.map((unescaped,',
                    '.map((trimmed,', '.map((padded,', '.map((truncated,',
                    '.map((wrapped,', '.map((unwrapped,', '.map((flattened,',
                    '.map((nested,', '.map((merged,', '.map((split,',
                    '.map((joined,', '.map((concatenated,', '.map((appended,',
                    '.map((prepended,', '.map((inserted,', '.map((deleted,',
                    '.map((updated,', '.map((replaced,', '.map((swapped,',
                    '.map((moved,', '.map((copied,', '.map((cloned,',
                    '.map((duplicated,', '.map((removed,', '.map((added,',
                    '.map((created,', '.map((destroyed,', '.map((initialized,',
                    '.map((reset,', '.map((cleared,', '.map((emptied,',
                    '.map((filled,', '.map((loaded,', '.map((unloaded,',
                    '.map((mounted,', '.map((unmounted,', '.map((rendered,',
                    '.map((unrendered,', '.map((shown,', '.map((hidden,',
                    '.map((displayed,', '.map((hidden,', '.map((visible,',
                    '.map((invisible,', '.map((transparent,', '.map((opaque,',
                    '.map((blurred,', '.map((focused,', '.map((highlighted,',
                    '.map((dimmed,', '.map((brightened,', '.map((darkened,',
                    '.map((lightened,', '.map((colored,', '.map((decolored,',
                    '.map((styled,', '.map((unstyled,', '.map((themed,',
                    '.map((unthemed,', '.map((animated,', '.map((unanimated,',
                    '.map((transitioned,', '.map((untransitioned,',
                    '.map((transformed,', '.map((untransformed,',
                    '.map((translated,', '.map((untranslated,',
                    '.map((rotated,', '.map((unrotated,', '.map((scaled,',
                    '.map((unscaled,', '.map((skewed,', '.map((unskewed,',
                    '.map((flipped,', '.map((unflipped,', '.map((mirrored,',
                    '.map((unmirrored,', '.map((inverted,', '.map((uninverted,',
                    '.map((reversed,', '.map((unreversed,', '.map((sorted,',
                    '.map((unsorted,', '.map((filtered,', '.map((unfiltered,',
                    '.map((grouped,', '.map((ungrouped,', '.map((aggregated,',
                    '.map((unaggregated,', '.map((summarized,', '.map((unsummarized,',
                    '.map((totaled,', '.map((untotaled,', '.map((averaged,',
                    '.map((unaveraged,', '.map((counted,', '.map((uncounted,',
                    '.map((ranked,', '.map((unranked,', '.map((scored,',
                    '.map((unscored,', '.map((rated,', '.map((unrated,',
                    '.map((weighted,', '.map((unweighted,', '.map((normalized,',
                    '.map((unnormalized,', '.map((scaled,', '.map((unscaled,',
                    ]
    
    last_map = max((before_return.rfind(p) for p in map_patterns), default=-1)
    
    return last_map > 0

def fix_page_placement(content):
    """Fix the Page placement."""
    # Extract the <Page ...> opening tag
    page_open_str, page_open_idx, page_open_end = extract_page_props(content)
    if not page_open_str:
        return None
    
    # Find the matching </Page>
    page_close_idx = balance_jsx_tags(content, page_open_idx, "Page")
    if page_close_idx == -1:
        return None
    
    page_close_end = page_close_idx + len("</Page>")
    
    # Extract the inner content between <Page> and </Page>
    inner_content = content[page_open_end:page_close_idx]
    
    # Remove the <Page> and </Page> from their current location
    # We need to also remove surrounding whitespace
    before = content[:page_open_idx]
    after = content[page_close_end:]
    
    # Clean up surrounding whitespace
    before = before.rstrip() + "\n"
    after = "\n" + after.lstrip()
    
    without_page = before + inner_content + after
    
    # Find the top-level return
    jsx_start, jsx_end = find_top_level_return(without_page)
    if jsx_start == -1 or jsx_end == -1:
        return None
    
    inner_jsx = without_page[jsx_start:jsx_end]
    
    # Wrap with <Page>
    wrapped_jsx = f"\n        {page_open_str}\n{inner_jsx}\n        </Page>\n    "
    
    return without_page[:jsx_start] + wrapped_jsx + without_page[jsx_end:]

def main():
    args = sys.argv[1:]
    
    if not args:
        print("Usage: python3 scripts/fix-page-placement.py <file-path> | --all")
        sys.exit(1)
    
    if args[0] == "--all":
        app_dir = os.path.join(ROOT, "app/(app)")
        all_pages = find_pages(app_dir)
        files_to_process = []
        for f in all_pages:
            try:
                content = open(f).read()
                if has_page_in_map_problem(content):
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
            content = open(file_path).read()
            
            if not has_page_in_map_problem(content):
                skipped += 1
                continue
            
            fixed_content = fix_page_placement(content)
            if not fixed_content:
                print(f"  ⏭️  {file_path} — could not fix")
                skipped += 1
                continue
            
            with open(file_path, 'w') as f:
                f.write(fixed_content)
            print(f"  ✅ Fixed: {file_path}")
            fixed += 1
        except Exception as e:
            print(f"  ❌ Error: {file_path}: {e}")
            errors += 1
    
    print(f"\nDone. Fixed: {fixed} | Skipped: {skipped} | Errors: {errors}")

if __name__ == "__main__":
    main()
