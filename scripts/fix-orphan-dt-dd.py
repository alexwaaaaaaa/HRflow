#!/usr/bin/env python3
"""
Fix orphaned <dt>/<dd> elements that are no longer inside a <dl>.

After the dl->div fix, <dt>/<dd> inside Cards are orphaned.
Two approaches:
1. If the Card contains ONLY dt/dd pairs → wrap in <dl>
2. If dt/dd are mixed with other content → change to <p> with same className

Strategy: For each Card that contains dt/dd, wrap the dt/dd in a <dl>.
But since this is complex, we use a simpler approach:
- Find <dt className="..."> and change to <p className="...">
- Find <dd className="..."> and change to <p className="...">
- ONLY for dt/dd that are NOT inside a <dl>

This is safe because:
- The visual styling is preserved (same className)
- The semantic meaning is preserved (KPI label + value)
- axe-core won't flag orphaned <p> elements
"""

import re
from pathlib import Path

ROOT = Path("/Users/ajiit/Desktop/HRflow")

# Files that had dl->div conversion (from fix-dl-grid-a11y.py)
# These are the files where dt/dd may now be orphaned
FILES_TO_CHECK = [
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
    "app/(app)/my-profile/page.tsx",
    "app/(app)/settings/forms/responses/page.tsx",
    "app/(app)/settings/notifications/email/page.tsx",
]


def is_inside_dl(lines: list[str], line_idx: int) -> bool:
    """Check if the line at line_idx is inside a <dl> element."""
    depth = 0
    for i in range(line_idx - 1, max(0, line_idx - 50), -1):
        line = lines[i].strip()
        # Count closing tags going backwards
        if '</dl>' in line:
            depth += 1
        if '<dl' in line and not '/>' in line:
            if depth == 0:
                return True
            depth -= 1
    return False


def fix_file(rel_path: str) -> tuple[bool, int]:
    path = ROOT / rel_path
    if not path.exists():
        return False, 0
    
    original = path.read_text(encoding="utf-8")
    lines = original.split("\n")
    new_lines = []
    changes = 0
    
    for i, line in enumerate(lines):
        # Check for <dt ...> or <dt> that's NOT inside a <dl>
        if ('<dt ' in line or '<dt>' in line) and not is_inside_dl(lines, i):
            # Replace <dt with <p and </dt> with </p>
            new_line = line.replace('<dt ', '<p ').replace('<dt>', '<p>').replace('</dt>', '</p>')
            if new_line != line:
                new_lines.append(new_line)
                changes += 1
                continue
        
        # Check for <dd ...> or <dd> that's NOT inside a <dl>
        if ('<dd ' in line or '<dd>' in line) and not is_inside_dl(lines, i):
            # Replace <dd with <p and </dd> with </p>
            new_line = line.replace('<dd ', '<p ').replace('<dd>', '<p>').replace('</dd>', '</p>')
            if new_line != line:
                new_lines.append(new_line)
                changes += 1
                continue
        
        new_lines.append(line)
    
    new_content = "\n".join(new_lines)
    
    if new_content != original:
        path.write_text(new_content, encoding="utf-8")
        return True, changes
    
    return False, 0


if __name__ == "__main__":
    total_files = 0
    total_changes = 0
    
    print("=== Fixing orphaned <dt>/<dd> elements ===\n")
    
    for rel_path in FILES_TO_CHECK:
        changed, count = fix_file(rel_path)
        if changed:
            print(f"  FIXED ({count}): {rel_path}")
            total_files += 1
            total_changes += count
        else:
            print(f"  NO CHANGE: {rel_path}")
    
    print(f"\nTotal: {total_files} files, {total_changes} replacements")
