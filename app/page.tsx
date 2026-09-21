'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Mic, ClipboardCheck, Building2, ShieldCheck
} from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full bg-[#F4F9FF] flex flex-col relative">
      {/* Hero Header (Image Banner) */}
      <div>
        <div className="w-full relative z-0">
          <Image 
            src="/headerbanner.jpg" 
            alt="AI Pre-Triage โรงพยาบาลพระปกเกล้า" 
            width={800} 
            height={600} 
            className="w-full h-auto object-cover"
            priority
          />
          {/* Gradient fade to blend into background */}
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#F4F9FF] to-transparent pointer-events-none"></div>
        </div>

        <div className="px-5 space-y-5 relative z-10 -mt-4 ">
          <h1 className="font-bold text-[#002D62] text-lg mb-4 mt-2">เลือกวิธีการประเมินอาการ</h1>

          <button onClick={() => router.push('/voice')} className="w-full text-left p-5 rounded-3xl bg-white border border-blue-100 shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shrink-0">
              <Mic size={32} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-[18px] text-[#002D62]">คุยกับ AI พยาบาล</h4>
              <p className="text-gray-500 text-[13px] mt-1 leading-snug">
                พูดคุยอาการกับ AI พยาบาล<br />
                ประเมินอาการผ่านเสียง
              </p>
            </div>
            <div className="text-blue-300 font-bold text-2xl ml-auto">
              &gt;
            </div>
          </button>

          <button onClick={() => router.push('/form')} className="w-full text-left p-5 rounded-3xl bg-white border border-blue-100 shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-md shrink-0">
              <ClipboardCheck size={32} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-[18px] text-[#002D62]">ประเมินด้วยตนเอง</h4>
              <p className="text-gray-500 text-[13px] mt-1 leading-snug">
                กรอกข้อมูลอาการด้วยแบบฟอร์ม<br />
                ประเมินด้วยตนเอง
              </p>
            </div>
            <div className="text-blue-300 font-bold text-2xl ml-auto">
              &gt;
            </div>
          </button>

          <button onClick={() => router.push('/caregiver/setup')} className="w-full text-left p-5 rounded-3xl bg-white border border-blue-100 shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-md shrink-0">
              <Building2 size={32} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-[18px] text-[#002D62]">สำหรับเจ้าหน้าที่ / อสม.</h4>
              <p className="text-gray-500 text-[13px] mt-1 leading-snug">
                ใช้สำหรับเจ้าหน้าที่หรืออสม.<br />
                ในการช่วยคัดกรอง
              </p>
            </div>
            <div className="text-blue-300 font-bold text-2xl ml-auto">
              &gt;
            </div>
          </button>
        </div>
      </div>

      {/* Fixed Bottom Privacy Card */}
      <div className=" bottom-0 left-0 right-0 w-full mx-auto px-5 pb-5 pt-3 bg-[#F4F9FF] z-20">
        <div className="p-4 rounded-[1.25rem] bg-white border border-blue-100 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h5 className="font-bold text-[13px] text-[#002D62]">ข้อมูลของคุณปลอดภัย</h5>
            <p className="text-gray-500 text-[10px] leading-snug mt-1">
              เราให้ความสำคัญกับความเป็นส่วนตัว<br/>ข้อมูลของคุณจะถูกเก็บเป็นความลับ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
