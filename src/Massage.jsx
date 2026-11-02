import React, { useState } from 'react';
import { 
  HandHeart, Clock, Calendar, Search, Plus, User, Check, X, Filter, DollarSign,
  Download, FileSpreadsheet, FileText
} from 'lucide-react';

const therapistsList = ['Aysel Məmmədova', 'Nigar Həsənova', 'Ramiq Əliyev', 'Leyla Qasımova'];
const daysOfWeek = ['Bütün Günlər', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə', 'Bazar'];
const durationOptions = ['30 dəq', '45 dəq', '60 dəq', '90 dəq', '120 dəq'];

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

export default function Massage() {
  const [schedule, setSchedule] = useState(initialMassageSchedule);
  const [searchQuery, setSearchQuery] = useState('');
  const [dayFilter, setDayFilter] = useState('Bütün Günlər');
  const [therapistFilter, setTherapistFilter] = useState('ALL');

  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportSuccess, setExportSuccess] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [clientInput, setClientInput] = useState('');
  const [therapistInput, setTherapistInput] = useState(therapistsList[0]);
  const [serviceInput, setServiceInput] = useState('Relax Masajı');
  const [dayInput, setDayInput] = useState('Bazar ertəsi');
  const [timeInput, setTimeInput] = useState('11:00');
  const [durationInput, setDurationInput] = useState('60 dəq');
  const [priceInput, setPriceInput] = useState('50 AZN');

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

    const newBooking = {
      id: `MSG-20${schedule.length + 1}`,
      clientName: clientInput,
      therapist: therapistInput,
      serviceType: serviceInput,
      day: dayInput,
      time: timeInput,
      duration: durationInput,
      price: priceInput,
      status: 'Təsdiqləndi'
    };

    setSchedule([newBooking, ...schedule]);
    setClientInput('');
    setShowModal(false);
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
      
      {/* 1. ÜST BAŞLIQ VƏ DÜYMƏLƏR */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#151515] rounded-lg flex items-center justify-center font-black text-[#F8FF70] text-xs">
            <HandHeart size={14} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
              MAKFIT — Masaj Seansları Qrafiki
            </h3>
            <p className="text-[10px] text-slate-500">Seans saatları, müddəti, xidmət növü Və masajist təyinat cədvəli</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* EXPORT DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3 py-1.5 bg-[#151515] hover:bg-black text-[#F8FF70] rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition shadow-2xs"
            >
              <Download size={13} /> Eksport
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-1.5 space-y-1">
                <p className="text-[9px] font-black uppercase text-slate-400 px-2 py-1">Formatı Seçin:</p>
                <button onClick={() => handleExport('excel')} className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center gap-2 transition">
                  <FileSpreadsheet size={13} className="text-emerald-600" /> Excel (.xlsx)
                </button>
                <button onClick={() => handleExport('pdf')} className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center gap-2 transition">
                  <FileText size={13} className="text-rose-600" /> PDF Sənəd (.pdf)
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#151515] hover:bg-black text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition flex items-center gap-1.5 shadow-2xs"
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

      {/* 2. FİLTRLƏR VƏ AXTARIŞ */}
      <div className="bg-white border border-slate-200 p-2 rounded-2xl mx-2 shadow-2xs flex flex-wrap items-center justify-between gap-2">
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
            className="p-1 border border-slate-200 rounded-lg font-bold bg-slate-50 text-slate-800"
          >
            {daysOfWeek.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select 
            value={therapistFilter} 
            onChange={e => setTherapistFilter(e.target.value)}
            className="p-1 border border-slate-200 rounded-lg font-bold bg-slate-50 text-slate-800"
          >
            <option value="ALL">Bütün Masajistlər</option>
            {therapistsList.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. CƏDVƏL */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden mx-2 mb-2 shadow-2xs">
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
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition inline-flex items-center gap-1 ${
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

      {/* 4. YENİ SEANS ƏLAVƏ ETMƏK ÜÇÜN MODAL */}
      {showModal && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-0 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 space-y-3 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-black text-slate-900 text-xs flex items-center gap-2">
                <HandHeart size={16} /> Yeni Masaj Seansı Qeydə Al
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddBooking} className="space-y-2.5 text-[11px]">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Müştərinin Adı Soyadı:</label>
                <input 
                  type="text" 
                  placeholder="Məs: Ayan Xəlilova" 
                  value={clientInput}
                  onChange={e => setClientInput(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-xl font-medium bg-slate-50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Masajist (Terapevt):</label>
                  <select 
                    value={therapistInput}
                    onChange={e => setTherapistInput(e.target.value)}
                    className="w-full p-1.5 border border-slate-200 rounded-xl font-bold bg-slate-50"
                  >
                    {therapistsList.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Xidmət Növü:</label>
                  <input 
                    type="text" 
                    value={serviceInput}
                    onChange={e => setServiceInput(e.target.value)}
                    className="w-full p-1.5 border border-slate-200 rounded-xl font-medium bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Həftənin Günü:</label>
                  <select 
                    value={dayInput}
                    onChange={e => setDayInput(e.target.value)}
                    className="w-full p-1.5 border border-slate-200 rounded-xl font-bold bg-slate-50"
                  >
                    {daysOfWeek.filter(d => d !== 'Bütün Günlər').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Saat:</label>
                  <input 
                    type="text" 
                    value={timeInput}
                    onChange={e => setTimeInput(e.target.value)}
                    placeholder="Məs: 14:30"
                    className="w-full p-1.5 border border-slate-200 rounded-xl font-medium bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Müddət:</label>
                  <select 
                    value={durationInput}
                    onChange={e => setDurationInput(e.target.value)}
                    className="w-full p-1.5 border border-slate-200 rounded-xl font-bold bg-slate-50"
                  >
                    {durationOptions.map(dur => (
                      <option key={dur} value={dur}>{dur}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Qiymət:</label>
                  <input 
                    type="text" 
                    value={priceInput}
                    onChange={e => setPriceInput(e.target.value)}
                    className="w-full p-1.5 border border-slate-200 rounded-xl font-medium bg-slate-50"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-1.5">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 text-xs"
                >
                  Ləğv et
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 bg-[#151515] hover:bg-black text-[#F8FF70] font-black rounded-xl text-xs"
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