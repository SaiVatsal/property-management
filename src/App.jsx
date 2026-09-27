import React, { useState } from 'react';
import {
  Building,
  KeyRound,
  FileCheck,
  Wrench,
  BarChart3,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  BedDouble,
  Maximize2,
  AlertTriangle,
  Search,
  DollarSign
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    properties,
    rentPayments,
    maintenanceTickets,
    addProperty,
    submitMaintenanceTicket,
    resolveTicket
  } = useStore();

  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const [propertyForm, setPropertyForm] = useState({
    title: '',
    address: '',
    type: 'Penthouse Apartment',
    monthlyRent: 8500,
    sqft: 2200,
    bedrooms: 3
  });

  const [ticketForm, setTicketForm] = useState({
    property: properties[0]?.title || '',
    category: 'HVAC & Climate',
    issue: '',
    priority: 'High Priority'
  });

  const totalMonthlyRoll = properties.reduce(
    (acc, p) => acc + (p.status === 'Occupied' ? p.monthlyRent : 0),
    0
  );
  const occupiedCount = properties.filter((p) => p.status === 'Occupied').length;
  const occupancyPercent = Math.round((occupiedCount / properties.length) * 100);

  const handlePropertySubmit = (e) => {
    e.preventDefault();
    if (!propertyForm.title || !propertyForm.address) return;
    addProperty(propertyForm);
    setShowAddPropertyModal(false);
    setPropertyForm({
      title: '',
      address: '',
      type: 'Penthouse Apartment',
      monthlyRent: 8500,
      sqft: 2200,
      bedrooms: 3
    });
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.issue) return;
    submitMaintenanceTicket(ticketForm);
    setShowTicketModal(false);
    setTicketForm({
      property: properties[0]?.title || '',
      category: 'HVAC & Climate',
      issue: '',
      priority: 'High Priority'
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans">
      {/* Luxury Navy & Gold Header */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur border-b border-slate-800 px-8 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d97706] to-[#fbbf24] flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-600/20">
              <Building className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-white block leading-none">
                Belgravia & SoHo
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#fbbf24]">
                Prime Real Estate Portfolio & Tenant Asset Ledger
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-[#1e293b] p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold text-slate-400">
            {[
              { id: 'properties', label: 'Prime Assets', icon: Building },
              { id: 'payments', label: 'Rent Roll', icon: DollarSign },
              { id: 'maintenance', label: 'Concierge Tickets', icon: Wrench },
              { id: 'analytics', label: 'Yield & Cap Rate', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? 'bg-[#d97706] text-white font-bold shadow-md shadow-amber-600/20'
                      : 'hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <button
            onClick={() => setShowAddPropertyModal(true)}
            className="px-4 py-2 bg-[#d97706] hover:bg-[#b45309] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-amber-600/20"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Asset</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8 w-full flex-1 space-y-8">
        {/* VIEW 1: PROPERTY ASSETS */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            {/* Top Portfolio Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-3xl space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Monthly Rent Roll</span>
                <div className="text-3xl font-extrabold text-[#fbbf24] font-mono">${totalMonthlyRoll.toLocaleString()}</div>
                <p className="text-xs text-slate-500">Collected across active tenant leases</p>
              </div>

              <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-3xl space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Portfolio Occupancy</span>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">{occupancyPercent}%</div>
                <p className="text-xs text-slate-500">{occupiedCount} of {properties.length} prime holdings occupied</p>
              </div>

              <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-3xl space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Net Yield</span>
                <div className="text-3xl font-extrabold text-indigo-400 font-mono">6.9% Cap</div>
                <p className="text-xs text-slate-500">Institutional grade asset performance</p>
              </div>
            </div>

            {/* Property Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#1e293b] border border-slate-800 hover:border-[#d97706]/60 rounded-3xl overflow-hidden shadow-xl transition space-y-4 flex flex-col justify-between group"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs font-mono font-bold text-[#fbbf24] border border-amber-500/30">
                      {p.roi}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'Occupied'
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-500/40'
                      }`}>
                        ● {p.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-white leading-snug">{p.title}</h3>
                      <p className="text-xs text-slate-400 flex items-start gap-1 font-serif italic">
                        <MapPin className="w-3.5 h-3.5 text-[#fbbf24] flex-shrink-0 mt-0.5" />
                        {p.address}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <BedDouble className="w-3.5 h-3.5 text-slate-500" />
                          <span>{p.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>{p.sqft} sq ft</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-mono">Monthly Rate</span>
                        <span className="text-lg font-bold font-mono text-[#fbbf24]">${p.monthlyRent.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block font-mono">Tenant</span>
                        <span className="text-xs font-semibold text-slate-200">{p.tenant || 'Unoccupied'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: RENT ROLL */}
        {activeTab === 'payments' && (
          <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-white">Monthly Rent Roll & Tenant Payment Audit</h3>
            <div className="divide-y divide-slate-800">
              {rentPayments.map((r) => (
                <div key={r.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white">{r.propertyTitle}</h4>
                    <p className="text-xs text-slate-400">Leasee: <strong className="text-slate-200">{r.tenant}</strong> • Due: {r.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-lg text-[#fbbf24]">${r.amount.toLocaleString()}</span>
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      r.status.includes('Paid') ? 'bg-emerald-950/80 text-emerald-400' : 'bg-amber-950/80 text-amber-400'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: MAINTENANCE TICKETS */}
        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-[#1e293b] p-4 rounded-2xl border border-slate-800">
              <div>
                <h3 className="font-bold text-base text-white">Concierge & Maintenance Facility Operations</h3>
                <p className="text-xs text-slate-400">Track and dispatch specialized contractors for high-value assets.</p>
              </div>
              <button
                onClick={() => setShowTicketModal(true)}
                className="px-4 py-2 bg-[#d97706] hover:bg-[#b45309] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5" /> Dispatch Work Order
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {maintenanceTickets.map((tck) => (
                <div key={tck.id} className="bg-[#1e293b] border border-slate-800 p-5 rounded-2xl space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-slate-800 text-[#fbbf24] px-2 py-0.5 rounded font-bold">
                      {tck.id} • {tck.category}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded">
                      {tck.priority}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white">{tck.property}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{tck.issue}</p>
                  </div>
                  <div className="p-3 bg-[#0f172a] rounded-xl text-xs space-y-1">
                    <span className="text-slate-500 block text-[10px]">Assigned Contractor</span>
                    <span className="font-semibold text-slate-200">{tck.assignedContractor}</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="text-emerald-400 font-bold">{tck.status}</span>
                    {tck.status !== 'Resolved & Signed Off' && (
                      <button
                        onClick={() => resolveTicket(tck.id)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold text-[11px]"
                      >
                        Sign Off Resolution
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-3xl space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Annualized Asset Valuation</span>
                <div className="text-3xl font-extrabold text-[#fbbf24] font-mono">$48,500,000</div>
                <p className="text-xs text-slate-500">Across Belgravia, Mayfair & SoHo holdings</p>
              </div>
              <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-3xl space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Average Lease Duration</span>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">24.5 Months</div>
                <p className="text-xs text-slate-500">Ultra-low tenant turnover</p>
              </div>
              <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-3xl space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">Annualized Cash Yield</span>
                <div className="text-3xl font-extrabold text-indigo-400 font-mono">$459,600</div>
                <p className="text-xs text-slate-500">Net of maintenance and reserve capital</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ADD ASSET MODAL */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e293b] rounded-3xl p-6 max-w-md w-full border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-white">Acquire & List Prime Asset</h3>
              <button onClick={() => setShowAddPropertyModal(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handlePropertySubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Property Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Knightsbridge Garden Townhouse"
                  value={propertyForm.title}
                  onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                  className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Full Postal Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 12 Hans Place, Knightsbridge, London SW1X"
                  value={propertyForm.address}
                  onChange={(e) => setPropertyForm({ ...propertyForm, address: e.target.value })}
                  className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Monthly Rent ($ USD)</label>
                  <input
                    type="number"
                    value={propertyForm.monthlyRent}
                    onChange={(e) => setPropertyForm({ ...propertyForm, monthlyRent: e.target.value })}
                    className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Square Footage</label>
                  <input
                    type="number"
                    value={propertyForm.sqft}
                    onChange={(e) => setPropertyForm({ ...propertyForm, sqft: e.target.value })}
                    className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPropertyModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#d97706] text-white rounded-xl font-bold"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TICKET MODAL */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e293b] rounded-3xl p-6 max-w-md w-full border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-white">Dispatch Concierge Ticket</h3>
              <button onClick={() => setShowTicketModal(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Property</label>
                <select
                  value={ticketForm.property}
                  onChange={(e) => setTicketForm({ ...ticketForm, property: e.target.value })}
                  className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Work Order Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the specialized maintenance requirement..."
                  value={ticketForm.issue}
                  onChange={(e) => setTicketForm({ ...ticketForm, issue: e.target.value })}
                  className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="w-1/2 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#d97706] text-white rounded-xl font-bold"
                >
                  Dispatch Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0f172a] py-6 text-center text-xs text-slate-500 font-serif">
        BELGRAVIA & SOHO ASSET MANAGEMENT • SUPABASE / POSTGRES RELATIONAL BACKEND
      </footer>
    </div>
  );
}
