'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Home, CheckCircle2, MapPin, ChevronRight, 
  Lock, UserCircle, Volume2, ClipboardList, AlertTriangle, 
  Check, Phone, FileText, Download, Shield, Settings,
  Leaf, HeartPulse, BellRing
} from 'lucide-react';

export default function ResultTriage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('triageResult');
    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-8 h-8 border-3 border-[#00897B] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs text-gray-500">กำลังโหลดผลการประเมิน...</p>
      </div>
    );
  }

  const getTheme = () => {
    const severity = result.severity?.toLowerCase() || 'green';
    if (severity === 'red') {
      return {
        main: '#E53935', bg: '#FFEBEE', text: '#B71C1C',
        title: 'ฉุกเฉินวิกฤต',
        subtitle: 'เสี่ยงต่ออันตรายถึงชีวิต / ต้องได้รับการรักษาเร่งด่วน',
        icon: BellRing
      };
    }
    if (severity === 'yellow') {
      return {
        main: '#F57C00', bg: '#FFF3E0', text: '#E65100',
        title: 'ต้องพบแพทย์เฉพาะทาง',
        subtitle: 'ควรไปพบแพทย์เฉพาะทางที่เหมาะสมตามแผนกที่แนะนำ',
        icon: HeartPulse
      };
    }
    // Green
    return {
      main: '#00897B', bg: '#E0F2F1', text: '#004D40',
      title: 'อาการทั่วไป',
      subtitle: 'อาการไม่รุนแรง สามารถดูแลรักษาได้ที่ รพ.เมือง',
      icon: Leaf
    };
  };

  const theme = getTheme();
  const isRed = result.severity?.toLowerCase() === 'red';
  const IconComp = theme.icon;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* AppBar */}
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-30 shadow-sm">
        <div className="w-6" /> {/* Spacer for centering instead of back button */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00897B] rounded-full flex items-center justify-center text-white font-bold">+</div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#00897B] leading-tight">โรงพยาบาลพระปกเกล้า</span>
            <span className="text-[10px] text-[#00897B] leading-tight">AI Pre-Triage @ Home</span>
          </div>
        </div>
        <Home className="text-[#00897B] cursor-pointer" onClick={() => router.push('/')} />
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Banner */}
        <div 
          className="relative pt-6 px-5 pb-16 rounded-b-[2rem] transition-colors duration-500" 
          style={{ backgroundColor: theme.main }}
        >
          <div className="flex items-center gap-2 text-white justify-center">
            <div className="bg-white rounded-full p-0.5">
              <CheckCircle2 size={18} fill={theme.main} className="text-white" />
            </div>
            <span className="font-bold text-sm">ผลการประเมินอาการ</span>
          </div>
        </div>

        {/* Title Card (Overlapping) */}
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

        {/* Info Cards List */}
        <div className="px-5 mt-5 space-y-4">
          
          {/* Destination */}
          <div className="border-2 rounded-2xl p-4 flex items-center gap-4 bg-white" style={{ borderColor: theme.bg }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme.bg, color: theme.main }}>
              <MapPin size={24} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-gray-500 font-bold mb-0.5">แนะนำให้ไป</p>
              <h3 className="text-[15px] font-bold leading-tight" style={{ color: theme.main }}>{result.destination}</h3>
            </div>
            <ChevronRight style={{ color: theme.main }} />
          </div>

          {/* Reason */}
          <div className="border-2 rounded-2xl p-4 bg-white" style={{ borderColor: theme.bg }}>
            <div className="flex items-center gap-2 mb-2" style={{ color: theme.main }}>
              <Lock size={16} />
              <span className="text-xs font-bold">สาเหตุที่ประเมิน</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{result.reason}</p>
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
            <p className="text-xs text-gray-600 leading-relaxed">{result.nurse_response}</p>
          </div>

          {/* To Do List */}
          {result.to_do_list && result.to_do_list.length > 0 && (
            <div className="border-2 rounded-2xl p-4 bg-white" style={{ borderColor: theme.bg }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: theme.main }}>
                <ClipboardList size={16} />
                <span className="text-xs font-bold">คำแนะนำที่ควรทำ {isRed && '(ทันที)'}</span>
              </div>
              <div className="space-y-2.5">
                {result.to_do_list.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: theme.main }} />
                    <span className="text-[11px] text-gray-700 font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning Symptoms */}
          {result.return_symptoms && result.return_symptoms.length > 0 && (
            <div className="border-2 rounded-2xl p-4 bg-white" style={{ borderColor: theme.bg }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: theme.main }}>
                <AlertTriangle size={16} />
                <span className="text-xs font-bold">อาการเตือนที่ควรกลับมาพบแพทย์</span>
              </div>
              <div className="space-y-2.5">
                {result.return_symptoms.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: theme.main }} strokeWidth={3} />
                    <span className="text-[11px] text-gray-700 font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 pb-6">
            {isRed ? (
              <a 
                href="tel:1669"
                className="w-full h-14 bg-[#E53935] text-white rounded-2xl flex items-center px-5 shadow-lg active:scale-95 transition-transform"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Phone size={20} fill="white" />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="font-bold text-base">โทรด่วน 1669</span>
                  <span className="text-[10px] font-medium opacity-90 -mt-0.5">สายด่วนฉุกเฉิน</span>
                </div>
                <ChevronRight />
              </a>
            ) : (
              <button 
                className="w-full h-14 text-white rounded-2xl flex items-center px-4 shadow-lg active:scale-95 transition-transform" 
                style={{ backgroundColor: theme.main }}
              >
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                  <FileText size={18} />
                </div>
                <div className="flex flex-col items-start flex-1 text-left">
                  <span className="font-bold text-[13px]">บันทึกผลการประเมิน</span>
                  <span className="text-[10px] font-medium opacity-90">เพื่อใช้ยื่นที่ {result.destination.split(' ')[0]}</span>
                </div>
                <ChevronRight size={20} />
              </button>
            )}
            
            <button 
              className="w-full mt-5 flex items-center justify-center gap-2 text-xs font-bold active:opacity-70 transition-opacity" 
              style={{ color: theme.main }}
            >
              <Download size={16} />
              <span>ดาวน์โหลดผลการประเมิน (PDF)</span>
            </button>
            
            <p className="text-center text-[9px] text-gray-400 mt-5 mb-2 font-medium">
              ** สามารถใช้เป็นหลักฐานในการเข้ารับการรักษาที่โรงพยาบาลได้ **
            </p>
          </div>

        </div>
      </div>

      
    </div>
  );
}