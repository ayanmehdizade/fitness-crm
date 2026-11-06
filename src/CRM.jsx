import React, { useState } from 'react';
import { 
  Users, Search, Instagram, Clock, UserCheck, X, SlidersHorizontal, 
  RefreshCw, MessageSquare, Download, FileSpreadsheet, FileText, FileCode, Check,
  CreditCard, Key, Car, Calendar, DollarSign, Snowflake, Activity, Scissors, Sparkles, HandHeart, Dumbbell,
  Receipt, ShieldCheck, Wallet, User, Info, Camera, Upload, Trash2, Ticket, Tag, Plus, Building2, UserPlus, ArrowRight, ArrowRightLeft, Lock, Edit3, LogIn, LogOut
} from 'lucide-react';

const initialLeads = [
  {
    id: 'LED-801',
    name: 'Aysel Əliyeva',
    phone: '+994 50 211 44 55',
    gender: 'Qadın',
    channel: 'Instagram',
    requestTime: '28.10.2026 | 14:35',
    rawDate: '2026-10-28',
    stage: 'tour',
    interest: 'VIP 12 Aylıq + PT',
    assignedTo: 'Ayan X.',
    voucherCode: '',
    notes: [
      { date: '28.10.2026', author: 'Ayan X.', text: 'Direct-dən VIP paket qiymətini soruşdu. Kluba sınaq turuna dəvət olundu.' },
      { date: '29.10.2026', author: 'Ayan X.', text: '30 Oktyabr saat 15:00 üçün klub turu təyin edildi.' }
    ],
    lostReason: ''
  },
  {
    id: 'LED-802',
    name: 'Elvin Cəfərov',
    phone: '+994 55 988 11 22',
    gender: 'Kişi',
    channel: 'WhatsApp',
    requestTime: '28.10.2026 | 11:10',
    rawDate: '2026-10-28',
    stage: 'potential',
    interest: 'Gündüz Tarifi 3 Aylıq',
    assignedTo: 'Orxan M.',
    voucherCode: '',
    notes: [
      { date: '27.10.2026', author: 'Orxan M.', text: 'Sınaq məşqində oldu. Həyat yoldaşı ilə məsləhətləşəcəyini bildirdi.' }
    ],
    lostReason: ''
  },
  {
    id: 'LED-803',
    name: 'Leyla Məmmədova',
    phone: '+994 70 555 33 22',
    gender: 'Qadın',
    channel: 'Voucher',
    requestTime: '29.10.2026 | 16:20',
    rawDate: '2026-10-29',
    stage: 'new',
    interest: '1 Aylıq Promo Keçid',
    assignedTo: 'Ayan X.',
    voucherCode: 'VCH-2026-X89',
    notes: [
      { date: '29.10.2026', author: 'Ayan X.', text: 'Kupon kodu ilə daxil oldu (VCH-2026-X89). Dəvətnamə aktivləşdirildi.' }
    ],
    lostReason: ''
  }
];

const initialClients = [
  {
    id: 'MK-1042',
    name: 'Ayan Xəlilova',
    phone: '+994 50 123 45 67',
    email: 'ayan.khalilova@gmail.com',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    birthYear: '2006',
    gender: 'Qadın',
    city: 'Bakı',
    status: 'active',
    statusText: 'Aktivdir',
    registrationType: 'Standard',
    companyName: '',
    voucherCode: '',
    membershipPackage: 'VIP Gold Limitsiz (1 İllik)',
    startDate: '15.01.2026',
    endDate: '15.01.2027',
    totalSpentVal: '2,450.00',
    totalSpentUnit: 'AZN',
    isFrozen: false,
    freezeDaysLeft: 14,
    lockerRental: {
      hasLocker: true,
      lockerNumber: 'A-42 (VIP Şkaf)',
      sector: 'VIP Xanımlar Zonu',
      startDate: '15.01.2026',
      endDate: '15.01.2027',
      monthlyFeeVal: '40.00',
      status: 'active',
      statusText: 'Ərəndə Aktivdir',
      keyDepositPaid: true
    },
    privileges: [
      'Limitsiz Fitnes & Kardio Keçidi',
      'VIP Locker & Hamam/Sauna Keçidi',
      'Ayda 2 Dəfə Pulsuz Qonaq (Guest Pass)',
      '14 Günlük Paket Dondurma Hüququ',
      '1-ci Pulsuz Bədən Analizi (InBody)',
      'VIP A-Sektor Parkinq Ziyarəti'
    ],
    ptBalance: {
      trainerName: 'Elmir Uçar',
      totalSessions: 12,
      usedSessions: 4,
      remainingSessions: 8,
      depositBalanceVal: '350.00',
      depositBalanceUnit: 'AZN'
    },
    // GİRİŞ VƏ ÇIXIŞ QAPILARI VƏ TURNİKET TARİXÇƏSİ
    gateLogs: [
      { id: 'GL-101', date: '28.10.2026', time: '17:45', actionType: 'exit', gateName: 'Əsas Giriş Turniketi (B-Qapısı)', status: 'Uğurlu Çıxış' },
      { id: 'GL-102', date: '28.10.2026', time: '17:30', actionType: 'exit', gateName: 'VIP Xanımlar Zonu Qapısı', status: 'Uğurlu Çıxış' },
      { id: 'GL-103', date: '28.10.2026', time: '14:30', actionType: 'entry', gateName: 'VIP Xanımlar Zonu Qapısı', status: 'Uğurlu Giriş' },
      { id: 'GL-104', date: '28.10.2026', time: '14:25', actionType: 'entry', gateName: 'Əsas Giriş Turniketi (A-Qapısı)', status: 'Uğurlu Giriş' },
      { id: 'GL-105', date: '28.10.2026', time: '14:20', actionType: 'entry', gateName: 'VIP Avtoparkinq Şlaqbaum Qapısı', status: 'Uğurlu Keçid' }
    ],
    transactions: [
      { 
        id: 'TR-9011', 
        date: '28.10.2026', 
        time: '14:35', 
        item: 'FitBar Protein Shake + BCAA Drink', 
        amountVal: '12.00', 
        amountUnit: 'AZN',
        type: 'POS Kart', 
        location: 'FitBar Kassa', 
        processedBy: 'Nigar H. (Kassir)' 
      },
      { 
        id: 'TR-8920', 
        date: '25.10.2026', 
        time: '17:00', 
        item: 'Relax Masajı (60 Dəq) + Yağ Seansı', 
        amountVal: '65.00', 
        amountUnit: 'AZN',
        type: 'POS Kart', 
        location: 'Wellness Spa Resepşn', 
        processedBy: 'Ayan X. (Supervisor)' 
      },
      { 
        id: 'TR-8102', 
        date: '15.01.2026', 
        time: '11:00', 
        item: 'İllik Şəxsi Şkaf (VIP Locker A-42) Arendası', 
        amountVal: '480.00', 
        amountUnit: 'AZN',
        type: 'POS Kart', 
        location: 'Əsas Resepşn', 
        processedBy: 'Ayan X. (Supervisor)' 
      }
    ],
    accessHistory: [
      { date: '28.10.2026', time: '14:30', type: 'Turniket', detail: 'Əsas Keçid Turniketi (Daxil oldu)' },
      { date: '28.10.2026', time: '14:25', type: 'Parking', detail: 'VIP A-12 Parkinq Yeri (Giriş)' }
    ],
    appointments: [
      { date: '28.10.2026', time: '15:00', service: 'Fərdi Məşq (PT)', master: 'Elmir Uçar', status: 'Tamamlandı' }
    ]
  },
  {
    id: 'MK-1089',
    name: 'Kamran Alıyev',
    phone: '+994 55 444 55 66',
    email: 'kamran.aliyev@mail.ru',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    birthYear: '1998',
    gender: 'Kişi',
    city: 'Bakı',
    status: 'warning', 
    statusText: 'Yenilənmə Sual Altındadır',
    registrationType: 'Corporate',
    companyName: 'SOCAR IT Department',
    voucherCode: 'VCH-CORP-99',
    membershipPackage: 'Standart (6 Aylıq)',
    startDate: '01.06.2026',
    endDate: '01.11.2026',
    totalSpentVal: '620.00',
    totalSpentUnit: 'AZN',
    isFrozen: false,
    freezeDaysLeft: 0,
    lockerRental: {
      hasLocker: false,
      lockerNumber: '',
      sector: '',
      startDate: '',
      endDate: '',
      monthlyFeeVal: '0.00',
      status: 'none',
      statusText: 'Arenda Yoxdur',
      keyDepositPaid: false
    },
    privileges: [
      'Standart Zal Keçidi (08:00 - 23:00)',
      'Ümumi Şkaf Keçidi'
    ],
    ptBalance: {
      trainerName: 'Təyin olunmayıb',
      totalSessions: 0,
      usedSessions: 0,
      remainingSessions: 0,
      depositBalanceVal: '0.00',
      depositBalanceUnit: 'AZN'
    },
    gateLogs: [
      { id: 'GL-201', date: '27.10.2026', time: '21:10', actionType: 'exit', gateName: 'Əsas Giriş Turniketi (A-Qapısı)', status: 'Uğurlu Çıxış' },
      { id: 'GL-202', date: '27.10.2026', time: '19:00', actionType: 'entry', gateName: 'Əsas Giriş Turniketi (A-Qapısı)', status: 'Uğurlu Giriş' }
    ],
    transactions: [],
    accessHistory: [],
    appointments: []
  }
];

