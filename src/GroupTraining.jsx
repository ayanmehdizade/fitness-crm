import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Users, Plus, Check, X, BookOpen, DollarSign, ArrowRight, UserCheck, UserX, ShieldAlert, Trash2
} from 'lucide-react';

const daysOfWeek = ['Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə', 'Bazar'];
const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '15:00', '17:00', '18:00', '19:00', '20:00'];
const trainersList = ['Nigar Həsənova', 'Orxan Məmmədov', 'Tural Hüseynov', 'Elmir Uçar'];

const initialGroupSchedule = [
  { 
    id: 'GRP-101', className: 'Spinning / Cycle', trainer: 'Orxan Məmmədov', 
    day: 'Bazar ertəsi', time: '11:00', maxCapacity: 7, isPaid: true, price: '20 AZN',
    status: 'Gözlənilir', 
    participants: [
      { name: 'Ayan Xəlilova', attended: true },
      { name: 'Leyla Məmmədova', attended: true },
      { name: 'Kamran Alıyev', attended: true },
      { name: 'Rauf Qasımov', attended: true },
      { name: 'Sevda Məmmədova', attended: true },
      { name: 'Elçin Məmmədov', attended: false }
    ] 
  },
  { 
    id: 'GRP-102', className: 'Yoga & Stretching', trainer: 'Nigar Həsənova', 
    day: 'Bazar ertəsi', time: '09:00', maxCapacity: 10, isPaid: true, price: '15 AZN',
    status: 'Keçirildi', 
    participants: [
      { name: 'Ayan Xəlilova', attended: true },
      { name: 'Leyla Məmmədova', attended: true },
      { name: 'Günay Əliyeva', attended: true }
    ] 
  },
  { 
    id: 'GRP-103', className: 'Pilates Reformer', trainer: 'Tural Hüseynov', 
    day: 'Çərşənbə', time: '11:00', maxCapacity: 5, isPaid: false, price: 'Pulsuz (Abunə)',
    status: 'Keçirildi', 
    participants: [
      { name: 'Ayan Xəlilova', attended: true },
      { name: 'Günay Əliyeva', attended: true },
      { name: 'Rauf Qasımov', attended: false }
    ] 
  }
];

