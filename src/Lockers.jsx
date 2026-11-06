import React, { useState } from 'react';
import { 
  Key, Lock, Unlock, User, Search, Filter, Calendar, CheckCircle2, AlertCircle 
} from 'lucide-react';

const initialLockers = [
  { id: 'L-101', number: '101', zone: 'Kişi Soyunma Otağı', status: 'Occupied', client: 'Kamran Alıyev', phone: '+994 50 123 45 67', startDate: '01.09.2026', endDate: '01.09.2027', durationType: '1 İllik' },
  { id: 'L-102', number: '102', zone: 'Kişi Soyunma Otağı', status: 'Available', client: '-', phone: '-', startDate: '-', endDate: '-', durationType: '-' },
  { id: 'L-103', number: '103', zone: 'Kişi Soyunma Otağı', status: 'Occupied', client: 'Özcan Uçar', phone: '+994 55 987 65 43', startDate: '15.06.2026', endDate: '15.06.2027', durationType: '1 İllik' },
  { id: 'L-201', number: '201', zone: 'Qadın Soyunma Otağı', status: 'Occupied', client: 'Ayan Xəlilova', phone: '+994 70 555 44 33', startDate: '10.08.2026', endDate: '10.11.2026', durationType: '3 Aylıq' },
  { id: 'L-202', number: '202', zone: 'Qadın Soyunma Otağı', status: 'Available', client: '-', phone: '-', startDate: '-', endDate: '-', durationType: '-' },
  { id: 'L-203', number: '203', zone: 'Qadın Soyunma Otağı', status: 'Available', client: '-', phone: '-', startDate: '-', endDate: '-', durationType: '-' },
];

