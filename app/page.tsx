'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Mic, ClipboardCheck, ShieldCheck, Building2, Plus, 
  UserCircle, X, Search, UserPlus, FileEdit, CheckCircle2, 
  AlertCircle, RefreshCw, Lock, KeyRound
} from 'lucide-react';
import { searchPatient, savePatient, loginPatient } from '../lib/api';

type LoginStep = 'none' | 'cid' | 'password' | 'set_password' | 'register' | 'success';

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>('none');
  const [cid, setCid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [patient, setPatient] = useState<any>(null);
  
  // Temporary storage for patient data fetched from Hosp DB (needs password to activate)
  const [tempPatientData, setTempPatientData] = useState<any>(null);

  const [regData, setRegData] = useState({
    cid: '',
    firstname: '',
    lastname: '',
    sex: '',
    birthDate: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('patientInfo');
    if (saved) {
      setPatient(JSON.parse(saved));
    }
  }, []);

  const handleSearchCID = async () => {
    if (!cid || cid.length !== 13) {
      setError('กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await searchPatient(cid);
      if (data) {
        if (data.has_password) {
          // User exists in App DB and has password
          setStep('password');
        } else {
          // User exists in Hosp DB but no password yet
          setTempPatientData(data);
          setStep('set_password');
        }
      } else {
        // New user
        setRegData(prev => ({ ...prev, cid }));
        setStep('register');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    if (!password) {
      setError('กรุณากรอกรหัสผ่าน');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await loginPatient(cid, password);
      if (data) {
        setPatient(data);
        localStorage.setItem('patientInfo', JSON.stringify(data));
        setStep('success');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'รหัสผ่านไม่ถูกต้อง');
    }
    setLoading(false);
  };

  const handleSetPasswordForHospUser = async () => {
    if (!password || password.length < 4) {
      setError('กรุณาตั้งรหัสผ่านอย่างน้อย 4 ตัวอักษร');
      return;
    }
    setLoading(true);
    try {
      const newPat = { ...tempPatientData, password };
      const savedUser = await savePatient(newPat);
      setPatient(savedUser);
      localStorage.setItem('patientInfo', JSON.stringify(savedUser));
      setStep('success');
    } catch (err) {
      setError('บันทึกข้อมูลไม่สำเร็จ');
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!regData.firstname || !regData.lastname || !regData.sex || !regData.birthDate || !regData.password) {
      setError('กรุณากรอกข้อมูลและรหัสผ่านให้ครบถ้วน');
      return;
    }
    if (regData.password.length < 4) {
      setError('รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร');
      return;
    }

    const bDate = new Date(regData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - bDate.getFullYear();
    const m = today.getMonth() - bDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bDate.getDate())) {
      age--;
    }

    setLoading(true);
    try {
      const newPat = {
        citizencardno: regData.cid,
        firstname: regData.firstname,
        lastname: regData.lastname,
        sex: regData.sex,
        birthDate: regData.birthDate,
        phone: regData.phone,
        password: regData.password,
        age: age
      };
      
      const savedUser = await savePatient(newPat);
      setPatient(savedUser);
      localStorage.setItem('patientInfo', JSON.stringify(savedUser));
      setStep('success');
    } catch (err: any) {
      setError(err.response?.data?.message || 'บันทึกข้อมูลไม่สำเร็จ');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between relative overflow-x-hidden">
      
      {step !== 'none' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => { setStep('none'); setError(''); setPassword(''); }} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>

            {/* STEP: CID ENTRY */}
            {step === 'cid' && (
              <div className="pt-2 pb-2">
                <div className="text-center mb-5">
                  <div className="w-20 h-16 bg-[#E0F2F1] rounded-2xl mx-auto flex items-center justify-center text-[#00897B] mb-4 relative">
                    <UserCircle size={36} strokeWidth={1.5} />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                      <CheckCircle2 size={16} fill="#00897B" className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#263238]">เข้าสู่ระบบ</h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">กรอกเลขบัตรประชาชนเพื่อดึงข้อมูล<br/>หรือลงทะเบียนใหม่</p>
                </div>
                <div className="relative mb-3">
                   <UserCircle className="absolute left-3.5 top-3.5 text-gray-400" size={20} />
                   <input
                     type="text"
                     placeholder="เลขบัตรประชาชน 13 หลัก"
                     className="w-full h-12 border border-gray-200 rounded-xl pl-11 pr-4 text-sm font-medium focus:border-[#00897B] focus:ring-1 focus:ring-[#00897B] outline-none transition-all"
                     value={cid}
                     onChange={(e) => setCid(e.target.value)}
                   />
                </div>
                {error && <p className="text-red-500 text-[11px] text-center mb-3 font-bold">{error}</p>}
                <button
                  onClick={handleSearchCID}
                  disabled={loading}
                  className="w-full h-12 bg-[#00897B] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  <Search size={18} />
                  <span>{loading ? 'กำลังตรวจสอบ...' : 'ถัดไป'}</span>
                </button>
              </div>
            )}

            {/* STEP: PASSWORD (LOGIN) */}
            {step === 'password' && (
              <div className="pt-2 pb-2">
                <div className="text-center mb-5">
                  <div className="w-16 h-16 bg-[#E0F2F1] rounded-full mx-auto flex items-center justify-center text-[#00897B] mb-4">
                    <KeyRound size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-[#263238]">ยินดีต้อนรับกลับมา</h3>
                  <p className="text-xs text-gray-500 mt-1.5">กรุณากรอกรหัสผ่านเพื่อเข้าสู่ระบบ</p>
                </div>
                <div className="relative mb-3">
                   <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={20} />
                   <input
                     type="password"
                     placeholder="รหัสผ่านของคุณ"
                     className="w-full h-12 border border-gray-200 rounded-xl pl-11 pr-4 text-sm font-medium focus:border-[#00897B] focus:ring-1 focus:ring-[#00897B] outline-none transition-all"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                   />
                </div>
                {error && <p className="text-red-500 text-[11px] text-center mb-3 font-bold">{error}</p>}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full h-12 bg-[#00897B] text-white font-bold rounded-xl flex items-center justify-center shadow-md active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
                </button>
                <button onClick={() => { setStep('cid'); setPassword(''); setError(''); }} className="w-full mt-4 text-xs font-bold text-gray-400 hover:text-gray-600">
                  ย้อนกลับ
                </button>
              </div>
            )}

            {/* STEP: SET PASSWORD (HOSPITAL USER) */}
            {step === 'set_password' && tempPatientData && (
              <div className="pt-2 pb-2">
                <div className="text-center mb-5">
                  <div className="w-16 h-16 bg-[#FFF3E0] rounded-full mx-auto flex items-center justify-center text-[#F57C00] mb-4">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-[#263238]">พบข้อมูลของคุณในระบบ</h3>
                  <p className="text-xs text-gray-500 mt-1.5">คุณ {tempPatientData.firstname} {tempPatientData.lastname}<br/>กรุณาตั้งรหัสผ่านเพื่อใช้ในครั้งต่อไป</p>
                </div>
                <div className="relative mb-3">
                   <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={20} />
                   <input
                     type="password"
                     placeholder="ตั้งรหัสผ่าน (อย่างน้อย 4 ตัว)"
                     className="w-full h-12 border border-gray-200 rounded-xl pl-11 pr-4 text-sm font-medium focus:border-[#00897B] outline-none"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                   />
                </div>
                {error && <p className="text-red-500 text-[11px] text-center mb-3 font-bold">{error}</p>}
                <button
                  onClick={handleSetPasswordForHospUser}
                  disabled={loading}
                  className="w-full h-12 bg-[#F57C00] text-white font-bold rounded-xl flex items-center justify-center shadow-md active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  {loading ? 'กำลังบันทึก...' : 'ตั้งรหัสผ่าน & เข้าสู่ระบบ'}
                </button>
              </div>
            )}

            {/* STEP: REGISTER (NEW USER) */}
            {step === 'register' && (
              <div className="pt-2 pb-2">
                <div className="text-center mb-5">
                  <div className="w-16 h-16 bg-[#E0F2F1] rounded-full mx-auto flex items-center justify-center text-[#00897B] mb-3 relative">
                    <UserCircle size={32} strokeWidth={1.5} />
                    <div className="absolute bottom-0 right-0 bg-[#00897B] rounded-full p-0.5">
                      <Plus size={12} className="text-white" strokeWidth={4} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#263238]">สร้างบัญชีใหม่</h3>
                  <p className="text-[11px] text-gray-500 mt-1">ไม่พบข้อมูล กรุณากรอกประวัติและตั้งรหัสผ่าน</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 flex gap-2 items-center mb-1"><FileEdit size={12} className="text-[#00897B]"/> เลขบัตรประชาชน</label>
                    <input type="text" className="w-full h-10 border border-gray-200 bg-gray-50 rounded-lg px-3 text-sm text-gray-500 outline-none" value={regData.cid} readOnly />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 mb-1 block">ชื่อจริง *</label>
                      <input type="text" placeholder="ชื่อ" className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-[#00897B] outline-none" value={regData.firstname} onChange={e => setRegData({...regData, firstname: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 mb-1 block">นามสกุล *</label>
                      <input type="text" placeholder="นามสกุล" className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-[#00897B] outline-none" value={regData.lastname} onChange={e => setRegData({...regData, lastname: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 flex gap-2 items-center mb-2">เพศ *</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 text-sm"><input type="radio" name="sex" value="ชาย" onChange={e => setRegData({...regData, sex: e.target.value})} /> ชาย</label>
                      <label className="flex items-center gap-1.5 text-sm"><input type="radio" name="sex" value="หญิง" onChange={e => setRegData({...regData, sex: e.target.value})} /> หญิง</label>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">วันเดือนปีเกิด *</label>
                    <input type="date" className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-[#00897B] outline-none" value={regData.birthDate} onChange={e => setRegData({...regData, birthDate: e.target.value})} />
                  </div>
                  
                  <div className="border-t border-gray-100 my-2 pt-2"></div>
                  
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">ตั้งรหัสผ่าน *</label>
                    <input type="password" placeholder="อย่างน้อย 4 ตัวอักษร" className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:border-[#00897B] outline-none" value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} />
                  </div>
                </div>

                {error && <p className="text-red-500 text-[11px] text-center mt-3 font-bold">{error}</p>}
                
                <button onClick={handleRegister} disabled={loading} className="w-full h-12 bg-[#00897B] text-white font-bold rounded-xl flex items-center justify-center mt-5 shadow-md active:scale-[0.98] transition-transform disabled:opacity-50">
                  {loading ? 'กำลังบันทึก...' : 'ลงทะเบียน & เข้าสู่ระบบ'}
                </button>
              </div>
            )}

            {/* STEP: SUCCESS */}
            {step === 'success' && patient && (
              <div className="pt-2 text-center pb-2">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-white mb-4 shadow-sm border border-gray-50 relative">
                  <CheckCircle2 size={56} fill="#00897B" className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#263238] mb-2">เข้าสู่ระบบสำเร็จ</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-5">ยินดีต้อนรับเข้าสู่ระบบ AI Pre-Triage</p>
                <button onClick={() => setStep('none')} className="w-full h-12 bg-[#00897B] text-white font-bold rounded-xl flex items-center justify-center shadow-md active:scale-[0.98] transition-transform">
                  <span>เริ่มใช้งาน &rarr;</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Hero Header */}
      <div>
        <div className="relative overflow-hidden bg-gradient-to-b from-[#E0F7FA] to-white px-6 pt-10 pb-8">
          <div className="absolute -right-6 bottom-0 text-[#B2EBF2]/40 pointer-events-none">
            <Building2 size={180} />
          </div>

          <div className="flex justify-between items-start relative z-10 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#00695C] flex items-center justify-center text-white shadow-md">
                <Plus size={28} strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-[#004D40] font-bold text-base leading-tight">โรงพยาบาลพระปกเกล้า</h2>
                <p className="text-gray-600 text-[10px] leading-tight mt-0.5">AI Pre-Triage @ Home<br/>เวอร์ชัน 1.0.0</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                  onClick={() => patient ? router.push('/settings') : setStep('cid')} 
                  className="w-10 h-10 rounded-full bg-[#00897B] shadow-md flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                  <UserCircle size={20} />
                </button>
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl font-black text-[#263238] tracking-tight">
              {patient ? `สวัสดีคุณ ${patient.firstname}` : 'ยินดีต้อนรับ'}
            </h1>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              ระบบคัดกรองอาการเบื้องต้นด้วย AI<br />
              ประเมินอาการของคุณได้ง่ายๆ จากที่บ้าน
            </p>
          </div>
        </div>

        <div className="px-6 space-y-4 -mt-2">
          <h3 className="font-bold text-[#37474F] text-base mb-2">เลือกวิธีการประเมินอาการ</h3>

          <button onClick={() => patient ? router.push('/voice') : setStep('cid')} className="w-full text-left p-5 rounded-[1.5rem] bg-gradient-to-r from-[#00897B] to-[#00695C] text-white shadow-[0_8px_20px_rgba(0,137,123,0.25)] active:scale-[0.98] transition-all flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Mic size={28} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[17px]">คุยกับ AI พยาบาล</h4>
                <p className="text-white/80 text-[11px] mt-1 leading-snug">
                  พูดคุยอาการกับ AI พยาบาล<br />
                  ประเมินอาการผ่านเสียง
                </p>
              </div>
            </div>
            <div className="text-white/50">
              &gt;
            </div>
          </button>

          <button onClick={() => patient ? router.push('/form') : setStep('cid')} className="w-full text-left p-5 rounded-[1.5rem] bg-gradient-to-r from-[#1976D2] to-[#1565C0] text-white shadow-[0_8px_20px_rgba(25,118,210,0.25)] active:scale-[0.98] transition-all flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <ClipboardCheck size={28} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[17px]">ประเมินด้วยตัวเอง</h4>
                <p className="text-white/80 text-[11px] mt-1 leading-snug">
                  กรอกข้อมูลอาการด้วยแบบฟอร์ม<br />
                  ประเมินด้วยตนเอง
                </p>
              </div>
            </div>
            <div className="text-white/50">
              &gt;
            </div>
          </button>
        </div>
      </div>

      <div className="p-6 mb-24">
        <div className="p-4 rounded-[1.25rem] bg-[#F5F9F9] border border-[#E0F2F1] flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-white text-[#00897B] shadow-sm flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h5 className="font-bold text-[13px] text-[#00695C]">ข้อมูลของคุณปลอดภัย</h5>
            <p className="text-gray-500 text-[10px] leading-snug mt-1">
              เราให้ความสำคัญกับความเป็นส่วนตัว<br/>ข้อมูลของคุณจะถูกเก็บเป็นความลับ
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
}
