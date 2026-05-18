#!/usr/bin/env python3
"""
Fix axe-core `nested-interactive` violation:
<Link href="...">
  <Button ...>text</Button>
</Link>

→ <Button href="..." ...>text</Button>

Also handles:
<Link href="..."><Button ...>text</Button></Link>  (single line)

Uses line-by-line approach to handle JSX props with nested < > characters.
"""

import re
import sys
from pathlib import Path

ROOT = Path("/Users/ajiit/Desktop/HRflow")


def extract_href(link_line: str) -> str | None:
    """Extract href value from a <Link href="..."> line."""
    # Match href="..." or href={...} or href={`...`}
    m = re.search(r'href=("(?:[^"\\]|\\.)*"|\{`[^`]+`\}|\{[^}]+\})', link_line)
    if m:
        return m.group(1)
    return None


def extract_link_classname(link_line: str) -> str | None:
    """Extract className from Link if present."""
    m = re.search(r'className=("(?:[^"\\]|\\.)*"|\{[^}]+\})', link_line)
    if m:
        return m.group(1)
    return None


def fix_file(path: Path) -> tuple[bool, int]:
    original = path.read_text(encoding="utf-8")
    lines = original.split("\n")
    new_lines = []
    changes = 0
    i = 0
    
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        indent = len(line) - len(line.lstrip())
        
        # Check if this line is a <Link href="..."> opening tag
        # Pattern: starts with <Link href= and ends with >
        if (stripped.startswith('<Link ') and 
            'href=' in stripped and 
            stripped.endswith('>') and 
            not stripped.endswith('/>') and
            '</Link>' not in stripped):
            
            href = extract_href(stripped)
            link_classname = extract_link_classname(stripped)
            
            if href:
                # Look ahead for <Button ...>text</Button>
                j = i + 1
                # Skip empty lines
                while j < len(lines) and not lines[j].strip():
                    j += 1
                
                if j < len(lines):
                    button_line = lines[j].strip()
                    
                    # Check if it's a single-line Button: <Button ...>text</Button>
                    if button_line.startswith('<Button') and button_line.endswith('</Button>'):
                        # Look for closing </Link>
                        k = j + 1
                        while k < len(lines) and not lines[k].strip():
                            k += 1
                        
                        if k < len(lines) and lines[k].strip() == '</Link>':
                            # Extract Button content
                            # Remove <Button and </Button>
                            btn_inner = button_line[len('<Button'):]
                            # Find the > that closes the opening tag
                            # Need to handle nested < > in props
                            depth = 0
                            close_pos = -1
                            for ci, ch in enumerate(btn_inner):
                                if ch == '{':
                                    depth += 1
                                elif ch == '}':
                                    depth -= 1
                                elif ch == '>' and depth == 0:
                                    close_pos = ci
                                    break
                            
                            if close_pos >= 0:
                                btn_props = btn_inner[:close_pos].strip()
                                btn_text = btn_inner[close_pos+1:].replace('</Button>', '').strip()
                                
                                # Build new Button with href
                                if btn_props:
                                    new_btn = f'{" " * indent}<Button {btn_props} href={href}>{btn_text}</Button>'
                                else:
                                    new_btn = f'{" " * indent}<Button href={href}>{btn_text}</Button>'
                                
                                # Add link className as className on Button if present
                                # (only if Button doesn't already have className)
                                if link_classname and 'className=' not in btn_props:
                                    new_btn = new_btn.replace(
                                        f' href={href}>',
                                        f' href={href} className={link_classname}>'
                                    )
                                
                                new_lines.append(new_btn)
                                changes += 1
                                i = k + 1
                                continue
        
        # Also handle single-line: <Link href="..."><Button ...>text</Button></Link>
        if stripped.startswith('<Link ') and 'href=' in stripped and '</Link>' in stripped:
            href = extract_href(stripped)
            if href:
                # Extract the Button part
                btn_match = re.search(r'<Button([^>]*)>(.*?)</Button>', stripped)
                if btn_match:
                    btn_props = btn_match.group(1).strip()
                    btn_text = btn_match.group(2).strip()
                    
                    if btn_props:
                        new_btn = f'{" " * indent}<Button {btn_props} href={href}>{btn_text}</Button>'
                    else:
                        new_btn = f'{" " * indent}<Button href={href}>{btn_text}</Button>'
                    
                    new_lines.append(new_btn)
                    changes += 1
                    i += 1
                    continue
        
        new_lines.append(line)
        i += 1
    
    new_content = "\n".join(new_lines)
    
    if new_content != original:
        path.write_text(new_content, encoding="utf-8")
        return True, changes
    
    return False, 0


def process_all():
    total_files = 0
    total_changes = 0
    
    for tsx in sorted(ROOT.rglob("*.tsx")):
        # Skip test files and node_modules
        if "__tests__" in str(tsx) or "node_modules" in str(tsx) or ".next" in str(tsx):
            continue
        
        changed, count = fix_file(tsx)
        if changed:
            rel = str(tsx).replace(str(ROOT) + "/", "")
            print(f"  FIXED ({count}): {rel}")
            total_files += 1
            total_changes += count
    
    print(f"\nTotal: {total_files} files, {total_changes} replacements")


if __name__ == "__main__":
    print("=== Fixing <Link><Button> nested-interactive violations ===\n")
    process_all()