export default function Lockers() {
  const [lockers, setLockers] = useState(initialLockers);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [durationFilter, setDurationFilter] = useState('ALL'); // 🆕 MÜDDƏT FİLTRİ

  // ŞKAFIN İCARƏYƏ VERİLMƏSİ VƏ YA TƏMİZLƏNMƏSİ
  const handleToggleLocker = (lockerId) => {
    const locker = lockers.find(l => l.id === lockerId);
    if (!locker) return;

    if (locker.status === 'Occupied') {
      const confirmRelease = window.confirm(`Şkaf #${locker.number} boşaldılsın? (Müştəri: ${locker.client})`);
      if (confirmRelease) {
        setLockers(lockers.map(l => l.id === lockerId ? {
          ...l, status: 'Available', client: '-', phone: '-', startDate: '-', endDate: '-', durationType: '-'
        } : l));
      }
    } else {
      const clientName = prompt('Şkafı icarəyə götürən müştərinin Adı Soyadı:');
      if (!clientName) return;
      const clientPhone = prompt('Müştərinin əlaqə nömrəsi:', '+994 ');
      
      const durationChoice = prompt('İcarə müddətini seçin:\n1 - 1 Aylıq\n2 - 3 Aylıq\n3 - 6 Aylıq\n4 - 1 İllik', '4');
      
      let durationLabel = '1 İllik';
      let daysToAdd = 365;
      if (durationChoice === '1') { durationLabel = '1 Aylıq'; daysToAdd = 30; }
      else if (durationChoice === '2') { durationLabel = '3 Aylıq'; daysToAdd = 90; }
      else if (durationChoice === '3') { durationLabel = '6 Aylıq'; daysToAdd = 180; }

      const today = new Date();
      const endDateObj = new Date(today.getTime() + daysToAdd * 86400000);

      const startDateFormatted = today.toLocaleDateString();
      const endDateFormatted = endDateObj.toLocaleDateString();

      setLockers(lockers.map(l => l.id === lockerId ? {
        ...l, 
        status: 'Occupied', 
        client: clientName, 
        phone: clientPhone || '-', 
        startDate: startDateFormatted, 
        endDate: endDateFormatted,
        durationType: durationLabel
      } : l));
    }
  };

  const filteredLockers = lockers.filter(l => {
    const matchesSearch = l.number.includes(searchQuery) || l.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = zoneFilter === 'ALL' || l.zone === zoneFilter;
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const matchesDuration = durationFilter === 'ALL' || l.durationType === durationFilter; // 🆕 MÜDDƏT FİLTR YOXLANMASI
    return matchesSearch && matchesZone && matchesStatus && matchesDuration;
  });

  const occupiedCount = lockers.filter(l => l.status === 'Occupied').length;
  const availableCount = lockers.filter(l => l.status === 'Available').length;

  return (
    <div className="space-y-6">
      
      {/* STATUS KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Ümumi Şkaflar</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{lockers.length} Ədəd</h3>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-rose-50/40 border-rose-200">
          <span className="text-xs font-bold text-rose-800 block">Dolu Şkaflar (Rent Olunan)</span>
          <h3 className="text-2xl font-black text-rose-700 mt-1">{occupiedCount} Ədəd</h3>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-emerald-50/40 border-emerald-200">
          <span className="text-xs font-bold text-emerald-800 block">Boş Şkaflar (Mövcud)</span>
          <h3 className="text-2xl font-black text-emerald-700 mt-1">{availableCount} Ədəd</h3>
        </div>
      </div>

      {/* FİLTRLƏR VƏ AXTARIŞ */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Şkaf nömrəsi və ya müştəri axtar..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border rounded-lg text-xs font-medium bg-slate-50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* ZONA FİLTRİ */}
          <select 
            value={zoneFilter} 
            onChange={e => setZoneFilter(e.target.value)}
            className="p-1.5 border rounded-lg font-bold bg-slate-50 text-slate-700"
          >
            <option value="ALL">Bütün Zonalar</option>
            <option value="Kişi Soyunma Otağı">Kişi Soyunma Otağı</option>
            <option value="Qadın Soyunma Otağı">Qadın Soyunma Otağı</option>
          </select>

          {/* STATUS FİLTRİ */}
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="p-1.5 border rounded-lg font-bold bg-slate-50 text-slate-700"
          >
            <option value="ALL">Bütün Statuslar</option>
            <option value="Occupied">Dolu (Rent)</option>
            <option value="Available">Boş</option>
          </select>

          {/* 🆕 MÜDDƏT FİLTRİ */}
          <select 
            value={durationFilter} 
            onChange={e => setDurationFilter(e.target.value)}
            className="p-1.5 border rounded-lg font-bold bg-slate-50 text-slate-700"
          >
            <option value="ALL">Bütün Müddətlər</option>
            <option value="1 Aylıq">1 Aylıq</option>
            <option value="3 Aylıq">3 Aylıq</option>
            <option value="6 Aylıq">6 Aylıq</option>
            <option value="1 İllik">1 İllik</option>
          </select>

        </div>
      </div>

      {/* ŞKAFLARIN GRID GÖRÜNÜŞÜ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLockers.map(locker => {
          const isOccupied = locker.status === 'Occupied';
          return (
            <div 
              key={locker.id} 
              className={`p-4 rounded-xl border flex flex-col justify-between transition shadow-sm ${
                isOccupied ? 'bg-rose-50/40 border-rose-200' : 'bg-emerald-50/30 border-emerald-200'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-black text-sm font-mono bg-white px-2.5 py-1 rounded-lg border shadow-xs">
                    Şkaf #{locker.number}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isOccupied && locker.durationType !== '-' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800">
                        {locker.durationType}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isOccupied ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {isOccupied ? 'DOLU (RENT)' : 'BOŞ'}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 space-y-1.5 mb-4">
                  <p className="text-[11px] font-bold text-slate-500">{locker.zone}</p>
                  <p><b>Müştəri:</b> <span className="font-bold text-slate-900">{locker.client}</span></p>
                  <p><b>Əlaqə:</b> {locker.phone}</p>
                  <p className="text-[11px] text-slate-500"><b>Müddət:</b> {locker.startDate} — {locker.endDate}</p>
                </div>
              </div>

              <button 
                onClick={() => handleToggleLocker(locker.id)}
                className={`w-full font-bold py-2 rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-1.5 ${
                  isOccupied 
                    ? 'bg-slate-800 hover:bg-slate-900 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <Key size={13} /> {isOccupied ? 'Şkafı Boşalt / Təhvil Al' : 'Yeni İcarəyə Ver'}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}