import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'properties', // 'properties' | 'leases' | 'payments' | 'maintenance' | 'analytics'

  properties: [
    {
      id: 'prop-01',
      title: 'The Grosvenor Penthouse',
      address: '42 Grosvenor Crescent, Belgravia, London SW1X',
      type: 'Luxury Penthouse',
      monthlyRent: 12500,
      sqft: 3400,
      bedrooms: 4,
      status: 'Occupied',
      tenant: 'Lord Alistair Sterling',
      leaseEnd: '2027-08-31',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      roi: '6.8% Yield'
    },
    {
      id: 'prop-02',
      title: 'SoHo Cast-Iron Artist Loft',
      address: '114 Mercer Street, SoHo, New York, NY 10012',
      type: 'Duplex Loft',
      monthlyRent: 9800,
      sqft: 2600,
      bedrooms: 2,
      status: 'Occupied',
      tenant: 'Victoria Chen, Tech Founder',
      leaseEnd: '2027-03-15',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      roi: '7.2% Yield'
    },
    {
      id: 'prop-03',
      title: 'Mayfair Townhouse & Private Mews',
      address: '18 Chesterfield Hill, Mayfair, London W1J',
      type: 'Historic Townhouse',
      monthlyRent: 16000,
      sqft: 4800,
      bedrooms: 5,
      status: 'Available',
      tenant: null,
      leaseEnd: null,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      roi: '6.4% Projected'
    }
  ],

  rentPayments: [
    { id: 'rent-101', propertyTitle: 'The Grosvenor Penthouse', tenant: 'Lord Alistair Sterling', amount: 12500, dueDate: '2026-10-01', status: 'Paid in Advance' },
    { id: 'rent-102', propertyTitle: 'SoHo Cast-Iron Artist Loft', tenant: 'Victoria Chen', amount: 9800, dueDate: '2026-10-01', status: 'Due in 3 Days' }
  ],

  maintenanceTickets: [
    {
      id: 'TCK-801',
      property: 'The Grosvenor Penthouse',
      category: 'Smart Climate & HVAC',
      issue: 'Sub-zero wine cellar cooling unit ambient temperature variance (+2°C above target).',
      priority: 'High Priority',
      assignedContractor: 'Mayfair Thermal Engineering Ltd.',
      status: 'Contractor Dispatched'
    },
    {
      id: 'TCK-802',
      property: 'SoHo Cast-Iron Artist Loft',
      category: 'Plumbing & Fixtures',
      issue: 'Master ensuite rainfall shower pressure valve routine inspection.',
      priority: 'Standard',
      assignedContractor: 'TriBeCa Mechanical Services',
      status: 'Scheduled'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  addProperty: (propData) => set((state) => {
    const newProp = {
      id: `prop-${Date.now()}`,
      title: propData.title,
      address: propData.address,
      type: propData.type || 'Luxury Apartment',
      monthlyRent: Number(propData.monthlyRent || 7500),
      sqft: Number(propData.sqft || 2000),
      bedrooms: Number(propData.bedrooms || 3),
      status: 'Available',
      tenant: null,
      leaseEnd: null,
      image: propData.image || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      roi: '6.9% Projected'
    };
    return { properties: [newProp, ...state.properties] };
  }),

  submitMaintenanceTicket: (tckData) => set((state) => ({
    maintenanceTickets: [
      {
        id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
        property: tckData.property,
        category: tckData.category,
        issue: tckData.issue,
        priority: tckData.priority || 'Standard',
        assignedContractor: 'Premier Facility Concierge',
        status: 'In Review'
      },
      ...state.maintenanceTickets
    ]
  })),

  resolveTicket: (tckId) => set((state) => ({
    maintenanceTickets: state.maintenanceTickets.map(t =>
      t.id === tckId ? { ...t, status: 'Resolved & Signed Off' } : t
    )
  }))
}));
