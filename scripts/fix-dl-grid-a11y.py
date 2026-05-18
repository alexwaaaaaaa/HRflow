#!/usr/bin/env python3
"""
Fix axe-core `definition-list` violation:
<dl className="grid ..."> wrapping <Card> children (which contain <dt>/<dd>)
violates the rule that <dt>/<dd> must be direct children of <dl>.

Fix: change <dl className="grid to <div className="grid
and the corresponding closing </dl> to </div>

Only applies to files where the <dl> is immediately followed by a <Card> or
a .map() that renders <Card> children.

Files with direct <dt>/<dd> children are left unchanged.
"""

import re
import sys
from pathlib import Path

# Files to fix (identified by analysis - have Card-wrapped dt/dd)
FILES_TO_FIX = [
    "app/(app)/attendance/dashboard/page.tsx",
    "app/(app)/feedback/analytics/page.tsx",
    "app/(app)/feedback/dashboard/page.tsx",
    "app/(app)/feedback/report/page.tsx",
    "app/(app)/fnf/dashboard/page.tsx",
    "app/(app)/fnf/exit-interview/dashboard/page.tsx",
    "app/(app)/fnf/reports/page.tsx",
    "app/(app)/fnf/tracker/page.tsx",
    "app/(app)/helpdesk/dashboard/page.tsx",
    "app/(app)/okr/dashboard/page.tsx",
    "app/(app)/okr/my-okrs/page.tsx",
    "app/(app)/okr/reports/page.tsx",
    "app/(app)/payroll-rollback/page.tsx",
    "app/(app)/payroll/anomaly-alerts/page.tsx",
    "app/(app)/payroll/bonus/page.tsx",
    "app/(app)/payroll/commission/page.tsx",
    "app/(app)/payroll/contractors/page.tsx",
    "app/(app)/payroll/ctc-revision/page.tsx",
    "app/(app)/payroll/dashboard/page.tsx",
    "app/(app)/payroll/fnf/page.tsx",
    "app/(app)/payroll/gratuity/page.tsx",
    "app/(app)/payroll/leave-encashment/page.tsx",
    "app/(app)/payroll/page.tsx",
    "app/(app)/payroll/payslips/bulk/page.tsx",
    "app/(app)/payroll/reports/joiners/page.tsx",
    "app/(app)/payroll/reports/lop/page.tsx",
    "app/(app)/payroll/reports/tax/page.tsx",
    "app/(app)/payroll/reports/variance/page.tsx",
    "app/(app)/payroll/run/employee-summary/page.tsx",
    "app/(app)/payroll/run/review-deductions/page.tsx",
    "app/(app)/payroll/run/review-gross/page.tsx",
    "app/(app)/payroll/run/review-net/page.tsx",
    "app/(app)/payroll/variable-pay/page.tsx",
    "app/(app)/performance/analytics/page.tsx",
    "app/(app)/performance/dashboard/page.tsx",
    "app/(app)/recruitment/dashboard/page.tsx",
    "app/(app)/tax/page.tsx",
]

# Files that have BOTH Card-wrapped and direct dt/dd - need manual inspection
# These have direct dt/dd in some dl blocks and Card-wrapped in others
MIXED_FILES = [
    "app/(app)/bgv/initiate/page.tsx",
    "app/(app)/my-profile/page.tsx",
    "app/(app)/recruitment/candidates/[id]/page.tsx",
    "app/(app)/settings/company/page.tsx",
    "app/(app)/settings/forms/responses/page.tsx",
    "app/(app)/settings/notifications/email/page.tsx",
    "app/(app)/settings/system/health/page.tsx",
]

ROOT = Path("/Users/ajiit/Desktop/HRflow")

def fix_file(rel_path: str) -> tuple[bool, int]:
    """
    Replace <dl className="grid with <div className="grid
    and the matching </dl> with </div>.
    
    Returns (changed, count_of_replacements).
    """
    path = ROOT / rel_path
    if not path.exists():
        print(f"  SKIP (not found): {rel_path}")
        return False, 0

    original = path.read_text(encoding="utf-8")
    lines = original.split("\n")
    
    new_lines = []
    changes = 0
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Detect <dl className="grid...
        if '<dl className="grid' in line:
            # Look ahead to see if next non-empty line has Card or .map(
            # Check the next 3 lines
            lookahead = "\n".join(lines[i+1:i+6])
            
            # If followed by Card or .map pattern, replace dl with div
            if "<Card" in lookahead or ".map(" in lookahead:
                new_line = line.replace('<dl className="grid', '<div className="grid')
                new_lines.append(new_line)
                changes += 1
                i += 1
                continue
        
        # Detect </dl> that follows a changed block
        # We track by looking at the indentation context
        new_lines.append(line)
        i += 1
    
    if changes == 0:
        return False, 0
    
    # Now we need to fix the closing </dl> tags
    # Strategy: for each <div className="grid that was a <dl>,
    # find the matching </dl> and change it to </div>
    # We do this by re-processing the modified content
    
    content = "\n".join(new_lines)
    
    # Find all <div className="grid that were originally <dl>
    # and replace their matching </dl> with </div>
    # Simple approach: count the replacements we made and fix that many </dl>
    
    # Actually, let's do a smarter approach:
    # Re-read original and do targeted replacements
    content = original
    
    # Find all occurrences of <dl className="grid followed by Card/.map
    result_lines = content.split("\n")
    final_lines = []
    dl_stack = []  # track indentation of dl->div replacements
    i = 0
    actual_changes = 0
    
    while i < len(result_lines):
        line = result_lines[i]
        stripped = line.lstrip()
        indent = len(line) - len(stripped)
        
        # Check if this is a dl->div candidate
        if '<dl className="grid' in line:
            lookahead = "\n".join(result_lines[i+1:i+6])
            if "<Card" in lookahead or ".map(" in lookahead:
                new_line = line.replace('<dl className="grid', '<div className="grid', 1)
                final_lines.append(new_line)
                dl_stack.append(indent)
                actual_changes += 1
                i += 1
                continue
        
        # Check if this is a closing </dl> that matches a tracked dl
        if stripped == "</dl>" and dl_stack and indent == dl_stack[-1]:
            final_lines.append(line.replace("</dl>", "</div>", 1))
            dl_stack.pop()
            i += 1
            continue
        
        final_lines.append(line)
        i += 1
    
    new_content = "\n".join(final_lines)
    
    if new_content != original:
        path.write_text(new_content, encoding="utf-8")
        return True, actual_changes
    
    return False, 0


def fix_mixed_file(rel_path: str) -> tuple[bool, int]:
    """
    For mixed files, only replace <dl className="grid that are followed by
    <Card> children (not direct <dt>/<dd>).
    """
    return fix_file(rel_path)  # Same logic applies


if __name__ == "__main__":
    total_changed = 0
    total_files = 0
    
    print("=== Fixing <dl className='grid'> with Card-wrapped children ===\n")
    
    for rel_path in FILES_TO_FIX:
        changed, count = fix_file(rel_path)
        if changed:
            print(f"  FIXED ({count} replacements): {rel_path}")
            total_files += 1
            total_changed += count
        else:
            print(f"  NO CHANGE: {rel_path}")
    
    print(f"\n=== Mixed files (manual check) ===\n")
    for rel_path in MIXED_FILES:
        changed, count = fix_mixed_file(rel_path)
        if changed:
            print(f"  FIXED ({count} replacements): {rel_path}")
            total_files += 1
            total_changed += count
        else:
            print(f"  NO CHANGE: {rel_path}")
    
    print(f"\nTotal: {total_files} files changed, {total_changed} replacements")
