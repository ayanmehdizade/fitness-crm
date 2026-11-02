import React, { useState } from 'react';
import { 
  CreditCard, BarChart3, Search, Bell, Shield, Key, 
  Clock, ArrowUpRight, ArrowDownRight, Banknote, Landmark, 
  Plus, Minus, Lock, RefreshCw, Filter, FileText, PieChart, 
  TrendingUp, FileSpreadsheet, Receipt, Calculator, AlertCircle, CheckCircle2,
  Users, Layers, ArrowRightLeft, Coins, FileCheck, DollarSign, Activity, History, X, Globe, Sparkles, Download, Check
} from 'lucide-react';

// MALİYYƏ HESABLARI VƏ KASSALAR
const initialAccounts = [
  { id: 1, name: 'Əsas Nağd Kassa (Resepşn)', balance: '1,200.00 AZN', type: 'Cash', icon: Banknote, color: 'text-slate-900 bg-slate-100' },
  { id: 2, name: 'ABB POS Terminal Hesabı', balance: '2,950.00 AZN', type: 'POS Terminal', icon: CreditCard, color: 'text-slate-900 bg-slate-100' },
  { id: 3, name: 'Kapital Bank Hesabı (Cari)', balance: '18,450.00 AZN', type: 'Bank Account', icon: Landmark, color: 'text-slate-900 bg-slate-100' },
  { id: 4, name: 'FitBar & Barber Kassası', balance: '450.00 AZN', type: 'Cash', icon: Banknote, color: 'text-slate-900 bg-slate-100' },
];

// BUXGALTERİYA MÜXABİRLƏŞMƏLƏRİ
const ledgerEntries = [
  { id: 'JV-2026-089', date: '28.10.2026', desc: 'Fitness Abunəlik Satışı (POS)', debit: '211 (Bank Hesabı)', credit: '601 (Satış Gəliri)', amount: '450.00 AZN' },
  { id: 'JV-2026-088', date: '28.10.2026', desc: 'FitBar İçecek Alışı (Nağd)', debit: '201 (Xammal/Mal)', credit: '101 (Nağd Kassa)', amount: '120.00 AZN' },
  { id: 'JV-2026-087', date: '27.10.2026', desc: 'İcarə haqqı ödənişi', debit: '721 (İnzibati Xərc)', credit: '211 (Bank Hesabı)', amount: '2,500.00 AZN' },
  { id: 'JV-2026-086', date: '26.10.2026', desc: 'Əməkhaqqı Avansı (Məxaric)', debit: '533 (İşçi Heyəti)', credit: '101 (Nağd Kassa)', amount: '600.00 AZN' },
  { id: 'JV-2026-085', date: '25.10.2026', desc: 'Trenajor Amortizasiya Hesablanması', debit: '731 (Köhnəlmə Xərci)', credit: '112 (Akkum. Köhnəlmə)', amount: '850.00 AZN' },
];

// ƏMƏKHAQQI, KADR VƏ İŞSİZLİKDƏN SIĞORTA UÇOTU
const payrollData = [
  { id: 1, name: 'Ayan X.', role: 'Junior Supervisor', gross: 1200, incomeTax: 0, dsmfWorker: 36, unempWorker: 6, itsWorker: 24, net: 1134, employerDsmf: 264, employerUnemp: 6, employerIts: 24, superGross: 1494 },
  { id: 2, name: 'Özcan U.', role: 'Fitness Director', gross: 2500, incomeTax: 154, dsmfWorker: 75, unempWorker: 12.5, itsWorker: 50, net: 2208.5, employerDsmf: 550, employerUnemp: 12.5, employerIts: 50, superGross: 3112.5 },
  { id: 3, name: 'Rauf M.', role: 'Personal Trainer', gross: 1500, incomeTax: 14, dsmfWorker: 45, unempWorker: 7.5, itsWorker: 30, net: 1403.5, employerDsmf: 330, employerUnemp: 7.5, employerIts: 30, superGross: 1867.5 },
  { id: 4, name: 'Nərmin K.', role: 'Receptionist', gross: 800, incomeTax: 0, dsmfWorker: 24, unempWorker: 4, itsWorker: 16, net: 756, employerDsmf: 176, employerUnemp: 4, employerIts: 16, superGross: 996 },
];

