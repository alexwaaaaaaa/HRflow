/**
 * Bug Condition Exploration Test — Property 1
 *
 * These tests encode the EXPECTED behavior of the fixed Sidebar.
 * They MUST FAIL on the current unfixed code — failure confirms the bug exists.
 *
 * DO NOT fix the Sidebar or these tests when they fail.
 * They will pass after the fix is implemented in Task 3.
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Sidebar from '../components/dashboard/Sidebar'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({ push: vi.fn() }),
}))

// Mock next/link to avoid internal Next.js module resolution issues in test env
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Bug Condition Exploration — Sidebar (Property 1)', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof localStorage !== 'undefined' && localStorage.clear) {
      localStorage.clear()
    }
  })

  it('BUG-1: role filtering — Super Admin should NOT be visible to a manager', () => {
    // The fixed Sidebar will accept a role prop and filter NAV_GROUPS.
    // On unfixed code: Sidebar renders ALL groups including Super Admin for everyone.
    // EXPECTED (fixed): Super Admin link is absent.
    // ACTUAL (unfixed): Super Admin link IS present → test FAILS → confirms bug.
    render(<Sidebar />)
    expect(screen.queryByText('Super Admin')).not.toBeInTheDocument()
  })

  it('BUG-2: search input — sidebar should have a search input with placeholder "Search menu..."', () => {
    // EXPECTED (fixed): search input exists.
    // ACTUAL (unfixed): no search input → test FAILS → confirms bug.
    render(<Sidebar />)
    expect(screen.getByPlaceholderText('Search menu...')).toBeInTheDocument()
  })

  it('BUG-3: collapsible sections — section headers should be interactive buttons', () => {
    // EXPECTED (fixed): group labels are <button> elements.
    // ACTUAL (unfixed): group labels are <p> elements → test FAILS → confirms bug.
    render(<Sidebar />)
    // "TALENT" is a group label — it should be a button in the fixed version
    const talentHeader = screen.getByRole('button', { name: /talent/i })
    expect(talentHeader).toBeInTheDocument()
  })

  it('BUG-4: mini-mode toggle — sidebar should have a mini/collapse toggle button', () => {
    // EXPECTED (fixed): a toggle button for mini mode exists.
    // ACTUAL (unfixed): no such button → test FAILS → confirms bug.
    render(<Sidebar />)
    const miniToggle = screen.queryByRole('button', { name: /mini|collapse|panel/i })
    expect(miniToggle).toBeInTheDocument()
  })
})
