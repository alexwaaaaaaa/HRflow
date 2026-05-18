#!/usr/bin/env python3
"""
Fix axe-core `nested-interactive` violation:
<Button ...>
  <Link href="...">text</Link>
</Button>

→ <Button ... href="...">text</Button>

Uses line-by-line approach to handle JSX props with nested < > characters.
"""

import re
import sys
from pathlib import Path

ROOT = Path("/Users/ajiit/Desktop/HRflow")


def fix_file(path: Path) -> tuple[bool, int]:
    original = path.read_text(encoding="utf-8")
    lines = original.split("\n")
    new_lines = []
    changes = 0
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check if this line opens a Button tag (ends with >)
        # Pattern: <Button ...props...>  (the > closes the Button opening tag)
        # We need to detect: line ends with > and starts a Button
        stripped = line.rstrip()
        
        # Check if line contains <Button and ends with >
        # and the next non-empty line is <Link href="...">text</Link>
        # and the line after that is </Button>
        
        if '<Button' in line and stripped.endswith('>') and not stripped.endswith('/>') and not '</Button>' in line:
            # Look ahead for <Link href="...">text</Link>
            j = i + 1
            # Skip empty lines
            while j < len(lines) and not lines[j].strip():
                j += 1
            
            if j < len(lines):
                link_line = lines[j].strip()
                
                # Check if it's a simple <Link href="...">text</Link>
                link_match = re.match(
                    r'<Link\s+href=(["\{][^"}\n]+["\}])>([^<]*)</Link>$',
                    link_line
                )
                
                if link_match:
                    href = link_match.group(1)
                    text = link_match.group(2).strip()
                    
                    # Look for closing </Button>
                    k = j + 1
                    while k < len(lines) and not lines[k].strip():
                        k += 1
                    
                    if k < len(lines) and lines[k].strip() == '</Button>':
                        # We have the pattern! Transform it.
                        indent = len(line) - len(line.lstrip())
                        
                        # Extract Button props (everything between <Button and >)
                        # The line ends with > so we can extract props
                        button_content = line.strip()
                        # Remove <Button and trailing >
                        props_str = button_content[len('<Button'):-1].strip()
                        
                        # Build new line: <Button {props} href={href}>{text}</Button>
                        if props_str:
                            new_button = f'{" " * indent}<Button {props_str} href={href}>{text}</Button>'
                        else:
                            new_button = f'{" " * indent}<Button href={href}>{text}</Button>'
                        
                        new_lines.append(new_button)
                        changes += 1
                        
                        # Skip the original lines (i, j, k)
                        # Also skip any blank lines between them
                        i = k + 1
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
    print("=== Fixing <Button><Link> nested-interactive violations ===\n")
    process_all()