// ƏSAS VƏSAİTLƏR
const fixedAssets = [
  { id: 'FA-01', name: 'Technogym Cardiorun Qoşu Zolaqları', buyDate: '15.01.2024', unitPrice: 6500, count: 10, totalValue: 65000, initialBalance: 58000, rate: '20%', accDepr: 12400, netValue: 52600 },
  { id: 'FA-02', name: 'Zal Havalandırma & Çiller Sistemi', buyDate: '10.03.2024', unitPrice: 22000, count: 1, totalValue: 22000, initialBalance: 18000, rate: '15%', accDepr: 6200, netValue: 15800 },
  { id: 'FA-03', name: 'Turniket Və Keçid İT Sistemləri', buyDate: '20.05.2024', unitPrice: 2900, count: 5, totalValue: 14500, initialBalance: 11500, rate: '25%', accDepr: 4800, netValue: 9700 },
];

// HESAB-FAKTURALAR VƏ QAİMƏLƏR
const initialInvoices = [
  { id: 'INV-2026-001', client: 'SOCAR VIP Korporativ', items: 'Korporativ Fitness Abunəliyi (40 Nəfər)', baseAmount: 2711.86, vatAmount: 488.14, totalAmount: 3200.00, invoiceDate: '15.10.2026', dueDate: '30.10.2026', status: 'Gözləmədə', taxNo: '1400293841' },
  { id: 'INV-2026-002', client: 'BP Azerbaijan Club', items: 'Fərdi Məşqçi Və Zal İcarə Paketləri', baseAmount: 4576.27, vatAmount: 823.73, totalAmount: 5400.00, invoiceDate: '10.10.2026', dueDate: '25.10.2026', status: 'Ödənildi', taxNo: '9900123411' },
  { id: 'INV-2026-003', client: 'Pasha Holding Qrup', items: 'İşçi Wellness & Spa Paketi', baseAmount: 1779.66, vatAmount: 320.34, totalAmount: 2100.00, invoiceDate: '01.10.2026', dueDate: '15.10.2026', status: 'Gecikir', taxNo: '1300984721' },
];

// BANK UZLAŞMA QEYDLƏRİ
const bankReconItems = [
  { id: 'BR-101', date: '28.10.2026', bankDesc: 'POS Terminal Hesablaşması (ABB)', systemAmount: '2,950.00 AZN', bankAmount: '2,950.00 AZN', status: 'Uzlaşdı' },
  { id: 'BR-102', date: '27.10.2026', bankDesc: 'İcarə ödənişi (Bank köçürməsi)', systemAmount: '2,500.00 AZN', bankAmount: '2,500.00 AZN', status: 'Uzlaşdı' },
  { id: 'BR-103', date: '26.10.2026', bankDesc: 'Technogym USD Ödənişi (Valyuta Fərqi)', systemAmount: '1,700.00 AZN', bankAmount: '1,734.00 AZN', status: 'Fərq var (34 AZN)' },
];

// AUDİT LOGLARI
const auditLogs = [
  { id: 'AUD-992', time: '28.10.2026 14:15', user: 'Ayan X. (Supervisor)', action: 'Cash Out əməliyyatı yaradıldı', details: '120 AZN - FitBar İçecek alışı', ip: '192.168.1.45' },
  { id: 'AUD-991', time: '28.10.2026 10:00', user: 'Özcan U. (Director)', action: 'Buxgalteriya müxabirləşməsi təsdiqləndi', details: 'JV-2026-089 (450 AZN)', ip: '192.168.1.10' },
];

// DEBİTOR VƏ KREDİTOR BORCLARI
const debtsData = [
  { id: 1, entity: 'FitPro Equipment MMC', type: 'Kreditor (Təchizatçı)', amount: '1,800 AZN', dueDate: '05.11.2026', status: 'Gözləmədə' },
  { id: 2, entity: 'VIP Korporativ Üzv (SOCAR)', type: 'Debitor (Müştəri Borcu)', amount: '3,200 AZN', dueDate: '30.10.2026', status: 'Təcili' },
];

