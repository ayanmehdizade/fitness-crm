import React, { useState } from 'react';
import { 
  Briefcase, Users, FileText, Calendar, Plus, Search, Check, X, ShieldAlert,
  Download, FileSpreadsheet, DollarSign, Award, Clock, Building2, TrendingUp, Layers,
  ClipboardCheck, AlertCircle, Fingerprint, MessageSquare, PackageOpen, ArrowRightLeft, CheckSquare, Square, Edit3, RefreshCw
} from 'lucide-react';

const initialDepartmentSchedules = [
  {
    category: 'Administration',
    staff: [
      { id: 's-1', name: 'Özcan', position: 'Manager', days: [{in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: 'OFF', out: 'OFF'}, {in: 'OFF', out: 'OFF'}] },
      { id: 's-2', name: 'Fuad', position: 'Supervisor', days: [{in: '11:00', out: '19:00'}, {in: 'OFF', out: 'OFF'}, {in: '11:00', out: '19:00'}, {in: '11:00', out: '19:00'}, {in: '11:00', out: '19:00'}, {in: '11:00', out: '19:00'}, {in: '11:00', out: '19:00'}] },
      { id: 's-3', name: 'Ayan', position: 'Team Leader', days: [{in: '13:00', out: '21:00'}, {in: '13:00', out: '21:00'}, {in: '13:00', out: '21:00'}, {in: '13:00', out: '21:00'}, {in: '13:00', out: '21:00'}, {in: 'OFF', out: 'OFF'}, {in: 'OFF', out: 'OFF'}] },
      { id: 's-4', name: 'Fazil', position: 'Accountant', days: [{in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: 'OFF', out: 'OFF'}, {in: 'OFF', out: 'OFF'}] }
    ]
  },
  {
    category: 'Sales/Reception',
    staff: [
      { id: 's-5', name: 'Vüqar', position: 'Reception', days: [{in: '13:00', out: '21:00'}, {in: '06:00', out: '14:00'}, {in: 'OFF', out: 'OFF'}, {in: '13:00', out: '21:00'}, {in: '06:00', out: '14:00'}, {in: '14:00', out: '22:00'}, {in: '14:00', out: '22:00'}] },
      { id: 's-6', name: 'Amina Z', position: 'Reception', days: [{in: '06:00', out: '14:00'}, {in: '09:00', out: '17:00'}, {in: '06:00', out: '14:00'}, {in: '06:00', out: '14:00'}, {in: '12:00', out: '20:00'}, {in: '07:00', out: '15:00'}, {in: 'OFF', out: 'OFF'}] },
      { id: 's-7', name: 'Amina', position: 'Reception', days: [{in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: 'OFF', out: 'OFF'}, {in: '07:00', out: '15:00'}] }
    ]
  },
  {
    category: 'Instructions',
    staff: [
      { id: 's-8', name: 'Tamerlan', position: 'Pool trainer', days: [{in: '14:00', out: '20:00'}, {in: '15:00', out: '19:00'}, {in: '14:00', out: '20:00'}, {in: '15:00', out: '19:00'}, {in: '14:00', out: '20:00'}, {in: '14:00', out: '19:00'}, {in: 'OFF', out: 'OFF'}] },
      { id: 's-9', name: 'Hesret', position: 'Barber', days: [{in: '12:00', out: '20:00'}, {in: 'OFF', out: 'OFF'}, {in: '12:00', out: '20:00'}, {in: '12:00', out: '20:00'}, {in: '12:00', out: '20:00'}, {in: '12:00', out: '20:00'}, {in: '12:00', out: '20:00'}] },
      { id: 's-10', name: 'Ali', position: 'GYM Instructor', days: [{in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: 'OFF', out: 'OFF'}, {in: '15:00', out: '23:00'}, {in: '14:00', out: '22:00'}, {in: '14:00', out: '22:00'}] }
    ]
  }
];

