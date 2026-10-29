import React, { useState } from 'react';
import { 
  Scissors, Search, Plus, User, Check, X, Receipt, Tag, Trash2, ShieldAlert
} from 'lucide-react';

const barbersList = ['Cavid Quliyev', 'Vüsal Quliyev', 'Tural Hüseynov', 'Elçin Məmmədov'];
const servicesList = [
  { name: 'Klassik Saç Kəsimi', price: 20 },
  { name: 'Saqqal Formaya Salınması', price: 15 },
  { name: 'Saç + Saqqal Kombo', price: 30 },
  { name: 'Üz Massajı & Buxar', price: 25 },
  { name: 'Saç Yuyulması & Fen', price: 10 },
  { name: 'VIP Kompleks Qulluq', price: 50 }
];

const initialBarberReceipts = [
  {
    id: 'BRB-501',
    clientName: 'Özcan Uçar',
    date: '28.10.2026',
    time: '15:00',
    paymentMethod: 'POS Kart',
    status: 'Ödənilib',
    items: [
      { service: 'Klassik Saç Kəsimi', barber: 'Cavid Quliyev', price: 20 },
      { service: 'Saqqal Formaya Salınması', barber: 'Cavid Quliyev', price: 15 }
    ],
    subtotal: 35,
    discountType: 'amount',
    discountValue: 5,
    discountAmount: 5,
    finalAmount: 30
  },
  {
    id: 'BRB-502',
    clientName: 'Kamran Alıyev',
    date: '28.10.2026',
    time: '16:30',
    paymentMethod: 'Nağd',
    status: 'Ödənilib',
    items: [
      { service: 'VIP Kompleks Qulluq', barber: 'Vüsal Quliyev', price: 50 }
    ],
    subtotal: 50,
    discountType: 'percent',
    discountValue: 10,
    discountAmount: 5,
    finalAmount: 45
  }
];