export default function GroupTraining() {
  const [schedule, setSchedule] = useState(initialGroupSchedule);
  
  // Detal modalı
  const [selectedClass, setSelectedClass] = useState(null);

  // ÖZƏL ONAY / SİLME MODALI (MISSCLICK ÖNLƏYİCİ)
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    groupClass: null
  });

  // Yeni dərs əlavə etmək üçün Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [classNameInput, setClassNameInput] = useState('');
  const [trainerInput, setTrainerInput] = useState(trainersList[0]);
  const [dayInput, setDayInput] = useState('Bazar ertəsi');
  const [timeInput, setTimeInput] = useState('11:00');
  const [capacityInput, setCapacityInput] = useState(7);
  const [isPaidInput, setIsPaidInput] = useState(true);
  const [priceInput, setPriceInput] = useState('20 AZN');
  const [participantInput, setParticipantInput] = useState('');

  // Müştərinin iştirak statusunu dəyişmək (Check-in)
  const handleToggleAttendance = (classId, participantIndex) => {
    const updatedSchedule = schedule.map(item => {
      if (item.id === classId) {
        const updatedParticipants = [...item.participants];
        updatedParticipants[participantIndex].attended = !updatedParticipants[participantIndex].attended;
        return { ...item, participants: updatedParticipants };
      }
      return item;
    });

    setSchedule(updatedSchedule);
    const currentClass = updatedSchedule.find(c => c.id === classId);
    setSelectedClass(currentClass);
  };

  // Dərsin statusunu dəyişmək
  const handleToggleStatus = (id) => {
    setSchedule(schedule.map(item => {
      if (item.id === id) {
        const newStatus = item.status === 'Keçirildi' ? 'Gözlənilir' : 'Keçirildi';
        const updated = { ...item, status: newStatus };
        setSelectedClass(updated);
        return updated;
      }
      return item;
    }));
  };

  // Dərsi silmək
  const handleDeleteClass = () => {
    if (!confirmModal.groupClass) return;
    setSchedule(schedule.filter(s => s.id !== confirmModal.groupClass.id));
    if (selectedClass?.id === confirmModal.groupClass.id) {
      setSelectedClass(null);
    }
    setConfirmModal({ isOpen: false, groupClass: null });
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!classNameInput) return;

    const participantsList = participantInput 
      ? participantInput.split(',').map(p => ({ name: p.trim(), attended: false })) 
      : [];

    const newEntry = {
      id: `GRP-10${schedule.length + 1}`,
      className: classNameInput,
      trainer: trainerInput,
      day: dayInput,
      time: timeInput,
      maxCapacity: Number(capacityInput) || 7,
      isPaid: isPaidInput,
      price: isPaidInput ? priceInput : 'Pulsuz',
      status: 'Gözlənilir',
      participants: participantsList
    };

    setSchedule([newEntry, ...schedule]);
    setClassNameInput('');
    setParticipantInput('');
    setShowAddModal(false);
  };

  return (
    <div className="m-0 p-0 box-border flex flex-col h-screen w-full overflow-hidden bg-slate-50 gap-3">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 p-3 shadow-2xs flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-2">
            <Users className="text-purple-600" size={18} /> Həftəlik Qrup Dərsləri Və Attendance Matrisi
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Tutumu (Max capacity), canlı iştirak sayını görün və gələn müştəriləri tək kliklə "Check-in" edin.</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
        >
          <Plus size={15} /> Qrafikə Dərs Əlavə Et
        </button>
      </div>

      {/* 100VH FULL GRID CƏDVƏL */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden mx-3 mb-3">
        <div className="overflow-auto h-full">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-slate-50 text-slate-700 border-b border-slate-200 shadow-2xs">
              <tr>
                <th className="p-3 border-r border-slate-200 w-20 text-center font-black text-slate-600 bg-slate-100/90 sticky left-0 z-20">Saat</th>
                {daysOfWeek.map(day => (
                  <th key={day} className="p-3 border-r border-slate-200 font-extrabold text-center min-w-[160px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {timeSlots.map(time => (
                <tr key={time} className="hover:bg-slate-50/40 transition">
                  <td className="p-3 border-r border-slate-200 font-mono font-extrabold text-slate-600 text-center bg-slate-50/80 sticky left-0 z-10 shadow-2xs">
                    {time}
                  </td>
                  {daysOfWeek.map(day => {
                    const item = schedule.find(s => s.day === day && s.time === time);
                    const isCompleted = item?.status === 'Keçirildi';
                    const attendedCount = item ? item.participants.filter(p => p.attended).length : 0;
                    const totalReserved = item ? item.participants.length : 0;
                    const isFull = totalReserved >= (item?.maxCapacity || 0);

                    return (
                      <td key={day} className="p-2 border-r border-slate-200 text-center align-middle">
                        {item ? (
                          <div 
                            onClick={() => setSelectedClass(item)}
                            className={`p-2.5 rounded-xl cursor-pointer transition shadow-2xs flex flex-col justify-between text-left ${
                              isCompleted 
                                ? 'bg-emerald-50/80 border border-emerald-300 hover:bg-emerald-100 text-emerald-950' 
                                : 'bg-purple-50/70 border border-purple-200 hover:bg-purple-100/80 text-purple-950'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-extrabold text-slate-900 truncate max-w-[110px]">{item.className}</span>
                              <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-purple-600 animate-pulse'}`}></span>
                            </div>

                            <span className="text-[10px] font-semibold text-slate-600 block truncate mb-1.5">{item.trainer}</span>
                            
                            <div className="space-y-1 bg-white/80 p-1.5 rounded-lg border border-purple-100/60">
                              <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-purple-700">İştirak: {attendedCount}/{totalReserved}</span>
                                <span className={isFull ? 'text-rose-600 font-extrabold' : 'text-slate-500'}>
                                  Limit: {totalReserved}/{item.maxCapacity}
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${isFull ? 'bg-rose-500' : 'bg-purple-600'}`}
                                  style={{ width: `${Math.min(100, (totalReserved / item.maxCapacity) * 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-300 font-medium">-</span>
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

      {/* FULL VIEWPORT ONAY / SİLME MODALI */}
      {confirmModal.isOpen && confirmModal.groupClass && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-200 text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="font-black text-slate-900 text-base">Qrup Dərsini Silmək İstəyirsiniz?</h3>
              <p className="text-xs text-slate-600 px-2 font-medium">
                <strong className="text-slate-900">"{confirmModal.groupClass.className}"</strong> ({confirmModal.groupClass.day} | {confirmModal.groupClass.time}) dərsini cədvəldən silirsiniz.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-left space-y-1.5 font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Məşqçi:</span>
                <span className="text-slate-900 font-bold">{confirmModal.groupClass.trainer}</span>
              </div>
              <div className="flex justify-between">
                <span>Qayıdış / Rezerv:</span>
                <span className="text-purple-700 font-bold">{confirmModal.groupClass.participants.length} / {confirmModal.groupClass.maxCapacity} Nəfər</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                onClick={handleDeleteClass}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-xs"
              >
                <Trash2 size={14} /> Təsdiq Et Və Sil
              </button>
              <button 
                onClick={() => setConfirmModal({ isOpen: false, groupClass: null })}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Ləğv Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL VIEWPORT CHECK-IN & DETAL MODALI */}
      {selectedClass && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{selectedClass.id}</span>
                <h3 className="font-black text-slate-900 text-base">{selectedClass.className}</h3>
              </div>
              <button onClick={() => setSelectedClass(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Məşqçi:</span>
                  <span className="font-bold text-purple-700">{selectedClass.trainer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vaxt:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedClass.day} | {selectedClass.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Maksimum Tutum:</span>
                  <span className="font-bold text-slate-900">{selectedClass.maxCapacity} Nəfərlik Zal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ödəniş:</span>
                  <span className="font-bold text-slate-900">{selectedClass.price} ({selectedClass.isPaid ? 'Ödənişli' : 'Abunə'})</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-slate-800 text-xs">
                    İştirakçılar ({selectedClass.participants.filter(p => p.attended).length} / {selectedClass.participants.length} Gəlib):
                  </label>
                  <span className="text-[10px] text-slate-500 font-semibold">* Klikləyib Check-in edin</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 max-h-44 overflow-y-auto space-y-1.5">
                  {selectedClass.participants.length === 0 ? (
                    <span className="text-slate-400 italic block py-2 text-center">Hələ rezerv edən yoxdur.</span>
                  ) : (
                    selectedClass.participants.map((p, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => handleToggleAttendance(selectedClass.id, idx)}
                        className={`p-2 rounded-lg border font-semibold text-xs flex items-center justify-between cursor-pointer transition ${
                          p.attended 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="font-bold">{p.name}</span>
                        <div className="flex items-center gap-1">
                          {p.attended ? (
                            <span className="text-[10px] font-bold bg-emerald-200/80 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                              <UserCheck size={12} /> Gəlib
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded flex items-center gap-1">
                              <UserX size={12} /> Gəlməyib
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-between items-center gap-2">
              <button 
                onClick={() => handleToggleStatus(selectedClass.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
                  selectedClass.status === 'Keçirildi' 
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <Check size={14} /> 
                {selectedClass.status === 'Keçirildi' ? 'Gözlənilirə Çevir' : 'Dərsi Keçirildi Təsdiq Et'}
              </button>

              <button 
                onClick={() => setConfirmModal({ isOpen: true, groupClass: selectedClass })}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl text-xs transition"
              >
                Dərsi Sil
              </button>

              <button 
                onClick={() => setSelectedClass(null)}
                className="px-3 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50 text-xs"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL VIEWPORT YENİ DƏRS ƏLAVƏ MODALI */}
      {showAddModal && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Users className="text-purple-600" size={18} /> Qrafikə Dərs Əlavə Et
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddClass} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Dərs Adı:</label>
                <input 
                  type="text" 
                  placeholder="Məs: Spinning / Cycle, Yoga" 
                  value={classNameInput}
                  onChange={e => setClassNameInput(e.target.value)}
                  className="w-full p-2.5 border rounded-lg font-medium bg-slate-50 focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Məşqçi:</label>
                  <select 
                    value={trainerInput}
                    onChange={e => setTrainerInput(e.target.value)}
                    className="w-full p-2.5 border rounded-lg font-bold bg-slate-50"
                  >
                    {trainersList.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Max Tutum (Nəfər):</label>
                  <input 
                    type="number" 
                    value={capacityInput}
                    onChange={e => setCapacityInput(e.target.value)}
                    className="w-full p-2.5 border rounded-lg font-bold bg-slate-50 focus:bg-white"
                    min="1"
                    max="50"
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
                    {daysOfWeek.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Saat:</label>
                  <select 
                    value={timeInput}
                    onChange={e => setTimeInput(e.target.value)}
                    className="w-full p-2.5 border rounded-lg font-bold bg-slate-50"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ödəniş Növü:</label>
                  <select 
                    value={isPaidInput ? 'yes' : 'no'}
                    onChange={e => setIsPaidInput(e.target.value === 'yes')}
                    className="w-full p-2.5 border rounded-lg font-bold bg-slate-50"
                  >
                    <option value="yes">Ödənişli</option>
                    <option value="no">Pulsuz (Abunə)</option>
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

              <div>
                <label className="font-bold text-slate-700 block mb-1">İştirakçılar (vergüllə ayırın):</label>
                <input 
                  type="text" 
                  placeholder="Məs: Ayan Xəlilova, Kamran Alıyev, Leyla M." 
                  value={participantInput}
                  onChange={e => setParticipantInput(e.target.value)}
                  className="w-full p-2.5 border rounded-lg font-medium bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Ləğv
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Cədvələ Əlavə Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}