import React, { useState } from 'react';
import {
    Package, ArrowDownRight, ArrowUpRight, RefreshCw,
    Layers, AlertTriangle, FileSpreadsheet, Plus, Search, CheckCircle2,
    Truck, ArrowLeftRight, Calculator, FileCheck, Layers3, RefreshCcw
} from 'lucide-react';

// ANBAR SİYAHISI
const warehouses = ['Əsas Anbar', 'FitBar Anbarı', 'Barber & Spa Anbarı', 'Təsərrüfat Anbarı'];

// ANBARDAN GƏLƏN MƏDƏXİL SƏNƏDLƏRİ VƏ FIFO PARTİYALARI
const initialPurchases = [
    {
        docNo: 'IMP-2026-001',
        date: '15.10.2026',
        supplier: 'FitPro Equipment MMC',
        warehouse: 'Əsas Anbar',
        itemCode: 'PRD-101',
        itemName: 'Optimum Gold Standard Whey 2.27kg',
        unit: 'qutu',
        qty: 10,
        buyPrice: 100.00,
        buyAmount: 1000.00,
        isVatSubject: true,
        vatAmount: 180.00,
        extraCostShare: 50.00, // Logistika / Gömrük payı
        docTotalAmount: 1230.00,
        returnedQty: 1 // Geri qaytarılmanı nəzərə alırıq
    },
    {
        docNo: 'IMP-2026-002',
        date: '22.10.2026',
        supplier: 'NutriSupplies MMC',
        warehouse: 'FitBar Anbarı',
        itemCode: 'PRD-102',
        itemName: 'BCAA Energy Drink 330ml',
        unit: 'ədəd',
        qty: 50,
        buyPrice: 2.00,
        buyAmount: 100.00,
        isVatSubject: true,
        vatAmount: 18.00,
        extraCostShare: 5.00,
        docTotalAmount: 123.00,
        returnedQty: 0
    }
];

// STOK VƏ FIFO PARTİYALARI
const initialProducts = [
    {
        code: 'PRD-101',
        name: 'Optimum Gold Standard Whey 2.27kg',
        category: 'İdman Qidası',
        unit: 'qutu',
        totalStock: 9, // 10 alınıb - 1 geri qaytarılıb
        minStock: 3,
        batches: [
            { docNo: 'IMP-2026-001', date: '15.10.2026', qty: 9, costPerUnit: 105.00 } // BuyPrice + (ExtraCost / Qty)
        ]
    },
    {
        code: 'PRD-102',
        name: 'BCAA Energy Drink 330ml',
        category: 'İçecek',
        unit: 'ədəd',
        totalStock: 50,
        minStock: 10,
        batches: [
            { docNo: 'IMP-2026-002', date: '22.10.2026', qty: 50, costPerUnit: 2.10 }
        ]
    }
];

// MƏXARİC SƏNƏDLƏRİ VƏ FIFO ÇIXARIŞLARI
const initialOutbounds = [
    {
        docNo: 'OUT-2026-088',
        date: '27.10.2026',
        destination: 'FitBar Vitrini',
        reason: 'Satış Üçün Vitrinə Ötürmə',
        fromWarehouse: 'FitBar Anbarı',
        category: 'İçecek',
        itemCode: 'PRD-102',
        itemName: 'BCAA Energy Drink 330ml',
        unit: 'ədəd',
        qty: 10,
        fifoCost: 21.00, // 10 * 2.10 AZN
        isSale: true,
        sellPrice: 4.00,
        sellAmount: 40.00,
        vatAmount: 7.20,
        docTotalAmount: 47.20
    }
];

