'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { chatTriage } from '../../lib/api';
import { speakThai, stopSpeech, unlockTTS } from '../../lib/tts';
import { ArrowLeft, Mic, Send, Camera, Headset, Circle, Square, Volume2, VolumeX } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CombinedGenderAgeSelector, CombinedPainSelector, CombinedFeverSelector, CombinedInjurySelector, CombinedGeneralSelector } from '../components/CombinedSelectors';
import Image from 'next/image';

interface Message {
  isUser: boolean;
  text: string;
}

function FollowUpTriageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const aiMessage = searchParams.get('msg') || 'พยาบาลขอสอบถามข้อมูลเพิ่มเติมค่ะ';
    const initHistoryRaw = localStorage.getItem('triageHistory');
    
    if (initHistoryRaw) {
      try {
        const parsedHistory = JSON.parse(initHistoryRaw);
        setHistory(parsedHistory);
        
        const visualMessages = parsedHistory.map((h: any) => ({
          isUser: h.role === 'user',
          text: h.text
        }));
        
        // Prevent duplicate AI message if it's already the last item in history
        const lastMsg = visualMessages[visualMessages.length - 1];
        if (lastMsg && !lastMsg.isUser && lastMsg.text === aiMessage) {
          setMessages(visualMessages);
        } else {
          setMessages([...visualMessages, { isUser: false, text: aiMessage }]);
        }
      } catch (e) {
        console.error('Failed to parse triageHistory', e);
      }
    } else {
      setMessages([{ isUser: false, text: aiMessage }]);
      setHistory([{ role: 'model', text: aiMessage }]);
    }

    speakThai(
      aiMessage,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );

    return () => {
      stopSpeech();
    };
  }, []);

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handlePlayVoice = (text: string) => {
    setHasInteracted(true);
    speakThai(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const toggleListening = () => {
    setHasInteracted(true);
    unlockTTS();
    if (listening) {
      SpeechRecognition.stopListening();
      if (inputText.trim() || transcript.trim()) {
        setTimeout(() => handleSendMessage(transcript || inputText), 300);
      }
    } else {
      stopSpeech();
      resetTranscript();
      setInputText('');
      SpeechRecognition.startListening({ language: 'th-TH', continuous: true });
    }
  };

  const handleSendMessage = async (customText?: string) => {
    setHasInteracted(true);
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

    unlockTTS();

    if (listening) {
      SpeechRecognition.stopListening();
    }
    stopSpeech();
    setIsSpeaking(false);

    const updatedMessages = [...messages, { isUser: true, text: textToSend }];
    const updatedHistory = [...history, { role: 'user', text: textToSend }];
    setMessages(updatedMessages);
    setHistory(updatedHistory);
    setInputText('');
    resetTranscript();
    setIsLoading(true);

    try {
      // Need caregiverContext!
      const ctxRaw = localStorage.getItem('caregiverContext');
      const caregiverContext = ctxRaw ? JSON.parse(ctxRaw) : undefined;

      const result = await chatTriage(textToSend, updatedHistory, caregiverContext);
      setIsLoading(false);

      const newNurseMsg = result.nurse_response;
      setMessages([...updatedMessages, { isUser: false, text: newNurseMsg }]);
      const finalHistory = [...updatedHistory, { role: 'model', text: newNurseMsg }];
      setHistory(finalHistory);

      speakThai(
        newNurseMsg,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );

      if (result.is_complete === true) {
        localStorage.setItem('triageResult', JSON.stringify(result));
        localStorage.setItem('triageHistory', JSON.stringify(finalHistory));
        setTimeout(() => router.push('/result'), 2500);
      }
    } catch (e) {
      setIsLoading(false);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  const renderInteractiveBlock = (msgText: string) => {
    const msg = msgText.toLowerCase();
    // Combined conditions
    if (msg.includes('ปวด') && (msg.includes('ระดับไหน') || msg.includes('1-10'))) {
      return <CombinedPainSelector onSend={handleSendMessage} />;
    }
    if ((msg.includes('ไข้') || msg.includes('ตัวร้อน')) && (msg.includes('กี่วัน') || msg.includes('มานาน'))) {
      return <CombinedFeverSelector onSend={handleSendMessage} />;
    }
    if ((msg.includes('บาดเจ็บ') || msg.includes('แผล')) && (msg.includes('เลือด') || msg.includes('ลักษณะ') || msg.includes('ใหญ่'))) {
      return <CombinedInjurySelector onSend={handleSendMessage} />;
    }
    if (msg.includes('มานานกี่วัน') && msg.includes('บ่อย')) {
      return <CombinedGeneralSelector onSend={handleSendMessage} />;
    }


    if (msg.includes('เพศ') && msg.includes('อายุ')) {
      return <CombinedGenderAgeSelector onSend={handleSendMessage} />;
    }

    if (msg.includes('เพศ')) {
      return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mt-2 shadow-sm">
          <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
            เลือกเพศ
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSendMessage('เพศชาย')}
              className="flex flex-col items-center justify-center py-4 rounded-2xl border border-blue-200 bg-white hover:bg-blue-50 active:scale-95 transition-all shadow-sm"
            >
              <div className="text-blue-600 mb-1 text-2xl">♂</div>
              <span className="text-[#002D62] font-bold text-sm">เพศชาย</span>
            </button>
            <button
              onClick={() => handleSendMessage('เพศหญิง')}
              className="flex flex-col items-center justify-center py-4 rounded-2xl border border-blue-200 bg-white hover:bg-blue-50 active:scale-95 transition-all shadow-sm"
            >
              <div className="text-blue-600 mb-1 text-2xl">♀</div>
              <span className="text-[#002D62] font-bold text-sm">เพศหญิง</span>
            </button>
          </div>
        </div>
      );
    }

    if (msg.includes('อายุ')) {
      return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mt-2 shadow-sm">
          <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
            เลือกช่วงอายุ
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSendMessage('เด็ก (ต่ำกว่า 15 ปี)')}
              className="flex flex-col items-center justify-center py-3 px-1 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 active:scale-95 transition-all text-center shadow-sm"
            >
              <span className="text-[#002D62] font-bold text-[15px]">เด็ก</span>
              <span className="text-blue-600/80 text-[9px] mt-0.5">(ต่ำกว่า 15 ปี)</span>
            </button>
            <button
              onClick={() => handleSendMessage('วัยรุ่น/ผู้ใหญ่ (15 - 64 ปี)')}
              className="flex flex-col items-center justify-center py-3 px-1 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 active:scale-95 transition-all text-center shadow-sm"
            >
              <span className="text-[#002D62] font-bold text-[15px]">วัยรุ่น/ผู้ใหญ่</span>
              <span className="text-blue-600/80 text-[9px] mt-0.5">(15 - 64 ปี)</span>
            </button>
            <button
              onClick={() => handleSendMessage('ผู้สูงอายุ (65 ปีขึ้นไป)')}
              className="flex flex-col items-center justify-center py-3 px-1 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 active:scale-95 transition-all text-center shadow-sm"
            >
              <span className="text-[#002D62] font-bold text-[15px]">ผู้สูงอายุ</span>
              <span className="text-blue-600/80 text-[9px] mt-0.5">(65 ปีขึ้นไป)</span>
            </button>
          </div>
        </div>
      );
    }

    if (msg.includes('ปวดบริเวณ') || msg.includes('ปวดตรงไหน') || msg.includes('ตำแหน่ง') || msg.includes('บริเวณไหน') || msg.includes('ปวดท้องเป็นที่')) {
      return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mt-2 shadow-sm">
          <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
            เลือกตำแหน่งที่ปวด
          </p>
          <div className="grid grid-cols-2 gap-2">
            {['ใต้ลิ้นปี่', 'ท้องน้อย', 'ซีกขวา', 'ซีกซ้าย', 'รอบสะดือ', 'หลัง', 'ศีรษะ'].map((loc) => (
              <button
                key={loc}
                onClick={() => handleSendMessage(loc)}
                className="py-3 px-3 rounded-xl border border-blue-200 bg-white text-[#002D62] text-[15px] font-bold hover:bg-blue-50 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>{loc}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (msg.includes('คะแนน') || msg.includes('1-10') || msg.includes('รุนแรงระดับไหน')) {
      return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mt-2 shadow-sm">
          <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
            เลือกระดับความปวด
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => handleSendMessage('1-3 (ปวดเล็กน้อย)')} className="py-3 rounded-xl border border-green-200 bg-green-50 text-green-700 font-bold text-[15px] active:scale-95">1-3</button>
            <button onClick={() => handleSendMessage('4-6 (ปวดปานกลาง)')} className="py-3 rounded-xl border border-yellow-300 bg-yellow-50 text-yellow-700 font-bold text-[15px] active:scale-95">4-6</button>
            <button onClick={() => handleSendMessage('7-10 (ปวดมาก)')} className="py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 font-bold text-[15px] active:scale-95">7-10</button>
          </div>
        </div>
      );
    }
    
        if (msg.includes('อุณหภูมิ') || msg.includes('วัดไข้') || msg.includes('กี่องศา') || msg.includes('ไข้สูงประมาณ')) {
      return (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['ไข้สูงมาก (ตัวร้อนจัด)', 'ไข้ต่ำๆ (ตัวอุ่นๆ)', 'ไม่มีไข้', 'ไม่ได้วัด'].map(ans => (
            <button key={ans} onClick={() => handleSendMessage(ans)} className="py-2.5 rounded-xl border border-orange-200 bg-white text-orange-700 text-[15px] font-bold shadow-sm active:scale-95 hover:bg-orange-50">{ans}</button>
          ))}
        </div>
      );
    }
    
        if ((msg.includes('ส่วนไหน') || msg.includes('บริเวณไหน')) && (msg.includes('ร่างกาย') || msg.includes('แผล') || msg.includes('บาดเจ็บ'))) {
      return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mt-2 shadow-sm">
          <p className="text-[15px] font-bold text-[#002D62] mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
            เลือกบริเวณที่บาดเจ็บ
          </p>
          <div className="grid grid-cols-2 gap-2">
            {['ศีรษะ/ใบหน้า', 'ลำตัว/หน้าอก', 'แขน/มือ', 'ขา/เท้า', 'หลายส่วน'].map(ans => (
              <button key={ans} onClick={() => handleSendMessage(ans)} className="py-2.5 rounded-xl border border-blue-200 bg-white text-[#002D62] text-[15px] font-bold shadow-sm active:scale-95 hover:bg-blue-50">{ans}</button>
            ))}
          </div>
        </div>
      );
    }
    
    if (msg.includes('กี่วัน') || msg.includes('kี่วัน') || msg.includes('มานาน') || msg.includes('เมื่อไหร่') || msg.includes('กี่ชั่วโมง') || msg.includes('วันแล้ว')) {
      return (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['น้อยกว่า 1 วัน', '1-3 วัน', '3-7 วัน', 'มากกว่า 7 วัน'].map(d => (
            <button key={d} onClick={() => handleSendMessage(d)} className="py-2 rounded-xl border border-blue-200 bg-white text-[#002D62] text-[15px] font-bold shadow-sm py-3 active:scale-95">{d}</button>
          ))}
        </div>
      );
    }

    if (msg.includes('บ่อย') || msg.includes('ความถี่') || msg.includes('ตลอดเวลา')) {
      return (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['เป็นตลอดเวลา', 'เป็นๆ หายๆ', 'เฉพาะบางเวลา', 'ไม่แน่ใจ'].map(f => (
            <button key={f} onClick={() => handleSendMessage(f)} className="py-2 rounded-xl border border-blue-200 bg-white text-[#002D62] text-[15px] font-bold shadow-sm py-3 active:scale-95">{f}</button>
          ))}
        </div>
      );
    }
    
    if (msg.includes('ไหม') || msg.includes('รึเปล่า') || msg.includes('หรือเปล่า')) {
      return (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['มีอาการ', 'ไม่มีอาการ'].map(ans => (
            <button key={ans} onClick={() => handleSendMessage(ans)} className="py-2.5 rounded-xl border border-purple-300 bg-white text-purple-700 text-[15px] font-bold shadow-sm active:scale-95 hover:bg-purple-50">{ans}</button>
          ))}
        </div>
      );
    }

    if (msg.includes('สวัสดี') || msg.includes('อธิบายอาการ')) {
      const chips = ['ปวดท้อง', 'ไข้', 'ไอ', 'เจ็บคอ', 'หายใจไม่ออก', 'บาดเจ็บ/แผล'];
      return (
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-2 pl-2">ตัวอย่างอาการที่พบบ่อย</p>
          <div className="flex flex-wrap gap-2 pl-1">
            {chips.map(chip => (
              <button
                key={chip}
                onClick={() => handleSendMessage(chip)}
                className="px-4 py-2 rounded-full bg-white border border-blue-200 text-[#002D62] text-[15px] font-bold shadow-sm active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };


  const lastAiMessage = [...messages].reverse().find(m => !m.isUser)?.text || '';

  return (
    <div className="w-full bg-white flex flex-col min-h-screen">
      <div className="h-14 px-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
        <button 
          onClick={() => {
            stopSpeech();
            router.push('/');
          }}
          className="p-2 -ml-2 text-[#002D62] rounded-full active:bg-gray-100"
        >
          <ArrowLeft size={22} />
        </button>
        <div className="flex items-center gap-2">
            <Image src="/logoppk_0.png" alt="Logo" width={28} height={28} className="object-contain" />
            <span className="text-sm font-bold text-[#002D62]">ซักประวัติเพิ่มเติม</span>
          </div>
        <div className="px-3 py-1 rounded-full bg-blue-50 flex items-center gap-1.5">
          <Circle size={8} className="fill-blue-500 text-blue-500 animate-pulse" />
          <span className="text-xs font-bold text-[#002D62]">กำลังเชื่อมต่อ</span>
        </div>
      </div>

      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative flex items-center justify-center">
            {(isSpeaking || listening) && (
              <>
                <div className="absolute w-44 h-44 rounded-full bg-blue-500/10 animate-ping"></div>
                <div className="absolute w-36 h-36 rounded-full bg-blue-500/15 animate-pulse"></div>
              </>
            )}
            <button 
              type="button"
              onClick={() => handlePlayVoice(messages[messages.length - 1]?.text || 'สวัสดีค่ะ')}
              className="relative z-10 w-32 h-32 rounded-full bg-blue-50 border-4 border-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] flex items-center justify-center text-blue-600 active:scale-95 transition-transform"
            >
              <Headset size={64} />
            </button>
          </div>

          {!hasInteracted && (
            <button
              onClick={() => handlePlayVoice(messages[0]?.text || 'สวัสดีค่ะ')}
              className="mt-3 px-4 py-1.5 rounded-full bg-blue-50 text-[#002D62] text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95 animate-bounce"
            >
              <Volume2 size={16} />
              <span>แตะเพื่อเปิดเสียงพยาบาล</span>
            </button>
          )}
        </div>

        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-4 text-[15px] font-sans leading-relaxed whitespace-pre-line shadow-sm relative group ${
                m.isUser 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-3xl rounded-br-none' 
                  : 'bg-[#F4F9FF] border border-gray-100 text-[#002D62] rounded-3xl rounded-bl-none'
              }`}
            >
              {m.text}

              {!m.isUser && (
                <div className="mt-2 pt-2 border-t border-gray-200/60 flex items-center justify-between">
                  <button
                    onClick={() => handlePlayVoice(m.text)}
                    className="flex items-center gap-1 text-[13px] font-bold text-blue-600 hover:text-blue-800 active:scale-95"
                  >
                    <Volume2 size={14} />
                    <span>ฟังเสียง</span>
                  </button>
                  {isSpeaking && (
                    <span className="text-xs text-gray-400 animate-pulse">กำลังพูด...</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="p-4 rounded-3xl rounded-bl-none bg-[#F4F9FF] border border-gray-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}

        {!isLoading && renderInteractiveBlock(lastAiMessage)}

        <div ref={scrollRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={`p-3.5 rounded-full text-white shadow-md active:scale-95 transition-all ${
              listening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {listening ? <Square size={22} fill="currentColor" /> : <Mic size={22} />}
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={listening ? 'กำลังฟัง...' : 'อธิบายอาการของคุณ...'}
            className="flex-1 h-11 px-4 text-[15px] bg-[#F4F9FF] border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all placeholder:text-gray-400"
          />
          
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="p-3.5 rounded-full bg-blue-600 text-white disabled:bg-gray-200 disabled:text-gray-400 active:scale-95 transition-all shadow-sm"
          >
            <Send size={20} className={inputText.trim() && !isLoading ? 'translate-x-0.5' : ''} />
          </button>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-3 font-medium">
          ระบบอาจมีการประมวลผลผิดพลาด กรุณาตรวจสอบอีกครั้ง
        </p>
      </div>
    </div>
  );
}

export default function FollowUpTriage() {
  return (
    <Suspense fallback={<div className="flex-1 w-full h-full bg-white flex items-center justify-center text-[#002D62] font-bold">กำลังโหลด...</div>}>
      <FollowUpTriageContent />
    </Suspense>
  );
}
