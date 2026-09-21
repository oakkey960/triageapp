import React from 'react';
import Image from 'next/image';

interface PdfTemplateProps {
  result: any;
  summary: string;
}

export const PdfTemplate = ({ result, summary }: PdfTemplateProps) => {
  const currentDate = new Date();
  const dateStr = currentDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = currentDate.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white w-[794px] h-[1123px] relative overflow-hidden flex flex-col font-sans" style={{ fontFamily: "'Prompt', sans-serif" }}>
      <div className="p-12 flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-gray-100 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
              {/* Note: In html2canvas, external images or absolute paths can sometimes cause issues. 
                  We will use standard img tag instead of Next.js Image for better html2canvas compatibility. */}
              <img src="/logoppk_0.png" alt="Logo" className="w-full h-full object-contain" crossOrigin="anonymous" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#002D62]">โรงพยาบาลพระปกเกล้า</h1>
              <p className="text-[15px] font-bold text-[#002D62]">จังหวัดจันทบุรี</p>
            </div>
          </div>
          <div className="text-right text-[13px] text-gray-600">
            <p>วันที่ประเมิน: <span className="font-bold text-gray-800">{dateStr}</span></p>
            <p>เวลา: <span className="font-bold text-gray-800">{timeStr} น.</span></p>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#002D62] mb-1">สรุปผลการประเมินอาการเบื้องต้น</h2>
          <p className="text-sm text-gray-500">เอกสารสรุปจากการคัดกรองอาการด้วยระบบ AI Triage เพื่อใช้ประกอบการดูแลและการเข้ารับบริการ</p>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-200 mb-6 flex justify-between pb-2 text-[13px] text-gray-600 font-bold">
          <div>ชื่อ-นามสกุล .............................................................. อายุ ........... ปี  เพศ ...........</div>
          <div>ช่องทางประเมิน: ระบบอัตโนมัติ (AI)</div>
        </div>

        {/* Result Header */}
        <div className="flex justify-between items-end border-b-2 border-[#002D62] pb-2 mb-6">
          <h3 className="text-xl font-bold text-[#002D62]">ผลการประเมิน</h3>
          <div className="text-lg font-bold text-blue-700">ปลายทางที่แนะนำ: {result.destination || '-'}</div>
        </div>

        {/* Content */}
        <div className="space-y-6 flex-1">
          
          <div>
            <h4 className="text-[15px] font-bold text-[#002D62] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#002D62]"></span>
              อาการสำคัญและประวัติปัจจุบัน (Chief Complaint & Present Illness)
            </h4>
            <p className="text-[14px] text-gray-800 leading-relaxed pl-3 whitespace-pre-line">
              {summary || '-'}
            </p>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-[#002D62] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#002D62]"></span>
              ข้อบ่งชี้และเหตุผลการคัดกรอง (Triage Assessment)
            </h4>
            <p className="text-[14px] text-gray-800 leading-relaxed pl-3 whitespace-pre-line">
              {result.reason || '-'}
            </p>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-[#002D62] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#002D62]"></span>
              คำแนะนำเบื้องต้นสำหรับผู้ป่วย (Initial Advice)
            </h4>
            <p className="text-[14px] text-gray-800 leading-relaxed pl-3 whitespace-pre-line bg-blue-50 p-3 rounded-lg border border-blue-100">
              {result.nurse_response || '-'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-6">
            <div>
              <h4 className="text-[15px] font-bold text-green-700 mb-3 border-b border-green-200 pb-1">
                สิ่งที่ควรทำ
              </h4>
              <ul className="space-y-2 text-[14px] text-gray-800 list-disc pl-5">
                {result.to_do_list?.length > 0 ? (
                  result.to_do_list.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))
                ) : (
                  <li>-</li>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[15px] font-bold text-red-600 mb-3 border-b border-red-200 pb-1">
                อาการเตือนที่ควรกลับมาพบแพทย์
              </h4>
              <ul className="space-y-2 text-[14px] text-gray-800 list-disc pl-5">
                {result.return_symptoms?.length > 0 ? (
                  result.return_symptoms.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))
                ) : (
                  <li>-</li>
                )}
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Notes */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <h4 className="text-[14px] font-bold text-[#002D62] mb-1">หมายเหตุ</h4>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            ผลนี้เป็นการคัดกรองอาการเบื้องต้นจากข้อมูลที่ผู้รับบริการให้กับระบบ ไม่ใช่การวินิจฉัยโรคหรือใบรับรองแพทย์ 
            หากอาการรุนแรงขึ้นหรือมีอาการฉุกเฉิน ควรเข้ารับการประเมินโดยบุคลากรทางการแพทย์ทันที
          </p>
        </div>

        {/* Signatures */}
        <div className="flex justify-between mt-12 text-center text-[13px] text-gray-600">
          <div>
            <p className="mb-6">......................................................</p>
            <p>(......................................................)</p>
            <p className="mt-1">ผู้รับบริการ / ผู้แสดงผล</p>
          </div>
          <div>
            <p className="mb-6">......................................................</p>
            <p>(......................................................)</p>
            <p className="mt-1">ผู้ให้บริการตรวจสอบ</p>
          </div>
        </div>

      </div>
    </div>
  );
};
