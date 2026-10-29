import Finance from './Finance.jsx';
import Inventory from './Inventory';
import Parking from './Parking';
import PersonalTraining from './PersonalTraining';
import Turnstile from './Turnstile';
import GroupTraining from './GroupTraining';
import Lockers from './Lockers';
import Massage from './Massage';
import CRM from './CRM';
import BeautySalon from './BeautySalon';
import Barber from './Barber';
import React, { useState } from 'react';
import {
  Users, CreditCard, Calendar, Activity, BarChart3,
  Search, Bell, Shield, Key, Car, Package, ShoppingCart,
  UserCheck, Clock, ArrowUpRight, ArrowDownRight,
  Banknote, Landmark, Baby, User, Lock, Dumbbell, Coffee, Scissors, Sparkles, Store, 
  HeartPulse, ChevronDown, ChevronUp, HandHeart, CalendarRange, Check
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// DEMOGRAPHIC DATA
const demographicData = {
  totalActive: 1240,
  female: 520, 
  male: 580,   
  kids: 140,   
};

// PAYMENT METHOD BREAKDOWN
const paymentBreakdown = {
  totalToday: '4,850 AZN',
  cash: '1,200 AZN',       
  card: '2,950 AZN',       
  bankTransfer: '700 AZN'  
};

// OBYEKTLƏR VƏ XİDMƏTLƏR ÜZRƏ DÖVRİYYƏ
const facilityRevenues = {
  parking: { total: '340 AZN', cash: '100 AZN', card: '240 AZN' },
  cafe:    { total: '850 AZN', cash: '250 AZN', card: '600 AZN' },
  massage: { total: '510 AZN', cash: '150 AZN', card: '360 AZN' },
  barber:  { total: '420 AZN', cash: '120 AZN', card: '300 AZN' },
  salon:   { total: '680 AZN', cash: '180 AZN', card: '500 AZN' }
};

// FILTER DATASETS
const filterData = {
  today: {
    kpi: {
      sales: '4,850 AZN', salesDiff: '+18%', salesUp: true,
      newMembers: '18 Nəfər', newDiff: '+12%', newUp: true,
      activePresent: '84 Nəfər', presentDiff: 'Pik: 18:00', presentUp: true,
      freezes: '3 Sorğu', freezeDiff: '-2', freezeUp: false
    },
    salesGraph: [
      { name: '08:00', revenue: 350 },
      { name: '10:00', revenue: 620 },
      { name: '12:00', revenue: 890 },
      { name: '14:00', revenue: 540 },
      { name: '16:00', revenue: 780 },
      { name: '18:00', revenue: 1250 },
      { name: '20:00', revenue: 420 }
    ],
    peakHours: [
      { hour: '08:00 - 10:00', load: '45%' },
      { hour: '12:00 - 14:00', load: '60%' },
      { hour: '17:00 - 20:00', load: '94%' },
      { hour: '20:00 - 22:00', load: '55%' }
    ]
  },
  yesterday: {
    kpi: {
      sales: '3,920 AZN', salesDiff: '-4%', salesUp: false,
      newMembers: '14 Nəfər', newDiff: '+5%', newUp: true,
      activePresent: '91 Nəfər', presentDiff: 'Pik: 19:00', presentUp: true,
      freezes: '5 Sorğu', freezeDiff: '+1', freezeUp: true
    },
    salesGraph: [
      { name: '08:00', revenue: 200 },
      { name: '10:00', revenue: 510 },
      { name: '12:00', revenue: 750 },
      { name: '14:00', revenue: 400 },
      { name: '16:00', revenue: 820 },
      { name: '18:00', revenue: 1100 },
      { name: '20:00', revenue: 140 }
    ],
    peakHours: [
      { hour: '08:00 - 10:00', load: '38%' },
      { hour: '12:00 - 14:00', load: '52%' },
      { hour: '17:00 - 20:00', load: '98%' },
      { hour: '20:00 - 22:00', load: '48%' }
    ]
  },
  month: {
    kpi: {
      sales: '64,200 AZN', salesDiff: '+24%', salesUp: true,
      newMembers: '284 Nəfər', newDiff: '+15%', newUp: true,
      activePresent: '1,240 Üzv', presentDiff: 'Baza 88%', presentUp: true,
      freezes: '42 Sorğu', freezeDiff: '-8%', freezeUp: false
    },
    salesGraph: [
      { name: 'Həftə 1', revenue: 14200 },
      { name: 'Həftə 2', revenue: 16800 },
      { name: 'Həftə 3', revenue: 18400 },
      { name: 'Həftə 4', revenue: 14800 }
    ],
    peakHours: [
      { hour: 'Həftəiçi Səhər', load: '50%' },
      { hour: 'Həftəiçi Günorta', load: '65%' },
      { hour: 'Həftəiçi Pik (18:00)', load: '96%' },
      { hour: 'Həftəsonu Bütün Gün', load: '72%' }
    ]
  },
  custom: {
    kpi: {
      sales: '18,650 AZN', salesDiff: 'Xüsusi Aralıq', salesUp: true,
      newMembers: '72 Nəfər', newDiff: 'Aralıq üzrə', newUp: true,
      activePresent: '1,100 Üzv', presentDiff: 'Aralıq üzrə', presentUp: true,
      freezes: '12 Sorğu', freezeDiff: 'Aralıq üzrə', freezeUp: false
    },
    salesGraph: [
      { name: 'Gün 1', revenue: 2100 },
      { name: 'Gün 2', revenue: 3400 },
      { name: 'Gün 3', revenue: 2800 },
      { name: 'Gün 4', revenue: 4100 },
      { name: 'Gün 5', revenue: 6250 }
    ],
    peakHours: [
      { hour: 'Səhər Aralığı', load: '55%' },
      { hour: 'Günorta Aralığı', load: '70%' },
      { hour: 'Pik Saatlar (18:00)', load: '95%' },
      { hour: 'Gecə Aralığı', load: '40%' }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateFilter, setDateFilter] = useState('today');
  const [wellnessOpen, setWellnessOpen] = useState(false);

  // Xüsusi Tarix Aralığı State-ləri
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-28');
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const currentData = filterData[dateFilter] || filterData.today;

  const handleApplyCustomDate = () => {
    setDateFilter('custom');
    setShowCustomPicker(false);
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] text-slate-800 font-sans antialiased overflow-hidden">

      {/* ENTERPRISE SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-100 border-r border-slate-800 flex flex-col justify-between shrink-0 shadow-md">
        <div>
          {/* BRAND LOGO */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-extrabold text-base tracking-tight shadow-md shadow-blue-500/20">
                MK
              </div>
              <div>
                <h1 className="font-bold text-sm text-white tracking-wide">MAKFIT</h1>
                <p className="text-[10px] text-blue-400 font-medium tracking-wider uppercase">Enterprise CRM</p>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'crm', label: 'Müştəri Bazası (CRM)', icon: Users },
              { id: 'pos', label: 'POS / Kassa & Satış', icon: ShoppingCart },
              { id: 'pt', label: 'PT (Personal Training)', icon: Dumbbell },
              { id: 'group_tr', label: 'Group Training (Qrup)', icon: Calendar }, 
              { id: 'turnstile', label: 'Turniket & Keçid', icon: Key },
              { id: 'lockers', label: 'Şkaflar (Lockers)', icon: Lock }, 
              { id: 'parking', label: 'Parking İdarəetməsi', icon: Car },
              
              { 
                id: 'wellness', 
                label: 'Wellness & Salon', 
                icon: HeartPulse, 
                hasSub: true,
                subItems: [
                  { id: 'massage', label: 'Masaj', icon: HandHeart },
                  { id: 'beauty', label: 'Gözəllik', icon: Sparkles },
                  { id: 'barber', label: 'Bərbər', icon: Scissors }
                ]
              },

              { id: 'inventory', label: 'Anbar & Stok', icon: Package },
              { id: 'finance', label: 'Maliyyə & Hesabat', icon: BarChart3 },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.hasSub && item.subItems.some(sub => sub.id === activeTab));
              
              if (item.hasSub) {
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => setWellnessOpen(!wellnessOpen)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive ? 'bg-blue-600/20 text-blue-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className={isActive ? 'text-blue-400' : 'text-slate-400'} />
                        <span>{item.label}</span>
                      </div>
                      {wellnessOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {wellnessOpen && (
                      <div className="pl-6 space-y-1 border-l border-slate-800 ml-4 my-1">
                        {item.subItems.map(sub => {
                          const SubIcon = sub.icon;
                          const isSubActive = activeTab === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => setActiveTab(sub.id)}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                isSubActive ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                              }`}
                            >
                              <SubIcon size={14} />
                              <span>{sub.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* USER PROFILE */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-xs">
            AX
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-200 truncate">Ayan X.</p>
            <p className="text-[10px] text-slate-400 truncate">Junior Supervisor</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8fafc]">

        {/* GLOBAL HEADER */}
        <header className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4 w-80">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Axtarış (Müştəri, tel, kart no)..."
                className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
            </button>
            <div className="h-5 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-emerald-700 font-semibold">Klub Statusu: **Açıq**</span>
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {activeTab === 'dashboard' && (
            <div className="space-y-6">

              {/* FILTER & TITLE BAR (TARİX ARALIĞI DƏSTƏYİ İLƏ) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="text-blue-600" size={18} />
                    İcra Paneli və Analitika
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {dateFilter === 'custom' 
                      ? `Seçilmiş Aralıq: ${startDate} — ${endDate}` 
                      : 'Real vaxt rejimi üzrə klubun maliyyə və keçid göstəriciləri'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  {[
                    { id: 'today', label: 'Bu gün' },
                    { id: 'yesterday', label: 'Dünən' },
                    { id: 'month', label: 'Bu ay' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setDateFilter(f.id);
                        setShowCustomPicker(false);
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                        dateFilter === f.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}

                  {/* XÜSUSİ TARİX ARALIĞI DÜYMƏSİ */}
                  <button
                    onClick={() => setShowCustomPicker(!showCustomPicker)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition flex items-center gap-1.5 ${
                      dateFilter === 'custom'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                    }`}
                  >
                    <CalendarRange size={13} />
                    <span>Xüsusi Tarix</span>
                  </button>
                </div>

                {/* TARİX ARALIĞI SEÇİM PANELİ (POPUP) */}
                {showCustomPicker && (
                  <div className="absolute right-4 top-16 z-30 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 w-80 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <CalendarRange size={14} className="text-blue-600" /> Tarix Aralığı Seç
                      </span>
                      <button onClick={() => setShowCustomPicker(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">✕</button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Başlanğıc Tarixi:</label>
                        <input 
                          type="date" 
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                          className="w-full p-2 border rounded-lg font-bold text-slate-800 bg-slate-50 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Bitiş Tarixi:</label>
                        <input 
                          type="date" 
                          value={endDate}
                          onChange={e => setEndDate(e.target.value)}
                          className="w-full p-2 border rounded-lg font-bold text-slate-800 bg-slate-50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleApplyCustomDate}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Check size={14} /> Tarixləri Tətbiq Et
                    </button>
                  </div>
                )}
              </div>

              {/* SECTION 1: DB DEMOGRAPHICS & PAYMENT METHODS */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* DB DEMOGRAPHICS */}
                <div className="xl:col-span-1 bg-white border border-slate-200 p-5 rounded-xl flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-semibold text-slate-500 block">DB Stabil Aktiv Üzvlər</span>
                        <h3 className="text-2xl font-black text-slate-900 mt-0.5">{demographicData.totalActive} Nəfər</h3>
                      </div>
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
                        <Users size={18} />
                      </div>
                    </div>

                    <div className="space-y-3 mt-4">
                      {/* FEMALE */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                            <User size={13} className="text-pink-500" /> Qadın Üvlər
                          </span>
                          <span className="font-bold text-slate-900">{demographicData.female} <span className="text-slate-500 text-[11px]">(42%)</span></span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-pink-500 h-full rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>

                      {/* MALE */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                            <User size={13} className="text-blue-600" /> Kişi Üvlər
                          </span>
                          <span className="font-bold text-slate-900">{demographicData.male} <span className="text-slate-500 text-[11px]">(47%)</span></span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: '47%' }}></div>
                        </div>
                      </div>

                      {/* KIDS */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                            <Baby size={13} className="text-emerald-600" /> Uşaq / Kid-Fit
                          </span>
                          <span className="font-bold text-slate-900">{demographicData.kids} <span className="text-slate-500 text-[11px]">(11%)</span></span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '11%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DAILY PAYMENT METHODS */}
                <div className="xl:col-span-2 bg-white border border-slate-200 p-5 rounded-xl flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <CreditCard className="text-blue-600" size={17} />
                          Günlük Ödəniş Kanalları Məbləği
                        </h3>
                        <p className="text-xs text-slate-500">Kassa və bank hesabı üzrə canlı daxilolmalar</p>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-200">
                        Ümumi: {paymentBreakdown.totalToday}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* CASH */}
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-semibold text-slate-500">Nağd (Cash)</span>
                          <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-md">
                            <Banknote size={15} />
                          </div>
                        </div>
                        <div>
                          <p className="text-xl font-black text-slate-900">{paymentBreakdown.cash}</p>
                          <p className="text-[11px] text-emerald-600 font-bold mt-1">24.7% pay</p>
                        </div>
                      </div>

                      {/* POS CARD */}
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-semibold text-slate-500">POS Kart</span>
                          <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                            <CreditCard size={15} />
                          </div>
                        </div>
                        <div>
                          <p className="text-xl font-black text-slate-900">{paymentBreakdown.card}</p>
                          <p className="text-[11px] text-blue-600 font-bold mt-1">60.8% pay</p>
                        </div>
                      </div>

                      {/* BANK TRANSFER */}
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-semibold text-slate-500">Bank Transfer</span>
                          <div className="p-1.5 bg-purple-100 text-purple-600 rounded-md">
                            <Landmark size={15} />
                          </div>
                        </div>
                        <div>
                          <p className="text-xl font-black text-slate-900">{paymentBreakdown.bankTransfer}</p>
                          <p className="text-[11px] text-purple-600 font-bold mt-1">14.5% pay</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* OBYEKTLƏR VƏ XİDMƏTLƏR ÜZRƏ DÖVRİYYƏ */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Store className="text-blue-600" size={18} /> Kompleks Obyektləri Üzrə Günlük Dövriyyə
                  </h3>
                  <span className="text-xs text-slate-500">Parkinq, Kafe, Masaj, Bərbər və Salon (Nağd / Kart)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  
                  {/* PARKING */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600">Parkinq</span>
                      <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                        <Car size={16} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">{facilityRevenues.parking.total}</h4>
                      <div className="mt-2 pt-2 border-t border-slate-200 space-y-1 text-[11px] font-semibold">
                        <div className="flex justify-between text-emerald-700">
                          <span>Nağd:</span>
                          <span className="font-bold">{facilityRevenues.parking.cash}</span>
                        </div>
                        <div className="flex justify-between text-blue-700">
                          <span>Kart:</span>
                          <span className="font-bold">{facilityRevenues.parking.card}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KAFE */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600">Kafe</span>
                      <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                        <Coffee size={16} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">{facilityRevenues.cafe.total}</h4>
                      <div className="mt-2 pt-2 border-t border-slate-200 space-y-1 text-[11px] font-semibold">
                        <div className="flex justify-between text-emerald-700">
                          <span>Nağd:</span>
                          <span className="font-bold">{facilityRevenues.cafe.cash}</span>
                        </div>
                        <div className="flex justify-between text-blue-700">
                          <span>Kart:</span>
                          <span className="font-bold">{facilityRevenues.cafe.card}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MASAJ */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600">Masaj</span>
                      <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
                        <HandHeart size={16} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">{facilityRevenues.massage.total}</h4>
                      <div className="mt-2 pt-2 border-t border-slate-200 space-y-1 text-[11px] font-semibold">
                        <div className="flex justify-between text-emerald-700">
                          <span>Nağd:</span>
                          <span className="font-bold">{facilityRevenues.massage.cash}</span>
                        </div>
                        <div className="flex justify-between text-blue-700">
                          <span>Kart:</span>
                          <span className="font-bold">{facilityRevenues.massage.card}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BƏRBƏR */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600">Bərbər</span>
                      <div className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
                        <Scissors size={16} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">{facilityRevenues.barber.total}</h4>
                      <div className="mt-2 pt-2 border-t border-slate-200 space-y-1 text-[11px] font-semibold">
                        <div className="flex justify-between text-emerald-700">
                          <span>Nağd:</span>
                          <span className="font-bold">{facilityRevenues.barber.cash}</span>
                        </div>
                        <div className="flex justify-between text-blue-700">
                          <span>Kart:</span>
                          <span className="font-bold">{facilityRevenues.barber.card}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SALON */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600">Gözəllik Salonu</span>
                      <div className="p-1.5 bg-pink-100 text-pink-700 rounded-lg">
                        <Sparkles size={16} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">{facilityRevenues.salon.total}</h4>
                      <div className="mt-2 pt-2 border-t border-slate-200 space-y-1 text-[11px] font-semibold">
                        <div className="flex justify-between text-emerald-700">
                          <span>Nağd:</span>
                          <span className="font-bold">{facilityRevenues.salon.cash}</span>
                        </div>
                        <div className="flex justify-between text-blue-700">
                          <span>Kart:</span>
                          <span className="font-bold">{facilityRevenues.salon.card}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 2: MAIN KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: 'Dövriyyə Dəyişimi',
                    val: currentData.kpi.sales,
                    diff: currentData.kpi.salesDiff,
                    isUp: currentData.kpi.salesUp,
                    sub: 'Nağd + POS ödənişlər',
                    icon: CreditCard
                  },
                  {
                    title: 'Yeni Qoşulan Üvlər',
                    val: currentData.kpi.newMembers,
                    diff: currentData.kpi.newDiff,
                    isUp: currentData.kpi.newUp,
                    sub: 'Satılmış yeni abunəliklər',
                    icon: Users
                  },
                  {
                    title: 'Zalda Olan Üzvlər',
                    val: currentData.kpi.activePresent,
                    diff: currentData.kpi.presentDiff,
                    isUp: currentData.kpi.presentUp,
                    sub: 'Turniket canlı girişləri',
                    icon: UserCheck
                  },
                  {
                    title: 'Dondurma Sorğuları',
                    val: currentData.kpi.freezes,
                    diff: currentData.kpi.freezeDiff,
                    isUp: currentData.kpi.freezeUp,
                    sub: 'İşlənməkdə olan paketlər',
                    icon: Clock
                  },
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-sm hover:border-blue-400 transition">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold text-slate-500">{kpi.title}</span>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
                          <Icon size={16} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-1">{kpi.val}</h3>
                        <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-100">
                          <span className={`font-bold flex items-center gap-0.5 ${kpi.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {kpi.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {kpi.diff}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">{kpi.sub}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SECTION 3: REVENUE GRAPH */}
              <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Gəlir Dinamikası (AZN)</h3>
                    <p className="text-xs text-slate-500">Saatlıq və ya günlük daxilolmalar qrafiki</p>
                  </div>
                </div>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData.salesGraph}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#1e293b' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}

          {/* WELLNESS VƏ DİGƏR MODULLAR */}
          {activeTab === 'massage' && <Massage />}
          {activeTab === 'beauty' && <BeautySalon />}
          {activeTab === 'barber' && <Barber />}
          {activeTab === 'finance' && <Finance />}
          {activeTab === 'inventory' && <Inventory />}
          {activeTab === 'parking' && <Parking />}
          {activeTab === 'crm' && <CRM />}
          {activeTab === 'lockers' && <Lockers />}
          {activeTab === 'turnstile' && <Turnstile />}
          {activeTab === 'pt' && <PersonalTraining />}
          {activeTab === 'group_tr' && <GroupTraining />}

        </main>
      </div>

    </div>
  );
}