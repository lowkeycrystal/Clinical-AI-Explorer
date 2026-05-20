import React, { useState } from 'react';
import { aiTools } from './data';
import { AITool } from './types';
import { Search, Filter, Stethoscope, Activity, Building, Users, Server, AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];
  const domains = ['All', ...Array.from(new Set(aiTools.map(t => t.domain)))];

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.workflow.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesDomain = selectedDomain === 'All' || tool.domain === selectedDomain;
    return matchesSearch && matchesCategory && matchesDomain;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-inner bg-slate-100">
              <img src="public/logo.png" alt="Xillium Logo" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              <Activity className="w-6 h-6 text-blue-600 absolute -z-10" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">Xillium AI Tool Scout</h1>
              <p className="text-sm text-slate-500 font-medium hidden md:block">Find AI tools for clinical & admin workflows</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search tools, vendors, or workflows..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border outline-none border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        
        {/* Left column: Tool list */}
        <div className="flex-1 shrink-0 overflow-y-auto">
          
          {/* Filters */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 rounded-md shrink-0">
                <Filter className="w-3.5 h-3.5" /> Domain
              </div>
              {domains.map(dom => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedDomain === dom 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 rounded-md shrink-0">
                <Filter className="w-3.5 h-3.5" /> Category
              </div>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredTools.length === 0 ? (
             <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-slate-900 font-medium">No tools found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredTools.map((tool) => (
                <div 
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`bg-white rounded-xl border transition-all cursor-pointer p-5 flex flex-col gap-3 group
                    ${selectedTool?.id === tool.id 
                      ? 'border-blue-500 ring-1 ring-blue-500 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{tool.name}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5" />
                        {tool.vendor}
                      </p>
                    </div>
                    <StatusBadge status={tool.status} />
                  </div>
                  
                  <div className="flex-1 mt-1">
                    <p className="text-sm text-slate-600 line-clamp-2">{tool.problemSolved}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                      {tool.domain}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium">
                      <Stethoscope className="w-3 h-3" /> {tool.category}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium">
                      <Activity className="w-3 h-3" /> {tool.workflow}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Details panel */}
        {selectedTool ? (
          <div className="hidden lg:block w-96 shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
              <ToolDetails tool={selectedTool} onClose={() => setSelectedTool(null)} />
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex w-96 shrink-0 items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
            <div className="text-center p-8 max-w-xs">
              <Info className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-slate-700 font-medium mb-2">Select a tool</h3>
              <p className="text-sm text-slate-500">Click on any AI tool in the list to view its complete details, success rates, and documented challenges.</p>
            </div>
          </div>
        )}

      </main>

      {/* Mobile Modal for details */}
      {selectedTool && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setSelectedTool(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
             <ToolDetails tool={selectedTool} onClose={() => setSelectedTool(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Active') {
    return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
      <CheckCircle2 className="w-3 h-3" /> Active
    </span>
  }
  return (
    <div className="group relative z-10 flex">
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 cursor-help">
        <XCircle className="w-3 h-3" /> {status}
      </span>
      <div className="absolute top-full mt-2 right-0 hidden group-hover:block w-48 bg-slate-800 text-slate-100 text-xs p-2 rounded shadow-lg pointer-events-none before:content-[''] before:absolute before:-top-1 before:right-4 before:w-2 before:h-2 before:bg-slate-800 before:rotate-45">
        Historical context: Included to show past market attempts in operations/automation.
      </div>
    </div>
  )
}

function ToolDetails({ tool, onClose }: { tool: AITool, onClose: () => void }) {
  return (
    <>
      <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between bg-white relative">
        <div className="pr-8">
          <h2 className="text-xl font-bold text-slate-900 leading-tight">{tool.name}</h2>
          <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1.5 font-medium">
            <Building className="w-4 h-4" />
            {tool.vendor}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <div className="space-y-8">
          
          <DetailSection title="Core Information">
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <DetailItem label="Status" value={<StatusBadge status={tool.status} />} />
              <DetailItem label="Year" value={tool.year} />
              <DetailItem label="Category" value={tool.category} />
              <DetailItem label="Workflow" value={tool.workflow} />
            </div>
          </DetailSection>

          <DetailSection title="AI Support Level">
            <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 flex flex-col gap-2">
               <span className="font-semibold text-indigo-900 inline-flex items-center gap-1.5"><Activity className="w-4 h-4" /> {tool.aiSupportLevel}</span>
               <p className="text-sm text-indigo-800 leading-relaxed">{tool.aiSupportLevelExplanation}</p>
            </div>
          </DetailSection>

          <DetailSection title="Problem Solved">
            <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200 shadow-sm">{tool.problemSolved}</p>
          </DetailSection>

          <DetailSection title="Users & Target">
            <div className="space-y-4">
              <div>
                 <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                   <Users className="w-3.5 h-3.5" /> Verified Customers
                 </span>
                 <div className="flex flex-wrap gap-1.5">
                   {tool.users.map(u => <span key={u} className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 shadow-sm">{u}</span>)}
                 </div>
              </div>
              <div>
                 <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                   <Server className="w-3.5 h-3.5" /> Organization Types
                 </span>
                 <div className="flex flex-wrap gap-1.5">
                   {tool.type.map(t => <span key={t} className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 shadow-sm">{t}</span>)}
                 </div>
              </div>
            </div>
          </DetailSection>

          <DetailSection title="Success Rate & Impact">
            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
               <p className="text-sm text-slate-800 leading-relaxed font-medium">{tool.successRate}</p>
            </div>
          </DetailSection>

          <DetailSection title="Key Use Cases">
            <ul className="space-y-2">
              {tool.useCases.map((uc, i) => (
                <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  <span>{uc}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="Challenges & Issues">
            <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100 flex gap-3 items-start">
               <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
               <p className="text-sm text-amber-900 leading-relaxed">{tool.issues}</p>
            </div>
          </DetailSection>

          <DetailSection title="Legal & Compliance">
            <p className="text-sm text-slate-600 leading-relaxed">{tool.legalCases}</p>
          </DetailSection>

        </div>
      </div>
    </>
  );
}

function DetailSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">{title}</h3>
      {children}
    </section>
  )
}

function DetailItem({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div>
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{label}</span>
      <div className="text-sm text-slate-800 font-medium">{value}</div>
    </div>
  )
}
