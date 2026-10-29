import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Unlock, Search, History, DoorOpen, User, CheckCircle2, AlertCircle 
} from 'lucide-react';

const initialTurnstileLogs = [
  { id: 'TRN-501', name: 'Kamran Alıyev', role: 'Annual Member', gate: 'Əsas Resepşn Turniketi', time: '10:05', date: '28.10.2026', status: 'Uğurlu Keçid' },
  { id: 'TRN-502', name: 'Özcan Uçar', role: 'Executive / Resident', gate: 'VIP Zona Qapısı', time: '09:00', date: '28.10.2026', status: 'Uğurlu Keçid' },
  { id: 'TRN-503', name: 'Ayan Xəlilova', role: 'Team Leader', gate: 'İşçi Giriş Qapısı', time: '10:15', date: '28.10.2026', status: 'Uğurlu Keçid' },
  { id: 'TRN-504', name: 'Elmir Qasımov', role: 'Guest', gate: 'Əsas Resepşn Turniketi', time: '11:00', date: '28.10.2026', status: 'Uğurlu Keçid' },
  { id: 'TRN-505', name: 'Kamran Alıyev', role: 'Annual Member', gate: 'FitBar Keçid Qapısı', time: '11:45', date: '28.10.2026', status: 'Uğurlu Keçid' },
  { id: 'TRN-506', name: 'Leyla Məmmədova', role: 'Monthly Member', gate: 'Əsas Resepşn Turniketi', time: '12:30', date: '28.10.2026', status: 'Uğurlu Keçid' }
];

const initialGates = [
  { id: 'G-01', name: 'Əsas Resepşn Turniketi', zone: 'Foyedən Giriş', status: 'Locked' },
  { id: 'G-02', name: 'VIP Zona Qapısı', zone: 'A Zonası', status: 'Locked' },
  { id: 'G-03', name: 'İşçi Giriş Qapısı', zone: 'Arxa Ofis', status: 'Locked' },
  { id: 'G-04', name: 'FitBar Keçid Qapısı', zone: '4-cü Mərtəbə', status: 'Locked' },
  { id: 'G-05', name: 'Terras Çıxış Qapısı', zone: 'İstirahət Zonası', status: 'Locked' }
];

export default function Turnstile() {
  const [logs, setLogs] = useState(initialTurnstileLogs);
  const [gates, setGates] = useState(initialGates);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGateFilter, setSelectedGateFilter] = useState('ALL');

  const handleOpenGateManually = (gateId) => {
    const targetGate = gates.find(g => g.id === gateId);
    if (!targetGate) return;

    setGates(gates.map(g => g.id === gateId ? { ...g, status: 'Unlocked' } : g));

    const newLog = {
      id: `TRN-${Math.floor(1000 + Math.random() * 9000)}`,
      name: 'Operator (Manual Əmr)',
      role: 'Staff / Admin',
      gate: targetGate.name,
      time: new Date().toLocaleTimeString().slice(0, 5),
      date: new Date().toLocaleDateString(),
      status: 'Manual Açıldı 🔓'
    };
    setLogs([newLog, ...logs]);

    setTimeout(() => {
      setGates(prevGates => prevGates.map(g => g.id === gateId ? { ...g, status: 'Locked' } : g));
    }, 3000);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGate = selectedGateFilter === 'ALL' || log.gate === selectedGateFilter;
    return matchesSearch && matchesGate;
  });

  return (
    <div className="space-y-6">
      
      {/* QAPILARIN MANUAL İDARƏ EDİLMƏSİ */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <DoorOpen className="text-blue-600" size={18} /> Turniket Və Qapıların Manual İdarə Paneli
          </h3>
          <span className="text-xs text-slate-500 font-medium">* Düyməyə kliklədikdə qapı 3 saniyəliyinə açıq qalır.</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {gates.map(gate => {
            const isOpen = gate.status === 'Unlocked';
            return (
              <div key={gate.id} className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                isOpen ? 'bg-emerald-50/80 border-emerald-300 shadow-sm' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{gate.name}</h4>
                    <span className="text-[10px] text-slate-500">{gate.zone}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    isOpen ? 'bg-emerald-600 text-white animate-pulse' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isOpen ? 'AÇIQDIR 🔓' : 'BAĞLI 🔒'}
                  </span>
                </div>

                <button 
                  onClick={() => handleOpenGateManually(gate.id)}
                  className={`w-full mt-3 font-bold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1 shadow-sm ${
                    isOpen 
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isOpen ? <Unlock size={14} /> : <Lock size={14} />} 
                  {isOpen ? 'Açıqdır (3san)' : 'Qapını Manual Aç'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* KEÇİD TARİXÇƏSİ VƏ AXTARIŞ */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
          <div className="flex items-center gap-2">
            <History className="text-purple-600" size={18} />
            <h3 className="font-bold text-slate-900 text-sm">Keçid Tarixçəsi (Access Movement Logs)</h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Şəxs adı ilə axtar..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 border rounded-lg font-medium w-56 bg-slate-50"
              />
            </div>

            <select 
              value={selectedGateFilter} 
              onChange={e => setSelectedGateFilter(e.target.value)}
              className="p-1.5 border rounded-lg font-bold bg-slate-50 text-slate-700"
            >
              <option value="ALL">Bütün Qapılar / Turniketlər</option>
              {gates.map(g => (
                <option key={g.id} value={g.name}>{g.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b">
              <tr>
                <th className="p-3">Trx ID</th>
                <th className="p-3">Şəxs / Sürücü</th>
                <th className="p-3">Rol / Kateqoriya</th>
                <th className="p-3">Keçdiyi Qapı / Turniket</th>
                <th className="p-3">Tarix</th>
                <th className="p-3">Saat</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-slate-400 font-semibold">
                    Axtarışa uyğun keçid tarixçəsi tapılmadı.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-bold text-slate-900">{log.id}</td>
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                      <User size={13} className="text-slate-400" /> {log.name}
                    </td>
                    <td className="p-3 text-slate-600 font-semibold">{log.role}</td>
                    <td className="p-3 font-bold text-blue-700 bg-blue-50/50 rounded">{log.gate}</td>
                    <td className="p-3 text-slate-600">{log.date}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">{log.time}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        log.status.includes('Uğurlu') || log.status.includes('Açıldı') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
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

      </div>

    </div>
  );
}