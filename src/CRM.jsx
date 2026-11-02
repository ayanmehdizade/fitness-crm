import React, { useState } from 'react';
import { 
  Users, Search, Instagram, Clock, UserCheck, X, SlidersHorizontal, 
  RefreshCw, MessageSquare, Download, FileSpreadsheet, FileText, FileCode, Check,
  CreditCard, Key, Car, Calendar, DollarSign, Snowflake, Activity, Scissors, Sparkles, HandHeart, Dumbbell,
  Receipt, ShieldCheck, Wallet, User, Info, Camera, Upload, Trash2
} from 'lucide-react';

const initialLeads = [
  {
    id: 'LED-801',
    name: 'Aysel Əliyeva',
    phone: '+994 50 211 44 55',
    gender: 'Qadın',
    channel: 'Instagram',
    requestTime: '28.10.2026 | 14:35',
    rawDate: '2026-10-28',
    stage: 'tour',
    interest: 'VIP 12 Aylıq + PT',
    assignedTo: 'Ayan X.',
    notes: [
      { date: '28.10.2026', author: 'Ayan X.', text: 'Direct-dən VIP paket qiymətini soruşdu. Kluba sınaq turuna dəvət olundu.' },
      { date: '29.10.2026', author: 'Ayan X.', text: '30 Oktyabr saat 15:00 üçün klub turu təyin edildi.' }
    ],
    lostReason: ''
  },
  {
    id: 'LED-802',
    name: 'Elvin Cəfərov',
    phone: '+994 55 988 11 22',
    gender: 'Kişi',
    channel: 'WhatsApp',
    requestTime: '28.10.2026 | 11:10',
    rawDate: '2026-10-28',
    stage: 'potential',
    interest: 'Gündüz Tarifi 3 Aylıq',
    assignedTo: 'Orxan M.',
    notes: [
      { date: '27.10.2026', author: 'Orxan M.', text: 'Sınaq məşqində oldu. Həyat yoldaşı ilə məsləhətləşəcəyini bildirdi.' }
    ],
    lostReason: ''
  }
];

const initialClients = [
  {
    id: 'MK-1042',
    name: 'Ayan Xəlilova',
    phone: '+994 50 123 45 67',
    email: 'ayan.khalilova@gmail.com',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    birthYear: '2006',
    gender: 'Qadın',
    city: 'Bakı',
    status: 'active',
    statusText: 'Aktivdir',
    membershipPackage: 'VIP Gold Limitsiz (1 İllik)',
    startDate: '15.01.2026',
    endDate: '15.01.2027',
    totalSpentVal: '2,450.00',
    totalSpentUnit: 'AZN',
    isFrozen: false,
    freezeDaysLeft: 14,
    privileges: [
      'Limitsiz Fitnes & Kardio Keçidi',
      'VIP Locker & Hamam/Sauna Keçidi',
      'Ayda 2 Dəfə Pulsuz Qonaq (Guest Pass)',
      '14 Günlük Paket Dondurma Hüququ',
      '1-ci Pulsuz Bədən Analizi (InBody)',
      'VIP A-Sektor Parkinq Ziyarəti'
    ],
    ptBalance: {
      trainerName: 'Elmir Uçar',
      totalSessions: 12,
      usedSessions: 4,
      remainingSessions: 8,
      depositBalanceVal: '350.00',
      depositBalanceUnit: 'AZN'
    },
    transactions: [
      { 
        id: 'TR-9011', 
        date: '28.10.2026', 
        time: '14:35', 
        item: 'FitBar Protein Shake + BCAA Drink', 
        amountVal: '12.00', 
        amountUnit: 'AZN',
        type: 'POS Kart', 
        location: 'FitBar Kassa', 
        processedBy: 'Nigar H. (Kassir)' 
      },
      { 
        id: 'TR-8920', 
        date: '25.10.2026', 
        time: '17:00', 
        item: 'Relax Masajı (60 Dəq) + Yağ Seansı', 
        amountVal: '65.00', 
        amountUnit: 'AZN',
        type: 'POS Kart', 
        location: 'Wellness Spa Resepşn', 
        processedBy: 'Ayan X. (Supervisor)' 
      }
    ],
    accessHistory: [
      { date: '28.10.2026', time: '14:30', type: 'Turniket', detail: 'Əsas Keçid Turniketi (Daxil oldu)' },
      { date: '28.10.2026', time: '14:25', type: 'Parking', detail: 'VIP A-12 Parkinq Yeri (Giriş)' }
    ],
    appointments: [
      { date: '28.10.2026', time: '15:00', service: 'Fərdi Məşq (PT)', master: 'Elmir Uçar', status: 'Tamamlandı' }
    ]
  },
  {
    id: 'MK-1089',
    name: 'Kamran Alıyev',
    phone: '+994 55 444 55 66',
    email: 'kamran.aliyev@mail.ru',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    birthYear: '1998',
    gender: 'Kişi',
    city: 'Bakı',
    status: 'warning', 
    statusText: 'Yenilənmə Sual Altındadır',
    membershipPackage: 'Standart (6 Aylıq)',
    startDate: '01.06.2026',
    endDate: '01.11.2026',
    totalSpentVal: '620.00',
    totalSpentUnit: 'AZN',
    isFrozen: false,
    freezeDaysLeft: 0,
    privileges: [
      'Standart Zal Keçidi (08:00 - 23:00)',
      'Ümumi Şkaf Keçidi'
    ],
    ptBalance: {
      trainerName: 'Təyin olunmayıb',
      totalSessions: 0,
      usedSessions: 0,
      remainingSessions: 0,
      depositBalanceVal: '0.00',
      depositBalanceUnit: 'AZN'
    },
    transactions: [],
    accessHistory: [],
    appointments: []
  }
];

