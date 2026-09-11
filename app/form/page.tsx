'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { chatTriage } from '../../lib/api';
import { 
  ArrowLeft, Thermometer, Wind, Volume2, Brain, Activity, Droplets, 
  Hand, Bandage, MoreHorizontal, Calendar, Timer, Gauge, PlusCircle, 
  FileText, Camera, Check, X,
  Laugh, Smile, Meh, Frown, Angry
} from 'lucide-react';

const SYMPTOMS = [
  { name: 'มีไข้', icon: Thermometer, color: '#FB8C00', bg: 'rgba(251, 140, 0, 0.1)' },
  { name: 'ไอ', icon: Wind, color: '#1E88E5', bg: 'rgba(30, 136, 229, 0.1)' },
  { name: 'เจ็บคอ', icon: Volume2, color: '#E53935', bg: 'rgba(229, 57, 53, 0.1)' },
  { name: 'ปวดศีรษะ', icon: Brain, color: '#8E24AA', bg: 'rgba(142, 36, 170, 0.1)' },
  { name: 'ปวดท้อง', icon: Activity, color: '#00897B', bg: 'rgba(0, 137, 123, 0.1)' },
  { name: 'คลื่นไส้', icon: Droplets, color: '#3949AB', bg: 'rgba(57, 73, 171, 0.1)' },
  { name: 'ผื่น คัน', icon: Hand, color: '#D81B60', bg: 'rgba(216, 27, 96, 0.1)' },
  { name: 'บาดเจ็บ', icon: Bandage, color: '#6D4C41', bg: 'rgba(109, 76, 65, 0.1)' },
  { name: 'อื่นๆ', icon: MoreHorizontal, color: '#757575', bg: 'rgba(117, 117, 117, 0.1)' },
];

const DURATIONS = ['น้อยกว่า 1 วัน', '1-3 วัน', '3-7 วัน', 'มากกว่า 7 วัน'];
const FREQUENCIES = ['เป็นตลอดเวลา', 'เป็นๆ หายๆ', 'เฉพาะบางเวลา', 'ไม่แน่ใจ'];

const getAssociatedSymptoms = (main: string) => {
  switch (main) {
    case 'มีไข้': return ['หนาวสั่น', 'ปวดเมื่อยตัว', 'ไอ', 'เจ็บคอ', 'มีผื่น', 'ปวดศีรษะ'];
    case 'ไอ': return ['มีเสมหะ', 'หอบเหนื่อย', 'มีไข้', 'น้ำมูกไหล', 'เจ็บหน้าอก', 'อ่อนเพลีย'];
    case 'เจ็บคอ': return ['มีเสมหะ', 'กลืนลำบาก', 'มีไข้', 'ไอ', 'เสียงแหบ', 'อ่อนเพลีย'];
    case 'ปวดศีรษะ': return ['คลื่นไส้อาเจียน', 'ตาพร่ามัว', 'เวียนหัว', 'อ่อนแรงครึ่งซีก', 'มีไข้', 'ปวดคอ/บ่า'];
    case 'ปวดท้อง': return ['ท้องเสีย', 'คลื่นไส้อาเจียน', 'ท้องอืด', 'มีไข้', 'ถ่ายมีเลือด', 'ปัสสาวะแสบขัด'];
    case 'คลื่นไส้': return ['อาเจียน', 'ปวดท้อง', 'เวียนหัว', 'ท้องเสีย', 'หน้ามืด', 'มีไข้'];
    case 'ผื่น คัน': return ['หายใจลำบาก', 'บวมตามหน้า/ปาก', 'มีไข้', 'แสบร้อน', 'ตุ่มน้ำใส', 'ลามทั่วตัว'];
    case 'บาดเจ็บ': return ['เลือดไหลไม่หยุด', 'แผลลึกเปิดกว้าง', 'กระดูกผิดรูป', 'ชา/ขยับไม่ได้', 'ปวดรุนแรง', 'สัตว์กัด/ข่วน'];
    case 'อื่นๆ':
    default: return ['อาเจียน', 'ปวดหัว', 'ปวดท้อง', 'แน่นหน้าอก', 'เวียนหัว', 'หายใจลำบาก', 'มีไข้', 'ผื่นคัน'];
  }
};