const initialVouchers = [
  {
    id: 'VCH-1001',
    code: 'VCH-2026-X89',
    type: 'Gift Voucher (Hədiyyə)',
    package: '1 Aylıq Limitsiz Fitnes + InBody',
    clientName: 'Leyla Məmmədova',
    clientPhone: '+994 70 555 33 22',
    issuer: 'Ayan X. (Supervisor)',
    partnerCompany: 'Pasha Holding Corp',
    issueDate: '15.10.2026',
    expiryDate: '15.11.2026',
    status: 'active',
    discountVal: '100%',
    notes: 'Корпоративный подарок сотруднику года.'
  },
  {
    id: 'VCH-1002',
    code: 'VCH-CORP-99',
    type: 'Corporate B2B',
    package: 'Standart (6 Aylıq)',
    clientName: 'Kamran Alıyev',
    clientPhone: '+994 55 444 55 66',
    issuer: 'Orxan M. (Sales Manager)',
    partnerCompany: 'SOCAR IT Department',
    issueDate: '01.06.2026',
    expiryDate: '01.12.2026',
    status: 'used',
    discountVal: '30%',
    notes: 'Скидочный ваучер по договоренности с партнёром.'
  }
];

export default function CRM() {
  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useState(initialClients);
  const [leads, setLeads] = useState(initialLeads);
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [searchQuery, setSearchQuery] = useState('');

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportSuccess, setExportSuccess] = useState('');

  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');

  const [statusChangeModalLead, setStatusChangeModalLead] = useState(null);
  const [newStageInput, setNewStageInput] = useState('');
  const [stageNoteInput, setStageNoteInput] = useState('');

  const [transferModalLead, setTransferModalLead] = useState(null);
  const [transferFormData, setTransferFormData] = useState({
    name: '',
    phone: '',
    email: '',
    birthYear: '2000',
    gender: 'Qadın',
    city: 'Bakı',
    registrationType: 'Standard',
    companyName: '',
    membershipPackage: 'VIP Gold Limitsiz (1 İllik)',
    voucherCode: '',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  });

  const [courseTransferModalClient, setCourseTransferModalClient] = useState(null);
  const [courseTransferData, setCourseTransferData] = useState({
    targetClientName: '',
    targetClientPhone: '',
    transferReason: ''
  });

  const [lockerModalClient, setLockerModalClient] = useState(null);
  const [lockerFormData, setLockerFormData] = useState({
    lockerNumber: '',
    sector: 'Kişi Zonu',
    startDate: '',
    endDate: '',
    monthlyFeeVal: '30.00',
    keyDepositPaid: true
  });

  const [isEditProfileMode, setIsEditProfileMode] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const [showNewVoucherModal, setShowNewVoucherModal] = useState(false);
  const [newVoucherData, setNewVoucherData] = useState({
    code: '',
    type: 'Gift Voucher (Hədiyyə)',
    package: '1 Aylıq Limitsiz Fitnes',
    clientName: '',
    clientPhone: '',
    partnerCompany: '',
    issuer: 'Ayan X. (Supervisor)',
    expiryDate: '',
    discountVal: '100%',
    notes: ''
  });

  const [profileSaveSuccess, setProfileSaveSuccess] = useState('');

  const fontDisplayStyle = { fontFamily: "'Archivo Expanded', sans-serif", letterSpacing: '-0.02em' };
  const fontTextStyle = { fontFamily: "'TikTok Sans', system-ui, -apple-system, sans-serif", letterSpacing: '-0.01em' };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.phone.includes(searchQuery) ||
                          (lead.voucherCode && lead.voucherCode.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesChannel = filterChannel === 'all' || lead.channel === filterChannel;
    const matchesStage = filterStage === 'all' || lead.stage === filterStage;
    const matchesGender = filterGender === 'all' || lead.gender === filterGender;

    let matchesDate = true;
    if (filterStartDate) matchesDate = matchesDate && lead.rawDate >= filterStartDate;
    if (filterEndDate) matchesDate = matchesDate && lead.rawDate <= filterEndDate;

    return matchesSearch && matchesChannel && matchesStage && matchesGender && matchesDate;
  });

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery) ||
    (client.companyName && client.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (client.lockerRental && client.lockerRental.lockerNumber && client.lockerRental.lockerNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (client.voucherCode && client.voucherCode.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredVouchers = vouchers.filter(v => 
    v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.partnerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.package.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetFilters = () => {
    setFilterChannel('all');
    setFilterStage('all');
    setFilterGender('all');
    setFilterStartDate('');
    setFilterEndDate('');
    setSearchQuery('');
  };

  const handleExport = (format) => {
    setShowExportMenu(false);
    setExportSuccess(`Məlumatlar ${format.toUpperCase()} formatında uğurla yükləndi!`);
    setTimeout(() => setExportSuccess(''), 3000);
  };

  const handleOpenClientModal = (client) => {
    setSelectedClient(client);
    setEditFormData({ ...client });
    setIsEditProfileMode(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedClients = clients.map(c => c.id === editFormData.id ? editFormData : c);
    setClients(updatedClients);
    setSelectedClient(editFormData);
    setIsEditProfileMode(false);
    setProfileSaveSuccess('Məlumatlar və profil fotosu uğurla yeniləndi!');
    setTimeout(() => setProfileSaveSuccess(''), 3000);
  };

  const handlePhotoDelete = () => {
    setEditFormData(prev => ({
      ...prev,
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300'
    }));
  };

  const handleSyncPhoto = () => {
    setProfileSaveSuccess('Turniket биометриясы ilə fotosinxronizasiya tamamlandı!');
    setTimeout(() => setProfileSaveSuccess(''), 3000);
  };

  const handleCreateVoucher = (e) => {
    e.preventDefault();
    const autoCode = newVoucherData.code.trim() ? newVoucherData.code.toUpperCase() : `VCH-2026-${Math.floor(100 + Math.random() * 900)}`;
    const created = {
      id: `VCH-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newVoucherData,
      code: autoCode,
      issueDate: new Date().toLocaleDateString('az-AZ'),
      status: 'active'
    };

    setVouchers([created, ...vouchers]);
    setShowNewVoucherModal(false);
    setExportSuccess(`Vauçer uğurla yaradıldı: ${created.code}`);
    setTimeout(() => setExportSuccess(''), 3000);
    setNewVoucherData({
      code: '',
      type: 'Gift Voucher (Hədiyyə)',
      package: '1 Aylıq Limitsiz Fitnes',
      clientName: '',
      clientPhone: '',
      partnerCompany: '',
      issuer: 'Ayan X. (Supervisor)',
      expiryDate: '',
      discountVal: '100%',
      notes: ''
    });
  };

  const handleOpenStatusModal = (lead) => {
    setStatusChangeModalLead(lead);
    setNewStageInput(lead.stage);
    setStageNoteInput('');
  };

  const handleSaveStatusWithNote = (e) => {
    e.preventDefault();
    if (!stageNoteInput.trim()) {
      alert('Zəhmət olmasa status dəyişikliyi üçün məcburi not/şərh yazın!');
      return;
    }

    const stageNames = {
      new: '🆕 Yeni Lid',
      contacted: '📞 Əlaqə Saxlanıldı',
      tour: '🏋️ Tur Təyin Edildi',
      potential: '🤔 Düşünür',
      won: '✅ Paket Aldı',
      lost: '❌ İmtina Etdi'
    };

    const newNote = {
      date: new Date().toLocaleDateString('az-AZ'),
      author: 'Ayan X.',
      text: `Status yeniləndi [${stageNames[newStageInput] || newStageInput}]: ${stageNoteInput}`
    };

    const updatedLeads = leads.map(l => {
      if (l.id === statusChangeModalLead.id) {
        return {
          ...l,
          stage: newStageInput,
          notes: [newNote, ...l.notes]
        };
      }
      return l;
    });

    setLeads(updatedLeads);
    setStatusChangeModalLead(null);
    setExportSuccess(`Status uğurla yeniləndi və not yazıldı!`);
    setTimeout(() => setExportSuccess(''), 3000);
  };

  const handleOpenTransferModal = (lead) => {
    setTransferModalLead(lead);
    setTransferFormData({
      name: lead.name,
      phone: lead.phone,
      email: `${lead.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      birthYear: '2000',
      gender: lead.gender || 'Qadın',
      city: 'Bakı',
      registrationType: lead.channel === 'Voucher' ? 'Voucher' : 'Standard',
      companyName: '',
      membershipPackage: lead.interest || 'VIP Gold Limitsiz (1 İllik)',
      voucherCode: lead.voucherCode || '',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
    });
  };

  const handleCompleteTransferToClient = (e) => {
    e.preventDefault();
    const createdClient = {
      id: `MK-${Math.floor(1000 + Math.random() * 9000)}`,
      name: transferFormData.name,
      phone: transferFormData.phone,
      email: transferFormData.email,
      photo: transferFormData.photo,
      birthYear: transferFormData.birthYear,
      gender: transferFormData.gender,
      city: transferFormData.city,
      status: 'active',
      statusText: 'Aktivdir',
      registrationType: transferFormData.registrationType,
      companyName: transferFormData.registrationType === 'Corporate' ? transferFormData.companyName : '',
      voucherCode: transferFormData.voucherCode,
      membershipPackage: transferFormData.membershipPackage,
      startDate: new Date().toLocaleDateString('az-AZ'),
      endDate: '15.01.2027',
      totalSpentVal: '0.00',
      totalSpentUnit: 'AZN',
      isFrozen: false,
      freezeDaysLeft: 14,
      lockerRental: {
        hasLocker: false,
        lockerNumber: '',
        sector: '',
        startDate: '',
        endDate: '',
        monthlyFeeVal: '0.00',
        status: 'none',
        statusText: 'Arenda Yoxdur',
        keyDepositPaid: false
      },
      privileges: [
        'Limitsiz Fitnes & Kardio Keçidi',
        'VIP Locker & Hamam/Sauna Keçidi',
        '14 Günlük Paket Dondurma Hüququ'
      ],
      ptBalance: {
        trainerName: 'Təyin olunmayıb',
        totalSessions: 0,
        usedSessions: 0,
        remainingSessions: 0,
        depositBalanceVal: '0.00',
        depositBalanceUnit: 'AZN'
      },
      gateLogs: [],
      transactions: [],
      accessHistory: [],
      appointments: []
    };

    setClients([createdClient, ...clients]);
    setLeads(leads.filter(l => l.id !== transferModalLead.id));
    setTransferModalLead(null);
    setExportSuccess(`${createdClient.name} müvəffəqiyyətlə Müştəri Bazasına transfer edildi!`);
    setTimeout(() => setExportSuccess(''), 3000);
  };

  const handleOpenCourseTransferModal = (client) => {
    setCourseTransferModalClient(client);
    setCourseTransferData({
      targetClientName: '',
      targetClientPhone: '',
      transferReason: ''
    });
  };

  const handleExecuteCourseTransfer = (e) => {
    e.preventDefault();
    if (!courseTransferModalClient) return;

    const sourcePackage = courseTransferModalClient.membershipPackage;
    const targetName = courseTransferData.targetClientName;
    const targetPhone = courseTransferData.targetClientPhone;

    const existingTargetIndex = clients.findIndex(c => c.phone.includes(targetPhone) || c.name.toLowerCase() === targetName.toLowerCase());

    let updatedClientsList = [...clients];

    if (existingTargetIndex !== -1) {
      updatedClientsList[existingTargetIndex] = {
        ...updatedClientsList[existingTargetIndex],
        membershipPackage: sourcePackage,
        status: 'active',
        statusText: 'Aktivdir (Transfer gəldi)',
        ptBalance: { ...courseTransferModalClient.ptBalance }
      };
    } else {
      const newTransferredClient = {
        id: `MK-${Math.floor(1000 + Math.random() * 9000)}`,
        name: targetName,
        phone: targetPhone || '+994 50 000 00 00',
        email: `${targetName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
        photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
        birthYear: '1995',
        gender: 'Qadın',
        city: 'Bakı',
        status: 'active',
        statusText: 'Aktivdir (Transfer gəldi)',
        registrationType: 'Standard',
        companyName: '',
        voucherCode: '',
        membershipPackage: sourcePackage,
        startDate: new Date().toLocaleDateString('az-AZ'),
        endDate: courseTransferModalClient.endDate,
        totalSpentVal: '0.00',
        totalSpentUnit: 'AZN',
        isFrozen: false,
        freezeDaysLeft: 14,
        lockerRental: { hasLocker: false, lockerNumber: '', sector: '', startDate: '', endDate: '', monthlyFeeVal: '0.00', status: 'none', statusText: 'Arenda Yoxdur', keyDepositPaid: false },
        privileges: [...courseTransferModalClient.privileges],
        ptBalance: { ...courseTransferModalClient.ptBalance },
        gateLogs: [],
        transactions: [],
        accessHistory: [],
        appointments: []
      };
      updatedClientsList.unshift(newTransferredClient);
    }

    updatedClientsList = updatedClientsList.map(c => {
      if (c.id === courseTransferModalClient.id) {
        return {
          ...c,
          membershipPackage: 'Paket Transfer Edildi ➡️ ' + targetName,
          status: 'warning',
          statusText: 'Paket Başqasına Keçdi',
          ptBalance: { trainerName: 'Yoxdur', totalSessions: 0, usedSessions: 0, remainingSessions: 0, depositBalanceVal: '0.00', depositBalanceUnit: 'AZN' }
        };
      }
      return c;
    });

    setClients(updatedClientsList);

    if (selectedClient && selectedClient.id === courseTransferModalClient.id) {
      setSelectedClient({
        ...selectedClient,
        membershipPackage: 'Paket Transfer Edildi ➡️ ' + targetName,
        statusText: 'Paket Başqasına Keçdi'
      });
    }

    setCourseTransferModalClient(null);
    setExportSuccess(`" ${sourcePackage} " paketi uğurla ${targetName} adlı şəxsə transfer edildi!`);
    setTimeout(() => setExportSuccess(''), 4000);
  };

  const handleOpenLockerModal = (client) => {
    setLockerModalClient(client);
    setLockerFormData({
      lockerNumber: client.lockerRental?.lockerNumber || '',
      sector: client.lockerRental?.sector || 'VIP Xanımlar Zonu',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2027-01-15',
      monthlyFeeVal: client.lockerRental?.monthlyFeeVal || '40.00',
      keyDepositPaid: true
    });
  };

  const handleSaveLockerRental = (e) => {
    e.preventDefault();
    if (!lockerModalClient) return;

    const newLockerObj = {
      hasLocker: true,
      lockerNumber: lockerFormData.lockerNumber || 'L-101',
      sector: lockerFormData.sector,
      startDate: lockerFormData.startDate,
      endDate: lockerFormData.endDate,
      monthlyFeeVal: lockerFormData.monthlyFeeVal,
      status: 'active',
      statusText: 'Ərəndə Aktivdir',
      keyDepositPaid: lockerFormData.keyDepositPaid
    };

    const updatedClientsList = clients.map(c => {
      if (c.id === lockerModalClient.id) {
        return {
          ...c,
          lockerRental: newLockerObj
        };
      }
      return c;
    });

    setClients(updatedClientsList);

    if (selectedClient && selectedClient.id === lockerModalClient.id) {
      setSelectedClient({
        ...selectedClient,
        lockerRental: newLockerObj
      });
    }

    setLockerModalClient(null);
    setExportSuccess(`Şəxsi Şkaf Arendası müvəffəqiyyətlə rəsmiləşdirildi: ${newLockerObj.lockerNumber}`);
    setTimeout(() => setExportSuccess(''), 4000);
  };

  return (
    <div style={fontTextStyle} className="m-0 p-0 box-border flex flex-col h-full w-full overflow-hidden bg-[#F8FAFC] text-slate-800 gap-2 select-none">
      
      {/* 1. LIGHT HEADER PANEL WITH BLUE TAB SWITCHING */}
      <div className="bg-white border-b border-slate-200/90 px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div style={fontDisplayStyle} className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-xs">
            M
          </div>
          <div>
            <h3 style={fontDisplayStyle} className="font-black text-slate-900 text-xs tracking-wider uppercase">
              MAKFIT — CRM & Voucher Pipeline
            </h3>
            <p style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">Müştəri profilləri, daxil olan müraciətlər, Vauçer və Şkaf (Locker) idarəetməsi</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* EXPORT MENU */}
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              style={fontTextStyle}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download size={13} /> Eksport Et
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-1.5 space-y-1">
                <p style={fontTextStyle} className="text-[9px] font-black uppercase text-slate-400 px-2 py-1">Formatı Seçin:</p>
                <button 
                  onClick={() => handleExport('excel')}
                  style={fontTextStyle}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-extrabold text-[11px] flex items-center gap-2 transition cursor-pointer"
                >
                  <FileSpreadsheet size={13} className="text-emerald-600" /> Excel (.xlsx)
                </button>
                <button 
                  onClick={() => handleExport('pdf')}
                  style={fontTextStyle}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-extrabold text-[11px] flex items-center gap-2 transition cursor-pointer"
                >
                  <FileText size={13} className="text-rose-600" /> PDF Sənəd (.pdf)
                </button>
                <button 
                  onClick={() => handleExport('word')}
                  style={fontTextStyle}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-800 font-extrabold text-[11px] flex items-center gap-2 transition cursor-pointer"
                >
                  <FileCode size={13} className="text-blue-600" /> Word (.docx)
                </button>
              </div>
            )}
          </div>

          {/* TAB BUTTONS (CLIENTS / LEADS / VOUCHERS) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px]">
            <button
              onClick={() => setActiveTab('clients')}
              style={fontTextStyle}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 font-extrabold ${
                activeTab === 'clients' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={12} /> Müştərilər ({clients.length})
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              style={fontTextStyle}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 font-extrabold ${
                activeTab === 'leads' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Instagram size={12} /> Lidlər ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('vouchers')}
              style={fontTextStyle}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 font-extrabold ${
                activeTab === 'vouchers' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Ticket size={12} /> Vauçerlər ({vouchers.length})
            </button>
          </div>
        </div>
      </div>

      {/* NOTIFICATION */}
      {exportSuccess && (
        <div style={fontTextStyle} className="mx-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-2xs animate-in fade-in">
          <Check size={14} className="text-emerald-600" /> {exportSuccess}
        </div>
      )}

      {/* 2. SEARCH & FILTERS BAR */}
      <div className="bg-white border border-slate-200/90 p-2 rounded-2xl space-y-1.5 shrink-0 mx-2 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-2 text-slate-400" size={13} />
            <input 
              style={fontTextStyle}
              type="text" 
              placeholder={
                activeTab === 'clients' ? "Axtarış (ID, Ad, Tel, Şkaf №, Şirkət)..." :
                activeTab === 'leads' ? "Lid axtarışı..." : "Vauçer kodu, Şirkət və ya Müştəri..."
              }
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded-xl text-xs font-extrabold bg-slate-50 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {activeTab === 'vouchers' && (
            <button
              onClick={() => setShowNewVoucherModal(true)}
              style={fontTextStyle}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Plus size={14} /> Yeni Vauçer Yarat
            </button>
          )}

          {activeTab === 'leads' && (
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                style={fontTextStyle}
                className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1 transition cursor-pointer ${
                  showFilterPanel || filterChannel !== 'all' || filterStage !== 'all' || filterGender !== 'all'
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal size={12} /> Süzgəclər
              </button>

              {(filterChannel !== 'all' || filterStage !== 'all' || filterGender !== 'all' || filterStartDate || filterEndDate) && (
                <button 
                  onClick={resetFilters}
                  className="p-1.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition text-xs font-bold cursor-pointer"
                  title="Süzgəcləri Sıfırla"
                >
                  <RefreshCw size={12} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. MAIN TABLES CONTAINER */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden mx-2 mb-2 shadow-2xs flex flex-col">
        
        {/* CLIENTS TABLE */}
        {activeTab === 'clients' && (
          <div className="overflow-auto h-full">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-800 border-b border-slate-200">
                <tr className="uppercase font-black text-[10px] tracking-wider text-slate-600">
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Müştəri ID</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Foto & Ad Soyad</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Telefon Nömrəsi</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Kateqoriya Və Mənbə</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Cari Paket / Kurs</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">🔑 Şəxsi Şkaf (Locker) Statusu</th>
                  <th style={fontTextStyle} className="p-3 text-right">Ətraflı & Kurs Transferi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-slate-50 transition">
                    <td style={fontDisplayStyle} className="p-3 border-r border-slate-100 font-black text-slate-900">{client.id}</td>
                    <td className="p-3 border-r border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img src={client.photo} alt={client.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs" />
                        <div>
                          <span style={fontTextStyle} className="font-extrabold text-slate-900 block text-xs">{client.name}</span>
                          <span style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">{client.email}</span>
                        </div>
                      </div>
                    </td>
                    <td style={fontDisplayStyle} className="p-3 border-r border-slate-100 font-black text-slate-800">{client.phone}</td>
                    <td className="p-3 border-r border-slate-100">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {client.registrationType === 'Corporate' ? (
                          <span style={fontTextStyle} className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-lg font-black text-[10px] flex items-center gap-1">
                            <Building2 size={11} className="text-blue-600" /> {client.companyName || 'Korporativ'}
                          </span>
                        ) : client.registrationType === 'Voucher' ? (
                          <span style={fontTextStyle} className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-lg font-black text-[10px] flex items-center gap-1" title={`Voucher: ${client.voucherCode}`}>
                            <Ticket size={11} /> Voucher ({client.voucherCode || 'Aktiv'})
                          </span>
                        ) : (
                          <span style={fontTextStyle} className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-lg font-extrabold text-[10px]">
                            Standart Alış
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 border-r border-slate-100">
                      <span style={fontTextStyle} className="font-extrabold text-slate-900 block text-[11px]">{client.membershipPackage}</span>
                      <span style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">{client.startDate} - {client.endDate}</span>
                    </td>

                    {/* LOCKER STATUS COLUMN */}
                    <td className="p-3 border-r border-slate-100">
                      {client.lockerRental && client.lockerRental.hasLocker ? (
                        <div className="flex items-center gap-1.5">
                          <span style={fontDisplayStyle} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-black text-[10px] flex items-center gap-1">
                            <Lock size={11} className="text-emerald-600" /> {client.lockerRental.lockerNumber}
                          </span>
                          <span style={fontTextStyle} className="text-[10px] text-slate-500 font-extrabold">({client.lockerRental.monthlyFeeVal} AZN/ay)</span>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleOpenLockerModal(client)}
                          style={fontTextStyle}
                          className="text-slate-400 hover:text-blue-600 font-extrabold text-[10px] bg-slate-50 hover:bg-blue-50 px-2 py-0.5 rounded-md border border-slate-200 hover:border-blue-200 transition inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Lock size={10} /> + Şkaf Arenda Et
                        </button>
                      )}
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* KURS / PAKETİ BAŞQASINA TRANSFER DÜYMƏSİ */}
                        <button
                          onClick={() => handleOpenCourseTransferModal(client)}
                          style={fontTextStyle}
                          className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1.5 rounded-xl font-extrabold text-[11px] transition inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                          title="Bu müştərinin kursunu/paketini başqa şəxsə transfer et"
                        >
                          <ArrowRightLeft size={12} className="text-amber-700" />
                          <span>Kursu Transfer Et</span>
                        </button>

                        <button 
                          onClick={() => handleOpenClientModal(client)}
                          style={fontTextStyle}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl font-extrabold text-xs transition cursor-pointer shadow-xs"
                        >
                          Ətraflı 📊
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* LEADS TABLE */}
        {activeTab === 'leads' && (
          <div className="overflow-auto h-full">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-800 border-b border-slate-200">
                <tr className="uppercase font-black text-[10px] tracking-wider text-slate-600">
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Lid ID</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Ad Soyad & Cins</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Telefon Nömrəsi</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Hardan Gəldi (Kanal)</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Tarix & Saat</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Status (Mərhələ)</th>
                  <th style={fontTextStyle} className="p-3 text-right">Əməliyyatlar & Transfer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredLeads.map(lead => {
                  const stageBadgeClasses = {
                    new: 'bg-blue-50 text-blue-700 border-blue-200',
                    contacted: 'bg-amber-50 text-amber-800 border-amber-200',
                    tour: 'bg-purple-50 text-purple-800 border-purple-200',
                    potential: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                    won: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    lost: 'bg-rose-50 text-rose-800 border-rose-200'
                  };

                  const stageNames = {
                    new: '🆕 Yeni Lid',
                    contacted: '📞 Əlaqə Saxlanıldı',
                    tour: '🏋️ Tur Təyin Edildi',
                    potential: '🤔 Düşünür',
                    won: '✅ Paket Aldı',
                    lost: '❌ İmtina Etdi'
                  };

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50 transition">
                      <td style={fontDisplayStyle} className="p-3 border-r border-slate-100 font-black text-slate-900">{lead.id}</td>
                      <td className="p-3 border-r border-slate-100">
                        <span style={fontTextStyle} className="font-extrabold text-slate-900 mr-2 text-xs">{lead.name}</span>
                        <span style={fontTextStyle} className="text-[9px] font-extrabold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md border border-slate-200">{lead.gender}</span>
                      </td>
                      <td style={fontDisplayStyle} className="p-3 border-r border-slate-100 font-black text-slate-800">{lead.phone}</td>
                      <td className="p-3 border-r border-slate-100">
                        <span style={fontTextStyle} className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1 ${
                          lead.channel === 'Voucher' 
                            ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                            : lead.channel === 'Instagram' 
                            ? 'bg-pink-100 text-pink-800 border border-pink-200' 
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {lead.channel === 'Voucher' ? <Ticket size={11} /> : <Instagram size={11} />} {lead.channel}
                          {lead.voucherCode && <strong className="ml-1 text-purple-900 font-black">({lead.voucherCode})</strong>}
                        </span>
                      </td>
                      <td style={fontTextStyle} className="p-3 border-r border-slate-100 text-slate-500 text-[10px] font-bold">{lead.requestTime}</td>
                      <td className="p-3 border-r border-slate-100">
                        <button
                          onClick={() => handleOpenStatusModal(lead)}
                          style={fontTextStyle}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-black border flex items-center gap-1 transition cursor-pointer ${stageBadgeClasses[lead.stage] || 'bg-slate-100 text-slate-800'}`}
                          title="Statusu yeniləmək və not yazmaq üçün klikləyin"
                        >
                          <span>{stageNames[lead.stage] || lead.stage}</span>
                          <RefreshCw size={10} className="ml-1 opacity-60" />
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenTransferModal(lead)}
                            style={fontTextStyle}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-xl font-extrabold text-[11px] transition inline-flex items-center gap-1 cursor-pointer shadow-xs"
                            title="Bu lidi Müştəri Bazasına çevir"
                          >
                            <UserPlus size={12} />
                            <span>Müştəriyə Çevir</span>
                          </button>

                          <button 
                            onClick={() => setSelectedLead(lead)}
                            style={fontTextStyle}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-xl font-extrabold text-[11px] transition inline-flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <MessageSquare size={12} />
                            <span>Notlar ({lead.notes.length})</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* VOUCHERS TABLE */}
        {activeTab === 'vouchers' && (
          <div className="overflow-auto h-full">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead className="sticky top-0 z-10 bg-slate-100 text-slate-800 border-b border-slate-200">
                <tr className="uppercase font-black text-[10px] tracking-wider text-slate-600">
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Vauçer Kodu & ID</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Təyin Olunan Paket / Xidmət</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Müştəri / Sahibi</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Mənbə & Tərtib Edən</th>
                  <th style={fontTextStyle} className="p-3 border-r border-slate-200">Endirim & Status</th>
                  <th style={fontTextStyle} className="p-3 text-right">Verilmə Və Bitiş Tarixi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredVouchers.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 border-r border-slate-100">
                      <div className="flex items-center gap-2">
                        <span style={fontDisplayStyle} className="font-black text-purple-700 bg-purple-50 px-2 py-1 rounded-lg border border-purple-200 text-xs">
                          {v.code}
                        </span>
                        <span style={fontDisplayStyle} className="text-[10px] text-slate-400">{v.id}</span>
                      </div>
                      <span style={fontTextStyle} className="text-[10px] text-slate-500 block mt-0.5 font-bold">{v.type}</span>
                    </td>

                    <td className="p-3 border-r border-slate-100">
                      <span style={fontTextStyle} className="font-extrabold text-slate-900 block">{v.package}</span>
                      <span style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">{v.notes || 'Qeyd yoxdur'}</span>
                    </td>

                    <td className="p-3 border-r border-slate-100">
                      <span style={fontTextStyle} className="font-extrabold text-slate-900 block">{v.clientName}</span>
                      <span style={fontDisplayStyle} className="text-[10px] text-slate-500">{v.clientPhone}</span>
                    </td>

                    <td className="p-3 border-r border-slate-100">
                      <span style={fontTextStyle} className="font-extrabold text-slate-800 flex items-center gap-1 text-[11px]">
                        <Building2 size={12} className="text-blue-600" /> {v.partnerCompany || 'Daxili Aksiyalar'}
                      </span>
                      <span style={fontTextStyle} className="text-[10px] text-slate-400 font-bold block">Verən: {v.issuer}</span>
                    </td>

                    <td className="p-3 border-r border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span style={fontDisplayStyle} className="bg-slate-100 text-slate-900 font-black px-2 py-0.5 rounded text-[10px]">
                          {v.discountVal}
                        </span>
                        
                        {v.status === 'active' && (
                          <span style={fontTextStyle} className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-extrabold text-[10px]">
                            Aktiv (Hazır)
                          </span>
                        )}
                        {v.status === 'used' && (
                          <span style={fontTextStyle} className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md font-extrabold text-[10px]">
                            İstifadə Edilib
                          </span>
                        )}
                        {v.status === 'expired' && (
                          <span style={fontTextStyle} className="bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md font-extrabold text-[10px]">
                            Vaxtı Bitib
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3 text-right">
                      <span style={fontTextStyle} className="font-extrabold text-slate-700 block text-[11px]">{v.issueDate} — {v.expiryDate}</span>
                      <span style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">Bitiş Müddəti</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* 4. CLIENT MODAL & FULL MINI DASHBOARD */}
      {selectedClient && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-2 sm:p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full p-6 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150 max-h-[94vh] overflow-y-auto relative">
            
            <button 
              onClick={() => setSelectedClient(null)} 
              className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-600 rounded-xl transition bg-slate-50 hover:bg-slate-100 cursor-pointer z-20"
            >
              <X size={20} />
            </button>

            {/* PROFILE HEADER */}
            <div className="flex flex-col items-center text-center border-b border-slate-100 pb-4 relative pt-2">
              <div className="relative group mb-2">
                <img 
                  src={selectedClient.photo} 
                  alt={selectedClient.name} 
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-600 shadow-lg transition transform group-hover:scale-105" 
                />
                <button 
                  onClick={() => setIsEditProfileMode(true)}
                  className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-xl shadow-md hover:bg-blue-700 transition cursor-pointer"
                  title="Fotonu Yenilə"
                >
                  <Camera size={13} />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span style={fontDisplayStyle} className="text-xs font-black text-slate-400">{selectedClient.id}</span>
                  <span style={fontTextStyle} className={`px-2.5 py-0.5 rounded-md font-extrabold text-[10px] ${
                    selectedClient.status === 'active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedClient.statusText}
                  </span>

                  {selectedClient.registrationType === 'Corporate' && (
                    <span style={fontTextStyle} className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-md font-black text-[10px] flex items-center gap-1">
                      <Building2 size={12} /> Korporativ: {selectedClient.companyName || 'Təyin Olunmayıb'}
                    </span>
                  )}

                  {selectedClient.registrationType === 'Voucher' && (
                    <span style={fontTextStyle} className="bg-purple-100 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-md font-black text-[10px] flex items-center gap-1">
                      <Ticket size={12} /> Voucher: {selectedClient.voucherCode || 'Aktiv'}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 mt-1">
                  <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-lg tracking-tight">
                    {selectedClient.name}
                  </h3>

                  <button 
                    onClick={() => setIsEditProfileMode(!isEditProfileMode)}
                    style={fontTextStyle}
                    className={`px-3 py-1 rounded-xl font-extrabold text-[11px] flex items-center gap-1.5 transition cursor-pointer shadow-2xs border ${
                      isEditProfileMode 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    }`}
                  >
                    <Info size={14} className={isEditProfileMode ? 'text-white' : 'text-blue-600'} />
                    <span>Info & Redaktə</span>
                  </button>
                </div>

                <p style={fontTextStyle} className="text-xs text-slate-500 font-bold flex items-center justify-center gap-2">
                  <span>{selectedClient.phone}</span> • <span>{selectedClient.email}</span>
                </p>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span style={fontTextStyle} className="bg-slate-100 px-2 py-0.5 rounded-md text-[10px] font-extrabold text-slate-600 border border-slate-200">
                    🎂 {selectedClient.birthYear || '2006'} il
                  </span>
                  <span style={fontTextStyle} className="bg-slate-100 px-2 py-0.5 rounded-md text-[10px] font-extrabold text-slate-600 border border-slate-200">
                    👤 {selectedClient.gender || 'Qadın'}
                  </span>
                  <span style={fontTextStyle} className="bg-slate-100 px-2 py-0.5 rounded-md text-[10px] font-extrabold text-slate-600 border border-slate-200">
                    📍 {selectedClient.city || 'Bakı'}
                  </span>
                </div>
              </div>
            </div>

            {profileSaveSuccess && (
              <div style={fontTextStyle} className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-2xs">
                <Check size={16} className="text-emerald-600" /> {profileSaveSuccess}
              </div>
            )}

            {/* EDIT MODE OR FULL DASHBOARD */}
            {isEditProfileMode ? (
              <form onSubmit={handleSaveProfile} className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 style={fontDisplayStyle} className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Info size={16} className="text-blue-600" /> Müştərinin Şəxsi Məlumatlarının Tam Redaktəsi
                  </h4>
                  <span style={fontTextStyle} className="text-[10px] text-slate-500 font-bold">MK Profil Redaktoru</span>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={editFormData.photo} alt="Preview" className="w-14 h-14 rounded-xl object-cover border-2 border-slate-200" />
                    <div>
                      <span style={fontTextStyle} className="font-extrabold text-slate-900 text-xs block">Profil Fotosunu Yenilə</span>
                      <p style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">Turniket биометриясы və kassa üçün profil fotosu</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button 
                      type="button" 
                      style={fontTextStyle}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl text-[10px] flex items-center gap-1 transition cursor-pointer"
                    >
                      <Upload size={12} /> Yüklə
                    </button>
                    <button 
                      type="button" 
                      style={fontTextStyle}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl text-[10px] flex items-center gap-1 transition cursor-pointer"
                    >
                      <Camera size={12} /> Переснять
                    </button>
                    <button 
                      type="button" 
                      onClick={handleSyncPhoto}
                      style={fontTextStyle}
                      className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold rounded-xl text-[10px] flex items-center gap-1 transition cursor-pointer border border-blue-200"
                    >
                      <RefreshCw size={12} /> Sinxronizasiya
                    </button>
                    <button 
                      type="button" 
                      onClick={handlePhotoDelete}
                      style={fontTextStyle}
                      className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold rounded-xl text-[10px] flex items-center gap-1 transition cursor-pointer border border-rose-200"
                    >
                      <Trash2 size={12} /> Sil
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Ad və Soyad:</label>
                    <input 
                      style={fontTextStyle}
                      type="text" 
                      value={editFormData.name || ''} 
                      onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-extrabold text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Təvəllüd (İl):</label>
                    <input 
                      style={fontDisplayStyle}
                      type="text" 
                      value={editFormData.birthYear || ''} 
                      onChange={e => setEditFormData({ ...editFormData, birthYear: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-black text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Cinsiyyət:</label>
                    <select 
                      style={fontTextStyle}
                      value={editFormData.gender || 'Qadın'} 
                      onChange={e => setEditFormData({ ...editFormData, gender: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-extrabold text-slate-800 outline-none"
                    >
                      <option value="Qadın">Qadın</option>
                      <option value="Kişi">Kişi</option>
                    </select>
                  </div>

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Müştəri Kateqoriyası:</label>
                    <select 
                      style={fontTextStyle}
                      value={editFormData.registrationType || 'Standard'} 
                      onChange={e => setEditFormData({ ...editFormData, registrationType: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-extrabold text-slate-800 outline-none"
                    >
                      <option value="Standard">Standart Alış</option>
                      <option value="Voucher">🎟️ Voucher / Kupon</option>
                      <option value="Corporate">🏢 Korporativ Müştəri</option>
                    </select>
                  </div>

                  {editFormData.registrationType === 'Corporate' && (
                    <div>
                      <label style={fontTextStyle} className="block text-blue-700 font-extrabold mb-1">Şirkət Adı (Korporativ):</label>
                      <input 
                        style={fontTextStyle}
                        type="text" 
                        placeholder="Məs: SOCAR, Pasha Holding..."
                        value={editFormData.companyName || ''} 
                        onChange={e => setEditFormData({ ...editFormData, companyName: e.target.value })}
                        className="w-full p-2 border border-blue-200 bg-blue-50/40 rounded-xl font-extrabold text-slate-800 outline-none focus:border-blue-500"
                      />
                    </div>
                  )}

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Voucher Kodu (əgər varsa):</label>
                    <input 
                      style={fontDisplayStyle}
                      type="text" 
                      placeholder="Məs: VCH-2026-X89"
                      value={editFormData.voucherCode || ''} 
                      onChange={e => setEditFormData({ ...editFormData, voucherCode: e.target.value.toUpperCase() })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-black text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Telefon Nömrəsi:</label>
                    <input 
                      style={fontDisplayStyle}
                      type="text" 
                      value={editFormData.phone || ''} 
                      onChange={e => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className="w-full p-2 border border-slate-200 rounded-xl bg-white font-black text-slate-800 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center gap-2 pt-2 border-t border-slate-200">
                  <button 
                    type="button" 
                    onClick={() => setIsEditProfileMode(false)}
                    style={fontTextStyle}
                    className="px-4 py-2 bg-slate-200 text-slate-700 font-extrabold rounded-xl hover:bg-slate-300 transition cursor-pointer text-xs"
                  >
                    Ləğv Et
                  </button>
                  <button 
                    type="submit" 
                    style={fontTextStyle}
                    className="px-6 py-2 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition cursor-pointer text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Check size={14} /> Məlumatları Yadda Saxla
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div className="space-y-3">
                  {/* PAKET VƏ İMTİYAZLAR */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                      <span style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                        <ShieldCheck size={16} className="text-emerald-600" /> Cari Paket / Kurs: <strong className="text-slate-900">{selectedClient.membershipPackage}</strong>
                      </span>

                      <button
                        onClick={() => handleOpenCourseTransferModal(selectedClient)}
                        style={fontTextStyle}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-xl font-extrabold text-[10px] flex items-center gap-1 cursor-pointer transition"
                      >
                        <ArrowRightLeft size={11} /> Kursu Transfer Et
                      </button>
                    </div>

                    <div>
                      <span style={fontTextStyle} className="text-[10px] font-extrabold text-slate-400 uppercase block mb-1">Paketin İmtiyazları Və Hüquqları:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {selectedClient.privileges.map((priv, idx) => (
                          <div key={idx} style={fontTextStyle} className="bg-white p-2 rounded-xl border border-slate-200/80 font-extrabold text-slate-800 flex items-center gap-1.5 text-[10px]">
                            <Check size={12} className="text-emerald-600 shrink-0" />
                            <span>{priv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 🗝️ ŞƏXSİ ŞKAF (LOCKER RENTAL) MƏLUMAT VƏ ARENDA BLOKU */}
                  <div className="bg-gradient-to-r from-slate-50 to-emerald-50/50 p-3.5 rounded-2xl border border-emerald-200/80 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                      <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                        <Lock size={16} className="text-emerald-600" /> Şəxsi Şkaf (Locker) Arendası Məlumatları
                      </h4>
                      <button
                        onClick={() => handleOpenLockerModal(selectedClient)}
                        style={fontTextStyle}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-xl font-extrabold text-[10px] flex items-center gap-1 cursor-pointer transition shadow-xs"
                      >
                        <Edit3 size={11} /> {selectedClient.lockerRental?.hasLocker ? 'Arendanı Yenilə' : '+ Şkaf Arenda Et'}
                      </button>
                    </div>

                    {selectedClient.lockerRental && selectedClient.lockerRental.hasLocker ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <span style={fontTextStyle} className="text-[9px] text-slate-400 font-extrabold uppercase block">Şkaf № Və Sektor</span>
                          <p style={fontDisplayStyle} className="font-black text-emerald-700 text-xs">{selectedClient.lockerRental.lockerNumber}</p>
                          <span style={fontTextStyle} className="text-[9px] text-slate-500 font-bold block">{selectedClient.lockerRental.sector}</span>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-200">
                          <span style={fontTextStyle} className="text-[9px] text-slate-400 font-extrabold uppercase block">Aylıq Arenda Haqqı</span>
                          <p style={fontDisplayStyle} className="font-black text-slate-900 text-xs">{selectedClient.lockerRental.monthlyFeeVal} AZN / ay</p>
                          <span style={fontTextStyle} className="text-[9px] text-emerald-600 font-extrabold block">Deposit Ödənilib</span>
                        </div>
                        <div className="bg-white p-2 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                          <span style={fontTextStyle} className="text-[9px] text-slate-400 font-extrabold uppercase block">Arenda Müddəti</span>
                          <p style={fontTextStyle} className="font-extrabold text-slate-800 text-[10px] mt-0.5">{selectedClient.lockerRental.startDate} — {selectedClient.lockerRental.endDate}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white p-3 rounded-xl border border-dashed border-slate-300 text-center space-y-1">
                        <p style={fontTextStyle} className="text-slate-500 font-bold text-xs">Müştərinin aktiv şəxsi şkaf (Locker) arendası mövcud deyil.</p>
                        <button 
                          onClick={() => handleOpenLockerModal(selectedClient)}
                          style={fontTextStyle}
                          className="text-blue-600 hover:underline font-extrabold text-xs inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Lock size={12} /> İndi Müştəriyə Şəxsi Şkaf Təyin Et
                        </button>
                      </div>
                    )}
                  </div>

                  {/* TƏLİMÇİ PT BALANSI */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                    <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                      <Dumbbell size={16} className="text-purple-600" /> Təlimçi (PT) Balansı Və Seanslar
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span style={fontTextStyle} className="text-[9px] text-slate-400 font-extrabold uppercase block">Məşqçi</span>
                        <p style={fontTextStyle} className="font-extrabold text-slate-900 text-xs truncate">{selectedClient.ptBalance.trainerName}</p>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200">
                        <span style={fontTextStyle} className="text-[9px] text-slate-400 font-extrabold uppercase block">Qalan Seans</span>
                        <p style={fontDisplayStyle} className="font-black text-emerald-600 text-xs">{selectedClient.ptBalance.remainingSessions} Seans</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-3">
                  
                  {/* 🚪 GİRİŞ VƏ ÇIXIŞ QAPILARI TARİXÇƏSİ BLOKU (TƏZƏ ƏLAVƏ EDİLDİ) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                      <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                        <LogIn size={16} className="text-blue-600" /> Qapı və Turniket Keçid Tarixçəsi
                      </h4>
                      <span style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">Keçid Giriş/Çıxış</span>
                    </div>

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {selectedClient.gateLogs && selectedClient.gateLogs.length > 0 ? (
                        selectedClient.gateLogs.map((log) => (
                          <div key={log.id} className="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-2">
                              {log.actionType === 'entry' ? (
                                <span className="bg-emerald-100 text-emerald-800 p-1.5 rounded-lg font-black flex items-center gap-1 text-[9px]">
                                  <LogIn size={12} className="text-emerald-600" /> GİRİŞ
                                </span>
                              ) : (
                                <span className="bg-amber-100 text-amber-800 p-1.5 rounded-lg font-black flex items-center gap-1 text-[9px]">
                                  <LogOut size={12} className="text-amber-600" /> ÇIXIŞ
                                </span>
                              )}
                              <div>
                                <span style={fontTextStyle} className="font-extrabold text-slate-900 block">{log.gateName}</span>
                                <span style={fontTextStyle} className="text-[9px] text-slate-400 font-bold">{log.date} — {log.time}</span>
                              </div>
                            </div>
                            <span style={fontTextStyle} className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-bold text-[9px]">
                              {log.status}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p style={fontTextStyle} className="text-[10px] text-slate-400 italic text-center py-2">Keçid tarixçəsi tapılmadı</p>
                      )}
                    </div>
                  </div>

                  {/* KASSA & BILLING */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                    <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                      <Receipt size={16} className="text-emerald-700" /> Ətraflı Kassa & Billing Tarixçəsi
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {selectedClient.transactions.map((tr) => (
                        <div key={tr.id} className="bg-white p-2 rounded-xl border border-slate-200 text-[10px]">
                          <span style={fontTextStyle} className="font-extrabold text-slate-900 block">{tr.item}</span>
                          <span style={fontTextStyle} className="text-[9px] text-slate-400">{tr.date} • {tr.amountVal} {tr.amountUnit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={() => setSelectedClient(null)} 
                style={fontTextStyle}
                className="px-6 py-2 bg-slate-100 text-slate-800 font-extrabold rounded-xl hover:bg-slate-200 transition cursor-pointer text-xs"
              >
                Bağla
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. MODAL: KURSU BAŞQASINA TRANSFER ETMƏK */}
      {courseTransferModalClient && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-black">
                  <ArrowRightLeft size={18} />
                </div>
                <div>
                  <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-sm">Kursu / Paketi Başqasına Transfer Et</h3>
                  <p style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">Aktiv paketi başqa şəxsin adına keçirin</p>
                </div>
              </div>
              <button onClick={() => setCourseTransferModalClient(null)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleExecuteCourseTransfer} className="space-y-3">
              <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span style={fontTextStyle} className="text-amber-900 font-extrabold">Ötürən Müştəri:</span>
                  <strong style={fontTextStyle} className="text-slate-900 font-black">{courseTransferModalClient.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span style={fontTextStyle} className="text-amber-900 font-extrabold">Transfer Olunacaq Paket:</span>
                  <strong style={fontTextStyle} className="text-slate-900 font-black">{courseTransferModalClient.membershipPackage}</strong>
                </div>
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Qəbul Edən Şəxsin Adı Və Soyadı:</label>
                <input 
                  style={fontTextStyle}
                  type="text" 
                  placeholder="Məs: Əli Nəcəfov"
                  value={courseTransferData.targetClientName}
                  onChange={e => setCourseTransferData({ ...courseTransferData, targetClientName: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-extrabold text-slate-900 outline-none focus:bg-white"
                  required
                />
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Qəbul Edən Şəxsin Telefon Nömrəsi:</label>
                <input 
                  style={fontDisplayStyle}
                  type="text" 
                  placeholder="+994 50 000 00 00"
                  value={courseTransferData.targetClientPhone}
                  onChange={e => setCourseTransferData({ ...courseTransferData, targetClientPhone: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-black text-slate-900 outline-none focus:bg-white"
                  required
                />
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Transfer Səbəbi / Qeyd:</label>
                <textarea 
                  style={fontTextStyle}
                  rows="2"
                  placeholder="Məs: Şəxsi səbəblərlə bağlı paketini rəfiqəsinə hədiyyə etdi..."
                  value={courseTransferData.transferReason}
                  onChange={e => setCourseTransferData({ ...courseTransferData, transferReason: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-extrabold text-slate-900 outline-none focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setCourseTransferModalClient(null)} 
                  style={fontTextStyle}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-extrabold rounded-xl hover:bg-slate-200 transition cursor-pointer"
                >
                  Ləğv Et
                </button>
                <button 
                  type="submit" 
                  style={fontTextStyle}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <ArrowRightLeft size={14} /> Kursu Başqasına Transfer Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: LOCKER (ŞƏXSİ ŞKAF) ARENDASI YAZILMASI VƏ MODALI */}
      {lockerModalClient && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-black">
                  <Lock size={18} />
                </div>
                <div>
                  <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-sm">Şəxsi Şkaf (Locker) Arendası</h3>
                  <p style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">{lockerModalClient.name} üçün şkaf təyin edin</p>
                </div>
              </div>
              <button onClick={() => setLockerModalClient(null)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveLockerRental} className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Şkaf Nömrəsi (№):</label>
                  <input 
                    style={fontDisplayStyle}
                    type="text" 
                    placeholder="Məs: A-42 və ya L-105"
                    value={lockerFormData.lockerNumber}
                    onChange={e => setLockerFormData({ ...lockerFormData, lockerNumber: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-black text-slate-900 outline-none focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Şkaf Sektoru / Zonu:</label>
                  <select 
                    style={fontTextStyle}
                    value={lockerFormData.sector}
                    onChange={e => setLockerFormData({ ...lockerFormData, sector: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-extrabold text-slate-900 outline-none"
                  >
                    <option value="VIP Xanımlar Zonu">VIP Xanımlar Zonu</option>
                    <option value="VIP Bəylər Zonu">VIP Bəylər Zonu</option>
                    <option value="Ümumi Zalı Şkafları">Ümumi Zal Şkafları</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Başlanğıc Tarixi:</label>
                  <input 
                    style={fontTextStyle}
                    type="date" 
                    value={lockerFormData.startDate}
                    onChange={e => setLockerFormData({ ...lockerFormData, startDate: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-extrabold text-slate-900 outline-none"
                    required
                  />
                </div>

                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Bitiş Tarixi:</label>
                  <input 
                    style={fontTextStyle}
                    type="date" 
                    value={lockerFormData.endDate}
                    onChange={e => setLockerFormData({ ...lockerFormData, endDate: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-extrabold text-slate-900 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Aylıq Arenda Qiyməti (AZN):</label>
                <input 
                  style={fontDisplayStyle}
                  type="text" 
                  placeholder="40.00"
                  value={lockerFormData.monthlyFeeVal}
                  onChange={e => setLockerFormData({ ...lockerFormData, monthlyFeeVal: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-black text-slate-900 outline-none focus:bg-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setLockerModalClient(null)} 
                  style={fontTextStyle}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-extrabold rounded-xl hover:bg-slate-200 transition cursor-pointer"
                >
                  Ləğv Et
                </button>
                <button 
                  type="submit" 
                  style={fontTextStyle}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Lock size={14} /> Şkaf Arendasını Təsdiqlə
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL: STATUSU YENİLƏ VƏ MƏCBURİ NOT POST ET */}
      {statusChangeModalLead && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-5 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div>
                <span style={fontDisplayStyle} className="text-[10px] font-black text-slate-400">{statusChangeModalLead.id}</span>
                <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-sm">Status Yeniləmə Və Not Post Et</h3>
              </div>
              <button onClick={() => setStatusChangeModalLead(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStatusWithNote} className="space-y-3">
              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Yeni Status (Mərhələ):</label>
                <select 
                  style={fontTextStyle}
                  value={newStageInput}
                  onChange={e => setNewStageInput(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-extrabold text-slate-900 outline-none focus:bg-white"
                >
                  <option value="new">🆕 Yeni Lid</option>
                  <option value="contacted">📞 Əlaqə Saxlanıldı</option>
                  <option value="tour">🏋️ Tur Təyin Edildi</option>
                  <option value="potential">🤔 Düşünür</option>
                  <option value="won">✅ Paket Aldı</option>
                  <option value="lost">❌ İmtina Etdi</option>
                </select>
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Məcburi Not / Şərh (Comment):</label>
                <textarea 
                  style={fontTextStyle}
                  rows="3"
                  placeholder="Məs: Kluba sınaq turuna gəldi, paket qiyməti ilə razılaşdı..."
                  value={stageNoteInput}
                  onChange={e => setStageNoteInput(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-extrabold text-slate-900 outline-none focus:bg-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setStatusChangeModalLead(null)} 
                  style={fontTextStyle}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-extrabold rounded-xl hover:bg-slate-200 transition cursor-pointer"
                >
                  Ləğv Et
                </button>
                <button 
                  type="submit" 
                  style={fontTextStyle}
                  className="px-5 py-2 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Check size={14} /> Statusu Yenilə Və Notu Post Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. MODAL: LİDDƏN MÜŞTƏRİ BAZASINA TRANSFER */}
      {transferModalLead && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-black">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-sm">Lidi Müştəri Bazasına Transfer Et</h3>
                  <p style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">Eksik məlumatları tamamlayaraq yeni rəsmi müştəri profil yaradın</p>
                </div>
              </div>
              <button onClick={() => setTransferModalLead(null)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCompleteTransferToClient} className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Ad Soyad:</label>
                  <input 
                    style={fontTextStyle}
                    type="text" 
                    value={transferFormData.name}
                    onChange={e => setTransferFormData({ ...transferFormData, name: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-extrabold text-slate-900 outline-none"
                    required
                  />
                </div>

                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Telefon Nömrəsi:</label>
                  <input 
                    style={fontDisplayStyle}
                    type="text" 
                    value={transferFormData.phone}
                    onChange={e => setTransferFormData({ ...transferFormData, phone: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-black text-slate-900 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Müştəri Kateqoriyası:</label>
                  <select 
                    style={fontTextStyle}
                    value={transferFormData.registrationType}
                    onChange={e => setTransferFormData({ ...transferFormData, registrationType: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-white font-extrabold text-slate-900 outline-none"
                  >
                    <option value="Standard">Standart Alış</option>
                    <option value="Voucher">🎟️ Voucher / Kupon</option>
                    <option value="Corporate">🏢 Korporativ Müştəri</option>
                  </select>
                </div>

                {transferFormData.registrationType === 'Corporate' && (
                  <div>
                    <label style={fontTextStyle} className="block text-blue-700 font-extrabold mb-1">Şirkət Adı (Korporativ):</label>
                    <input 
                      style={fontTextStyle}
                      type="text" 
                      placeholder="Məs: Pasha Holding, SOCAR..."
                      value={transferFormData.companyName}
                      onChange={e => setTransferFormData({ ...transferFormData, companyName: e.target.value })}
                      className="w-full p-2 border border-blue-200 bg-blue-50/50 rounded-xl font-extrabold text-slate-900 outline-none focus:bg-white"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setTransferModalLead(null)} 
                  style={fontTextStyle}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-extrabold rounded-xl hover:bg-slate-200 transition cursor-pointer"
                >
                  Ləğv Et
                </button>
                <button 
                  type="submit" 
                  style={fontTextStyle}
                  className="px-5 py-2 bg-emerald-600 text-white font-extrabold rounded-xl hover:bg-emerald-700 transition cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <UserPlus size={14} /> Müştəri Bazasına Transfer Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. LEADS DETAILED MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-2 m-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div>
                <span style={fontDisplayStyle} className="text-[10px] font-black text-slate-400">{selectedLead.id}</span>
                <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-sm">{selectedLead.name} — Ətraflı Və Notlar</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              <h4 style={fontTextStyle} className="font-extrabold text-slate-900 text-xs">Tarixçə Və Notlar:</h4>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 max-h-40 overflow-y-auto space-y-1.5">
                {selectedLead.notes.map((n, i) => (
                  <div key={i} className="bg-white p-2 rounded-lg border border-slate-100 text-[10px]">
                    <div className="flex justify-between font-bold text-slate-500 mb-0.5">
                      <span>{n.author}</span>
                      <span>{n.date}</span>
                    </div>
                    <p style={fontTextStyle} className="text-slate-800 font-extrabold">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={() => setSelectedLead(null)} 
                style={fontTextStyle}
                className="px-4 py-1.5 bg-slate-100 text-slate-800 font-extrabold rounded-xl hover:bg-slate-200 transition cursor-pointer"
              >
                Tamamla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. MODAL: CREATE NEW VOUCHER */}
      {showNewVoucherModal && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 m-0">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 text-xs animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center font-black">
                  <Ticket size={18} />
                </div>
                <div>
                  <h3 style={fontTextStyle} className="font-extrabold text-slate-900 text-sm">Yeni Vauçer Yaradılması</h3>
                  <p style={fontTextStyle} className="text-[10px] text-slate-400 font-bold">Korporativ və ya Hədiyyə vauçeri təyin edin</p>
                </div>
              </div>
              <button onClick={() => setShowNewVoucherModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateVoucher} className="space-y-3">
              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Vauçer Kodu (Boş qalsa avtomatik verilir):</label>
                <input 
                  type="text" 
                  placeholder="Məs: VCH-2026-PROMO"
                  value={newVoucherData.code}
                  onChange={e => setNewVoucherData({ ...newVoucherData, code: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-black uppercase text-purple-700 outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Vauçer Tipi:</label>
                  <select 
                    value={newVoucherData.type}
                    onChange={e => setNewVoucherData({ ...newVoucherData, type: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-bold outline-none"
                  >
                    <option value="Gift Voucher (Hədiyyə)">Gift (Hədiyyə)</option>
                    <option value="Corporate B2B">Corporate B2B</option>
                    <option value="Marketing Promo">Marketing Promo</option>
                  </select>
                </div>
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Endirim Güzəşti:</label>
                  <input 
                    type="text" 
                    placeholder="100% və ya 50 AZN"
                    value={newVoucherData.discountVal}
                    onChange={e => setNewVoucherData({ ...newVoucherData, discountVal: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-bold outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Paket / Xidmət Adı:</label>
                <input 
                  type="text" 
                  placeholder="Məs: 1 Aylıq Limitsiz Fitnes"
                  value={newVoucherData.package}
                  onChange={e => setNewVoucherData({ ...newVoucherData, package: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-bold outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Müştəri Adı:</label>
                  <input 
                    type="text" 
                    placeholder="Ad Soyad"
                    value={newVoucherData.clientName}
                    onChange={e => setNewVoucherData({ ...newVoucherData, clientName: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-bold outline-none"
                    required
                  />
                </div>
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Telefon Nömrəsi:</label>
                  <input 
                    type="text" 
                    placeholder="+994 50..."
                    value={newVoucherData.clientPhone}
                    onChange={e => setNewVoucherData({ ...newVoucherData, clientPhone: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-bold outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Şirkət / Tərəfdaş:</label>
                  <input 
                    type="text" 
                    placeholder="Məs: Pasha Holding"
                    value={newVoucherData.partnerCompany}
                    onChange={e => setNewVoucherData({ ...newVoucherData, partnerCompany: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-bold outline-none"
                  />
                </div>
                <div>
                  <label style={fontTextStyle} className="block text-slate-600 font-extrabold mb-1">Son Bitiş Tarixi:</label>
                  <input 
                    type="date" 
                    value={newVoucherData.expiryDate}
                    onChange={e => setNewVoucherData({ ...newVoucherData, expiryDate: e.target.value })}
                    className="w-full p-2 border border-slate-200 rounded-xl bg-slate-50 font-bold outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowNewVoucherModal(false)} 
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-extrabold rounded-xl hover:bg-slate-200 transition cursor-pointer"
                >
                  Ləğv Et
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus size={14} /> Vauçeri Yarad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}