export default function CRM() {
  const [activeTab, setActiveTab] = useState('clients'); // 'clients' | 'leads'
  const [clients, setClients] = useState(initialClients);
  const [leads, setLeads] = useState(initialLeads);
  const [searchQuery, setSearchQuery] = useState('');

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportSuccess, setExportSuccess] = useState('');

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');

  const [isEditProfileMode, setIsEditProfileMode] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const [freezeDaysInput, setFreezeDaysInput] = useState(7);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState('');

  const fontDisplayStyle = { fontFamily: "'Archivo Expanded', sans-serif", letterSpacing: '-0.02em' };
  const fontTextStyle = { fontFamily: "'TikTok Sans', system-ui, -apple-system, sans-serif", letterSpacing: '-0.01em' };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.phone.includes(searchQuery);

    const matchesChannel = filterChannel === 'all' || lead.channel === filterChannel;
    const matchesStage = filterStage === 'all' || lead.stage === filterStage;
    const matchesGender = filterGender === 'all' || lead.gender === filterGender;

    let matchesDate = true;
    if (filterStartDate) matchesDate = matchesDate && lead.rawDate >= filterStartDate;
    if (filterEndDate) matchesDate = matchesDate && lead.rawDate <= filterEndDate;

    return matchesSearch && matchesChannel && matchesStage && matchesGender && matchesDate;
  });

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  const resetFilters = () => {
    setFilterChannel('all');
    setFilterStage('all');
    setFilterGender('all');
    setFilterStartDate('');
    setFilterEndDate('');
    setSearchQuery('');
  };

  const handleExport = (format) => {
    setShowExportMenu(false);
    setExportSuccess(`Məlumatlar ${format.toUpperCase()} formatında uğurla yükləndi!`);
    setTimeout(() => setExportSuccess(''), 3000);
  };

  const handleOpenClientModal = (client) => {
    setSelectedClient(client);
    setEditFormData({ ...client });
    setIsEditProfileMode(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedClients = clients.map(c => c.id === editFormData.id ? editFormData : c);
    setClients(updatedClients);
    setSelectedClient(editFormData);
    setIsEditProfileMode(false);
    setProfileSaveSuccess('Məlumatlar və profil fotosu uğurla yeniləndi!');
    setTimeout(() => setProfileSaveSuccess(''), 3000);
  };

  const handlePhotoDelete = () => {
    setEditFormData(prev => ({
      ...prev,
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300'
    }));
  };

  const handleSyncPhoto = () => {
    setProfileSaveSuccess('Turniket биометриясы ilə fotosinxronizasiya tamamlandı!');
    setTimeout(() => setProfileSaveSuccess(''), 3000);
  };

  const handleAddNoteToLead = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;

    const updatedNote = {
      date: new Date().toLocaleDateString('az-AZ'),
      author: 'Ayan X.',
      text: newNoteText
    };

    const updatedLeads = leads.map(l => {
      if (l.id === selectedLead.id) {
        return { ...l, notes: [updatedNote, ...l.notes] };
      }
      return l;
    });

    setLeads(updatedLeads);
    setSelectedLead({ ...selectedLead, notes: [updatedNote, ...selectedLead.notes] });
    setNewNoteText('');
  };

  const handleStageChange = (leadId, newStage) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, stage: newStage } : l);
    setLeads(updated);
    if (selectedLead) setSelectedLead({ ...selectedLead, stage: newStage });
  };

  return (
    <div style={fontTextStyle} className="m-0 p-0 box-border flex flex-col h-full w-full overflow-hidden bg-[#F8FAFC] text-slate-800 gap-2 select-none">
      
      {/* 1. LIGHT HEADER PANEL WITH BLUE TAB SWITCHING */}
      <div className="bg-white border-b border-slate-200/90 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div style={fontDisplayStyle} className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-xs">
            M
          </div>
          <div>
            <h3 style={fontDisplayStyle} className="font-black text-slate-900 text-xs tracking-wider uppercase">
              MAKFIT — CRM & Social Pipeline
            </h3>
            <p style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">Müştəri profilləri, daxil olan müraciətlər və idarəetmə</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* EXPORT MENU */}
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              style={fontTextStyle}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download size={13} /> Eksport Et
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-1.5 space-y-1">
                <p style={fontTextStyle} className="text-[9px] font-black uppercase text-slate-400 px-2 py-1">Formatı Seçin:</p>
                <button 
                  onClick={() => handleExport('excel')}
                  style={fontTextStyle}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-extrabold text-[11px] flex items-center gap-2 transition cursor-pointer"
                >
                  <FileSpreadsheet size={13} className="text-emerald-600" /> Excel (.xlsx)
                </button>
                <button 
                  onClick={() => handleExport('pdf')}
                  style={fontTextStyle}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-extrabold text-[11px] flex items-center gap-2 transition cursor-pointer"
                >
                  <FileText size={13} className="text-rose-600" /> PDF Sənəd (.pdf)
                </button>
                <button 
                  onClick={() => handleExport('word')}
                  style={fontTextStyle}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-extrabold text-[11px] flex items-center gap-2 transition cursor-pointer"
                >
                  <FileCode size={13} className="text-blue-600" /> Word (.docx)
                </button>
              </div>
            )}
          </div>

          {/* TAB BUTTONS (CLIENTS / LEADS) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px]">
            <button
              onClick={() => setActiveTab('clients')}
              style={fontTextStyle}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 font-extrabold ${
                activeTab === 'clients' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={12} /> Müştəri Bazası ({clients.length})
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              style={fontTextStyle}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 font-extrabold ${
                activeTab === 'leads' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Instagram size={12} /> Lidlər ({leads.length})
            </button>
          </div>
        </div>
      </div>

      {/* NOTIFICATION */}
      {exportSuccess && (
        <div style={fontTextStyle} className="mx-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-2xs">
          <Check size={14} className="text-emerald-600" /> {exportSuccess}
        </div>
      )}

      {/* 2. SEARCH & FILTERS BAR */}
      <div className="bg-white border border-slate-200/90 p-2 rounded-2xl space-y-1.5 shrink-0 mx-2 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-2 text-slate-400" size={13} />
            <input 
              style={fontTextStyle}
              type="text" 
              placeholder={activeTab === 'clients' ? "Axtarış (ID, Ad, Tel)..." : "Lid axtarışı..."}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded-xl text-xs font-extrabold bg-slate-50 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {activeTab === 'leads' && (
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                style={fontTextStyle}
                className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1 transition cursor-pointer ${
                  showFilterPanel || filterChannel !== 'all' || filterStage !== 'all' || filterGender !== 'all'
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal size={12} /> Süzgəclər
              </button>

              {(filterChannel !== 'all' || filterStage !== 'all' || filterGender !== 'all' || filterStartDate || filterEndDate) && (
                <button 
                  onClick={resetFilters}
                  className="p-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition text-xs font-bold cursor-pointer"
                  title="Süzgəcləri Sıfırla"
                >
                  <RefreshCw size={12} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* LEADS FILTER EXTENSION */}
        {activeTab === 'leads' && showFilterPanel && (
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-[10px]">
            <div>
              <label style={fontTextStyle} className="font-extrabold text-slate-500 block mb-0.5">Mənbə / Kanal:</label>
              <select style={fontTextStyle} value={filterChannel} onChange={e => setFilterChannel(e.target.value)} className="w-full p-1 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 font-extrabold outline-none">
                <option value="all">Hamısı</option>
                <option value="Instagram">Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="TikTok">TikTok</option>
              </select>
            </div>

            <div>
              <label style={fontTextStyle} className="font-extrabold text-slate-500 block mb-0.5">Mərhələ:</label>
              <select style={fontTextStyle} value={filterStage} onChange={e => setFilterStage(e.target.value)} className="w-full p-1 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 font-extrabold outline-none">
                <option value="all">Hamısı</option>
                <option value="new">🆕 Yeni Lid</option>
                <option value="contacted">📞 Əlaqə Saxlanıldı</option>
                <option value="tour">🏋️ Tur Təyin Edildi</option>
                <option value="potential">🤔 Düşünür</option>
                <option value="won">✅ Paket Aldı</option>
                <option value="lost">❌ İmtina Etdi</option>
              </select>
            </div>

            <div>
              <label style={fontTextStyle} className="font-extrabold text-slate-500 block mb-0.5">Cinsiyyət:</label>
              <select style={fontTextStyle} value={filterGender} onChange={e => setFilterGender(e.target.value)} className="w-full p-1 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 font-extrabold outline-none">
                <option value="all">Hamısı</option>
                <option value="Qadın">Qadın</option>
                <option value="Kişi">Kişi</option>
              </select>
            </div>

            <div>
              <label style={fontTextStyle} className="font-extrabold text-slate-500 block mb-0.5">Tarixdən:</label>
              <input style={fontTextStyle} type="date" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} className="w-full p-0.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 font-extrabold" />
            </div>

            <div>
              <label style={fontTextStyle} className="font-extrabold text-slate-500 block mb-0.5">Tarixədək:</label>
              <input style={fontTextStyle} type="date" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} className="w-full p-0.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 font-extrabold" />
            </div>
          </div>
        )}
      </div>

      {/* 3. MAIN TABLES CONTAINER */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden mx-2 mb-2 shadow-2xs flex flex-col">
        
        {/* CLIENTS TABLE */}
        {activeTab === 'clients' && (
          <div className="overflow-auto h-full">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-800 border-b border-slate-200">
                <tr className="uppercase font-black text-[10px] tracking-wider text-slate-600">
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Müştəri ID</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Foto & Ad Soyad</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Telefon Nömrəsi</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Status</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Qeydiyyat Müddəti</th>
                  <th style={fontTextStyle} className="p-3 text-right">Ətraflı Mini Dashboard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-slate-50 transition">
                    <td style={fontDisplayStyle} className="p-3 border-r border-slate-100 font-black text-slate-900">{client.id}</td>
                    <td className="p-3 border-r border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img src={client.photo} alt={client.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs" />
                        <div>
                          <span style={fontTextStyle} className="font-extrabold text-slate-900 block text-xs">{client.name}</span>
                          <span style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">{client.email}</span>
                        </div>
                      </div>
                    </td>
                    <td style={fontDisplayStyle} className="p-3 border-r border-slate-100 font-black text-slate-800">{client.phone}</td>
                    <td className="p-3 border-r border-slate-100">
                      <span style={fontTextStyle} className={`p-1 rounded-lg font-extrabold text-[10px] border ${
                        client.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {client.statusText}
                      </span>
                    </td>
                    <td style={fontTextStyle} className="p-3 border-r border-slate-100 text-slate-600 text-[10px] font-extrabold">{client.startDate} - {client.endDate}</td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => handleOpenClientModal(client)}
                        style={fontTextStyle}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition cursor-pointer shadow-xs"
                      >
                        Ətraflı Mini Dashboard 📊
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* LEADS TABLE */}
        {activeTab === 'leads' && (
          <div className="overflow-auto h-full">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-800 border-b border-slate-200">
                <tr className="uppercase font-black text-[10px] tracking-wider text-slate-600">
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Lid ID</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Ad Soyad & Cins</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Telefon Nömrəsi</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Hardan Gəldi (Kanal)</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Tarix & Saat</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Status (Mərhələ)</th>
                  <th style={fontTextStyle} className="p-3 text-right">Ətraflı & Notlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={fontTextStyle} className="text-center py-12 text-slate-400 font-extrabold text-xs">
                      Süzgəcə uyğun lid tapılmadı.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition">
                      <td style={fontDisplayStyle} className="p-3 border-r border-slate-100 font-black text-slate-900">{lead.id}</td>
                      <td className="p-3 border-r border-slate-100">
                        <span style={fontTextStyle} className="font-extrabold text-slate-900 mr-2 text-xs">{lead.name}</span>
                        <span style={fontTextStyle} className="text-[9px] font-extrabold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md border border-slate-200">{lead.gender}</span>
                      </td>
                      <td style={fontDisplayStyle} className="p-3 border-r border-slate-100 font-black text-slate-800">{lead.phone}</td>
                      <td className="p-3 border-r border-slate-100">
                        <span style={fontTextStyle} className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1 ${
                          lead.channel === 'Instagram' ? 'bg-pink-100 text-pink-800 border border-pink-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          <Instagram size={11} /> {lead.channel}
                        </span>
                      </td>
                      <td style={fontTextStyle} className="p-3 border-r border-slate-100 text-slate-500 text-[10px] font-bold">{lead.requestTime}</td>
                      <td className="p-3 border-r border-slate-100">
                        <select 
                          style={fontTextStyle}
                          value={lead.stage}
                          onChange={e => handleStageChange(lead.id, e.target.value)}
                          className="p-1 border border-slate-200 rounded-lg font-extrabold text-[10px] bg-slate-50 text-slate-800 focus:border-blue-500 outline-none cursor-pointer"
                        >
                          <option value="new">🆕 Yeni Lid</option>
                          <option value="contacted">📞 Əlaqə Saxlanıldı</option>
                          <option value="tour">🏋️ Tur Təyin Edildi</option>
                          <option value="potential">🤔 Düşünür</option>
                          <option value="won">✅ Paket Aldı</option>
                          <option value="lost">❌ İmtina Etdi</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          style={fontTextStyle}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl font-extrabold text-xs transition inline-flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <MessageSquare size={12} />
                          <span>Ətraflı Və Notlar ({lead.notes.length})</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* 4. CLIENT MODAL & INFO EDIT MODE */}
      {selectedClient && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-2 sm:p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full p-6 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150 max-h-[94vh] overflow-y-auto relative">
            
            <button 
              onClick={() => setSelectedClient(null)} 
              className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-600 rounded-xl transition bg-slate-50 hover:bg-slate-100 cursor-pointer z-20"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center border-b border-slate-100 pb-4 relative pt-2">
              <div className="relative group mb-2">
                <img 
                  src={selectedClient.photo} 
                  alt={selectedClient.name} 
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-600 shadow-lg transition transform group-hover:scale-105" 
                />
                <button 
                  onClick={() => setIsEditProfileMode(true)}
                  className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-xl shadow-md hover:bg-blue-700 transition cursor-pointer"
                  title="Fotonu Yenilə"
                >
                  <Camera size={13} />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span style={fontDisplayStyle} className="text-xs font-black text-slate-400">{selectedClient.id}</span>
                  <span style={fontTextStyle} className={`px-2.5 py-0.5 rounded-md font-extrabold text-[10px] ${
                    selectedClient.status === 'active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedClient.statusText}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 mt-1">
                  <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-lg tracking-tight">
                    {selectedClient.name}
                  </h3>

                  <button 
                    onClick={() => setIsEditProfileMode(!isEditProfileMode)}
                    style={fontTextStyle}
                    className={`px-3 py-1 rounded-xl font-extrabold text-[11px] flex items-center gap-1.5 transition cursor-pointer shadow-2xs border ${
                      isEditProfileMode 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    }`}
                  >
                    <Info size={14} className={isEditProfileMode ? 'text-white' : 'text-blue-600'} />
                    <span>Info & Redaktə</span>
                  </button>
                </div>

                <p style={fontTextStyle} className="text-xs text-slate-500 font-bold flex items-center justify-center gap-2">
                  <span>{selectedClient.phone}</span> • <span>{selectedClient.email}</span>
                </p>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span style={fontTextStyle} className="bg-slate-100 px-2 py-0.5 rounded-md text-[10px] font-extrabold text-slate-600 border border-slate-200">
                    🎂 {selectedClient.birthYear || '2006'} il
                  </span>
                  <span style={fontTextStyle} className="bg-slate-100 px-2 py-0.5 rounded-md text-[10px] font-extrabold text-slate-600 border border-slate-200">
                    👤 {selectedClient.gender || 'Qadın'}
                  </span>
                  <span style={fontTextStyle} className="bg-slate-100 px-2 py-0.5 rounded-md text-[10px] font-extrabold text-slate-600 border border-slate-200">
                    📍 {selectedClient.city || 'Bakı'}
                  </span>
                </div>
              </div>
            </div>

            {profileSaveSuccess && (
              <div style={fontTextStyle} className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-2xs">
                <Check size={16} className="text-emerald-600" /> {profileSaveSuccess}
              </div>
            )}

            {isEditProfileMode ? (
              <form onSubmit={handleSaveProfile} className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 style={fontDisplayStyle} className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Info size={16} className="text-blue-600" /> Müştərinin Şəxsi Məlumatlarının Tam Redaktəsi
                  </h4>
                  <span style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">MK Profil Redaktoru</span>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={editFormData.photo} alt="Preview" className="w-14 h-14 rounded-xl object-cover border-2 border-slate-200" />
                    <div>
                      <span style={fontTextStyle} className="font-extrabold text-slate-900 text-xs block">Profil Fotosunu Yenilə</span>
                      <p style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">Turniket биометриясы və kassa üçün profil fotosu</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button 
                      type="button" 
                      style={fontTextStyle}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl text-[10px] flex items-center gap-1 transition cursor-pointer"
                    >
                      <Upload size={12} /> Yüklə
                    </button>
                    <button 
                      type="button" 
                      style={fontTextStyle}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl text-[10px] flex items-center gap-1 transition cursor-pointer"
                    >
                      <Camera size={12} /> Переснять
                    </button>
                    <button 
                      type="button" 
                      onClick={handleSyncPhoto}
                      style={fontTextStyle}
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold rounded-xl text-[10px] flex items-center gap-1 transition cursor-pointer border border-blue-200"
                    >
                      <RefreshCw size={12} /> Sinxronizasiya
                    </button>
                    <button 
                      type="button" 
                      onClick={handlePhotoDelete}
                      style={fontTextStyle}
                      className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold rounded-xl text-[10px] flex items-center gap-1 transition cursor-pointer border border-rose-200"
                    >
                      <Trash2 size={12} /> Sil
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Ad və Soyad:</label>
                    <input 
                      style={fontTextStyle}
                      type="text" 
                      value={editFormData.name || ''} 
                      onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-extrabold text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Təvəllüd (İl):</label>
                    <input 
                      style={fontDisplayStyle}
                      type="text" 
                      value={editFormData.birthYear || ''} 
                      onChange={e => setEditFormData({ ...editFormData, birthYear: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-black text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Cinsiyyət:</label>
                    <select 
                      style={fontTextStyle}
                      value={editFormData.gender || 'Qadın'} 
                      onChange={e => setEditFormData({ ...editFormData, gender: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-extrabold text-slate-800 outline-none"
                    >
                      <option value="Qadın">Qadın</option>
                      <option value="Kişi">Kişi</option>
                    </select>
                  </div>

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Şəhər / Ünvan:</label>
                    <input 
                      style={fontTextStyle}
                      type="text" 
                      value={editFormData.city || ''} 
                      onChange={e => setEditFormData({ ...editFormData, city: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-extrabold text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Telefon Nömrəsi:</label>
                    <input 
                      style={fontDisplayStyle}
                      type="text" 
                      value={editFormData.phone || ''} 
                      onChange={e => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-black text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">E-poçt Ünvanı:</label>
                    <input 
                      style={fontTextStyle}
                      type="email" 
                      value={editFormData.email || ''} 
                      onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-extrabold text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center gap-2 pt-2 border-t border-slate-200">
                  <button 
                    type="button" 
                    onClick={() => setIsEditProfileMode(false)}
                    style={fontTextStyle}
                    className="px-4 py-2 bg-slate-200 text-slate-700 font-extrabold rounded-xl hover:bg-slate-300 transition cursor-pointer text-xs"
                  >
                    Ləğv Et
                  </button>
                  <button 
                    type="submit" 
                    style={fontTextStyle}
                    className="px-6 py-2 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition cursor-pointer text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Check size={14} /> Məlumatları Yadda Saxla
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                        <span style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                          <ShieldCheck size={16} className="text-emerald-600" /> Cari Paket: <strong className="text-slate-900">{selectedClient.membershipPackage}</strong>
                        </span>
                        <span style={fontTextStyle} className="text-slate-500 text-[10px] font-extrabold">{selectedClient.startDate} — {selectedClient.endDate}</span>
                      </div>

                      <div>
                        <span style={fontTextStyle} className="text-[10px] font-extrabold text-slate-400 uppercase block mb-1">Paketin İmtiyazları Və Hüquqları:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {selectedClient.privileges.map((priv, idx) => (
                            <div key={idx} style={fontTextStyle} className="bg-white p-2 rounded-xl border border-slate-200/80 font-extrabold text-slate-800 flex items-center gap-1.5 text-[10px]">
                              <Check size={12} className="text-emerald-600 shrink-0" />
                              <span>{priv}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                      <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                        <Dumbbell size={16} className="text-purple-600" /> Təlimçi (PT) Balansı Və Seanslar
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <span style={fontTextStyle} className="text-[9px] text-slate-400 font-extrabold uppercase block">Məşqçi</span>
                          <p style={fontTextStyle} className="font-extrabold text-slate-900 text-xs truncate">{selectedClient.ptBalance.trainerName}</p>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <span style={fontTextStyle} className="text-[9px] text-slate-400 font-extrabold uppercase block">Alınan Seans</span>
                          <p style={fontDisplayStyle} className="font-black text-slate-900 text-xs">{selectedClient.ptBalance.totalSessions} Seans</p>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <span style={fontTextStyle} className="text-[9px] text-slate-400 font-extrabold uppercase block">Qalan Seans</span>
                          <p style={fontDisplayStyle} className="font-black text-emerald-600 text-xs">{selectedClient.ptBalance.remainingSessions} Seans</p>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <span style={fontTextStyle} className="text-[9px] text-slate-400 font-extrabold uppercase block">PT Depoziti</span>
                          <div className="flex justify-center items-baseline gap-0.5">
                            <span style={fontDisplayStyle} className="font-black text-slate-900 text-xs">{selectedClient.ptBalance.depositBalanceVal}</span>
                            <span style={fontTextStyle} className="font-extrabold text-slate-900 text-[10px]">{selectedClient.ptBalance.depositBalanceUnit}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
                      <div>
                        <span style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                          <Snowflake size={15} className="text-blue-600" /> Paket Dondurulması Və Avto-Aktivasiya
                        </span>
                        <p style={fontTextStyle} className="text-[10px] text-slate-500 mt-0.5 font-bold">Müddət dolduqda müştəri avtomatik aktivləşəcəkdir.</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input 
                          style={fontDisplayStyle}
                          type="number" 
                          min="1" 
                          max="30"
                          value={freezeDaysInput}
                          onChange={e => setFreezeDaysInput(e.target.value)}
                          className="w-16 p-1.5 border border-slate-200 rounded-xl bg-white font-black text-xs text-center outline-none"
                        />
                        <button 
                          style={fontTextStyle}
                          className="px-3 py-1.5 rounded-xl font-extrabold text-xs transition cursor-pointer bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                        >
                          {freezeDaysInput} Gün Dondur
                        </button>
                      </div>
                    </div>

                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                          <Receipt size={16} className="text-emerald-700" /> Ətraflı Kassa & Billing Tarixçəsi
                        </h4>
                        <div className="bg-white border border-slate-200 px-2 py-0.5 rounded-lg flex items-baseline gap-1">
                          <span style={fontTextStyle} className="text-[10px] font-extrabold text-slate-500">Cəm:</span>
                          <span style={fontDisplayStyle} className="font-black text-slate-900 text-[11px]">{selectedClient.totalSpentVal}</span>
                          <span style={fontTextStyle} className="font-extrabold text-slate-900 text-[10px]">{selectedClient.totalSpentUnit}</span>
                        </div>
                      </div>

                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {selectedClient.transactions.map((tr) => (
                          <div key={tr.id} className="bg-white p-2.5 rounded-xl border border-slate-200/90 text-[11px] space-y-1 shadow-2xs">
                            <div className="flex justify-between items-start">
                              <div>
                                <span style={fontTextStyle} className="font-extrabold text-slate-900 block">{tr.item}</span>
                                <span style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">{tr.id} • {tr.location} ({tr.type})</span>
                              </div>
                              <div className="bg-slate-100 px-2 py-0.5 rounded-md flex items-baseline gap-0.5">
                                <span style={fontDisplayStyle} className="font-black text-slate-900 text-xs">{tr.amountVal}</span>
                                <span style={fontTextStyle} className="font-extrabold text-slate-900 text-[10px]">{tr.amountUnit}</span>
                              </div>
                            </div>

                            <div className="pt-1 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500">
                              <span style={fontTextStyle} className="flex items-center gap-1 font-extrabold text-slate-700">
                                <User size={11} className="text-slate-400" /> Əməliyyatçı: <strong className="text-slate-900">{tr.processedBy}</strong>
                              </span>
                              <span style={fontTextStyle} className="text-slate-400 font-bold">{tr.date} ({tr.time})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <div className="space-y-1">
                    <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-[11px] flex items-center gap-1">
                      <Key size={13} /> Keçid Və Parkinq Tarixçəsi
                    </h4>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 max-h-28 overflow-y-auto space-y-1">
                      {selectedClient.accessHistory.map((acc, idx) => (
                        <div key={idx} className="bg-white p-1.5 rounded-lg border border-slate-100 flex justify-between items-center text-[10px]">
                          <span style={fontTextStyle} className="font-extrabold text-slate-800">{acc.detail}</span>
                          <span style={fontTextStyle} className="text-slate-400 font-bold">{acc.date} ({acc.time})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-[11px] flex items-center gap-1">
                      <Calendar size={13} /> Görüşlər Və Randevular
                    </h4>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 max-h-28 overflow-y-auto space-y-1">
                      {selectedClient.appointments.map((app, idx) => (
                        <div key={idx} className="bg-white p-1.5 rounded-lg border border-slate-100 flex justify-between items-center text-[10px]">
                          <div>
                            <span style={fontTextStyle} className="font-extrabold text-slate-900 block">{app.service}</span>
                            <span style={fontTextStyle} className="text-[9px] text-slate-400 font-bold">{app.master}</span>
                          </div>
                          <span style={fontTextStyle} className="text-slate-400 font-bold">{app.date} ({app.time})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={() => setSelectedClient(null)} 
                style={fontTextStyle}
                className="px-6 py-2 bg-slate-100 text-slate-800 font-extrabold rounded-xl hover:bg-slate-200 transition cursor-pointer text-xs"
              >
                Bağla
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. LEADS DETAILED MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-2 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div>
                <span style={fontDisplayStyle} className="text-[10px] font-black text-slate-400">{selectedLead.id}</span>
                <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-sm">{selectedLead.name} — Ətraflı Və Notlar</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span style={fontTextStyle} className="text-slate-400 font-extrabold block text-[9px] uppercase">Telefon</span>
                <span style={fontDisplayStyle} className="font-black text-slate-900">{selectedLead.phone}</span>
              </div>
              <div>
                <span style={fontTextStyle} className="text-slate-400 font-extrabold block text-[9px] uppercase">Gəldiyi Kanal</span>
                <span style={fontTextStyle} className="font-extrabold text-slate-800">{selectedLead.channel}</span>
              </div>
              <div>
                <span style={fontTextStyle} className="text-slate-400 font-extrabold block text-[9px] uppercase">Maraqlandığı Xidmət</span>
                <span style={fontTextStyle} className="font-extrabold text-slate-900">{selectedLead.interest}</span>
              </div>
              <div>
                <span style={fontTextStyle} className="text-slate-400 font-extrabold block text-[9px] uppercase">Təyin Olunub</span>
                <span style={fontTextStyle} className="font-extrabold text-slate-800">{selectedLead.assignedTo}</span>
              </div>
            </div>

            <form onSubmit={handleAddNoteToLead} className="space-y-2">
              <label style={fontTextStyle} className="font-extrabold text-slate-900 text-[11px] block">Yeni Qeyd / Not Əlavə Et:</label>
              <textarea 
                style={fontTextStyle}
                rows="2"
                placeholder="Qeyd daxil edin..."
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 text-slate-800 focus:border-blue-500 outline-none font-bold"
              ></textarea>
              <button 
                type="submit" 
                style={fontTextStyle}
                className="w-full py-2 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition cursor-pointer text-xs shadow-xs"
              >
                + Notu Əlavə Et
              </button>
            </form>

            <div className="space-y-1.5">
              <label style={fontTextStyle} className="font-extrabold text-slate-900 text-[11px] block">Əvvəlki Qeydlər Tarixçəsi:</label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {selectedLead.notes.length === 0 ? (
                  <p style={fontTextStyle} className="text-slate-400 text-center py-4 font-extrabold text-[10px]">Hələ heç bir qeyd əlavə edilməyib.</p>
                ) : (
                  selectedLead.notes.map((n, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] space-y-0.5">
                      <div className="flex justify-between items-center text-slate-500 font-bold text-[10px]">
                        <span style={fontTextStyle}>{n.author}</span>
                        <span style={fontTextStyle}>{n.date}</span>
                      </div>
                      <p style={fontTextStyle} className="text-slate-800 font-extrabold">{n.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={() => setSelectedLead(null)} 
                style={fontTextStyle}
                className="px-4 py-1.5 bg-slate-100 text-slate-800 font-extrabold rounded-xl hover:bg-slate-200 transition cursor-pointer"
              >
                Tamamla
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}