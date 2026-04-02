"use client";
import React, { useState } from 'react';
import { Book, Code, Search, ChevronRight } from 'lucide-react';

export default function ApiDocumentationPage() {
    const [activeTab, setActiveTab] = useState('cURL');

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#060D1A]">
            {/* Sidebar Navigation */}
            <div className="w-64 border-r border-[#1A2A3A] bg-[#0A1420] overflow-y-auto hidden md:block">
                <div className="p-4 border-b border-[#1A2A3A] sticky top-0 bg-[#0A1420] z-10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={16} />
                        <input type="text" placeholder="Search docs..." className="w-full pl-9 pr-3 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-sm text-white focus:border-indigo-500 outline-none" />
                    </div>
                </div>

                <div className="p-4 space-y-6">
                    <div>
                        <h4 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Getting Started</h4>
                        <ul className="space-y-1 text-sm text-[#CCDDEE]">
                            <li><a href="#" className="block px-2 py-1.5 rounded hover:bg-[#1A2A3A] hover:text-white">Authentication</a></li>
                            <li><a href="#" className="block px-2 py-1.5 rounded hover:bg-[#1A2A3A] hover:text-white">Pagination</a></li>
                            <li><a href="#" className="block px-2 py-1.5 rounded hover:bg-[#1A2A3A] hover:text-white">Rate Limits</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Endpoints</h4>
                        <ul className="space-y-1 text-sm text-[#CCDDEE]">
                            <li><a href="#" className="block px-2 py-1.5 rounded bg-indigo-500/10 text-indigo-400 font-bold border-l-2 border-indigo-500">Employees</a></li>
                            <li><a href="#" className="block px-2 py-1.5 rounded hover:bg-[#1A2A3A] hover:text-white">Payroll</a></li>
                            <li><a href="#" className="block px-2 py-1.5 rounded hover:bg-[#1A2A3A] hover:text-white">Time & Attendance</a></li>
                            <li><a href="#" className="block px-2 py-1.5 rounded hover:bg-[#1A2A3A] hover:text-white">Leave</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col xl:flex-row overflow-y-auto">
                {/* Documentation Body */}
                <div className="flex-1 p-8 xl:pr-0 max-w-3xl">
                    <div className="flex items-center gap-2 text-sm text-[#556677] mb-6 font-mono">
                        Endpoints <ChevronRight size={14} /> Employees <ChevronRight size={14} /> List Employees
                    </div>

                    <h1 className="text-3xl font-black text-white mb-4">List all employees</h1>
                    <p className="text-[#8899AA] text-base mb-8">
                        Returns a paginated list of all employees in your organization. You can filter the results by department, location, or status.
                    </p>

                    <div className="flex items-center gap-3 mb-8">
                        <span className="bg-emerald-500/10 text-emerald-400 font-mono font-bold px-3 py-1 rounded text-sm">GET</span>
                        <code className="text-[#CCDDEE] bg-[#1A2A3A] px-3 py-1 rounded text-sm font-mono border border-[#2A3A4A]">https://api.kaarya.com/v2/employees</code>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2">Query Parameters</h3>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden mb-12">
                        <table className="w-full text-left text-sm text-[#8899AA]">
                            <tbody className="divide-y divide-[#1A2A3A]">
                                <tr>
                                    <td className="px-6 py-4 font-mono font-bold text-[#CCDDEE] w-1/4">limit</td>
                                    <td className="px-6 py-4 font-mono text-[#556677] w-1/4">integer</td>
                                    <td className="px-6 py-4">Number of records to return. Max is 100. Default is 25.</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-mono font-bold text-[#CCDDEE]">status</td>
                                    <td className="px-6 py-4 font-mono text-[#556677]">string</td>
                                    <td className="px-6 py-4">Filter by employee status: <code className="text-white">active</code>, <code className="text-white">inactive</code>, <code className="text-white">onboard_pending</code>.</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-mono font-bold text-[#CCDDEE]">department_id</td>
                                    <td className="px-6 py-4 font-mono text-[#556677]">string</td>
                                    <td className="px-6 py-4">Filter by the unique ID of a department.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Code Examples Pane */}
                <div className="w-full xl:w-[450px] bg-[#0A1420] border-l border-[#1A2A3A] flex flex-col shrink-0 pt-0">
                    <div className="sticky top-0 bg-[#0A1420] border-b border-[#1A2A3A] z-10 flex text-sm">
                        {['cURL', 'Node.js', 'Python', 'Go'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 px-4 font-mono transition-colors ${activeTab === tab ? 'text-white border-b-2 border-indigo-500 bg-[#131B2B]' : 'text-[#556677] hover:text-[#8899AA] hover:bg-[#060D1A]'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 flex-1 bg-[#060D1A]">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden mb-6">
                            <div className="flex justify-between items-center px-4 py-2 bg-[#131B2B] border-b border-[#1A2A3A]">
                                <span className="text-xs font-mono text-[#8899AA]">Example Request</span>
                            </div>
                            <pre className="p-4 text-sm font-mono text-[#CCDDEE] overflow-x-auto">
                                {activeTab === 'cURL' && `curl -X GET "https://api.kaarya.com/v2/employees?limit=2" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                                {activeTab === 'Node.js' && `const axios = require('axios');

const response = await axios.get(
  'https://api.kaarya.com/v2/employees', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  params: { limit: 2 }
});
console.log(response.data);`}
                                {activeTab === 'Python' && `import requests

url = "https://api.kaarya.com/v2/employees"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {"limit": 2}

response = requests.get(url, headers=headers, params=params)
print(response.json())`}
                                {activeTab === 'Go' && `// Standard Go net/http request omitted for brevity
req.Header.Add("Authorization", "Bearer YOUR_API_KEY")`}
                            </pre>
                        </div>

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                            <div className="flex justify-between items-center px-4 py-2 bg-[#131B2B] border-b border-[#1A2A3A] gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-xs font-mono text-emerald-400 font-bold">200 OK</span>
                                </div>
                            </div>
                            <pre className="p-4 text-xs font-mono text-indigo-300 overflow-x-auto">
                                {`{
  "data": [
    {
      "id": "emp_12345",
      "first_name": "Rohan",
      "last_name": "Sharma",
      "email": "rohan@company.com",
      "status": "active",
      "department": {
        "id": "dept_eng",
        "name": "Engineering"
      }
    },
    ...
  ],
  "meta": {
    "total_count": 142,
    "has_more": true
  }
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