export default function Barber() {
  const [receipts, setReceipts] = useState(initialBarberReceipts);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // ÖZƏL ONAY / SILME MODALI (MISSCLICK ÖNLƏYİCİ)
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    receipt: null
  });

  const [clientInput, setClientInput] = useState('');
  const [payMethodInput, setPayMethodInput] = useState('POS Kart');
  const [discountTypeInput, setDiscountTypeInput] = useState('amount');
  const [discountValInput, setDiscountValInput] = useState(0);

  const [selectedServices, setSelectedServices] = useState([
    { service: servicesList[0].name, barber: barbersList[0], price: servicesList[0].price }
  ]);

  const handleAddServiceToForm = () => {
    setSelectedServices([
      ...selectedServices,
      { service: servicesList[0].name, barber: barbersList[0], price: servicesList[0].price }
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

  const handleBarberChange = (index, barberName) => {
    const updated = [...selectedServices];
    updated[index].barber = barberName;
    setSelectedServices(updated);
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
      id: `BRB-50${receipts.length + 1}`,
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
    setClientInput('');
    setDiscountValInput(0);
    setDiscountTypeInput('amount');
    setSelectedServices([{ service: servicesList[0].name, barber: barbersList[0], price: servicesList[0].price }]);
    setShowAddModal(false);
  };

  const handleDeleteReceipt = () => {
    if (!confirmModal.receipt) return;
    setReceipts(receipts.filter(r => r.id !== confirmModal.receipt.id));
    setConfirmModal({ isOpen: false, receipt: null });
  };

  const filteredReceipts = receipts.filter(r => 
    r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.items.some(i => i.service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="m-0 p-0 box-border flex flex-col h-screen w-full overflow-hidden bg-slate-50 gap-3">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 p-3 shadow-2xs flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-2">
            <Scissors className="text-indigo-600" size={18} /> Bərbərxana (Barber) — Çek Və Endirim İdarəetməsi
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Bərbər xidmətləri, usta təyinatı, endirimlər (AZN / %) və qəbzlər</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
        >
          <Plus size={15} /> Yeni Bərbər Çeki Yarat
        </button>
      </div>

      {/* AXTARIŞ */}
      <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-2xs flex items-center justify-between gap-3 shrink-0 mx-3">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Müştəri adı, çek no və ya xidmət..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 border border-slate-200 rounded-lg text-xs font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
        <span className="text-xs text-slate-500 font-bold">Cəm Çek: <strong className="text-slate-900">{filteredReceipts.length}</strong></span>
      </div>

      {/* CƏDVƏL */}
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden mx-3 mb-3">
        <div className="overflow-auto h-full">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-slate-50 text-slate-700 border-b border-slate-200 shadow-2xs">
              <tr className="uppercase font-bold text-[11px]">
                <th className="p-3 border-r">Çek ID</th>
                <th className="p-3 border-r">Müştəri</th>
                <th className="p-3 border-r">Tarix / Saat</th>
                <th className="p-3 border-r text-center">Xidmət Sayı</th>
                <th className="p-3 border-r">Cəm Məbləğ</th>
                <th className="p-3 border-r text-rose-600">Endirim</th>
                <th className="p-3 border-r text-emerald-700">Yekun Ödəniş</th>
                <th className="p-3 text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredReceipts.map(receipt => (
                <tr key={receipt.id} className="hover:bg-indigo-50/40 transition">
                  <td className="p-3 border-r font-mono font-bold text-indigo-700">{receipt.id}</td>
                  <td className="p-3 border-r font-bold text-slate-900">{receipt.clientName}</td>
                  <td className="p-3 border-r text-slate-600">{receipt.date} <span className="font-mono text-slate-400 text-[11px] ml-1">{receipt.time}</span></td>
                  <td className="p-3 border-r text-center">
                    <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {receipt.items.length} Xidmət
                    </span>
                  </td>
                  <td className="p-3 border-r font-bold text-slate-600">{receipt.subtotal} AZN</td>
                  <td className="p-3 border-r font-bold text-rose-600">
                    {receipt.discountAmount > 0 ? `-${receipt.discountAmount} AZN` : '-'}
                  </td>
                  <td className="p-3 border-r font-black text-emerald-700 text-sm bg-emerald-50/30">{receipt.finalAmount} AZN</td>
                  <td className="p-3 text-right space-x-2">
                    <button 
                      onClick={() => setSelectedReceipt(receipt)}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded-lg font-bold text-[11px] transition shadow-2xs"
                    >
                      Ətraflı 🧾
                    </button>
                    <button 
                      onClick={() => setConfirmModal({ isOpen: true, receipt: receipt })}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-lg font-bold text-[11px] transition"
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

      {/* FULL VIEWPORT ONAY / SİLME MODALI */}
      {confirmModal.isOpen && confirmModal.receipt && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-200 text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="font-black text-slate-900 text-base">Bərbər Çekini Silmək İstəyirsiniz?</h3>
              <p className="text-xs text-slate-600 px-2 font-medium">
                <strong className="text-slate-900">"{confirmModal.receipt.clientName}"</strong> üçün olan <span className="font-mono font-bold text-indigo-600">{confirmModal.receipt.id}</span> nömrəli çeki ləğv edirsiniz.
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-left space-y-1.5 font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Cəm Məbləğ:</span>
                <span className="text-slate-900 font-bold">{confirmModal.receipt.subtotal} AZN</span>
              </div>
              <div className="flex justify-between">
                <span>Yekun Ödənilən:</span>
                <span className="text-emerald-700 font-bold">{confirmModal.receipt.finalAmount} AZN</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                onClick={handleDeleteReceipt}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1 shadow-xs"
              >
                <Trash2 size={14} /> Təsdiq Et Və Sil
              </button>
              <button 
                onClick={() => setConfirmModal({ isOpen: false, receipt: null })}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Ləğv Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ƏTRAFLI ÇEK MODALI */}
      {selectedReceipt && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase">{selectedReceipt.id}</span>
                <h3 className="font-black text-slate-900 text-base">{selectedReceipt.clientName} — Çek Detalları</h3>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
                <X size={18} />
              </button>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between text-xs font-semibold text-slate-600">
              <p><b>Tarix:</b> {selectedReceipt.date} ({selectedReceipt.time})</p>
              <p><b>Ödəniş:</b> <span className="text-slate-900 font-bold">{selectedReceipt.paymentMethod}</span></p>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 text-xs block">Görülən Xidmətlər Və Bərbərlər:</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedReceipt.items.map((item, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
                    <div>
                      <p className="font-bold text-slate-900">{item.service}</p>
                      <p className="text-[11px] text-indigo-700 font-semibold">Bərbər: {item.barber}</p>
                    </div>
                    <span className="font-black text-slate-900 text-xs">{item.price} AZN</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Cəm Məbləğ:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.subtotal} AZN</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Tətbiq Olunan Endirim:</span>
                <span className="font-bold">-{selectedReceipt.discountAmount} AZN</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                <span>Yekun Ödəniləcək:</span>
                <span className="text-indigo-600">{selectedReceipt.finalAmount} AZN</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => setSelectedReceipt(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YENİ ÇEK YARATMA MODALI */}
      {showAddModal && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-0 m-0 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Receipt className="text-indigo-600" size={18} /> Yeni Bərbər Çeki Yarat
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateReceipt} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Müştərinin Adı Soyadı:</label>
                  <input 
                    type="text" 
                    placeholder="Məs: Özcan Uçar" 
                    value={clientInput}
                    onChange={e => setClientInput(e.target.value)}
                    className="w-full p-2 border rounded-lg font-medium bg-slate-50"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ödəniş Üsulu:</label>
                  <select 
                    value={payMethodInput}
                    onChange={e => setPayMethodInput(e.target.value)}
                    className="w-full p-2 border rounded-lg font-bold bg-slate-50"
                  >
                    <option value="POS Kart">POS Kart</option>
                    <option value="Nağd">Nağd</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 border-t pt-3">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-slate-900 text-xs">Xidmət Və Bərbər Seçimi:</label>
                  <button 
                    type="button" 
                    onClick={handleAddServiceToForm}
                    className="text-indigo-600 hover:text-indigo-700 font-bold text-[11px] flex items-center gap-1"
                  >
                    + Başqa Xidmət Əlavə Et
                  </button>
                </div>

                {selectedServices.map((row, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <select 
                        value={row.service}
                        onChange={e => handleServiceChange(idx, e.target.value)}
                        className="w-full p-1.5 border rounded-lg font-bold bg-white text-[11px]"
                      >
                        {servicesList.map(s => (
                          <option key={s.name} value={s.name}>{s.name} ({s.price} AZN)</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-5">
                      <select 
                        value={row.barber}
                        onChange={e => handleBarberChange(idx, e.target.value)}
                        className="w-full p-1.5 border rounded-lg font-semibold bg-white text-[11px]"
                      >
                        {barbersList.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2 flex items-center justify-between">
                      <span className="font-black text-slate-900 text-xs">{row.price}₼</span>
                      {selectedServices.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveServiceFromForm(idx)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-2">
                <label className="font-bold text-slate-900 text-xs flex items-center gap-1">
                  <Tag size={13} className="text-indigo-600" /> Endirim Tətbiq Et:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select 
                    value={discountTypeInput}
                    onChange={e => setDiscountTypeInput(e.target.value)}
                    className="p-1.5 border rounded-lg font-bold bg-white text-xs"
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
                    className="p-1.5 border rounded-lg font-bold bg-white text-xs"
                  />
                </div>
              </div>

              <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Cəm Məbləğ:</span>
                  <span className="font-bold text-slate-900">{subtotal} AZN</span>
                </div>
                <div className="flex justify-between text-rose-600">
                  <span>Hesablanan Endirim:</span>
                  <span className="font-bold">-{calcDiscountAmount} AZN</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-indigo-200 text-indigo-900 font-black text-sm">
                  <span>Yekun Ödəniləcək:</span>
                  <span className="text-indigo-700 text-base">{finalCalculatedAmount} AZN</span>
                </div>
              </div>

              <div className="pt-2 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Ləğv
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs"
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