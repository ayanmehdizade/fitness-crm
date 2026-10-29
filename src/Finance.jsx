import React, { useState } from 'react';
import { 
  CreditCard, BarChart3, Search, Bell, Shield, Key, 
  Clock, ArrowUpRight, ArrowDownRight, Banknote, Landmark, 
  Plus, Minus, Lock, RefreshCw, Filter, FileText, PieChart, 
  TrendingUp, FileSpreadsheet, Receipt, Calculator, AlertCircle, CheckCircle2,
  Users, Layers, ArrowRightLeft, Coins, FileCheck, DollarSign, Activity, History, X, Globe, Sparkles
} from 'lucide-react';

// MALİYYƏ HESABLARI VƏ KASSALAR
const initialAccounts = [
  { id: 1, name: 'Əsas Nağd Kassa (Resepşn)', balance: '1,200.00 AZN', type: 'Cash', icon: Banknote, color: 'text-emerald-600 bg-emerald-50' },
  { id: 2, name: 'ABB POS Terminal Hesabı', balance: '2,950.00 AZN', type: 'POS Terminal', icon: CreditCard, color: 'text-blue-600 bg-blue-50' },
  { id: 3, name: 'Kapital Bank Hesabı (Cari)', balance: '18,450.00 AZN', type: 'Bank Account', icon: Landmark, color: 'text-purple-600 bg-purple-50' },
  { id: 4, name: 'FitBar & Barber Kassası', balance: '450.00 AZN', type: 'Cash', icon: Banknote, color: 'text-amber-600 bg-amber-50' },
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

// ƏSAS VƏSAİTLƏR (İLKİN QALIQ DƏYƏRİ VƏ YEKUN İLƏ)
const fixedAssets = [
  { id: 'FA-01', name: 'Technogym Cardiorun Qoşu Zolaqları', buyDate: '15.01.2024', unitPrice: 6500, count: 10, totalValue: 65000, initialBalance: 58000, rate: '20%', accDepr: 12400, netValue: 52600 },
  { id: 'FA-02', name: 'Zal Havalandırma & Çiller Sistemi', buyDate: '10.03.2024', unitPrice: 22000, count: 1, totalValue: 22000, initialBalance: 18000, rate: '15%', accDepr: 6200, netValue: 15800 },
  { id: 'FA-03', name: 'Turniket Və Keçid İT Sistemləri', buyDate: '20.05.2024', unitPrice: 2900, count: 5, totalValue: 14500, initialBalance: 11500, rate: '25%', accDepr: 4800, netValue: 9700 },
];

// HESAB-FAKTURALAR VƏ QAİMƏLƏR (QAİMƏ TARİXİ İLƏ)
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

  return (
    <div className="space-y-6">
      
      {/* TAB NAVİQASİYASI */}
      <div className="flex flex-wrap items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
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
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition ${
                  activeSubTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <button className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition">
          <FileText size={14} /> Hesabat Export (PDF)
        </button>
      </div>

      {/* 1. YENİ IFRS 18 P&L HESABATI */}
      {activeSubTab === 'ifrs18' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Gross Profit</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">51,800.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Operating Profit</span>
              <h3 className="text-xl font-black text-blue-600 mt-1">29,150.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-purple-50/50 border-purple-200">
              <span className="text-[10px] font-bold text-purple-800 block uppercase tracking-wider">Profit before Financing & Tax</span>
              <h3 className="text-xl font-black text-purple-900 mt-1">30,950.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-emerald-50/50 border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 block uppercase tracking-wider">Profit for the Year</span>
              <h3 className="text-xl font-black text-emerald-700 mt-1">24,280.00 AZN</h3>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">MAKFIT ENTERPRISE MMC</h3>
                <p className="text-xs text-slate-500 mt-0.5">Mənfəət və Zərər Hesabatı — Yeni IFRS 18 Standartı Üzrə</p>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-md">Yeni IFRS 18 Formatı</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-3">IFRS 18 Təsnifatı Və Maddələr</th>
                    <th className="p-3 text-right">Cari Dövr (AZN)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  <tr className="font-bold bg-slate-50">
                    <td className="p-3 text-slate-900" colSpan={2}>1. ƏMƏLİYYAT KATEQORİYASI (OPERATING CATEGORY)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">Hasılat / Gəlir (Revenue)</td>
                    <td className="p-3 text-right text-slate-900 font-bold">64,200.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">Satışların Maya Dəyəri (Cost of sales)</td>
                    <td className="p-3 text-right text-rose-600">(12,400.00)</td>
                  </tr>
                  <tr className="bg-blue-50/40 font-extrabold text-blue-900">
                    <td className="p-3 pl-6">BRÜT MƏNFƏƏT (GROSS PROFIT)</td>
                    <td className="p-3 text-right">51,800.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">Satış və Reklam Xərcləri (Selling and distribution expenses)</td>
                    <td className="p-3 text-right text-rose-600">(3,000.00)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">İnzibati İdarəetmə Xərcləri (Administrative expenses)</td>
                    <td className="p-3 text-right text-rose-600">(18,650.00)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">Tədqiqat və İşlənmə Xərcləri (Research and development expenses)</td>
                    <td className="p-3 text-right text-rose-600">(2,500.00)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">Diğer Əməliyyat Gəlirləri (Other operating income)</td>
                    <td className="p-3 text-right text-emerald-600">+1,500.00</td>
                  </tr>
                  <tr className="bg-purple-100/60 font-black text-purple-950 text-sm border-t border-b border-purple-300">
                    <td className="p-3">ƏMƏLİYYAT MƏNFƏƏTİ (OPERATING PROFIT)</td>
                    <td className="p-3 text-right">29,150.00 AZN</td>
                  </tr>
                  <tr className="font-bold bg-slate-50">
                    <td className="p-3 text-slate-900" colSpan={2}>2. YATIRIM KATEQORİYASI (INVESTING CATEGORY)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">İştirak Payı Mənfəəti (Share of profit of associates)</td>
                    <td className="p-3 text-right text-emerald-600">+1,200.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">Yatırım Satışı Mənfəəti (Gains/losses on disposal of investments)</td>
                    <td className="p-3 text-right text-emerald-600">+600.00</td>
                  </tr>
                  <tr className="bg-amber-50 font-extrabold text-amber-900 border-t border-b border-amber-200">
                    <td className="p-3">FİNANSMAN VƏ VERGİDƏN ƏVVƏLKİ MƏNFƏƏT (PROFIT BEFORE FINANCING AND INCOME TAX)</td>
                    <td className="p-3 text-right">30,950.00 AZN</td>
                  </tr>
                  <tr className="font-bold bg-slate-50">
                    <td className="p-3 text-slate-900" colSpan={2}>3. FİNANSMAN VƏ VERGİ KATEQORİYASI (FINANCING & TAX)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">Finansman / Faiz Xərcləri (Finance expenses)</td>
                    <td className="p-3 text-right text-rose-600">(600.00)</td>
                  </tr>
                  <tr className="font-bold text-slate-900">
                    <td className="p-3 pl-6">VERGİDƏN ƏVVƏLKİ MƏNFƏƏT (PROFIT BEFORE INCOME TAX)</td>
                    <td className="p-3 text-right">30,350.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-600 pl-6">Mənfəət Vergisi Xərci (Income tax expense - 20%)</td>
                    <td className="p-3 text-right text-rose-600">(6,070.00)</td>
                  </tr>
                  <tr className="bg-emerald-100 font-black text-emerald-950 text-base border-t-2 border-b-2 border-emerald-400">
                    <td className="p-3.5">İL ÜZRƏ XALİS MƏNFƏƏT (PROFIT FOR THE YEAR)</td>
                    <td className="p-3.5 text-right">24,280.00 AZN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. IAS 1 P&L VƏ EBITDA */}
      {activeSubTab === 'ifrs_pnl' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b pb-2">IAS 1 Standartı üzrə Mənfəət və Zərər Hesabatı (EBITDA ilə)</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold bg-slate-50 p-2 text-slate-800">
              <span>Gəlir (Revenue)</span>
              <span>64,200.00 AZN</span>
            </div>
            <div className="flex justify-between text-slate-600 pl-4">
              <span>Satışın Maya Dəyəri (COGS)</span>
              <span className="text-rose-600">-12,400.00 AZN</span>
            </div>
            <div className="flex justify-between font-extrabold bg-blue-50 p-2 text-blue-900">
              <span>Ümumi Mənfəət (Gross Profit)</span>
              <span>51,800.00 AZN</span>
            </div>
            <div className="flex justify-between font-black bg-amber-100 p-2.5 rounded text-amber-900">
              <span>EBITDA (Amortizasiyadan Əvvəlki Əməliyyat Mənfəəti)</span>
              <span>31,700.00 AZN</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. DAXİLİ P&L */}
      {activeSubTab === 'pnl' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b pb-2">İdarəetmə Üçün Daxili P&L Hesabatı</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 font-semibold block">Ümumi Gəlir</span>
              <h4 className="text-lg font-black text-slate-900 mt-1">64,200 AZN</h4>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg">
              <span className="text-emerald-700 font-semibold block">Xalis Mənfəət</span>
              <h4 className="text-lg font-black text-emerald-800 mt-1">30,000 AZN</h4>
            </div>
          </div>
        </div>
      )}

      {/* 4. ƏMƏKHAQQI, KADR VƏ İŞSİZLİKDƏN SIĞORTA UÇOTU */}
      {activeSubTab === 'payroll' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4 overflow-x-auto">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Cari Ayın Əməkhaqqı Vərəqəsi Və İşsizlikdən Sığorta Ayırmaları</h3>
              <p className="text-xs text-slate-500">İşçidən və İşəgötürəndən İşsizlik Sığortası (0.5% + 0.5%) Və SuperGross Maliyyə Yükü</p>
            </div>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b uppercase">
              <tr>
                <th className="p-3">Əməkdaş Və Vəzifə</th>
                <th className="p-3">Brüt Maaş</th>
                <th className="p-3 text-rose-600">Gəlir Vergisi</th>
                <th className="p-3 text-rose-600">İşçi DSMF (3%)</th>
                <th className="p-3 text-rose-600 font-bold">İşçi İşsizlik (0.5%)</th>
                <th className="p-3 text-rose-600">İşçi İTS (2%)</th>
                <th className="p-3 text-emerald-700 font-bold">Xalis (Net) Maaş</th>
                <th className="p-3 text-purple-700">İşəgötürən DSMF (22%)</th>
                <th className="p-3 text-purple-700 font-bold">İşəgötürən İşsizlik (0.5%)</th>
                <th className="p-3 text-purple-700">İşəgötürən İTS (2%)</th>
                <th className="p-3 text-right font-black bg-purple-50 text-purple-900">Super Gross Məbləğ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payrollData.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <span className="font-bold text-slate-800">{emp.name}</span>
                    <span className="block text-[10px] text-slate-400 font-medium">{emp.role}</span>
                  </td>
                  <td className="p-3 font-semibold text-slate-900">{emp.gross}.00 AZN</td>
                  <td className="p-3 text-rose-600 font-medium">{emp.incomeTax} AZN</td>
                  <td className="p-3 text-slate-600">{emp.dsmfWorker} AZN</td>
                  <td className="p-3 text-rose-600 font-bold">{emp.unempWorker} AZN</td>
                  <td className="p-3 text-slate-600">{emp.itsWorker} AZN</td>
                  <td className="p-3 font-extrabold text-emerald-600">{emp.net} AZN</td>
                  <td className="p-3 text-purple-700 font-medium">{emp.employerDsmf} AZN</td>
                  <td className="p-3 text-purple-700 font-bold">{emp.employerUnemp} AZN</td>
                  <td className="p-3 text-purple-700 font-medium">{emp.employerIts} AZN</td>
                  <td className="p-3 text-right font-black bg-purple-50/60 text-purple-950">{emp.superGross}.00 AZN</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. ƏTRAFLI PUL AXINLARI (CASH FLOW DETAILS) */}
      {activeSubTab === 'cashflow' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b pb-3">Detallı Pul Axınları Hesabatı (Gəlir Və Ödənişlər üzrə)</h3>
          
          <div className="space-y-4 text-xs">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-emerald-50 p-3 font-bold text-emerald-900 flex justify-between items-center">
                <span>1. ƏMƏLİYYAT FƏALİYYƏTİ ÜZRƏ PUL AXINLARI</span>
                <span className="text-sm font-black">+38,200.00 AZN</span>
              </div>
              <div className="p-3 space-y-2 bg-white">
                <div className="flex justify-between font-bold text-emerald-700 border-b pb-1">
                  <span>• Ümumi Əməliyyat Gəlirləri (Daxilolmalar):</span>
                  <span>+62,500.00 AZN</span>
                </div>
                <div className="pl-4 flex justify-between text-slate-600">
                  <span>- Abunəlik Və Üzvlük Nağd/POS Satışları</span>
                  <span>+48,500.00 AZN</span>
                </div>
                <div className="pl-4 flex justify-between text-slate-600">
                  <span>- Fərdi Məşqçi (PT) Nağd Və POS Ödənişləri</span>
                  <span>+14,000.00 AZN</span>
                </div>

                <div className="flex justify-between font-bold text-rose-700 border-b pb-1 mt-3">
                  <span>• Ümumi Əməliyyat Ödənişləri (Çıxarışlar):</span>
                  <span>-24,300.00 AZN</span>
                </div>
                <div className="pl-4 flex justify-between text-slate-600">
                  <span>- Təchizatçılara Və Mallara Ödənilən Nağd/Bank Ödənişi</span>
                  <span>-5,500.00 AZN</span>
                </div>
                <div className="pl-4 flex justify-between text-slate-600">
                  <span>- Obyekt İcarəsi Və Kommunal Ödənişlər</span>
                  <span>-6,800.00 AZN</span>
                </div>
                <div className="pl-4 flex justify-between text-slate-600">
                  <span>- Heyətə Ödənilən Maaş Və Avans Ödənişləri</span>
                  <span>-12,000.00 AZN</span>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-amber-50 p-3 font-bold text-amber-900 flex justify-between items-center">
                <span>2. İNVESTİSİYA FƏALİYYƏTİ ÜZRƏ PUL AXINLARI</span>
                <span className="text-sm font-black text-rose-600">-5,400.00 AZN</span>
              </div>
              <div className="p-3 space-y-2 bg-white">
                <div className="flex justify-between font-bold text-rose-700 border-b pb-1">
                  <span>• Ümumi İnvestisiya Ödənişləri:</span>
                  <span>-5,400.00 AZN</span>
                </div>
                <div className="pl-4 flex justify-between text-slate-600">
                  <span>- Yeni Cardiorun Trenajor Və Keçid İT Avadanlıq Alışı</span>
                  <span>-5,400.00 AZN</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center bg-blue-100 p-4 rounded-xl text-blue-950 font-black text-sm">
              <span>CƏMİ XALİS PUL ARTIMI (NET CASH FLOW)</span>
              <span className="text-base text-blue-900">+32,800.00 AZN</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. İNVOYSLAR VƏ QAİMƏLƏR (QAİMƏ TARİXİ VƏ DETALLAR İLƏ) */}
      {activeSubTab === 'invoices' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4 overflow-x-auto">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Korporativ İnvoyslar Və Elektron Qaimə-Fakturalar</h3>
              <p className="text-xs text-slate-500">Qaimə Tarixi, Son Tarix, Tərkibi, Əsas Məbləğ, ƏDV (18%) və Yekun Borc</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition">
              + Yeni Qaimə Yarat
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b uppercase">
              <tr>
                <th className="p-3">Qaimə No / VÖEN</th>
                <th className="p-3">Müştəri Şirkət</th>
                <th className="p-3 font-bold text-blue-700">Qaimə Tarixi</th>
                <th className="p-3 font-bold text-rose-600">Son Ödəniş Tarixi</th>
                <th className="p-3">Qaimənin Tərkibi Və Xidmət</th>
                <th className="p-3 font-semibold text-slate-700">Əsas Məbləğ</th>
                <th className="p-3 font-semibold text-purple-700">ƏDV (18%)</th>
                <th className="p-3 font-black text-slate-900">Yekun Məbləğ</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <span className="font-bold text-slate-900">{inv.id}</span>
                    <span className="block text-[10px] text-slate-400">VÖEN: {inv.taxNo}</span>
                  </td>
                  <td className="p-3 font-bold text-slate-800">{inv.client}</td>
                  <td className="p-3 font-bold text-blue-700">{inv.invoiceDate}</td>
                  <td className="p-3 font-bold text-rose-600">{inv.dueDate}</td>
                  <td className="p-3 text-slate-600 font-medium">{inv.items}</td>
                  <td className="p-3 font-semibold text-slate-700">{inv.baseAmount.toFixed(2)} AZN</td>
                  <td className="p-3 font-semibold text-purple-700">{inv.vatAmount.toFixed(2)} AZN</td>
                  <td className="p-3 font-black text-slate-900">{inv.totalAmount.toFixed(2)} AZN</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      inv.status === 'Ödənildi' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">CAC (Müştəri Cəlb Etmə Dəyəri)</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">16.50 AZN</h3>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">LTV (Müştəri Dəyəri)</span>
            <h3 className="text-xl font-black text-emerald-600 mt-1">480.00 AZN</h3>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">Break-Even Point</span>
            <h3 className="text-xl font-black text-blue-600 mt-1">310 Abunəlik</h3>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
            <span className="text-xs font-semibold text-slate-500 block">Current Ratio (Likvidlik)</span>
            <h3 className="text-xl font-black text-purple-600 mt-1">2.84</h3>
          </div>
        </div>
      )}

      {/* 8. MÜXABİRLƏŞMƏ JURNALI */}
      {activeSubTab === 'ledger' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4 overflow-x-auto">
          <h3 className="font-bold text-slate-900 text-sm">Baş Kitab Müxabirləşmə Jurnalı</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b uppercase">
              <tr>
                <th className="p-3">Kontekt No</th>
                <th className="p-3 font-bold text-slate-700">Əməliyyat Tarixi</th>
                <th className="p-3">Əməliyyatın Məzmunu</th>
                <th className="p-3 text-blue-700">Debet Hesab</th>
                <th className="p-3 text-purple-700">Kredit Hesab</th>
                <th className="p-3 text-right">Məbləğ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledgerEntries.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-800">{row.id}</td>
                  <td className="p-3 font-bold text-slate-700">{row.date}</td>
                  <td className="p-3 text-slate-800 font-medium">{row.desc}</td>
                  <td className="p-3 font-bold text-blue-700">{row.debit}</td>
                  <td className="p-3 font-bold text-purple-700">{row.credit}</td>
                  <td className="p-3 text-right font-black text-slate-900">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 9. ƏSAS VƏSAİTLƏR UÇOTU (İLKİN QALIQ DƏYƏRİ VƏ YEKUN İLƏ) */}
      {activeSubTab === 'assets' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4 overflow-x-auto">
          <h3 className="font-bold text-slate-900 text-sm">Əsas Vəsaitlərin İnventar Uçotu, İlkin Qalıq Dəyəri Və Amortizasiya Vərəqəsi</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b uppercase">
              <tr>
                <th className="p-3">İnv. No / Avadanlıq</th>
                <th className="p-3">Alış Tarixi</th>
                <th className="p-3">Vahid Qiymət</th>
                <th className="p-3">Say</th>
                <th className="p-3 font-bold text-slate-900">Alış Dəyəri (Cəmi)</th>
                <th className="p-3 font-bold text-amber-700 bg-amber-50">İlkin Qalıq Dəyəri</th>
                <th className="p-3 text-blue-600">Amort. Faizi</th>
                <th className="p-3 text-rose-600">Akkum. Amortizasiya</th>
                <th className="p-3 text-right font-black text-emerald-600">Yekun Qalıq Dəyəri</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fixedAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-800">{asset.name} <span className="block text-[10px] text-slate-400 font-normal">{asset.id}</span></td>
                  <td className="p-3 text-slate-600 font-medium">{asset.buyDate}</td>
                  <td className="p-3 font-semibold text-slate-700">{asset.unitPrice.toLocaleString()} AZN</td>
                  <td className="p-3 font-bold text-slate-900">{asset.count} ədəd</td>
                  <td className="p-3 font-extrabold text-slate-900">{asset.totalValue.toLocaleString()} AZN</td>
                  <td className="p-3 font-bold text-amber-800 bg-amber-50/60">{asset.initialBalance.toLocaleString()} AZN</td>
                  <td className="p-3 text-blue-600 font-bold">{asset.rate}</td>
                  <td className="p-3 text-rose-600 font-semibold">{asset.accDepr.toLocaleString()} AZN</td>
                  <td className="p-3 text-right font-black text-emerald-600">{asset.netValue.toLocaleString()} AZN</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 10. VERGİ, ƏDV VƏ YGB UÇOTU */}
      {activeSubTab === 'tax' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <span className="text-xs font-semibold text-slate-500 block">Hesablanmış Satış ƏDV (18%)</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">4,250.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <span className="text-xs font-semibold text-slate-500 block">E-Qaimələr üzrə Əvəzləşdirilən ƏDV</span>
              <h3 className="text-xl font-black text-emerald-600 mt-1">-1,220.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-blue-50/50 border-blue-200">
              <span className="text-xs font-bold text-blue-800 block">YGB (Gömrük) üzrə Əvəzləşdirilən ƏDV</span>
              <h3 className="text-xl font-black text-blue-900 mt-1">-600.00 AZN</h3>
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-purple-50/50 border-purple-200">
              <span className="text-xs font-bold text-purple-800 block">Büdcəyə Xalis Ödəniləcək ƏDV</span>
              <h3 className="text-xl font-black text-purple-900 mt-1">2,430.00 AZN</h3>
            </div>
          </div>
        </div>
      )}

      {/* 11. DEBİTOR VƏ KREDİTOR */}
      {activeSubTab === 'debts' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Debitor Və Kreditor Borcları (AR/AP)</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b uppercase">
              <tr>
                <th className="p-3">Tərəf / Şirkət</th>
                <th className="p-3">Növü</th>
                <th className="p-3">Son Tarix</th>
                <th className="p-3 text-right">Məbləğ</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {debtsData.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{d.entity}</td>
                  <td className="p-3 text-slate-600 font-medium">{d.type}</td>
                  <td className="p-3 text-slate-600">{d.dueDate}</td>
                  <td className="p-3 text-right font-black text-slate-900">{d.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 12. BANK UZLAŞMASI */}
      {activeSubTab === 'recon' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Bank Çıxarışları Və Valyuta Fərqi Uzlaşması</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b uppercase">
              <tr>
                <th className="p-3">Əməliyyat</th>
                <th className="p-3">Sistem Balansı</th>
                <th className="p-3">Bank Çıxarışı</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bankReconItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{item.bankDesc}</td>
                  <td className="p-3 text-slate-700">{item.systemAmount}</td>
                  <td className="p-3 font-semibold text-slate-900">{item.bankAmount}</td>
                  <td className="p-3 text-right">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 13. MALİYYƏ AUDİTİ */}
      {activeSubTab === 'audit' && (
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Maliyyə Auditi Və Təhlükəsizlik Jurnalı</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b uppercase">
              <tr>
                <th className="p-3">Tarix</th>
                <th className="p-3">İstifadəçi</th>
                <th className="p-3">Əməliyyat</th>
                <th className="p-3 text-right">IP Ünvan</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{log.time}</td>
                  <td className="p-3 text-blue-600 font-semibold">{log.user}</td>
                  <td className="p-3 font-bold text-slate-900">{log.action}</td>
                  <td className="p-3 text-right font-mono text-[11px] text-slate-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 14. KASSA HESABLARI */}
      {activeSubTab === 'accounts' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialAccounts.map((acc) => {
            const Icon = acc.icon;
            return (
              <div key={acc.id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-semibold text-slate-500">{acc.type}</span>
                  <div className={`p-2 rounded-lg ${acc.color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">{acc.name}</p>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">{acc.balance}</h4>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}