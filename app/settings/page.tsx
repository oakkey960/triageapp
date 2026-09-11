'use client';
import { useEffect, useState } from 'react';
import {
  UserCircle,
  Heart,
  ClipboardList,
  Bell,
  HelpCircle,
  Info,
  Lock,
  ChevronRight,
  LogOut,
  X,
  CheckCircle2,
  Activity,
  Edit3,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateProfile, changePassword } from '../../lib/api';

export default function SettingsPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);

  // Modals
  const [showLogout, setShowLogout] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [editData, setEditData] = useState({ firstname: '', lastname: '', phone: '' });
  const [pwdData, setPwdData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const saved = localStorage.getItem('patientInfo');
    if (saved) {
      const p = JSON.parse(saved);
      setPatient(p);
      setEditData({
        firstname: p.firstname || '',
        lastname: p.lastname || '',
        phone: p.phone || '',
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('patientInfo');
    setPatient(null);
    setShowLogout(false);
    router.push('/');
  };

  const handleUpdateProfile = async () => {
    if (!editData.firstname || !editData.lastname) {
      setError('กรุณากรอกชื่อและนามสกุล');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await updateProfile(patient.citizencardno, editData);
      if (res) {
        const updatedPatient = { ...patient, ...res };
        setPatient(updatedPatient);
        localStorage.setItem('patientInfo', JSON.stringify(updatedPatient));
        setShowEditProfile(false);
        alert('อัปเดตโปรไฟล์สำเร็จ');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    if (!pwdData.oldPassword || !pwdData.newPassword || !pwdData.confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    if (pwdData.newPassword.length < 4) {
      setError('รหัสผ่านใหม่ต้องมีอย่างน้อย 4 ตัวอักษร');
      return;
    }
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      setError('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      await changePassword(patient.citizencardno, {
        oldPassword: pwdData.oldPassword,
        newPassword: pwdData.newPassword,
      });
      setSuccessMsg('เปลี่ยนรหัสผ่านสำเร็จ');
      setTimeout(() => {
        setShowChangePassword(false);
        setPwdData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setSuccessMsg('');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'เปลี่ยนรหัสผ่านไม่สำเร็จ');
    }
    setLoading(false);
  };

  const openEditProfile = () => {
    if (patient) {
      setEditData({ firstname: patient.firstname, lastname: patient.lastname, phone: patient.phone || '' });
      setError('');
      setShowEditProfile(true);
    } else {
      router.push('/');
    }
  };

  const openChangePassword = () => {
    if (patient) {
      setPwdData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setError('');
      setSuccessMsg('');
      setShowChangePassword(true);
    } else {
      router.push('/');
    }
  };

  // Menu item component
  const MenuRow = ({
    icon: Icon,
    label,
    onClick,
    isLast,
  }: {
    icon: any;
    label: string;
    onClick?: () => void;
    isLast?: boolean;
  }) => (
    <>
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3.5 px-4 py-3.5 active:bg-gray-50 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
          <Icon size={20} className="text-[#00897B]" />
        </div>
        <span className="flex-1 text-left text-sm font-medium text-[#263238]">{label}</span>
        <ChevronRight size={18} className="text-gray-400 flex-shrink-0" />
      </button>
      {!isLast && <div className="mx-4 border-b border-gray-100" />}
    </>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col pb-24">
      {/* ── Header ── */}
      <div className="px-6 pt-14 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-extrabold text-[#263238] leading-tight">ตั้งค่า</h1>
            <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
              ดูแลสุขภาพของคุณ
              <br />
              ให้เราช่วยดูแลได้เสมอ
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#00897B] flex items-center justify-center shadow-lg shadow-[#00897B]/20">
            <Activity size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* ── Profile Card ── */}
      {patient && (
        <div className="px-5 mt-5">
          <button
            onClick={openEditProfile}
            className="w-full bg-white rounded-2xl shadow-sm px-4 py-4 flex items-center gap-3.5 active:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-[#00897B] flex items-center justify-center flex-shrink-0">
              <UserCircle size={28} className="text-white" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-base font-bold text-[#263238] truncate">
                {patient.firstname} {patient.lastname}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">CID: {patient.citizencardno}</p>
            </div>
            <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
          </button>
        </div>
      )}

      {/* ── Menu Items ── */}
      <div className="px-5 mt-5">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <MenuRow
            icon={UserCircle}
            label="ข้อมูลส่วนตัว"
            onClick={openEditProfile}
          />
          <MenuRow
            icon={Lock}
            label="เปลี่ยนรหัสผ่าน"
            onClick={openChangePassword}
          />
          <MenuRow
            icon={Heart}
            label="ข้อมูลสุขภาพ"
            onClick={() => router.push('/health')}
          />
          <MenuRow
            icon={ClipboardList}
            label="ประวัติการประเมิน"
            onClick={() => router.push('/history')}
          />
          <MenuRow
            icon={Bell}
            label="การแจ้งเตือน"
          />
          <MenuRow
            icon={HelpCircle}
            label="ช่วยเหลือ / คำถามที่พบบ่อย"
          />
          <MenuRow
            icon={Info}
            label="เกี่ยวกับแอปพลิเคชัน"
            isLast
          />
        </div>
      </div>

      {/* ── Logout Button ── */}
      {patient && (
        <div className="px-5 mt-8">
          <button
            onClick={() => setShowLogout(true)}
            className="w-full h-14 bg-white border-2 border-red-400 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm"
          >
            <LogOut size={20} />
            ออกจากระบบ
          </button>
        </div>
      )}

      {/* ── Version ── */}
      <div className="text-center mt-6 mb-4">
        <p className="text-[10px] text-gray-300 font-medium">AI Pre-Triage @ Home v1.0.0</p>
      </div>

      {/* ═══════════════════════════════════════════
          MODALS
      ═══════════════════════════════════════════ */}

      {/* ── Edit Profile Modal ── */}
      {showEditProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowEditProfile(false)}
        >
          <div
            className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#263238] flex items-center gap-2">
                <Edit3 size={20} className="text-[#00897B]" /> แก้ไขโปรไฟล์
              </h3>
              <button onClick={() => setShowEditProfile(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">ชื่อจริง</label>
                <input
                  type="text"
                  className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm focus:border-[#00897B] outline-none transition-colors"
                  value={editData.firstname}
                  onChange={(e) => setEditData({ ...editData, firstname: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">นามสกุล</label>
                <input
                  type="text"
                  className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm focus:border-[#00897B] outline-none transition-colors"
                  value={editData.lastname}
                  onChange={(e) => setEditData({ ...editData, lastname: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm focus:border-[#00897B] outline-none transition-colors"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-[11px] text-center mb-4 font-bold">{error}</p>}

            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className="w-full h-12 bg-[#00897B] text-white font-bold rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
            </button>
          </div>
        </div>
      )}

      {/* ── Change Password Modal ── */}
      {showChangePassword && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowChangePassword(false)}
        >
          <div
            className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#263238] flex items-center gap-2">
                <Lock size={20} className="text-[#00897B]" /> เปลี่ยนรหัสผ่าน
              </h3>
              <button onClick={() => setShowChangePassword(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {successMsg ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center animate-[scaleIn_0.3s_ease-out]">
                    <CheckCircle2 size={48} className="text-green-500" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-[#263238] mt-4">{successMsg}</h4>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">รหัสผ่านเดิม</label>
                    <input
                      type="password"
                      placeholder="รหัสผ่านปัจจุบัน"
                      className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm focus:border-[#00897B] outline-none transition-colors"
                      value={pwdData.oldPassword}
                      onChange={(e) => setPwdData({ ...pwdData, oldPassword: e.target.value })}
                    />
                  </div>
                  <div className="pt-2 border-t border-gray-100" />
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">รหัสผ่านใหม่</label>
                    <input
                      type="password"
                      placeholder="อย่างน้อย 4 ตัวอักษร"
                      className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm focus:border-[#00897B] outline-none transition-colors"
                      value={pwdData.newPassword}
                      onChange={(e) => setPwdData({ ...pwdData, newPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">ยืนยันรหัสผ่านใหม่</label>
                    <input
                      type="password"
                      placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                      className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm focus:border-[#00897B] outline-none transition-colors"
                      value={pwdData.confirmPassword}
                      onChange={(e) => setPwdData({ ...pwdData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-[11px] text-center mb-4 font-bold">{error}</p>}

                <button
                  onClick={handleChangePassword}
                  disabled={loading}
                  className="w-full h-12 bg-[#00897B] text-white font-bold rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50"
                >
                  {loading ? 'กำลังดำเนินการ...' : 'เปลี่ยนรหัสผ่าน'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Logout Confirm Modal ── */}
      {showLogout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut size={28} className="text-red-500" />
            </div>
            <h3 className="text-lg font-extrabold text-[#263238] mb-2">ออกจากระบบ</h3>
            <p className="text-sm text-gray-500 mb-6">
              คุณต้องการออกจากระบบหรือไม่?
              <br />
              ข้อมูลที่บันทึกไว้จะยังคงอยู่
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 h-12 bg-gray-100 text-gray-700 font-bold rounded-xl active:scale-95 transition-transform"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 h-12 bg-red-500 text-white font-bold rounded-xl active:scale-95 transition-transform"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}
