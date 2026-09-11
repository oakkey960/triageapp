'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { chatTriage } from '../../lib/api';
import { speakThai, stopSpeech } from '../../lib/tts';
import { ArrowLeft, Mic, Send, Square, Volume2 } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface Message {
  isUser: boolean;
  text: string;
}

export default function FollowUpTriage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [initialSummary, setInitialSummary] = useState('');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const savedResultStr = localStorage.getItem('triageResult');
    const savedHistoryStr = localStorage.getItem('triageHistory');
    const savedSummaryStr = localStorage.getItem('triageSummary');

    if (savedResultStr && savedHistoryStr) {
      const parsedResult = JSON.parse(savedResultStr);
      const parsedHistory = JSON.parse(savedHistoryStr);

      const nurseQ = parsedResult.nurse_response;
      parsedHistory.push({ role: 'model', text: nurseQ });

      setMessages([{ isUser: false, text: nurseQ }]);
      setHistory(parsedHistory);
      setInitialSummary(savedSummaryStr || '');

      speakThai(
        nurseQ,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }

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
    speakThai(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      stopSpeech();
      resetTranscript();
      setInputText('');
      SpeechRecognition.startListening({ language: 'th-TH', continuous: true });
    }
  };

  const handleSendMessage = async () => {
    const textToSend = inputText.trim();
    if (!textToSend || isLoading) return;

    if (listening) SpeechRecognition.stopListening();
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

      speakThai(
        newNurseMsg,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );

      // Only navigate to result when triage is completely finished
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
        <h1 className="text-base font-bold text-[#263238]">ซักประวัติเพิ่มเติม</h1>
        <div className="w-8"></div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {/* Initial Summary Card */}
        {initialSummary && (
          <div className="p-4 rounded-2xl bg-[#E0F2F1] border border-[#B2DFDB] text-xs">
            <h4 className="font-bold text-[#004D40] mb-1">สรุปอาการเบื้องต้น:</h4>
            <div className="text-[#004D40]/90 whitespace-pre-line leading-relaxed">
              {initialSummary}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-4 text-sm leading-relaxed whitespace-pre-line shadow-sm relative ${
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

        <div ref={scrollRef} />
      </div>

      {/* Live Speaking Indicator */}
      {listening && (
        <div className="mx-5 mb-2 p-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-2xl text-center">
          <p className="text-[#2E7D32] text-xs font-medium truncate">
            {transcript ? transcript : 'กำลังฟัง... กรุณาพูดคำตอบของคุณ'}
          </p>
        </div>
      )}

      {/* Bottom Input Area */}
      <div className="bg-white border-t border-gray-100 p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all flex-shrink-0 ${
              listening ? 'bg-[#E53935] scale-105' : 'bg-[#00897B] hover:bg-[#00796B]'
            }`}
          >
            {listening ? <Square size={18} className="fill-white" /> : <Mic size={20} />}
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="พิมพ์หรือแตะไมค์เพื่อพูด..."
            className="flex-1 h-11 px-4 text-xs bg-[#F5F7FA] rounded-full outline-none focus:ring-1 focus:ring-[#00897B]"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="w-11 h-11 flex items-center justify-center text-[#00897B] disabled:text-gray-300 rounded-full active:bg-gray-100 flex-shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
