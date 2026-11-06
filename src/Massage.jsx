import React, { useState } from 'react';
import { 
  HandHeart, Clock, Calendar, Search, Plus, User, Check, X, Filter, DollarSign,
  Download, FileSpreadsheet, FileText
} from 'lucide-react';

const therapistsList = ['Aysel Məmmədova', 'Nigar Həsənova', 'Ramiq Əliyev', 'Leyla Qasımova'];
const daysOfWeek = ['Bütün Günlər', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə', 'Bazar'];
const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
const durationOptions = ['30 dəq', '45 dəq', '60 dəq', '90 dəq', '120 dəq'];

// 🟢 Популярные виды массажа для выпадающего списка
const availableMassageServices = [
  'Relax Masajı',
  'İdman / Deep Tissue',
  'Aromaterapiya',
  'Klassik İsveç Masajı',
  'Anti-Cellulite / Lymphatic Drainage',
  'Sport Masajı',
  'Digər (Özüm daxil edəcəyəm)'
];

// 🟢 Полная база всех гостей клуба
const allClubGuests = [
  'Ayan Xəlilova',
  'Kamran Alıyev',
  'Leyla Məmmədova',
  'Özcan Uçar',
  'Rauf Qasımov',
  'Sevda Məmmədova',
  'Elçin Məmmədov',
  'Günay Əliyeva',
  'Nərmin Məmmədova',
  'Aytən Məmmədova',
  'Vüqar Məmmədov'
];

const initialMassageSchedule = [
  { 
    id: 'MSG-201', clientName: 'Ayan Xəlilova', therapist: 'Aysel Məmmədova', 
    serviceType: 'Relax Masajı', day: 'Bazar ertəsi', time: '10:00', duration: '60 dəq', 
    price: '50 AZN', status: 'Təsdiqləndi' 
  },
  { 
    id: 'MSG-202', clientName: 'Kamran Alıyev', therapist: 'Ramiq Əliyev', 
    serviceType: 'İdman / Deep Tissue', day: 'Bazar ertəsi', time: '14:00', duration: '90 dəq', 
    price: '75 AZN', status: 'Gözlənilir' 
  },
  { 
    id: 'MSG-203', clientName: 'Leyla Məmmədova', therapist: 'Nigar Həsənova', 
    serviceType: 'Aromaterapiya', day: 'Çərşənbə', time: '11:30', duration: '45 dəq', 
    price: '45 AZN', status: 'Təsdiqləndi' 
  },
  { 
    id: 'MSG-204', clientName: 'Özcan Uçar', therapist: 'Ramiq Əliyev', 
    serviceType: 'Klassik İsveç Masajı', day: 'Cümə', time: '16:00', duration: '60 dəq', 
    price: '60 AZN', status: 'Gözlənilir' 
  }
];

const initialMassageGrid = {
  'Aysel Məmmədova': {
    '10:00': { client: 'Ayan Xəlilova', service: 'Relax Masajı', status: 'Təsdiqləndi', id: 'MSG-201' }
  },
  'Ramiq Əliyev': {
    '14:00': { client: 'Kamran Alıyev', service: 'İdman / Deep Tissue', status: 'Gözlənilir', id: 'MSG-202' }
  }
};

export default function Massage() {
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'schedule'
  const [schedule, setSchedule] = useState(initialMassageSchedule);
  const [appointmentsGrid, setAppointmentsGrid] = useState(initialMassageGrid);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [dayFilter, setDayFilter] = useState('Bütün Günlər');
  const [therapistFilter, setTherapistFilter] = useState('ALL');

  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportSuccess, setExportSuccess] = useState('');

  // Slot Modal State (Matris üçün)
  const [activeSlot, setActiveSlot] = useState({ isOpen: false, therapist: '', time: '' });
  const [slotClient, setSlotClient] = useState(allClubGuests[0]);
  const [slotServiceSelection, setSlotServiceSelection] = useState(availableMassageServices[0]);
  const [slotCustomService, setSlotCustomService] = useState('');
  const [slotStatus, setSlotStatus] = useState('Təsdiqləndi'); // Статус для слота

  // Modal State (Cədvəldən yeni əlavə üçün)
  const [showModal, setShowModal] = useState(false);
  const [clientInput, setClientInput] = useState(allClubGuests[0]);
  const [therapistInput, setTherapistInput] = useState(therapistsList[0]);
  const [serviceSelection, setServiceSelection] = useState(availableMassageServices[0]);
  const [customServiceInput, setCustomServiceInput] = useState('');
  const [dayInput, setDayInput] = useState('Bazar ertəsi');
  const [timeInput, setTimeInput] = useState('11:00');
  const [durationInput, setDurationInput] = useState('60 dəq');
  const [priceInput, setPriceInput] = useState('50 AZN');
  const [statusInput, setStatusInput] = useState('Təsdiqləndi');

  const handleToggleStatus = (id) => {
    setSchedule(schedule.map(item => {
      if (item.id === id) {
        const newStatus = item.status === 'Təsdiqləndi' ? 'Gözlənilir' : 'Təsdiqləndi';
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    if (!clientInput) return;

    const finalService = serviceSelection === 'Digər (Özüm daxil edəcəyəm)' ? customServiceInput : serviceSelection;

    const newBooking = {
      id: `MSG-20${schedule.length + 1}`,
      clientName: clientInput,
      therapist: therapistInput,
      serviceType: finalService,
      day: dayInput,
      time: timeInput,
      duration: durationInput,
      price: priceInput,
      status: statusInput
    };

    setSchedule([newBooking, ...schedule]);
    setShowModal(false);
  };

  // Matris Slot Actions
  const handleSlotClick = (therapist, time) => {
    const existing = appointmentsGrid[therapist]?.[time];
    setActiveSlot({ isOpen: true, therapist, time });
    if (existing) {
      setSlotClient(existing.client);
      setSlotStatus(existing.status || 'Təsdiqləndi');
      if (availableMassageServices.includes(existing.service)) {
        setSlotServiceSelection(existing.service);
        setSlotCustomService('');
      } else {
        setSlotServiceSelection('Digər (Özüm daxil edəcəyəm)');
        setSlotCustomService(existing.service);
      }
    } else {
      setSlotClient(allClubGuests[0]);
      setSlotServiceSelection(availableMassageServices[0]);
      setSlotCustomService('');
      setSlotStatus('Təsdiqləndi');
    }
  };

  const handleSaveSlotAppointment = (e) => {
    e.preventDefault();
    if (!slotClient) return;

    const finalSlotService = slotServiceSelection === 'Digər (Özüm daxil edəcəyəm)' ? slotCustomService : slotServiceSelection;
    const { therapist, time } = activeSlot;
    const randomId = 'MSG-' + Math.floor(200 + Math.random() * 800);

    setAppointmentsGrid(prev => ({
      ...prev,
      [therapist]: {
        ...(prev[therapist] || {}),
        [time]: { client: slotClient, service: finalSlotService, status: slotStatus, id: randomId }
      }
    }));
    setActiveSlot({ isOpen: false, therapist: '', time: '' });
  };

  const handleClearSlotAppointment = (therapist, time) => {
    if (!window.confirm(`${therapist} üçün saat ${time}-dakı seans ləğv edilsin?`)) return;
    setAppointmentsGrid(prev => {
      const updatedTherapist = { ...(prev[therapist] || {}) };
      delete updatedTherapist[time];
      return { ...prev, [therapist]: updatedTherapist };
    });
    setActiveSlot({ isOpen: false, therapist: '', time: '' });
  };

  const handleExport = (format) => {
    setShowExportMenu(false);
    setExportSuccess(`Masaj cədvəli ${format.toUpperCase()} formatında yükləndi!`);
    setTimeout(() => setExportSuccess(''), 3000);
  };

  const filteredSchedule = schedule.filter(item => {
    const matchesSearch = item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.therapist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDay = dayFilter === 'Bütün Günlər' || item.day === dayFilter;
    const matchesTherapist = therapistFilter === 'ALL' || item.therapist === therapistFilter;
    return matchesSearch && matchesDay && matchesTherapist;
  });

  return (
    <div className="m-0 p-0 box-border flex flex-col h-full w-full overflow-hidden bg-slate-50 text-slate-800 gap-2 font-sans">
      
      {/* 1. ÜST BAŞLIQ VƏ TABS */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#151515] rounded-lg flex items-center justify-center font-black text-[#F8FF70] text-xs">
            <HandHeart size={14} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
              MAKFIT — Masaj Seansları İdarəetməsi
            </h3>
            <p className="text-[10px] text-slate-500">Randevu Matrisi və Seans Cədvəli İdarəetməsi</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* SEKSİYA KEÇİD BUTTONLARI (TABLAR) */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold">
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${activeTab === 'appointments' ? 'bg-[#151515] text-[#F8FF70] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              📅 Randevu Matrisi
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${activeTab === 'schedule' ? 'bg-[#151515] text-[#F8FF70] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              📋 Seanslar Siyahısı ({schedule.length})
            </button>
          </div>

          {/* EXPORT DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3 py-1.5 bg-[#151515] hover:bg-black text-[#F8FF70] rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
            >
              <Download size={13} /> Eksport
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-1.5 space-y-1">
                <p className="text-[9px] font-black uppercase text-slate-400 px-2 py-1">Formatı Seçin:</p>
                <button onClick={() => handleExport('excel')} className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center gap-2 transition cursor-pointer">
                  <FileSpreadsheet size={13} className="text-emerald-600" /> Excel (.xlsx)
                </button>
                <button onClick={() => handleExport('pdf')} className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center gap-2 transition cursor-pointer">
                  <FileText size={13} className="text-rose-600" /> PDF Sənəd (.pdf)
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#151515] hover:bg-black text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Plus size={14} className="text-[#F8FF70]" /> Yeni Seans Əlavə Et
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="mx-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs">
          <Check size={14} className="text-emerald-600" /> {exportSuccess}
        </div>
      )}

      {/* TAB 1: MATRİS APPOINTMENTS CƏDVƏLİ */}
      {activeTab === 'appointments' && (
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden mx-2 mb-2 shadow-2xs flex flex-col">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">Terapevt və Saatlar Üzrə Canlı Masaj Matrisi (Slotlara klikləyərək əlavə edin)</span>
            <span className="text-[11px] text-slate-500">Cəmi Terapevt: <strong className="text-slate-900">{therapistsList.length}</strong></span>
          </div>

          <div className="overflow-auto flex-1">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
                  <th className="p-3 border-r border-slate-200 font-extrabold text-slate-500 w-24 text-center">Saat</th>
                  {therapistsList.map(therapist => {
                    const count = Object.keys(appointmentsGrid[therapist] || {}).length;
                    return (
                      <th key={therapist} className="p-3 border-r border-slate-200 text-center font-black text-slate-900 min-w-[200px]">
                        <div className="font-extrabold">{therapist}</div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold inline-block mt-1 ${count > 0 ? 'text-teal-700 bg-teal-50' : 'text-slate-400 bg-slate-100'}`}>
                          {count > 0 ? `${count} Seans` : 'Boşdur'}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {timeSlots.map(time => (
                  <tr key={time} className="hover:bg-slate-50/50 transition">
                    <td className="p-3 border-r border-slate-200 font-mono font-bold text-slate-500 text-center bg-slate-50/80">
                      {time}
                    </td>
                    {therapistsList.map(therapist => {
                      const slotData = appointmentsGrid[therapist]?.[time];
                      const isPending = slotData?.status === 'Gözlənilir';
                      return (
                        <td 
                          key={therapist} 
                          onClick={() => handleSlotClick(therapist, time)}
                          className="p-2 border-r border-slate-200 cursor-pointer transition align-top h-20"
                        >
                          {slotData ? (
                            <div className={`border rounded-xl p-2 shadow-2xs space-y-1 transition ${isPending ? 'bg-amber-50 border-amber-300 hover:border-amber-500' : 'bg-teal-50 border-teal-300 hover:border-teal-500'}`}>
                              <div className="flex justify-between items-center">
                                <span className={`border text-[9px] font-black px-1.5 py-0.5 rounded font-mono ${isPending ? 'bg-white border-amber-200 text-amber-800' : 'bg-white border-teal-200 text-teal-800'}`}>
                                  {slotData.id}
                                </span>
                                <span className={`w-2 h-2 rounded-full animate-pulse ${isPending ? 'bg-amber-500' : 'bg-teal-500'}`}></span>
                              </div>
                              <h5 className="font-black text-slate-900 text-xs truncate">{slotData.client}</h5>
                              <div className="flex justify-between items-center text-[10px] text-slate-600 font-bold">
                                <span className={`px-1.5 py-0.5 rounded ${isPending ? 'bg-amber-100 text-amber-900' : 'bg-teal-100 text-teal-900'}`}>{slotData.service}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full w-full min-h-[50px] flex items-center justify-center text-slate-400 text-[11px] font-bold border-2 border-dashed border-slate-100 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition">
                              + Boş
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: SEANSLAR SİYAHISI (CƏDVƏL) */}
      {activeTab === 'schedule' && (
        <div className="flex-1 flex flex-col gap-2 overflow-hidden mx-2 mb-2">
          {/* FİRLTRLƏR VƏ AXTARIŞ */}
          <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-2xs flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-2.5 top-1.5 text-slate-400" size={13} />
              <input 
                type="text" 
                placeholder="Müştəri, masajist və ya xidmət axtar..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-2 py-1 border border-slate-200 rounded-xl text-[11px] font-medium bg-slate-50 focus:outline-none focus:border-slate-800 transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <select 
                value={dayFilter} 
                onChange={e => setDayFilter(e.target.value)}
                className="p-1 border border-slate-200 rounded-lg font-bold bg-slate-50 text-slate-800 cursor-pointer"
              >
                {daysOfWeek.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select 
                value={therapistFilter} 
                onChange={e => setTherapistFilter(e.target.value)}
                className="p-1 border border-slate-200 rounded-lg font-bold bg-slate-50 text-slate-800 cursor-pointer"
              >
                <option value="ALL">Bütün Masajistlər</option>
                {therapistsList.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CƏDVƏL */}
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-auto h-full">
              <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
                <thead className="sticky top-0 z-10 bg-[#151515] text-[#F8FF70]">
                  <tr className="uppercase font-extrabold text-[10px] tracking-wider">
                    <th className="p-2.5 border-r border-[#282828]">ID / Müştəri</th>
                    <th className="p-2.5 border-r border-[#282828]">Masajist (Terapevt)</th>
                    <th className="p-2.5 border-r border-[#282828]">Xidmət Növü</th>
                    <th className="p-2.5 border-r border-[#282828]">Həftənin Günü</th>
                    <th className="p-2.5 border-r border-[#282828]">Saat</th>
                    <th className="p-2.5 border-r border-[#282828]">Müddət</th>
                    <th className="p-2.5 border-r border-[#282828]">Qiymət</th>
                    <th className="p-2.5 text-right">Status / Əməliyyat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {filteredSchedule.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-10 text-slate-400 font-bold text-xs">
                        Axtarışa uyğun masaj seansı tapılmadı.
                      </td>
                    </tr>
                  ) : (
                    filteredSchedule.map(item => {
                      const isConfirmed = item.status === 'Təsdiqləndi';
                      return (
                        <tr key={item.id} className="hover:bg-slate-50 transition">
                          <td className="p-2.5 border-r border-slate-100 font-bold text-slate-900">
                            <span className="block font-black">{item.clientName}</span>
                            <span className="text-[10px] font-mono text-slate-400">{item.id}</span>
                          </td>

                          <td className="p-2.5 border-r border-slate-100 font-bold text-slate-800">
                            {item.therapist}
                          </td>

                          <td className="p-2.5 border-r border-slate-100 text-slate-700">
                            {item.serviceType}
                          </td>

                          <td className="p-2.5 border-r border-slate-100 font-bold text-slate-800">
                            {item.day}
                          </td>

                          <td className="p-2.5 border-r border-slate-100 font-mono font-bold text-slate-900">
                            {item.time}
                          </td>

                          <td className="p-2.5 border-r border-slate-100">
                            <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full font-bold text-[9px]">
                              ⏱ {item.duration}
                            </span>
                          </td>

                          <td className="p-2.5 border-r border-slate-100 font-black text-emerald-600">
                            {item.price}
                          </td>

                          <td className="p-2.5 text-right">
                            <button 
                              onClick={() => handleToggleStatus(item.id)}
                              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition inline-flex items-center gap-1 cursor-pointer ${
                                isConfirmed 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              <Check size={12} /> {item.status}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SLOT RANDEVU MODALI (С выбором гостя, типа услуги и статуса "Gözlənilir") */}
      {activeSlot.isOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-0 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 space-y-3 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">{activeSlot.therapist} — {activeSlot.time}</span>
                <h3 className="font-black text-slate-900 text-sm mt-1">Masaj Seansı Təyinatı</h3>
              </div>
              <button onClick={() => setActiveSlot({ isOpen: false, therapist: '', time: '' })} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveSlotAppointment} className="space-y-3 text-[11px]">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Müştəri (Bazadan Seçin):</label>
                <select 
                  value={slotClient}
                  onChange={e => setSlotClient(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer"
                >
                  {allClubGuests.map(guest => (
                    <option key={guest} value={guest}>{guest}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Xidmət Növü:</label>
                <select 
                  value={slotServiceSelection}
                  onChange={e => setSlotServiceSelection(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer mb-1.5"
                >
                  {availableMassageServices.map(srv => (
                    <option key={srv} value={srv}>{srv}</option>
                  ))}
                </select>

                {slotServiceSelection === 'Digər (Özüm daxil edəcəyəm)' && (
                  <input 
                    type="text" 
                    placeholder="Xidmət növünü yazın..." 
                    value={slotCustomService}
                    onChange={e => setSlotCustomService(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-medium bg-slate-50 focus:bg-white"
                    required
                  />
                )}
              </div>

              {/* Выбор статуса (Təsdiqləndi / Gözlənilir) */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Status:</label>
                <select 
                  value={slotStatus}
                  onChange={e => setSlotStatus(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer"
                >
                  <option value="Təsdiqləndi">Təsdiqləndi</option>
                  <option value="Gözlənilir">Gözlənilir</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between gap-2">
                {appointmentsGrid[activeSlot.therapist]?.[activeSlot.time] && (
                  <button 
                    type="button" 
                    onClick={() => handleClearSlotAppointment(activeSlot.therapist, activeSlot.time)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    Slotu Boşalt
                  </button>
                )}
                <div className="flex gap-1.5 ml-auto">
                  <button 
                    type="button" 
                    onClick={() => setActiveSlot({ isOpen: false, therapist: '', time: '' })}
                    className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Ləğv
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-1.5 bg-[#151515] hover:bg-black text-[#F8FF70] font-black rounded-xl cursor-pointer"
                  >
                    Təsdiq Et
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* YENİ SEANS ƏLAVƏ ETMƏK ÜÇÜN MODAL (С выбором статуса) */}
      {showModal && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-0 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 space-y-3 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-black text-slate-900 text-xs flex items-center gap-2">
                <HandHeart size={16} /> Yeni Masaj Seansı Qeydə Al
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddBooking} className="space-y-2.5 text-[11px]">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Müştəri (Bazadan Seçin):</label>
                <select 
                  value={clientInput}
                  onChange={e => setClientInput(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer"
                >
                  {allClubGuests.map(guest => (
                    <option key={guest} value={guest}>{guest}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Masajist (Terapevt):</label>
                  <select 
                    value={therapistInput}
                    onChange={e => setTherapistInput(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer"
                  >
                    {therapistsList.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Həftənin Günü:</label>
                  <select 
                    value={dayInput}
                    onChange={e => setDayInput(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer"
                  >
                    {daysOfWeek.filter(d => d !== 'Bütün Günlər').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Xidmət Növü:</label>
                <select 
                  value={serviceSelection}
                  onChange={e => setServiceSelection(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer mb-1.5"
                >
                  {availableMassageServices.map(srv => (
                    <option key={srv} value={srv}>{srv}</option>
                  ))}
                </select>

                {serviceSelection === 'Digər (Özüm daxil edəcəyəm)' && (
                  <input 
                    type="text" 
                    placeholder="Xidmət növünü yazın..." 
                    value={customServiceInput}
                    onChange={e => setCustomServiceInput(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-medium bg-slate-50 focus:bg-white"
                    required
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Saat:</label>
                  <input 
                    type="text" 
                    value={timeInput}
                    onChange={e => setTimeInput(e.target.value)}
                    placeholder="Məs: 14:30"
                    className="w-full p-2 border border-slate-200 rounded-xl font-medium bg-slate-50"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Müddət:</label>
                  <select 
                    value={durationInput}
                    onChange={e => setDurationInput(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer"
                  >
                    {durationOptions.map(dur => (
                      <option key={dur} value={dur}>{dur}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Qiymət:</label>
                  <input 
                    type="text" 
                    value={priceInput}
                    onChange={e => setPriceInput(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-medium bg-slate-50"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status:</label>
                  <select 
                    value={statusInput}
                    onChange={e => setStatusInput(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer"
                  >
                    <option value="Təsdiqləndi">Təsdiqləndi</option>
                    <option value="Gözlənilir">Gözlənilir</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-1.5">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 text-xs cursor-pointer"
                >
                  Ləğv et
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 bg-[#151515] hover:bg-black text-[#F8FF70] font-black rounded-xl text-xs cursor-pointer"
                >
                  Seansı Qeydə Al
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}