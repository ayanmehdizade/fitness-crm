import Finance from './Finance.jsx';
import Inventory from './Inventory';
import Parking from './Parking';
import PersonalTraining from './PersonalTraining';
import Turnstile from './Turnstile';
import GroupTraining from './GroupTraining';
import Lockers from './Lockers';
import Massage from './Massage';
import CRM from './CRM';
import POS from './POS';
import OperationsHR from './OperationsHR';
import BeautySalon from './BeautySalon';
import Barber from './Barber';
import React, { useState } from 'react';
import {
  Users, CreditCard, Activity, BarChart3, Building2, Search, Bell, Key, Car, Package, 
  ShoppingCart, UserCheck, ArrowUpRight, ArrowDownRight, Dumbbell, Coffee, 
  Scissors, Sparkles, Store, ChevronDown, ChevronUp, HandHeart, CalendarRange, Check, LogOut,
  Menu, X, ShoppingBag, Info, Filter, TrendingUp, Layers, ArrowRightLeft, Snowflake
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';

const demographicData = {
  totalActive: 1240,
  female: 520, 
  male: 580,   
  kids: 140,   
};

const paymentBreakdown = {
  totalToday: '4,850 AZN',
  cash: '1,200 AZN',       
  card: '2,950 AZN',       
  bankTransfer: '700 AZN'  
};

const facilityRevenues = {
  parking:  { 
    name: 'Parkinq', 
    total: '340 AZN', 
    cash: '100 AZN', 
    card: '240 AZN', 
    icon: Car,
    chartData: [
      { time: '08:00', total: 40 }, { time: '10:00', total: 70 }, { time: '12:00', total: 90 }, 
      { time: '14:00', total: 50 }, { time: '16:00', total: 40 }, { time: '18:00', total: 50 }
    ]
  },
  carwash:  { 
    name: 'Avto Yuma & Detailing', 
    total: '460 AZN', 
    cash: '160 AZN', 
    card: '300 AZN', 
    icon: Sparkles,
    chartData: [
      { time: '08:00', total: 50 }, { time: '10:00', total: 110 }, { time: '12:00', total: 130 }, 
      { time: '14:00', total: 80 }, { time: '16:00', total: 50 }, { time: '18:00', total: 40 }
    ]
  },
  cafe:     { 
    name: 'Kafe & FitBar', 
    total: '850 AZN', 
    cash: '250 AZN', 
    card: '600 AZN', 
    icon: Coffee,
    chartData: [
      { time: '08:00', total: 90 }, { time: '10:00', total: 140 }, { time: '12:00', total: 210 }, 
      { time: '14:00', total: 160 }, { time: '16:00', total: 150 }, { time: '18:00', total: 100 }
    ]
  },
  massage:  { 
    name: 'Masaj & SPA', 
    total: '510 AZN', 
    cash: '150 AZN', 
    card: '360 AZN', 
    icon: HandHeart,
    chartData: [
      { time: '08:00', total: 0 }, { time: '10:00', total: 120 }, { time: '12:00', total: 150 }, 
      { time: '14:00', total: 110 }, { time: '16:00', total: 130 }, { time: '18:00', total: 0 }
    ]
  },
  barber:   { 
    name: 'Bərbər', 
    total: '420 AZN', 
    cash: '120 AZN', 
    card: '300 AZN', 
    icon: Scissors,
    chartData: [
      { time: '08:00', total: 30 }, { time: '10:00', total: 90 }, { time: '12:00', total: 110 }, 
      { time: '14:00', total: 80 }, { time: '16:00', total: 70 }, { time: '18:00', total: 40 }
    ]
  },
  salon:    { 
    name: 'Gözəllik Salonu', 
    total: '680 AZN', 
    cash: '180 AZN', 
    card: '500 AZN', 
    icon: Sparkles,
    chartData: [
      { time: '08:00', total: 40 }, { time: '10:00', total: 150 }, { time: '12:00', total: 190 }, 
      { time: '14:00', total: 140 }, { time: '16:00', total: 100 }, { time: '18:00', total: 60 }
    ]
  },
  trainers: { 
    name: 'Təlimçilər (PT)', 
    total: '1,250 AZN', 
    cash: '350 AZN', 
    card: '900 AZN', 
    icon: Dumbbell,
    chartData: [
      { time: '08:00', total: 120 }, { time: '10:00', total: 250 }, { time: '12:00', total: 310 }, 
      { time: '14:00', total: 180 }, { time: '16:00', total: 240 }, { time: '18:00', total: 150 }
    ]
  },
  merch:    { 
    name: 'Merç & Geyim', 
    total: '390 AZN', 
    cash: '90 AZN', 
    card: '300 AZN', 
    icon: ShoppingBag,
    chartData: [
      { time: '08:00', total: 20 }, { time: '10:00', total: 80 }, { time: '12:00', total: 140 }, 
      { time: '14:00', total: 70 }, { time: '16:00', total: 50 }, { time: '18:00', total: 30 }
    ]
  }
};

const filterData = {
  today: {
    kpi: {
      salesVal: '4,850', salesUnit: 'AZN', salesDiff: '+18%', salesUp: true,
      newMembersVal: '18', newMembersUnit: 'Nəfər', newDiff: '+12%', newUp: true,
      activePresentVal: '84', activePresentUnit: 'Nəfər', presentDiff: 'Pik: 18:00', presentUp: true,
      freezesVal: '3', freezesUnit: 'Sorğu', freezeDiff: '-2', freezeUp: false,
      transfersVal: '2', transfersUnit: 'Sorğu', transferDiff: '+1', transferUp: true
    },
    salesGraph: [
      { name: '08:00', revenue: 350, prevRevenue: 280, cash: 100, card: 250 },
      { name: '10:00', revenue: 620, prevRevenue: 510, cash: 180, card: 440 },
      { name: '12:00', revenue: 890, prevRevenue: 790, cash: 250, card: 640 },
      { name: '14:00', revenue: 540, prevRevenue: 600, cash: 140, card: 400 },
      { name: '16:00', revenue: 780, prevRevenue: 690, cash: 210, card: 570 },
      { name: '18:00', revenue: 1250, prevRevenue: 1050, cash: 320, card: 930 },
      { name: '20:00', revenue: 420, prevRevenue: 380, cash: 120, card: 300 }
    ]
  },
  yesterday: {
    kpi: {
      salesVal: '3,920', salesUnit: 'AZN', salesDiff: '-4%', salesUp: false,
      newMembersVal: '14', newMembersUnit: 'Nəfər', newDiff: '+5%', newUp: true,
      activePresentVal: '91', activePresentUnit: 'Nəfər', presentDiff: 'Pik: 19:00', presentUp: true,
      freezesVal: '5', freezesUnit: 'Sorğu', freezeDiff: '+1', freezeUp: true,
      transfersVal: '1', transfersUnit: 'Sorğu', transferDiff: '0', transferUp: true
    },
    salesGraph: [
      { name: '08:00', revenue: 200, prevRevenue: 220, cash: 60, card: 140 },
      { name: '10:00', revenue: 510, prevRevenue: 480, cash: 150, card: 360 },
      { name: '12:00', revenue: 750, prevRevenue: 800, cash: 200, card: 550 },
      { name: '14:00', revenue: 400, prevRevenue: 420, cash: 110, card: 290 },
      { name: '16:00', revenue: 820, prevRevenue: 750, cash: 230, card: 590 },
      { name: '18:00', revenue: 1100, prevRevenue: 1150, cash: 300, card: 800 },
      { name: '20:00', revenue: 140, prevRevenue: 200, cash: 40, card: 100 }
    ]
  },
  month: {
    kpi: {
      salesVal: '64,200', salesUnit: 'AZN', salesDiff: '+24%', salesUp: true,
      newMembersVal: '284', newMembersUnit: 'Nəfər', newDiff: '+15%', newUp: true,
      activePresentVal: '1,240', activePresentUnit: 'Üzv', presentDiff: 'Baza 88%', presentUp: true,
      freezesVal: '42', freezesUnit: 'Sorğu', freezeDiff: '-8%', freezeUp: false,
      transfersVal: '18', transfersUnit: 'Sorğu', transferDiff: '+4', transferUp: true
    },
    salesGraph: [
      { name: 'Həftə 1', revenue: 14200, prevRevenue: 12000, cash: 4000, card: 10200 },
      { name: 'Həftə 2', revenue: 16800, prevRevenue: 15000, cash: 4800, card: 12000 },
      { name: 'Həftə 3', revenue: 18400, prevRevenue: 16500, cash: 5200, card: 13200 },
      { name: 'Həftə 4', revenue: 14800, prevRevenue: 14000, cash: 4100, card: 10700 }
    ]
  },
  custom: {
    kpi: {
      salesVal: '18,650', salesUnit: 'AZN', salesDiff: 'Xüsusi Aralıq', salesUp: true,
      newMembersVal: '72', newMembersUnit: 'Nəfər', newDiff: 'Aralıq üzrə', newUp: true,
      activePresentVal: '1,100', activePresentUnit: 'Üzv', presentDiff: 'Aralıq üzrə', presentUp: true,
      freezesVal: '12', freezesUnit: 'Sorğu', freezeDiff: 'Aralıq üzrə', freezeUp: false,
      transfersVal: '5', transfersUnit: 'Sorğu', transferDiff: 'Aralıq üzrə', transferUp: true
    },
    salesGraph: [
      { name: 'Gün 1', revenue: 2100, prevRevenue: 1900, cash: 600, card: 1500 },
      { name: 'Gün 2', revenue: 3400, prevRevenue: 3000, cash: 900, card: 2500 },
      { name: 'Gün 3', revenue: 2800, prevRevenue: 2900, cash: 800, card: 2000 },
      { name: 'Gün 4', revenue: 4100, prevRevenue: 3800, cash: 1200, card: 2900 },
      { name: 'Gün 5', revenue: 6250, prevRevenue: 5500, cash: 1800, card: 4450 }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateFilter, setDateFilter] = useState('today');
  const [wellnessOpen, setWellnessOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-28');
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');
  const [showComparison, setShowComparison] = useState(true);

  const [selectedFacility, setSelectedFacility] = useState(null);

  const currentData = filterData[dateFilter] || filterData.today;

  const handleApplyCustomDate = () => {
    setDateFilter('custom');
    setShowCustomPicker(false);
  };

  const fontDisplayStyle = { fontFamily: "'Archivo Expanded', sans-serif", letterSpacing: '-0.02em' };
  const fontTextStyle = { fontFamily: "'TikTok Sans', system-ui, -apple-system, sans-serif", letterSpacing: '-0.01em' };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-2xl shadow-xl text-xs space-y-1.5 min-w-[170px]">
          <div className="flex justify-between items-center border-b border-slate-100 pb-1">
            <span style={fontDisplayStyle} className="font-black text-slate-900">{label}</span>
            <span style={fontTextStyle} className="text-[10px] text-blue-600 font-extrabold bg-blue-50 px-2 py-0.5 rounded-md">Canlı</span>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span style={fontTextStyle} className="text-slate-500 font-bold">Ümumi Gəlir:</span>
              <span style={fontDisplayStyle} className="font-black text-slate-900">{data.revenue} AZN</span>
            </div>

            {data.prevRevenue && (
              <div className="flex justify-between text-slate-400">
                <span style={fontTextStyle} className="font-bold">Əvvəlki Dövr:</span>
                <span style={fontDisplayStyle} className="font-black text-slate-500">{data.prevRevenue} AZN</span>
              </div>
            )}

            <div className="pt-1 border-t border-slate-100 space-y-0.5 text-[10px]">
              <div className="flex justify-between text-emerald-700">
                <span style={fontTextStyle} className="font-bold">Nağd:</span>
                <span style={fontDisplayStyle} className="font-black">{data.cash || 0} AZN</span>
              </div>
              <div className="flex justify-between text-blue-700">
                <span style={fontTextStyle} className="font-bold">POS Kart:</span>
                <span style={fontDisplayStyle} className="font-black">{data.card || 0} AZN</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={fontTextStyle} className="flex h-screen bg-slate-100 text-slate-800 antialiased overflow-hidden select-none">

      {/* MAKFIT BRANDED SIDEBAR */}
      <aside 
        className={`bg-[#151515] border-r border-[#282828] flex flex-col justify-between shrink-0 shadow-2xl transition-all duration-300 ease-in-out relative z-20 overflow-hidden ${
          isSidebarOpen ? 'w-64' : 'w-0 border-r-0'
        }`}
      >
        <div className="w-64">
          <div className="p-4 border-b border-[#282828] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div 
                style={fontDisplayStyle}
                className="h-9 w-9 bg-[#F8FF70] rounded-xl flex items-center justify-center text-[#040404] font-black text-lg shadow-lg shadow-[#F8FF70]/10"
              >
                M
              </div>
              <div>
                <h1 style={fontDisplayStyle} className="font-black text-white text-sm tracking-wider uppercase">MAKFIT</h1>
                <p style={fontTextStyle} className="text-[9px] text-[#F8FF70] font-bold tracking-widest uppercase">Enterprise CRM</p>
              </div>
            </div>

            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#282828] rounded-xl transition cursor-pointer"
              title="Paneli Gizlə"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'crm', label: 'Müştəri Bazası (CRM)', icon: Users },
              { id: 'pos', label: 'POS / Kassa & Satış', icon: ShoppingCart },
              { id: 'pt', label: 'PT (Personal Training)', icon: Dumbbell },
              { id: 'operations', label: 'Operations & HR', icon: Building2 },
              { id: 'group_tr', label: 'Group Training (Qrup)', icon: CalendarRange }, 
              { id: 'turnstile', label: 'Turniket & Keçid', icon: Key },
              { id: 'lockers', label: 'Şkaflar (Lockers)', icon: Package }, 
              { id: 'parking', label: 'Parking İdarəetməsi', icon: Car },
              
              { 
                id: 'wellness', 
                label: 'Wellness & Salon', 
                icon: Sparkles, 
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
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive ? 'bg-[#282828] text-[#F8FF70]' : 'text-neutral-400 hover:bg-[#282828]/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className={isActive ? 'text-[#F8FF70]' : 'text-neutral-400'} />
                        <span style={fontTextStyle} className="font-bold">{item.label}</span>
                      </div>
                      {wellnessOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {wellnessOpen && (
                      <div className="pl-6 space-y-1 border-l border-[#282828] ml-4 my-1">
                        {item.subItems.map(sub => {
                          const SubIcon = sub.icon;
                          const isSubActive = activeTab === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => setActiveTab(sub.id)}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                isSubActive ? 'bg-[#F8FF70] text-[#040404] font-black' : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              <SubIcon size={13} />
                              <span style={fontTextStyle} className="font-bold">{sub.label}</span>
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
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive ? 'bg-[#F8FF70] text-[#040404] font-black shadow-md shadow-[#F8FF70]/10' : 'text-neutral-400 hover:bg-[#282828]/60 hover:text-white'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#040404]' : 'text-neutral-400'} />
                  <span style={fontTextStyle} className="font-bold">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-[#282828] bg-[#040404]/60 flex items-center justify-between w-64 shrink-0">
          <div className="flex items-center gap-2.5">
            <div 
              style={fontDisplayStyle} 
              className="w-8 h-8 rounded-full bg-[#282828] border border-[#F8FF70]/40 flex items-center justify-center font-black text-[#F8FF70] text-xs"
            >
              AX
            </div>
            <div>
              <p style={fontTextStyle} className="font-bold text-white text-xs">Ayan X.</p>
              <p style={fontTextStyle} className="text-[10px] text-neutral-500 font-medium">Supervisor</p>
            </div>
          </div>
          <button className="text-neutral-500 hover:text-rose-400 transition p-1 cursor-pointer">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC]">

        {/* GLOBAL HEADER */}
        <header className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 bg-[#151515] text-[#F8FF70] hover:bg-black rounded-xl transition flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-2xs"
                title="Paneli Aç"
              >
                <Menu size={16} />
                <span style={fontTextStyle} className="text-[#F8FF70] font-black">Menyu</span>
              </button>
            )}

            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input
                style={fontTextStyle}
                type="text"
                placeholder="Axtarış (Müştəri, tel, kart no)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400 transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            </button>
            <div className="h-5 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-2 bg-emerald-50/80 px-3 py-1 rounded-xl border border-emerald-200/80">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span style={fontTextStyle} className="text-xs text-emerald-900 font-bold">Klub Statusu: <strong className="text-emerald-600 font-black">Açıq</strong></span>
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <main className="flex-1 overflow-y-auto p-5 space-y-4">

          {activeTab === 'dashboard' && (
            <div className="space-y-4">

              {/* FILTER & TITLE BAR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs relative">
                <div>
                  <h2 style={fontDisplayStyle} className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                    <Activity className="text-blue-600" size={18} />
                    İcra Paneli və Analitika
                  </h2>
                  <p style={fontTextStyle} className="text-[11px] text-slate-500 mt-0.5 font-bold">
                    {dateFilter === 'custom' 
                      ? `Seçilmiş Aralıq: ${startDate} — ${endDate}` 
                      : 'Real vaxt rejimi üzrə klubun maliyyə və keçid göstəriciləri'}
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
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
                      style={fontTextStyle}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        dateFilter === f.id
                          ? 'bg-blue-600 text-white font-extrabold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}

                  <button
                    onClick={() => setShowCustomPicker(!showCustomPicker)}
                    style={fontTextStyle}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      dateFilter === 'custom'
                        ? 'bg-blue-600 text-white font-extrabold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                    }`}
                  >
                    <CalendarRange size={13} />
                    <span>Xüsusi Tarix</span>
                  </button>
                </div>

                {showCustomPicker && (
                  <div className="absolute right-4 top-16 z-30 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 w-80 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span style={fontDisplayStyle} className="font-black text-xs text-slate-900 flex items-center gap-1.5">
                        <CalendarRange size={14} className="text-blue-600" /> Tarix Aralığı Seç
                      </span>
                      <button onClick={() => setShowCustomPicker(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer">✕</button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label style={fontTextStyle} className="block text-slate-600 font-bold mb-1">Başlanğıc Tarixi:</label>
                        <input 
                          style={fontTextStyle}
                          type="date" 
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-xl font-bold text-slate-800 bg-slate-50"
                        />
                      </div>
                      <div>
                        <label style={fontTextStyle} className="block text-slate-600 font-bold mb-1">Bitiş Tarixi:</label>
                        <input 
                          style={fontTextStyle}
                          type="date" 
                          value={endDate}
                          onChange={e => setEndDate(e.target.value)}
                          className="w-full p-2 border border-slate-200 rounded-xl font-bold text-slate-800 bg-slate-50"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleApplyCustomDate}
                      style={fontTextStyle}
                      className="w-full bg-blue-600 text-white font-extrabold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1 hover:bg-blue-700 cursor-pointer shadow-xs"
                    >
                      <Check size={14} /> Tarixləri Tətbiq Et
                    </button>
                  </div>
                )}
              </div>

              {/* DEMOGRAPHICS & PAYMENT METHODS */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

                <div className="xl:col-span-1 bg-white border border-slate-200/90 p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span style={fontTextStyle} className="text-xs font-extrabold text-slate-600 block tracking-tight">
                          DB Stabil Aktiv Üzvlər
                        </span>
                        
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span style={fontDisplayStyle} className="text-2xl font-black text-slate-900">
                            {demographicData.totalActive}
                          </span>
                          <span style={fontTextStyle} className="text-base font-black text-slate-900">
                            Nəfər
                          </span>
                        </div>
                      </div>

                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                        <Users size={18} />
                      </div>
                    </div>

                    <div className="space-y-2.5 mt-4 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <div className="flex justify-between mb-1">
                          <span style={fontTextStyle} className="font-extrabold text-slate-700">Qadın Üvlər</span>
                          <div className="flex items-baseline gap-1">
                            <span style={fontDisplayStyle} className="font-black text-pink-600">{demographicData.female}</span>
                            <span style={fontTextStyle} className="font-extrabold text-pink-600">(42%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-pink-500 h-full rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <div className="flex justify-between mb-1">
                          <span style={fontTextStyle} className="font-extrabold text-slate-700">Kişi Üvlər</span>
                          <div className="flex items-baseline gap-1">
                            <span style={fontDisplayStyle} className="font-black text-blue-600">{demographicData.male}</span>
                            <span style={fontTextStyle} className="font-extrabold text-blue-600">(47%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full" style={{ width: '47%' }}></div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <div className="flex justify-between mb-1">
                          <span style={fontTextStyle} className="font-extrabold text-slate-700">Uşaq / Kid-Fit</span>
                          <div className="flex items-baseline gap-1">
                            <span style={fontDisplayStyle} className="font-black text-emerald-600">{demographicData.kids}</span>
                            <span style={fontTextStyle} className="font-extrabold text-emerald-600">(11%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '11%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="xl:col-span-2 bg-white border border-slate-200/90 p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 style={fontDisplayStyle} className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                          <CreditCard className="text-blue-600" size={16} />
                          Günlük Ödəniş Kanalları Məbləği
                        </h3>
                        <p style={fontTextStyle} className="text-[10px] text-slate-500 mt-0.5 font-bold">Kassa və bank hesabı üzrə canlı daxilolmalar</p>
                      </div>

                      <span style={fontTextStyle} className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-3 py-1 rounded-xl shadow-2xs">
                        Ümumi: {paymentBreakdown.totalToday}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200/80">
                        <span style={fontTextStyle} className="font-extrabold text-emerald-900 text-xs block mb-1">Nağd (Cash)</span>
                        <p style={fontDisplayStyle} className="text-xl font-black text-slate-900">{paymentBreakdown.cash}</p>
                        <p style={fontTextStyle} className="text-[10px] text-emerald-700 font-extrabold mt-1">24.7% pay</p>
                      </div>

                      <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200/80">
                        <span style={fontTextStyle} className="font-extrabold text-blue-900 text-xs block mb-1">POS Kart</span>
                        <p style={fontDisplayStyle} className="text-xl font-black text-slate-900">{paymentBreakdown.card}</p>
                        <p style={fontTextStyle} className="text-[10px] text-blue-700 font-extrabold mt-1">60.8% pay</p>
                      </div>

                      <div className="bg-purple-50/50 p-3.5 rounded-xl border border-purple-200/80">
                        <span style={fontTextStyle} className="font-extrabold text-purple-900 text-xs block mb-1">Bank Transfer</span>
                        <p style={fontDisplayStyle} className="text-xl font-black text-slate-900">{paymentBreakdown.bankTransfer}</p>
                        <p style={fontTextStyle} className="text-[10px] text-purple-700 font-extrabold mt-1">14.5% pay</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* COMPLEX REVENUES */}
              <div className="bg-white border border-slate-200/90 p-4 rounded-2xl space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 style={fontDisplayStyle} className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Store className="text-blue-600" size={16} /> Kompleks Obyektləri Üzrə Günlük Dövriyyə
                  </h3>
                  <span style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">
                    Parkinq, Avto Yuma, Kafe, Masaj, Bərbər, Salon, Təlimçilər və Merç
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
                  {Object.keys(facilityRevenues).map((key) => {
                    const item = facilityRevenues[key];
                    const Icon = item.icon;
                    return (
                      <div key={key} className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex flex-col justify-between hover:bg-white hover:border-blue-200 transition group relative">
                        <div className="flex items-center justify-between mb-1">
                          <span style={fontTextStyle} className="font-extrabold text-[10px] text-slate-700 truncate pr-1">{item.name}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => setSelectedFacility(item)}
                              className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                              title={`${item.name} haqqında ətraflı grafik & info`}
                            >
                              <Info size={13} />
                            </button>
                            <Icon size={13} className="text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h4 style={fontDisplayStyle} className="text-base font-black text-slate-900 truncate">{item.total}</h4>
                          <div className="mt-1.5 pt-1 border-t border-slate-200 space-y-0.5 text-[9px]">
                            <div className="flex justify-between text-slate-500"><span style={fontTextStyle} className="font-bold">Nağd:</span> <strong className="text-slate-800">{item.cash}</strong></div>
                            <div className="flex justify-between text-slate-500"><span style={fontTextStyle} className="font-bold">Kart:</span> <strong className="text-slate-900">{item.card}</strong></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* KPI CARDS (DONDURMA VƏ TRANSFER MÜRACİƏTLƏRİ İLƏ BİRLİKDƏ) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { title: 'Dövriyyə Dəyişimi', val: currentData.kpi.salesVal, unit: currentData.kpi.salesUnit, diff: currentData.kpi.salesDiff, isUp: currentData.kpi.salesUp, sub: 'Nağd + POS', bg: 'bg-emerald-50/60 border-emerald-200', icon: TrendingUp },
                  { title: 'Yeni Qoşulan Üvlər', val: currentData.kpi.newMembersVal, unit: currentData.kpi.newMembersUnit, diff: currentData.kpi.newDiff, isUp: currentData.kpi.newUp, sub: 'Yeni abunəliklər', bg: 'bg-blue-50/60 border-blue-200', icon: Users },
                  { title: 'Zalda Olan Üzvlər', val: currentData.kpi.activePresentVal, unit: currentData.kpi.activePresentUnit, diff: currentData.kpi.presentDiff, isUp: currentData.kpi.presentUp, sub: 'Turniket canlı', bg: 'bg-amber-50/60 border-amber-200', icon: Key },
                  { title: 'Dondurma Sorğuları', val: currentData.kpi.freezesVal, unit: currentData.kpi.freezesUnit, diff: currentData.kpi.freezeDiff, isUp: currentData.kpi.freezeUp, sub: 'Aktiv dondurma', bg: 'bg-purple-50/60 border-purple-200', icon: Snowflake },
                  { title: 'Transfer Sorğuları', val: currentData.kpi.transfersVal, unit: currentData.kpi.transfersUnit, diff: currentData.kpi.transferDiff, isUp: currentData.kpi.transferUp, sub: 'Kurs transferi', bg: 'bg-cyan-50/60 border-cyan-200', icon: ArrowRightLeft },
                ].map((kpi, idx) => {
                  const CardIcon = kpi.icon;
                  return (
                    <div key={idx} className={`${kpi.bg} border p-3.5 rounded-2xl flex flex-col justify-between shadow-2xs`}>
                      <div className="flex items-center justify-between">
                        <span style={fontTextStyle} className="font-extrabold text-[10px] text-slate-600 uppercase tracking-wider">{kpi.title}</span>
                        <CardIcon size={14} className="text-slate-500 opacity-70" />
                      </div>
                      <div className="mt-2">
                        <div className="flex items-baseline gap-1.5">
                          <span style={fontDisplayStyle} className="text-xl font-black text-slate-900">{kpi.val}</span>
                          <span style={fontTextStyle} className="text-sm font-black text-slate-900">{kpi.unit}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-slate-200/60">
                          <span style={fontTextStyle} className={`font-black flex items-center gap-0.5 ${kpi.isUp ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {kpi.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {kpi.diff}
                          </span>
                          <span style={fontTextStyle} className="text-slate-500 font-bold">{kpi.sub}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* GƏLİR DİNAMİKASI VƏ ANALİTİKA GRAFİKİ */}
              <div className="bg-white border border-slate-200/90 p-4 rounded-2xl shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 style={fontDisplayStyle} className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp className="text-blue-600" size={16} /> Gəlir Dinamikası Və Analitika (AZN)
                    </h3>
                    <p style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">Servislərə görə süzgəcləmə və əvvəlki dövrlə müqayisə</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-xs font-bold">
                      <Filter size={13} className="text-blue-600" />
                      <select
                        style={fontTextStyle}
                        value={selectedServiceFilter}
                        onChange={(e) => setSelectedServiceFilter(e.target.value)}
                        className="bg-transparent text-slate-800 font-extrabold outline-none cursor-pointer text-xs"
                      >
                        <option value="all">Bütün Servislər (Cəm)</option>
                        <option value="parking">Parkinq</option>
                        <option value="carwash">Avto Yuma & Detailing</option>
                        <option value="cafe">Kafe & FitBar</option>
                        <option value="massage">Masaj & SPA</option>
                        <option value="barber">Bərbər</option>
                        <option value="salon">Gözəllik Salonu</option>
                        <option value="trainers">Təlimçilər (PT)</option>
                        <option value="merch">Merç & Geyim</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      style={fontTextStyle}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                        showComparison 
                          ? 'bg-blue-50 text-blue-700 border-blue-200 font-black' 
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      <Layers size={13} />
                      <span>Əvvəlki Dövr ilə Müqayisə</span>
                    </button>
                  </div>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData.salesGraph}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                      <YAxis stroke="#64748b" fontSize={10} />
                      <Tooltip content={<CustomTooltip />} />
                      
                      <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                      
                      {showComparison && (
                        <Line type="monotone" dataKey="prevRevenue" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                      )}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <span style={fontTextStyle} className="text-slate-500 font-bold">Pik Saat Gəliri:</span>
                    <strong style={fontDisplayStyle} className="text-slate-900 font-black">18:00 (1,250 AZN)</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <span style={fontTextStyle} className="text-slate-500 font-bold">Orta Saatlıq Çek:</span>
                    <strong style={fontDisplayStyle} className="text-blue-600 font-black">692 AZN / Saat</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <span style={fontTextStyle} className="text-slate-500 font-bold">Dövr Artımı:</span>
                    <strong style={fontDisplayStyle} className="text-emerald-600 font-black">+14.2% (Müsbət)</strong>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* OTHER MODULES */}
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
          {activeTab === 'pos' && <POS />}
          {activeTab === 'operations' && <OperationsHR />}
          {activeTab === 'group_tr' && <GroupTraining />}

        </main>
      </div>

      {/* MODAL WINDOW FOR FACILITIES */}
      {selectedFacility && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 relative">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                  {React.createElement(selectedFacility.icon, { size: 18 })}
                </div>
                <div>
                  <h3 style={fontDisplayStyle} className="font-black text-slate-900 text-sm uppercase tracking-wider">
                    {selectedFacility.name} — Günlük Analitika
                  </h3>
                  <p style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">İş saatları və satış dinamikası</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedFacility(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span style={fontTextStyle} className="text-slate-500 font-extrabold text-[10px] uppercase block">Ümumi Dövriyyə</span>
                <p style={fontDisplayStyle} className="text-lg font-black text-slate-900 mt-0.5">{selectedFacility.total}</p>
              </div>
              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
                <span style={fontTextStyle} className="text-emerald-700 font-extrabold text-[10px] uppercase block">Nağd (Cash)</span>
                <p style={fontDisplayStyle} className="text-lg font-black text-emerald-950 mt-0.5">{selectedFacility.cash}</p>
              </div>
              <div className="bg-blue-50/60 p-3 rounded-2xl border border-blue-200">
                <span style={fontTextStyle} className="text-blue-700 font-extrabold text-[10px] uppercase block">POS Kart</span>
                <p style={fontDisplayStyle} className="text-lg font-black text-blue-950 mt-0.5">{selectedFacility.card}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 style={fontDisplayStyle} className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Saatlıq Satış Qrafiki (AZN)
              </h4>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedFacility.chartData}>
                    <defs>
                      <linearGradient id="colorFacility" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorFacility)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedFacility(null)}
                style={fontTextStyle}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs transition cursor-pointer shadow-xs"
              >
                Bağla
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}