// График для следующей недели (например, 9-15 ноября) с дефолтными значениями
const nextWeekDepartmentSchedules = [
  {
    category: 'Administration',
    staff: [
      { id: 'ns-1', name: 'Özcan', position: 'Manager', days: [{in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: 'OFF', out: 'OFF'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: 'OFF', out: 'OFF'}] },
      { id: 'ns-2', name: 'Fuad', position: 'Supervisor', days: [{in: 'OFF', out: 'OFF'}, {in: '11:00', out: '19:00'}, {in: '11:00', out: '19:00'}, {in: '11:00', out: '19:00'}, {in: '11:00', out: '19:00'}, {in: '11:00', out: '19:00'}, {in: 'OFF', out: 'OFF'}] },
      { id: 'ns-3', name: 'Ayan', position: 'Team Leader', days: [{in: '13:00', out: '21:00'}, {in: '13:00', out: '21:00'}, {in: '13:00', out: '21:00'}, {in: 'OFF', out: 'OFF'}, {in: '13:00', out: '21:00'}, {in: '13:00', out: '21:00'}, {in: 'OFF', out: 'OFF'}] },
      { id: 'ns-4', name: 'Fazil', position: 'Accountant', days: [{in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: '09:00', out: '18:00'}, {in: 'OFF', out: 'OFF'}, {in: 'OFF', out: 'OFF'}, {in: '09:00', out: '18:00'}] }
    ]
  },
  {
    category: 'Sales/Reception',
    staff: [
      { id: 'ns-5', name: 'Vüqar', position: 'Reception', days: [{in: '06:00', out: '14:00'}, {in: '13:00', out: '21:00'}, {in: '13:00', out: '21:00'}, {in: 'OFF', out: 'OFF'}, {in: '06:00', out: '14:00'}, {in: '14:00', out: '22:00'}, {in: '14:00', out: '22:00'}] },
      { id: 'ns-6', name: 'Amina Z', position: 'Reception', days: [{in: '12:00', out: '20:00'}, {in: '06:00', out: '14:00'}, {in: '09:00', out: '17:00'}, {in: '06:00', out: '14:00'}, {in: '06:00', out: '14:00'}, {in: 'OFF', out: 'OFF'}, {in: '07:00', out: '15:00'}] },
      { id: 'ns-7', name: 'Amina', position: 'Reception', days: [{in: 'OFF', out: 'OFF'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '07:00', out: '15:00'}] }
    ]
  },
  {
    category: 'Instructions',
    staff: [
      { id: 'ns-8', name: 'Tamerlan', position: 'Pool trainer', days: [{in: '15:00', out: '19:00'}, {in: '14:00', out: '20:00'}, {in: 'OFF', out: 'OFF'}, {in: '15:00', out: '19:00'}, {in: '14:00', out: '20:00'}, {in: '14:00', out: '19:00'}, {in: '14:00', out: '20:00'}] },
      { id: 'ns-9', name: 'Hesret', position: 'Barber', days: [{in: '12:00', out: '20:00'}, {in: '12:00', out: '20:00'}, {in: '12:00', out: '20:00'}, {in: 'OFF', out: 'OFF'}, {in: '12:00', out: '20:00'}, {in: '12:00', out: '20:00'}, {in: '12:00', out: '20:00'}] },
      { id: 'ns-10', name: 'Ali', position: 'GYM Instructor', days: [{in: '15:00', out: '23:00'}, {in: 'OFF', out: 'OFF'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '15:00', out: '23:00'}, {in: '14:00', out: '22:00'}, {in: '14:00', out: '22:00'}] }
    ]
  }
];

const initialLostAndFound = [
  { id: 'LF-01', item: 'Gümüş Qolbaq', location: 'Qadın Soyununma Otağı (Locker)', date: '28.10.2026', time: '14:20', finder: 'Aytən M.', status: 'Saxlanılır' },
  { id: 'LF-02', item: 'AirPods Qulaqlıq', location: 'İdman Zalı (Cardio Zone)', date: '28.10.2026', time: '16:00', finder: 'Kamran A.', status: 'Təhvil verildi' }
];

const initialExpenses = [
  { id: 'EXP-01', title: 'Təmizlik Vasitələri (Xlor, Sabun)', category: 'Təsərrüfat', amount: '150 AZN', balance: '3,850 AZN', date: '28.10.2026', supervisor: 'Ayan X.' },
  { id: 'EXP-02', title: 'Kafe FitBar Üçün Süd və Su Alışı', category: 'İaşə / Bar', amount: '240 AZN', balance: '3,610 AZN', date: '27.10.2026', supervisor: 'Ayan X.' }
];

