import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Plus, Minus, Trash2, CreditCard, DollarSign, 
  User, Check, Receipt, Coffee, Sparkles, Dumbbell, Scissors, HandHeart, 
  Tag, Download, FileText, ArrowRight, ShieldCheck, Clock, QrCode, FileCheck, 
  Package, Info, X, Wallet, History, Split, Filter, Flame, Apple, Bath,
  Edit3, Percent, MessageSquare, Car, Ticket, AlertCircle, Printer, Calendar, RefreshCw, Eye
} from 'lucide-react';

const initialProducts = [
  // FITBAR / ANBAR MƏHSULLARI
  { id: 'PRD-101', name: 'Whey Protein Shake (ISO-100)', category: 'fitbar', subcategory: 'drinks', gender: 'all', price: 8.00, stock: 45, icon: '🥤' },
  { id: 'PRD-102', name: 'BCAA Energy Drink 500ml', category: 'fitbar', subcategory: 'drinks', gender: 'all', price: 4.50, stock: 80, icon: '⚡' },
  { id: 'PRD-103', name: 'Protein Bar (Caramel & Peanut)', category: 'fitbar', subcategory: 'bars', gender: 'all', price: 3.50, stock: 120, icon: '🍫' },
  { id: 'PRD-104', name: 'Makfit Brend Su 0.5L', category: 'fitbar', subcategory: 'drinks', gender: 'all', price: 1.00, stock: 200, icon: '💧' },
  { id: 'PRD-105', name: 'Pre-Workout Shot (Lime)', category: 'fitbar', subcategory: 'drinks', gender: 'all', price: 5.00, stock: 35, icon: '🧪' },
  { id: 'PRD-106', name: 'Makfit İdman Dəsmalı (VIP)', category: 'fitbar', subcategory: 'accessories', gender: 'all', price: 25.00, stock: 15, icon: '🧴' },

  // XİDMƏTLƏR VƏ PAKETLƏR / KURS
  { id: 'SRV-201', name: '12 Seans Qadın PT Fərdi Məşq Kursu', category: 'services', subcategory: 'pt', gender: 'female', price: 600.00, stock: 999, icon: '🏋️‍♀️' },
  { id: 'SRV-202', name: '12 Seans Kişi PT Fərdi Məşq Kursu', category: 'services', subcategory: 'pt', gender: 'male', price: 600.00, stock: 999, icon: '🏋️‍♂️' },
  { id: 'SRV-203', name: 'Qadın Anti-Cellulite Masajı (60 Dəq)', category: 'services', subcategory: 'spa', gender: 'female', price: 75.00, stock: 999, icon: '💆‍♀️' },
  { id: 'SRV-204', name: 'Kişi İdman/Relax Masajı (60 Dəq)', category: 'services', subcategory: 'spa', gender: 'male', price: 70.00, stock: 999, icon: '🤲' },
  { id: 'SRV-205', name: 'VIP Kişi Saç Kəsimi & Saqqal', category: 'services', subcategory: 'salon', gender: 'male', price: 35.00, stock: 999, icon: '✂️' },
  { id: 'SRV-206', name: 'Gözəllik Salonu Manikür & Bakım', category: 'services', subcategory: 'salon', gender: 'female', price: 30.00, stock: 999, icon: '✨' },
  { id: 'SRV-207', name: 'InBody Bədən Analizi (Ümumi)', category: 'services', subcategory: 'other', gender: 'all', price: 15.00, stock: 999, icon: '📊' },
  { id: 'SRV-208', name: 'Paket Dondurma Rüsumu (7 Gün)', category: 'services', subcategory: 'other', gender: 'all', price: 20.00, stock: 999, icon: '❄️' },

  // VOUCHER MƏHSULLARI
  { id: 'VCH-PRD-01', name: 'Hədiyyə Vauçeri — 1 Aylıq VIP', category: 'vouchers', subcategory: 'gift', gender: 'all', price: 180.00, stock: 50, icon: '🎟️' },
  { id: 'VCH-PRD-02', name: 'Guest Pass Voucher (3-lü Pack)', category: 'vouchers', subcategory: 'gift', gender: 'all', price: 45.00, stock: 100, icon: '🎫' },
  { id: 'VCH-PRD-03', name: 'SPA & Masaj Hədiyyə Vauçeri', category: 'vouchers', subcategory: 'gift', gender: 'all', price: 70.00, stock: 30, icon: '🎁' }
];

const mockClients = [
  { 
    id: 'MK-1042', 
    name: 'Ayan Xəlilova', 
    phone: '+994 50 123 45 67', 
    discount: 10, 
    balance: 350.00, 
    membership: 'VIP Gold Limitsiz (1 İllik)',
    purchaseHistory: [
      { id: 'TR-9011', date: '2026-11-06 | 14:35', item: 'Whey Protein + BCAA Drink', amount: '12.50 AZN', method: 'POS Kart' },
      { id: 'TR-8920', date: '2026-11-04 | 17:00', item: 'Relax Masajı (60 Dəq)', amount: '50.00 AZN', method: 'POS Kart' },
      { id: 'TR-8812', date: '2026-10-15 | 11:20', item: '12 Seans PT Fərdi Məşq Kursu', amount: '600.00 AZN', method: 'Bank Transferi' }
    ]
  },
  { 
    id: 'MK-1089', 
    name: 'Kamran Alıyev', 
    phone: '+994 55 444 55 66', 
    discount: 0, 
    balance: 0.00, 
    membership: 'Standart (6 Aylıq)',
    purchaseHistory: [
      { id: 'TR-6102', date: '2026-06-01 | 12:00', item: 'Standart Paket (6 Aylıq)', amount: '620.00 AZN', method: 'Nağd (Cash)' }
    ]
  },
  { 
    id: 'MK-1102', 
    name: 'Rauf Hüseynov', 
    phone: '+994 70 333 22 11', 
    discount: 0, 
    balance: 0.00, 
    membership: 'Gündüz Tarifi (3 Aylıq)',
    purchaseHistory: [
      { id: 'TR-4001', date: '2026-01-01 | 11:00', item: 'Gündüz Tarifi (3 Aylıq)', amount: '310.00 AZN', method: 'POS Kart' }
    ]
  }
];

