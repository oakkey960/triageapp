'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { chatTriage } from '../../lib/api';
import { speakThai, stopSpeech } from '../../lib/tts';
import { ArrowLeft, Mic, Send, Camera, Headset, Circle, Square, Volume2, VolumeX } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface Message {
  isUser: boolean;
  text: string;
}

export default function VoiceTriage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const greeting = 'สวัสดีค่ะ ฉันคือ AI พยาบาล 👋\nฉันจะช่วยประเมินอาการเบื้องต้นของคุณ กรุณาอธิบายอาการที่คุณกำลังพบอยู่ค่ะ';

  useEffect(() => {
    setMessages([{ isUser: false, text: greeting }]);
    setHistory([{ role: 'model', text: greeting }]);

    // Try speaking (works on desktop, on mobile will wait for user interaction)
    speakThai(
      greeting,
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
    if (listening) {
      SpeechRecognition.stopListening();
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
      const pi = localStorage.getItem("patientInfo"); const patient = pi ? JSON.parse(pi) : undefined; const result = await chatTriage(textToSend, updatedHistory, patient);
      setIsLoading(false);

      const newNurseMsg = result.nurse_response;
      setMessages([...updatedMessages, { isUser: false, text: newNurseMsg }]);
      const finalHistory = [...updatedHistory, { role: 'model', text: newNurseMsg }];
      setHistory(finalHistory);

      // Play nurse response
      speakThai(
        newNurseMsg,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );

      // Only navigate to result when triage is completely finished
      if (result.is_complete === true) {
        localStorage.setItem('triageResult', JSON.stringify(result));
        localStorage.setItem('triageHistory', JSON.stringify(finalHistory));
        localStorage.setItem('triageSummary', textToSend);
        setTimeout(() => router.push('/result'), 2500);
      }
    } catch (e) {
      setIsLoading(false);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  const suggestions = ['มีไข้ ปวดหัว', 'เจ็บคอ ไอ', 'ปวดท้อง', 'แผล/บาดเจ็บ', 'ผื่น คัน', 'อื่นๆ'];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* AppBar */}
      <div className="h-14 px-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
        <button 
          onClick={() => {
            stopSpeech();
            router.push('/');
          }}
          className="p-2 -ml-2 text-[#263238] rounded-full active:bg-gray-100"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-bold text-[#263238]">คุยกับ AI พยาบาล</h1>
        <div className="px-3 py-1 rounded-full bg-[#E3F2FD] flex items-center gap-1.5">
          <Circle size={8} className="fill-blue-500 text-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold text-blue-700">กำลังเชื่อมต่อ</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {/* Nurse Avatar with Pulse Effect */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative flex items-center justify-center">
            {(isSpeaking || listening) && (
              <>
                <div className="absolute w-44 h-44 rounded-full bg-[#00897B]/10 animate-ping"></div>
                <div className="absolute w-36 h-36 rounded-full bg-[#00897B]/20 animate-pulse"></div>
              </>
            )}
            <button 
              type="button"
              onClick={() => handlePlayVoice(messages[messages.length - 1]?.text || greeting)}
              className="relative z-10 w-32 h-32 rounded-full bg-[#E0F2F1] border-4 border-white shadow-[0_10px_20px_rgba(0,137,123,0.2)] flex items-center justify-center text-[#00897B] active:scale-95 transition-transform"
            >
              <Headset size={64} />
            </button>
          </div>

          {/* Audio prompt button for mobile if blocked by autoplay */}
          {!hasInteracted && (
            <button
              onClick={() => handlePlayVoice(greeting)}
              className="mt-3 px-4 py-1.5 rounded-full bg-[#00897B]/10 text-[#00897B] text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 animate-bounce"
            >
              <Volume2 size={16} />
              <span>แตะเพื่อเปิดเสียงพยาบาล</span>
            </button>
          )}
        </div>

        {/* Messages */}
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-4 text-sm leading-relaxed whitespace-pre-line shadow-sm relative group ${
                m.isUser 
                  ? 'bg-[#00897B] text-white rounded-3xl rounded-br-none' 
                  : 'bg-[#F5F7FA] text-[#263238] rounded-3xl rounded-bl-none'
              }`}
            >
              {m.text}

              {/* Speaker icon for bot messages */}
              {!m.isUser && (
                <div className="mt-2 pt-2 border-t border-gray-200/60 flex items-center justify-between">
                  <button
                    onClick={() => handlePlayVoice(m.text)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#00897B] hover:text-[#00695C] active:scale-95"
                  >
                    <Volume2 size={14} />
                    <span>ฟังเสียง</span>
                  </button>
                  {isSpeaking && (
                    <span className="text-[10px] text-gray-400 animate-pulse">กำลังพูด...</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="p-4 rounded-3xl rounded-bl-none bg-[#F5F7FA] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00897B] animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-[#00897B] animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-[#00897B] animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}

        {/* Suggestion Chips */}
        {messages.length <= 2 && !isLoading && (
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {suggestions.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendMessage(chip)}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#80CBC4] text-[#00897B] text-xs font-semibold shadow-sm hover:bg-[#E0F2F1]/50 active:scale-95 transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Live Speaking Indicator */}
      {listening && (
        <div className="mx-5 mb-2 p-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-2xl text-center">
          <p className="text-[#2E7D32] text-xs font-medium truncate">
            {transcript ? transcript : 'กำลังฟัง... กรุณาพูดอาการของคุณ'}
          </p>
        </div>
      )}

      {/* Bottom Input Area */}
      <div className="bg-white border-t border-gray-100 p-5 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center">
          {/* Big Round Mic Button */}
          <button
            onClick={toggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-[0_8px_15px_rgba(0,0,0,0.2)] ${
              listening 
                ? 'bg-[#E53935] shadow-[0_8px_20px_rgba(229,57,53,0.4)] scale-105' 
                : 'bg-[#00BFA5] hover:bg-[#00897B] shadow-[0_8px_20px_rgba(0,191,165,0.35)]'
            }`}
          >
            {listening ? <Square size={32} className="fill-white" /> : <Mic size={36} />}
          </button>

          <span className="text-xs font-bold text-[#00897B] mt-2.5">
            {listening ? 'กำลังฟัง... แตะเพื่อหยุด' : 'กดปุ่มไมค์เพื่อพูด'}
          </span>
          <span className="text-[11px] text-gray-400 mt-0.5 mb-3">หรือพิมพ์ข้อความ</span>

          {/* Text Input Row */}
          <div className="w-full flex items-center gap-2">
            <button className="p-2.5 text-gray-400 hover:text-[#00897B] rounded-full active:bg-gray-100">
              <Camera size={20} />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="พิมพ์ข้อความ..."
              className="flex-1 h-11 px-4 text-xs bg-[#F5F7FA] rounded-full outline-none focus:ring-1 focus:ring-[#00897B]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 text-[#00897B] disabled:text-gray-300 rounded-full active:bg-gray-100"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
