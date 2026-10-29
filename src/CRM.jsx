import React, { useState } from 'react';
import { 
  Users, Search, Instagram, Clock, UserCheck, ChevronRight, X, SlidersHorizontal, 
  RefreshCw, MessageSquare, Download, FileSpreadsheet, FileText, FileCode, Check
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
  },
  {
    id: 'LED-803',
    name: 'Rauf Hüseynov',
    phone: '+994 70 333 22 11',
    gender: 'Kişi',
    channel: 'TikTok',
    requestTime: '27.10.2026 | 22:45',
    rawDate: '2026-10-27',
    stage: 'lost',
    interest: 'Standart 1 Aylıq',
    assignedTo: 'Ayan X.',
    notes: [
      { date: '25.10.2026', author: 'Ayan X.', text: 'Gecə saatlarında keçid imkanları ilə maraqlandı.' }
    ],
    lostReason: 'Başqa zalı seçdi (Evə daha yaxın)'
  },
  {
    id: 'LED-804',
    name: 'Leyla Məmmədova',
    phone: '+994 51 444 88 99',
    gender: 'Qadın',
    channel: 'Instagram',
    requestTime: '29.10.2026 | 09:15',
    rawDate: '2026-10-29',
    stage: 'new',
    interest: 'Pilates Reformer',
    assignedTo: 'Nigar H.',
    notes: [],
    lostReason: ''
  }
];

const initialClients = [
  {
    id: 'MK-1042',
    name: 'Ayan Xəlilova',
    phone: '+994 50 123 45 67',
    email: 'ayan.khalilova@gmail.com',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    status: 'Aktivdir',
    membershipPackage: 'VIP Gold Limitsiz (1 İllik)',
    startDate: '15.01.2026',
    endDate: '15.01.2027',
    balance: '0 AZN',
    totalSpent: '1,450 AZN',
    trainer: 'Elmir Uçar',
    freezeDaysLeft: 14
  },
  {
    id: 'MK-1089',
    name: 'Kamran Alıyev',
    phone: '+994 55 444 55 66',
    email: 'kamran.aliyev@mail.ru',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    status: 'Dondurulub',
    membershipPackage: 'Standart (6 Aylıq)',
    startDate: '01.06.2026',
    endDate: '01.12.2026',
    balance: '25 AZN (Borc)',
    totalSpent: '620 AZN',
    trainer: 'Orxan Məmmədov',
    freezeDaysLeft: 0
  }
];

