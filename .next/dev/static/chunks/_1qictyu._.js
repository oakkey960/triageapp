(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/voice/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VoiceTriage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.mjs [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.mjs [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Headset$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/headset.mjs [app-client] (ecmascript) <export default as Headset>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.mjs [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.mjs [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.mjs [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$speech$2d$recognition$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-speech-recognition/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function VoiceTriage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputText, setInputText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSpeaking, setIsSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasInteracted, setHasInteracted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { transcript, listening, resetTranscript } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$speech$2d$recognition$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"])();
    const greeting = 'สวัสดีค่ะ ฉันคือ AI พยาบาล 👋\nฉันจะช่วยประเมินอาการเบื้องต้นของคุณ กรุณาอธิบายอาการที่คุณกำลังพบอยู่ค่ะ';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceTriage.useEffect": ()=>{
            setMessages([
                {
                    isUser: false,
                    text: greeting
                }
            ]);
            setHistory([
                {
                    role: 'model',
                    text: greeting
                }
            ]);
            // Try speaking (works on desktop, on mobile will wait for user interaction)
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["speakThai"])(greeting, {
                "VoiceTriage.useEffect": ()=>setIsSpeaking(true)
            }["VoiceTriage.useEffect"], {
                "VoiceTriage.useEffect": ()=>setIsSpeaking(false)
            }["VoiceTriage.useEffect"]);
            return ({
                "VoiceTriage.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopSpeech"])();
                }
            })["VoiceTriage.useEffect"];
        }
    }["VoiceTriage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceTriage.useEffect": ()=>{
            if (transcript) {
                setInputText(transcript);
            }
        }
    }["VoiceTriage.useEffect"], [
        transcript
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceTriage.useEffect": ()=>{
            scrollRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["VoiceTriage.useEffect"], [
        messages,
        isLoading
    ]);
    const handlePlayVoice = (text)=>{
        setHasInteracted(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["speakThai"])(text, ()=>setIsSpeaking(true), ()=>setIsSpeaking(false));
    };
    const toggleListening = ()=>{
        setHasInteracted(true);
        if (listening) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$speech$2d$recognition$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stopListening();
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopSpeech"])();
            resetTranscript();
            setInputText('');
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$speech$2d$recognition$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].startListening({
                language: 'th-TH',
                continuous: true
            });
        }
    };
    const handleSendMessage = async (customText)=>{
        setHasInteracted(true);
        const textToSend = (customText || inputText).trim();
        if (!textToSend || isLoading) return;
        if (listening) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$speech$2d$recognition$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].stopListening();
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopSpeech"])();
        setIsSpeaking(false);
        const updatedMessages = [
            ...messages,
            {
                isUser: true,
                text: textToSend
            }
        ];
        const updatedHistory = [
            ...history,
            {
                role: 'user',
                text: textToSend
            }
        ];
        setMessages(updatedMessages);
        setHistory(updatedHistory);
        setInputText('');
        resetTranscript();
        setIsLoading(true);
        try {
            const pi = localStorage.getItem("patientInfo");
            const patient = pi ? JSON.parse(pi) : undefined;
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatTriage"])(textToSend, updatedHistory, patient);
            setIsLoading(false);
            const newNurseMsg = result.nurse_response;
            setMessages([
                ...updatedMessages,
                {
                    isUser: false,
                    text: newNurseMsg
                }
            ]);
            const finalHistory = [
                ...updatedHistory,
                {
                    role: 'model',
                    text: newNurseMsg
                }
            ];
            setHistory(finalHistory);
            // Play nurse response
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["speakThai"])(newNurseMsg, ()=>setIsSpeaking(true), ()=>setIsSpeaking(false));
            // Only navigate to result when triage is completely finished
            if (result.is_complete === true) {
                localStorage.setItem('triageResult', JSON.stringify(result));
                localStorage.setItem('triageHistory', JSON.stringify(finalHistory));
                localStorage.setItem('triageSummary', textToSend);
                setTimeout(()=>router.push('/result'), 2500);
            }
        } catch (e) {
            setIsLoading(false);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        }
    };
    const suggestions = [
        'มีไข้ ปวดหัว',
        'เจ็บคอ ไอ',
        'ปวดท้อง',
        'แผล/บาดเจ็บ',
        'ผื่น คัน',
        'อื่นๆ'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white flex flex-col justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-14 px-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopSpeech"])();
                            router.push('/');
                        },
                        className: "p-2 -ml-2 text-[#263238] rounded-full active:bg-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            size: 22
                        }, void 0, false, {
                            fileName: "[project]/app/voice/page.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/voice/page.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-base font-bold text-[#263238]",
                        children: "คุยกับ AI พยาบาล"
                    }, void 0, false, {
                        fileName: "[project]/app/voice/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-1 rounded-full bg-[#E3F2FD] flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                size: 8,
                                className: "fill-blue-500 text-blue-500 animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/app/voice/page.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-bold text-blue-700",
                                children: "กำลังเชื่อมต่อ"
                            }, void 0, false, {
                                fileName: "[project]/app/voice/page.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/voice/page.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/voice/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 p-5 overflow-y-auto space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center my-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex items-center justify-center",
                                children: [
                                    (isSpeaking || listening) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute w-44 h-44 rounded-full bg-[#00897B]/10 animate-ping"
                                            }, void 0, false, {
                                                fileName: "[project]/app/voice/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute w-36 h-36 rounded-full bg-[#00897B]/20 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/app/voice/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/voice/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handlePlayVoice(messages[messages.length - 1]?.text || greeting),
                                        className: "relative z-10 w-32 h-32 rounded-full bg-[#E0F2F1] border-4 border-white shadow-[0_10px_20px_rgba(0,137,123,0.2)] flex items-center justify-center text-[#00897B] active:scale-95 transition-transform",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headset$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Headset$3e$__["Headset"], {
                                            size: 64
                                        }, void 0, false, {
                                            fileName: "[project]/app/voice/page.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/voice/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/voice/page.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            !hasInteracted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handlePlayVoice(greeting),
                                className: "mt-3 px-4 py-1.5 rounded-full bg-[#00897B]/10 text-[#00897B] text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 animate-bounce",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/app/voice/page.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "แตะเพื่อเปิดเสียงพยาบาล"
                                    }, void 0, false, {
                                        fileName: "[project]/app/voice/page.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/voice/page.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/voice/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    messages.map((m, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex ${m.isUser ? 'justify-end' : 'justify-start'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `max-w-[85%] p-4 text-sm leading-relaxed whitespace-pre-line shadow-sm relative group ${m.isUser ? 'bg-[#00897B] text-white rounded-3xl rounded-br-none' : 'bg-[#F5F7FA] text-[#263238] rounded-3xl rounded-bl-none'}`,
                                children: [
                                    m.text,
                                    !m.isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 pt-2 border-t border-gray-200/60 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handlePlayVoice(m.text),
                                                className: "flex items-center gap-1 text-[11px] font-bold text-[#00897B] hover:text-[#00695C] active:scale-95",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/voice/page.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "ฟังเสียง"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/voice/page.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/voice/page.tsx",
                                                lineNumber: 192,
                                                columnNumber: 19
                                            }, this),
                                            isSpeaking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-gray-400 animate-pulse",
                                                children: "กำลังพูด..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/voice/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/voice/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/voice/page.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this)
                        }, idx, false, {
                            fileName: "[project]/app/voice/page.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)),
                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 rounded-3xl rounded-bl-none bg-[#F5F7FA] flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 rounded-full bg-[#00897B] animate-bounce"
                                }, void 0, false, {
                                    fileName: "[project]/app/voice/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 rounded-full bg-[#00897B] animate-bounce [animation-delay:0.2s]"
                                }, void 0, false, {
                                    fileName: "[project]/app/voice/page.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 rounded-full bg-[#00897B] animate-bounce [animation-delay:0.4s]"
                                }, void 0, false, {
                                    fileName: "[project]/app/voice/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/voice/page.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/voice/page.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this),
                    messages.length <= 2 && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-center gap-2 pt-2",
                        children: suggestions.map((chip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleSendMessage(chip),
                                className: "px-3.5 py-1.5 rounded-full bg-white border border-[#80CBC4] text-[#00897B] text-xs font-semibold shadow-sm hover:bg-[#E0F2F1]/50 active:scale-95 transition-all",
                                children: chip
                            }, chip, false, {
                                fileName: "[project]/app/voice/page.tsx",
                                lineNumber: 222,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/voice/page.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: scrollRef
                    }, void 0, false, {
                        fileName: "[project]/app/voice/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/voice/page.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            listening && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-5 mb-2 p-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-2xl text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[#2E7D32] text-xs font-medium truncate",
                    children: transcript ? transcript : 'กำลังฟัง... กรุณาพูดอาการของคุณ'
                }, void 0, false, {
                    fileName: "[project]/app/voice/page.tsx",
                    lineNumber: 239,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/voice/page.tsx",
                lineNumber: 238,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-t border-gray-100 p-5 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleListening,
                            className: `w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-[0_8px_15px_rgba(0,0,0,0.2)] ${listening ? 'bg-[#E53935] shadow-[0_8px_20px_rgba(229,57,53,0.4)] scale-105' : 'bg-[#00BFA5] hover:bg-[#00897B] shadow-[0_8px_20px_rgba(0,191,165,0.35)]'}`,
                            children: listening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                size: 32,
                                className: "fill-white"
                            }, void 0, false, {
                                fileName: "[project]/app/voice/page.tsx",
                                lineNumber: 257,
                                columnNumber: 26
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                size: 36
                            }, void 0, false, {
                                fileName: "[project]/app/voice/page.tsx",
                                lineNumber: 257,
                                columnNumber: 72
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/voice/page.tsx",
                            lineNumber: 249,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-bold text-[#00897B] mt-2.5",
                            children: listening ? 'กำลังฟัง... แตะเพื่อหยุด' : 'กดปุ่มไมค์เพื่อพูด'
                        }, void 0, false, {
                            fileName: "[project]/app/voice/page.tsx",
                            lineNumber: 260,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[11px] text-gray-400 mt-0.5 mb-3",
                            children: "หรือพิมพ์ข้อความ"
                        }, void 0, false, {
                            fileName: "[project]/app/voice/page.tsx",
                            lineNumber: 263,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "p-2.5 text-gray-400 hover:text-[#00897B] rounded-full active:bg-gray-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/voice/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/voice/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: inputText,
                                    onChange: (e)=>setInputText(e.target.value),
                                    onKeyDown: (e)=>e.key === 'Enter' && handleSendMessage(),
                                    placeholder: "พิมพ์ข้อความ...",
                                    className: "flex-1 h-11 px-4 text-xs bg-[#F5F7FA] rounded-full outline-none focus:ring-1 focus:ring-[#00897B]"
                                }, void 0, false, {
                                    fileName: "[project]/app/voice/page.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleSendMessage(),
                                    disabled: !inputText.trim() || isLoading,
                                    className: "p-2.5 text-[#00897B] disabled:text-gray-300 rounded-full active:bg-gray-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/app/voice/page.tsx",
                                        lineNumber: 283,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/voice/page.tsx",
                                    lineNumber: 278,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/voice/page.tsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/voice/page.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/voice/page.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/voice/page.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s(VoiceTriage, "qh+QtcNOZq8m10ClqoUOmh+NCdA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$speech$2d$recognition$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechRecognition"]
    ];
});
_c = VoiceTriage;
var _c;
__turbopack_context__.k.register(_c, "VoiceTriage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "changePassword",
    ()=>changePassword,
    "chatTriage",
    ()=>chatTriage,
    "getHealthInfo",
    ()=>getHealthInfo,
    "getHistory",
    ()=>getHistory,
    "loginPatient",
    ()=>loginPatient,
    "savePatient",
    ()=>savePatient,
    "searchPatient",
    ()=>searchPatient,
    "updateHealthInfo",
    ()=>updateHealthInfo,
    "updateProfile",
    ()=>updateProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const getBaseUrl = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return 'http://' + window.location.hostname + ':5001/api';
    }
    //TURBOPACK unreachable
    ;
};
const chatTriage = async (message, history = [], patientInfo, location, imageBase64, imageMimeType)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(getBaseUrl() + '/triage/chat', {
        message,
        history,
        patientInfo,
        location,
        imageBase64,
        imageMimeType
    });
    return response.data?.data ?? response.data;
};
const searchPatient = async (cid)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(getBaseUrl() + '/pat/search', {
            cid
        });
        return response.data?.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        throw error;
    }
};
const loginPatient = async (cid, passwordInput)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(getBaseUrl() + '/pat/login', {
        cid,
        password: passwordInput
    });
    return response.data?.data;
};
const savePatient = async (patientData)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(getBaseUrl() + '/pat/save', patientData);
    return response.data?.data;
};
const getHistory = async (cid)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(getBaseUrl() + '/triage/history/' + cid);
    return response.data?.data;
};
const getHealthInfo = async (cid)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(getBaseUrl() + '/pat/health/' + cid);
        return response.data?.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        throw error;
    }
};
const updateHealthInfo = async (cid, data)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(getBaseUrl() + '/pat/health/' + cid, data);
    return response.data?.data;
};
const updateProfile = async (cid, data)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(getBaseUrl() + '/pat/profile/' + cid, data);
    return response.data?.data;
};
const changePassword = async (cid, data)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(getBaseUrl() + '/pat/password/' + cid, data);
    return response.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/tts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "speakThai",
    ()=>speakThai,
    "stopSpeech",
    ()=>stopSpeech
]);
// Persistent reference to prevent garbage collection on Mobile Safari/Chrome
let currentUtterance = null;
const speakThai = (text, onStart, onEnd)=>{
    if (("TURBOPACK compile-time value", "object") === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported on this browser');
        return;
    }
    // Cancel any previous speech
    window.speechSynthesis.cancel();
    // Resume synthesis if it was suspended by mobile browser
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    // Try finding Thai voice
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find((v)=>v.lang === 'th-TH' || v.lang === 'th_TH' || v.lang.toLowerCase().startsWith('th') || v.name.includes('Thai'));
    if (thaiVoice) {
        utterance.voice = thaiVoice;
    }
    utterance.onstart = ()=>{
        onStart?.();
    };
    utterance.onend = ()=>{
        currentUtterance = null;
        onEnd?.();
    };
    utterance.onerror = (e)=>{
        console.warn('TTS error or cancelled:', e);
        currentUtterance = null;
        onEnd?.();
    };
    // Keep reference on window to prevent premature garbage collection
    currentUtterance = utterance;
    window.__ttsUtterance = utterance;
    window.speechSynthesis.speak(utterance);
};
const stopSpeech = ()=>{
    if (("TURBOPACK compile-time value", "object") !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1qictyu._.js.map