const initialReceiptsHistory = [
  {
    orderId: 'CHK-894201',
    date: '2026-11-06',
    time: '16:40',
    client: 'Ayan Xəlilova',
    clientId: 'MK-1042',
    processedBy: 'Ayan X. (Supervisor)',
    items: [
      { name: 'Whey Protein Shake (ISO-100)', qty: 2, price: 8.00 },
      { name: 'Protein Bar (Caramel & Peanut)', qty: 1, price: 3.50 }
    ],
    subtotal: '19.50',
    discountPercent: 10,
    discount: '1.95',
    total: '17.55',
    paymentMethod: 'POS Kart',
    comment: 'İdmandan sonra FitBar satışı',
    isFiscalized: true,
    fiscalId: 'FISC-90481234'
  },
  {
    orderId: 'CHK-894198',
    date: '2026-11-06',
    time: '14:15',
    client: 'Kamran Alıyev',
    clientId: 'MK-1089',
    processedBy: 'Elcan M. (Kassir)',
    items: [
      { name: '12 Seans Kişi PT Fərdi Məşq Kursu', qty: 1, price: 600.00, carPlates: ['99-MK-100'] }
    ],
    subtotal: '600.00',
    discountPercent: 0,
    discount: '0.00',
    total: '600.00',
    paymentMethod: 'Bank Transferi',
    comment: 'PT kurs ödənişi tam edildi',
    isFiscalized: true,
    fiscalId: 'FISC-55102934'
  },
  {
    orderId: 'CHK-881200',
    date: '2026-11-05',
    time: '11:20',
    client: 'Rauf Hüseynov',
    clientId: 'MK-1102',
    processedBy: 'Ayan X. (Supervisor)',
    items: [
      { name: 'Kişi İdman/Relax Masajı (60 Dəq)', qty: 1, price: 70.00 }
    ],
    subtotal: '70.00',
    discountPercent: 0,
    discount: '0.00',
    total: '70.00',
    paymentMethod: 'Nağd (Cash)',
    comment: 'SPA masaj seansı',
    isFiscalized: true,
    fiscalId: 'FISC-11209348'
  }
];