const initialFingerprint = [
  { id: 'FP-1', name: 'Cavid Quliyev', role: 'Bərbər', checkIn: '08:55', checkOut: '19:02', status: 'Vaxtında' },
  { id: 'FP-2', name: 'Nərmin Məmmədova', role: 'Kosmetoloq', checkIn: '09:15', checkOut: '—', status: 'Gecikmə (15 dəq)' },
  { id: 'FP-3', name: 'Ramiq Əliyev', role: 'Masajist', checkIn: '09:50', checkOut: '—', status: 'Vaxtında' }
];

const initialHandovers = [
  { id: 'HO-1', type: 'Supervisor Növbə Təhvil-Təslim', from: 'Ayan X.', to: 'Növbəti Supervisor', note: 'Kassa yekunu yoxlanıldı, heç bir əskik yoxdur.', date: '28.10.2026' },
  { id: 'HO-2', type: 'Reception Təhvil-Təslim', from: 'Resepşn 1', to: 'Resepşn 2', note: 'Bütün açarlar təhvil verildi, POS terminal balans verdi.', date: '28.10.2026' }
];

const initialCVs = [
  { id: 'CV-1', candidate: 'Elvin Məmmədov', vacancy: 'Fitness Təlimatçı', phone: '+994 50 999 88 77', date: '27.10.2026', status: 'Müsahibə gözləyir' },
  { id: 'CV-2', candidate: 'Leyla Həsənova', vacancy: 'Resepşn', phone: '+994 55 444 33 22', date: '26.10.2026', status: 'Bəyənildi' }
];

const initialDisciplinary = [
  { id: 'DIS-1', staff: 'Vüqar M.', type: 'Töhmət (Gecikmə)', note: 'İşə 25 dəqiqə gecikmə səbəbilə xəbərdarlıq edildi.', date: '27.10.2026', action: 'Rəsmi Töhmət' },
  { id: 'DIS-2', staff: 'Kamran A.', type: 'Təklif və İrad', note: 'Qəbul şöbəsində havalandırma sisteminin tənzimlənməsi təklifi.', date: '26.10.2026', action: 'İrəli sürüldü' }
];

const initialChecklistGroups = [
  {
    groupName: 'Qadın GSA (Qadın Soyunma, Duş və Zona)',
    tasks: [
      { id: 'q-1', task: 'Qadın soyunma otağı döşəmələrinin təmizliyi', done: true, time: '09:00', staff: 'Aytən M.' },
      { id: 'q-2', task: 'Duş kabinalarının xlorlanması və yuyulması', done: true, time: '11:30', staff: 'Aytən M.' },
      { id: 'q-3', task: 'Fen və güzgü zonalarının səliqəyə salınması', done: false, time: '—', staff: 'Təyin olunmayıb' },
      { id: 'q-4', task: 'Tualet kağızı və sabunların yenilənməsi', done: true, time: '12:00', staff: 'Aytən M.' }
    ]
  },
  {
    groupName: 'Kişi GSA (Kişi Soyunma, Duş və Zona)',
    tasks: [
      { id: 'k-1', task: 'Kişi soyunma otağı şkaflarının yoxlanılması', done: true, time: '08:30', staff: 'Kamran A.' },
      { id: 'k-2', task: 'Duş zonası və drenajların təmizlənməsi', done: false, time: '—', staff: 'Təyin olunmayıb' },
      { id: 'k-3', task: 'Sanitar qovşaqların dezinfeksiyası', done: true, time: '14:00', staff: 'Kamran A.' }
    ]
  },
  {
    groupName: 'İnstructorlar (İdman Zalı, Hovuz və Studio)',
    tasks: [
      { id: 'i-1', task: 'İdman zalı (Cardio & Free Weight) alətlərinin silinməsi', done: true, time: '10:00', staff: 'Ali İ.' },
      { id: 'i-2', task: 'Hovuz suyu təmizliyi və pH səviyyəsinin yoxlanılması', done: true, time: '08:00', staff: 'Tamerlan P.' },
      { id: 'i-3', task: 'Studio otağının (Group Class) havalandırılması və ləvazimatların yığılması', done: false, time: '—', staff: 'Təyin olunmayıb' }
    ]
  }
];

