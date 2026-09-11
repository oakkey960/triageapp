'use client';
import { useEffect, useState } from 'react';
import { getHistory } from '../../lib/api';
import {
  FileText, Calendar, MapPin, CheckCircle2, ChevronRight, X, Search, RefreshCw,
  UserCircle, Lock, Leaf, HeartPulse, BellRing, ArrowLeft, Volume2, Edit3, User
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'assessment' | 'treatment'>('assessment');

  useEffect(() => {
    const saved = localStorage.getItem('patientInfo');
    if (saved) {
      const parsed = JSON.parse(saved);
      setPatient(parsed);
      if (parsed.citizencardno) {
        fetchHistory(parsed.citizencardno);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchHistory = async (cid: string) => {
    try {
      const data = await getHistory(cid);
      setHistory(data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getTheme = (severity: string) => {
    const s = severity?.toLowerCase() || 'green';
    if (s === 'red') {
      return { main: '#E53935', bg: '#FFEBEE', text: '#B71C1C', title: 'ฉุกเฉินวิกฤต', subtitle: 'เสี่ยงต่ออันตรายถึงชีวิต', icon: BellRing };
    }
    if (s === 'yellow') {
      return { main: '#F57C00', bg: '#FFF3E0', text: '#E65100', title: 'ต้องพบแพทย์เฉพาะทาง', subtitle: 'ควรไปพบแพทย์ตามแผนกที่แนะนำ', icon: HeartPulse };
    }
    return { main: '#00897B', bg: '#E0F2F1', text: '#004D40', title: 'อาการทั่วไป', subtitle: 'อาการไม่รุนแรง สามารถดูแลได้', icon: Leaf };
  };

  const formatThaiDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear() + 543;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year} | ${hours}:${minutes} น.`;
  };

  const filtered = history.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.chief_complaint?.toLowerCase().includes(q) ||
           item.destination?.toLowerCase().includes(q) ||
           item.severity?.toLowerCase().includes(q);
  });

  const getBorderColor = (severity: string) => {
    const s = severity?.toLowerCase() || 'green';
    if (s === 'red') return '#E53935';
    if (s === 'yellow') return '#F57C00';
    return '#00897B';
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col pb-24">
      {/* Header - White, minimal */}
      <div className="bg-white px-4 pt-12 pb-3 flex items-center justify-between shadow-sm">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center">
          <ArrowLeft size={22} className="text-[#263238]" />
        </button>
        <h1 className="text-lg font-bold text-[#263238]">ประวัติ</h1>
        <div className="flex items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center">
            <Edit3 size={18} className="text-[#263238]" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center">
            <Search size={18} className="text-[#263238]" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      {patient && (
        <div className="mx-4 mt-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#00897B] flex items-center justify-center flex-shrink-0">
              <User size={28} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-[#263238] truncate">
                {patient.firstname} {patient.lastname}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                อายุ {patient.age} ปี | เพศ {patient.sex}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                เลขบัตรประชาชน {patient.citizencardno}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <div className="mx-4 mt-4 flex items-center gap-2">
        <button
          onClick={() => setActiveTab('assessment')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeTab === 'assessment'
              ? 'bg-[#00897B] text-white'
              : 'bg-transparent text-gray-500'
          }`}
        >
          ประวัติการประเมิน
        </button>
        <button
          onClick={() => setActiveTab('treatment')}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeTab === 'treatment'
              ? 'bg-[#00897B] text-white'
              : 'bg-transparent text-gray-500'
          }`}
        >
          ประวัติการรักษา
        </button>
      </div>

      {/* Content Area */}
      <div className="px-4 mt-4 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <RefreshCw className="animate-spin mb-3" size={28} />
            <p className="text-sm font-medium">กำลังโหลดประวัติ...</p>
          </div>
        ) : !patient ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm p-6 text-center">
            <UserCircle size={48} className="text-gray-300 mb-4" />
            <h3 className="text-gray-800 font-bold text-lg mb-2">ยังไม่ได้เข้าสู่ระบบ</h3>
            <p className="text-gray-500 text-xs mb-6">กรุณาเข้าสู่ระบบเพื่อดูประวัติการประเมินของคุณ</p>
            <button onClick={() => router.push('/')} className="px-8 py-3 bg-[#00897B] text-white rounded-xl font-bold active:scale-95 transition-transform shadow-md">ไปที่หน้าแรก</button>
          </div>
        ) : activeTab === 'treatment' ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm p-6 text-center">
            <FileText size={48} className="text-gray-300 mb-4" />
            <h3 className="text-gray-800 font-bold text-lg mb-2">ยังไม่มีประวัติการรักษา</h3>
            <p className="text-gray-500 text-xs">ข้อมูลการรักษาจะแสดงที่นี่</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm p-6 text-center">
            <CheckCircle2 size={48} className="text-gray-300 mb-4" />
            <h3 className="text-gray-800 font-bold text-lg mb-2">{searchQuery ? 'ไม่พบผลลัพธ์' : 'ยังไม่มีประวัติ'}</h3>
            <p className="text-gray-500 text-xs">{searchQuery ? 'ลองค้นหาด้วยคำอื่น' : 'คุณยังไม่เคยทำการประเมินอาการ'}</p>
          </div>
        ) : (
          filtered.map((item, idx) => {
            const theme = getTheme(item.severity);
            const borderColor = getBorderColor(item.severity);
            const IconComp = theme.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm overflow-hidden active:scale-[0.98] transition-transform cursor-pointer"
                style={{ borderLeft: `4px solid ${borderColor}` }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="p-4">
                  {/* Top row: Icon + Title + Arrow */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: theme.bg, color: theme.main }}
                      >
                        <IconComp size={18} />
                      </div>
                      <span className="text-sm font-bold" style={{ color: theme.main }}>
                        {theme.title}
                      </span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
                  </div>

                  {/* Date row */}
                  <div className="mt-2 ml-12">
                    <p className="text-xs text-gray-400">
                      {formatThaiDate(item.createdAt)}
                    </p>
                  </div>

                  {/* Bottom row: Destination + "ดูแบบเต็ม" */}
                  <div className="mt-2 ml-12 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <MapPin size={14} className="text-[#00897B] flex-shrink-0" />
                      <span className="text-xs font-semibold text-[#00897B] truncate">
                        {item.destination}
                      </span>
                    </div>
                    <button
                      className="text-xs font-semibold text-[#00897B] flex-shrink-0 ml-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                    >
                      ดูแบบเต็ม
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal - Full Result Page Style (kept from existing design) */}
      {selectedItem && (() => {
        const theme = getTheme(selectedItem.severity);
        const IconComp = theme.icon;
        return (
          <div className="fixed inset-0 z-50 bg-white flex flex-col">
            {/* AppBar */}
            <div className="flex items-center justify-between p-4 bg-white shadow-sm flex-shrink-0">
              <ArrowLeft className="text-[#00897B] cursor-pointer" size={24} onClick={() => setSelectedItem(null)} />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00897B] rounded-full flex items-center justify-center text-white font-bold text-xs">+</div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#00897B] leading-tight">โรงพยาบาลพระปกเกล้า</span>
                  <span className="text-[10px] text-[#00897B] leading-tight">AI Pre-Triage @ Home</span>
                </div>
              </div>
              <X className="text-gray-400 cursor-pointer" size={22} onClick={() => setSelectedItem(null)} />
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Banner */}
              <div className="relative pt-6 px-5 pb-16 rounded-b-[2rem]" style={{ backgroundColor: theme.main }}>
                <div className="flex items-center gap-2 text-white justify-center">
                  <div className="bg-white rounded-full p-0.5">
                    <CheckCircle2 size={18} fill={theme.main} className="text-white" />
                  </div>
                  <span className="font-bold text-sm">ผลการประเมินอาการ</span>
                </div>
                <p className="text-center text-white/70 text-[10px] mt-2">
                  {new Date(selectedItem.createdAt).toLocaleString('th-TH')}
                </p>
              </div>

              {/* Title Card */}
              <div className="px-5 -mt-10 relative z-10">
                <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex justify-between items-start border border-gray-50">
                  <div className="flex-1 pr-2">
                    <p className="text-xs text-gray-500 font-medium">อาการที่ประเมิน</p>
                    <h2 className="text-2xl font-black mt-1 tracking-tight" style={{ color: theme.main }}>{theme.title}</h2>
                    <p className="text-[11px] text-gray-600 mt-2 leading-relaxed font-medium">{theme.subtitle}</p>
                  </div>
                  <div className="opacity-15 flex-shrink-0" style={{ color: theme.main }}>
                    <IconComp size={56} strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Detail Cards */}
              <div className="px-5 mt-5 space-y-4 pb-8">
                {/* Destination */}
                <div className="border-2 rounded-2xl p-4 flex items-center gap-4 bg-white" style={{ borderColor: theme.bg }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.bg, color: theme.main }}>
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] text-gray-500 font-bold mb-0.5">แนะนำให้ไป</p>
                    <h3 className="text-[15px] font-bold leading-tight" style={{ color: theme.main }}>{selectedItem.destination}</h3>
                  </div>
                  <ChevronRight style={{ color: theme.main }} />
                </div>

                {/* Reason */}
                <div className="border-2 rounded-2xl p-4 bg-white" style={{ borderColor: theme.bg }}>
                  <div className="flex items-center gap-2 mb-2" style={{ color: theme.main }}>
                    <Lock size={16} />
                    <span className="text-xs font-bold">สาเหตุที่ประเมิน</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedItem.reason}</p>
                </div>

                {/* Nurse Message */}
                <div className="border-2 rounded-2xl p-4 bg-white" style={{ borderColor: theme.bg }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2" style={{ color: theme.main }}>
                      <UserCircle size={18} />
                      <span className="text-xs font-bold">ข้อความจากพยาบาล AI</span>
                    </div>
                    <Volume2 size={18} style={{ color: theme.main }} />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedItem.nurse_response}</p>
                </div>

                {/* Chief Complaint */}
                <div className="border-2 rounded-2xl p-4 bg-white" style={{ borderColor: theme.bg }}>
                  <div className="flex items-center gap-2 mb-2" style={{ color: theme.main }}>
                    <FileText size={16} />
                    <span className="text-xs font-bold">อาการที่แจ้ง</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedItem.chief_complaint}</p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full h-14 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform font-bold text-base mt-2"
                  style={{ backgroundColor: theme.main }}
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      
    </div>
  );
}