export default function CRM() {
  const [activeTab, setActiveTab] = useState('leads');
  const [clients] = useState(initialClients);
  const [leads, setLeads] = useState(initialLeads);
  const [searchQuery, setSearchQuery] = useState('');

  // Süzgəc State-ləri
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Eksport Menyusu State-i
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportSuccess, setExportSuccess] = useState('');

  // Modallar
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');

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

  const resetFilters = () => {
    setFilterChannel('all');
    setFilterStage('all');
    setFilterGender('all');
    setFilterStartDate('');
    setFilterEndDate('');
    setSearchQuery('');
  };

  // Eksport Funksiyaları
  const handleExport = (format) => {
    setShowExportMenu(false);
    setExportSuccess(`Məlumatlar ${format.toUpperCase()} formatında uğurla yükləndi!`);
    setTimeout(() => setExportSuccess(''), 3000);
  };

  const handleAddNoteToLead = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;

    const updatedNote = {
      date: new Date().toLocaleDateString(),
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
    <div className="m-0 p-0 box-border flex flex-col h-screen w-full overflow-hidden bg-slate-50 gap-2">
      
      {/* 1. ÜST PANEL VƏ EKSPORT DÜYMƏSİ */}
      <div className="bg-white border-b border-slate-200 px-3 py-2 shadow-2xs flex items-center justify-between gap-2 shrink-0">
        <div>
          <h3 className="font-extrabold text-slate-900 text-xs tracking-tight flex items-center gap-1.5">
            <Users className="text-blue-600" size={16} /> CRM — Müştəri Bazası Və Lidlər
          </h3>
          <p className="text-[10px] text-slate-500">Müştəri profilləri, daxil olan müraciətlər və eksport seçimləri</p>
        </div>

        <div className="flex items-center gap-2">
          {/* EKSPORT / DOWNLOAD DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-[11px] font-bold flex items-center gap-1.5 transition shadow-2xs"
            >
              <Download size={12} /> Eksport Et
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                <p className="text-[9px] font-black uppercase text-slate-400 px-2 py-1">Formatı Seçin:</p>
                <button 
                  onClick={() => handleExport('excel')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 font-bold text-[11px] flex items-center gap-2 transition"
                >
                  <FileSpreadsheet size={13} className="text-emerald-600" /> Excel (.xlsx)
                </button>
                <button 
                  onClick={() => handleExport('pdf')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-50 text-slate-800 hover:text-rose-700 font-bold text-[11px] flex items-center gap-2 transition"
                >
                  <FileText size={13} className="text-rose-600" /> PDF Sənəd (.pdf)
                </button>
                <button 
                  onClick={() => handleExport('word')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-slate-800 hover:text-blue-700 font-bold text-[11px] flex items-center gap-2 transition"
                >
                  <FileCode size={13} className="text-blue-600" /> Word (.docx)
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-bold">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                activeTab === 'leads' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Instagram size={12} /> Lidlər ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                activeTab === 'clients' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={12} /> Müştəri Bazası ({clients.length})
            </button>
          </div>
        </div>
      </div>

      {/* BİLDİRİŞ BANNERİ */}
      {exportSuccess && (
        <div className="mx-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-2xs">
          <Check size={14} className="text-emerald-600" /> {exportSuccess}
        </div>
      )}

      {/* 2. AXTARIŞ VƏ FİLTRASIYA PANELİ */}
      <div className="bg-white border border-slate-200 p-2 rounded-lg shadow-2xs space-y-1.5 shrink-0 mx-2">
        <div className="flex items-center justify-between gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1.5 text-slate-400" size={13} />
            <input 
              type="text" 
              placeholder={activeTab === 'clients' ? "Axtarış (ID, Ad, Tel)..." : "Lid axtarışı..."}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-2 py-0.5 border border-slate-200 rounded-md text-[11px] font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {activeTab === 'leads' && (
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`px-2.5 py-1 rounded-md border text-[11px] font-bold flex items-center gap-1 transition ${
                  showFilterPanel || filterChannel !== 'all' || filterStage !== 'all' || filterGender !== 'all'
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal size={12} /> Süzgəclər
              </button>

              {(filterChannel !== 'all' || filterStage !== 'all' || filterGender !== 'all' || filterStartDate || filterEndDate) && (
                <button 
                  onClick={resetFilters}
                  className="p-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-md hover:bg-rose-100 transition text-[11px] font-bold"
                >
                  <RefreshCw size={11} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* FİLTRASIYA SÜZGƏC PANELİ */}
        {activeTab === 'leads' && showFilterPanel && (
          <div className="pt-1.5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 text-[10px]">
            <div>
              <label className="font-bold text-slate-600 block mb-0.5">Mənbə / Kanal:</label>
              <select value={filterChannel} onChange={e => setFilterChannel(e.target.value)} className="w-full p-1 border rounded bg-slate-50 font-bold">
                <option value="all">Hamısı</option>
                <option value="Instagram">Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="TikTok">TikTok</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-0.5">Mərhələ:</label>
              <select value={filterStage} onChange={e => setFilterStage(e.target.value)} className="w-full p-1 border rounded bg-slate-50 font-bold">
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
              <label className="font-bold text-slate-600 block mb-0.5">Cinsiyyət:</label>
              <select value={filterGender} onChange={e => setFilterGender(e.target.value)} className="w-full p-1 border rounded bg-slate-50 font-bold">
                <option value="all">Hamısı</option>
                <option value="Qadın">Qadın</option>
                <option value="Kişi">Kişi</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-0.5">Tarixdən:</label>
              <input type="date" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} className="w-full p-0.5 border rounded bg-slate-50" />
            </div>

            <div>
              <label className="font-bold text-slate-600 block mb-0.5">Tarixədək:</label>
              <input type="date" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} className="w-full p-0.5 border rounded bg-slate-50" />
            </div>
          </div>
        )}
      </div>

      {/* 3. BƏRABƏR BÖLÜNMÜŞ (BALANCED GRID) VƏ YIĞCAM LİD SİYAHISI */}
      <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden mx-2 mb-2">
        
        {/* A) MÜŞTƏRİ BAZASI */}
        {activeTab === 'clients' && (
          <div className="overflow-auto h-full">
            <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
              <thead className="sticky top-0 z-10 bg-slate-50 text-slate-700 border-b border-slate-200 shadow-2xs">
                <tr className="uppercase font-bold text-[10px]">
                  <th className="p-2 border-r">ID</th>
                  <th className="p-2 border-r">Ad Soyad</th>
                  <th className="p-2 border-r">Telefon</th>
                  <th className="p-2 border-r">Paket</th>
                  <th className="p-2 border-r text-center">Status</th>
                  <th className="p-2 border-r">Müddət</th>
                  <th className="p-2 text-right">Əməliyyat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {clients.map(client => (
                  <tr key={client.id} className="hover:bg-blue-50/40 transition">
                    <td className="p-2 border-r font-mono font-bold text-blue-600">{client.id}</td>
                    <td className="p-2 border-r font-bold text-slate-900">{client.name}</td>
                    <td className="p-2 border-r font-mono text-slate-600">{client.phone}</td>
                    <td className="p-2 border-r font-bold text-slate-700">{client.membershipPackage}</td>
                    <td className="p-2 border-r text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                        client.status === 'Aktivdir' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="p-2 border-r font-mono text-slate-600 text-[10px]">{client.startDate} - {client.endDate}</td>
                    <td className="p-2 text-right">
                      <button 
                        onClick={() => setSelectedClient(client)}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-2 py-0.5 rounded-md font-bold text-[10px]"
                      >
                        Profil 👤
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* B) BƏRABƏR NİZAMLAMIŞ LİD BLOKLARI (BALANCED DENSITY LIST) */}
        {activeTab === 'leads' && (
          <div className="overflow-auto h-full p-2 space-y-1.5">
            {filteredLeads.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-semibold">
                Süzgəcə uyğun lid tapılmadı.
              </div>
            ) : (
              filteredLeads.map(lead => (
                <div 
                  key={lead.id} 
                  className="bg-white border border-slate-200 p-2 rounded-xl shadow-2xs hover:border-blue-300 transition text-[11px] grid grid-cols-1 md:grid-cols-12 items-center gap-2"
                >
                  {/* 1. ŞƏXSİ MƏLUMATLAR VƏ CİNSİYYƏT (3 SÜTUN) */}
                  <div className="md:col-span-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{lead.id}</span>
                    <span className="text-[9px] font-bold bg-slate-200/80 text-slate-700 px-1.5 py-0.5 rounded">{lead.gender}</span>
                    <h4 className="font-black text-slate-900 text-xs truncate">{lead.name}</h4>
                  </div>

                  {/* 2. MARAQ LANDIĞI XİDMƏT VƏ TELEFON (3 SÜTUN) */}
                  <div className="md:col-span-3 space-y-0.5 text-slate-700">
                    <p className="truncate"><b>Maraqlanır:</b> <span className="text-slate-900 font-bold">{lead.interest}</span></p>
                    <p className="font-mono text-slate-900 font-bold">Tel: {lead.phone}</p>
                  </div>

                  {/* 3. MƏNBƏ VƏ DAXİL OLMA TARİXİ (3 SÜTUN) */}
                  <div className="md:col-span-3 space-y-0.5">
                    <span className={`px-2 py-0.2 rounded-full text-[9px] font-black inline-flex items-center gap-1 ${
                      lead.channel === 'Instagram' ? 'bg-pink-100 text-pink-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      <Instagram size={9} /> {lead.channel}
                    </span>
                    <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock size={10} className="text-blue-500" /> {lead.requestTime}
                    </p>
                  </div>

                  {/* 4. MƏRHƏLƏ SEÇİMİ VƏ QEYDLƏR DÜYMƏSİ (3 SÜTUN) */}
                  <div className="md:col-span-3 flex items-center justify-end gap-1.5">
                    <select 
                      value={lead.stage}
                      onChange={e => handleStageChange(lead.id, e.target.value)}
                      className="p-1 border rounded-lg font-bold text-[10px] bg-slate-50 text-slate-800 focus:bg-white"
                    >
                      <option value="new">🆕 Yeni Lid</option>
                      <option value="contacted">📞 Əlaqə Saxlanıldı</option>
                      <option value="tour">🏋️ Tur Təyin Edildi</option>
                      <option value="potential">🤔 Düşünür</option>
                      <option value="won">✅ Paket Aldı</option>
                      <option value="lost">❌ İmtina Etdi</option>
                    </select>

                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-2 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 shrink-0"
                    >
                      <MessageSquare size={10} className="text-blue-600" />
                      <span>Qeydlər ({lead.notes.length})</span>
                    </button>
                  </div>

                  {/* İMTİNA SƏBƏBİ VARSA AŞAĞIDA QEYD OLUNUR */}
                  {lead.stage === 'lost' && lead.lostReason && (
                    <div className="col-span-full pt-1 border-t border-slate-100">
                      <p className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[10px]">
                        İmtina Səbəbi: {lead.lostReason}
                      </p>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* 4. MÜŞTƏRİ MODALI */}
      {selectedClient && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-4 space-y-3 border border-slate-200 text-xs">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-slate-900">{selectedClient.name} ({selectedClient.id})</h3>
              <button onClick={() => setSelectedClient(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl space-y-1">
              <p><b>Paket:</b> {selectedClient.membershipPackage}</p>
              <p><b>Müddət:</b> {selectedClient.startDate} - {selectedClient.endDate}</p>
              <p><b>Xərclənən:</b> {selectedClient.totalSpent}</p>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setSelectedClient(null)} className="px-4 py-1 bg-slate-900 text-white font-bold rounded-lg">Bağla</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. QEYDLƏR MODALI */}
      {selectedLead && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-4 space-y-3 border border-slate-200 text-xs">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-black text-slate-900">{selectedLead.name} — Qeydlər</h3>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddNoteToLead} className="space-y-1.5">
              <textarea 
                rows="2"
                placeholder="Qeyd daxil edin..."
                value={newNoteText}
                onChange={e => setNewNoteText(e.target.value)}
                className="w-full p-2 border rounded-lg text-xs bg-slate-50 focus:bg-white"
              ></textarea>
              <button type="submit" className="w-full py-1.5 bg-blue-600 text-white font-bold rounded-lg">+ Əlavə Et</button>
            </form>
            <div className="space-y-1 max-h-36 overflow-y-auto">
              {selectedLead.notes.map((n, idx) => (
                <div key={idx} className="bg-slate-50 p-2 rounded border text-[10px]">
                  <span className="font-bold text-slate-500">{n.author} ({n.date}):</span>
                  <p className="text-slate-800 font-medium">{n.text}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setSelectedLead(null)} className="px-4 py-1 bg-slate-900 text-white font-bold rounded-lg">Tamamla</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}