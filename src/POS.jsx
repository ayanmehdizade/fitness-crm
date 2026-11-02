import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Plus, Minus, Trash2, CreditCard, DollarSign, 
  User, Check, Receipt, Coffee, Sparkles, Dumbbell, Scissors, HandHeart, 
  Tag, Download, FileText, ArrowRight, ShieldCheck, Clock, QrCode, FileCheck, 
  Package, Info, X, Wallet, History, Split, Filter, Flame, Apple, Bath,
  Edit3, Percent, MessageSquare, Car
} from 'lucide-react';

const initialProducts = [
  // FITBAR / ANBAR MƏHSULLARI
  { id: 'PRD-101', name: 'Whey Protein Shake (ISO-100)', category: 'fitbar', subcategory: 'drinks', price: 8.00, stock: 45, icon: '🥤' },
  { id: 'PRD-102', name: 'BCAA Energy Drink 500ml', category: 'fitbar', subcategory: 'drinks', price: 4.50, stock: 80, icon: '⚡' },
  { id: 'PRD-103', name: 'Protein Bar (Caramel & Peanut)', category: 'fitbar', subcategory: 'bars', price: 3.50, stock: 120, icon: '🍫' },
  { id: 'PRD-104', name: 'Makfit Brend Su 0.5L', category: 'fitbar', subcategory: 'drinks', price: 1.00, stock: 200, icon: '💧' },
  { id: 'PRD-105', name: 'Pre-Workout Shot (Lime)', category: 'fitbar', subcategory: 'drinks', price: 5.00, stock: 35, icon: '🧪' },
  { id: 'PRD-106', name: 'Makfit İdman Dəsmalı (VIP)', category: 'fitbar', subcategory: 'accessories', price: 25.00, stock: 15, icon: '🧴' },

  // XİDMƏTLƏR VƏ PAKETLƏR / KURS
  { id: 'SRV-201', name: '12 Seans PT Fərdi Məşq Kursu', category: 'services', subcategory: 'pt', price: 600.00, stock: 999, icon: '🏋️' },
  { id: 'SRV-202', name: 'Relax Masajı Kursu (60 Dəq)', category: 'services', subcategory: 'spa', price: 50.00, stock: 999, icon: '🤲' },
  { id: 'SRV-203', name: 'VIP Saç Kəsimi & Saqqal', category: 'services', subcategory: 'salon', price: 35.00, stock: 999, icon: '✂️' },
  { id: 'SRV-204', name: 'Gözəllik Salonu Manikür', category: 'services', subcategory: 'salon', price: 30.00, stock: 999, icon: '✨' },
  { id: 'SRV-205', name: 'InBody Bədən Analizi', category: 'services', subcategory: 'other', price: 15.00, stock: 999, icon: '📊' },
  { id: 'SRV-206', name: 'Paket Dondurma Rüsumu (7 Gün)', category: 'services', subcategory: 'other', price: 20.00, stock: 999, icon: '❄️' }
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
      { id: 'TR-9011', date: '28.10.2026 | 14:35', item: 'Whey Protein + BCAA Drink', amount: '12.50 AZN', method: 'POS Kart' },
      { id: 'TR-8920', date: '25.10.2026 | 17:00', item: 'Relax Masajı (60 Dəq)', amount: '50.00 AZN', method: 'POS Kart' },
      { id: 'TR-8812', date: '15.10.2026 | 11:20', item: '12 Seans PT Fərdi Məşq Kursu', amount: '600.00 AZN', method: 'Bank Transferi' }
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
      { id: 'TR-6102', date: '01.06.2026 | 12:00', item: 'Standart Paket (6 Aylıq)', amount: '620.00 AZN', method: 'Nağd' }
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
      { id: 'TR-4001', date: '01.01.2026 | 11:00', item: 'Gündüz Tarifi (3 Aylıq)', amount: '310.00 AZN', method: 'POS Kart' }
    ]
  }
];

