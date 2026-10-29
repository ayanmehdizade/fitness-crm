import React, { useState } from 'react';
import { 
  Car, ShieldCheck, Clock, CreditCard, ArrowRightLeft, 
  AlertCircle, CheckCircle2, Lock, Unlock, Search, Plus, Filter, FileText, Zap, UserCheck, DollarSign, History, Info, X, Banknote, User
} from 'lucide-react';

const initialActionPlanLogs = [
  { id: 'TRX-905', plate: '77-DD-123', ownerName: 'Kamran Alıyev', category: 'Annual', slot: 'B-01', date: '28.10.2026', entry: '09:00', exit: '-', paymentTime: '-', fee: '6.00 AZN', paymentMethod: 'Gözlənilir', status: 'Borclu (Gözlənilir)' },
  { id: 'TRX-850', plate: '77-DD-123', ownerName: 'Kamran Alıyev', category: 'Annual', slot: 'B-03', date: '15.10.2026', entry: '14:00', exit: '19:00', paymentTime: '19:00', fee: '2.00 AZN', paymentMethod: 'Kart (POS)', status: 'Ödənildi & Çıxdı' },
  { id: 'TRX-720', plate: '77-DD-123', ownerName: 'Kamran Alıyev', category: 'Annual', slot: 'A-02', date: '01.09.2026', entry: '10:00', exit: '12:00', paymentTime: '12:00', fee: '0.00 AZN', paymentMethod: 'Pulsuz', status: 'Çıxdı (Pulsuz)' },
  
  { id: 'TRX-904', plate: '10-AA-001', ownerName: 'Özcan Uçar', category: 'Resident', slot: 'A-01', date: '28.10.2026', entry: '09:00', exit: '-', paymentTime: '-', fee: '0.00 AZN', paymentMethod: 'Pulsuz', status: 'Ağ Siyahı (Aktiv)' },
  { id: 'TRX-903', plate: '99-FR-777', ownerName: 'Ayan Xəlilova', category: 'Employee', slot: 'A-02', date: '28.10.2026', entry: '10:15', exit: '-', paymentTime: '-', fee: '0.00 AZN', paymentMethod: 'Pulsuz', status: 'İşçi Pass (Aktiv)' },
  { id: 'TRX-902', plate: '90-VX-404', ownerName: 'Elmir Qasımov', category: 'Guest', slot: 'C-01', date: '28.10.2026', entry: '11:00', exit: '13:00', paymentTime: '13:00', fee: '4.00 AZN', paymentMethod: 'Nağd (Cash)', status: 'Ödənildi & Çıxdı' },
  { id: 'TRX-901', plate: '50-XX-555', ownerName: 'Rauf Məmmədov', category: 'Annual', slot: 'B-02', date: '28.10.2026', entry: '08:00', exit: '10:00', paymentTime: '10:00', fee: '0.00 AZN', paymentMethod: 'Pulsuz', status: 'Çıxdı (Pulsuz)' }
];

const initialSlots = [
  { id: 'A-01', zone: 'A Zonası', status: 'Occupied', plate: '10-AA-001', ownerName: 'Özcan Uçar', entryTime: '09:00', entryTimestamp: Date.now() - 7200000, category: 'Resident' },
  { id: 'A-02', zone: 'A Zonası', status: 'Occupied', plate: '99-FR-777', ownerName: 'Ayan Xəlilova', entryTime: '10:15', entryTimestamp: Date.now() - 3600000, category: 'Employee' },
  { id: 'B-01', zone: 'B Zonası', status: 'Occupied', plate: '77-DD-123', ownerName: 'Kamran Alıyev', entryTime: '09:00', entryTimestamp: Date.now() - 25200000, category: 'Annual' },
];