export default function POS() {
  const [activeMainTab, setActiveMainTab] = useState('pos'); 

  const [categoryTab, setCategoryTab] = useState('all'); 
  const [subFilter, setSubFilter] = useState('all'); 
  const [genderFilter, setGenderFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  
  // MÜŞTƏRİ AXTARIŞI
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // MÜŞTƏRİ INFO MODAL
  const [infoClientModal, setInfoClientModal] = useState(null);

  // ENDİRİM VƏ ŞƏRH
  const [customDiscountType, setCustomDiscountType] = useState('percent'); 
  const [customDiscountValue, setCustomDiscountValue] = useState('');
  const [orderComment, setOrderComment] = useState('');

  // ÖDƏNİŞ SİSTEMİ
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isFiscalize, setIsFiscalize] = useState(true);

  // VAUÇER İLƏ ÖDƏNİŞ SİSTEMİ
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState('');
  
  // QARIŞIQ (SPLIT) ÖDƏNİŞ STATE-İ (BƏRPA OLUNDU!)
  const [splitAmounts, setSplitAmounts] = useState({ card: '', cash: '', deposit: '', transfer: '', voucher: '' });

  // ÇEK VƏ ARXİV SİSTEMİ STATE-LƏRİ
  const [receiptsHistory, setReceiptsHistory] = useState(initialReceiptsHistory);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // ARXİV ÇEKLƏRİ FİLTRASİYA STATE-LƏRİ
  const [historySearchClient, setHistorySearchClient] = useState('');
  const [historySearchCashier, setHistorySearchCashier] = useState('');
  const [historySearchProduct, setHistorySearchProduct] = useState('');
  const [historySearchPayment, setHistorySearchPayment] = useState('all');
  const [historyDateStart, setHistoryDateStart] = useState('');
  const [historyDateEnd, setHistoryDateEnd] = useState('');

  const fontDisplayStyle = { fontFamily: "'Archivo Expanded', sans-serif", letterSpacing: '-0.02em' };
  const fontTextStyle = { fontFamily: "'TikTok Sans', system-ui, -apple-system, sans-serif", letterSpacing: '-0.01em' };

  const filterByQuerySubAndGender = (item) => {
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSub = subFilter === 'all' || item.subcategory === subFilter;
    const matchesGender = genderFilter === 'all' || item.gender === 'all' || item.gender === genderFilter;
    
    return matchesQuery && matchesSub && matchesGender;
  };

  const fitbarProducts = initialProducts.filter(item => item.category === 'fitbar' && filterByQuerySubAndGender(item));
  const serviceProducts = initialProducts.filter(item => item.category === 'services' && filterByQuerySubAndGender(item));
  const voucherProducts = initialProducts.filter(item => item.category === 'vouchers' && filterByQuerySubAndGender(item));

  const filteredClients = mockClients.filter(c => 
    c.name.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
    c.phone.includes(clientSearchQuery) ||
    c.id.toLowerCase().includes(clientSearchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { 
        ...product, 
        qty: 1, 
        carPlates: product.category === 'services' ? [''] : []
      }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const updateCustomPrice = (id, newPrice) => {
    const parsedPrice = parseFloat(newPrice);
    setCart(cart.map(item => {
      if (item.id === id) {
        return { ...item, price: isNaN(parsedPrice) ? 0 : parsedPrice };
      }
      return item;
    }));
  };

  const handleAddPlateField = (id) => {
    setCart(cart.map(item => {
      if (item.id === id && item.carPlates.length < 2) {
        return { ...item, carPlates: [...item.carPlates, ''] };
      }
      return item;
    }));
  };

  const handleRemovePlateField = (id, index) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const updated = [...item.carPlates];
        updated.splice(index, 1);
        return { ...item, carPlates: updated };
      }
      return item;
    }));
  };

  const handlePlateChange = (id, index, value) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const updated = [...item.carPlates];
        updated[index] = value.toUpperCase();
        return { ...item, carPlates: updated };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  let calculatedDiscount = 0;
  let discountPercentCalc = 0;

  if (paymentMethod === 'voucher' && appliedVoucher && appliedVoucher.isValid) {
    calculatedDiscount = (subtotal * appliedVoucher.discountPercent) / 100;
    discountPercentCalc = appliedVoucher.discountPercent;
  } else if (customDiscountValue && !isNaN(parseFloat(customDiscountValue))) {
    const val = parseFloat(customDiscountValue);
    if (customDiscountType === 'percent') {
      calculatedDiscount = (subtotal * val) / 100;
      discountPercentCalc = val;
    } else {
      calculatedDiscount = val;
      discountPercentCalc = subtotal > 0 ? ((val / subtotal) * 100).toFixed(0) : 0;
    }
  } else if (selectedClient && selectedClient.discount > 0) {
    calculatedDiscount = (subtotal * selectedClient.discount) / 100;
    discountPercentCalc = selectedClient.discount;
  }

  const total = Math.max(0, subtotal - calculatedDiscount);

  // SPLIT PAYMENTS MƏBLƏĞ HESABLANMASI
  const totalSplitEntered = (parseFloat(splitAmounts.card) || 0) + 
                            (parseFloat(splitAmounts.cash) || 0) + 
                            (parseFloat(splitAmounts.deposit) || 0) + 
                            (parseFloat(splitAmounts.transfer) || 0) +
                            (parseFloat(splitAmounts.voucher) || 0);

  const splitRemaining = total - totalSplitEntered;

  const handleVerifyVoucher = () => {
    setVoucherError('');
    const cleanCode = voucherCodeInput.trim().toUpperCase();

    if (!cleanCode) {
      setVoucherError('Zəhmət olmasa vauçer kodunu daxil edin.');
      return;
    }

    if (cleanCode === 'VCH-2026-X89' || cleanCode === 'VCH-CORP-99' || cleanCode === 'PROMO100') {
      setAppliedVoucher({ code: cleanCode, discountPercent: 100, isValid: true, type: '100% Promo Vauçer' });
    } else if (cleanCode === 'VCH-50') {
      setAppliedVoucher({ code: cleanCode, discountPercent: 50, isValid: true, type: '50% Endirim Vauçeri' });
    } else {
      setVoucherError('Daxil edilən vauçer kodu tapılmadı və ya vaxtı bitib!');
      setAppliedVoucher(null);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (paymentMethod === 'split' && Math.abs(totalSplitEntered - total) > 0.01) {
      alert(`Daxil edilən məbləğlərin cəmi (${totalSplitEntered.toFixed(2)} AZN) yekun ödəniləcək məbləğə (${total.toFixed(2)} AZN) bərabər olmalıdır!`);
      return;
    }

    if (paymentMethod === 'voucher' && (!appliedVoucher || !appliedVoucher.isValid)) {
      alert('Lütfən geçerli bir vauçer kodu daxil edib yoxlayın!');
      return;
    }

    const fiscalId = isFiscalize ? `FISC-${Math.floor(10000000 + Math.random() * 90000000)}` : null;

    let paymentMethodText = '';
    if (paymentMethod === 'card') paymentMethodText = 'POS Kart';
    else if (paymentMethod === 'cash') paymentMethodText = 'Nağd (Cash)';
    else if (paymentMethod === 'deposit') paymentMethodText = 'Müştəri Depoziti';
    else if (paymentMethod === 'transfer') paymentMethodText = 'Bank Transferi';
    else if (paymentMethod === 'voucher') paymentMethodText = `Vauçer Ödənişi (${appliedVoucher ? appliedVoucher.code : ''})`;
    else if (paymentMethod === 'split') {
      const parts = [];
      if (parseFloat(splitAmounts.card) > 0) parts.push(`${parseFloat(splitAmounts.card).toFixed(2)} AZN (POS Kart)`);
      if (parseFloat(splitAmounts.cash) > 0) parts.push(`${parseFloat(splitAmounts.cash).toFixed(2)} AZN (Nağd)`);
      if (parseFloat(splitAmounts.deposit) > 0) parts.push(`${parseFloat(splitAmounts.deposit).toFixed(2)} AZN (Depozit)`);
      if (parseFloat(splitAmounts.transfer) > 0) parts.push(`${parseFloat(splitAmounts.transfer).toFixed(2)} AZN (Transfer)`);
      if (parseFloat(splitAmounts.voucher) > 0) parts.push(`${parseFloat(splitAmounts.voucher).toFixed(2)} AZN (Vauçer)`);
      paymentMethodText = `Qarışıq: ${parts.join(' + ')}`;
    }

    const now = new Date();
    const orderData = {
      orderId: `CHK-${Math.floor(100000 + Math.random() * 900000)}`,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' }),
      client: selectedClient ? selectedClient.name : 'Ümumi / Anonim Müştəri',
      clientId: selectedClient ? selectedClient.id : 'N/A',
      items: cart.map(item => ({
        ...item,
        carPlates: item.carPlates ? item.carPlates.filter(p => p.trim() !== '') : []
      })),
      subtotal: subtotal.toFixed(2),
      discountPercent: discountPercentCalc,
      discount: calculatedDiscount.toFixed(2),
      total: total.toFixed(2),
      paymentMethod: paymentMethodText,
      voucherCode: (paymentMethod === 'voucher' && appliedVoucher) ? appliedVoucher.code : null,
      processedBy: 'Ayan X. (Supervisor)',
      comment: orderComment.trim(),
      isFiscalized: isFiscalize,
      fiscalId: fiscalId
    };

    setReceiptsHistory([orderData, ...receiptsHistory]);
    setCompletedOrder(orderData);
    setShowReceiptModal(true);
    setCart([]);
    setSelectedClient(null);
    setClientSearchQuery('');
    setCustomDiscountValue('');
    setOrderComment('');
    setVoucherCodeInput('');
    setAppliedVoucher(null);
    setSplitAmounts({ card: '', cash: '', deposit: '', transfer: '', voucher: '' });
  };

  const filteredReceiptsHistory = receiptsHistory.filter(receipt => {
    const matchesClient = !historySearchClient || 
      receipt.client.toLowerCase().includes(historySearchClient.toLowerCase()) || 
      receipt.clientId.toLowerCase().includes(historySearchClient.toLowerCase());

    const matchesCashier = !historySearchCashier || 
      receipt.processedBy.toLowerCase().includes(historySearchCashier.toLowerCase());

    const matchesProduct = !historySearchProduct || 
      receipt.items.some(item => item.name.toLowerCase().includes(historySearchProduct.toLowerCase()));

    const matchesPayment = historySearchPayment === 'all' || 
      receipt.paymentMethod.toLowerCase().includes(historySearchPayment.toLowerCase());

    const matchesDateStart = !historyDateStart || receipt.date >= historyDateStart;
    const matchesDateEnd = !historyDateEnd || receipt.date <= historyDateEnd;

    return matchesClient && matchesCashier && matchesProduct && matchesPayment && matchesDateStart && matchesDateEnd;
  });

  const resetHistoryFilters = () => {
    setHistorySearchClient('');
    setHistorySearchCashier('');
    setHistorySearchProduct('');
    setHistorySearchPayment('all');
    setHistoryDateStart('');
    setHistoryDateEnd('');
  };

  const renderProductCard = (product) => (
    <div 
      key={product.id}
      onClick={() => addToCart(product)}
      className="bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-blue-400 p-3 rounded-2xl transition cursor-pointer flex flex-col justify-between shadow-2xs hover:shadow-md group relative overflow-hidden"
    >
      {product.category === 'vouchers' && (
        <span className="absolute top-0 right-0 bg-purple-600 text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
          Vauçer
        </span>
      )}

      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-2xl">{product.icon}</span>
          <div className="flex items-center gap-1">
            {product.gender === 'female' && <span className="bg-pink-100 text-pink-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">Qadın</span>}
            {product.gender === 'male' && <span className="bg-blue-100 text-blue-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">Kişi</span>}
            <span style={fontDisplayStyle} className="text-[9px] font-black text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-slate-200">
              {product.id}
            </span>
          </div>
        </div>
        <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-xs line-clamp-2 leading-tight group-hover:text-blue-600">
          {product.name}
        </h4>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between">
        <span style={fontDisplayStyle} className="text-xs font-black text-slate-900">{product.price.toFixed(2)} AZN</span>
        <button style={fontTextStyle} className="px-2 py-1 bg-blue-600 text-white rounded-lg font-extrabold text-[10px] group-hover:bg-blue-700 transition cursor-pointer shadow-xs">
          + Əlavə Et
        </button>
      </div>
    </div>
  );

  return (
    <div style={fontTextStyle} className="min-h-screen w-full bg-[#F8FAFC] text-slate-800 flex flex-col font-sans select-none overflow-y-auto">
      
      {/* 1. HEADER BAR & NAVIGATION TABS */}
      <div className="bg-white border-b border-slate-200/90 px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 shadow-2xs sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div style={fontDisplayStyle} className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-xs">
            <ShoppingCart size={18} />
          </div>
          <div>
            <h3 style={fontDisplayStyle} className="font-black text-slate-900 text-xs tracking-wider uppercase">
              MAKFIT — POS / Kassa & Satış Paneli
            </h3>
            <p style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">FitBar, Xidmət, PT və Çeklərin Canlı Arxivi</p>
          </div>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveMainTab('pos')}
            style={fontTextStyle}
            className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'pos' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ShoppingCart size={14} />
            <span>Kassa & Satış (POS)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('history')}
            style={fontTextStyle}
            className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'history' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Receipt size={14} />
            <span>🧾 Vurulan Çeklər (Arxiv)</span>
            <span style={fontDisplayStyle} className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
              activeMainTab === 'history' ? 'bg-white text-blue-600' : 'bg-slate-200 text-slate-700'
            }`}>
              {receiptsHistory.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span style={fontTextStyle} className="text-emerald-900 font-bold">Kassa: <strong className="text-emerald-600 font-black">Açıq (Ayan X.)</strong></span>
        </div>
      </div>

      {/* 2. MAIN CONTENT TAB 1: POS KASSA */}
      {activeMainTab === 'pos' && (
        <div className="flex-1 flex flex-col lg:flex-row p-2 gap-2 animate-in fade-in duration-150">
          
          {/* SOL TƏRƏF: KATALOG */}
          <div className="flex-1 flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
            
            <div className="p-3 border-b border-slate-200/80 space-y-2 shrink-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
                  <input 
                    style={fontTextStyle}
                    type="text" 
                    placeholder="Məhsul, vauçer və ya xidmət axtar..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs font-extrabold bg-slate-50 focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold w-full sm:w-auto justify-center">
                  <button 
                    onClick={() => { setCategoryTab('all'); setSubFilter('all'); }}
                    style={fontTextStyle}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer font-extrabold ${categoryTab === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Hamısı (Sütunlar)
                  </button>
                  <button 
                    onClick={() => { setCategoryTab('fitbar'); setSubFilter('all'); }}
                    style={fontTextStyle}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 font-extrabold ${categoryTab === 'fitbar' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <Coffee size={12} /> FitBar & Stok
                  </button>
                  <button 
                    onClick={() => { setCategoryTab('services'); setSubFilter('all'); }}
                    style={fontTextStyle}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 font-extrabold ${categoryTab === 'services' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <Sparkles size={12} /> Xidmətlər / Kurs
                  </button>
                  <button 
                    onClick={() => { setCategoryTab('vouchers'); setSubFilter('all'); }}
                    style={fontTextStyle}
                    className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 font-extrabold ${categoryTab === 'vouchers' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <Ticket size={12} /> Vauçerlər
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-[10px] font-bold">
                <button 
                  onClick={() => setSubFilter('all')}
                  style={fontTextStyle}
                  className={`px-2.5 py-1 rounded-lg border transition cursor-pointer whitespace-nowrap font-extrabold ${
                    subFilter === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Bütün Sub-Segmentlər
                </button>

                {(categoryTab === 'all' || categoryTab === 'fitbar') && (
                  <>
                    <button 
                      onClick={() => setSubFilter('drinks')}
                      style={fontTextStyle}
                      className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap font-extrabold ${
                        subFilter === 'drinks' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      🥤 İçkilər & Şeyklər
                    </button>
                    <button 
                      onClick={() => setSubFilter('bars')}
                      style={fontTextStyle}
                      className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap font-extrabold ${
                        subFilter === 'bars' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      🍫 Qidalanma & Barlar
                    </button>
                  </>
                )}

                {(categoryTab === 'all' || categoryTab === 'services') && (
                  <>
                    <button 
                      onClick={() => setSubFilter('pt')}
                      style={fontTextStyle}
                      className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap font-extrabold ${
                        subFilter === 'pt' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      🏋️ Fərdi Məşq (PT Kurs)
                    </button>
                    <button 
                      onClick={() => setSubFilter('spa')}
                      style={fontTextStyle}
                      className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap font-extrabold ${
                        subFilter === 'spa' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      🤲 Spa & Masaj
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 min-h-[400px]">
              {categoryTab === 'all' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-3 flex flex-col space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span style={fontDisplayStyle} className="font-black text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Coffee size={15} className="text-amber-600" /> FitBar & Anbar
                      </span>
                      <span style={fontTextStyle} className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-md">
                        {fitbarProducts.length} Məhsul
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">{fitbarProducts.map(renderProductCard)}</div>
                  </div>

                  <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-3 flex flex-col space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span style={fontDisplayStyle} className="font-black text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles size={15} className="text-purple-600" /> Xidmətlər / Kurs
                      </span>
                      <span style={fontTextStyle} className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-md">
                        {serviceProducts.length} Xidmət
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">{serviceProducts.map(renderProductCard)}</div>
                  </div>

                  <div className="bg-purple-50/40 border border-purple-200 rounded-2xl p-3 flex flex-col space-y-3">
                    <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                      <span style={fontDisplayStyle} className="font-black text-purple-900 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                        <Ticket size={15} className="text-purple-700" /> Satış Vauçerləri
                      </span>
                      <span style={fontTextStyle} className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-md">
                        {voucherProducts.length} Vauçer
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">{voucherProducts.map(renderProductCard)}</div>
                  </div>
                </div>
              )}

              {categoryTab === 'fitbar' && <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">{fitbarProducts.map(renderProductCard)}</div>}
              {categoryTab === 'services' && <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">{serviceProducts.map(renderProductCard)}</div>}
              {categoryTab === 'vouchers' && <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">{voucherProducts.map(renderProductCard)}</div>}
            </div>

          </div>

          {/* SAĞ TƏRƏF: KASSA SƏBƏTİ */}
          <div className="w-full lg:w-96 bg-white border border-slate-200/90 rounded-2xl flex flex-col overflow-hidden shadow-2xs shrink-0">
            
            <div className="p-3 border-b border-slate-200/80 bg-slate-50 space-y-2 relative shrink-0">
              <label style={fontTextStyle} className="font-black text-slate-900 text-[11px] uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5"><User size={13} /> Müştəri İnteqrasiyası</span>
                {selectedClient && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setInfoClientModal(selectedClient)}
                      style={fontTextStyle}
                      className="text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded-md font-extrabold text-[10px] flex items-center gap-1 transition cursor-pointer border border-blue-200"
                    >
                      <Info size={11} /> Info
                    </button>
                    <button 
                      onClick={() => { setSelectedClient(null); setClientSearchQuery(''); }} 
                      style={fontTextStyle}
                      className="text-rose-600 hover:underline text-[10px] font-extrabold cursor-pointer"
                    >
                      Ləğv Et
                    </button>
                  </div>
                )}
              </label>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 text-slate-400" size={13} />
                <input 
                  style={fontTextStyle}
                  type="text" 
                  placeholder="Müştəri axtar (Ad, Tel, ID)..."
                  value={selectedClient ? `${selectedClient.name} (${selectedClient.id})` : clientSearchQuery}
                  onFocus={() => setShowClientDropdown(true)}
                  onChange={e => {
                    setClientSearchQuery(e.target.value);
                    setSelectedClient(null);
                    setShowClientDropdown(true);
                  }}
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl bg-white font-extrabold text-xs text-slate-800 outline-none focus:border-blue-500 transition"
                />

                {showClientDropdown && !selectedClient && (
                  <div className="absolute left-0 right-0 top-10 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 max-h-56 overflow-y-auto p-1 space-y-0.5">
                    <div 
                      onClick={() => { setSelectedClient(null); setShowClientDropdown(false); setClientSearchQuery(''); }}
                      style={fontTextStyle}
                      className="p-2 hover:bg-slate-100 rounded-xl cursor-pointer text-xs font-bold text-slate-500 border-b border-slate-100"
                    >
                      -- Ümumi / Anonim Müştəri --
                    </div>
                    {filteredClients.map(c => (
                      <div key={c.id} onClick={() => { setSelectedClient(c); setShowClientDropdown(false); }} className="p-2 hover:bg-slate-100 rounded-xl cursor-pointer text-xs flex items-center justify-between transition">
                        <div>
                          <span style={fontTextStyle} className="font-black text-slate-900">{c.name}</span>
                          <span style={fontTextStyle} className="text-[10px] text-slate-500 font-bold block">{c.phone}</span>
                        </div>
                        <span style={fontDisplayStyle} className="text-[10px] text-emerald-700 font-black">{c.balance.toFixed(2)} AZN</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedClient && (
                <div style={fontTextStyle} className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-[10px] text-emerald-900 font-extrabold flex justify-between items-center">
                  <span>VIP Endirim: <strong>{selectedClient.discount}%</strong></span>
                  <span>Depozit: <strong>{selectedClient.balance.toFixed(2)} AZN</strong></span>
                </div>
              )}
            </div>

            <div className="p-3 border-b border-slate-200 flex flex-col min-h-[180px] max-h-[300px] shrink-0 bg-slate-50/50">
              <div className="bg-white p-2 rounded-xl border border-slate-200/80 mb-2 flex items-center justify-between shrink-0 shadow-2xs">
                <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                  <ShoppingCart size={13} className="text-blue-600" /> Səbətdəki Maddələr
                </h4>
                <span style={fontDisplayStyle} className="text-[10px] bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg font-black border border-slate-200">
                  {cart.length} Ədəd
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {cart.length === 0 ? (
                  <div className="h-full min-h-[140px] flex flex-col items-center justify-center text-slate-400 space-y-1.5 border-2 border-dashed border-slate-200 rounded-2xl bg-white/60">
                    <ShoppingCart size={28} className="text-slate-300" />
                    <p style={fontTextStyle} className="text-xs font-extrabold text-slate-600">Səbət hazırda boşdur</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <h5 style={fontTextStyle} className="font-extrabold text-slate-900 truncate flex-1 pr-2">{item.name}</h5>
                        <button onClick={() => removeFromCart(item.id)} className="p-1 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer">
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {item.category === 'services' && (
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 space-y-1.5 text-[10px]">
                          <div className="flex items-center justify-between text-slate-700 font-bold">
                            <span style={fontTextStyle} className="flex items-center gap-1 text-slate-800 font-extrabold">
                              <Car size={12} className="text-blue-600" /> Avto Nömrə:
                            </span>
                            {item.carPlates.length < 2 && (
                              <button onClick={() => handleAddPlateField(item.id)} className="px-2 py-0.5 bg-blue-600 text-white rounded-md font-extrabold text-[9px]">
                                + Əlavə Et
                              </button>
                            )}
                          </div>
                          {item.carPlates.map((plate, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-1">
                              <input 
                                style={fontDisplayStyle}
                                type="text" 
                                placeholder="99-XX-000"
                                value={plate}
                                onChange={(e) => handlePlateChange(item.id, pIdx, e.target.value)}
                                className="flex-1 px-2 py-0.5 border border-slate-200 rounded-lg text-xs font-black uppercase text-slate-900 bg-white"
                              />
                              {pIdx > 0 && <button onClick={() => handleRemovePlateField(item.id, pIdx)} className="text-rose-500"><X size={12} /></button>}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 text-xs pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5">
                          <input 
                            style={fontDisplayStyle}
                            type="number" 
                            step="0.5"
                            value={item.price}
                            onChange={(e) => updateCustomPrice(item.id, e.target.value)}
                            className="w-14 font-black text-slate-900 text-xs bg-transparent outline-none text-right"
                          />
                          <span style={fontTextStyle} className="text-[9px] font-bold text-slate-400">AZN</span>
                        </div>

                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                          <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white rounded text-slate-600 cursor-pointer"><Minus size={11} /></button>
                          <span style={fontDisplayStyle} className="px-1.5 font-black text-slate-900 text-xs">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-white rounded text-slate-600 cursor-pointer"><Plus size={11} /></button>
                        </div>

                        <span style={fontDisplayStyle} className="font-black text-slate-900 text-xs bg-slate-100 px-2 py-0.5 rounded-md">
                          {(item.price * item.qty).toFixed(2)} AZN
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50 space-y-2 shrink-0">
              
              {/* ENDİRİM VƏ QEYD */}
              <div className="bg-white p-2 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-700">
                  <span style={fontTextStyle} className="flex items-center gap-1 font-extrabold"><Percent size={11} className="text-purple-600" /> Endirim:</span>
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    <button onClick={() => setCustomDiscountType('percent')} style={fontDisplayStyle} className={`px-1.5 py-0.5 rounded font-black ${customDiscountType === 'percent' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>%</button>
                    <button onClick={() => setCustomDiscountType('azn')} style={fontDisplayStyle} className={`px-1.5 py-0.5 rounded font-black ${customDiscountType === 'azn' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>AZN</button>
                  </div>
                </div>
                <input 
                  style={fontTextStyle}
                  type="number" 
                  placeholder={customDiscountType === 'percent' ? "Endirim % (məs: 15)" : "Endirim AZN (məs: 5.00)"}
                  value={customDiscountValue}
                  onChange={e => setCustomDiscountValue(e.target.value)}
                  className="w-full p-1 border border-slate-200 rounded-lg text-xs font-extrabold bg-slate-50 outline-none"
                />
              </div>

              {/* FISCALIZE TOGGLE */}
              <div className="bg-white p-1.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <span style={fontTextStyle} className="font-extrabold text-slate-800 text-[10px] flex items-center gap-1.5">
                  <FileCheck size={13} className={isFiscalize ? 'text-emerald-600' : 'text-slate-400'} /> Fiskallaşdır
                </span>
                <input type="checkbox" checked={isFiscalize} onChange={e => setIsFiscalize(e.target.checked)} className="cursor-pointer" />
              </div>

              {/* ÖDƏNİŞ METODLARI */}
              <div className="grid grid-cols-3 gap-1 text-[10px] font-bold">
                {[
                  { id: 'card', label: 'POS Kart', icon: CreditCard },
                  { id: 'cash', label: 'Nağd', icon: DollarSign },
                  { id: 'deposit', label: 'Depozit', icon: Tag },
                  { id: 'transfer', label: 'Transfer', icon: Receipt },
                  { id: 'voucher', label: '🎟️ Vauçer', icon: Ticket },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    style={fontTextStyle}
                    className={`p-1.5 rounded-xl border flex items-center gap-1.5 transition cursor-pointer font-extrabold ${
                      paymentMethod === m.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    <m.icon size={12} /> <span className="truncate">{m.label}</span>
                  </button>
                ))}

                {/* QARIŞIQ ÖDƏNİŞ DÜYMƏSİ (SPLIT) */}
                <button
                  onClick={() => setPaymentMethod('split')}
                  style={fontTextStyle}
                  className={`p-1.5 rounded-xl border flex items-center justify-center gap-1 transition text-[10px] font-extrabold cursor-pointer ${
                    paymentMethod === 'split' 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Split size={12} />
                  <span>Qarışıq</span>
                </button>
              </div>

              {/* VAUÇER KODU QUTUSU */}
              {paymentMethod === 'voucher' && (
                <div className="bg-purple-50 border border-purple-200 p-2 rounded-2xl space-y-1.5 animate-in fade-in duration-150">
                  <div className="flex gap-1.5">
                    <input 
                      style={fontDisplayStyle}
                      type="text" 
                      placeholder="Məs: VCH-2026-X89"
                      value={voucherCodeInput}
                      onChange={e => setVoucherCodeInput(e.target.value)}
                      className="flex-1 p-1.5 border border-purple-200 rounded-xl bg-white font-black text-xs text-slate-900 uppercase outline-none"
                    />
                    <button 
                      onClick={handleVerifyVoucher}
                      style={fontTextStyle}
                      className="px-3 py-1.5 bg-purple-600 text-white rounded-xl font-extrabold text-xs transition cursor-pointer"
                    >
                      Yoxla
                    </button>
                  </div>
                  {voucherError && <p style={fontTextStyle} className="text-[9px] font-extrabold text-rose-600">{voucherError}</p>}
                </div>
              )}

              {/* BƏRPA OLUNAN TAM QARIŞIQ (SPLIT) ÖDƏNİŞ PANELDƏKİ İNPUTLAR */}
              {paymentMethod === 'split' && (
                <div className="bg-white p-2 rounded-2xl border border-slate-200 space-y-1.5 text-[10px] animate-in fade-in duration-150">
                  <div className="flex justify-between items-center font-bold text-slate-700 border-b border-slate-100 pb-1">
                    <span style={fontTextStyle}>Məbləğləri Bölüşdürün:</span>
                    <span style={fontDisplayStyle} className={splitRemaining === 0 ? 'text-emerald-600 font-black' : 'text-rose-600 font-black'}>
                      {splitRemaining === 0 ? '✅ Tamdır' : `Qalıq: ${splitRemaining.toFixed(2)} AZN`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label style={fontTextStyle} className="text-slate-400 block font-bold mb-0.5">POS Kart:</label>
                      <input 
                        style={fontDisplayStyle}
                        type="number" 
                        placeholder="0.00"
                        value={splitAmounts.card}
                        onChange={e => setSplitAmounts({ ...splitAmounts, card: e.target.value })}
                        className="w-full p-1 border border-slate-200 rounded-lg text-xs font-black bg-slate-50 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label style={fontTextStyle} className="text-slate-400 block font-bold mb-0.5">Nağd (Cash):</label>
                      <input 
                        style={fontDisplayStyle}
                        type="number" 
                        placeholder="0.00"
                        value={splitAmounts.cash}
                        onChange={e => setSplitAmounts({ ...splitAmounts, cash: e.target.value })}
                        className="w-full p-1 border border-slate-200 rounded-lg text-xs font-black bg-slate-50 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label style={fontTextStyle} className="text-slate-400 block font-bold mb-0.5">Depozit Balans:</label>
                      <input 
                        style={fontDisplayStyle}
                        type="number" 
                        placeholder="0.00"
                        value={splitAmounts.deposit}
                        onChange={e => setSplitAmounts({ ...splitAmounts, deposit: e.target.value })}
                        className="w-full p-1 border border-slate-200 rounded-lg text-xs font-black bg-slate-50 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label style={fontTextStyle} className="text-slate-400 block font-bold mb-0.5">Vauçer Kodu:</label>
                      <input 
                        style={fontDisplayStyle}
                        type="number" 
                        placeholder="0.00"
                        value={splitAmounts.voucher}
                        onChange={e => setSplitAmounts({ ...splitAmounts, voucher: e.target.value })}
                        className="w-full p-1 border border-slate-200 rounded-lg text-xs font-black bg-purple-50 focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* YEKUN HESABLAMA */}
              <div className="space-y-0.5 text-xs pt-1 border-t border-slate-200">
                <div className="flex justify-between text-slate-500 font-bold">
                  <span style={fontTextStyle}>Cəmi Məbləğ:</span>
                  <span style={fontDisplayStyle} className="font-black">{subtotal.toFixed(2)} AZN</span>
                </div>
                {calculatedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span style={fontTextStyle}>Tətbiq Edilən Endirim:</span>
                    <span style={fontDisplayStyle} className="font-black">-{calculatedDiscount.toFixed(2)} AZN</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-200">
                  <span style={fontTextStyle}>Yekun Ödəniləcək:</span>
                  <span style={fontDisplayStyle} className="text-base font-black">{total.toFixed(2)} AZN</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                style={fontTextStyle}
                className={`w-full py-2.5 rounded-2xl font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                  cart.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Check size={15} />
                <span>Ödənişi İcra Et Və Qəbz Çıxar ({total.toFixed(2)} AZN)</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* 3. MAIN CONTENT TAB 2: VURULAN ÇEKLƏR VƏ ARXİV BÖLMƏSİ */}
      {activeMainTab === 'history' && (
        <div className="flex-1 p-4 space-y-4 animate-in fade-in duration-150">
          
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 style={fontDisplayStyle} className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <Filter size={16} className="text-blue-600" />
                Vurulan Çeklər Üzrə Dərin Filtrasiya
              </h3>

              <div className="flex items-center gap-2">
                <span style={fontTextStyle} className="text-xs text-slate-500 font-extrabold">
                  Tapılan Çek Sayı: <strong className="text-blue-600 font-black">{filteredReceiptsHistory.length} Ədəd</strong>
                </span>
                <button
                  onClick={resetHistoryFilters}
                  style={fontTextStyle}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={12} /> Süzgəcləri Sıfırla
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs">
              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-bold mb-1">Müştəri Adı / ID:</label>
                <input
                  style={fontTextStyle}
                  type="text"
                  placeholder="Məs: Ayan Xəlilova..."
                  value={historySearchClient}
                  onChange={e => setHistorySearchClient(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-bold mb-1">Kassir / Operator:</label>
                <input
                  style={fontTextStyle}
                  type="text"
                  placeholder="Məs: Ayan X. və ya Elcan..."
                  value={historySearchCashier}
                  onChange={e => setHistorySearchCashier(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-bold mb-1">Məhsul / Xidmət Adı:</label>
                <input
                  style={fontTextStyle}
                  type="text"
                  placeholder="Məs: Whey Protein..."
                  value={historySearchProduct}
                  onChange={e => setHistorySearchProduct(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-bold mb-1">Ödəniş Metodu:</label>
                <select
                  style={fontTextStyle}
                  value={historySearchPayment}
                  onChange={e => setHistorySearchPayment(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-800 outline-none cursor-pointer"
                >
                  <option value="all">Bütün Metodlar</option>
                  <option value="POS Kart">POS Kart</option>
                  <option value="Nağd">Nağd (Cash)</option>
                  <option value="Depozit">Müştəri Depoziti</option>
                  <option value="Transfer">Bank Transferi</option>
                  <option value="Vauçer">Vauçer</option>
                  <option value="Qarışıq">Qarışıq (Split)</option>
                </select>
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-bold mb-1">Başlanğıc Tarixi:</label>
                <input
                  style={fontTextStyle}
                  type="date"
                  value={historyDateStart}
                  onChange={e => setHistoryDateStart(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-bold mb-1">Bitiş Tarixi:</label>
                <input
                  style={fontTextStyle}
                  type="date"
                  value={historyDateEnd}
                  onChange={e => setHistoryDateEnd(e.target.value)}
                  className="w-full p-1.5 border border-slate-200 rounded-xl bg-slate-50 font-bold text-slate-800 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr style={fontDisplayStyle} className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase text-[10px] font-black tracking-wider">
                    <th className="p-3">Çek № & Fiskal</th>
                    <th className="p-3">Tarix & Saat</th>
                    <th className="p-3">Müştəri Adı</th>
                    <th className="p-3">Kassir / Operator</th>
                    <th className="p-3">Tərkib (Maddi Sayı)</th>
                    <th className="p-3">Ödəniş Metodu</th>
                    <th className="p-3 text-right">Endirim</th>
                    <th className="p-3 text-right">Yekun Məbləğ</th>
                    <th className="p-3 text-center">Əməliyyat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReceiptsHistory.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={fontTextStyle} className="p-8 text-center text-slate-400 font-extrabold">
                        Axtarış meyarlarına uyğun vurulmuş çek tapılmadı.
                      </td>
                    </tr>
                  ) : (
                    filteredReceiptsHistory.map((receipt) => {
                      const totalItemsCount = receipt.items.reduce((acc, curr) => acc + curr.qty, 0);
                      return (
                        <tr key={receipt.orderId} className="hover:bg-slate-50/80 transition">
                          <td className="p-3">
                            <span style={fontDisplayStyle} className="font-black text-slate-900 block">{receipt.orderId}</span>
                            {receipt.isFiscalized ? (
                              <span style={fontDisplayStyle} className="text-[9px] text-emerald-700 font-black bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                                {receipt.fiscalId}
                              </span>
                            ) : (
                              <span style={fontTextStyle} className="text-[9px] text-slate-400 font-bold block">Fiskalsız (Daxili)</span>
                            )}
                          </td>
                          <td className="p-3 font-semibold text-slate-700">
                            <span style={fontTextStyle} className="block font-bold">{receipt.date}</span>
                            <span style={fontDisplayStyle} className="text-[10px] text-slate-400 font-black">{receipt.time}</span>
                          </td>
                          <td className="p-3">
                            <span style={fontTextStyle} className="font-black text-slate-900 block">{receipt.client}</span>
                            <span style={fontDisplayStyle} className="text-[9px] text-slate-400 font-bold">{receipt.clientId}</span>
                          </td>
                          <td className="p-3 font-extrabold text-slate-700">
                            <span style={fontTextStyle}>{receipt.processedBy}</span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <span style={fontDisplayStyle} className="bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-black px-2.5 py-1 rounded-xl">
                                {totalItemsCount} Maddə / Ədəd
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span style={fontTextStyle} className="bg-blue-50 text-blue-800 font-black text-[10px] px-2 py-1 rounded-xl border border-blue-200 inline-block">
                              {receipt.paymentMethod}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {parseFloat(receipt.discount) > 0 ? (
                              <div>
                                <span style={fontDisplayStyle} className="font-black text-emerald-700 block">-{receipt.discount} AZN</span>
                                <span style={fontTextStyle} className="text-[9px] text-emerald-600 font-extrabold">({receipt.discountPercent}%)</span>
                              </div>
                            ) : (
                              <span style={fontTextStyle} className="text-slate-400 font-bold">--</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <span style={fontDisplayStyle} className="font-black text-slate-900 text-sm block">
                              {receipt.total} AZN
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => {
                                setCompletedOrder(receipt);
                                setShowReceiptModal(true);
                              }}
                              style={fontTextStyle}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
                            >
                              <Eye size={13} />
                              <span>Qəbzə Bax</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* 4. MÜŞTƏRİ INFO MODALI */}
      {infoClientModal && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-base">{infoClientModal.name} ({infoClientModal.id})</h3>
              <button onClick={() => setInfoClientModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <p style={fontTextStyle} className="font-bold text-slate-700">Depozit Balansı: <strong className="text-emerald-700 font-black">{infoClientModal.balance.toFixed(2)} AZN</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* 5. QƏBZ / ÇEK POPUP MODALI */}
      {showReceiptModal && completedOrder && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-5 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150">
            
            <div className="text-center space-y-1 border-b border-slate-200 pb-3">
              <div style={fontDisplayStyle} className="w-10 h-10 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center text-base mx-auto">
                M
              </div>
              <h3 style={fontDisplayStyle} className="font-black text-slate-900 text-sm uppercase tracking-wider">MAKFIT CRM & ENTERPRISE</h3>
              <p style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">Rəsmi Kassa Qəbzi / Ödəniş Təsdiqi</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1 text-[10px]">
              <div className="flex justify-between text-slate-600"><span style={fontTextStyle} className="font-bold">Qəbz №:</span> <strong style={fontDisplayStyle} className="text-slate-900">{completedOrder.orderId}</strong></div>
              <div className="flex justify-between text-slate-600"><span style={fontTextStyle} className="font-bold">Tarix & Saat:</span> <strong style={fontTextStyle} className="text-slate-900 font-bold">{completedOrder.date} | {completedOrder.time}</strong></div>
              <div className="flex justify-between text-slate-600"><span style={fontTextStyle} className="font-bold">Müştəri:</span> <strong style={fontTextStyle} className="text-slate-900 font-extrabold">{completedOrder.client}</strong></div>
              <div className="flex justify-between text-slate-600"><span style={fontTextStyle} className="font-bold">Kassir / Operator:</span> <strong style={fontTextStyle} className="text-slate-900 font-extrabold">{completedOrder.processedBy}</strong></div>
              <div className="flex justify-between text-slate-600"><span style={fontTextStyle} className="font-bold">Ödəniş Üsulu:</span> <strong style={fontTextStyle} className="text-emerald-700 font-extrabold">{completedOrder.paymentMethod}</strong></div>

              {completedOrder.isFiscalized ? (
                <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center text-emerald-800 font-bold">
                  <span style={fontTextStyle} className="flex items-center gap-1 font-extrabold"><FileCheck size={12} /> Fiskal №:</span>
                  <span style={fontDisplayStyle} className="font-black">{completedOrder.fiscalId}</span>
                </div>
              ) : (
                <div style={fontTextStyle} className="pt-1.5 border-t border-slate-200 text-slate-400 font-bold">
                  * Fiskallaşdırılmayıb (Daxili Qəbz)
                </div>
              )}
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto border-y border-slate-100 py-2">
              <span style={fontTextStyle} className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                Çekə Daxil Olan Məhsul / Xidmətlər:
              </span>
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-0.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-800">
                    <span style={fontTextStyle} className="font-extrabold">{item.name}</span>
                    <span style={fontDisplayStyle} className="font-black">{(item.price * item.qty).toFixed(2)} AZN</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                    <span>Miqdar: {item.qty} ədəd</span>
                    <span>Vahid qiymət: {item.price.toFixed(2)} AZN</span>
                  </div>
                  {item.carPlates && item.carPlates.length > 0 && (
                    <div style={fontDisplayStyle} className="text-[9px] text-blue-700 font-black bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 flex items-center gap-1 w-fit mt-1">
                      <Car size={10} /> Avto Nömrə: {item.carPlates.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-1 text-xs font-black pt-1">
              {parseFloat(completedOrder.discount) > 0 && (
                <div className="flex justify-between text-emerald-700 text-[11px]">
                  <span style={fontTextStyle} className="font-extrabold">VIP / Tətbiq Edilən Endirim:</span>
                  <span style={fontDisplayStyle} className="font-black">-{completedOrder.discount} AZN</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 text-sm">
                <span style={fontTextStyle} className="font-black">YEKUN ÖDƏNİLƏN:</span>
                <span style={fontDisplayStyle} className="text-base font-black">{completedOrder.total} AZN</span>
              </div>
            </div>

            {completedOrder.isFiscalized && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-center space-y-1">
                <QrCode size={40} className="mx-auto text-slate-800" />
                <p style={fontDisplayStyle} className="text-[9px] text-slate-500 font-bold">NBN QR / Fiskal Çek Təsdiqi</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setShowReceiptModal(false)} 
                style={fontTextStyle}
                className="flex-1 py-2 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition cursor-pointer text-xs text-center shadow-xs flex items-center justify-center gap-1.5"
              >
                <Printer size={14} /> Çap Et Və Bağla
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}