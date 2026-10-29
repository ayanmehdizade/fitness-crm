import React, { useState } from 'react';
import { 
  HandHeart, Clock, Calendar, Search, Plus, User, Check, X, Filter, DollarSign 
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

  const filteredSchedule = schedule.filter(item => {
    const matchesSearch = item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.therapist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDay = dayFilter === 'Bütün Günlər' || item.day === dayFilter;
    const matchesTherapist = therapistFilter === 'ALL' || item.therapist === therapistFilter;
    return matchesSearch && matchesDay && matchesTherapist;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. ÜST BAŞLIQ VƏ ƏLAVƏ ETMƏ DÜYMƏSİ */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <HandHeart className="text-rose-600" size={18} /> Masaj Seansları Qrafiki (Schedule Table)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Seans saatları, müddəti, xidmət növü və masajist təyinat cədvəli</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Yeni Seans Əlavə Et
        </button>
      </div>

      {/* 2. FİLTRLƏR VƏ AXTARIŞ */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Müştəri, masajist və ya xidmət axtar..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border rounded-lg text-xs font-medium bg-slate-50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select 
            value={dayFilter} 
            onChange={e => setDayFilter(e.target.value)}
            className="p-1.5 border rounded-lg font-bold bg-slate-50 text-slate-700"
          >
            {daysOfWeek.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select 
            value={therapistFilter} 
            onChange={e => setTherapistFilter(e.target.value)}
            className="p-1.5 border rounded-lg font-bold bg-slate-50 text-slate-700"
          >
            <option value="ALL">Bütün Masajistlər</option>
            {therapistsList.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. İŞLƏK CƏDVƏL (TABLE) FORMATI */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b">
              <tr>
                <th className="p-3.5 border-r">ID / Müştəri</th>
                <th className="p-3.5 border-r">Masajist (Terapevt)</th>
                <th className="p-3.5 border-r">Xidmət Növü</th>
                <th className="p-3.5 border-r">Həftənin Günü</th>
                <th className="p-3.5 border-r">Saat</th>
                <th className="p-3.5 border-r">Müddət</th>
                <th className="p-3.5 border-r">Qiymət</th>
                <th className="p-3.5 text-right">Status / Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              {filteredSchedule.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-slate-400 font-semibold">
                    Axtarışa uyğun masaj seansı tapılmadı.
                  </td>
                </tr>
              ) : (
                filteredSchedule.map(item => {
                  const isConfirmed = item.status === 'Təsdiqləndi';
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition align-middle">
                      
                      <td className="p-3.5 border-r">
                        <span className="font-bold text-slate-900 text-sm block">{item.clientName}</span>
                        <span className="text-[10px] font-mono text-slate-400">{item.id}</span>
                      </td>

                      <td className="p-3.5 border-r font-bold text-rose-700 flex items-center gap-1.5 pt-4">
                        <User size={13} className="text-slate-400" /> {item.therapist}
                      </td>

                      <td className="p-3.5 border-r text-slate-700 font-semibold">
                        {item.serviceType}
                      </td>

                      <td className="p-3.5 border-r font-bold text-purple-700 bg-purple-50/50">
                        {item.day}
                      </td>

                      <td className="p-3.5 border-r font-mono font-bold text-slate-900">
                        {item.time}
                      </td>

                      <td className="p-3.5 border-r">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold text-[10px] border border-blue-200">
                          ⏱ {item.duration}
                        </span>
                      </td>

                      <td className="p-3.5 border-r font-black text-slate-900">
                        {item.price}
                      </td>

                      <td className="p-3.5 text-right">
                        <button 
                          onClick={() => handleToggleStatus(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ml-auto shadow-xs ${
                            isConfirmed 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200' 
                              : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
                          }`}
                        >
                          <Check size={13} /> {item.status}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <HandHeart className="text-rose-600" size={18} /> Yeni Masaj Seansı Qeydə Al
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddBooking} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Müştərinin Adı Soyadı:</label>
                <input 
                  type="text" 
                  placeholder="Məs: Ayan Xəlilova" 
                  value={clientInput}
                  onChange={e => setClientInput(e.target.value)}
                  className="w-full p-2.5 border rounded-lg font-medium bg-slate-50 focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Masajist (Terapevt):</label>
                  <select 
                    value={therapistInput}
                    onChange={e => setTherapistInput(e.target.value)}
                    className="w-full p-2.5 border rounded-lg font-bold bg-slate-50"
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
                    className="w-full p-2.5 border rounded-lg font-medium bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Həftənin Günü:</label>
                  <select 
                    value={dayInput}
                    onChange={e => setDayInput(e.target.value)}
                    className="w-full p-2.5 border rounded-lg font-bold bg-slate-50"
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
                    className="w-full p-2.5 border rounded-lg font-medium bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Müddət:</label>
                  <select 
                    value={durationInput}
                    onChange={e => setDurationInput(e.target.value)}
                    className="w-full p-2.5 border rounded-lg font-bold bg-slate-50"
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
                    className="w-full p-2.5 border rounded-lg font-medium bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Ləğv et
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-sm"
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