import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // --- Module Root Redirects ---
      { source: '/ai', destination: '/ai/smart-onboarding', permanent: false },
      { source: '/bgv', destination: '/bgv/dashboard', permanent: false },
      { source: '/compliance', destination: '/compliance/dashboard', permanent: false },
      { source: '/documents', destination: '/documents/repository', permanent: false },
      { source: '/engagement', destination: '/engagement/rr/dashboard', permanent: false },
      { source: '/feedback', destination: '/feedback/dashboard', permanent: false },
      { source: '/finance', destination: '/finance/dashboard', permanent: false },
      { source: '/fnf', destination: '/fnf/dashboard', permanent: false },
      { source: '/helpdesk', destination: '/helpdesk/dashboard', permanent: false },
      { source: '/hybrid', destination: '/hybrid/wfh/request', permanent: false },
      { source: '/it', destination: '/it/dashboard', permanent: false },
      { source: '/leave', destination: '/leave/dashboard', permanent: false },
      { source: '/lms', destination: '/lms/dashboard', permanent: false },
      { source: '/okr', destination: '/okr/dashboard', permanent: false },
      { source: '/onboarding', destination: '/onboarding/dashboard', permanent: false },
      { source: '/org-chart', destination: '/org-chart/tree', permanent: false },
      { source: '/performance', destination: '/performance/dashboard', permanent: false },
      { source: '/recruitment', destination: '/recruitment/dashboard', permanent: false },
      { source: '/reports', destination: '/reports/dashboard', permanent: false },
    ];
  },
};

export default nextConfig;