export default function Parking() {
  const [slots, setSlots] = useState(initialSlots);
  const [actionLogs, setActionLogs] = useState(initialActionPlanLogs);
  const [barrierOpen, setBarrierOpen] = useState(false);
  const [inputPlate, setInputPlate] = useState('');
  const [inputOwner, setInputOwner] = useState('');
  const [inputCategory, setInputCategory] = useState('Annual');
  const [selectedCarPlate, setSelectedCarPlate] = useState(null);

  // FİLTRLƏR ÜÇÜN STATE-LƏR
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const todayCashSales = actionLogs
    .filter(l => l.paymentMethod.includes('Nağd') && l.fee !== '0.00 AZN')
    .reduce((acc, l) => acc + parseFloat(l.fee), 0);

  const todayCardSales = actionLogs
    .filter(l => l.paymentMethod.includes('Kart') && l.fee !== '0.00 AZN')
    .reduce((acc, l) => acc + parseFloat(l.fee), 0);

  const totalTodaySales = todayCashSales + todayCardSales;

  const calculateParkingFee = (category, entryTimestamp) => {
    if (category === 'Resident' || category === 'Employee') return { hours: 2, amount: 0, text: 'Pulsuz' };
    const diffMs = Date.now() - entryTimestamp;
    const hours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));

    if (category === 'Annual') {
      if (hours <= 4) return { hours, amount: 0, text: `İlk 4 saat pulsuz` };
      const payableHours = hours - 4;
      return { hours, amount: payableHours * 2, text: `4s Pulsuz + ${payableHours}s x 2 AZN` };
    }
    return { hours, amount: hours * 2, text: `${hours} saat x 2 AZN` };
  };

  const handleCarEntry = (e) => {
    e.preventDefault();
    if (!inputPlate) return;
    const cleanPlate = inputPlate.toUpperCase().trim();
    const ownerName = inputOwner.trim() || 'Qonaq / Müştəri';
    
    const now = Date.now();
    const newSlot = {
      id: `B-0${slots.length + 1}`,
      zone: 'B Zonası',
      status: 'Occupied',
      plate: cleanPlate,
      ownerName: ownerName,
      entryTime: new Date().toLocaleTimeString().slice(0, 5),
      entryTimestamp: now,
      category: inputCategory
    };

    setSlots([...slots, newSlot]);

    const currentDate = new Date().toLocaleDateString();
    const newLog = {
      id: `TRX-${Math.floor(100 + Math.random() * 900)}`,
      plate: cleanPlate,
      ownerName: ownerName,
      category: inputCategory,
      slot: newSlot.id,
      date: currentDate,
      entry: new Date().toLocaleTimeString().slice(0, 5),
      exit: '-',
      paymentTime: '-',
      fee: inputCategory === 'Annual' ? '0.00 AZN' : '2.00 AZN',
      paymentMethod: 'Gözlənilir',
      status: 'Borclu (Gözlənilir)'
    };

    setActionLogs([newLog, ...actionLogs]);
    setInputPlate('');
    setInputOwner('');
    setBarrierOpen(true);
    setTimeout(() => setBarrierOpen(false), 3000);
  };

  const debtSlots = slots.filter(s => {
    const fee = calculateParkingFee(s.category, s.entryTimestamp);
    return fee.amount > 0;
  });

  // FİLTRLƏMƏ MƏNTİQİ
  const filteredLogs = actionLogs.filter(log => {
    const matchesSearch = log.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === 'ALL' || log.category === filterCategory;
    const matchesStatus = filterStatus === 'ALL' || log.status.includes(filterStatus);
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6 relative">
      
      {/* 0. GÜNÜN SATIŞ STATİSTİKASI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-emerald-50/40 border-emerald-200">
          <span className="text-xs font-bold text-emerald-800 block flex items-center gap-1">
            <Banknote size={15} /> Nağd Satış (Cash)
          </span>
          <h3 className="text-2xl font-black text-emerald-700 mt-1">{todayCashSales.toFixed(2)} AZN</h3>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-blue-50/40 border-blue-200">
          <span className="text-xs font-bold text-blue-800 block flex items-center gap-1">
            <CreditCard size={15} /> Kart Satışı (Card / POS)
          </span>
          <h3 className="text-2xl font-black text-blue-700 mt-1">{todayCardSales.toFixed(2)} AZN</h3>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-purple-50/40 border-purple-200">
          <span className="text-xs font-bold text-purple-800 block flex items-center gap-1">
            <DollarSign size={15} /> Günün Ümumi Satış Cəmi
          </span>
          <h3 className="text-2xl font-black text-purple-900 mt-1">{totalTodaySales.toFixed(2)} AZN</h3>
        </div>
      </div>

      {/* 1. BORCLU VƏ ÖDƏNİŞ GÖZLƏNİLƏN QONAQLAR */}
      <div className="bg-white border border-amber-200 p-5 rounded-xl shadow-sm space-y-4 bg-amber-50/20">
        <div className="flex justify-between items-center border-b border-amber-100 pb-3">
          <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2">
            <AlertCircle className="text-amber-600" size={18} /> Borclu Və Ödəniş Gözlənilən Qonaqlar ({debtSlots.length})
          </h3>
          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
            barrierOpen ? 'bg-emerald-100 text-emerald-700 animate-pulse' : 'bg-slate-100 text-slate-700'
          }`}>
            {barrierOpen ? 'Şlaqbaum Açıqdır' : 'Şlaqbaum Bağlıdır'}
          </span>
        </div>

        {debtSlots.length === 0 ? (
          <p className="text-xs text-slate-500 py-3 text-center">Hazırda ödəniş gözlənilən və ya borclu avtomobil yoxdur. 👍</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {debtSlots.map(slot => {
              const fee = calculateParkingFee(slot.category, slot.entryTimestamp);
              return (
                <div key={slot.id} className="bg-white border border-amber-300 p-4 rounded-xl shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-xs font-mono bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {slot.plate}
                    </span>
                    <button 
                      onClick={() => setSelectedCarPlate(slot.plate)}
                      className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition"
                    >
                      <Info size={12} /> Bütün Tarixçə
                    </button>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900 flex items-center gap-1">
                      <User size={13} className="text-slate-500" /> {slot.ownerName}
                    </p>
                    <p><b>Slot:</b> {slot.id} ({slot.zone})</p>
                    <p><b>Giriş vaxtı:</b> {slot.entryTime}</p>
                    <p className="text-rose-700 font-bold"><b>Borc Məbləği:</b> {fee.amount}.00 AZN</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. SİMULASİYA GİRİŞİ */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Car size={18} className="text-blue-600" />
          <h4 className="font-bold text-slate-800 text-xs">Tezli Giriş (Simulyasiya):</h4>
        </div>
        <form onSubmit={handleCarEntry} className="flex flex-wrap items-center gap-2 text-xs">
          <input 
            type="text" 
            placeholder="Ad Soyad" 
            value={inputOwner} 
            onChange={e => setInputOwner(e.target.value)} 
            className="p-2 border rounded font-semibold w-36"
          />
          <input 
            type="text" 
            placeholder="Nömrə (77-ZZ-777)" 
            value={inputPlate} 
            onChange={e => setInputPlate(e.target.value)} 
            className="p-2 border rounded font-black uppercase text-center w-32"
          />
          <select value={inputCategory} onChange={e => setInputCategory(e.target.value)} className="p-2 border rounded font-bold bg-slate-50">
            <option value="Annual">İllik Paket</option>
            <option value="Guest">Standart Qonaq</option>
            <option value="Resident">Sakin</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition">
            Giriş Ver
          </button>
        </form>
      </div>

      {/* 3. BÜTÜN MAŞINLARIN ACTION PLAN JURNALI + FİLTRLƏR */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
          <div className="flex items-center gap-2">
            <History className="text-purple-600" size={18} />
            <h3 className="font-bold text-slate-900 text-sm">Sistemdəki Bütün Maşınların Action Planı & Hərəkət Tarixçəsi</h3>
          </div>

          {/* FİLTRLƏR BÖLMƏSİ */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Nömrə və ya ad ilə axtar..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 border rounded-lg font-medium w-48 bg-slate-50"
              />
            </div>

            <select 
              value={filterCategory} 
              onChange={e => setFilterCategory(e.target.value)}
              className="p-1.5 border rounded-lg font-bold bg-slate-50 text-slate-700"
            >
              <option value="ALL">Bütün Kateqoriyalar</option>
              <option value="Annual">Annual (İllik)</option>
              <option value="Resident">Resident (Sakin)</option>
              <option value="Employee">Employee (İşçi)</option>
              <option value="Guest">Guest (Qonaq)</option>
            </select>

            <select 
              value={filterStatus} 
              onChange={e => setFilterStatus(e.target.value)}
              className="p-1.5 border rounded-lg font-bold bg-slate-50 text-slate-700"
            >
              <option value="ALL">Bütün Statuslar</option>
              <option value="Borclu">Borclu (Gözlənilir)</option>
              <option value="Ödənildi">Ödənildi & Çıxdı</option>
              <option value="Çıxdı">Çıxdı (Pulsuz)</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b">
            <tr>
              <th className="p-3">Info</th>
              <th className="p-3">Müştəri / Sürücü</th>
              <th className="p-3">Avtomobil Nömrəsi</th>
              <th className="p-3">Kateqoriya</th>
              <th className="p-3">Tarix</th>
              <th className="p-3">Giriş</th>
              <th className="p-3">Çıxış</th>
              <th className="p-3">Məbləğ</th>
              <th className="p-3">Ödəniş Üsulu</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-6 text-slate-400 font-semibold">
                  Axtarış kriteriyasına uyğun hərəkət tarixçəsi tapılmadı.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <button 
                      onClick={() => setSelectedCarPlate(log.plate)}
                      className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition font-bold flex items-center gap-1"
                      title="Bütün Keçmiş Tarixçəni Gör"
                    >
                      <Info size={14} /> Info
                    </button>
                  </td>
                  <td className="p-3 font-bold text-slate-800">{log.ownerName}</td>
                  <td className="p-3 font-black font-mono tracking-wider text-slate-900">{log.plate}</td>
                  <td className="p-3 font-semibold text-slate-600">{log.category}</td>
                  <td className="p-3 font-bold text-slate-600">{log.date}</td>
                  <td className="p-3 font-bold text-blue-700">{log.entry}</td>
                  <td className="p-3 text-slate-600">{log.exit}</td>
                  <td className="p-3 font-black text-emerald-600">{log.fee}</td>
                  <td className="p-3 font-bold text-slate-700">{log.paymentMethod}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      log.status.includes('Ödənildi') || log.status.includes('Ağ Siyahı') ? 'bg-emerald-100 text-emerald-800' :
                      log.status.includes('Borclu') ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 4. ACCESS-MOVEMENT HISTORY MODAL */}
      {selectedCarPlate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <Car className="text-blue-600" size={20} /> Avtomobilin Bütün Keçmiş Tarixçəsi
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    Nömrə: {selectedCarPlate}
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    Sürücü: {actionLogs.find(l => l.plate === selectedCarPlate)?.ownerName || 'Naməlum'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCarPlate(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Access-Movement Logs & Ödəniş Üsulları:</h4>
              
              {actionLogs.filter(log => log.plate === selectedCarPlate).length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">Bu nömrə üçün heç bir hərəkət tarixçəsi tapılmadı.</p>
              ) : (
                actionLogs.filter(log => log.plate === selectedCarPlate).map(item => (
                  <div key={item.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-900">Trx ID: {item.id} | Tarix: <span className="text-blue-700">{item.date}</span></span>
                      <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">{item.category}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-700">
                      <p><b>Tutduğu Slot:</b> <span className="font-mono bg-white px-1.5 py-0.5 rounded border">{item.slot || 'B-01'}</span></p>
                      <p><b>Giriş Vaxtı:</b> {item.entry}</p>
                      <p><b>Çıxış Vaxtı:</b> {item.exit}</p>
                      <p><b>Ödəniş Vaxtı:</b> {item.paymentTime}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                      <span className="font-bold text-slate-600">Ödənilən / Borc: <strong className="text-emerald-600">{item.fee}</strong> ({item.paymentMethod})</span>
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        item.status.includes('Ödənildi') || item.status.includes('Ağ Siyahı') || item.status.includes('Çıxdı') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t flex justify-end">
              <button 
                onClick={() => setSelectedCarPlate(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs transition"
              >
                Bağla
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}