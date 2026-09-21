"use client";

import { useState } from 'react';

export const CombinedGenderAgeSelector = ({ onSend }: { onSend: (val: string) => void }) => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-2 shadow-sm">
      <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
        <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
        ระบุข้อมูลผู้ป่วย
      </p>
      
      <div className="mb-3">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">1. เลือกเพศ</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setGender('ชาย')}
            className={`py-2.5 rounded-xl border-2 text-[15px] font-bold transition-all ${gender === 'ชาย' ? 'border-blue-400 bg-blue-50 text-[#002D62]' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
          >
            ชาย
          </button>
          <button
            onClick={() => setGender('หญิง')}
            className={`py-2.5 rounded-xl border-2 text-[15px] font-bold transition-all ${gender === 'หญิง' ? 'border-blue-400 bg-blue-50 text-[#002D62]' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
          >
            หญิง
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">2. เลือกช่วงอายุ</p>
        <div className="grid grid-cols-3 gap-2">
          {['เด็ก', 'ผู้ใหญ่', 'ผู้สูงอายุ'].map(a => (
            <button
              key={a}
              onClick={() => setAge(a)}
              className={`py-2.5 rounded-xl border-2 text-[15px] font-bold transition-all ${age === a ? 'border-blue-400 bg-blue-50 text-[#002D62]' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!gender || !age}
        onClick={() => onSend(`เพศ${gender} ช่วงวัย: ${age}`)}
        className="w-full py-3 rounded-xl bg-blue-600 text-white text-[15px] font-bold disabled:opacity-40 active:scale-95 transition-all shadow-sm"
      >
        ส่งข้อมูล
      </button>
    </div>
  );
};

export const CombinedPainSelector = ({ onSend }: { onSend: (val: string) => void }) => {
  const [loc, setLoc] = useState('');
  const [sev, setSev] = useState('');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-2 shadow-sm">
      <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
        <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
        ประเมินอาการปวด
      </p>
      
      <div className="mb-3">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">1. เลือกตำแหน่งที่ปวด</p>
        <div className="grid grid-cols-3 gap-2">
          {['ใต้ลิ้นปี่', 'ท้องน้อย', 'ซีกขวา', 'ซีกซ้าย', 'รอบสะดือ', 'หลัง', 'ศีรษะ', 'ทั่วๆ ไป'].map(l => (
            <button
              key={l}
              onClick={() => setLoc(l)}
              className={`py-2 px-1 rounded-xl border-2 text-[13px] font-bold transition-all ${loc === l ? 'border-blue-400 bg-blue-50 text-[#002D62]' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">2. ระดับความรุนแรง (1-10)</p>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => setSev('1-3 (น้อย)')} className={`py-2 rounded-xl border-2 text-[13px] font-bold transition-all ${sev === '1-3 (น้อย)' ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}>1-3 (น้อย)</button>
          <button onClick={() => setSev('4-6 (ปานกลาง)')} className={`py-2 rounded-xl border-2 text-[13px] font-bold transition-all ${sev === '4-6 (ปานกลาง)' ? 'border-yellow-400 bg-yellow-50 text-yellow-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}>4-6 (กลาง)</button>
          <button onClick={() => setSev('7-10 (มาก)')} className={`py-2 rounded-xl border-2 text-[13px] font-bold transition-all ${sev === '7-10 (มาก)' ? 'border-red-400 bg-red-50 text-red-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}>7-10 (มาก)</button>
        </div>
      </div>

      <button
        disabled={!loc || !sev}
        onClick={() => onSend(`ปวดบริเวณ: ${loc}, ระดับความปวด: ${sev}`)}
        className="w-full py-3 rounded-xl bg-blue-600 text-white text-[15px] font-bold disabled:opacity-40 active:scale-95 transition-all shadow-sm"
      >
        ส่งข้อมูล
      </button>
    </div>
  );
};

export const CombinedFeverSelector = ({ onSend }: { onSend: (val: string) => void }) => {
  const [temp, setTemp] = useState('');
  const [dur, setDur] = useState('');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-2 shadow-sm">
      <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
        <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
        ประเมินอาการไข้
      </p>
      
      <div className="mb-3">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">1. ระดับไข้ / อุณหภูมิ</p>
        <div className="grid grid-cols-2 gap-2">
          {['ไข้สูงมาก (ตัวร้อนจัด)', 'ไข้ต่ำๆ (ตัวอุ่นๆ)', 'ไม่ได้วัด', 'ไม่มีไข้'].map(t => (
            <button
              key={t}
              onClick={() => setTemp(t)}
              className={`py-2 px-1 rounded-xl border-2 text-[13px] font-bold transition-all ${temp === t ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">2. ระยะเวลาที่เป็น</p>
        <div className="grid grid-cols-2 gap-2">
          {['น้อยกว่า 1 วัน', '1-3 วัน', '3-7 วัน', 'มากกว่า 7 วัน'].map(d => (
            <button
              key={d}
              onClick={() => setDur(d)}
              className={`py-2 px-1 rounded-xl border-2 text-[13px] font-bold transition-all ${dur === d ? 'border-blue-400 bg-blue-50 text-[#002D62]' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!temp || !dur}
        onClick={() => onSend(`ระดับไข้: ${temp}, ระยะเวลา: ${dur}`)}
        className="w-full py-3 rounded-xl bg-blue-600 text-white text-[15px] font-bold disabled:opacity-40 active:scale-95 transition-all shadow-sm"
      >
        ส่งข้อมูล
      </button>
    </div>
  );
};

export const CombinedInjurySelector = ({ onSend }: { onSend: (val: string) => void }) => {
  const [loc, setLoc] = useState('');
  const [wound, setWound] = useState('');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-2 shadow-sm">
      <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
        <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
        ประเมินบาดแผล/อุบัติเหตุ
      </p>
      
      <div className="mb-3">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">1. บริเวณที่บาดเจ็บ</p>
        <div className="grid grid-cols-2 gap-2">
          {['ศีรษะ/ใบหน้า', 'ลำตัว/หน้าอก', 'แขน/มือ', 'ขา/เท้า', 'หลายส่วน'].map(l => (
            <button
              key={l}
              onClick={() => setLoc(l)}
              className={`py-2 px-1 rounded-xl border-2 text-[13px] font-bold transition-all ${loc === l ? 'border-blue-400 bg-blue-50 text-[#002D62]' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">2. ลักษณะบาดแผล</p>
        <div className="grid grid-cols-2 gap-2">
          {['ไม่มีแผล/ฟกช้ำ', 'แผลขนาดเล็ก/ถลอก', 'แผลขนาดใหญ่/เลือดออกมาก', 'สัตว์กัด/แมลงต่อย'].map(w => (
            <button
              key={w}
              onClick={() => setWound(w)}
              className={`py-2 px-1 rounded-xl border-2 text-[13px] font-bold transition-all ${wound === w ? 'border-blue-400 bg-blue-50 text-[#002D62]' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!loc || !wound}
        onClick={() => onSend(`บริเวณที่บาดเจ็บ: ${loc}, ลักษณะแผล: ${wound}`)}
        className="w-full py-3 rounded-xl bg-blue-600 text-white text-[15px] font-bold disabled:opacity-40 active:scale-95 transition-all shadow-sm"
      >
        ส่งข้อมูล
      </button>
    </div>
  );
};

export const CombinedGeneralSelector = ({ onSend }: { onSend: (val: string) => void }) => {
  const [dur, setDur] = useState('');
  const [freq, setFreq] = useState('');

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-2 shadow-sm">
      <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
        <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
        ประเมินอาการทั่วไป
      </p>
      
      <div className="mb-3">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">1. เป็นมานานแค่ไหน</p>
        <div className="grid grid-cols-2 gap-2">
          {['น้อยกว่า 1 วัน', '1-3 วัน', '3-7 วัน', 'มากกว่า 7 วัน'].map(d => (
            <button
              key={d}
              onClick={() => setDur(d)}
              className={`py-2 px-1 rounded-xl border-2 text-[13px] font-bold transition-all ${dur === d ? 'border-blue-400 bg-blue-50 text-[#002D62]' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[13px] text-gray-500 mb-1.5 font-medium">2. ความถี่</p>
        <div className="grid grid-cols-2 gap-2">
          {['เป็นตลอดเวลา', 'เป็นๆ หายๆ', 'เฉพาะบางเวลา', 'ครั้งแรก'].map(f => (
            <button
              key={f}
              onClick={() => setFreq(f)}
              className={`py-2 px-1 rounded-xl border-2 text-[13px] font-bold transition-all ${freq === f ? 'border-blue-400 bg-blue-50 text-[#002D62]' : 'border-gray-200 bg-white text-gray-600 hover:bg-[#F4F9FF]'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!dur || !freq}
        onClick={() => onSend(`ระยะเวลา: ${dur}, ความถี่: ${freq}`)}
        className="w-full py-3 rounded-xl bg-blue-600 text-white text-[15px] font-bold disabled:opacity-40 active:scale-95 transition-all shadow-sm"
      >
        ส่งข้อมูล
      </button>
    </div>
  );
};
