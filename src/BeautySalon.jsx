import React, { useState } from 'react';
import { 
  Sparkles, Search, Plus, User, Check, X, Receipt, Tag, Trash2, ShieldAlert,
  Download, FileSpreadsheet, FileText, Calendar, Clock
} from 'lucide-react';

const mastersList = ['Nərmin Məmmədova', 'Günay Əliyeva', 'Aytən Qasımova', 'Leyla Məmmədova'];
const servicesList = [
  { name: 'Manikür (Gel-Lak)', price: 30 },
  { name: 'Pedikür', price: 40 },
  { name: 'Saç Kəsimi & Fen', price: 35 },
  { name: 'Gündəlik Makiyaj', price: 50 },
  { name: 'Axşam Makiyajı', price: 80 },
  { name: 'Üz Qulluğu (Fasiyal)', price: 60 }
];

const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

// 🟢 База гостей клуба
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

const initialBeautyReceipts = [
  {
    id: 'CHK-901',
    clientName: 'Ayan Xəlilova',
    date: '28.10.2026',
    time: '14:30',
    paymentMethod: 'POS Kart',
    status: 'Ödənilib',
    items: [
      { service: 'Manikür (Gel-Lak)', master: 'Nərmin Məmmədova', price: 30 },
      { service: 'Saç Kəsimi & Fen', master: 'Günay Əliyeva', price: 35 }
    ],
    subtotal: 65,
    discountType: 'amount',
    discountValue: 5,
    discountAmount: 5,
    finalAmount: 60
  },
  {
    id: 'CHK-902',
    clientName: 'Leyla Məmmədova',
    date: '28.10.2026',
    time: '16:00',
    paymentMethod: 'Nağd',
    status: 'Ödənilib',
    items: [
      { service: 'Axşam Makiyajı', master: 'Aytən Qasımova', price: 80 },
      { service: 'Üz Qulluğu (Fasiyal)', master: 'Leyla Məmmədova', price: 60 }
    ],
    subtotal: 140,
    discountType: 'percent',
    discountValue: 10,
    discountAmount: 14,
    finalAmount: 126
  }
];

// Matris randevular üçün ilkin cədvəl [MasterName][TimeSlot]
const initialBeautyGrid = {
  'Nərmin Məmmədova': {
    '13:00': { 
      client: 'Ayan Xəlilova', 
      phone: '+994 70 555 44 33', 
      services: [{ service: 'Manikür (Gel-Lak)', price: 30 }], 
      id: 'MK-1105' 
    }
  }
};

