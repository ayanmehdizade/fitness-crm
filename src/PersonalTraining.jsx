import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Dumbbell, Plus, Search, CheckCircle2, AlertCircle, X, MapPin, 
  Check, AlertTriangle, XCircle, HelpCircle, Layers, Filter, PlusCircle, Trash2, ShieldAlert
} from 'lucide-react';

const trainersList = [
  'Elmir Uçar', 'Orxan Məmmədov', 'Nigar Həsənova', 'Tural Hüseynov', 
  'Kamran Əliyev', 'Aytən Məmmədova', 'Rauf Qasımov', 'Leyla Əliyeva',
  'Elçin Məmmədov', 'Vüsal Quliyev'
];

const clientsDatabase = [
  { id: 'MK-1042', name: 'Ayan Xəlilova' },
  { id: 'MK-1089', name: 'Kamran Alıyev' },
  { id: 'MK-1105', name: 'Leyla Məmmədova' },
  { id: 'MK-1120', name: 'Rauf Qasımov' },
  { id: 'MK-1144', name: 'Özcan Uçar' },
  { id: 'MK-1190', name: 'Sevda Məmmədova' }
];

const disciplineOptions = [
  'Fitness', 'CrossFit', 'Boxing / Kikboks', 'Pilates', 'Bodybuilding', 'Rehab & Stretching'
];

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
const daysOfWeek = ['Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə', 'Bazar'];

const initialPtMatrix = [
  { id: '1', trainer: 'Elmir Uçar', day: 'Bazar ertəsi', time: '10:00', client: 'Kamran Alıyev', clientId: 'MK-1089', discipline: 'Fitness', hall: 'Əsas Fitness Zalı', floor: '2-ci Mərtəbə', status: 'approved' },
  { id: '2', trainer: 'Orxan Məmmədov', day: 'Bazar ertəsi', time: '12:00', client: 'Ayan Xəlilova', clientId: 'MK-1042', discipline: 'CrossFit', hall: 'CrossFit Zone', floor: '1-ci Mərtəbə', status: 'pending' },
  { id: '3', trainer: 'Nigar Həsənova', day: 'Bazar ertəsi', time: '10:00', client: 'Leyla Məmmədova', clientId: 'MK-1105', discipline: 'Pilates', hall: 'VIP PT Zalı', floor: '3-cü Mərtəbə', status: 'approved' },
  { id: '4', trainer: 'Tural Hüseynov', day: 'Bazar ertəsi', time: '14:00', client: 'Rauf Qasımov', clientId: 'MK-1120', discipline: 'Boxing / Kikboks', hall: 'Boks Zalı', floor: '1-ci Mərtəbə', status: 'cancelled' }
];