export default function Finance() {
  const [activeSubTab, setActiveSubTab] = useState('ifrs18');
  const [exportSuccess, setExportSuccess] = useState('');

  const handleExport = () => {
    setExportSuccess('Maliyyə hesabatı PDF formatında eksport olundu!');
    setTimeout(() => setExportSuccess(''), 3000);
  };

  return (
    <div className="m-0 p-0 box-border flex flex-col h-full w-full overflow-hidden bg-slate-50 text-slate-800 gap-2 font-sans">
      
      {/* HEADER PANEL */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#151515] rounded-lg flex items-center justify-center font-black text-[#F8FF70] text-xs">
            <Landmark size={14} />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
              MAKFIT — Maliyyə Və Buxgalteriya İdarəetməsi
            </h3>
            <p className="text-[10px] text-slate-500">IFRS 18, Əməkhaqqı, Qaimələr, Vergi Və Kassa Hesabatları</p>
          </div>
        </div>

        <button 
          onClick={handleExport}
          className="px-3 py-1.5 bg-[#151515] hover:bg-black text-[#F8FF70] rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition shadow-2xs"
        >
          <Download size={13} /> Hesabat Eksport (PDF)
        </button>
      </div>

      {exportSuccess && (
        <div className="mx-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs">
          <Check size={14} className="text-emerald-600" /> {exportSuccess}
        </div>
      )}

      {/* SUB-TAB NAVİQASİYASI */}
      <div className="bg-white border border-slate-200 p-1.5 rounded-2xl mx-2 shadow-2xs overflow-x-auto shrink-0">
        <div className="flex items-center gap-1 min-w-max text-[11px] font-bold">
          {[
            { id: 'ifrs18', label: 'Yeni IFRS 18 P&L', icon: Sparkles },
            { id: 'ifrs_pnl', label: 'IAS 1 P&L (EBITDA)', icon: Globe },
            { id: 'pnl', label: 'Daxili P&L', icon: TrendingUp },
            { id: 'payroll', label: 'Əməkhaqqı & Sığortalar', icon: Users },
            { id: 'cashflow', label: 'Ətraflı Pul Axınları', icon: Coins },
            { id: 'invoices', label: 'İnvoys & Qaimələr', icon: FileCheck },
            { id: 'ratios', label: 'Maliyyə Əmsalları', icon: Activity },
            { id: 'ledger', label: 'Müxabirləşmə Jurnalı', icon: FileSpreadsheet },
            { id: 'assets', label: 'Əsas Vəsaitlər Uçotu', icon: Layers },
            { id: 'tax', label: 'Vergi, ƏDV & YGB', icon: Calculator },
            { id: 'debts', label: 'Debitor / Kreditor', icon: Receipt },
            { id: 'recon', label: 'Bank Uzlaşması', icon: ArrowRightLeft },
            { id: 'audit', label: 'Maliyyə Auditi', icon: History },
            { id: 'accounts', label: 'Kassa & Hesablar', icon: Landmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                  isActive 
                    ? 'bg-[#151515] text-[#F8FF70] font-black' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 overflow-auto mx-2 mb-2">

        {/* 1. YENİ IFRS 18 P&L HESABATI */}
        {activeSubTab === 'ifrs18' && (
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Gross Profit</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">51,800.00 AZN</h3>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Operating Profit</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">29,150.00 AZN</h3>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Profit before Financing & Tax</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">30,950.00 AZN</h3>
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs bg-emerald-50/50 border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 block uppercase tracking-wider">Profit for the Year</span>
                <h3 className="text-lg font-black text-emerald-700 mt-0.5">24,280.00 AZN</h3>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div>
                  <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">MAKFIT ENTERPRISE MMC</h3>
                  <p className="text-[10px] text-slate-500">Mənfəət Və Zərər Hesabatı — Yeni IFRS 18 Standartı Üzrə</p>
                </div>
                <span className="text-[10px] font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-xl">Yeni IFRS 18 Formatı</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-[#151515] text-[#F8FF70] font-extrabold uppercase text-[10px]">
                    <tr>
                      <th className="p-2 border-r border-[#282828]">IFRS 18 Təsnifatı Və Maddələr</th>
                      <th className="p-2 text-right">Cari Dövr (AZN)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    <tr className="font-bold bg-slate-50">
                      <td className="p-2 text-slate-900" colSpan={2}>1. ƏMƏLİYYAT KATEQORİYASI (OPERATING CATEGORY)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">Hasılat / Gəlir (Revenue)</td>
                      <td className="p-2 text-right text-slate-900 font-bold">64,200.00</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">Satışların Maya Dəyəri (Cost of sales)</td>
                      <td className="p-2 text-right text-rose-600">(12,400.00)</td>
                    </tr>
                    <tr className="bg-slate-100 font-black text-slate-900">
                      <td className="p-2 pl-6">BRÜT MƏNFƏƏT (GROSS PROFIT)</td>
                      <td className="p-2 text-right">51,800.00</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">Satış və Reklam Xərcləri (Selling and distribution expenses)</td>
                      <td className="p-2 text-right text-rose-600">(3,000.00)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">İnzibati İdarəetmə Xərcləri (Administrative expenses)</td>
                      <td className="p-2 text-right text-rose-600">(18,650.00)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">Tədqiqat və İşlənmə Xərcləri (Research and development expenses)</td>
                      <td className="p-2 text-right text-rose-600">(2,500.00)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">Diğer Əməliyyat Gəlirləri (Other operating income)</td>
                      <td className="p-2 text-right text-emerald-600">+1,500.00</td>
                    </tr>
                    <tr className="bg-slate-100 font-black text-slate-900 border-t border-b border-slate-200">
                      <td className="p-2">ƏMƏLİYYAT MƏNFƏƏTİ (OPERATING PROFIT)</td>
                      <td className="p-2 text-right">29,150.00 AZN</td>
                    </tr>
                    <tr className="font-bold bg-slate-50">
                      <td className="p-2 text-slate-900" colSpan={2}>2. YATIRIM KATEQORİYASI (INVESTING CATEGORY)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">İştirak Payı Mənfəəti (Share of profit of associates)</td>
                      <td className="p-2 text-right text-emerald-600">+1,200.00</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">Yatırım Satışı Mənfəəti (Gains/losses on disposal of investments)</td>
                      <td className="p-2 text-right text-emerald-600">+600.00</td>
                    </tr>
                    <tr className="bg-slate-100 font-black text-slate-900 border-t border-b border-slate-200">
                      <td className="p-2">FİNANSMAN VƏ VERGİDƏN ƏVVƏLKİ MƏNFƏƏT (PROFIT BEFORE FINANCING AND INCOME TAX)</td>
                      <td className="p-2 text-right">30,950.00 AZN</td>
                    </tr>
                    <tr className="font-bold bg-slate-50">
                      <td className="p-2 text-slate-900" colSpan={2}>3. FİNANSMAN VƏ VERGİ KATEQORİYASI (FINANCING & TAX)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">Finansman / Faiz Xərcləri (Finance expenses)</td>
                      <td className="p-2 text-right text-rose-600">(600.00)</td>
                    </tr>
                    <tr className="font-bold text-slate-900">
                      <td className="p-2 pl-6">VERGİDƏN ƏVVƏLKİ MƏNFƏƏT (PROFIT BEFORE INCOME TAX)</td>
                      <td className="p-2 text-right">30,350.00</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="p-2 text-slate-600 pl-6">Mənfəət Vergisi Xərci (Income tax expense - 20%)</td>
                      <td className="p-2 text-right text-rose-600">(6,070.00)</td>
                    </tr>
                    <tr className="bg-emerald-100 font-black text-emerald-900 text-xs border-t-2 border-b-2 border-emerald-300">
                      <td className="p-2.5">İL ÜZRƏ XALİS MƏNFƏƏT (PROFIT FOR THE YEAR)</td>
                      <td className="p-2.5 text-right">24,280.00 AZN</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. IAS 1 P&L VƏ EBITDA */}
        {activeSubTab === 'ifrs_pnl' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <h3 className="font-black text-slate-900 text-xs border-b border-slate-100 pb-2 uppercase tracking-wider">
              IAS 1 Standartı Üzrə Mənfəət Və Zərər Hesabatı (EBITDA İlə)
            </h3>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between font-bold bg-slate-50 p-2 rounded-xl text-slate-800">
                <span>Gəlir (Revenue)</span>
                <span>64,200.00 AZN</span>
              </div>
              <div className="flex justify-between text-slate-600 pl-4">
                <span>Satışın Maya Dəyəri (COGS)</span>
                <span className="text-rose-600">-12,400.00 AZN</span>
              </div>
              <div className="flex justify-between font-extrabold bg-slate-100 p-2 rounded-xl text-slate-900">
                <span>Ümumi Mənfəət (Gross Profit)</span>
                <span>51,800.00 AZN</span>
              </div>
              <div className="flex justify-between font-black bg-[#151515] p-2.5 rounded-xl text-[#F8FF70]">
                <span>EBITDA (Amortizasiyadan Əvvəlki Əməliyyat Mənfəəti)</span>
                <span>31,700.00 AZN</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. DAXİLİ P&L */}
        {activeSubTab === 'pnl' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
            <h3 className="font-black text-slate-900 text-xs border-b border-slate-100 pb-2 uppercase tracking-wider">
              İdarəetmə Üçün Daxili P&L Hesabatı
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-semibold block">Ümumi Gəlir</span>
                <h4 className="text-base font-black text-slate-900 mt-1">64,200 AZN</h4>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <span className="text-emerald-800 font-semibold block">Xalis Mənfəət</span>
                <h4 className="text-base font-black text-emerald-700 mt-1">30,000 AZN</h4>
              </div>
            </div>
          </div>
        )}

        {/* 4. ƏMƏKHAQQI, KADR VƏ İŞSİZLİKDƏN SIĞORTA UÇOTU */}
        {activeSubTab === 'payroll' && (
          <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs space-y-3 overflow-x-auto">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">
                Cari Ayın Əməkhaqqı Vərəqəsi Və İşsizlikdən Sığorta Ayırmaları
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">İşçidən Və İşəgötürəndən İşsizlik Sığortası (0.5% + 0.5%) Və SuperGross Maliyyə Yükü</p>
            </div>

            <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
              <thead className="bg-[#151515] text-[#F8FF70] font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-[#282828]">Əməkdaş Və Vəzifə</th>
                  <th className="p-2 border-r border-[#282828]">Brüt Maaş</th>
                  <th className="p-2 border-r border-[#282828]">Gəlir Vergisi</th>
                  <th className="p-2 border-r border-[#282828]">İşçi DSMF (3%)</th>
                  <th className="p-2 border-r border-[#282828]">İşçi İşsizlik (0.5%)</th>
                  <th className="p-2 border-r border-[#282828]">İşçi İTS (2%)</th>
                  <th className="p-2 border-r border-[#282828]">Xalis (Net) Maaş</th>
                  <th className="p-2 border-r border-[#282828]">İşəgötürən DSMF (22%)</th>
                  <th className="p-2 border-r border-[#282828]">İşəgötürən İşsizlik (0.5%)</th>
                  <th className="p-2 border-r border-[#282828]">İşəgötürən İTS (2%)</th>
                  <th className="p-2 text-right">Super Gross Məbləğ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {payrollData.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition">
                    <td className="p-2 border-r border-slate-100">
                      <span className="font-black text-slate-900 block">{emp.name}</span>
                      <span className="text-[10px] text-slate-400">{emp.role}</span>
                    </td>
                    <td className="p-2 border-r border-slate-100 font-bold">{emp.gross}.00 AZN</td>
                    <td className="p-2 border-r border-slate-100 text-rose-600">{emp.incomeTax} AZN</td>
                    <td className="p-2 border-r border-slate-100">{emp.dsmfWorker} AZN</td>
                    <td className="p-2 border-r border-slate-100 font-bold text-rose-600">{emp.unempWorker} AZN</td>
                    <td className="p-2 border-r border-slate-100">{emp.itsWorker} AZN</td>
                    <td className="p-2 border-r border-slate-100 font-black text-emerald-600">{emp.net} AZN</td>
                    <td className="p-2 border-r border-slate-100">{emp.employerDsmf} AZN</td>
                    <td className="p-2 border-r border-slate-100 font-bold">{emp.employerUnemp} AZN</td>
                    <td className="p-2 border-r border-slate-100">{emp.employerIts} AZN</td>
                    <td className="p-2 text-right font-black text-slate-900 bg-slate-50">{emp.superGross}.00 AZN</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. ƏTRAFLI PUL AXINLARI */}
        {activeSubTab === 'cashflow' && (
          <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs space-y-3">
            <h3 className="font-black text-slate-900 text-xs border-b border-slate-100 pb-2 uppercase tracking-wider">
              Detallı Pul Axınları Hesabatı (Gəlir Və Ödənişlər Üzrə)
            </h3>
            
            <div className="space-y-3 text-[11px]">
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 p-2.5 font-black text-slate-900 flex justify-between items-center text-xs">
                  <span>1. ƏMƏLİYYAT FƏALİYYƏTİ ÜZRƏ PUL AXINLARI</span>
                  <span className="text-emerald-700">+38,200.00 AZN</span>
                </div>
                <div className="p-2.5 space-y-1.5 bg-white">
                  <div className="flex justify-between font-bold text-slate-900 border-b border-slate-100 pb-1">
                    <span>• Ümumi Əməliyyat Gəlirləri (Daxilolmalar):</span>
                    <span className="text-emerald-700">+62,500.00 AZN</span>
                  </div>
                  <div className="pl-3 flex justify-between text-slate-600">
                    <span>- Abunəlik Və Üzvlük Nağd/POS Satışları</span>
                    <span>+48,500.00 AZN</span>
                  </div>
                  <div className="pl-3 flex justify-between text-slate-600">
                    <span>- Fərdi Məşqçi (PT) Nağd Və POS Ödənişləri</span>
                    <span>+14,000.00 AZN</span>
                  </div>

                  <div className="flex justify-between font-bold text-slate-900 border-b border-slate-100 pb-1 mt-2">
                    <span>• Ümumi Əməliyyat Ödənişləri (Çıxarışlar):</span>
                    <span className="text-rose-600">-24,300.00 AZN</span>
                  </div>
                  <div className="pl-3 flex justify-between text-slate-600">
                    <span>- Təchizatçılara Və Mallara Ödənilən Nağd/Bank Ödənişi</span>
                    <span>-5,500.00 AZN</span>
                  </div>
                  <div className="pl-3 flex justify-between text-slate-600">
                    <span>- Obyekt İcarəsi Və Kommunal Ödənişlər</span>
                    <span>-6,800.00 AZN</span>
                  </div>
                  <div className="pl-3 flex justify-between text-slate-600">
                    <span>- Heyətə Ödənilən Maaş Və Avans Ödənişləri</span>
                    <span>-12,000.00 AZN</span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 p-2.5 font-black text-slate-900 flex justify-between items-center text-xs">
                  <span>2. İNVESTİSİYA FƏALİYYƏTİ ÜZRƏ PUL AXINLARI</span>
                  <span className="text-rose-600">-5,400.00 AZN</span>
                </div>
                <div className="p-2.5 space-y-1 bg-white">
                  <div className="flex justify-between font-bold text-slate-900 border-b border-slate-100 pb-1">
                    <span>• Ümumi İnvestisiya Ödənişləri:</span>
                    <span className="text-rose-600">-5,400.00 AZN</span>
                  </div>
                  <div className="pl-3 flex justify-between text-slate-600">
                    <span>- Yeni Cardiorun Trenajor Və Keçid İT Avadanlıq Alışı</span>
                    <span>-5,400.00 AZN</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#151515] p-3 rounded-xl text-[#F8FF70] font-black text-xs">
                <span>CƏMİ XALİS PUL ARTIMI (NET CASH FLOW)</span>
                <span className="text-sm">+32,800.00 AZN</span>
              </div>
            </div>
          </div>
        )}

        {/* 6. İNVOYSLAR VƏ QAİMƏLƏR */}
        {activeSubTab === 'invoices' && (
          <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs space-y-3 overflow-x-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">
                  Korporativ İnvoyslar Və Elektron Qaimə-Fakturalar
                </h3>
                <p className="text-[10px] text-slate-500">Qaimə Tarixi, Son Tarix, Tərkibi, Əsas Məbləğ, ƏDV (18%) Və Yekun Borc</p>
              </div>
              <button className="bg-[#151515] hover:bg-black text-[#F8FF70] text-[10px] font-black px-2.5 py-1 rounded-xl transition">
                + Yeni Qaimə Yarat
              </button>
            </div>

            <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
              <thead className="bg-[#151515] text-[#F8FF70] font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-[#282828]">Qaimə No / VÖEN</th>
                  <th className="p-2 border-r border-[#282828]">Müştəri Şirkət</th>
                  <th className="p-2 border-r border-[#282828]">Qaimə Tarixi</th>
                  <th className="p-2 border-r border-[#282828]">Son Ödəniş Tarixi</th>
                  <th className="p-2 border-r border-[#282828]">Qaimənin Tərkibi Və Xidmət</th>
                  <th className="p-2 border-r border-[#282828]">Əsas Məbləğ</th>
                  <th className="p-2 border-r border-[#282828]">ƏDV (18%)</th>
                  <th className="p-2 border-r border-[#282828]">Yekun Məbləğ</th>
                  <th className="p-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {initialInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition">
                    <td className="p-2 border-r border-slate-100 font-mono font-bold text-slate-900">
                      {inv.id}
                      <span className="block text-[10px] text-slate-400 font-normal">VÖEN: {inv.taxNo}</span>
                    </td>
                    <td className="p-2 border-r border-slate-100 font-black text-slate-900">{inv.client}</td>
                    <td className="p-2 border-r border-slate-100 font-bold text-slate-700">{inv.invoiceDate}</td>
                    <td className="p-2 border-r border-slate-100 font-bold text-rose-600">{inv.dueDate}</td>
                    <td className="p-2 border-r border-slate-100 text-slate-600">{inv.items}</td>
                    <td className="p-2 border-r border-slate-100 font-bold">{inv.baseAmount.toFixed(2)} AZN</td>
                    <td className="p-2 border-r border-slate-100 font-bold">{inv.vatAmount.toFixed(2)} AZN</td>
                    <td className="p-2 border-r border-slate-100 font-black text-emerald-600">{inv.totalAmount.toFixed(2)} AZN</td>
                    <td className="p-2 text-right">
                      <span className={`px-2 py-0.5 rounded-full font-black text-[9px] ${
                        inv.status === 'Ödənildi' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>{inv.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 7. MALİYYƏ ƏMSALLARI */}
        {activeSubTab === 'ratios' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">CAC (Müştəri Cəlb Etmə Dəyəri)</span>
              <h3 className="text-base font-black text-slate-900 mt-1">16.50 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">LTV (Müştəri Dəyəri)</span>
              <h3 className="text-base font-black text-emerald-600 mt-1">480.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Break-Even Point</span>
              <h3 className="text-base font-black text-slate-900 mt-1">310 Abunəlik</h3>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Current Ratio (Likvidlik)</span>
              <h3 className="text-base font-black text-slate-900 mt-1">2.84</h3>
            </div>
          </div>
        )}

        {/* 8. MÜXABİRLƏŞMƏ JURNALI */}
        {activeSubTab === 'ledger' && (
          <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs space-y-3 overflow-x-auto">
            <h3 className="font-black text-slate-900 text-xs border-b border-slate-100 pb-2 uppercase tracking-wider">
              Baş Kitab Müxabirləşmə Jurnalı
            </h3>
            <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
              <thead className="bg-[#151515] text-[#F8FF70] font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-[#282828]">Kontekt No</th>
                  <th className="p-2 border-r border-[#282828]">Əməliyyat Tarixi</th>
                  <th className="p-2 border-r border-[#282828]">Əməliyyatın Məzmunu</th>
                  <th className="p-2 border-r border-[#282828]">Debet Hesab</th>
                  <th className="p-2 border-r border-[#282828]">Kredit Hesab</th>
                  <th className="p-2 text-right">Məbləğ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {ledgerEntries.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition">
                    <td className="p-2 border-r border-slate-100 font-mono font-bold text-slate-900">{row.id}</td>
                    <td className="p-2 border-r border-slate-100 font-bold">{row.date}</td>
                    <td className="p-2 border-r border-slate-100 text-slate-700">{row.desc}</td>
                    <td className="p-2 border-r border-slate-100 font-bold text-slate-900">{row.debit}</td>
                    <td className="p-2 border-r border-slate-100 font-bold text-slate-900">{row.credit}</td>
                    <td className="p-2 text-right font-black text-emerald-600">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 9. ƏSAS VƏSAİTLƏR UÇOTU */}
        {activeSubTab === 'assets' && (
          <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs space-y-3 overflow-x-auto">
            <h3 className="font-black text-slate-900 text-xs border-b border-slate-100 pb-2 uppercase tracking-wider">
              Əsas Vəsaitlərin İnventar Uçotu, İlkin Qalıq Dəyəri Və Amortizasiya Vərəqəsi
            </h3>
            <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
              <thead className="bg-[#151515] text-[#F8FF70] font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-[#282828]">İnv. No / Avadanlıq</th>
                  <th className="p-2 border-r border-[#282828]">Alış Tarixi</th>
                  <th className="p-2 border-r border-[#282828]">Vahid Qiymət</th>
                  <th className="p-2 border-r border-[#282828]">Say</th>
                  <th className="p-2 border-r border-[#282828]">Alış Dəyəri (Cəmi)</th>
                  <th className="p-2 border-r border-[#282828]">İlkin Qalıq Dəyəri</th>
                  <th className="p-2 border-r border-[#282828]">Amort. Faizi</th>
                  <th className="p-2 border-r border-[#282828]">Akkum. Amortizasiya</th>
                  <th className="p-2 text-right">Yekun Qalıq Dəyəri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {fixedAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50 transition">
                    <td className="p-2 border-r border-slate-100 font-bold text-slate-900">
                      {asset.name}
                      <span className="block text-[10px] text-slate-400 font-mono">{asset.id}</span>
                    </td>
                    <td className="p-2 border-r border-slate-100 text-slate-600">{asset.buyDate}</td>
                    <td className="p-2 border-r border-slate-100 font-semibold">{asset.unitPrice.toLocaleString()} AZN</td>
                    <td className="p-2 border-r border-slate-100 font-bold">{asset.count} ədəd</td>
                    <td className="p-2 border-r border-slate-100 font-black">{asset.totalValue.toLocaleString()} AZN</td>
                    <td className="p-2 border-r border-slate-100 font-bold text-slate-700 bg-slate-50">{asset.initialBalance.toLocaleString()} AZN</td>
                    <td className="p-2 border-r border-slate-100 font-bold">{asset.rate}</td>
                    <td className="p-2 border-r border-slate-100 text-rose-600 font-bold">{asset.accDepr.toLocaleString()} AZN</td>
                    <td className="p-2 text-right font-black text-emerald-600">{asset.netValue.toLocaleString()} AZN</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 10. VERGİ, ƏDV VƏ YGB UÇOTU */}
        {activeSubTab === 'tax' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px]">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Hesablanmış Satış ƏDV (18%)</span>
              <h3 className="text-base font-black text-slate-900 mt-1">4,250.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">E-Qaimələr Üzrə Əvəzləşdirilən ƏDV</span>
              <h3 className="text-base font-black text-emerald-600 mt-1">-1,220.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">YGB (Gömrük) Üzrə Əvəzləşdirilən ƏDV</span>
              <h3 className="text-base font-black text-slate-900 mt-1">-600.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs bg-emerald-50/50 border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 block uppercase">Büdcəyə Xalis Ödəniləcək ƏDV</span>
              <h3 className="text-base font-black text-emerald-700 mt-1">2,430.00 AZN</h3>
            </div>
          </div>
        )}

        {/* 11. DEBİTOR VƏ KREDİTOR */}
        {activeSubTab === 'debts' && (
          <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs space-y-3">
            <h3 className="font-black text-slate-900 text-xs border-b border-slate-100 pb-2 uppercase tracking-wider">
              Debitor Və Kreditor Borcları (AR/AP)
            </h3>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead className="bg-[#151515] text-[#F8FF70] font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-[#282828]">Tərəf / Şirkət</th>
                  <th className="p-2 border-r border-[#282828]">Növü</th>
                  <th className="p-2 border-r border-[#282828]">Son Tarix</th>
                  <th className="p-2 text-right">Məbləğ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {debtsData.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition">
                    <td className="p-2 border-r border-slate-100 font-black text-slate-900">{d.entity}</td>
                    <td className="p-2 border-r border-slate-100 text-slate-600">{d.type}</td>
                    <td className="p-2 border-r border-slate-100 font-mono text-slate-500">{d.dueDate}</td>
                    <td className="p-2 text-right font-black text-slate-900">{d.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 12. BANK UZLAŞMASI */}
        {activeSubTab === 'recon' && (
          <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs space-y-3">
            <h3 className="font-black text-slate-900 text-xs border-b border-slate-100 pb-2 uppercase tracking-wider">
              Bank Çıxarışları Və Valyuta Fərqi Uzlaşması
            </h3>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead className="bg-[#151515] text-[#F8FF70] font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-[#282828]">Əməliyyat</th>
                  <th className="p-2 border-r border-[#282828]">Sistem Balansı</th>
                  <th className="p-2 border-r border-[#282828]">Bank Çıxarışı</th>
                  <th className="p-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {bankReconItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-2 border-r border-slate-100 font-bold text-slate-900">{item.bankDesc}</td>
                    <td className="p-2 border-r border-slate-100 font-mono">{item.systemAmount}</td>
                    <td className="p-2 border-r border-slate-100 font-mono font-bold text-slate-900">{item.bankAmount}</td>
                    <td className="p-2 text-right">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black text-[9px]">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 13. MALİYYƏ AUDİTİ */}
        {activeSubTab === 'audit' && (
          <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs space-y-3">
            <h3 className="font-black text-slate-900 text-xs border-b border-slate-100 pb-2 uppercase tracking-wider">
              Maliyyə Auditi Və Təhlükəsizlik Jurnalı
            </h3>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead className="bg-[#151515] text-[#F8FF70] font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-2 border-r border-[#282828]">Tarix</th>
                  <th className="p-2 border-r border-[#282828]">İstifadəçi</th>
                  <th className="p-2 border-r border-[#282828]">Əməliyyat</th>
                  <th className="p-2 text-right">IP Ünvan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="p-2 border-r border-slate-100 font-mono font-bold text-slate-900">{log.time}</td>
                    <td className="p-2 border-r border-slate-100 font-bold text-slate-900">{log.user}</td>
                    <td className="p-2 border-r border-slate-100 font-semibold">{log.action}</td>
                    <td className="p-2 text-right font-mono text-[10px] text-slate-400">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 14. KASSA HESABLARI */}
        {activeSubTab === 'accounts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {initialAccounts.map((acc) => {
              const Icon = acc.icon;
              return (
                <div key={acc.id} className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{acc.type}</span>
                    <div className="w-7 h-7 bg-[#151515] text-[#F8FF70] rounded-xl flex items-center justify-center">
                      <Icon size={14} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-900">{acc.name}</p>
                    <h4 className="text-lg font-black text-slate-900 mt-0.5">{acc.balance}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}