export default function OperationsHR() {
  const [activeTab, setActiveTab] = useState('schedule'); 
  
  // Разделяем графики на текущую и следующую неделю для полноценного апдейта
  const [currentWeekSchedule, setCurrentWeekSchedule] = useState(initialDepartmentSchedules);
  const [nextWeekSchedule, setNextWeekSchedule] = useState(nextWeekDepartmentSchedules);

  const [lostAndFound, setLostAndFound] = useState(initialLostAndFound);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [fingerprint, setFingerprint] = useState(initialFingerprint);
  const [handovers, setHandovers] = useState(initialHandovers);
  const [cvs, setCvs] = useState(initialCVs);
  const [disciplinary, setDisciplinary] = useState(initialDisciplinary);
  const [checklistGroups, setChecklistGroups] = useState(initialChecklistGroups);

  const [selectedWeek, setSelectedWeek] = useState('current'); // 'current' (2-8 Noyabr) | 'next' (9-15 Noyabr)

  // Состояние для модального окна ручного редактирования ячейки
  const [editingCell, setEditingCell] = useState(null); // { deptIdx, staffIdx, dayIdx, name, currentWeekKey }
  const [editInTime, setEditInTime] = useState('09:00');
  const [editOutTime, setEditOutTime] = useState('18:00');
  const [isOffDay, setIsOffDay] = useState(false);

  // Общее модальное окно добавления
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('lost'); 
  const [inputTitle, setInputTitle] = useState('');
  const [inputSub, setInputSub] = useState('');

  // Открыть модальное окно редактирования конкретной ячейки графика
  const handleOpenEditCell = (deptIdx, staffIdx, dayIdx) => {
    const activeSchedule = selectedWeek === 'current' ? currentWeekSchedule : nextWeekSchedule;
    const staffMember = activeSchedule[deptIdx].staff[staffIdx];
    const currentDay = staffMember.days[dayIdx];
    
    setEditingCell({ deptIdx, staffIdx, dayIdx, name: staffMember.name, weekKey: selectedWeek });
    if (currentDay.in === 'OFF') {
      setIsOffDay(true);
      setEditInTime('09:00');
      setEditOutTime('18:00');
    } else {
      setIsOffDay(false);
      setEditInTime(currentDay.in);
      setEditOutTime(currentDay.out);
    }
  };

  // Сохранить ручной апдейт ячейки графика
  const handleSaveScheduleUpdate = (e) => {
    e.preventDefault();
    if (!editingCell) return;
    const { deptIdx, staffIdx, dayIdx, weekKey } = editingCell;

    if (weekKey === 'current') {
      const updated = [...currentWeekSchedule];
      updated[deptIdx].staff[staffIdx].days[dayIdx] = {
        in: isOffDay ? 'OFF' : editInTime,
        out: isOffDay ? 'OFF' : editOutTime
      };
      setCurrentWeekSchedule(updated);
    } else {
      const updated = [...nextWeekSchedule];
      updated[deptIdx].staff[staffIdx].days[dayIdx] = {
        in: isOffDay ? 'OFF' : editInTime,
        out: isOffDay ? 'OFF' : editOutTime
      };
      setNextWeekSchedule(updated);
    }

    setEditingCell(null);
  };

  // Функция быстрой подготовки (копирования) текущей недели на следующую неделю
  const handleCopyCurrentToNextWeek = () => {
    if (window.confirm("Cari həftənin qrafikini gələn həftəyə kopyalayıb yeniləmək istəyirsiniz?")) {
      // Клонируем текущую неделю в следующую
      const cloned = JSON.parse(JSON.stringify(currentWeekSchedule));
      setNextWeekSchedule(cloned);
      setSelectedWeek('next');
    }
  };

  const toggleTaskStatus = (groupIndex, taskId) => {
    const updated = [...checklistGroups];
    const task = updated[groupIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.done = !task.done;
      task.time = task.done ? new Date().toLocaleTimeString().slice(0,5) : '—';
      setChecklistGroups(updated);
    }
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    if (!inputTitle) return;

    if (modalType === 'lost') {
      setLostAndFound([{ id: `LF-0${lostAndFound.length + 1}`, item: inputTitle, location: inputSub || 'Ümumi zona', date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString().slice(0,5), finder: 'Ayan X.', status: 'Saxlanılır' }, ...lostAndFound]);
    } else if (modalType === 'expense') {
      setExpenses([{ id: `EXP-0${expenses.length + 1}`, title: inputTitle, category: inputSub || 'Ümumi', amount: '50 AZN', balance: '3,500 AZN', date: new Date().toLocaleDateString(), supervisor: 'Ayan X.' }, ...expenses]);
    } else if (modalType === 'cv') {
      setCvs([{ id: `CV-${cvs.length + 1}`, candidate: inputTitle, vacancy: inputSub || 'Ümumi Vakansiya', phone: '+994 50 123 45 67', date: new Date().toLocaleDateString(), status: 'Yeni' }, ...cvs]);
    } else if (modalType === 'disciplinary') {
      setDisciplinary([{ id: `DIS-${disciplinary.length + 1}`, staff: inputTitle, type: inputSub || 'Töhmət / İrad', note: 'Yeni qeyd əlavə olundu.', date: new Date().toLocaleDateString(), action: 'Qeydə alındı' }, ...disciplinary]);
    }

    setInputTitle('');
    setInputSub('');
    setShowAddModal(false);
  };

  const activeDepartments = selectedWeek === 'current' ? currentWeekSchedule : nextWeekSchedule;

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 text-slate-800 overflow-hidden font-sans">
      
      {/* HEADER & TABS */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#151515] rounded-lg flex items-center justify-center font-black text-[#F8FF70] text-xs">
            <Building2 size={14} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
              MAKFIT — Operations & HR İdarəetməsi
            </h3>
            <p className="text-[10px] text-slate-500">Matris Qrafik (Gələn həftə üçün əl ilə yeniləmə), Checklists, Xərclər, CV, Töhmət</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-bold shrink-0">
            <button onClick={() => setActiveTab('schedule')} className={`px-2.5 py-1 rounded-lg transition ${activeTab === 'schedule' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-600'}`}>📅 Qrafik Matrisi</button>
            <button onClick={() => setActiveTab('checklists')} className={`px-2.5 py-1 rounded-lg transition ${activeTab === 'checklists' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-600'}`}>📋 Checklists (3 Qrup)</button>
            <button onClick={() => setActiveTab('fingerprint')} className={`px-2.5 py-1 rounded-lg transition ${activeTab === 'fingerprint' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-600'}`}>⏰ Giriş Saatları</button>
            <button onClick={() => setActiveTab('expenses')} className={`px-2.5 py-1 rounded-lg transition ${activeTab === 'expenses' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-600'}`}>💰 Xərclər</button>
            <button onClick={() => setActiveTab('handovers')} className={`px-2.5 py-1 rounded-lg transition ${activeTab === 'handovers' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-600'}`}>🔄 Təhvil-Təslim</button>
            <button onClick={() => setActiveTab('cv')} className={`px-2.5 py-1 rounded-lg transition ${activeTab === 'cv' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-600'}`}>📂 CV Bankı</button>
            <button onClick={() => setActiveTab('disciplinary')} className={`px-2.5 py-1 rounded-lg transition ${activeTab === 'disciplinary' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-600'}`}>⚠️ Töhmət & İradlar</button>
            <button onClick={() => setActiveTab('lost')} className={`px-2.5 py-1 rounded-lg transition ${activeTab === 'lost' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-600'}`}>📦 Lost & Found</button>
          </div>

          <button 
            onClick={() => { setModalType('lost'); setShowAddModal(true); }}
            className="bg-[#151515] hover:bg-black text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition flex items-center gap-1.5 shadow-2xs shrink-0 cursor-pointer"
          >
            <Plus size={14} className="text-[#F8FF70]" /> Əlavə Et
          </button>
        </div>
      </div>

      {/* TAB CONTENTS */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        
        {/* 1. İŞ QRAFİKİ MATRİKSİ VƏ HƏFTƏLƏR ÜZRƏ APDATE PANELİ */}
        {activeTab === 'schedule' && (
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 shadow-2xs">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-emerald-600" />
                <div>
                  <span className="font-black text-xs text-slate-900 uppercase block">İş Qrafiki İdarəetməsi və Növbəti Həftə Apdati</span>
                  <span className="text-[10px] text-slate-500 font-medium">Hər hansı xanaya klikləyərək əl ilə saat dəyişə və ya gələn həftəni yeniləyə bilərsiniz</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedWeek('current')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${selectedWeek === 'current' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}
                >
                  Cari Həftə (2-8 Noyabr)
                </button>
                <button 
                  onClick={() => setSelectedWeek('next')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${selectedWeek === 'next' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}
                >
                  Gələn Həftə (9-15 Noyabr) ⚡
                </button>
                <button 
                  onClick={handleCopyCurrentToNextWeek}
                  title="Cari həftəni gələn həftəyə kopyala"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <RefreshCw size={12} /> Keçən həftəni tətbiq et
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[11px] text-center whitespace-nowrap">
                  <thead>
                    <tr className="bg-amber-400 text-slate-900 font-extrabold border-b border-slate-300">
                      <th className="p-2 border-r border-slate-300 w-48 text-left pl-3">
                        {selectedWeek === 'current' ? 'Noyabr (Cari: 2 - 8)' : 'Noyabr (Gələn: 9 - 15)'}
                      </th>
                      {selectedWeek === 'current' ? (
                        <>
                          <th className="p-2 border-r border-slate-300">11/2/2026</th>
                          <th className="p-2 border-r border-slate-300">11/3/2026</th>
                          <th className="p-2 border-r border-slate-300">11/4/2026</th>
                          <th className="p-2 border-r border-slate-300">11/5/2026</th>
                          <th className="p-2 border-r border-slate-300">11/6/2026</th>
                          <th className="p-2 border-r border-slate-300">11/7/2026</th>
                          <th className="p-2">11/8/2026</th>
                        </>
                      ) : (
                        <>
                          <th className="p-2 border-r border-slate-300">11/9/2026</th>
                          <th className="p-2 border-r border-slate-300">11/10/2026</th>
                          <th className="p-2 border-r border-slate-300">11/11/2026</th>
                          <th className="p-2 border-r border-slate-300">11/12/2026</th>
                          <th className="p-2 border-r border-slate-300">11/13/2026</th>
                          <th className="p-2 border-r border-slate-300">11/14/2026</th>
                          <th className="p-2">11/15/2026</th>
                        </>
                      )}
                    </tr>
                    <tr className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
                      <th className="p-1.5 border-r border-slate-300 text-left pl-3 flex justify-between items-center">
                        <span>Name</span> <span className="text-slate-500 font-normal">Position</span>
                      </th>
                      {[0, 1, 2, 3, 4, 5, 6].map(num => (
                        <th key={num} className="p-1.5 border-r border-slate-300">
                          <div className="grid grid-cols-2 gap-1 text-[10px]">
                            <span className="text-blue-700">in</span>
                            <span className="text-rose-700">out</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeDepartments.map((dept, deptIdx) => (
                      <React.Fragment key={deptIdx}>
                        <tr className="bg-emerald-600 text-white font-black text-left">
                          <td colSpan="8" className="p-2 pl-3 uppercase tracking-wider text-xs">{dept.category}</td>
                        </tr>
                        {dept.staff.map((member, staffIdx) => (
                          <tr key={staffIdx} className="border-b border-slate-200 hover:bg-slate-50">
                            <td className="p-2 border-r border-slate-200 text-left pl-3 font-bold flex justify-between items-center">
                              <span className="text-slate-900">{member.name}</span>
                              <span className="text-slate-500 font-normal text-[10px]">{member.position}</span>
                            </td>
                            {member.days.map((day, dayIdx) => {
                              const isOff = day.in === 'OFF';
                              return (
                                <td 
                                  key={dayIdx} 
                                  onClick={() => handleOpenEditCell(deptIdx, staffIdx, dayIdx)}
                                  className={`p-1.5 border-r border-slate-200 font-mono font-bold cursor-pointer transition hover:opacity-80 relative group ${isOff ? 'bg-amber-200 text-slate-800' : 'bg-sky-100 text-slate-900'}`}
                                  title="Klikləyərək qrafiki redaktə edin"
                                >
                                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                                    <span>{day.in}</span>
                                    <span>{day.out}</span>
                                  </div>
                                  <span className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 text-[8px] bg-slate-900 text-white px-1 rounded">Düzəlt</span>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. CHECKLISTS (3 PODGRUPPA) */}
        {activeTab === 'checklists' && (
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 flex justify-between items-center shadow-2xs">
              <div>
                <h4 className="font-black text-slate-900 text-xs uppercase">Günlük Təmizlik və Nəzarət Checklisti (3 Podqruppa)</h4>
                <p className="text-[10px] text-slate-500 font-medium">Qutuları işarələməklə təmizlənən zonaları təsdiq edin (Boş qalanlar hələ təmizlənməyib deməkdir)</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-xl text-xs font-bold">
                İcra olunub: {checklistGroups.flatMap(g => g.tasks).filter(t => t.done).length} / {checklistGroups.flatMap(g => g.tasks).length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {checklistGroups.map((group, gIdx) => (
                <div key={gIdx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-slate-100 pb-2 mb-3">
                      <h5 className="font-black text-slate-900 text-xs uppercase flex items-center gap-1.5">
                        <ClipboardCheck size={15} className="text-emerald-600" /> {group.groupName}
                      </h5>
                    </div>
                    
                    <div className="space-y-2">
                      {group.tasks.map(task => (
                        <div 
                          key={task.id} 
                          onClick={() => toggleTaskStatus(gIdx, task.id)}
                          className={`p-2.5 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${
                            task.done ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <button type="button" className="mt-0.5 shrink-0 text-emerald-600">
                            {task.done ? <CheckSquare size={16} /> : <Square size={16} className="text-slate-400" />}
                          </button>
                          <div className="flex-1 text-xs">
                            <p className={`font-bold ${task.done ? 'line-through text-slate-500' : 'text-slate-900'}`}>{task.task}</p>
                            <p className="text-[10px] text-slate-500 mt-1">Məsul: {task.staff} • Saat: {task.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. İŞƏ GƏLMƏ SAATLARI (FINGERPRINT) */}
        {activeTab === 'fingerprint' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <h4 className="font-black text-slate-900 text-xs uppercase flex items-center gap-1.5">
              <Fingerprint size={16} className="text-blue-600" /> Barmaq İzi (Fingerprint) Giriş-Çıxış Saatları
            </h4>
            <div className="space-y-2">
              {fingerprint.map(fp => (
                <div key={fp.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{fp.name} <span className="text-slate-500 font-normal">({fp.role})</span></p>
                    <p className="text-[11px] font-mono text-slate-600 mt-0.5">Giriş: {fp.checkIn} | Çıxış: {fp.checkOut}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${fp.status.includes('Gecikmə') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {fp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. XƏRCLƏR (EXPENSES) */}
        {activeTab === 'expenses' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="font-black text-slate-900 text-xs uppercase flex items-center gap-1.5">
                <DollarSign size={16} className="text-emerald-600" /> Supervisor Xərclər İdarəetməsi
              </h4>
              <button onClick={() => { setModalType('expense'); setShowAddModal(true); }} className="bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer">+ Xərc Əlavə Et</button>
            </div>
            <div className="space-y-2">
              {expenses.map(exp => (
                <div key={exp.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{exp.title} <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] ml-1">{exp.category}</span></p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Tarix: {exp.date} • Supervisor: {exp.supervisor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-rose-600">-{exp.amount}</p>
                    <p className="text-[10px] text-slate-500 font-bold">Qalıq: {exp.balance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TƏHVİL-TƏSLİM (HANDOVERS) */}
        {activeTab === 'handovers' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <h4 className="font-black text-slate-900 text-xs uppercase flex items-center gap-1.5">
              <ArrowRightLeft size={16} className="text-purple-600" /> Növbə Təhvil-Təslim Jurnalı
            </h4>
            <div className="space-y-2">
              {handovers.map(ho => (
                <div key={ho.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{ho.type} <span className="text-slate-500 font-normal">({ho.date})</span></p>
                    <p className="text-[11px] text-slate-600 mt-0.5">Kimdən: {ho.from} → Kimə: {ho.to} | Qeyd: {ho.note}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg font-bold">Təhvil verildi</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CV BANKI */}
        {activeTab === 'cv' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="font-black text-slate-900 text-xs uppercase flex items-center gap-1.5">
                <Briefcase size={16} className="text-blue-600" /> Kateqoriyalaşdırılmış CV Bankı
              </h4>
              <button onClick={() => { setModalType('cv'); setShowAddModal(true); }} className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer">+ CV Əlavə Et</button>
            </div>
            <div className="space-y-2">
              {cvs.map(c => (
                <div key={c.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{c.candidate} <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] ml-1 font-bold">{c.vacancy}</span></p>
                    <p className="text-[11px] font-mono text-slate-600 mt-0.5">Tel: {c.phone} | Tarix: {c.date}</p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg font-bold">{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. TÖHMƏT VƏ İRADLAR */}
        {activeTab === 'disciplinary' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="font-black text-slate-900 text-xs uppercase flex items-center gap-1.5">
                <ShieldAlert size={16} className="text-rose-600" /> Töhmətlər, İradlar və Təkliflər Jurnalı
              </h4>
              <button onClick={() => { setModalType('disciplinary'); setShowAddModal(true); }} className="bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer">+ Qeyd Əlavə Et</button>
            </div>
            <div className="space-y-2">
              {disciplinary.map(d => (
                <div key={d.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{d.staff} — <span className="text-rose-600 font-extrabold">{d.type}</span></p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{d.note} ({d.date})</p>
                  </div>
                  <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-lg font-bold">{d.action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. LOST & FOUND */}
        {activeTab === 'lost' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="font-black text-slate-900 text-xs uppercase flex items-center gap-1.5">
                <PackageOpen size={16} className="text-amber-600" /> Lost & Found (Itirilən və Tapılan Əşyalar)
              </h4>
              <button onClick={() => { setModalType('lost'); setShowAddModal(true); }} className="bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer">+ Əşya Qeydə Al</button>
            </div>
            <div className="space-y-2">
              {lostAndFound.map(lf => (
                <div key={lf.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-black text-slate-900">{lf.item}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">Yer: {lf.location} | Tarix: {lf.date} ({lf.time}) • Tapan: {lf.finder}</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-lg font-bold">{lf.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ⚡ МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ ЯЧЕЙКИ ГРАФИКА */}
      {editingCell && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-sm">İş Qrafikini Əl İlə Yenilə</h3>
                <p className="text-[11px] text-blue-600 font-bold mt-0.5">İşçi: {editingCell.name} ({editingCell.weekKey === 'current' ? 'Cari Həftə' : 'Gələn Həftə'})</p>
              </div>
              <button onClick={() => setEditingCell(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><X size={18} /></button>
            </div>

            <form onSubmit={handleSaveScheduleUpdate} className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700">İstirahət Günüdür (OFF)?</span>
                <input 
                  type="checkbox" 
                  checked={isOffDay} 
                  onChange={e => setIsOffDay(e.target.checked)} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
              </div>

              {!isOffDay && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Giriş (In):</label>
                    <input 
                      type="text" 
                      value={editInTime} 
                      onChange={e => setEditInTime(e.target.value)} 
                      className="w-full p-2 border border-slate-200 rounded-xl font-mono font-bold bg-slate-50 text-center" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Çıxış (Out):</label>
                    <input 
                      type="text" 
                      value={editOutTime} 
                      onChange={e => setEditOutTime(e.target.value)} 
                      className="w-full p-2 border border-slate-200 rounded-xl font-mono font-bold bg-slate-50 text-center" 
                      required 
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingCell(null)} className="px-4 py-2 border rounded-xl font-bold text-slate-600 cursor-pointer">Ləğv et</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer shadow-xs">Yadda Saxla</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ОБЩЕЕ МОДАЛЬНОЕ ОКНО ДОБАВЛЕНИЯ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 space-y-3 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-black text-slate-900 text-xs">
                {modalType === 'lost' ? 'Lost & Found Əşya Qeydə Al' : modalType === 'expense' ? 'Yeni Xərc Əlavə Et' : modalType === 'cv' ? 'Yeni CV Əlavə Et' : 'Töhmət / İrad Qeyd Et'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><X size={16} /></button>
            </div>
            <form onSubmit={handleAddNewItem} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {modalType === 'lost' ? 'Əşyanın Adı:' : modalType === 'expense' ? 'Xərcin Təyinatı:' : modalType === 'cv' ? 'Namizədin Adı Soyadı:' : 'İşçinin Adı Soyadı:'}
                </label>
                <input type="text" placeholder="Məlumat daxil edin..." value={inputTitle} onChange={e => setInputTitle(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl font-bold bg-slate-50" required />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {modalType === 'lost' ? 'Tapıldığı Zona:' : modalType === 'expense' ? 'Kateqoriya (Məs: Təsərrüfat):' : modalType === 'cv' ? 'Vakansiya Adı:' : 'Səbəb / Qeyd:'}
                </label>
                <input type="text" placeholder="Detallar..." value={inputSub} onChange={e => setInputSub(e.target.value)} className="w-full p-2 border border-slate-200 rounded-xl font-medium bg-slate-50" />
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-3 py-1.5 border rounded-xl font-bold text-slate-600 cursor-pointer">Ləğv et</button>
                <button type="submit" className="px-4 py-1.5 bg-[#151515] text-[#F8FF70] font-black rounded-xl cursor-pointer">Təsdiq Et</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}