export default function POS() {
  const [categoryTab, setCategoryTab] = useState('all'); 
  const [subFilter, setSubFilter] = useState('all'); 
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

  // ÖDƏNİŞ
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isFiscalize, setIsFiscalize] = useState(true);
  
  const [splitAmounts, setSplitAmounts] = useState({
    card: '',
    cash: '',
    deposit: '',
    transfer: ''
  });

  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const filterByQueryAndSub = (item) => {
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSub = subFilter === 'all' || item.subcategory === subFilter;
    return matchesQuery && matchesSub;
  };

  const fitbarProducts = initialProducts.filter(item => item.category === 'fitbar' && filterByQueryAndSub(item));
  const serviceProducts = initialProducts.filter(item => item.category === 'services' && filterByQueryAndSub(item));

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
        carPlates: product.category === 'services' ? [''] : [] // Добавляем массив номеров для курсов/услуг
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

  // ФУНКЦИИ УПРАВЛЕНИЯ НОМЕРАМИ МАШИН (МАКСИМУМ 2)
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
  if (customDiscountValue && !isNaN(parseFloat(customDiscountValue))) {
    const val = parseFloat(customDiscountValue);
    if (customDiscountType === 'percent') {
      calculatedDiscount = (subtotal * val) / 100;
    } else {
      calculatedDiscount = val;
    }
  } else if (selectedClient && selectedClient.discount > 0) {
    calculatedDiscount = (subtotal * selectedClient.discount) / 100;
  }

  const total = Math.max(0, subtotal - calculatedDiscount);

  const totalSplitEntered = (parseFloat(splitAmounts.card) || 0) + 
                            (parseFloat(splitAmounts.cash) || 0) + 
                            (parseFloat(splitAmounts.deposit) || 0) + 
                            (parseFloat(splitAmounts.transfer) || 0);

  const splitRemaining = total - totalSplitEntered;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (paymentMethod === 'split' && Math.abs(totalSplitEntered - total) > 0.01) {
      alert(`Daxil edilən məbləğlərin cəmi (${totalSplitEntered.toFixed(2)} AZN) yekun ödəniləcək məbləğə (${total.toFixed(2)} AZN) bərabər olmalıdır!`);
      return;
    }

    const fiscalId = isFiscalize ? `FISC-${Math.floor(10000000 + Math.random() * 90000000)}` : null;

    let paymentMethodText = '';
    if (paymentMethod === 'card') paymentMethodText = 'POS Kart';
    else if (paymentMethod === 'cash') paymentMethodText = 'Nağd (Cash)';
    else if (paymentMethod === 'deposit') paymentMethodText = 'Müştəri Depoziti';
    else if (paymentMethod === 'transfer') paymentMethodText = 'Bank Transferi';
    else if (paymentMethod === 'split') {
      const parts = [];
      if (parseFloat(splitAmounts.card) > 0) parts.push(`${parseFloat(splitAmounts.card).toFixed(2)} AZN (POS Kart)`);
      if (parseFloat(splitAmounts.cash) > 0) parts.push(`${parseFloat(splitAmounts.cash).toFixed(2)} AZN (Nağd)`);
      if (parseFloat(splitAmounts.deposit) > 0) parts.push(`${parseFloat(splitAmounts.deposit).toFixed(2)} AZN (Depozit)`);
      if (parseFloat(splitAmounts.transfer) > 0) parts.push(`${parseFloat(splitAmounts.transfer).toFixed(2)} AZN (Transfer)`);
      paymentMethodText = `Qarışıq: ${parts.join(' + ')}`;
    }

    const orderData = {
      orderId: `CHK-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('az-AZ'),
      time: new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' }),
      client: selectedClient ? selectedClient.name : 'Ümumi / Anonim Müştəri',
      clientId: selectedClient ? selectedClient.id : 'N/A',
      items: cart.map(item => ({
        ...item,
        carPlates: item.carPlates ? item.carPlates.filter(p => p.trim() !== '') : []
      })),
      subtotal: subtotal.toFixed(2),
      discount: calculatedDiscount.toFixed(2),
      total: total.toFixed(2),
      paymentMethod: paymentMethodText,
      processedBy: 'Ayan X. (Supervisor)',
      comment: orderComment.trim(),
      isFiscalized: isFiscalize,
      fiscalId: fiscalId
    };

    setCompletedOrder(orderData);
    setShowReceiptModal(true);
    setCart([]);
    setSelectedClient(null);
    setClientSearchQuery('');
    setCustomDiscountValue('');
    setOrderComment('');
    setSplitAmounts({ card: '', cash: '', deposit: '', transfer: '' });
  };

  const renderProductCard = (product) => (
    <div 
      key={product.id}
      onClick={() => addToCart(product)}
      className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 hover:border-slate-400 p-3 rounded-2xl transition cursor-pointer flex flex-col justify-between shadow-2xs group"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-2xl">{product.icon}</span>
          <span className="text-[9px] font-mono font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-slate-200">
            {product.id}
          </span>
        </div>
        <h4 className="font-extrabold text-slate-900 text-xs line-clamp-2 leading-tight group-hover:text-black">
          {product.name}
        </h4>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between">
        <span className="text-xs font-black text-slate-900">{product.price.toFixed(2)} AZN</span>
        <button className="w-6 h-6 bg-[#151515] text-[#F8FF70] rounded-lg flex items-center justify-center font-bold text-xs group-hover:bg-black transition cursor-pointer">
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex flex-col font-sans select-none overflow-y-auto custom-scrollbar">
      
      {/* 1. HEADER BAR */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0 shadow-2xs sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#151515] rounded-xl flex items-center justify-center font-black text-[#F8FF70] text-sm">
            POS
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
              MAKFIT — POS / Kassa & Satış Terminalı
            </h3>
            <p className="text-[10px] text-slate-500">FitBar, Xidmət və PT paketlərinin kassa satışı</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Kassa Statusu: <strong className="text-emerald-700">Açıq (Ayan X.)</strong></span>
          </div>
        </div>
      </div>

      {/* 2. MAIN POS LAYOUT */}
      <div className="flex-1 flex flex-col lg:flex-row p-2 gap-2">
        
        {/* SOL TƏRƏF: KATALOG */}
        <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          
          <div className="p-3 border-b border-slate-200 space-y-2 shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Məhsul və ya xidmət axtar..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs font-medium bg-slate-50 focus:outline-none focus:border-slate-800 transition"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold w-full sm:w-auto justify-center">
                <button 
                  onClick={() => { setCategoryTab('all'); setSubFilter('all'); }}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${categoryTab === 'all' ? 'bg-[#151515] text-[#F8FF70] font-black' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Hamısı (Sütunlar)
                </button>
                <button 
                  onClick={() => { setCategoryTab('fitbar'); setSubFilter('all'); }}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${categoryTab === 'fitbar' ? 'bg-[#151515] text-[#F8FF70] font-black' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Coffee size={12} /> FitBar & Stok
                </button>
                <button 
                  onClick={() => { setCategoryTab('services'); setSubFilter('all'); }}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${categoryTab === 'services' ? 'bg-[#151515] text-[#F8FF70] font-black' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <Sparkles size={12} /> Xidmətlər / Kurs
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-[10px] font-bold custom-scrollbar">
              <button 
                onClick={() => setSubFilter('all')}
                className={`px-2.5 py-1 rounded-lg border transition cursor-pointer whitespace-nowrap ${
                  subFilter === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Bütün Sub-Segmentlər
              </button>

              {(categoryTab === 'all' || categoryTab === 'fitbar') && (
                <>
                  <button 
                    onClick={() => setSubFilter('drinks')}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      subFilter === 'drinks' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    🥤 İçkilər & Şeyklər
                  </button>
                  <button 
                    onClick={() => setSubFilter('bars')}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      subFilter === 'bars' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    🍫 Qidalanma & Barlar
                  </button>
                  <button 
                    onClick={() => setSubFilter('accessories')}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      subFilter === 'accessories' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    🧴 Aksessuarlar
                  </button>
                </>
              )}

              {(categoryTab === 'all' || categoryTab === 'services') && (
                <>
                  <button 
                    onClick={() => setSubFilter('pt')}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      subFilter === 'pt' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    🏋️ Fərdi Məşq (PT Kurs)
                  </button>
                  <button 
                    onClick={() => setSubFilter('spa')}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      subFilter === 'spa' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    🤲 Spa & Masaj
                  </button>
                  <button 
                    onClick={() => setSubFilter('salon')}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      subFilter === 'salon' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    ✂️ Salon & Bərbər
                  </button>
                  <button 
                    onClick={() => setSubFilter('other')}
                    className={`px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      subFilter === 'other' ? 'bg-purple-600 text-white border-purple-600' : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    📊 Digər Rüsumlar
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar min-h-[400px]">
            {categoryTab === 'all' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-3 flex flex-col space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-black text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                      <Coffee size={15} className="text-amber-600" /> FitBar & Anbar Məhsulları
                    </span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-md">
                      {fitbarProducts.length} Məhsul
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {fitbarProducts.length === 0 ? (
                      <p className="col-span-2 text-center text-slate-400 text-xs py-6 font-bold">Məhsul tapılmadı.</p>
                    ) : (
                      fitbarProducts.map(renderProductCard)
                    )}
                  </div>
                </div>

                <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-3 flex flex-col space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-black text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles size={15} className="text-purple-600" /> Xidmətlər Və Paketlər / Kurs
                    </span>
                    <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-md">
                      {serviceProducts.length} Xidmət
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {serviceProducts.length === 0 ? (
                      <p className="col-span-2 text-center text-slate-400 text-xs py-6 font-bold">Xidmət tapılmadı.</p>
                    ) : (
                      serviceProducts.map(renderProductCard)
                    )}
                  </div>
                </div>

              </div>
            )}

            {categoryTab === 'fitbar' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {fitbarProducts.map(renderProductCard)}
              </div>
            )}

            {categoryTab === 'services' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {serviceProducts.map(renderProductCard)}
              </div>
            )}
          </div>

        </div>

        {/* SAĞ TƏRƏF: KASSA SƏBƏTİ */}
        <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-2xs shrink-0">
          
          {/* MÜŞTƏRİ AXTARIŞI */}
          <div className="p-3 border-b border-slate-200 bg-slate-50 space-y-2 relative shrink-0">
            <label className="font-black text-slate-900 text-[11px] uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5"><User size={13} /> Müştəri İnteqrasiyası</span>
              {selectedClient && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setInfoClientModal(selectedClient)}
                    className="text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded-md font-bold text-[10px] flex items-center gap-1 transition cursor-pointer border border-blue-200"
                  >
                    <Info size={11} /> Info
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedClient(null);
                      setClientSearchQuery('');
                    }} 
                    className="text-rose-600 hover:underline text-[10px] font-bold cursor-pointer"
                  >
                    Ləğv Et
                  </button>
                </div>
              )}
            </label>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 text-slate-400" size={13} />
              <input 
                type="text" 
                placeholder="Müştəri axtar (Ad, Tel, ID)..."
                value={selectedClient ? `${selectedClient.name} (${selectedClient.id})` : clientSearchQuery}
                onFocus={() => setShowClientDropdown(true)}
                onChange={e => {
                  setClientSearchQuery(e.target.value);
                  setSelectedClient(null);
                  setShowClientDropdown(true);
                }}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl bg-white font-bold text-xs text-slate-800 outline-none focus:border-slate-800 transition"
              />

              {showClientDropdown && !selectedClient && (
                <div className="absolute left-0 right-0 top-10 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 max-h-56 overflow-y-auto custom-scrollbar p-1 space-y-0.5">
                  <div 
                    onClick={() => {
                      setSelectedClient(null);
                      setShowClientDropdown(false);
                      setClientSearchQuery('');
                    }}
                    className="p-2 hover:bg-slate-100 rounded-xl cursor-pointer text-xs font-bold text-slate-500 border-b border-slate-100"
                  >
                    -- Ümumi / Anonim Müştəri --
                  </div>
                  {filteredClients.length === 0 ? (
                    <div className="p-2 text-center text-slate-400 text-xs font-bold">
                      Müştəri tapılmadı
                    </div>
                  ) : (
                    filteredClients.map(c => (
                      <div 
                        key={c.id}
                        className="p-2 hover:bg-slate-100 rounded-xl cursor-pointer text-xs flex items-center justify-between group transition"
                      >
                        <div 
                          onClick={() => {
                            setSelectedClient(c);
                            setShowClientDropdown(false);
                          }}
                          className="flex-1"
                        >
                          <div className="flex justify-between font-black text-slate-900 pr-2">
                            <span>{c.name}</span>
                            <span className="text-[10px] font-mono text-slate-400">{c.id}</span>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-500 font-medium pr-2">
                            <span>{c.phone}</span>
                            <span className="text-emerald-700 font-bold">Depozit: {c.balance.toFixed(2)} AZN</span>
                          </div>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfoClientModal(c);
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition shrink-0 cursor-pointer"
                          title="Müştəri haqqında ətraflı məlumat"
                        >
                          <Info size={15} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {selectedClient && (
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-[10px] text-emerald-900 font-bold flex justify-between items-center animate-in fade-in duration-150">
                <span>VIP Endirim: <strong>{selectedClient.discount}%</strong></span>
                <span>Depozit: <strong>{selectedClient.balance.toFixed(2)} AZN</strong></span>
              </div>
            )}
          </div>

          {/* SƏBƏT SİYAHISI */}
          <div className="p-3 border-b border-slate-200 flex flex-col min-h-[220px] max-h-[380px] shrink-0 bg-slate-50/50">
            <div className="bg-white p-2 rounded-xl border border-slate-200/80 mb-2 flex items-center justify-between shrink-0 shadow-2xs">
              <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                <div className="w-6 h-6 bg-[#151515] text-[#F8FF70] rounded-lg flex items-center justify-center">
                  <ShoppingCart size={13} />
                </div>
                <span>Səbətdəki Maddələr</span>
              </h4>
              <span className="text-[10px] bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg font-black border border-slate-200">
                {cart.length} Ədəd
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full min-h-[140px] flex flex-col items-center justify-center text-slate-400 space-y-1.5 border-2 border-dashed border-slate-200 rounded-2xl bg-white/60">
                  <ShoppingCart size={28} className="text-slate-300" />
                  <p className="text-xs font-black text-slate-600">Səbət hazırda boşdur</p>
                  <p className="text-[10px] text-slate-400">Katalogdan məhsul və ya xidmət seçin</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs space-y-2 transition hover:border-slate-300">
                    <div className="flex items-center justify-between text-xs">
                      <h5 className="font-black text-slate-900 truncate flex-1 pr-2">{item.name}</h5>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Məhsulu Səbətdən Sil"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* ВВОД ГОС. НОМЕРА МАШИНЫ ДЛЯ КУРСОВ И УСЛУГ (МАКСИМУМ 2 НОМЕРА) */}
                    {item.category === 'services' && (
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 space-y-1.5 text-[10px]">
                        <div className="flex items-center justify-between text-slate-700 font-bold">
                          <span className="flex items-center gap-1 text-slate-800 font-black">
                            <Car size={12} className="text-blue-600" /> Avtomobil Qeydiyyatı (Max 2):
                          </span>
                          {item.carPlates.length < 2 && (
                            <button 
                              onClick={() => handleAddPlateField(item.id)}
                              className="px-2 py-0.5 bg-[#151515] text-[#F8FF70] hover:bg-black rounded-md font-bold flex items-center gap-1 cursor-pointer transition text-[9px]"
                              title="İkinci avtomobil nömrəsi əlavə et"
                            >
                              <Plus size={10} /> Добавить номер
                            </button>
                          )}
                        </div>

                        <div className="space-y-1">
                          {item.carPlates.map((plate, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-1">
                              <span className="text-[9px] font-mono text-slate-400 font-bold w-12">
                                Nömrə #{pIdx + 1}:
                              </span>
                              <input 
                                type="text" 
                                placeholder="99-XX-000"
                                value={plate}
                                onChange={(e) => handlePlateChange(item.id, pIdx, e.target.value)}
                                className="flex-1 px-2 py-0.5 border border-slate-200 rounded-lg text-xs font-mono font-black uppercase text-slate-900 bg-white outline-none focus:border-slate-800"
                              />
                              {pIdx > 0 && (
                                <button 
                                  onClick={() => handleRemovePlateField(item.id, pIdx)}
                                  className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                  title="Nömrəni sil"
                                >
                                  <X size={12} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 text-xs pt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5">
                        <Edit3 size={10} className="text-slate-400" />
                        <input 
                          type="number" 
                          step="0.5"
                          value={item.price}
                          onChange={(e) => updateCustomPrice(item.id, e.target.value)}
                          className="w-14 font-mono font-black text-slate-900 text-xs bg-transparent outline-none text-right"
                        />
                        <span className="text-[9px] font-bold text-slate-400">AZN</span>
                      </div>

                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                        <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white rounded text-slate-600 cursor-pointer">
                          <Minus size={11} />
                        </button>
                        <span className="px-1.5 font-black text-slate-900 text-xs">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-white rounded text-slate-600 cursor-pointer">
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="font-black text-slate-900 text-xs font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                        {(item.price * item.qty).toFixed(2)} AZN
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* YEKUN MƏBLƏĞ VƏ ÖDƏNİŞ */}
          <div className="p-3 bg-slate-50 space-y-2 shrink-0">
            
            {/* ENDİRİM */}
            <div className="bg-white p-2 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-700">
                <span className="flex items-center gap-1"><Percent size={11} className="text-purple-600" /> Endirim Tətbiq Et:</span>
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button 
                    onClick={() => setCustomDiscountType('percent')}
                    className={`px-1.5 py-0.5 rounded font-black cursor-pointer ${customDiscountType === 'percent' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-500'}`}
                  >
                    %
                  </button>
                  <button 
                    onClick={() => setCustomDiscountType('azn')}
                    className={`px-1.5 py-0.5 rounded font-black cursor-pointer ${customDiscountType === 'azn' ? 'bg-[#151515] text-[#F8FF70]' : 'text-slate-500'}`}
                  >
                    AZN
                  </button>
                </div>
              </div>

              <input 
                type="number" 
                placeholder={customDiscountType === 'percent' ? "Endirim % (məs: 15)" : "Endirim AZN (məs: 5.00)"}
                value={customDiscountValue}
                onChange={e => setCustomDiscountValue(e.target.value)}
                className="w-full p-1 border border-slate-200 rounded-lg text-xs font-mono font-bold bg-slate-50 outline-none focus:bg-white"
              />
            </div>

            {/* QEYD / ŞƏRH */}
            <div className="relative">
              <MessageSquare className="absolute left-2.5 top-2 text-slate-400" size={12} />
              <input 
                type="text" 
                placeholder="Qeyd / Şərh əlavə et (Comment)..."
                value={orderComment}
                onChange={e => setOrderComment(e.target.value)}
                className="w-full pl-8 pr-2 py-1 border border-slate-200 rounded-xl text-xs font-medium bg-white outline-none focus:border-slate-800"
              />
            </div>

            {/* YEKUN HESABLAMA */}
            <div className="space-y-0.5 text-xs pt-1 border-t border-slate-200">
              <div className="flex justify-between text-slate-500 font-bold">
                <span>Cəmi Məbləğ:</span>
                <span className="font-mono">{subtotal.toFixed(2)} AZN</span>
              </div>

              {calculatedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Tətbiq Edilən Endirim:</span>
                  <span className="font-mono">-{calculatedDiscount.toFixed(2)} AZN</span>
                </div>
              )}

              <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-200">
                <span>Yekun Ödəniləcək:</span>
                <span className="font-mono text-base">{total.toFixed(2)} AZN</span>
              </div>
            </div>

            {/* FISCALIZE TOGGLE */}
            <div className="bg-white p-1.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="font-black text-slate-800 text-[10px] flex items-center gap-1.5">
                <FileCheck size={13} className={isFiscalize ? 'text-emerald-600' : 'text-slate-400'} />
                Fiskallaşdır (Fiscalize)
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isFiscalize} 
                  onChange={e => setIsFiscalize(e.target.checked)} 
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#151515]"></div>
              </label>
            </div>

            {/* ÖDƏNİŞ METODLARI */}
            <div className="grid grid-cols-2 gap-1 text-[10px] font-bold">
              {[
                { id: 'card', label: 'POS Kart', icon: CreditCard },
                { id: 'cash', label: 'Nağd (Cash)', icon: DollarSign },
                { id: 'deposit', label: 'Depozit / Balans', icon: Tag },
                { id: 'transfer', label: 'Bank Transferi', icon: Receipt },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-1.5 rounded-xl border flex items-center gap-1.5 transition cursor-pointer ${
                      paymentMethod === m.id 
                        ? 'bg-[#151515] text-[#F8FF70] border-[#151515]' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={12} />
                    <span className="truncate">{m.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPaymentMethod('split')}
              className={`w-full p-1.5 rounded-xl border flex items-center justify-center gap-1.5 transition text-[10px] font-bold cursor-pointer ${
                paymentMethod === 'split' 
                  ? 'bg-[#151515] text-[#F8FF70] border-[#151515]' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Split size={12} />
              <span>Qarışıq / Bölünmüş Ödəniş (Split Payment)</span>
            </button>

            {paymentMethod === 'split' && (
              <div className="bg-white p-2 rounded-2xl border border-slate-200 space-y-1.5 text-[10px] animate-in fade-in duration-150">
                <div className="flex justify-between items-center font-bold text-slate-700 border-b border-slate-100 pb-1">
                  <span>Məbləğləri Bölüşdürün:</span>
                  <span className={splitRemaining === 0 ? 'text-emerald-600 font-mono font-black' : 'text-rose-600 font-mono font-black'}>
                    {splitRemaining === 0 ? '✅ Tamdır' : `Qalıq: ${splitRemaining.toFixed(2)} AZN`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <label className="text-slate-400 block font-bold mb-0.5">POS Kart:</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={splitAmounts.card}
                      onChange={e => setSplitAmounts({ ...splitAmounts, card: e.target.value })}
                      className="w-full p-1 border border-slate-200 rounded-lg text-xs font-mono font-bold bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block font-bold mb-0.5">Nağd (Cash):</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={splitAmounts.cash}
                      onChange={e => setSplitAmounts({ ...splitAmounts, cash: e.target.value })}
                      className="w-full p-1 border border-slate-200 rounded-lg text-xs font-mono font-bold bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block font-bold mb-0.5">Depozit / Balans:</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={splitAmounts.deposit}
                      onChange={e => setSplitAmounts({ ...splitAmounts, deposit: e.target.value })}
                      className="w-full p-1 border border-slate-200 rounded-lg text-xs font-mono font-bold bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block font-bold mb-0.5">Bank Transferi:</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={splitAmounts.transfer}
                      onChange={e => setSplitAmounts({ ...splitAmounts, transfer: e.target.value })}
                      className="w-full p-1 border border-slate-200 rounded-lg text-xs font-mono font-bold bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`w-full py-2.5 rounded-2xl font-black text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                cart.length > 0 
                  ? 'bg-[#151515] text-[#F8FF70] hover:bg-black' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check size={15} />
              <span>Ödənişi İcra Et Və Qəbz Çıxar ({total.toFixed(2)} AZN)</span>
            </button>

          </div>

        </div>

      </div>

      {/* 3. MÜŞTƏRİ INFO MODALI */}
      {infoClientModal && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#151515] text-[#F8FF70] rounded-2xl flex items-center justify-center font-black text-sm">
                  {infoClientModal.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{infoClientModal.id}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-md">
                      {infoClientModal.membership}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base">{infoClientModal.name}</h3>
                  <p className="text-[11px] text-slate-500">{infoClientModal.phone}</p>
                </div>
              </div>
              <button onClick={() => setInfoClientModal(null)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Wallet size={12} className="text-emerald-600" /> Depozit / Balans
                </span>
                <h4 className="text-lg font-black text-emerald-700">{infoClientModal.balance.toFixed(2)} AZN</h4>
                <p className="text-[9px] text-slate-500">Kassada istifadəyə hazırdır</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Tag size={12} className="text-purple-600" /> VIP Endirim Faizi
                </span>
                <h4 className="text-lg font-black text-slate-900">{infoClientModal.discount}%</h4>
                <p className="text-[9px] text-slate-500">Bütün xidmətlərə tətbiq edilir</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                <History size={15} className="text-blue-600" /> Bütün Alış-Veriş Və Ödəniş Tarixçəsi
              </h4>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 max-h-56 overflow-y-auto custom-scrollbar space-y-1">
                {infoClientModal.purchaseHistory.map((tr) => (
                  <div key={tr.id} className="bg-white p-2.5 rounded-xl border border-slate-100 flex justify-between items-center text-[11px]">
                    <div>
                      <span className="font-black text-slate-900 block">{tr.item}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{tr.id} • {tr.method}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900 text-xs block">{tr.amount}</span>
                      <span className="text-[9px] text-slate-400 font-mono">{tr.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={() => setInfoClientModal(null)} 
                className="px-5 py-2 bg-[#151515] text-[#F8FF70] font-black rounded-xl hover:bg-black transition cursor-pointer text-xs"
              >
                Bağla
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. ÇEK / QƏBZ MODALI С ВЫВОДОМ НОМЕРОВ МАШИН */}
      {showReceiptModal && completedOrder && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-5 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150">
            
            <div className="text-center space-y-1 border-b border-slate-200 pb-3">
              <div className="w-10 h-10 bg-[#151515] text-[#F8FF70] font-black rounded-2xl flex items-center justify-center text-base mx-auto">
                M
              </div>
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider">MAKFIT CRM & ENTERPRISE</h3>
              <p className="text-[10px] text-slate-500">Rəsmi Kassa Qəbzi / Ödəniş Təsdiqi</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1 text-[10px]">
              <div className="flex justify-between text-slate-600"><span>Qəbz №:</span> <strong className="font-mono text-slate-900">{completedOrder.orderId}</strong></div>
              <div className="flex justify-between text-slate-600"><span>Tarix & Saat:</span> <strong className="font-mono text-slate-900">{completedOrder.date} | {completedOrder.time}</strong></div>
              <div className="flex justify-between text-slate-600"><span>Müştəri:</span> <strong className="text-slate-900">{completedOrder.client}</strong></div>
              <div className="flex justify-between text-slate-600"><span>Kassir / Operator:</span> <strong className="text-slate-900">{completedOrder.processedBy}</strong></div>
              <div className="flex justify-between text-slate-600"><span>Ödəniş Üsulu:</span> <strong className="text-emerald-700">{completedOrder.paymentMethod}</strong></div>
              
              {completedOrder.comment && (
                <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                  <span>Qeyd / Şərh:</span> <strong className="text-slate-900 italic">{completedOrder.comment}</strong>
                </div>
              )}

              {completedOrder.isFiscalized ? (
                <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center text-emerald-800 font-bold">
                  <span className="flex items-center gap-1"><FileCheck size={12} /> Fiskal №:</span>
                  <span className="font-mono">{completedOrder.fiscalId}</span>
                </div>
              ) : (
                <div className="pt-1.5 border-t border-slate-200 text-slate-400 font-bold">
                  * Fiskallaşdırılmayıb (Daxili Qəbz)
                </div>
              )}
            </div>

            <div className="space-y-1.5 max-h-44 overflow-y-auto custom-scrollbar border-y border-slate-100 py-2">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="space-y-0.5 border-b border-slate-50 pb-1 last:border-0">
                  <div className="flex justify-between text-[11px] font-bold text-slate-800">
                    <span>{item.name} x{item.qty}</span>
                    <span className="font-mono">{(item.price * item.qty).toFixed(2)} AZN</span>
                  </div>
                  {item.carPlates && item.carPlates.length > 0 && (
                    <div className="text-[9px] text-blue-700 font-mono font-extrabold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 flex items-center gap-1 w-fit">
                      <Car size={10} /> Avto: {item.carPlates.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-1 text-xs font-black pt-1">
              {completedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 text-[11px]">
                  <span>VIP / Tətbiq Edilən Endirim:</span>
                  <span>-{completedOrder.discount} AZN</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 text-sm">
                <span>YEKUN ÖDƏNİLƏN:</span>
                <span className="font-mono text-base">{completedOrder.total} AZN</span>
              </div>
            </div>

            {completedOrder.isFiscalized && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-center space-y-1">
                <QrCode size={40} className="mx-auto text-slate-800" />
                <p className="text-[9px] font-mono text-slate-500">NBN QR / Fiskal Çek Təsdiqi</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setShowReceiptModal(false)} 
                className="flex-1 py-2 bg-[#151515] text-[#F8FF70] font-black rounded-xl hover:bg-black transition cursor-pointer text-xs text-center"
              >
                Çap Et Və Bağla 🖨️
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}