export default function Inventory() {
    // ANBARLARARASI TRANSFER STATELƏRİ
    const [transfers, setTransfers] = useState([
        {
            docNo: 'TR-2026-001',
            date: '28.10.2026',
            fromWarehouse: 'Əsas Anbar',
            toWarehouse: 'FitBar Anbarı',
            itemCode: 'PRD-101',
            itemName: 'Optimum Gold Standard Whey 2.27kg',
            unit: 'qutu',
            qty: 2,
            unitCost: 105.00,
            totalCost: 210.00,
            reason: 'FitBar Stokunun Tamamlanması'
        }
    ]);

    const [trDocNo, setTrDocNo] = useState('TR-2026-002');
    const [trDate, setTrDate] = useState('28.10.2026');
    const [trFromWh, setTrFromWh] = useState('Əsas Anbar');
    const [trToWh, setTrToWh] = useState('FitBar Anbarı');
    const [trSelectedCode, setTrSelectedCode] = useState('');
    const [trQty, setTrQty] = useState('');
    const [trReason, setTrReason] = useState('Daxili Anbarlararası Yenidən Bölgü');

    // ANBARLARARASI TRANSFERİ İCRA EDƏN FUNKSİYA
    const handleAddTransfer = (e) => {
        e.preventDefault();
        const qtyToTransfer = parseFloat(trQty) || 0;

        if (trFromWh === trToWh) {
            alert('Çıxan anbar ilə daxil olan anbar eyni ola bilməz!');
            return;
        }

        if (qtyToTransfer <= 0) {
            alert('Transfer miqdarını daxil edin!');
            return;
        }

        const selectedCode = trSelectedCode || products[0]?.code;
        const targetProd = products.find(p => p.code === selectedCode);
        if (!targetProd) return;

        const sourceBatches = targetProd.batches.filter(b => b.warehouse === trFromWh);
        const availableInSource = sourceBatches.reduce((acc, b) => acc + b.qty, 0);

        if (availableInSource < qtyToTransfer) {
            alert(`"${trFromWh}" anbarında yetərli stok yoxdur! Cari stok: ${availableInSource} ${targetProd.unit}`);
            return;
        }

        let remaining = qtyToTransfer;
        let totalTransferCost = 0;

        let updatedProducts = products.map(p => {
            if (p.code === selectedCode) {
                let updatedBatches = [...p.batches];
                let newTransferredBatches = [];

                for (let i = 0; i < updatedBatches.length; i++) {
                    if (remaining === 0) break;
                    let batch = updatedBatches[i];

                    if (batch.warehouse === trFromWh && batch.qty > 0) {
                        let take = Math.min(batch.qty, remaining);
                        batch.qty -= take;
                        remaining -= take;
                        totalTransferCost += take * batch.costPerUnit;

                        newTransferredBatches.push({
                            docNo: trDocNo,
                            date: trDate,
                            warehouse: trToWh,
                            qty: take,
                            costPerUnit: batch.costPerUnit
                        });
                    }
                }

                return {
                    ...p,
                    batches: [...updatedBatches.filter(b => b.qty > 0), ...newTransferredBatches]
                };
            }
            return p;
        });

        setProducts(updatedProducts);

        const newTransferDoc = {
            docNo: trDocNo,
            date: trDate,
            fromWarehouse: trFromWh,
            toWarehouse: trToWh,
            itemCode: targetProd.code,
            itemName: targetProd.name,
            unit: targetProd.unit,
            qty: qtyToTransfer,
            unitCost: totalTransferCost / qtyToTransfer,
            totalCost: totalTransferCost,
            reason: trReason
        };

        setTransfers([newTransferDoc, ...transfers]);
        alert(`Transfer İcra Olundu!\n${qtyToTransfer} ${targetProd.unit} "${trFromWh}" anbarından "${trToWh}" anbarına keçirildi.`);
        setTrQty('');
    };
    const [purchases, setPurchases] = useState(initialPurchases);
    const [products, setProducts] = useState(initialProducts);
    const [outbounds, setOutbounds] = useState(initialOutbounds);
    const [activeTab, setActiveTab] = useState('stock'); // 'stock', 'inbound', 'outbound', 'return'

    // MƏDƏXİL FORMA STATELƏRİ
    const [inDocNo, setInDocNo] = useState(`IMP-2026-00${purchases.length + 1}`);
    const [inDate, setInDate] = useState('28.10.2026');
    const [inSupplier, setInSupplier] = useState('');
    const [inWarehouse, setInWarehouse] = useState('Əsas Anbar');
    const [inCode, setInCode] = useState('');
    const [inName, setInName] = useState('');
    const [inUnit, setInUnit] = useState('ədəd');
    const [inQty, setInQty] = useState('');
    const [inPrice, setInPrice] = useState('');
    const [inVatSubject, setInVatSubject] = useState(true);
    const [inExtraCost, setInExtraCost] = useState('0');

    // MƏXARİC FORMA STATELƏRİ
    const [outDocNo, setOutDocNo] = useState(`OUT-2026-00${outbounds.length + 1}`);
    const [outDate, setOutDate] = useState('28.10.2026');
    const [outDestination, setOutDestination] = useState('');
    const [outReason, setOutReason] = useState('FitBar Satışı');
    const [outWarehouse, setOutWarehouse] = useState('Əsas Anbar');
    const [outSelectedCode, setOutSelectedCode] = useState(products[0]?.code || '');
    const [outQty, setOutQty] = useState('');
    const [outIsSale, setOutIsSale] = useState(true);
    const [outSellPrice, setOutSellPrice] = useState('');

    // YENİ MƏDƏXİL ƏLAVƏ ET
    const handleAddInbound = (e) => {
        e.preventDefault();
        const qty = parseFloat(inQty) || 0;
        const buyPrice = parseFloat(inPrice) || 0;
        const extraCost = parseFloat(inExtraCost) || 0;

        if (!inCode || !inName || qty <= 0 || buyPrice <= 0) {
            alert('Zəhmət olmasa məhsul məlumatlarını və miqdarı dəqiq doldurun!');
            return;
        }

        const buyAmount = qty * buyPrice;
        const vatAmount = inVatSubject ? buyAmount * 0.18 : 0;
        const docTotalAmount = buyAmount + vatAmount + extraCost;
        const realCostPerUnit = (buyAmount + extraCost) / qty;

        const newInbound = {
            docNo: inDocNo,
            date: inDate,
            supplier: inSupplier || 'Nəğd / Naməlum',
            warehouse: inWarehouse,
            itemCode: inCode,
            itemName: inName,
            unit: inUnit,
            qty: qty,
            buyPrice: buyPrice,
            buyAmount: buyAmount,
            isVatSubject: inVatSubject,
            vatAmount: vatAmount,
            extraCostShare: extraCost,
            docTotalAmount: docTotalAmount,
            returnedQty: 0
        };

        setPurchases([newInbound, ...purchases]);

        // STOK VƏ FIFO PARTİYASINI YENİLƏ
        let existingProdIndex = products.findIndex(p => p.code === inCode);
        if (existingProdIndex > -1) {
            let updatedProds = [...products];
            updatedProds[existingProdIndex].totalStock += qty;
            updatedProds[existingProdIndex].batches.push({
                docNo: inDocNo,
                date: inDate,
                qty: qty,
                costPerUnit: realCostPerUnit
            });
            setProducts(updatedProds);
        } else {
            setProducts([...products, {
                code: inCode,
                name: inName,
                category: 'Ümumi',
                unit: inUnit,
                totalStock: qty,
                minStock: 5,
                batches: [{
                    docNo: inDocNo,
                    date: inDate,
                    qty: qty,
                    costPerUnit: realCostPerUnit
                }]
            }]);
        }

        alert('Mədaxil uğurla icra olundu və FIFO partiyasına əlavə edildi!');
        setInCode(''); setInName(''); setInQty(''); setInPrice(''); setInExtraCost('0');
    };

    // MƏXARİC İCRA ET (FIFO METODU İLƏ)
    const handleAddOutbound = (e) => {
        e.preventDefault();
        const qtyToDeduct = parseFloat(outQty) || 0;
        if (qtyToDeduct <= 0) return;

        const targetProd = products.find(p => p.code === outSelectedCode);
        if (!targetProd || targetProd.totalStock < qtyToDeduct) {
            alert('Stokda bu miqdarda mal yoxdur!');
            return;
        }

        let remaining = qtyToDeduct;
        let totalFifoCost = 0;

        let updatedProducts = products.map(p => {
            if (p.code === outSelectedCode) {
                let updatedBatches = [...p.batches];
                for (let i = 0; i < updatedBatches.length; i++) {
                    if (remaining === 0) break;
                    let batch = updatedBatches[i];
                    if (batch.qty > 0) {
                        let take = Math.min(batch.qty, remaining);
                        batch.qty -= take;
                        remaining -= take;
                        totalFifoCost += take * batch.costPerUnit;
                    }
                }
                return {
                    ...p,
                    totalStock: p.totalStock - qtyToDeduct,
                    batches: updatedBatches.filter(b => b.qty > 0)
                };
            }
            return p;
        });

        setProducts(updatedProducts);

        // MƏXARİC SƏNƏDİ YARAT
        const sellPrice = parseFloat(outSellPrice) || 0;
        const sellAmount = outIsSale ? qtyToDeduct * sellPrice : 0;
        const vatAmount = outIsSale ? sellAmount * 0.18 : 0;
        const docTotal = sellAmount + vatAmount;

        const newOutbound = {
            docNo: outDocNo,
            date: outDate,
            destination: outDestination || 'Məxaric',
            reason: outReason,
            fromWarehouse: outWarehouse,
            category: targetProd.category,
            itemCode: targetProd.code,
            itemName: targetProd.name,
            unit: targetProd.unit,
            qty: qtyToDeduct,
            fifoCost: totalFifoCost,
            isSale: outIsSale,
            sellPrice: sellPrice,
            sellAmount: sellAmount,
            vatAmount: vatAmount,
            docTotalAmount: docTotal
        };

        setOutbounds([newOutbound, ...outbounds]);
        alert(`FIFO Məxaric İcra Olundu!\nHesablanmış Maya Dəyəri: ${totalFifoCost.toFixed(2)} AZN`);
        setOutQty(''); setOutSellPrice('');
    };

    // GERİ QAYTARILMA (PURCHASE RETURN)
    const handleReturnItem = (purchDocNo, returnQty) => {
        const qtyToReturn = parseFloat(returnQty);
        if (!qtyToReturn || qtyToReturn <= 0) return;

        let targetPurchase = purchases.find(p => p.docNo === purchDocNo);
        if (!targetPurchase || (targetPurchase.qty - targetPurchase.returnedQty) < qtyToReturn) {
            alert('Qaytarıla biləcək miqdardan artıq daxil etdiniz!');
            return;
        }

        // Purchase güncəllə
        setPurchases(purchases.map(p => p.docNo === purchDocNo ? { ...p, returnedQty: p.returnedQty + qtyToReturn } : p));

        // Stokdan və FIFO partiyasından sil
        setProducts(products.map(p => {
            if (p.code === targetPurchase.itemCode) {
                let updatedBatches = p.batches.map(b => {
                    if (b.docNo === purchDocNo) {
                        return { ...b, qty: Math.max(0, b.qty - qtyToReturn) };
                    }
                    return b;
                }).filter(b => b.qty > 0);

                return {
                    ...p,
                    totalStock: Math.max(0, p.totalStock - qtyToReturn),
                    batches: updatedBatches
                };
            }
            return p;
        }));

        alert(`${qtyToReturn} ${targetPurchase.unit} mal təchizatçıya geri qaytarıldı və stokdan düşüldü!`);
    };

    return (
        <div className="space-y-6">
            {/* ANBARLARARASI TRANSFER FORMASI VƏ JURNALI */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-sm border-b pb-3 flex items-center gap-2">
                    <ArrowLeftRight className="text-blue-600" size={18} /> Anbarlar Arası Transfer Sənədi
                </h3>

                <form onSubmit={handleAddTransfer} className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                    <div>
                        <label className="block font-bold text-slate-700 mb-1">Transfer Sənəd No:</label>
                        <input type="text" value={trDocNo} onChange={e => setTrDocNo(e.target.value)} className="w-full p-2 border rounded font-bold bg-slate-50" />
                    </div>
                    <div>
                        <label className="block font-bold text-slate-700 mb-1">Tarix:</label>
                        <input type="text" value={trDate} onChange={e => setTrDate(e.target.value)} className="w-full p-2 border rounded font-semibold" />
                    </div>
                    <div>
                        <label className="block font-bold text-rose-700 mb-1">Çıxan Anbar (From):</label>
                        <select value={trFromWh} onChange={e => setTrFromWh(e.target.value)} className="w-full p-2 border border-rose-200 rounded bg-rose-50/50 font-bold text-rose-900">
                            {['Əsas Anbar', 'FitBar Anbarı', 'Barber & Spa Anbarı', 'Təsərrüfat Anbarı'].map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block font-bold text-emerald-700 mb-1">Daxil Olan Anbar (To):</label>
                        <select value={trToWh} onChange={e => setTrToWh(e.target.value)} className="w-full p-2 border border-emerald-200 rounded bg-emerald-50/50 font-bold text-emerald-900">
                            {['Əsas Anbar', 'FitBar Anbarı', 'Barber & Spa Anbarı', 'Təsərrüfat Anbarı'].map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block font-bold text-slate-700 mb-1">Transfer Olunacaq Məhsul:</label>
                        <select value={trSelectedCode} onChange={e => setTrSelectedCode(e.target.value)} className="w-full p-2 border rounded bg-slate-50 font-bold">
                            {products.map(p => (
                                <option key={p.code} value={p.code}>{p.name} (Ümumi Stok: {p.totalStock} {p.unit})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block font-bold text-slate-700 mb-1">Transfer Miqdarı:</label>
                        <input type="number" placeholder="Miqdar daxil edin" value={trQty} onChange={e => setTrQty(e.target.value)} className="w-full p-2 border rounded font-bold" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Transfer Səbəbi Və Qeyd:</label>
                        <input type="text" value={trReason} onChange={e => setTrReason(e.target.value)} className="w-full p-2 border rounded font-medium" />
                    </div>

                    <div className="md:col-span-4 flex justify-end">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg transition shadow-sm flex items-center gap-2">
                            <ArrowLeftRight size={16} /> Transferi İcra Et Və FIFO Balansını Ötür
                        </button>
                    </div>
                </form>

                {/* TRANSFER JURNALI TABLE */}
                <div className="mt-4 border-t pt-4">
                    <h4 className="font-bold text-slate-800 text-xs mb-2">Anbarlararası Hərəkət Jurnalı</h4>
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b">
                            <tr>
                                <th className="p-2">Sənəd No</th>
                                <th className="p-2 text-rose-700">Çıxan Anbar</th>
                                <th className="p-2 text-emerald-700">Daxil Olan Anbar</th>
                                <th className="p-2">Məhsul</th>
                                <th className="p-2">Miqdar</th>
                                <th className="p-2">Cəmi Məbləğ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {transfers.map((t) => (
                                <tr key={t.docNo} className="hover:bg-slate-50">
                                    <td className="p-2 font-bold">{t.docNo}</td>
                                    <td className="p-2 text-rose-700 font-semibold">{t.fromWarehouse}</td>
                                    <td className="p-2 text-emerald-700 font-semibold">{t.toWarehouse}</td>
                                    <td className="p-2 font-bold">{t.itemName}</td>
                                    <td className="p-2">{t.qty} {t.unit}</td>
                                    <td className="p-2 font-bold">{t.totalCost.toFixed(2)} AZN</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* İDARƏ Paneli TABLARI */}
            <div className="flex flex-wrap items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                    {[
                        { id: 'stock', label: 'Cari Stok & FIFO Partiyaları', icon: Package },
                        { id: 'inbound', label: 'Anbara Mədaxillər', icon: ArrowDownRight },
                        { id: 'outbound', label: 'Anbardan Məxariclər (FIFO)', icon: ArrowUpRight },
                        { id: 'return', label: 'Təchizatçıya Qaytarılma', icon: RefreshCcw },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition ${activeTab === tab.id
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

                <span className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-md border border-purple-200">
                    Uçot Metodu: FIFO (First-In First-Out)
                </span>
            </div>

            {/* 1. CARİ STOK VƏ FIFO BATCH-LƏRİ */}
            {activeTab === 'stock' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                            <span className="text-xs font-semibold text-slate-500 block">Ümumi Məhsul Çeşidi</span>
                            <h3 className="text-2xl font-black text-slate-900 mt-1">{products.length} Çeşid</h3>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                            <span className="text-xs font-semibold text-slate-500 block">Kritik Stok Xəbərdarlığı</span>
                            <h3 className="text-2xl font-black text-rose-600 mt-1">
                                {products.filter(p => p.totalStock <= p.minStock).length} Məhsul
                            </h3>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm bg-emerald-50/50 border-emerald-200">
                            <span className="text-xs font-bold text-emerald-800 block">Anbardakı Malların Maya Dəyəri</span>
                            <h3 className="text-2xl font-black text-emerald-700 mt-1">
                                {products.reduce((acc, p) => acc + p.batches.reduce((bAcc, b) => bAcc + (b.qty * b.costPerUnit), 0), 0).toFixed(2)} AZN
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                        <h3 className="font-bold text-slate-900 text-sm">Cari Stok Balansı Və FIFO Növbəsi</h3>

                        <div className="space-y-4">
                            {products.map((p) => (
                                <div key={p.code} className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                                            <span className="text-[10px] text-slate-500 font-semibold">Kod: {p.code} | Kateqoriya: {p.category}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-black text-slate-900 block">{p.totalStock} {p.unit}</span>
                                            {p.totalStock <= p.minStock && (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 mt-1">
                                                    <AlertTriangle size={10} /> Kritik Stok! (Min: {p.minStock})
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* BATCHES TABLE */}
                                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                                        <table className="w-full text-left text-[11px]">
                                            <thead className="bg-slate-100 text-slate-600 font-bold uppercase">
                                                <tr>
                                                    <th className="p-2">Partiya / Sənəd No</th>
                                                    <th className="p-2">Mədaxil Tarixi</th>
                                                    <th className="p-2">Partiya Qalığı</th>
                                                    <th className="p-2">Vahid Maya (Xərc daxil)</th>
                                                    <th className="p-2 text-right">FIFO Çıxarış Növbəsi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 font-medium">
                                                {p.batches.map((b, idx) => (
                                                    <tr key={b.docNo + idx} className={idx === 0 ? 'bg-emerald-50/60' : ''}>
                                                        <td className="p-2 font-bold text-slate-800">{b.docNo}</td>
                                                        <td className="p-2 text-slate-600">{b.date}</td>
                                                        <td className="p-2 font-bold text-slate-900">{b.qty} {p.unit}</td>
                                                        <td className="p-2 text-slate-700 font-bold">{b.costPerUnit.toFixed(2)} AZN</td>
                                                        <td className="p-2 text-right">
                                                            {idx === 0 ? (
                                                                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[9px]">1-ci Çıxacaq Partiya</span>
                                                            ) : (
                                                                <span className="text-slate-400 text-[9px]">Gözləmədə ({idx + 1})</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 2. ANBARA MƏDƏXİLLƏR (INBOUND) */}
            {activeTab === 'inbound' && (
                <div className="space-y-6">

                    {/* MƏDƏXİL FORMASI */}
                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
                        <h3 className="font-bold text-slate-900 text-sm border-b pb-3 flex items-center gap-2">
                            <Plus className="text-blue-600" size={16} /> Yeni Anbar Mədaxil Sənədi Yaradılması
                        </h3>

                        <form onSubmit={handleAddInbound} className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Sənəd No:</label>
                                <input type="text" value={inDocNo} onChange={e => setInDocNo(e.target.value)} className="w-full p-2 border rounded font-bold bg-slate-50" />
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Tarix:</label>
                                <input type="text" value={inDate} onChange={e => setInDate(e.target.value)} className="w-full p-2 border rounded font-semibold" />
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Kontragent (Təchizatçı):</label>
                                <input type="text" placeholder="Şirkət adı" value={inSupplier} onChange={e => setInSupplier(e.target.value)} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Hansı Anbara Daxil Olacaq:</label>
                                <select value={inWarehouse} onChange={e => setInWarehouse(e.target.value)} className="w-full p-2 border rounded bg-slate-50 font-bold">
                                    {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Məhsul Kodu:</label>
                                <input type="text" placeholder="PRD-103" value={inCode} onChange={e => setInCode(e.target.value)} className="w-full p-2 border rounded font-bold" />
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Məhsul Adı:</label>
                                <input type="text" placeholder="Adı daxil edin" value={inName} onChange={e => setInName(e.target.value)} className="w-full p-2 border rounded font-semibold" />
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Ölçü Vahidi:</label>
                                <select value={inUnit} onChange={e => setInUnit(e.target.value)} className="w-full p-2 border rounded bg-slate-50">
                                    <option value="ədəd">ədəd</option>
                                    <option value="qutu">qutu</option>
                                    <option value="kg">kg</option>
                                    <option value="paçka">paçka</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Miqdarı:</label>
                                <input type="number" value={inQty} onChange={e => setInQty(e.target.value)} className="w-full p-2 border rounded font-bold" />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Alış Qiyməti (Vahid):</label>
                                <input type="number" placeholder="0.00 AZN" value={inPrice} onChange={e => setInPrice(e.target.value)} className="w-full p-2 border rounded font-bold" />
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">ƏDV-yə Cəlb Olunur?</label>
                                <select value={inVatSubject ? '1' : '0'} onChange={e => setInVatSubject(e.target.value === '1')} className="w-full p-2 border rounded bg-slate-50 font-bold">
                                    <option value="1">Bəli (18% ƏDV)</option>
                                    <option value="0">Xeyr (ƏDV-siz)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Əlavə Xərc Payı (Nəqliyyat/Gömrük):</label>
                                <input type="number" value={inExtraCost} onChange={e => setInExtraCost(e.target.value)} className="w-full p-2 border rounded font-bold text-purple-700" />
                            </div>

                            <div className="flex items-end">
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition">
                                    + Mədaxili Təsdiqlə
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* MƏDƏXİLLƏR CƏDVƏLİ */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 overflow-x-auto">
                        <h3 className="font-bold text-slate-900 text-sm">Anbara Daxil Olmuş Mədaxil Sənədləri Jurnalı</h3>

                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b">
                                <tr>
                                    <th className="p-3">Sənəd No / Tarix</th>
                                    <th className="p-3">Kontragent</th>
                                    <th className="p-3">Daxil Olan Anbar</th>
                                    <th className="p-3">Kod / Məhsul Adı</th>
                                    <th className="p-3">Miqdar</th>
                                    <th className="p-3">Alış Qiyməti</th>
                                    <th className="p-3">Alış Məbləği</th>
                                    <th className="p-3 text-purple-700">ƏDV (18%)</th>
                                    <th className="p-3 text-purple-700">Əlavə Xərc</th>
                                    <th className="p-3 font-black text-slate-900">Sənəd Üzrə Yekun</th>
                                    <th className="p-3 text-right">Qaytarılan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                                {purchases.map((p) => (
                                    <tr key={p.docNo} className="hover:bg-slate-50 transition">
                                        <td className="p-3 font-bold text-slate-900">{p.docNo} <span className="block text-[10px] text-slate-400 font-normal">{p.date}</span></td>
                                        <td className="p-3 font-semibold text-slate-800">{p.supplier}</td>
                                        <td className="p-3 text-blue-700 font-bold">{p.warehouse}</td>
                                        <td className="p-3">
                                            <span className="font-bold text-slate-800">{p.itemName}</span>
                                            <span className="block text-[10px] text-slate-400">Kod: {p.itemCode}</span>
                                        </td>
                                        <td className="p-3 font-extrabold text-slate-900">{p.qty} {p.unit}</td>
                                        <td className="p-3 font-semibold">{p.buyPrice.toFixed(2)} AZN</td>
                                        <td className="p-3 font-bold">{p.buyAmount.toFixed(2)} AZN</td>
                                        <td className="p-3 text-purple-700 font-semibold">{p.vatAmount.toFixed(2)} AZN</td>
                                        <td className="p-3 text-purple-700 font-bold">{p.extraCostShare.toFixed(2)} AZN</td>
                                        <td className="p-3 font-black text-slate-900">{p.docTotalAmount.toFixed(2)} AZN</td>
                                        <td className="p-3 text-right text-rose-600 font-bold">{p.returnedQty} {p.unit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            )}

            {/* 3. ANBARDAN MƏXARİCLƏR (OUTBOUND / FIFO) */}
            {activeTab === 'outbound' && (
                <div className="space-y-6">

                    {/* MƏXARİC FORMASI */}
                    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
                        <h3 className="font-bold text-slate-900 text-sm border-b pb-3 flex items-center gap-2">
                            <ArrowUpRight className="text-rose-600" size={16} /> Anbardar Məxaric Və FIFO Çıxarış Forması
                        </h3>

                        <form onSubmit={handleAddOutbound} className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Məxaric No:</label>
                                <input type="text" value={outDocNo} onChange={e => setOutDocNo(e.target.value)} className="w-full p-2 border rounded font-bold bg-slate-50" />
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Tarix:</label>
                                <input type="text" value={outDate} onChange={e => setOutDate(e.target.value)} className="w-full p-2 border rounded font-semibold" />
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Hancı Anbardan Çıxır:</label>
                                <select value={outWarehouse} onChange={e => setOutWarehouse(e.target.value)} className="w-full p-2 border rounded bg-slate-50 font-bold">
                                    {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Hara İstifadəyə Verilir / Səbəb:</label>
                                <input type="text" placeholder="Vitrin / FitBar Satışı" value={outDestination} onChange={e => setOutDestination(e.target.value)} className="w-full p-2 border rounded" />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Məhsul Seçin:</label>
                                <select value={outSelectedCode} onChange={e => setOutSelectedCode(e.target.value)} className="w-full p-2 border rounded bg-slate-50 font-bold">
                                    {products.map(p => (
                                        <option key={p.code} value={p.code}>{p.name} (Stok: {p.totalStock} {p.unit})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Məxaric Miqdarı:</label>
                                <input type="number" value={outQty} onChange={e => setOutQty(e.target.value)} className="w-full p-2 border rounded font-bold" />
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-1">Satış Məqsədilədir?</label>
                                <select value={outIsSale ? '1' : '0'} onChange={e => setOutIsSale(e.target.value === '1')} className="w-full p-2 border rounded bg-slate-50 font-bold">
                                    <option value="1">Bəli (Satış Qiyməti Hesablasın)</option>
                                    <option value="0">Xeyr (Daxili İstifadədədir)</option>
                                </select>
                            </div>
                            {outIsSale && (
                                <div>
                                    <label className="block font-bold text-slate-700 mb-1">Satış Qiyməti (Vahid):</label>
                                    <input type="number" value={outSellPrice} onChange={e => setOutSellPrice(e.target.value)} className="w-full p-2 border rounded font-bold text-emerald-700" />
                                </div>
                            )}

                            <div className="md:col-span-4 flex justify-end">
                                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-2 rounded-lg transition shadow-sm">
                                    FIFO Məxarici İcra Et
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* MƏXARİC CƏDVƏLİ */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 overflow-x-auto">
                        <h3 className="font-bold text-slate-900 text-sm">Anbardan Olunmuş Məxariclər Və FIFO Maya Dəyəri Uçotu</h3>

                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100 text-slate-700 font-bold uppercase border-b">
                                <tr>
                                    <th className="p-3">Sənəd No / Tarix</th>
                                    <th className="p-3">Təyinat & Səbəb</th>
                                    <th className="p-3">Çıxan Anbar</th>
                                    <th className="p-3">Kod / Məhsul Adı</th>
                                    <th className="p-3">Miqdar</th>
                                    <th className="p-3 text-rose-600 font-black">Hesablanan FIFO Maya Dəyəri</th>
                                    <th className="p-3 text-emerald-700">Satış Məbləği</th>
                                    <th className="p-3 text-purple-700">Satış ƏDV (18%)</th>
                                    <th className="p-3 text-right font-black text-slate-900">Sənəd Yekunu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                                {outbounds.map((o) => (
                                    <tr key={o.docNo} className="hover:bg-slate-50 transition">
                                        <td className="p-3 font-bold text-slate-900">{o.docNo} <span className="block text-[10px] text-slate-400 font-normal">{o.date}</span></td>
                                        <td className="p-3 font-semibold text-slate-800">{o.destination} <span className="block text-[10px] text-slate-400">{o.reason}</span></td>
                                        <td className="p-3 text-slate-600">{o.fromWarehouse}</td>
                                        <td className="p-3">
                                            <span className="font-bold text-slate-800">{o.itemName}</span>
                                            <span className="block text-[10px] text-slate-400">Kod: {o.itemCode}</span>
                                        </td>
                                        <td className="p-3 font-extrabold text-slate-900">{o.qty} {o.unit}</td>
                                        <td className="p-3 text-rose-600 font-black bg-rose-50/50">{o.fifoCost.toFixed(2)} AZN</td>
                                        <td className="p-3 text-emerald-700 font-bold">{o.sellAmount.toFixed(2)} AZN</td>
                                        <td className="p-3 text-purple-700 font-semibold">{o.vatAmount.toFixed(2)} AZN</td>
                                        <td className="p-3 text-right font-black text-slate-900">{o.docTotalAmount.toFixed(2)} AZN</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            )}

            {/* 4. TƏCHİZATÇIYA GERİ QAYTARILMA (PURCHASE RETURN) */}
            {activeTab === 'return' && (
                <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4 overflow-x-auto">
                    <h3 className="font-bold text-slate-900 text-sm">Geri Qaytarılmanı Nəzərə Al (Təchizatçıya Malın Qaytarılması)</h3>
                    <p className="text-xs text-slate-500">Daxil olunmuş mədaxil sənədlərindən zay və ya uyğun olmayan malların geri qaytarılması:</p>

                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-700 font-bold uppercase border-b">
                            <tr>
                                <th className="p-3">Sənəd No</th>
                                <th className="p-3">Təchizatçı</th>
                                <th className="p-3">Məhsul</th>
                                <th className="p-3">İlkin Alış Miqdarı</th>
                                <th className="p-3 text-rose-600">Qaytarılan Miqdar</th>
                                <th className="p-3">Qalıq Qaytarıla Bilən</th>
                                <th className="p-3 text-right">Əməliyyat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {purchases.map((p) => {
                                const availableReturn = p.qty - p.returnedQty;
                                return (
                                    <tr key={p.docNo} className="hover:bg-slate-50 transition">
                                        <td className="p-3 font-bold text-slate-900">{p.docNo}</td>
                                        <td className="p-3 font-semibold text-slate-800">{p.supplier}</td>
                                        <td className="p-3 font-bold text-slate-800">{p.itemName}</td>
                                        <td className="p-3 font-bold text-slate-900">{p.qty} {p.unit}</td>
                                        <td className="p-3 text-rose-600 font-bold">{p.returnedQty} {p.unit}</td>
                                        <td className="p-3 text-emerald-700 font-bold">{availableReturn} {p.unit}</td>
                                        <td className="p-3 text-right">
                                            {availableReturn > 0 ? (
                                                <button
                                                    onClick={() => {
                                                        const qty = prompt(`Neçə ${p.unit} geri qaytarılsın? (Maks: ${availableReturn})`);
                                                        if (qty) handleReturnItem(p.docNo, qty);
                                                    }}
                                                    className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-xs font-bold transition"
                                                >
                                                    Təchizatçıya Qaytar
                                                </button>
                                            ) : (
                                                <span className="text-slate-400 font-bold text-[10px]">Tam Qaytarılıb</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}