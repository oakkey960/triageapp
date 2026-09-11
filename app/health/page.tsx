'use client';
import { useEffect, useState } from 'react';
import { getHealthInfo, updateHealthInfo } from '../../lib/api';
import {
  ArrowLeft, Edit3, UserCircle, Calendar, User, Weight, Ruler,
  Pill, UtensilsCrossed, HeartPulse, Stethoscope, Phone, FileText,
  Plus, X, Check, RefreshCw, ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type HealthSection = 'none' | 'drug' | 'food' | 'disease' | 'meds' | 'personal';
type TabKey = 'personal' | 'health';

export default function HealthPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('health');
  const [activeSection, setActiveSection] = useState<HealthSection>('none');
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('patientInfo');
    if (saved) {
      const parsed = JSON.parse(saved);
      setPatient(parsed);
      if (parsed.citizencardno) {
        fetchHealthInfo(parsed.citizencardno);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchHealthInfo = async (cid: string) => {
    try {
      const data = await getHealthInfo(cid);
      if (data) {
        setHealthData(data);
      } else {
        setHealthData({
          drug_allergies: [],
          food_allergies: [],
          chronic_diseases: [],
          regular_medications: [],
        });
      }
    } catch (err) {
      console.error(err);
      setHealthData({
        drug_allergies: [],
        food_allergies: [],
        chronic_diseases: [],
        regular_medications: [],
      });
    }
    setLoading(false);
  };

  const addItem = (section: HealthSection) => {
    if (!newItem.trim() || !healthData) return;
    const key = section === 'drug' ? 'drug_allergies' : section === 'food' ? 'food_allergies' : section === 'meds' ? 'regular_medications' : 'chronic_diseases';
    const updated = { ...healthData, [key]: [...(healthData[key] || []), newItem.trim()] };
    setHealthData(updated);
    setNewItem('');
  };

  const removeItem = (section: HealthSection, index: number) => {
    if (!healthData) return;
    const key = section === 'drug' ? 'drug_allergies' : section === 'food' ? 'food_allergies' : section === 'meds' ? 'regular_medications' : 'chronic_diseases';
    const arr = [...(healthData[key] || [])];
    arr.splice(index, 1);
    setHealthData({ ...healthData, [key]: arr });
  };

  const handleSave = async () => {
    if (!patient?.citizencardno || !healthData) return;
    setSaving(true);
    try {
      await updateHealthInfo(patient.citizencardno, {
        drug_allergies: healthData.drug_allergies || [],
        food_allergies: healthData.food_allergies || [],
        chronic_diseases: healthData.chronic_diseases || [],
        regular_medications: healthData.regular_medications || [],
        weight: healthData.weight || '',
        height: healthData.height || '',
      });
      setActiveSection('none');
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  const getSectionTitle = (s: HealthSection) => {
    if (s === 'drug') return 'แพ้ยา';
    if (s === 'food') return 'แพ้อาหาร';
    if (s === 'disease') return 'โรคประจำตัว';
    if (s === 'meds') return 'ยาที่ใช้เป็นประจำ';
    if (s === 'personal') return 'น้ำหนัก / ส่วนสูง';
    return '';
  };

  const getSectionKey = (s: HealthSection) => {
    if (s === 'drug') return 'drug_allergies';
    if (s === 'food') return 'food_allergies';
    if (s === 'disease') return 'chronic_diseases';
    if (s === 'meds') return 'regular_medications';
    return '';
  };

  const displaySex = (sex: string) => {
    if (!sex) return '-';
    const s = sex.toLowerCase();
    if (s === 'male' || s === 'ชาย') return 'ชาย';
    if (s === 'female' || s === 'หญิง') return 'หญิง';
    return sex;
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-90 transition-transform">
          <ArrowLeft size={22} className="text-[#263238]" />
        </button>
        <h1 className="text-lg font-bold text-[#263238] tracking-tight">ข้อมูลสุขภาพ</h1>
        <button onClick={() => setActiveTab('health')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-90 transition-transform">
          <Edit3 size={20} className="text-[#263238]" />
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <RefreshCw className="animate-spin text-gray-400" size={28} />
        </div>
      ) : !patient ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <UserCircle size={48} className="text-gray-300 mb-4" />
          <h3 className="text-gray-800 font-bold text-lg mb-2">ยังไม่ได้เข้าสู่ระบบ</h3>
          <p className="text-gray-500 text-xs mb-6">กรุณาเข้าสู่ระบบเพื่อดูข้อมูลสุขภาพของคุณ</p>
          <button onClick={() => router.push('/')} className="px-8 py-3 bg-[#00897B] text-white rounded-xl font-bold active:scale-95 transition-transform shadow-md">ไปที่หน้าแรก</button>
        </div>
      ) : (
        <>
          {/* Profile Card */}
          <div className="px-5 mt-5">
            <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#00897B] rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCircle size={36} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[17px] font-bold text-[#263238] truncate">
                    {patient.firstname} {patient.lastname}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    อายุ {patient.age || healthData?.age || '-'} ปี | เพศ{displaySex(patient.sex || healthData?.sex)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-mono">
                    {patient.citizencardno}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="px-5 mt-5">
            <div className="bg-gray-100 rounded-full p-1 flex">
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold text-center transition-all duration-200 ${
                  activeTab === 'personal'
                    ? 'bg-[#00897B] text-white shadow-md'
                    : 'text-gray-500'
                }`}
              >
                ข้อมูลส่วนตัว
              </button>
              <button
                onClick={() => setActiveTab('health')}
                className={`flex-1 py-2.5 rounded-full text-sm font-bold text-center transition-all duration-200 ${
                  activeTab === 'health'
                    ? 'bg-[#00897B] text-white shadow-md'
                    : 'text-gray-500'
                }`}
              >
                ประวัติสุขภาพ
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-5 mt-5 flex-1">
            {activeTab === 'personal' ? (
              /* ===== Tab 1: ข้อมูลส่วนตัว ===== */
              <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[15px] font-bold text-[#263238]">ข้อมูลส่วนตัว</h3>
                  <button onClick={() => setActiveSection('personal')} className="text-[#00897B] flex items-center gap-1 text-[11px] font-bold bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                    <Edit3 size={12} /> แก้ไข
                  </button>
                </div>
                <div className="space-y-4">
                  {/* วันเกิด */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#E0F2F1] rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar size={20} className="text-[#00897B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-medium">วันเกิด</p>
                    </div>
                    <p className="text-sm font-bold text-[#263238]">
                      {healthData?.birthDate
                        ? new Date(healthData.birthDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
                        : patient.age ? `อายุ ${patient.age} ปี` : '-'}
                    </p>
                  </div>

                  <div className="border-t border-gray-50" />

                  {/* เพศ */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#E0F2F1] rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-[#00897B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-medium">เพศ</p>
                    </div>
                    <p className="text-sm font-bold text-[#263238]">
                      {displaySex(patient.sex || healthData?.sex)}
                    </p>
                  </div>

                  <div className="border-t border-gray-50" />

                  {/* น้ำหนัก */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#E0F2F1] rounded-full flex items-center justify-center flex-shrink-0">
                      <Weight size={20} className="text-[#00897B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-medium">น้ำหนัก</p>
                    </div>
                    <p className="text-sm font-bold text-[#263238]">
                      {healthData?.weight ? `${healthData.weight} กก.` : '-'}
                    </p>
                  </div>

                  <div className="border-t border-gray-50" />

                  {/* ส่วนสูง */}
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#E0F2F1] rounded-full flex items-center justify-center flex-shrink-0">
                      <Ruler size={20} className="text-[#00897B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-medium">ส่วนสูง</p>
                    </div>
                    <p className="text-sm font-bold text-[#263238]">
                      {healthData?.height ? `${healthData.height} ซม.` : '-'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* ===== Tab 2: ประวัติสุขภาพ ===== */
              <div className="space-y-4">
                {/* ประวัติการแพ้ */}
                <div className="bg-[#FFF0F0] rounded-2xl p-4 border-l-4 border-[#E53935]">
                  <h3 className="text-[15px] font-bold text-[#263238] mb-3">ประวัติการแพ้</h3>

                  {/* แพ้ยา */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Pill size={16} className="text-[#E53935]" />
                        <span className="text-sm font-bold text-[#E53935]">แพ้ยา</span>
                      </div>
                      <button onClick={() => setActiveSection('drug')} className="text-[#E53935] text-[11px] font-bold flex items-center gap-1 hover:underline">
                        แก้ไข <ChevronRight size={14} />
                      </button>
                    </div>
                    {healthData?.drug_allergies?.length > 0 ? (
                      <ul className="ml-7 space-y-2">
                        {healthData.drug_allergies.map((item: string, idx: number) => {
                          const parts = item.match(/^(.*?)(?:\s*\((.*?)\))?$/);
                          const name = parts?.[1] || item;
                          const symptom = parts?.[2] || '';
                          return (
                            <li key={idx} className="flex flex-col mb-1.5">
                              <div className="flex items-start gap-2">
                                <span className="text-[#E53935] mt-1.5 w-1.5 h-1.5 bg-[#E53935] rounded-full flex-shrink-0" />
                                <span className="text-[14px] font-bold text-[#263238]">{name}</span>
                              </div>
                              {symptom && (
                                <span className="ml-3.5 text-[12px] font-medium text-gray-500">อาการ: {symptom}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="ml-7 text-sm text-gray-400">ไม่มีข้อมูล</p>
                    )}
                  </div>

                  {/* แพ้อาหาร */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed size={16} className="text-[#E53935]" />
                        <span className="text-sm font-bold text-[#E53935]">แพ้อาหาร</span>
                      </div>
                      <button onClick={() => setActiveSection('food')} className="text-[#E53935] text-[11px] font-bold flex items-center gap-1 hover:underline">
                        แก้ไข <ChevronRight size={14} />
                      </button>
                    </div>
                    {healthData?.food_allergies?.length > 0 ? (
                      <ul className="ml-7 space-y-2">
                        {healthData.food_allergies.map((item: string, idx: number) => {
                          const parts = item.match(/^(.*?)(?:\s*\((.*?)\))?$/);
                          const name = parts?.[1] || item;
                          const symptom = parts?.[2] || '';
                          return (
                            <li key={idx} className="flex flex-col mb-1.5">
                              <div className="flex items-start gap-2">
                                <span className="text-[#E53935] mt-1.5 w-1.5 h-1.5 bg-[#E53935] rounded-full flex-shrink-0" />
                                <span className="text-[14px] font-bold text-[#263238]">{name}</span>
                              </div>
                              {symptom && (
                                <span className="ml-3.5 text-[12px] font-medium text-gray-500">อาการ: {symptom}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="ml-7 text-sm text-gray-400">ไม่มีข้อมูล</p>
                    )}
                  </div>
                </div>

                {/* โรคประจำตัว */}
                <div className="bg-[#F3E8FF] rounded-2xl p-4 border-l-4 border-[#7C3AED]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <HeartPulse size={18} className="text-[#7C3AED]" />
                      <h3 className="text-[15px] font-bold text-[#263238]">โรคประจำตัว</h3>
                    </div>
                    <button onClick={() => setActiveSection('disease')} className="text-[#7C3AED] text-[11px] font-bold flex items-center gap-1 hover:underline">
                      แก้ไข <ChevronRight size={14} />
                    </button>
                  </div>
                  {healthData?.chronic_diseases?.length > 0 ? (
                    <ul className="ml-7 space-y-1.5">
                      {healthData.chronic_diseases.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-[#7C3AED] w-1.5 h-1.5 bg-[#7C3AED] rounded-full flex-shrink-0" />
                          <span className="text-[14px] font-medium text-[#263238]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="ml-7 text-sm text-gray-400">ไม่มีข้อมูล</p>
                  )}
                </div>

                {/* ข้อมูลเพิ่มเติม (ยาที่ใช้ประจำ / เบอร์ติดต่อ) */}
                <div className="bg-[#E8F4FD] rounded-2xl p-4 border-l-4 border-[#1976D2]">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText size={18} className="text-[#1976D2]" />
                    <h3 className="text-[15px] font-bold text-[#263238]">ข้อมูลเพิ่มเติม</h3>
                  </div>

                  {/* ยาที่ใช้เป็นประจำ */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-bold text-[#1976D2]">ยาที่ใช้เป็นประจำ</p>
                      <button onClick={() => setActiveSection('meds')} className="text-[#1976D2] text-[11px] font-bold flex items-center gap-1 hover:underline">
                        แก้ไข <ChevronRight size={14} />
                      </button>
                    </div>
                    {healthData?.regular_medications?.length > 0 ? (
                      <ul className="ml-4 space-y-1.5 mt-1">
                        {healthData.regular_medications.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-[#1976D2] w-1.5 h-1.5 bg-[#1976D2] rounded-full flex-shrink-0" />
                            <span className="text-[14px] font-medium text-[#263238]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="ml-4 text-sm text-gray-500">ไม่มีข้อมูล</p>
                    )}
                  </div>

                  {/* เบอร์ติดต่อฉุกเฉิน */}
                  <div>
                    <p className="text-sm font-bold text-[#1976D2] mb-1.5">เบอร์ติดต่อฉุกเฉิน</p>
                    <div className="ml-4 flex items-center gap-2">
                      <Phone size={14} className="text-[#1976D2]" />
                      <span className="text-sm text-gray-700 font-medium">
                        {patient.phone || healthData?.phone || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Modal (Bottom Sheet) */}
      {activeSection !== 'none' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setActiveSection('none')}>
          <div className="bg-white w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2rem] max-h-[80vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between relative">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3 sm:hidden" />
              <h3 className="text-lg font-extrabold text-[#263238]">{getSectionTitle(activeSection)}</h3>
              <button onClick={() => setActiveSection('none')} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            {activeSection === 'personal' ? (
              <div className="px-6 py-6 space-y-4 flex-1">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">น้ำหนัก (กก.)</label>
                  <input
                    type="number"
                    className="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-[#00897B] transition-colors"
                    value={healthData?.weight || ''}
                    onChange={e => setHealthData({...healthData, weight: e.target.value})}
                    placeholder="เช่น 55"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">ส่วนสูง (ซม.)</label>
                  <input
                    type="number"
                    className="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-[#00897B] transition-colors"
                    value={healthData?.height || ''}
                    onChange={e => setHealthData({...healthData, height: e.target.value})}
                    placeholder="เช่น 165"
                  />
                </div>
              </div>
            ) : (
              <>
                {/* Add New */}
                <div className="px-6 py-4 flex gap-2">
                  <input
                    type="text"
                    placeholder={`เพิ่ม${getSectionTitle(activeSection)}...`}
                    className="flex-1 h-11 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-[#00897B] transition-colors"
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addItem(activeSection)}
                  />
                  <button
                    onClick={() => addItem(activeSection)}
                    className="h-11 w-11 bg-[#00897B] rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform flex-shrink-0"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-2">
                  {(healthData?.[getSectionKey(activeSection)] || []).length === 0 ? (
                    <p className="text-center text-gray-400 text-sm py-10">ไม่มีข้อมูล</p>
                  ) : (
                    (healthData?.[getSectionKey(activeSection)] || []).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                        <Check size={16} className="text-[#00897B] flex-shrink-0" />
                        <span className="flex-1 text-sm text-gray-800 font-medium">{item}</span>
                        <button onClick={() => removeItem(activeSection, idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* Save */}
            <div className="p-4 border-t">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full h-12 bg-[#00897B] text-white font-bold rounded-xl active:scale-95 transition-transform disabled:opacity-50"
              >
                {saving ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}