export default function PersonalTraining() {
  const [schedules, setSchedules] = useState(initialPtMatrix);
  const [selectedDay, setSelectedDay] = useState('Bazar ertəsi');
  const [searchTrainer, setSearchTrainer] = useState('');
  
  // Modal state-ləri
  const [showModal, setShowModal] = useState(false);
  const [activeTrainer, setActiveTrainer] = useState('');
  const [activeTime, setActiveTime] = useState('');
  
  // ÖZƏL ONAY / ALERT MODALI
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    booking: null
  });

  const [selectedClientId, setSelectedClientId] = useState(clientsDatabase[0].id);
  const [hallInput, setHallInput] = useState('Əsas Fitness Zalı');
  const [floorInput, setFloorInput] = useState('2-ci Mərtəbə');
  const [disciplineInput, setDisciplineInput] = useState(disciplineOptions[0]);
  const [statusInput, setStatusInput] = useState('approved');

  const getSortedDailyAppointments = () => {
    const dayBookings = schedules.filter(s => s.day === selectedDay);
    const priorityMap = { approved: 1, pending: 2, cancelled: 3 };
    return dayBookings.sort((a, b) => {
      if (priorityMap[a.status] !== priorityMap[b.status]) {
        return priorityMap[a.status] - priorityMap[b.status];
      }
      return a.time.localeCompare(b.time);
    });
  };

  const handleOpenSlot = (trainer, time) => {
    const existing = schedules.find(s => s.trainer === trainer && s.day === selectedDay && s.time === time);
    if (existing) {
      setConfirmModal({
        isOpen: true,
        booking: existing
      });
    } else {
      setActiveTrainer(trainer);
      setActiveTime(time);
      setSelectedClientId(clientsDatabase[0].id);
      setShowModal(true);
    }
  };

  const handleApproveBooking = () => {
    if (!confirmModal.booking) return;
    setSchedules(schedules.map(item => {
      if (item.id === confirmModal.booking.id) {
        return { ...item, status: 'approved' };
      }
      return item;
    }));
    setConfirmModal({ isOpen: false, booking: null });
  };

  const handleDeleteBooking = () => {
    if (!confirmModal.booking) return;
    setSchedules(schedules.filter(s => s.id !== confirmModal.booking.id));
    setConfirmModal({ isOpen: false, booking: null });
  };

  const handleSaveBooking = (e) => {
    e.preventDefault();
    const foundClient = clientsDatabase.find(c => c.id === selectedClientId);

    const newBooking = {
      id: Date.now().toString(),
      trainer: activeTrainer,
      day: selectedDay,
      time: activeTime,
      client: foundClient ? foundClient.name : 'Müştəri',
      clientId: selectedClientId,
      discipline: disciplineInput,
      hall: hallInput,
      floor: floorInput,
      status: statusInput
    };

    setSchedules([...schedules, newBooking]);
    setShowModal(false);
  };

  const filteredTrainers = trainersList.filter(t => 
    t.toLowerCase().includes(searchTrainer.toLowerCase())
  );

  const dailyAppointments = getSortedDailyAppointments();

  return (
    <div className="m-0 p-0 box-border flex flex-col h-screen w-full overflow-hidden bg-slate-50 gap-3">
      
      {/* 1. ÜST PANEL VƏ GÜN SEÇİMİ */}
      <div className="bg-white border-b border-slate-200 p-3 shadow-2xs flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-2">
            <Dumbbell className="text-blue-600" size={18} /> Personal Training (PT) Canlı İdarəetmə Paneli
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Məşqçi seansları, zal bölgüsü və real-vaxt status nəzarəti.</p>
        </div>

        <div className="flex flex-wrap items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200 text-xs">
          {daysOfWeek.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs ${
                selectedDay === day ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* 2. PEŞƏKAR SIRA İLƏ DÜZÜLMÜŞ STATUS CARDS */}
      <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs space-y-2 shrink-0 mx-3">
        <div className="flex justify-between items-center border-b pb-1.5">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
            <Filter size={14} className="text-blue-600" />
            {selectedDay} Gününün Qrafik Xülasəsi
          </h4>
          <span className="text-xs font-bold text-slate-500">Aktiv Seanslar: <strong className="text-blue-600">{dailyAppointments.length} Təyin Olunub</strong></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          
          {/* APPROVED */}
          {dailyAppointments.filter(a => a.status === 'approved').map(item => (
            <div key={item.id} className="bg-emerald-50/60 border border-emerald-200 p-2.5 rounded-xl shadow-2xs space-y-1 relative overflow-hidden">
              <div className="w-1.5 h-full bg-emerald-500 absolute left-0 top-0"></div>
              <div className="flex justify-between items-start pl-1">
                <span className="font-mono font-bold text-xs text-slate-900 bg-white px-1.5 py-0.5 rounded border border-emerald-200 shadow-2xs">{item.time}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check size={10} /> Approved
                </span>
              </div>
              <div className="pl-1 space-y-0.5">
                <p className="font-black text-slate-900 text-xs">{item.client} <span className="text-[10px] text-slate-500 font-medium">({item.clientId})</span></p>
                <p className="text-[11px] font-bold text-blue-700">Məşqçi: {item.trainer}</p>
                <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin size={10} className="text-emerald-600" /> {item.hall} • {item.floor}
                </p>
              </div>
            </div>
          ))}

          {/* PENDING */}
          {dailyAppointments.filter(a => a.status === 'pending').map(item => (
            <div key={item.id} className="bg-amber-50/60 border border-amber-200 p-2.5 rounded-xl shadow-2xs space-y-1 relative overflow-hidden">
              <div className="w-1.5 h-full bg-amber-500 absolute left-0 top-0"></div>
              <div className="flex justify-between items-start pl-1">
                <span className="font-mono font-bold text-xs text-slate-900 bg-white px-1.5 py-0.5 rounded border border-amber-200 shadow-2xs">{item.time}</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle size={10} /> Pending
                </span>
              </div>
              <div className="pl-1 space-y-0.5">
                <p className="font-black text-slate-900 text-xs">{item.client} <span className="text-[10px] text-slate-500 font-medium">({item.clientId})</span></p>
                <p className="text-[11px] font-bold text-amber-900">Məşqçi: {item.trainer}</p>
                <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin size={10} className="text-amber-600" /> {item.hall}
                </p>
              </div>
            </div>
          ))}

          {/* CANCELLED */}
          {dailyAppointments.filter(a => a.status === 'cancelled').map(item => (
            <div key={item.id} className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl opacity-60 space-y-1 relative overflow-hidden">
              <div className="w-1.5 h-full bg-rose-400 absolute left-0 top-0"></div>
              <div className="flex justify-between items-start pl-1">
                <span className="font-mono font-bold text-xs text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 line-through">{item.time}</span>
                <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <XCircle size={10} /> Cancelled
                </span>
              </div>
              <div className="pl-1 space-y-0.5">
                <p className="font-bold text-slate-700 text-xs line-through">{item.client}</p>
                <p className="text-[11px] text-slate-500">Məşqçi: {item.trainer}</p>
              </div>
            </div>
          ))}

          {dailyAppointments.length === 0 && (
            <div className="col-span-full bg-slate-50 border border-dashed border-slate-200 p-2.5 rounded-xl text-center text-slate-400 text-xs font-semibold">
              Bu gün üçün təyin edilmiş seans yoxdur.
            </div>
          )}

        </div>
      </div>

      {/* 3. MƏŞQÇİ AXTARIŞ PANELİ */}
      <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-2xs flex items-center justify-between gap-3 shrink-0 mx-3">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Məşqçi adı ilə axtar..." 
            value={searchTrainer}
            onChange={e => setSearchTrainer(e.target.value)}
            className="w-full pl-8 pr-3 py-1 border border-slate-200 rounded-lg text-xs font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <span className="text-xs text-slate-500 font-bold">Aktiv Cədvəl Günü: <span className="text-blue-600">{selectedDay}</span></span>
      </div>

      {/* 4. FULL 100VH EKRAN YÜKSƏKLİYİNƏ UYGUN CƏDVƏL */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden mx-3 mb-3">
        <div className="overflow-auto h-full">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-slate-50 text-slate-700 border-b border-slate-200 shadow-2xs">
              <tr>
                <th className="p-2.5 border-r border-slate-200 w-20 text-center font-black text-slate-600 bg-slate-100/90 sticky left-0 z-20">Saat</th>
                {filteredTrainers.map(trainer => {
                  const count = schedules.filter(s => s.trainer === trainer && s.day === selectedDay && s.status !== 'cancelled').length;
                  return (
                    <th key={trainer} className="p-2.5 border-r border-slate-200 text-center min-w-[150px]">
                      <span className="font-extrabold text-slate-900 block text-xs">{trainer}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                        count > 0 ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-400 font-normal'
                      }`}>
                        {count > 0 ? `${count} Seans` : 'Boştur'}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {timeSlots.map(time => (
                <tr key={time} className="hover:bg-slate-50/40 transition">
                  <td className="p-2.5 border-r border-slate-200 font-mono font-extrabold text-slate-600 text-center bg-slate-50/80 sticky left-0 z-10 shadow-2xs">
                    {time}
                  </td>
                  {filteredTrainers.map(trainer => {
                    const booking = schedules.find(s => s.trainer === trainer && s.day === selectedDay && s.time === time);

                    return (
                      <td 
                        key={trainer} 
                        onClick={() => handleOpenSlot(trainer, time)}
                        className="p-1.5 border-r border-slate-200 align-middle text-center cursor-pointer group transition"
                      >
                        {booking ? (
                          <div className={`p-2 rounded-xl border transition shadow-2xs space-y-0.5 text-left ${
                            booking.status === 'approved' 
                              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 hover:bg-emerald-100' 
                              : booking.status === 'pending'
                              ? 'bg-amber-50/80 border-amber-300 text-amber-950 hover:bg-amber-100'
                              : 'bg-rose-50/50 border-rose-200 text-rose-800 line-through opacity-60'
                          }`}>
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[9px] font-mono font-black px-1 py-0.5 rounded bg-white/90 text-slate-800 border border-slate-200/60">
                                {booking.clientId}
                              </span>
                              <span className={`w-2 h-2 rounded-full ${
                                booking.status === 'approved' ? 'bg-emerald-500' : booking.status === 'pending' ? 'bg-amber-500 animate-pulse' : 'bg-rose-400'
                              }`}></span>
                            </div>

                            <p className="font-black text-slate-900 text-xs truncate max-w-[120px]">{booking.client}</p>

                            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-black/5 font-semibold text-slate-600">
                              <span className="font-extrabold text-blue-700 bg-white/60 px-1 py-0.5 rounded">{booking.discipline}</span>
                              <span className="text-[9px] text-slate-500 font-bold truncate max-w-[60px]">{booking.hall}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="py-2 rounded-lg border border-transparent group-hover:border-blue-200 group-hover:bg-blue-50/50 transition flex items-center justify-center gap-1 text-slate-300 group-hover:text-blue-600 font-semibold text-xs">
                            <PlusCircle size={13} className="opacity-0 group-hover:opacity-100 transition" />
                            <span className="text-[11px] group-hover:font-bold">+ Boş</span>
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

      {/* 5. FULL VIEWPORT Dış Karartmalı ONAY MODALI */}
      {confirmModal.isOpen && confirmModal.booking && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-200 text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="font-black text-slate-900 text-base">Seans İdarəetməsi Və Təsdiq</h3>
              <p className="text-xs text-slate-600 px-2 font-medium">
                <strong className="text-slate-900">"{confirmModal.booking.client}"</strong> ({confirmModal.booking.clientId}) üçün təyin olunmuş <span className="font-mono font-bold text-blue-600">{confirmModal.booking.time}</span> seansı haqqında qərar verin.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-left space-y-1.5 font-semibold text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Məşqçi:</span>
                <span className="text-slate-900 font-bold">{confirmModal.booking.trainer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">İstiqamət & Zal:</span>
                <span className="text-slate-900 font-bold">{confirmModal.booking.discipline} | {confirmModal.booking.hall}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                <span className="text-slate-500">Cari Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  confirmModal.booking.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {confirmModal.booking.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              <button 
                onClick={handleApproveBooking}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-xs"
              >
                <Check size={14} /> Approve Et
              </button>

              <button 
                onClick={handleDeleteBooking}
                className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1"
              >
                <Trash2 size={14} /> Seansı Sil
              </button>

              <button 
                onClick={() => setConfirmModal({ isOpen: false, booking: null })}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Ləğv Et
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. FULL VIEWPORT Dış Karartmalı SEANS ƏLAVƏ ETMƏ MODALI */}
      {showModal && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4 border border-slate-200 animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-sm">PT Saatı Və Status Təyin Et</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
                <X size={18} />
              </button>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 p-3.5 rounded-xl text-xs space-y-1.5 text-blue-900 font-medium">
              <p><b>Məşqçi:</b> {activeTrainer}</p>
              <p><b>Gün / Saat:</b> {selectedDay} | <span className="font-mono font-bold">{activeTime}</span></p>
              
              <div className="pt-1.5 border-t border-blue-200/80 flex items-center justify-between text-[11px] text-blue-950 font-bold">
                <span className="flex items-center gap-1"><MapPin size={13} className="text-blue-600" /> {hallInput}</span>
                <span className="bg-blue-200/80 px-2 py-0.5 rounded text-[10px] font-extrabold">{floorInput}</span>
              </div>
            </div>

            <form onSubmit={handleSaveBooking} className="space-y-3 text-xs">
              
              <div>
                <label className="font-bold text-slate-700 block mb-1">Müştərinin Adı Soyadı (Baza ID ilə):</label>
                <select 
                  value={selectedClientId}
                  onChange={e => setSelectedClientId(e.target.value)}
                  className="w-full p-2.5 border rounded-xl font-bold bg-slate-50 text-slate-800 focus:bg-white"
                >
                  {clientsDatabase.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.id} - {client.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Seans Statusu (Appoint Status):</label>
                <select 
                  value={statusInput}
                  onChange={e => setStatusInput(e.target.value)}
                  className="w-full p-2.5 border rounded-xl font-extrabold bg-slate-50 text-slate-900"
                >
                  <option value="approved">✅ Approved (Təsdiqlənib)</option>
                  <option value="pending">⏳ Pending (Gözləmədə)</option>
                  <option value="cancelled">❌ Cancelled (Ləğv Edilib)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Məşq Zalı:</label>
                  <select 
                    value={hallInput}
                    onChange={e => setHallInput(e.target.value)}
                    className="w-full p-2 border rounded-xl font-bold bg-slate-50 text-[11px]"
                  >
                    <option value="Əsas Fitness Zalı">Əsas Fitness Zalı</option>
                    <option value="CrossFit Zone">CrossFit Zone</option>
                    <option value="VIP PT Zalı">VIP PT Zalı</option>
                    <option value="Boks Zalı">Boks Zalı</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mərtəbə:</label>
                  <select 
                    value={floorInput}
                    onChange={e => setFloorInput(e.target.value)}
                    className="w-full p-2 border rounded-xl font-bold bg-slate-50 text-[11px]"
                  >
                    <option value="1-ci Mərtəbə">1-ci Mərtəbə</option>
                    <option value="2-ci Mərtəbə">2-ci Mərtəbə</option>
                    <option value="3-cü Mərtəbə">3-cü Mərtəbə</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">İstiqamət / Növ:</label>
                <select 
                  value={disciplineInput}
                  onChange={e => setDisciplineInput(e.target.value)}
                  className="w-full p-2.5 border rounded-xl font-bold bg-slate-50 text-slate-800 focus:bg-white"
                >
                  {disciplineOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Ləğv
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Təsdiq Et
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}