'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Users, Activity, Bed, Check, Mic, ClipboardCheck
} from 'lucide-react';

const CONTEXT_OPTIONS = [
  { id: 'ติดเตียง', label: 'ผู้ป่วยติดเตียง', icon: Bed },
  { id: 'สื่อสารไม่ได้', label: 'สื่อสารไม่ได้ / ไม่รู้สึกตัว', icon: Users },
  { id: 'เด็กเล็ก', label: 'เด็กเล็ก (อายุ < 5 ปี)', icon: Users },
  { id: 'ผู้สูงอายุ', label: 'ผู้สูงอายุ (อายุ > 65 ปี)', icon: Users },
  { id: 'มีอุปกรณ์ทางการแพทย์', label: 'มีสายยางให้อาหาร/เจาะคอ/สายสวน', icon: Activity },
];

export default function CaregiverSetupPage() {
  const router = useRouter();
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);

  const toggleContext = (id: string) => {
    setSelectedContexts(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleNext = (mode: 'voice' | 'form') => {
    // Save context to localStorage so next pages can use it
    localStorage.setItem('caregiverContext', JSON.stringify(selectedContexts));
    
    // Clear previous triage data
    localStorage.removeItem('triageResult');
    localStorage.removeItem('triageHistory');
    localStorage.removeItem('triageSummary');
    
    router.push(`/caregiver/${mode}`);
  };

  return (
    <div className="w-full bg-[#F4F9FF] flex flex-col min-h-screen">
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="h-14 px-4 flex items-center justify-between">
          <button 
            onClick={() => router.push('/')} 
            className="p-2 -ml-2 text-[#002D62] rounded-full active:bg-gray-100"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-base font-bold text-purple-700">สำหรับผู้ดูแล</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-5 pb-10">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#002D62]">โปรไฟล์ผู้ป่วย (Patient Profile)</h2>
          <p className="text-sm text-gray-500 mt-1">กรุณาเลือกภาวะพึ่งพิงของผู้ป่วย (เลือกได้มากกว่า 1 ข้อ)</p>
        </div>

        <div className="space-y-3">
          {CONTEXT_OPTIONS.map((opt) => {
            const IconComp = opt.icon;
            const isSelected = selectedContexts.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleContext(opt.id)}
                className={`w-full flex items-center p-4 rounded-xl border transition-all ${
                  isSelected 
                    ? 'bg-purple-50 border-purple-500 shadow-sm' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  <IconComp size={20} />
                </div>
                <span className={`flex-1 text-left text-[15px] ${isSelected ? 'font-bold text-purple-700' : 'text-[#002D62]'}`}>
                  {opt.label}
                </span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-purple-600 bg-purple-600' : 'border-gray-200'
                }`}>
                  {isSelected && <Check size={14} className="text-white" />}
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 mb-4">
          <h2 className="text-md font-bold text-[#002D62]">เลือกวิธีประเมินอาการแทนผู้ป่วย</h2>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => handleNext('voice')}
            className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md active:scale-95 transition-all flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
              <Mic size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm">คุยกับ AI พยาบาล (ด้วยเสียง)</h4>
              <p className="text-white/80 text-[10px] mt-0.5">เล่าอาการแทนผู้ป่วย</p>
            </div>
          </button>

          <button 
            onClick={() => handleNext('form')}
            className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white shadow-md active:scale-95 transition-all flex items-center"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
              <ClipboardCheck size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm">กรอกแบบฟอร์มอาการ</h4>
              <p className="text-white/80 text-[10px] mt-0.5">เลือกอาการตาม Checklist</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