export default function BeautySalon() {
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'receipts'
  const [receipts, setReceipts] = useState(initialBeautyReceipts);
  const [appointmentsGrid, setAppointmentsGrid] = useState(initialBeautyGrid);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportSuccess, setExportSuccess] = useState('');

  // Matris Slot Modal State (с поддержкой множественных услуг)
  const [activeSlot, setActiveSlot] = useState({ isOpen: false, master: '', time: '' });
  const [slotClient, setSlotClient] = useState(allClubGuests[0]);
  const [slotPhone, setSlotPhone] = useState('+994 ');
  const [slotSelectedServices, setSlotSelectedServices] = useState([
    { service: servicesList[0].name, price: servicesList[0].price }
  ]);
  
  // SİLMƏ TƏSDİQ MODALI
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    receipt: null
  });

  const [clientInput, setClientInput] = useState(allClubGuests[0]);
  const [payMethodInput, setPayMethodInput] = useState('POS Kart');
  const [discountTypeInput, setDiscountTypeInput] = useState('amount');
  const [discountValInput, setDiscountValInput] = useState(0);

  const [selectedServices, setSelectedServices] = useState([
    { service: servicesList[0].name, master: mastersList[0], price: servicesList[0].price }
  ]);

  const handleAddServiceToForm = () => {
    setSelectedServices([
      ...selectedServices,
      { service: servicesList[0].name, master: mastersList[0], price: servicesList[0].price }
    ]);
  };

  const handleRemoveServiceFromForm = (index) => {
    if (selectedServices.length === 1) return;
    setSelectedServices(selectedServices.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index, serviceName) => {
    const found = servicesList.find(s => s.name === serviceName);
    const updated = [...selectedServices];
    updated[index].service = serviceName;
    updated[index].price = found ? found.price : 0;
    setSelectedServices(updated);
  };

  const handleMasterChange = (index, masterName) => {
    const updated = [...selectedServices];
    updated[index].master = masterName;
    setSelectedServices(updated);
  };

  // Функции для добавления/удаления услуг в слоте рандеву матрицы
  const handleAddSlotService = () => {
    setSlotSelectedServices([
      ...slotSelectedServices,
      { service: servicesList[0].name, price: servicesList[0].price }
    ]);
  };

  const handleRemoveSlotService = (index) => {
    if (slotSelectedServices.length === 1) return;
    setSlotSelectedServices(slotSelectedServices.filter((_, i) => i !== index));
  };

  const handleSlotServiceChange = (index, serviceName) => {
    const found = servicesList.find(s => s.name === serviceName);
    const updated = [...slotSelectedServices];
    updated[index].service = serviceName;
    updated[index].price = found ? found.price : 0;
    setSlotSelectedServices(updated);
  };

  const subtotal = selectedServices.reduce((sum, item) => sum + Number(item.price), 0);
  const discountVal = Number(discountValInput) || 0;
  let calcDiscountAmount = discountTypeInput === 'percent' ? (subtotal * discountVal) / 100 : discountVal;

  if (calcDiscountAmount > subtotal) calcDiscountAmount = subtotal;
  const finalCalculatedAmount = subtotal - calcDiscountAmount;

  const handleCreateReceipt = (e) => {
    e.preventDefault();
    if (!clientInput) return;

    const newReceipt = {
      id: `CHK-90${receipts.length + 1}`,
      clientName: clientInput,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().slice(0, 5),
      paymentMethod: payMethodInput,
      status: 'Ödənilib',
      items: selectedServices,
      subtotal: subtotal,
      discountType: discountTypeInput,
      discountValue: discountVal,
      discountAmount: calcDiscountAmount,
      finalAmount: finalCalculatedAmount
    };

    setReceipts([newReceipt, ...receipts]);
    setClientInput(allClubGuests[0]);
    setDiscountValInput(0);
    setDiscountTypeInput('amount');
    setSelectedServices([{ service: servicesList[0].name, master: mastersList[0], price: servicesList[0].price }]);
    setShowAddModal(false);
  };

  const handleDeleteReceipt = () => {
    if (!confirmModal.receipt) return;
    setReceipts(receipts.filter(r => r.id !== confirmModal.receipt.id));
    setConfirmModal({ isOpen: false, receipt: null });
  };

  const handleExport = (format) => {
    setShowExportMenu(false);
    setExportSuccess(`Gözəllik salonu məlumatları ${format.toUpperCase()} formatında yükləndi!`);
    setTimeout(() => setExportSuccess(''), 3000);
  };

  // Matris Slot Actions
  const handleSlotClick = (master, time) => {
    const existing = appointmentsGrid[master]?.[time];
    setActiveSlot({ isOpen: true, master, time });
    if (existing) {
      setSlotClient(existing.client);
      setSlotPhone(existing.phone);
      // Поддержка старого формата (service) и нового (services)
      if (existing.services) {
        setSlotSelectedServices(existing.services);
      } else if (existing.service) {
        const found = servicesList.find(s => s.name === existing.service);
        setSlotSelectedServices([{ service: existing.service, price: found ? found.price : 0 }]);
      }
    } else {
      setSlotClient(allClubGuests[0]);
      setSlotPhone('+994 ');
      setSlotSelectedServices([{ service: servicesList[0].name, price: servicesList[0].price }]);
    }
  };

  const handleSaveSlotAppointment = (e) => {
    e.preventDefault();
    if (!slotClient) return;

    const { master, time } = activeSlot;
    const randomId = 'MK-' + Math.floor(1000 + Math.random() * 9000);

    setAppointmentsGrid(prev => ({
      ...prev,
      [master]: {
        ...(prev[master] || {}),
        [time]: { 
          client: slotClient, 
          phone: slotPhone, 
          services: slotSelectedServices, 
          id: randomId 
        }
      }
    }));
    setActiveSlot({ isOpen: false, master: '', time: '' });
  };

  const handleClearSlotAppointment = (master, time) => {
    if (!window.confirm(`${master} üçün saat ${time}-dakı randevu ləğv edilsin?`)) return;
    setAppointmentsGrid(prev => {
      const updatedMaster = { ...(prev[master] || {}) };
      delete updatedMaster[time];
      return { ...prev, [master]: updatedMaster };
    });
    setActiveSlot({ isOpen: false, master: '', time: '' });
  };

  const filteredReceipts = receipts.filter(r => 
    r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.items.some(i => i.service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="m-0 p-0 box-border flex flex-col h-full w-full overflow-hidden bg-slate-50 text-slate-800 gap-2 font-sans">
      
      {/* HEADER & TABS */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#151515] rounded-lg flex items-center justify-center font-black text-[#F8FF70] text-xs">
            <Sparkles size={14} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
              MAKFIT — Gözəllik Salonu İdarəetməsi
            </h3>
            <p className="text-[10px] text-slate-500">Randevu Matrisi və Çek Arxivi İdarəetməsi</p>
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
              onClick={() => setActiveTab('receipts')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${activeTab === 'receipts' ? 'bg-[#151515] text-[#F8FF70] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🧾 Çeklər ({receipts.length})
            </button>
          </div>

          {/* EXPORT MENU */}
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
            onClick={() => setShowAddModal(true)}
            className="bg-[#151515] hover:bg-black text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Plus size={14} className="text-[#F8FF70]" /> Yeni Çek Yarat
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
            <span className="font-bold text-slate-700">Usta və Saatlar Üzrə Canlı Randevu Cədvəli (Slotlara klikləyərək əlavə edin)</span>
            <span className="text-[11px] text-slate-500">Cəmi Usta: <strong className="text-slate-900">{mastersList.length}</strong></span>
          </div>

          <div className="overflow-auto flex-1">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
                  <th className="p-3 border-r border-slate-200 font-extrabold text-slate-500 w-24 text-center">Saat</th>
                  {mastersList.map(master => {
                    const count = Object.keys(appointmentsGrid[master] || {}).length;
                    return (
                      <th key={master} className="p-3 border-r border-slate-200 text-center font-black text-slate-900 min-w-[200px]">
                        <div className="font-extrabold">{master}</div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold inline-block mt-1 ${count > 0 ? 'text-purple-700 bg-purple-50' : 'text-slate-400 bg-slate-100'}`}>
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
                    {mastersList.map(master => {
                      const slotData = appointmentsGrid[master]?.[time];
                      const sList = slotData?.services || (slotData?.service ? [{ service: slotData.service }] : []);
                      return (
                        <td 
                          key={master} 
                          onClick={() => handleSlotClick(master, time)}
                          className="p-2 border-r border-slate-200 cursor-pointer transition align-top h-20"
                        >
                          {slotData ? (
                            <div className="bg-purple-50 border border-purple-300 rounded-xl p-2 shadow-2xs space-y-1 hover:border-purple-500 transition">
                              <div className="flex justify-between items-center">
                                <span className="bg-white border border-purple-200 text-purple-800 text-[9px] font-black px-1.5 py-0.5 rounded font-mono">
                                  {slotData.id}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                              </div>
                              <h5 className="font-black text-slate-900 text-xs truncate">{slotData.client}</h5>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {sList.map((item, i) => (
                                  <span key={i} className="bg-purple-100 text-purple-900 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                    {item.service}
                                  </span>
                                ))}
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

      {/* TAB 2: ÇEKLƏR ARXİVİ */}
      {activeTab === 'receipts' && (
        <div className="flex-1 flex flex-col gap-2 overflow-hidden mx-2 mb-2">
          {/* AXTARIŞ PANELİ */}
          <div className="bg-white border border-slate-200 p-2 rounded-2xl shadow-2xs flex items-center justify-between gap-3 shrink-0">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-2.5 top-1.5 text-slate-400" size={13} />
              <input 
                type="text" 
                placeholder="Müştəri adı, çek no və ya xidmət..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-2 py-1 border border-slate-200 rounded-xl text-[11px] font-medium bg-slate-50 focus:outline-none focus:border-slate-800 transition"
              />
            </div>
            <span className="text-[11px] text-slate-500 font-bold">Cəm Çek: <strong className="text-slate-900">{filteredReceipts.length}</strong></span>
          </div>

          {/* CƏDVƏL */}
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-auto h-full">
              <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
                <thead className="sticky top-0 z-10 bg-[#151515] text-[#F8FF70]">
                  <tr className="uppercase font-extrabold text-[10px] tracking-wider">
                    <th className="p-2.5 border-r border-[#282828]">Çek ID</th>
                    <th className="p-2.5 border-r border-[#282828]">Müştəri</th>
                    <th className="p-2.5 border-r border-[#282828]">Tarix / Saat</th>
                    <th className="p-2.5 border-r border-[#282828] text-center">Xidmət Sayı</th>
                    <th className="p-2.5 border-r border-[#282828]">Cəm Məbləğ</th>
                    <th className="p-2.5 border-r border-[#282828]">Endirim</th>
                    <th className="p-2.5 border-r border-[#282828]">Yekun Ödəniş</th>
                    <th className="p-2.5 text-right">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {filteredReceipts.map(receipt => (
                    <tr key={receipt.id} className="hover:bg-slate-50 transition">
                      <td className="p-2.5 border-r border-slate-100 font-mono font-bold text-slate-900">{receipt.id}</td>
                      <td className="p-2.5 border-r border-slate-100 font-black text-slate-900">{receipt.clientName}</td>
                      <td className="p-2.5 border-r border-slate-100 text-slate-600">{receipt.date} <span className="font-mono text-slate-400 text-[10px] ml-1">{receipt.time}</span></td>
                      <td className="p-2.5 border-r border-slate-100 text-center">
                        <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-full text-[9px]">
                          {receipt.items.length} Xidmət
                        </span>
                      </td>
                      <td className="p-2.5 border-r border-slate-100 font-bold text-slate-600">{receipt.subtotal} AZN</td>
                      <td className="p-2.5 border-r border-slate-100 font-bold text-rose-600">
                        {receipt.discountAmount > 0 ? `-${receipt.discountAmount} AZN` : '-'}
                      </td>
                      <td className="p-2.5 border-r border-slate-100 font-black text-emerald-600 text-xs">{receipt.finalAmount} AZN</td>
                      <td className="p-2.5 text-right space-x-1.5">
                        <button 
                          onClick={() => setSelectedReceipt(receipt)}
                          className="bg-[#151515] hover:bg-black text-[#F8FF70] px-2.5 py-1 rounded-xl font-bold text-[10px] transition cursor-pointer"
                        >
                          Ətraflı 🧾
                        </button>
                        <button 
                          onClick={() => setConfirmModal({ isOpen: true, receipt: receipt })}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2 py-1 rounded-xl font-bold text-[10px] transition cursor-pointer"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SLOT RANDEVU MODALI (С выбором гостя из базы и множественных услуг) */}
      {activeSlot.isOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-0 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">{activeSlot.master} — {activeSlot.time}</span>
                <h3 className="font-black text-slate-900 text-sm mt-1">Salon Randevu Təyinatı</h3>
              </div>
              <button onClick={() => setActiveSlot({ isOpen: false, master: '', time: '' })} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
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
                <label className="font-bold text-slate-700 block mb-1">Əlaqə Nömrəsi:</label>
                <input 
                  type="text" 
                  value={slotPhone}
                  onChange={e => setSlotPhone(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl font-medium bg-slate-50"
                />
              </div>

              {/* Множественный выбор услуг для слота рандеву */}
              <div className="space-y-1.5 border-t border-slate-100 pt-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-900 text-xs">Xidmət Növləri (Bir neçə seçə bilərsiniz):</label>
                  <button 
                    type="button" 
                    onClick={handleAddSlotService}
                    className="text-slate-900 font-bold text-[10px] underline cursor-pointer"
                  >
                    + Xidmət Əlavə Et
                  </button>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {slotSelectedServices.map((row, idx) => (
                    <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                      <select 
                        value={row.service}
                        onChange={e => handleSlotServiceChange(idx, e.target.value)}
                        className="w-full p-1.5 border border-slate-200 rounded-lg font-bold bg-white text-[11px] cursor-pointer"
                      >
                        {servicesList.map(s => (
                          <option key={s.name} value={s.name}>{s.name} ({s.price} AZN)</option>
                        ))}
                      </select>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-black text-slate-900">{row.price}₼</span>
                        {slotSelectedServices.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSlotService(idx)}
                            className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between gap-2">
                {appointmentsGrid[activeSlot.master]?.[activeSlot.time] && (
                  <button 
                    type="button" 
                    onClick={() => handleClearSlotAppointment(activeSlot.master, activeSlot.time)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    Slotu Boşalt
                  </button>
                )}
                <div className="flex gap-1.5 ml-auto">
                  <button 
                    type="button" 
                    onClick={() => setActiveSlot({ isOpen: false, master: '', time: '' })}
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

      {/* SİLMƏ TƏSDİQ MODALI */}
      {confirmModal.isOpen && confirmModal.receipt && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-0 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 space-y-4 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldAlert size={24} />
            </div>

            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-sm">Salon Çekini Silmək İstəyirsiniz?</h3>
              <p className="text-[11px] text-slate-600 font-medium">
                <strong className="text-slate-900">"{confirmModal.receipt.clientName}"</strong> üçün olan <span className="font-mono font-bold text-slate-900">{confirmModal.receipt.id}</span> nömrəli çeki ləğv edirsiniz.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-left space-y-1 font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Cəm Məbləğ:</span>
                <span className="text-slate-900 font-bold">{confirmModal.receipt.subtotal} AZN</span>
              </div>
              <div className="flex justify-between">
                <span>Yekun Ödənilən:</span>
                <span className="text-emerald-700 font-bold">{confirmModal.receipt.finalAmount} AZN</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button 
                onClick={handleDeleteReceipt}
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Trash2 size={13} /> Sil
              </button>
              <button 
                onClick={() => setConfirmModal({ isOpen: false, receipt: null })}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Ləğv Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ƏTRAFLI ÇEK MODALI */}
      {selectedReceipt && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-0 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 space-y-3 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{selectedReceipt.id}</span>
                <h3 className="font-black text-slate-900 text-sm">{selectedReceipt.clientName} — Çek Detalları</h3>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex justify-between text-[11px] font-semibold text-slate-600">
              <p><b>Tarix:</b> {selectedReceipt.date} ({selectedReceipt.time})</p>
              <p><b>Ödəniş:</b> <span className="text-slate-900 font-bold">{selectedReceipt.paymentMethod}</span></p>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 text-[11px] block">Xidmətlər Və Ustalar:</label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {selectedReceipt.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[11px]">
                    <div>
                      <p className="font-bold text-slate-900">{item.service}</p>
                      {item.master && <p className="text-[10px] text-slate-500 font-semibold">Usta: {item.master}</p>}
                    </div>
                    <span className="font-black text-slate-900">{item.price} AZN</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1 text-[11px]">
              <div className="flex justify-between text-slate-600">
                <span>Cəm Məbləğ:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.subtotal} AZN</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Endirim:</span>
                <span className="font-bold">-{selectedReceipt.discountAmount} AZN</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-xs pt-1.5 border-t border-slate-200">
                <span>Yekun Ödəniləcək:</span>
                <span className="text-emerald-700">{selectedReceipt.finalAmount} AZN</span>
              </div>
            </div>

            <div className="pt-1 flex justify-end">
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-1.5 bg-[#151515] hover:bg-black text-[#F8FF70] font-black rounded-xl text-xs cursor-pointer"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YENİ ÇEK YARATMA MODALI */}
      {showAddModal && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-0 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-black text-slate-900 text-xs flex items-center gap-2">
                <Receipt size={16} /> Yeni Salon Çeki Yarat
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateReceipt} className="space-y-3 text-[11px]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Müştəri (Bazadan Seçin):</label>
                  <select 
                    value={clientInput}
                    onChange={e => setClientInput(e.target.value)}
                    className="w-full p-1.5 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer"
                  >
                    {allClubGuests.map(guest => (
                      <option key={guest} value={guest}>{guest}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ödəniş Üsulu:</label>
                  <select 
                    value={payMethodInput}
                    onChange={e => setPayMethodInput(e.target.value)}
                    className="w-full p-1.5 border border-slate-200 rounded-xl font-bold bg-slate-50 cursor-pointer"
                  >
                    <option value="POS Kart">POS Kart</option>
                    <option value="Nağd">Nağd</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 pt-2">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-900 text-xs">Xidmət Və Usta Seçimi:</label>
                  <button 
                    type="button" 
                    onClick={handleAddServiceToForm}
                    className="text-slate-900 font-bold text-[10px] underline cursor-pointer"
                  >
                    + Xidmət Əlavə Et
                  </button>
                </div>

                {selectedServices.map((row, idx) => (
                  <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-200 grid grid-cols-12 gap-1.5 items-center">
                    <div className="col-span-5">
                      <select 
                        value={row.service}
                        onChange={e => handleServiceChange(idx, e.target.value)}
                        className="w-full p-1 border border-slate-200 rounded-lg font-bold bg-white text-[10px] cursor-pointer"
                      >
                        {servicesList.map(s => (
                          <option key={s.name} value={s.name}>{s.name} ({s.price} AZN)</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-5">
                      <select 
                        value={row.master}
                        onChange={e => handleMasterChange(idx, e.target.value)}
                        className="w-full p-1 border border-slate-200 rounded-lg font-semibold bg-white text-[10px] cursor-pointer"
                      >
                        {mastersList.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2 flex items-center justify-between">
                      <span className="font-black text-slate-900">{row.price}₼</span>
                      {selectedServices.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveServiceFromForm(idx)}
                          className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 space-y-1">
                <label className="font-bold text-slate-900 text-[11px] flex items-center gap-1">
                  <Tag size={12} /> Endirim Tətbiq Et:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <select 
                    value={discountTypeInput}
                    onChange={e => setDiscountTypeInput(e.target.value)}
                    className="p-1 border border-slate-200 rounded-lg font-bold bg-white text-[10px] cursor-pointer"
                  >
                    <option value="amount">Məbləğ ilə (AZN)</option>
                    <option value="percent">Faiz ilə (%)</option>
                  </select>

                  <input 
                    type="number" 
                    min="0"
                    placeholder="0"
                    value={discountValInput}
                    onChange={e => setDiscountValInput(e.target.value)}
                    className="p-1 border border-slate-200 rounded-lg font-bold bg-white text-[10px]"
                  />
                </div>
              </div>

              <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 space-y-0.5 text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>Cəm Məbləğ:</span>
                  <span className="font-bold text-slate-900">{subtotal} AZN</span>
                </div>
                <div className="flex justify-between text-rose-600">
                  <span>Hesablanan Endirim:</span>
                  <span className="font-bold">-{calcDiscountAmount} AZN</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200 text-slate-900 font-black text-xs">
                  <span>Yekun Ödəniləcək:</span>
                  <span className="text-emerald-700">{finalCalculatedAmount} AZN</span>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-100 flex justify-end gap-1.5">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 text-xs cursor-pointer"
                >
                  Ləğv
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 bg-[#151515] hover:bg-black text-[#F8FF70] font-black rounded-xl text-xs cursor-pointer"
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