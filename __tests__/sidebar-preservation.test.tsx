/**
 * Preservation Property Tests — Property 2
 *
 * MUST PASS on unfixed code — confirms baseline to preserve.
 * MUST STILL PASS after Task 3 fix — confirms no regressions.
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Sidebar from '../components/dashboard/Sidebar'

const mockUsePathname = vi.fn(() => '/dashboard')

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) => <a href={href} {...props}>{children}</a>,
}))

describe('Preservation Properties — Sidebar (Property 2)', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/dashboard')
  })

  describe('PRES-1: href bijection — every nav href renders as an <a> with byte-for-byte identical href', () => {
    it('renders all top-level nav item hrefs as anchors', () => {
      render(<Sidebar />)
      const rendered = new Set(
        Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href'))
      )
      // Only items with NO sub-links render as <a> when not active.
      // Items with sub-links render as <button> — their hrefs appear only when expanded.
      // Dashboard and FnF & Exit have empty links[] so they always render as <a>.
      const topLevel = [
        '/dashboard',   // no sub-links → always <a>
        '/fnf/dashboard', // no sub-links → always <a>
        '/helpdesk/dashboard', // no sub-links → always <a>
      ]
      for (const href of topLevel) {
        expect(rendered, `href "${href}" should be in the DOM`).toContain(href)
      }
    })

    it('renders employee sub-link hrefs byte-for-byte when Employees is active', () => {
      mockUsePathname.mockReturnValue('/employees')
      render(<Sidebar />)
      const rendered = new Set(
        Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href'))
      )
      const hrefs = [
        '/employees', '/employees/add', '/employees/directory',
        '/employees/salary-revisions', '/onboarding/dashboard', '/fnf/dashboard',
        '/employees/import', '/employees/search',
      ]
      for (const href of hrefs) {
        expect(rendered, `employee href "${href}" should render`).toContain(href)
      }
    })

    it('renders payroll sub-link hrefs byte-for-byte when Payroll is active', () => {
      mockUsePathname.mockReturnValue('/payroll/dashboard')
      render(<Sidebar />)
      const rendered = new Set(
        Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href'))
      )
      const hrefs = [
        '/payroll/dashboard', '/payroll/run/select-month', '/payroll-settings/components',
        '/payroll/arrears', '/payroll/payslips/bulk', '/tax/declarations', '/tax/form-16',
        '/payroll/reports/variance', '/payroll/reports/lop', '/payroll/ctc-revision',
        '/payroll/history', '/payroll/fnf',
      ]
      for (const href of hrefs) {
        expect(rendered, `payroll href "${href}" should render`).toContain(href)
      }
    })

    it('renders compliance sub-link hrefs byte-for-byte when Compliance is active', () => {
      mockUsePathname.mockReturnValue('/compliance/dashboard')
      render(<Sidebar />)
      const rendered = new Set(
        Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href'))
      )
      const hrefs = [
        '/compliance/dashboard', '/compliance/pf-ecr', '/compliance/pf-challan',
        '/compliance/esi-challan', '/compliance/tds-return-24q', '/compliance/pt-challan',
        '/compliance/lwf', '/compliance/gazette-monitor', '/compliance/calendar',
        '/compliance/digital-signature', '/compliance/inspector-ready',
        '/compliance/labour-law-calendar', '/compliance/health-score', '/compliance/settings',
      ]
      for (const href of hrefs) {
        expect(rendered, `compliance href "${href}" should render`).toContain(href)
      }
    })

    it('renders recruitment sub-link hrefs byte-for-byte when Recruitment is active', () => {
      mockUsePathname.mockReturnValue('/recruitment/dashboard')
      render(<Sidebar />)
      const rendered = new Set(
        Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href'))
      )
      const hrefs = [
        '/recruitment/dashboard', '/recruitment/jobs', '/recruitment/jobs/create',
        '/recruitment/jobs/publish', '/recruitment/candidates', '/recruitment/parser',
        '/recruitment/sourcing', '/recruitment/communications', '/recruitment/interviews',
        '/recruitment/interviews/feedback', '/recruitment/interviews/questions',
        '/recruitment/interviews/panel', '/recruitment/offers/generate',
        '/recruitment/offers/acceptance', '/recruitment/referrals',
        '/recruitment/bgv/initiate', '/recruitment/bgv/status',
        '/recruitment/onboarding/trigger', '/recruitment/reports',
      ]
      for (const href of hrefs) {
        expect(rendered, `recruitment href "${href}" should render`).toContain(href)
      }
    })
  })

  describe('PRES-2: logo and footer — HRFlow, TechCorp Solutions, PM initials, sign-out present', () => {
    it('renders the HRFlow logo text', () => {
      render(<Sidebar />)
      expect(screen.getByText('HRFlow')).toBeInTheDocument()
    })

    it('renders the company name "TechCorp Solutions"', () => {
      render(<Sidebar />)
      expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument()
    })

    it('renders the user initials "PM" and My Profile button', () => {
      render(<Sidebar />)
      expect(screen.getByRole('button', { name: /my profile/i })).toBeInTheDocument()
      expect(screen.getByText('PM')).toBeInTheDocument()
    })

    it('renders the sign-out button', () => {
      render(<Sidebar />)
      expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
    })

    it('logo link points to /dashboard and contains HRFlow text', () => {
      render(<Sidebar />)
      const logoLink = document.querySelector('a[href="/dashboard"]')
      expect(logoLink).toBeInTheDocument()
      expect(logoLink?.textContent).toContain('HRFlow')
    })
  })

  describe('PRES-3: layout offset — sidebar has w-60 class (240px) in normal mode', () => {
    it('sidebar nav element has the w-60 class', () => {
      render(<Sidebar />)
      const nav = screen.getByRole('navigation', { name: /main navigation/i })
      expect(nav).toHaveClass('w-60')
    })
  })

  describe('PRES-4: active state — active nav item gets green highlight via usePathname()', () => {
    it('Dashboard link is active when pathname is /dashboard', () => {
      render(<Sidebar />)
      const link = screen.getByRole('link', { name: /^dashboard$/i })
      expect(link).toHaveClass('bg-[rgba(0,229,160,0.1)]')
      expect(link).toHaveClass('text-[#00e5a0]')
    })

    it('Employees button is NOT active when pathname is /dashboard', () => {
      render(<Sidebar />)
      const btn = screen.getByRole('button', { name: /^employees$/i })
      expect(btn).not.toHaveClass('bg-[rgba(0,229,160,0.1)]')
    })

    it('Employees button is active when pathname is /employees', () => {
      mockUsePathname.mockReturnValue('/employees')
      render(<Sidebar />)
      const btn = screen.getByRole('button', { name: /^employees$/i })
      expect(btn).toHaveClass('bg-[rgba(0,229,160,0.1)]')
      expect(btn).toHaveClass('text-[#00e5a0]')
    })

    it('sub-link gets active styling when pathname exactly matches its href', () => {
      mockUsePathname.mockReturnValue('/employees/add')
      render(<Sidebar />)
      const link = screen.getByRole('link', { name: /add employee/i })
      expect(link).toHaveClass('bg-[rgba(0,229,160,0.1)]')
      expect(link).toHaveClass('text-[#00e5a0]')
    })

    it('active item renders the left-border accent span', () => {
      render(<Sidebar />)
      const nav = screen.getByRole('navigation', { name: /main navigation/i })
      const accent = nav.querySelector('span.absolute.left-0')
      expect(accent).toBeInTheDocument()
    })
  })
})