const getSeverityColor = (level: number) => {
  if (level === 0) return '#00897B';
  if (level <= 2) return '#4CAF50';
  if (level <= 4) return '#8BC34A';
  if (level <= 6) return '#FFB300';
  if (level <= 8) return '#FB8C00';
  return '#E53935';
};

const getSeverityLabel = (level: number) => {
  if (level === 0) return 'เลื่อนเพื่อระบุระดับความรุนแรง';
  if (level <= 2) return `แทบไม่มีอาการ/เล็กน้อย (${level}/10)`;
  if (level <= 4) return `ปานกลาง (${level}/10)`;
  if (level <= 6) return `ค่อนข้างมาก (${level}/10)`;
  if (level <= 8) return `รุนแรง (${level}/10)`;
  return `รุนแรงมากที่สุด (${level}/10)`;
};

export default function FormTriage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMainSymptom, setSelectedMainSymptom] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [severityLevel, setSeverityLevel] = useState(0);
  const [selectedAssociatedSymptoms, setSelectedAssociatedSymptoms] = useState<string[]>([]);
  const [detailText, setDetailText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleAssociated = (symptom: string) => {
    if (selectedAssociatedSymptoms.includes(symptom)) {
      setSelectedAssociatedSymptoms(selectedAssociatedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedAssociatedSymptoms([...selectedAssociatedSymptoms, symptom]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDuration) {
      alert('กรุณาระบุอาการเริ่มเมื่อไหร่');
      return;
    }

    setIsLoading(true);

    let text = `ผู้ป่วยมีอาการหลัก: ${selectedMainSymptom}\n`;
    text += `ระยะเวลา: ${selectedDuration}\n`;
    if (selectedFrequency) text += `ความถี่: ${selectedFrequency}\n`;
    if (severityLevel > 0) text += `ความรุนแรง: ${severityLevel}/10\n`;
    if (selectedAssociatedSymptoms.length > 0) text += `อาการร่วม: ${selectedAssociatedSymptoms.join(', ')}\n`;
    if (detailText.trim()) text += `รายละเอียดเพิ่มเติม: ${detailText.trim()}\n`;

    try {
      const history = [{ role: 'user', text }];
      const pi = localStorage.getItem("patientInfo"); 
      const patient = pi ? JSON.parse(pi) : undefined; 

      // Get GPS Location
      let locationObj: {lat: number, lng: number} | undefined = undefined;
      try {
        locationObj = await new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            resolve(undefined);
          } else {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
              },
              (error) => {
                console.warn('Geolocation error:', error);
                resolve(undefined); // Proceed even if location fails
              },
              { timeout: 5000 }
            );
          }
        });
      } catch (err) {}

      let imgB64: string | undefined = undefined;
      let imgMime: string | undefined = undefined;
      if (imagePreview) {
        const matches = imagePreview.match(/^data:(image\/[a-zA-Z0-9]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          imgMime = matches[1];
          imgB64 = matches[2];
        }
      }

      const result = await chatTriage(text, [], patient, locationObj, imgB64, imgMime);

      localStorage.setItem('triageResult', JSON.stringify(result));
      localStorage.setItem('triageHistory', JSON.stringify(history));
      localStorage.setItem('triageSummary', text);

      setIsLoading(false);

      if (result.is_complete === true) {
        router.push('/result');
      } else {
        router.push('/follow-up');
      }
    } catch (e) {
      setIsLoading(false);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    }
  };

  const assocSymptoms = getAssociatedSymptoms(selectedMainSymptom);

  return (
    <div className="min-h-screen bg-[#F4F7F6] flex flex-col justify-between">
      {/* AppBar */}
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="h-14 px-4 flex items-center justify-between">
          <button 
            onClick={() => {
              if (currentStep > 1) setCurrentStep(currentStep - 1);
              else router.push('/');
            }} 
            className="p-2 -ml-2 text-[#263238] rounded-full active:bg-gray-100"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-base font-bold text-[#263238]">
            {currentStep === 1 ? 'ประเมินด้วยแบบฟอร์ม' : 'ประวัติอาการเพิ่มเติม'}
          </h1>
          <div className="w-8"></div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-3 pt-1 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-[#00897B]"></div>
          <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${currentStep >= 2 ? 'bg-[#00897B]' : 'bg-gray-200'}`}></div>
          <span className="text-xs font-bold text-gray-500 whitespace-nowrap ml-2">
            {currentStep}/2 {currentStep === 1 ? 'อาการหลัก' : 'รายละเอียด'}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 p-5 pb-28 overflow-y-auto">
        {currentStep === 1 ? (
          <div>
            <h2 className="text-lg font-bold text-[#263238]">1. อาการหลักที่พบ</h2>
            <p className="text-xs text-gray-500 mt-1 mb-5">กรุณาเลือกอาการหลักที่คุณกำลังพบ</p>

            {/* 3x3 Grid of 9 Symptoms */}
            <div className="grid grid-cols-3 gap-3">
              {SYMPTOMS.map((s) => {
                const IconComponent = s.icon;
                const isSelected = selectedMainSymptom === s.name;
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedMainSymptom(s.name)}
                    className={`aspect-[0.9] rounded-2xl flex flex-col items-center justify-center p-2 transition-all ${
                      isSelected 
                        ? 'bg-[#E0F2F1] border-2 border-[#00897B] shadow-sm' 
                        : 'bg-white border border-gray-200 active:bg-gray-50'
                    }`}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                      style={{ backgroundColor: s.bg }}
                    >
                      <IconComponent size={26} style={{ color: s.color }} />
                    </div>
                    <span className={`text-xs font-medium text-center ${isSelected ? 'font-bold text-[#00897B]' : 'text-gray-800'}`}>
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Card 1: Duration */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E0F2F1] text-[#00897B] flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#263238]">อาการเริ่มเมื่อไหร่?</h3>
                  <p className="text-xs text-gray-500">เลือกช่วงเวลาที่อาการเริ่มต้น</p>
                </div>
              </div>
              <div className="space-y-2">
                {DURATIONS.map((d) => {
                  const isSel = selectedDuration === d;
                  return (
                    <label 
                      key={d} 
                      onClick={() => setSelectedDuration(d)}
                      className={`flex items-center p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isSel ? 'bg-[#00897B]/5 border-[#00897B]' : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="duration" 
                        checked={isSel} 
                        onChange={() => setSelectedDuration(d)} 
                        className="mr-3 accent-[#00897B] w-4 h-4"
                      />
                      <span className={`${isSel ? 'font-bold text-[#00897B]' : 'text-gray-800'}`}>{d}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Frequency */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E0F2F1] text-[#00897B] flex items-center justify-center flex-shrink-0">
                  <Timer size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#263238]">อาการเป็นบ่อยแค่ไหน?</h3>
                  <p className="text-xs text-gray-500">เลือกความถี่ของอาการ</p>
                </div>
              </div>
              <div className="space-y-2">
                {FREQUENCIES.map((f) => {
                  const isSel = selectedFrequency === f;
                  return (
                    <label 
                      key={f} 
                      onClick={() => setSelectedFrequency(f)}
                      className={`flex items-center p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isSel ? 'bg-[#00897B]/5 border-[#00897B]' : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="frequency" 
                        checked={isSel} 
                        onChange={() => setSelectedFrequency(f)} 
                        className="mr-3 accent-[#00897B] w-4 h-4"
                      />
                      <span className={`${isSel ? 'font-bold text-[#00897B]' : 'text-gray-800'}`}>{f}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Card 3: Severity Scale */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E0F2F1] text-[#00897B] flex items-center justify-center flex-shrink-0">
                  <Gauge size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#263238]">ระดับความรุนแรง</h3>
                  <p className="text-xs text-gray-500">เลือกระดับความเจ็บปวด (1-10)</p>
                </div>
              </div>

              {/* 5 Faces in Horizontal Row */}
              <div className="flex justify-between items-center px-4 py-3">
                {[
                  { val: 2, icon: Laugh, color: '#4CAF50' },
                  { val: 4, icon: Smile, color: '#8BC34A' },
                  { val: 6, icon: Meh, color: '#FFB300' },
                  { val: 8, icon: Frown, color: '#FB8C00' },
                  { val: 10, icon: Angry, color: '#E53935' },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  const isActive = severityLevel > 0 && (severityLevel <= item.val && severityLevel > item.val - 2);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSeverityLevel(item.val)}
                      className={`transition-all duration-300 ${isActive ? 'scale-135' : 'scale-100 opacity-40'}`}
                    >
                      <IconComp 
                        size={36} 
                        style={{ color: isActive ? item.color : '#9E9E9E' }} 
                      />
                    </button>
                  );
                })}
              </div>

              {/* Slider */}
              <div className="mt-4 px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={severityLevel} 
                  onChange={(e) => setSeverityLevel(Number(e.target.value))}
                  style={{ accentColor: getSeverityColor(severityLevel) }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Dynamic Label */}
              <div className="text-center mt-3">
                <span 
                  className="text-sm font-bold"
                  style={{ color: getSeverityColor(severityLevel) }}
                >
                  {getSeverityLabel(severityLevel)}
                </span>
              </div>
            </div>

            {/* Card 4: Associated Symptoms */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E0F2F1] text-[#00897B] flex items-center justify-center flex-shrink-0">
                  <PlusCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#263238]">มีอาการอื่นร่วมด้วยไหม?</h3>
                  <p className="text-xs text-gray-500">เลือกอาการที่พบร่วม (เลือกได้มากกว่า 1 ข้อ)</p>
                </div>
              </div>

              {/* 2-Column Grid of Checkboxes */}
              <div className="grid grid-cols-2 gap-2">
                {assocSymptoms.map((sym) => {
                  const isChecked = selectedAssociatedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleAssociated(sym)}
                      className={`flex items-center p-3 rounded-xl border text-xs text-left transition-colors ${
                        isChecked 
                          ? 'bg-[#00897B]/5 border-[#00897B] font-bold text-[#00897B]' 
                          : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mr-2.5 flex items-center justify-center border ${
                        isChecked ? 'bg-[#00897B] border-[#00897B] text-white' : 'border-gray-400 bg-white'
                      }`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className="truncate">{sym}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card 5: Additional Details & Photos */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#E0F2F1] text-[#00897B] flex items-center justify-center flex-shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#263238]">รายละเอียดเพิ่มเติม (ถ้ามี)</h3>
                  <p className="text-xs text-gray-500">อธิบายอาการอื่นๆ หรือแนบรูปถ่าย</p>
                </div>
              </div>

              <textarea
                value={detailText}
                onChange={(e) => setDetailText(e.target.value)}
                placeholder="พิมพ์อธิบายอาการเพิ่มเติมที่นี่..."
                rows={3}
                className="w-full p-3 text-xs bg-white border border-gray-300 rounded-xl outline-none focus:border-[#00897B] resize-none"
              />

              <div className="mt-3">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#00897B] text-[#00897B] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#00897B]/5 active:bg-[#00897B]/10"
                >
                  <Camera size={18} />
                  <span>แนบรูปถ่ายบริเวณที่มีอาการ</span>
                </button>
              </div>

              {imagePreview && (
                <div className="relative mt-3 rounded-xl overflow-hidden border border-gray-200 max-h-40">
                  <img src={imagePreview} alt="Attached symptom" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-600 text-white shadow-md"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20">
        <button
          onClick={() => {
            if (currentStep === 1) {
              if (!selectedMainSymptom) {
                alert('กรุณาเลือกอาการหลัก');
                return;
              }
              setCurrentStep(2);
              setSelectedAssociatedSymptoms([]);
            } else {
              handleSubmit();
            }
          }}
          disabled={isLoading}
          className="w-full h-12 bg-[#00897B] hover:bg-[#00796B] active:scale-[0.99] text-white font-bold text-sm rounded-2xl flex items-center justify-center transition-all shadow-md"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            currentStep === 1 ? 'ถัดไป' : 'วิเคราะห์อาการ'
          )}
        </button>
      </div>
    </div>
  );
}
