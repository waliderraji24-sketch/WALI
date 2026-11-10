import { r as reactExports, j as jsxRuntimeExports, X, L as Lock, ae as FileText, af as KeyRound, T as Trash2, C as Check, z as React, ag as StopCircle, ah as Image, Y as Send, ai as Mic, a as ShieldCheck, aj as EyeOff, ak as Eye, s as AlertCircle, al as SendHorizontal, am as useParams, a7 as useNavigate, an as useLocation, k as ArrowRight, ad as Bookmark, U as User, P as Phone, V as Video, ao as Pin, ap as Pencil, _ as Film, aq as MoreHorizontal, ar as Paperclip, g as Copy, G as Clock, D as Download, as as Smile, at as MoreVertical, i as ChevronDown, a3 as Loader2, au as RotateCw, av as Play, aw as Pause, J as VolumeX, K as Volume2, ax as Maximize2 } from './vendor-react-DAzNXBh_.js';
import { d as db, e as cleanFirestoreData, g as compressImage, j as blobToDataURL, o as outboxStorage, k as chatUploadManager, l as IMI_BOT_ID, i as isUserOnline, f as formatLastSeen, p as isMessageWithinFourHours, h as handleFirestoreError, O as OperationType, n as notificationService, m as messagingService, q as extractVideoMetadata, r as getLocalVideoBlobUrl } from './index-1f3YQYJq.js';
import { x as query, n as collection, o as getDocs, k as deleteDoc, h as doc, m as updateDoc, C as orderBy, A as onSnapshot, j as setDoc, D as deleteField, f as getDoc, E as limitToLast } from './vendor-firebase-DLAfa3Dz.js';
import { a as formatMessageTime, b as formatFullDateTime, c as formatDateDivider, M as MessageStatusIcon } from './MessageStatusIcon-CUdySMPl.js';

function sha256Fallback(ascii) {
  function rightRotate(value, amount) {
    return value >>> amount | value << 32 - amount;
  }
  const words = [];
  const asciiBitLength = ascii.length * 8;
  let i;
  let j;
  let result = "";
  let hash = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ];
  const k = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  for (i = 0; i < ascii.length; i++) {
    const code = ascii.charCodeAt(i);
    words[i >> 2] |= code << (3 - i % 4) * 8;
  }
  words[asciiBitLength >> 5] |= 128 << 24 - asciiBitLength % 32;
  words[(asciiBitLength + 64 >> 9 << 4) + 15] = asciiBitLength;
  for (i = 0; i < words.length; i += 16) {
    const w = words.slice(i, i + 16);
    const oldHash = hash.slice(0);
    for (j = 0; j < 64; j++) {
      const s0 = j < 16 ? w[j] || 0 : rightRotate(w[j - 2] || 0, 17) ^ rightRotate(w[j - 2] || 0, 19) ^ (w[j - 2] || 0) >>> 10;
      const s1 = j < 16 ? 0 : rightRotate(w[j - 15] || 0, 7) ^ rightRotate(w[j - 15] || 0, 18) ^ (w[j - 15] || 0) >>> 3;
      if (j >= 16) {
        w[j] = (w[j - 16] || 0) + s1 + (w[j - 7] || 0) + s0 | 0;
      }
      const ch = hash[4] & hash[5] ^ ~hash[4] & hash[6];
      const maj = hash[0] & hash[1] ^ hash[0] & hash[2] ^ hash[1] & hash[2];
      const temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[j] + (w[j] || 0) | 0;
      const temp2 = (rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj | 0;
      hash = [temp1 + temp2 | 0, hash[0], hash[1], hash[2], hash[3] + temp1 | 0, hash[4], hash[5], hash[6]];
    }
    for (j = 0; j < 8; j++) {
      hash[j] = hash[j] + oldHash[j] | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = hash[i] >> 8 * j & 255;
      result += (b < 16 ? "0" : "") + b.toString(16);
    }
  }
  return result;
}
async function hashSecretCode(code) {
  const clean = (code || "").trim();
  try {
    if (typeof window !== "undefined" && window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === "function") {
      const encoder = new TextEncoder();
      const data = encoder.encode(clean);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  } catch (e) {
    console.warn("SubtleCrypto digest fallback in use:", e);
  }
  return sha256Fallback(clean);
}
const secretChatService = {
  /**
   * Listen to active secret session state for this chat
   */
  listenToSecretSession(chatId, callback) {
    if (!chatId) return () => {
    };
    const sessionRef = doc(db, "chats", chatId, "secret_session", "current");
    return onSnapshot(
      sessionRef,
      (snapshot) => {
        if (snapshot.exists()) {
          callback({
            id: snapshot.id,
            ...snapshot.data()
          });
        } else {
          callback(null);
        }
      },
      (error) => {
        console.warn("Secret session listener notice:", error);
        callback(null);
      }
    );
  },
  /**
   * Get active secret session directly
   */
  async getSecretSession(chatId) {
    if (!chatId) return null;
    try {
      const sessionRef = doc(db, "chats", chatId, "secret_session", "current");
      const snap = await getDoc(sessionRef);
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    } catch (e) {
      console.warn("getSecretSession error:", e);
      return null;
    }
  },
  /**
   * Create or Reset a Secret Session with a shared Secret Code
   */
  async createSecretSession(params) {
    const { chatId, code, creatorId, otherUserId, otherDisplayName, sendInviteMessage = true } = params;
    const codeHash = await hashSecretCode(code);
    const now = Date.now();
    const sessionData = {
      id: "current",
      chatId,
      codeHash,
      createdBy: creatorId,
      participants: [creatorId, otherUserId].filter(Boolean),
      participantCodes: {
        [creatorId]: codeHash
      },
      createdAt: now,
      status: "active",
      lastMessage: "تم بدء المحادثة السرية",
      lastMessageTime: now
    };
    const sessionRef = doc(db, "chats", chatId, "secret_session", "current");
    await setDoc(sessionRef, cleanFirestoreData(sessionData));
    if (sendInviteMessage) {
      await this.sendInviteCard({
        chatId,
        senderId: creatorId,
        receiverId: otherUserId
      });
    }
    return sessionData;
  },
  /**
   * Send or Re-send an interactive Secret Chat invitation card into the normal chat
   */
  async sendInviteCard(params) {
    const { chatId, senderId, receiverId } = params;
    const now = Date.now();
    const inviteMsgId = "sec_inv_" + now;
    const inviteText = "🔒 محادثة محمية برمز أمان خاص\nاضغط هنا للدخول إلى المحادثة بالرمز السري 🔑";
    const inviteMessage = {
      id: inviteMsgId,
      chatId,
      sender: senderId,
      receiverId: receiverId || "other",
      text: inviteText,
      cipherText: inviteText,
      type: "secret_invite",
      timestamp: now,
      createdAt: now,
      status: "sent",
      isSecretInvite: true
    };
    const msgRef = doc(db, "chats", chatId, "messages", inviteMsgId);
    await setDoc(msgRef, cleanFirestoreData(inviteMessage));
    await setDoc(
      doc(db, "chats", chatId),
      cleanFirestoreData({
        lastMessage: "🔒 محادثة محمية برمز أمان خاص",
        lastMessageTime: now,
        lastMessageSender: senderId,
        lastMessageStatus: "sent"
      }),
      { merge: true }
    );
  },
  /**
   * Verify whether the entered code matches the session's code hash or user-specific code
   */
  async verifyCode(inputCode, session, userId) {
    if (!session) return false;
    const cleanCode = (inputCode || "").trim();
    if (!cleanCode) return false;
    const inputHash = await hashSecretCode(cleanCode);
    if (session.codeHash && inputHash === session.codeHash) return true;
    if (userId && session.participantCodes && session.participantCodes[userId]) {
      if (session.participantCodes[userId] === inputHash) return true;
      return false;
    }
    if (userId) {
      try {
        const sessionRef = doc(db, "chats", session.chatId, "secret_session", "current");
        await setDoc(
          sessionRef,
          {
            participantCodes: {
              [userId]: inputHash
            }
          },
          { merge: true }
        );
      } catch (err) {
        console.warn("Failed to save user participant code:", err);
      }
      return true;
    }
    return false;
  },
  /**
   * Reset user's personal secret code so they can set a new one
   */
  async resetUserCode(chatId, userId) {
    try {
      const sessionRef = doc(db, "chats", chatId, "secret_session", "current");
      await updateDoc(sessionRef, {
        [`participantCodes.${userId}`]: deleteField()
      });
    } catch (err) {
      console.warn("Reset user code error:", err);
    }
  },
  /**
   * Send a confidential message inside the secret session
   */
  async sendSecretMessage(params) {
    const { chatId, senderId, text, type = "text", mediaUrl } = params;
    const now = Date.now();
    const msgId = "sec_msg_" + now + "_" + Math.random().toString(36).substring(2, 7);
    const secretMsg = {
      id: msgId,
      chatId,
      sender: senderId,
      text: text.trim(),
      type,
      mediaUrl,
      timestamp: now
    };
    const msgRef = doc(db, "chats", chatId, "secret_messages", msgId);
    await setDoc(msgRef, cleanFirestoreData(secretMsg));
    const sessionRef = doc(db, "chats", chatId, "secret_session", "current");
    await updateDoc(
      sessionRef,
      cleanFirestoreData({
        lastMessage: text.trim() || "وسائط سرية",
        lastMessageTime: now
      })
    );
  },
  /**
   * Listen to all messages in the secret room in real time
   */
  listenToSecretMessages(chatId, callback) {
    const q = query(
      collection(db, "chats", chatId, "secret_messages"),
      orderBy("timestamp", "asc")
    );
    return onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        callback(msgs);
      },
      (error) => {
        console.warn("Secret messages listener error:", error);
        callback([]);
      }
    );
  },
  /**
   * Close the secret session for review (read-only mode; communication stops afterwards)
   */
  async closeSessionForReview(chatId) {
    const sessionRef = doc(db, "chats", chatId, "secret_session", "current");
    await updateDoc(
      sessionRef,
      cleanFirestoreData({
        status: "closed_for_review",
        closedAt: Date.now()
      })
    );
  },
  /**
   * Completely and permanently delete the secret session and all its secret messages
   */
  async deleteSecretSession(chatId) {
    const q = query(collection(db, "chats", chatId, "secret_messages"));
    const snapshot = await getDocs(q);
    const deletePromises = snapshot.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletePromises);
    const sessionRef = doc(db, "chats", chatId, "secret_session", "current");
    await deleteDoc(sessionRef);
  }
};

async function getAudioMediaStream() {
  if (typeof navigator !== "undefined" && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function") {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      return { stream, isFallback: false };
    } catch (err) {
      console.warn("[AudioRecorder] Physical microphone unavailable or denied, activating fallback audio stream:", err?.message);
    }
  }
  const AudioContextClass = typeof window !== "undefined" ? window.AudioContext || window.webkitAudioContext : null;
  if (AudioContextClass) {
    const ctx = new AudioContextClass();
    const dest = ctx.createMediaStreamDestination();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    osc.connect(gain);
    gain.connect(dest);
    osc.start();
    return { stream: dest.stream, isFallback: true };
  }
  throw new Error("لا يدعم المتصفح تسجيل الصوت.");
}

const SecretChatModal = ({
  chatId,
  userId,
  otherUser,
  otherDisplayName,
  otherAvatar,
  isOpen,
  onClose,
  initialSession
}) => {
  const [session, setSession] = reactExports.useState(initialSession);
  const [messages, setMessages] = reactExports.useState([]);
  const [inputText, setInputText] = reactExports.useState("");
  const [isSending, setIsSending] = reactExports.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  const [showCloseForReviewConfirm, setShowCloseForReviewConfirm] = reactExports.useState(false);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const [recordingSeconds, setRecordingSeconds] = reactExports.useState(0);
  const [isInviting, setIsInviting] = reactExports.useState(false);
  const [inviteSentToast, setInviteSentToast] = reactExports.useState(false);
  const [linkCopiedToast, setLinkCopiedToast] = reactExports.useState(false);
  const [selectedImageModal, setSelectedImageModal] = reactExports.useState(null);
  const messagesEndRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const mediaRecorderRef = reactExports.useRef(null);
  const audioChunksRef = reactExports.useRef([]);
  const timerRef = reactExports.useRef(null);
  const handleSendInviteCard = async () => {
    if (!chatId || isInviting) return;
    setIsInviting(true);
    try {
      await secretChatService.sendInviteCard({
        chatId,
        senderId: userId,
        receiverId: otherUser
      });
      setInviteSentToast(true);
      setTimeout(() => setInviteSentToast(false), 3e3);
    } catch (err) {
      console.error("Failed to send secret invite card:", err);
    } finally {
      setIsInviting(false);
    }
  };
  reactExports.useEffect(() => {
    if (!chatId || !isOpen) return;
    const unsub = secretChatService.listenToSecretSession(chatId, (s) => {
      if (s) {
        setSession(s);
      } else {
        onClose();
      }
    });
    return () => unsub();
  }, [chatId, isOpen, onClose]);
  reactExports.useEffect(() => {
    if (!chatId || !isOpen) return;
    const unsub = secretChatService.listenToSecretMessages(chatId, (msgs) => {
      setMessages(msgs);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
    return () => unsub();
  }, [chatId, isOpen]);
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || session.status === "closed_for_review" || isSending) return;
    const textToSend = inputText.trim();
    setInputText("");
    setIsSending(true);
    try {
      await secretChatService.sendSecretMessage({
        chatId,
        senderId: userId,
        text: textToSend,
        type: "text"
      });
    } catch (err) {
      console.error("Failed to send secret message:", err);
    } finally {
      setIsSending(false);
    }
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || session.status === "closed_for_review") return;
    try {
      const compressed = await compressImage(file, 1080, 0.8);
      const dataUrl = compressed.dataUrl || await blobToDataURL(file);
      await secretChatService.sendSecretMessage({
        chatId,
        senderId: userId,
        text: "📷 صورة سرية",
        type: "image",
        mediaUrl: dataUrl
      });
    } catch (err) {
      console.error("Failed to send secret image:", err);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const startRecording = async () => {
    try {
      const { stream } = await getAudioMediaStream();
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };
      recorder.onstop = async () => {
        try {
          stream.getTracks().forEach((track) => track.stop());
        } catch (e) {
        }
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const dataUrl = await blobToDataURL(audioBlob);
        await secretChatService.sendSecretMessage({
          chatId,
          senderId: userId,
          text: "🎤 تسجيل صوتي سري",
          type: "voice",
          mediaUrl: dataUrl
        });
      };
      try {
        recorder.start(250);
      } catch {
        recorder.start();
      }
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1e3);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };
  const handleCloseForReview = async () => {
    try {
      await secretChatService.closeSessionForReview(chatId);
      setShowCloseForReviewConfirm(false);
    } catch (err) {
      console.error("Failed to close for review:", err);
    }
  };
  const handleDeletePermanently = async () => {
    setIsDeleting(true);
    try {
      await secretChatService.deleteSecretSession(chatId);
      setShowDeleteConfirm(false);
      onClose();
    } catch (err) {
      console.error("Failed to delete secret chat:", err);
    } finally {
      setIsDeleting(false);
    }
  };
  if (!isOpen) return null;
  const isReviewMode = session.status === "closed_for_review";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl h-full sm:h-[88vh] bg-slate-950 text-white rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-800 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md flex items-center justify-between shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer",
            title: "إغلاق وقفل المحادثة",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-slate-800 border-2 border-cyan-500/40 flex items-center justify-center font-bold overflow-hidden shadow-inner", children: otherAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: otherAvatar, alt: otherDisplayName, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400 text-sm", children: otherDisplayName.charAt(0) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-slate-900 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5 text-cyan-400" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm text-slate-100", children: otherDisplayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300", children: "سرية تامة" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5", children: isReviewMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
            "وضع المراجعة فقط (المحادثة منتهية)"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
            "متصل بسرية فائقة ومقفل بالرمز"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        !isReviewMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleSendInviteCard,
            disabled: isInviting,
            className: "px-2.5 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-xs",
            title: "إرسال بطاقة دعوة تفاعلية للطرف الآخر في المحادثة العادية",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3.5 h-3.5 text-cyan-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إرسال بطاقة في الدردشة" })
            ]
          }
        ),
        !isReviewMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setShowCloseForReviewConfirm(true),
            className: "px-2.5 py-1.5 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/30 text-amber-300 text-xs font-medium transition cursor-pointer flex items-center gap-1.5",
            title: "إنهاء المحادثة وتحويلها إلى وضع المراجعة المقفلة",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "إقفال للمراجعة" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowDeleteConfirm(true),
            className: "p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-400 hover:text-rose-200 transition cursor-pointer",
            title: "حذف المحادثة السرية نهائياً",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    linkCopiedToast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-cyan-950 border-b border-cyan-500/40 text-cyan-200 px-4 py-2 text-xs font-bold flex items-center justify-between animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-cyan-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تم نسخ رابط الدخول المباشر إلى الحافظة بنجاح! يمكنك إرساله للطرف الآخر." })
    ] }) }),
    inviteSentToast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-emerald-950 border-b border-emerald-500/40 text-emerald-300 px-4 py-2 text-xs font-bold flex items-center justify-between animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تم إرسال بطاقة دعوة تفاعلية إلى الطرف الآخر في المحادثة العادية بنجاح!" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border-b border-cyan-900/20 flex items-center justify-between text-[11px] text-cyan-200/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "محفوظة داخل النقاط الثلاث ولا تفتح إلا بالرمز السري المشترك" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "تشفير تام • بدون أثر خارجي" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-950 via-[#070d17] to-slate-950 select-text", children: [
      messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center p-6 text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-3xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 shadow-lg shadow-cyan-950/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-base text-slate-200 mb-1", children: "المحادثة السرية جاهزة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 max-w-xs leading-relaxed mb-4", children: [
          "تواصل مع ",
          otherDisplayName,
          " في أمان وسرية تامة. كل الرسائل محفوظة خلف النقاط الثلاث ولا يمكن الوصول إليها بدون الرمز السري المشترك."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-[11px] text-cyan-300 bg-cyan-950/50 px-3 py-1.5 rounded-full border border-cyan-500/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "محمية برمز أمان خاص" })
        ] })
      ] }) : messages.map((msg, idx) => {
        const isMe = msg.sender === userId;
        const formattedTime = formatMessageTime(msg.timestamp);
        const fullTimeTooltip = formatFullDateTime(msg.timestamp);
        const prevMsg = idx > 0 ? messages[idx - 1] : null;
        const isDifferentDay = !prevMsg || formatDateDivider(msg.timestamp) !== formatDateDivider(prevMsg.timestamp);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
          isDifferentDay && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center my-2 select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-900 border border-cyan-500/20 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-full shadow-xs", children: formatDateDivider(msg.timestamp) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex ${isMe ? "justify-start" : "justify-end"} animate-in fade-in duration-150`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 shadow-md relative ${isMe ? "bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-tr-xs" : "bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-xs"}`,
                  children: [
                    msg.type === "image" && msg.mediaUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 rounded-xl overflow-hidden max-h-72 bg-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: msg.mediaUrl,
                        alt: "Secret Image",
                        className: "w-full h-auto object-cover cursor-pointer hover:opacity-95 transition",
                        onClick: () => setSelectedImageModal(msg.mediaUrl || null)
                      }
                    ) }),
                    msg.type === "voice" && msg.mediaUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 flex items-center gap-2 p-2 bg-black/30 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { src: msg.mediaUrl, controls: true, className: "w-full h-8" }) }),
                    msg.text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13.5px] leading-relaxed whitespace-pre-wrap break-words", children: msg.text }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: `mt-1.5 flex items-center justify-end gap-1 text-[10px] ${isMe ? "text-cyan-100" : "text-slate-400"}`,
                        title: fullTimeTooltip,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5 opacity-80" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formattedTime })
                        ]
                      }
                    )
                  ]
                }
              )
            }
          )
        ] }, msg.id);
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
    ] }),
    isReviewMode ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-slate-900/95 border-t border-amber-500/20 text-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "المحادثة مقفلة في وضع المراجعة فقط • لا يمكن إرسال رسائل جديدة بعد المراجعة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] text-slate-400 max-w-md", children: "يمكنك مراجعة جميع الرسائل المحفوظة. وعند الانتهاء أو إذا رغبت، يمكنك حذفها نهائياً بضغطة زر دون ترك أي أثر." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowDeleteConfirm(true),
            className: "px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-rose-950/40 cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حذف المحادثة السرية نهائياً" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition cursor-pointer",
            children: "إغلاق وقفل بالرمز"
          }
        )
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-900/90 border-t border-slate-800 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "file",
          ref: fileInputRef,
          accept: "image/*",
          className: "hidden",
          onChange: handleImageUpload
        }
      ),
      isRecording ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-rose-950/40 border border-rose-500/30 rounded-2xl px-4 py-2.5 animate-pulse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-rose-400 text-xs font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "جاري تسجيل رسالة سرية (",
            recordingSeconds,
            " ث)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: stopRecording,
            className: "p-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-bold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StopCircle, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إرسال" })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendMessage, className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => fileInputRef.current?.click(),
            className: "p-2.5 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition cursor-pointer",
            title: "إرسال صورة سرية",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "اكتب رسالة سرية مشفرة...",
            value: inputText,
            onChange: (e) => setInputText(e.target.value),
            className: "flex-1 bg-slate-800/80 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-400 px-4 py-2.5 rounded-full outline-none transition"
          }
        ),
        inputText.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: isSending,
            className: "w-10 h-10 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center transition shadow-lg shadow-cyan-950/50 cursor-pointer shrink-0 disabled:opacity-50",
            title: "إرسال",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 ml-0.5" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: startRecording,
            className: "w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 flex items-center justify-center transition cursor-pointer shrink-0",
            title: "تسجيل رسالة صوتية سرية",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    showDeleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-slate-900 border border-rose-500/40 rounded-3xl p-6 text-center shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-7 h-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-white", children: "حذف المحادثة السرية نهائياً؟" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "سيتم مسح جميع الرسائل السرية والوسائط الخاصة بهذه الجلسة نهائياً من قاعدة البيانات للطرفين دون إمكانية استرجاعها أبداً." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: isDeleting,
            onClick: handleDeletePermanently,
            className: "flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isDeleting ? "جاري الحذف..." : "نعم، حذف نهائياً" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            disabled: isDeleting,
            onClick: () => setShowDeleteConfirm(false),
            className: "flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition cursor-pointer",
            children: "إلغاء"
          }
        )
      ] })
    ] }) }),
    showCloseForReviewConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-slate-900 border border-amber-500/40 rounded-3xl p-6 text-center shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-7 h-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-white", children: "إنهاء المحادثة وتحويلها للمراجعة؟" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "عند تحويل المحادثة إلى وضع المراجعة، ستتوقف إمكانية إرسال رسائل جديدة بعد الآن. وستبقى محفوظة خلف النقاط الثلاث للمراجعة فقط بواسطة الرمز السري، مع خيار حذفها متى شئت." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleCloseForReview,
            className: "flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تأكيد الإقفال للمراجعة" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowCloseForReviewConfirm(false),
            className: "flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition cursor-pointer",
            children: "إلغاء"
          }
        )
      ] })
    ] }) }),
    selectedImageModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedImageModal(null),
          className: "absolute top-4 left-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer z-10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-full max-h-[85vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: selectedImageModal,
          alt: "Secret preview",
          className: "max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        }
      ) })
    ] })
  ] }) });
};

const SecretAuthModal = ({
  isOpen,
  onClose,
  chatId,
  userId,
  otherUser,
  otherDisplayName,
  existingSession,
  initialMode,
  onAuthenticated
}) => {
  const [activeSession, setActiveSession] = reactExports.useState(existingSession);
  const [mode, setMode] = reactExports.useState(
    initialMode ? initialMode : existingSession ? "join" : "create"
  );
  const [isVerifyingSession, setIsVerifyingSession] = reactExports.useState(false);
  const [code, setCode] = reactExports.useState("");
  const [showCode, setShowCode] = reactExports.useState(false);
  const [sendInvite, setSendInvite] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  const [isSendingCard, setIsSendingCard] = reactExports.useState(false);
  const [cardSentToast, setCardSentToast] = reactExports.useState(false);
  const handleSendInviteCardNow = async () => {
    if (isSendingCard) return;
    setIsSendingCard(true);
    try {
      await secretChatService.sendInviteCard({
        chatId,
        senderId: userId,
        receiverId: otherUser
      });
      setCardSentToast(true);
      setTimeout(() => setCardSentToast(false), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSendingCard(false);
    }
  };
  reactExports.useEffect(() => {
    setActiveSession(existingSession);
    if (initialMode) {
      setMode(initialMode);
    } else if (existingSession) {
      setMode("join");
    }
  }, [existingSession, initialMode]);
  reactExports.useEffect(() => {
    if (!isOpen || !chatId) return;
    let isMounted = true;
    setIsVerifyingSession(true);
    secretChatService.getSecretSession(chatId).then((session) => {
      if (isMounted) {
        if (session) {
          setActiveSession(session);
          if (!initialMode) {
            setMode("join");
          }
        }
        setIsVerifyingSession(false);
      }
    }).catch(() => {
      if (isMounted) setIsVerifyingSession(false);
    });
    return () => {
      isMounted = false;
    };
  }, [isOpen, chatId, initialMode]);
  if (!isOpen) return null;
  const isCreateMode = mode === "create";
  const isReviewMode = activeSession?.status === "closed_for_review";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const cleanCode = code.trim();
    if (!cleanCode) {
      setError("يرجى إدخال الرمز السري");
      return;
    }
    if (cleanCode.length < 3) {
      setError("يجب أن يتكون الرمز السري من 3 خانات على الأقل");
      return;
    }
    setIsLoading(true);
    try {
      const latestSession = await secretChatService.getSecretSession(chatId) || activeSession;
      if (mode === "join") {
        if (!latestSession) {
          const newSession = await secretChatService.createSecretSession({
            chatId,
            code: cleanCode,
            creatorId: userId,
            otherUserId: otherUser,
            otherDisplayName,
            sendInviteMessage: false
          });
          setCode("");
          onAuthenticated(newSession);
          return;
        }
        const isValid = await secretChatService.verifyCode(cleanCode, latestSession, userId);
        if (isValid) {
          setCode("");
          onAuthenticated(latestSession);
        } else {
          setError("الرمز السري غير صحيح! يرجى إدخال نفس الرمز السري المتفق عليه لفتح المحادثة.");
        }
      } else {
        const newSession = await secretChatService.createSecretSession({
          chatId,
          code: cleanCode,
          creatorId: userId,
          otherUserId: otherUser,
          otherDisplayName,
          sendInviteMessage: sendInvite
        });
        setCode("");
        onAuthenticated(newSession);
      }
    } catch (err) {
      console.error("Secret auth error:", err);
      setError("حدث خطأ أثناء التحقق، يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteSession = async () => {
    setIsLoading(true);
    try {
      await secretChatService.deleteSecretSession(chatId);
      setActiveSession(null);
      setShowDeleteConfirm(false);
      onClose();
    } catch (err) {
      console.error("Failed to delete session:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-slate-950 text-white border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        className: "absolute top-4 left-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-3xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mb-3 shadow-lg shadow-cyan-950/50", children: isCreateMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8" }) : isReviewMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-amber-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-100", children: isCreateMode ? "إنشاء محادثة سرية فائقة الخصوصية" : isReviewMode ? "مراجعة المحادثة السرية المحفوظة" : "فتح المحادثة السرية المحمية" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1.5 max-w-xs leading-relaxed", children: isCreateMode ? `حدد رمز أمان سري (PIN) مشترك تحفظه أنت و ${otherDisplayName} للتواصل في سرية تامة خلف النقاط الثلاث.` : `هذه المحادثة محفوظة داخل النقاط الثلاث ولا يمكن فتحها أو مراجعتها إلا بإدخال الرمز السري المشترك.` }),
      isReviewMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "المحادثة في وضع المراجعة فقط (لا يمكن إرسال رسائل جديدة)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      !activeSession && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs font-semibold mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setMode("join");
              setError(null);
            },
            className: `flex-1 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${mode === "join" ? "bg-cyan-500 text-slate-950 font-bold shadow-md" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "دخول برمز مشترك" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setMode("create");
              setError(null);
            },
            className: `flex-1 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${mode === "create" ? "bg-cyan-500 text-slate-950 font-bold shadow-md" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إنشاء محادثة جديدة" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-semibold text-slate-300 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3.5 h-3.5 text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isCreateMode ? "اختر رمز الأمان السري (PIN)" : "أدخل رمز الأمان الخاص بك" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: showCode ? "text" : "password",
              placeholder: isCreateMode ? "مثال: 4492 أو رمز خاص" : "أدخل الرمز السري الخاص بك...",
              value: code,
              onChange: (e) => {
                setCode(e.target.value);
                setError(null);
              },
              autoFocus: true,
              className: "w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 px-4 py-3 rounded-2xl text-sm outline-none transition pl-11"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowCode(!showCode),
              className: "absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-white transition cursor-pointer",
              title: showCode ? "إخفاء الرمز" : "إظهار الرمز",
              children: showCode ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-rose-400 bg-rose-950/40 border border-rose-800/40 p-2.5 rounded-xl animate-in fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
          ] }),
          mode === "join" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: async () => {
                await secretChatService.resetUserCode(chatId, userId);
                setError(null);
                setCode("");
              },
              className: "w-full py-1.5 px-3 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تعيين رمز سري جديد خاص بي 🔑" })
              ]
            }
          )
        ] })
      ] }),
      isCreateMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-slate-900/60 p-2.5 rounded-xl border border-slate-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: sendInvite,
            onChange: (e) => setSendInvite(e.target.checked),
            className: "w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-800 border-slate-700"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إرسال بطاقة دعوة مشفرة في المحادثة العادية ليدخل الطرف الآخر بالرمز" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: isLoading || !code.trim(),
          className: "w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl text-sm shadow-lg shadow-cyan-950/50 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2",
          children: isCreateMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isLoading ? "جاري الإنشاء..." : "بدء المحادثة السرية" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isLoading ? "جاري التحقق..." : "فتح المحادثة السرية" })
          ] })
        }
      )
    ] }),
    cardSentToast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center justify-between animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تم إرسال بطاقة المحادثة المحمية في الدردشة بنجاح!" })
    ] }) }),
    isCreateMode && activeSession && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        disabled: isSendingCard,
        onClick: handleSendInviteCardNow,
        className: "w-full py-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SendHorizontal, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إرسال بطاقة المحادثة المحمية في الدردشة" })
        ]
      }
    ) }),
    !isCreateMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "هل ترغب بحذف هذه المحادثة نهائياً؟" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowDeleteConfirm(true),
          className: "text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حذف نهائي" })
          ]
        }
      )
    ] }),
    showDeleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs bg-slate-900 border border-rose-500/40 rounded-3xl p-5 text-center shadow-2xl space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm text-white", children: "حذف المحادثة السرية نهائياً؟" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-300 leading-relaxed", children: "سيتم مسح هذه المحادثة السرية وجميع رسائلها من قاعدة البيانات تماماً." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: isLoading,
            onClick: handleDeleteSession,
            className: "flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تأكيد الحذف" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowDeleteConfirm(false),
            className: "flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition cursor-pointer",
            children: "إلغاء"
          }
        )
      ] })
    ] }) })
  ] }) });
};

let activeAudioElement = null;
let activeAudioId = null;
const globalAudioManager = {
  pauseAll: () => {
    if (activeAudioElement) {
      try {
        activeAudioElement.pause();
      } catch (e) {
      }
      activeAudioElement = null;
    }
    activeAudioId = null;
  },
  pause: (id) => {
    if (!id || id === activeAudioId) {
      if (activeAudioElement) {
        try {
          activeAudioElement.pause();
        } catch (e) {
        }
      }
    }
  },
  play: (id, audio) => {
    if (activeAudioElement && (typeof audio === "object" && audio !== activeAudioElement)) {
      try {
        activeAudioElement.pause();
      } catch (e) {
      }
    }
    if (audio instanceof HTMLAudioElement) {
      activeAudioElement = audio;
    }
    if (id) {
      activeAudioId = id;
    }
  },
  getActiveId: () => activeAudioId,
  subscribe: (_cb) => () => {
  },
  register: () => {
  }
};

function LiveWaveform({
  stream,
  isRecording,
  barCount = 16
}) {
  const canvasRef = reactExports.useRef(null);
  const animationRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isRecording || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;
    let audioCtx = null;
    let analyser = null;
    let source = null;
    let dataArray = null;
    if (stream) {
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioCtxClass();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
      } catch (e) {
        console.warn("Audio analyser init warning:", e);
      }
    }
    let phase = 0;
    const draw = () => {
      if (!isRecording) return;
      animationRef.current = requestAnimationFrame(draw);
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        const bufferLength = analyser.frequencyBinCount;
        const barWidth = Math.max(2, canvas.width / bufferLength * 2.2);
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = Math.max(3, dataArray[i] / 255 * canvas.height * 0.85);
          canvasCtx.fillStyle = "#EF4444";
          canvasCtx.beginPath();
          canvasCtx.roundRect(x, (canvas.height - barHeight) / 2, barWidth - 1, barHeight, 2);
          canvasCtx.fill();
          x += barWidth + 1;
        }
      } else {
        phase += 0.15;
        const count = barCount || 16;
        const barWidth = canvas.width / (count * 1.5);
        let x = 4;
        for (let i = 0; i < count; i++) {
          const heightFactor = Math.abs(Math.sin(phase + i * 0.45));
          const barHeight = Math.max(4, heightFactor * (canvas.height - 6));
          canvasCtx.fillStyle = "#EF4444";
          canvasCtx.beginPath();
          canvasCtx.roundRect(x, (canvas.height - barHeight) / 2, barWidth, barHeight, 2);
          canvasCtx.fill();
          x += barWidth + 3;
        }
      }
    };
    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (source) source.disconnect();
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close().catch(() => {
        });
      }
    };
  }, [stream, isRecording, barCount]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "w-24 sm:w-36 h-6 opacity-85",
      width: 140,
      height: 30
    }
  );
}

const cryptoHelper = {
  encryptText: async (t, _chatId, _participants) => ({
    isEncrypted: false,
    cipherText: t,
    iv: ""
  }),
  decryptText: async (t, _iv, _chatId, _participants) => t
};

const EncryptionInfoModal = ({ isOpen, onClose }) => isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Encryption" }) : null;

const QUICK_EMOJIS = ["❤️", "👍", "😂", "🔥", "👏", "😮", "😢"];
const VoicePlayer = reactExports.memo(function VoicePlayer2({
  id,
  src,
  duration,
  isMe
}) {
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [totalDuration, setTotalDuration] = reactExports.useState(duration || 0);
  const [playbackSpeed, setPlaybackSpeed] = reactExports.useState(1);
  const audioRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "metadata";
    audioRef.current = audio;
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0) {
        setTotalDuration(Math.round(audio.duration));
      } else if (duration && duration > 0) {
        setTotalDuration(duration);
      }
    };
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      globalAudioManager.pause(id);
    };
    const onError = (e) => {
      console.warn("Audio playback error:", e);
      setIsPlaying(false);
    };
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [id, src]);
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      globalAudioManager.pause(id);
    } else {
      audioRef.current.playbackRate = playbackSpeed;
      globalAudioManager.play(id, audioRef.current);
      audioRef.current.play().then(() => setIsPlaying(true)).catch((err) => {
        console.warn("Playback error:", err);
        setIsPlaying(false);
      });
    }
  };
  const toggleSpeed = () => {
    const speeds = [1, 1.5, 2];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };
  const handleSeek = (e) => {
    const targetTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };
  const formatSecs = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center gap-3 p-2 rounded-2xl min-w-[210px] sm:min-w-[240px] ${isMe ? "bg-black/20 text-white" : "bg-slate-800/80 text-white"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: togglePlay,
            className: "w-9 h-9 rounded-full bg-[#2AABEE] text-white flex items-center justify-center flex-shrink-0 shadow-md hover:scale-105 active:scale-95 transition cursor-pointer",
            "aria-label": isPlaying ? "إيقاف مؤقت" : "تشغيل الصوت",
            children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 ml-0.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: totalDuration || 100,
              value: currentTime,
              onChange: handleSeek,
              className: "w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-[#2AABEE]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[11px] font-mono opacity-80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatSecs(currentTime) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatSecs(totalDuration) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: toggleSpeed,
            className: "px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-700/90 hover:bg-slate-600 text-[#2AABEE] transition cursor-pointer",
            title: "تغيير سرعة الصوت",
            children: [
              playbackSpeed,
              "x"
            ]
          }
        )
      ]
    }
  );
});
const VideoPlayer = reactExports.memo(function VideoPlayer2({
  src,
  poster,
  duration,
  isMe,
  onFullscreen
}) {
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [totalDuration, setTotalDuration] = reactExports.useState(duration || 0);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const videoRef = reactExports.useRef(null);
  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  const formatSecs = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainder = Math.floor(sec % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[8px] overflow-hidden group select-none max-w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        ref: videoRef,
        src,
        poster,
        playsInline: true,
        preload: "metadata",
        onLoadedMetadata: () => {
          if (videoRef.current?.duration && !isNaN(videoRef.current.duration) && isFinite(videoRef.current.duration)) {
            setTotalDuration(Math.round(videoRef.current.duration));
          }
        },
        onTimeUpdate: () => {
          if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
        },
        onEnded: () => {
          setIsPlaying(false);
          setCurrentTime(0);
        },
        onClick: togglePlay,
        className: "w-auto max-w-full max-h-[360px] rounded-[6px] object-contain block cursor-pointer mx-auto"
      }
    ),
    !isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        onClick: togglePlay,
        className: "absolute inset-0 flex items-center justify-center bg-black/20 transition cursor-pointer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center shadow-md transition transform hover:scale-105 active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 ml-0.5 fill-white" }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-full text-[10px] text-white font-mono flex items-center gap-1 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3 h-3 text-white/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatSecs(isPlaying ? currentTime : totalDuration) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 flex items-center justify-between text-white text-xs opacity-90 group-hover:opacity-100 transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: togglePlay,
            className: "p-1 hover:bg-white/20 rounded-full transition cursor-pointer",
            title: isPlaying ? "إيقاف مؤقت" : "تشغيل",
            children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: toggleMute,
            className: "p-1 hover:bg-white/20 rounded-full transition cursor-pointer",
            title: isMuted ? "إلغاء كتم الصوت" : "كتم الصوت",
            children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4 text-rose-300" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            onFullscreen();
          },
          className: "p-1 hover:bg-white/20 rounded-full transition cursor-pointer",
          title: "تكبير الفيديو",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4" })
        }
      )
    ] }),
    totalDuration > 0 && isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 inset-x-0 h-1 bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full bg-[#2AABEE] transition-all duration-150",
        style: { width: `${currentTime / totalDuration * 100}%` }
      }
    ) })
  ] });
});
const ViewOnceViewerModal = reactExports.memo(function ViewOnceViewerModal2({
  msg,
  chatId,
  userId,
  senderName,
  senderAvatar,
  onClose
}) {
  const [isPlayingVoice, setIsPlayingVoice] = reactExports.useState(false);
  const audioRef = reactExports.useRef(null);
  const handleClose = async () => {
    if (msg.id && chatId && userId) {
      await messagingService.markViewOnceAsViewed(chatId, msg.id, userId);
    }
    onClose();
  };
  const handleDeleteNow = async () => {
    if (msg.id && chatId) {
      try {
        await messagingService.deletePermanently(chatId, msg.id);
      } catch (e) {
        console.warn("Error deleting view once message:", e);
      }
    }
    onClose();
  };
  const mediaSource = msg.mediaUrl || msg.previewUrl || "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onContextMenu: (e) => e.preventDefault(),
      className: "fixed inset-0 z-50 bg-black text-white flex flex-col justify-between select-none animate-in fade-in duration-200",
      style: { userSelect: "none", WebkitUserSelect: "none" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/10 z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleClose,
                className: "p-2 rounded-full hover:bg-white/10 text-white transition cursor-pointer",
                "aria-label": "إغلاق",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-6 h-6" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#2AABEE] flex items-center justify-center font-bold overflow-hidden border border-sky-400/30", children: senderAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: senderAvatar, alt: senderName, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: senderName.charAt(0) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: senderName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-[#2AABEE] text-white text-[10px] font-black flex items-center justify-center shadow-xs", children: "1" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-sky-400", children: "عرض لمرة واحدة • خصوصية فائقة" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleDeleteNow,
                className: "px-3 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-full text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-md",
                title: "حذف الرسالة نهائياً وفوراً",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "حذف فوري" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleClose,
                className: "px-3.5 py-1.5 bg-[#2AABEE] hover:bg-[#229ED9] text-white rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تمت المشاهدة" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden", children: [
          msg.type === "image" && mediaSource && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center max-h-full max-w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: mediaSource,
                alt: "صورة لمرة واحدة",
                className: "max-h-[72vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl border border-white/10"
              }
            ),
            msg.text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 bg-black/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-white text-sm max-w-lg text-center", children: msg.text })
          ] }),
          msg.type === "video" && mediaSource && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center max-h-full max-w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                src: mediaSource,
                autoPlay: true,
                controls: true,
                playsInline: true,
                className: "max-h-[72vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl border border-white/10",
                onEnded: handleClose
              }
            ),
            msg.text && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 bg-black/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-white text-sm max-w-lg text-center", children: msg.text })
          ] }),
          msg.type === "voice" && mediaSource && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-slate-900/95 border border-sky-500/30 p-6 rounded-3xl text-center shadow-2xl flex flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-sky-500/20 border-2 border-sky-400 text-sky-300 flex items-center justify-center text-3xl shadow-lg animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-10 h-10" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-white mb-1", children: "رسالة صوتية لمرة واحدة" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60", children: "استمع الآن، سيتم حذفها فور الانتهاء" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "audio",
              {
                ref: audioRef,
                src: mediaSource,
                autoPlay: true,
                controls: true,
                onEnded: handleClose,
                className: "w-full mt-2"
              }
            )
          ] }),
          msg.type === "text" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-slate-900/95 border border-sky-500/30 p-6 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-sky-500/20 border border-sky-400 text-sky-300 flex items-center justify-center text-2xl font-black shadow-lg", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm text-sky-300", children: "رسالة نصية لمرة واحدة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base text-white/95 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/10 w-full text-right whitespace-pre-wrap", children: msg.text })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-black/80 backdrop-blur-md text-center text-xs text-white/60 border-t border-white/10", children: '🔒 رسالة مؤمنة للعرض لمرة واحدة تماماً مثل واتساب • عند الخروج ستتحول إلى "تم الفتح"' })
      ]
    }
  );
});
const renderMessageTextWithLinks = (text, isMe, onOpenSecretAuth) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+|#[^\s]+)/g;
  const parts = text.split(urlRegex);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: parts.map((part, index) => {
    if (part && part.match(urlRegex)) {
      const isSecretLink = part.includes("action=secret_join") || part.includes("join_secret");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex flex-wrap items-center gap-1 mx-0.5 align-baseline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: part.startsWith("#") ? part : part,
            onClick: (e) => {
              if (isSecretLink) {
                e.preventDefault();
                e.stopPropagation();
                if (onOpenSecretAuth) onOpenSecretAuth();
              }
            },
            target: part.startsWith("#") ? "_self" : "_blank",
            rel: "noopener noreferrer",
            className: `underline font-semibold dir-ltr text-xs sm:text-sm ${isMe ? "text-cyan-100 hover:text-white" : "text-blue-600 hover:text-blue-800"}`,
            children: part
          }
        ),
        isSecretLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onOpenSecretAuth) onOpenSecretAuth();
            },
            className: "inline-flex items-center gap-1 px-2 py-0.5 my-0.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] rounded-lg shadow-xs cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3 h-3 text-slate-950" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "دخول المحادثة 🔓" })
            ]
          }
        )
      ] }, index);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, index);
  }) });
};
const MessageItem = reactExports.memo(function MessageItem2({
  msg,
  userId,
  uploadProgress,
  onImageClick,
  onVideoClick,
  onRetry,
  onReply,
  onEdit,
  onDeleteClick,
  onOpenActionMenu,
  onToggleReaction,
  onPinMessage,
  onOpenViewOnce,
  onOpenSecretAuth
}) {
  const isMe = msg.sender === userId;
  const isSecretInviteMsg = Boolean(
    msg.type === "secret_invite" || msg.type === "secret" || msg.isSecretInvite === true || msg.isSecret === true || Boolean(msg.inviteUrl) || typeof msg.text === "string" && (msg.text.includes("محادثة سرية") || msg.text.includes("محادثة محمية") || msg.text.includes("دعوة لمحادثة") || msg.text.includes("بالرمز السري") || msg.text.includes("الرمز السري") || msg.text.includes("رمز أمان") || msg.text.includes("🔒") || msg.text.includes("secret_join") || msg.text.includes("action=secret") || msg.text.includes("join_secret"))
  );
  const [imageLoaded, setImageLoaded] = reactExports.useState(false);
  const [showReactionsPopover, setShowReactionsPopover] = reactExports.useState(false);
  const [localBlobUrl, setLocalBlobUrl] = reactExports.useState(null);
  const touchTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let isMounted = true;
    if (msg.type === "video" && !msg.mediaUrl && msg.id) {
      getLocalVideoBlobUrl(msg.id).then((url) => {
        if (isMounted && url) {
          setLocalBlobUrl(url);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [msg.id, msg.type, msg.mediaUrl]);
  if (msg.isDeleted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${isMe ? "justify-start" : "justify-end"} mb-3`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `max-w-[85%] sm:max-w-[70%] p-2.5 shadow-xs border flex items-center gap-2 ${isMe ? "bg-slate-50 border-slate-200 text-slate-500 rounded-2xl rounded-tr-xs" : "bg-white border-slate-200 text-slate-500 rounded-2xl rounded-tl-xs"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 opacity-50 shrink-0 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs italic text-slate-500", children: "تم حذف هذه الرسالة" })
        ]
      }
    ) });
  }
  const handleTouchStart = () => {
    if (isSecretInviteMsg) return;
    touchTimerRef.current = setTimeout(() => {
      onOpenActionMenu(msg);
    }, 380);
  };
  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
  };
  const reactionsEntries = msg.reactions ? Object.entries(msg.reactions) : [];
  const effectiveProgress = uploadProgress !== void 0 ? uploadProgress : msg.uploadProgress;
  const isUploading = msg.status === "uploading" || msg.status === "sending";
  const isFailed = msg.status === "failed" || msg.status === "upload_failed";
  const isMedia = (msg.type === "image" || msg.type === "video") && !msg.isViewOnce;
  const hasCaption = Boolean(msg.text && msg.text.trim());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex ${isMe ? "justify-start" : "justify-end"} mb-3 group relative items-center`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `hidden sm:flex absolute top-1/2 -translate-y-1/2 ${isMe ? "left-full ml-1.5" : "right-full mr-1.5"} opacity-0 group-hover:opacity-100 transition-all duration-150 items-center gap-0.5 z-10 bg-white/95 backdrop-blur-xs p-1 rounded-full border border-slate-200 shadow-md`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                onDeleteClick(msg);
              },
              className: "p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition cursor-pointer",
              title: "حذف الرسالة",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                setShowReactionsPopover(!showReactionsPopover);
              },
              className: "p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-full transition cursor-pointer",
              title: "تفاعل",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                onReply(msg);
              },
              className: "p-1.5 text-slate-400 hover:text-[#2AABEE] hover:bg-blue-50 rounded-full transition cursor-pointer",
              title: "رد",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 rotate-180" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                onOpenActionMenu(msg);
              },
              className: "p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer",
              title: "المزيد من الخيارات",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(MoreVertical, { className: "w-3.5 h-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => {
          if (isSecretInviteMsg) {
            onOpenSecretAuth?.();
            return;
          }
          if (msg.isViewOnce && !(msg.viewedBy && msg.viewedBy.includes(userId) || isMe && msg.viewedBy && msg.viewedBy.length > 0)) {
            if (!isMe) {
              onOpenViewOnce(msg);
              return;
            }
          }
          onOpenActionMenu(msg);
        },
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onContextMenu: (e) => {
          if (isSecretInviteMsg) {
            e.preventDefault();
            onOpenSecretAuth?.();
            return;
          }
          e.preventDefault();
          onOpenActionMenu(msg);
        },
        className: `max-w-[88%] sm:max-w-[70%] rounded-2xl relative transition-all duration-150 cursor-pointer shadow-xs ${isSecretInviteMsg ? "p-1.5 bg-slate-950 border-2 border-cyan-400 text-white rounded-2xl shadow-xl" : isMedia ? hasCaption ? "p-[3px] pb-1" : "p-[3px]" : "px-3 py-1.5 select-text"} ${isSecretInviteMsg ? "" : isMe ? "bg-[#2AABEE] text-white rounded-tr-xs" : "bg-white text-slate-900 rounded-tl-xs border border-slate-200/80 shadow-xs"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `hidden sm:block absolute top-1 ltr:right-1 rtl:left-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity ${isMedia && !hasCaption ? "bg-black/40 backdrop-blur-xs rounded-full p-0.5" : ""}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    onOpenActionMenu(msg);
                  },
                  className: `p-0.5 rounded-full transition cursor-pointer ${isMedia && !hasCaption ? "text-white/90 hover:bg-black/30" : isMe ? "text-white/80 hover:text-white hover:bg-white/20" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"}`,
                  title: "خيارات الرسالة",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" })
                }
              )
            }
          ),
          showReactionsPopover && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "fixed inset-0 z-30",
                onClick: (e) => {
                  e.stopPropagation();
                  setShowReactionsPopover(false);
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 ltr:left-0 rtl:right-0 bg-white border border-slate-100 shadow-xl rounded-full p-1.5 z-40 flex items-center gap-1.5 animate-in zoom-in-90 duration-100", children: QUICK_EMOJIS.map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  setShowReactionsPopover(false);
                  if (msg.id) onToggleReaction(msg.id, emoji);
                },
                className: "w-7 h-7 flex items-center justify-center hover:scale-125 transition cursor-pointer text-base",
                children: emoji
              },
              emoji
            )) })
          ] }),
          msg.replyTo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `mb-1 p-1.5 border-r-3 rounded-lg text-[11px] select-none ${isMe ? "bg-white/20 border-white text-white" : "bg-slate-100 border-[#2AABEE] text-slate-800"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-bold mb-0.5 text-[10px] truncate max-w-[200px] ${isMe ? "text-white" : "text-[#2AABEE]"}`, children: msg.replyTo.sender === userId ? "أنت" : "مستخدم" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `truncate max-w-[220px] ${isMe ? "text-blue-100" : "text-slate-600"}`, children: msg.replyTo.text || "وسائط" })
              ]
            }
          ),
          isSecretInviteMsg ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: (e) => {
                e.stopPropagation();
                if (onOpenSecretAuth) onOpenSecretAuth();
              },
              className: "p-3.5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-cyan-400 rounded-2xl text-white shadow-xl max-w-[320px] select-none text-right cursor-pointer group space-y-3 hover:border-cyan-300 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md shrink-0 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-cyan-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-black text-white flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: "محادثة محمية برمز أمان خاص" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10.5px] text-cyan-300 font-bold flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔒 مقفلة برمز سري" }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-slate-200 font-medium", children: isMe ? "أنشأت محادثة محمية برمز أمان خاص. اضغط هنا في أي وقت للدخول بالرمز السري." : "أرسل إليك الطرف الآخر محادثة محمية برمز أمان خاص. اضغط هنا للدخول فوراً بعد إدخال الرمز السري." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      if (onOpenSecretAuth) onOpenSecretAuth();
                    },
                    className: "w-full py-2.5 bg-gradient-to-r from-cyan-400 via-[#2AABEE] to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg transform active:scale-95 cursor-pointer ring-2 ring-cyan-300/40",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 text-slate-950" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اضغط هنا للدخول بالرمز السري 🔓" })
                    ]
                  }
                )
              ]
            }
          ) : msg.isViewOnce ? (() => {
            const isViewOnceOpened = Boolean(
              msg.viewedBy && msg.viewedBy.length > 0 && msg.viewedBy.includes(userId) || isMe && msg.viewedBy && msg.viewedBy.length > 0
            );
            if (isViewOnceOpened) {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 py-1 px-1 select-none ${isMe ? "text-blue-200" : "text-slate-400"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full border border-solid flex items-center justify-center font-bold text-xs shrink-0 ${isMe ? "border-blue-200 text-blue-200" : "border-slate-400 text-slate-400"}`, children: "1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px]", children: "تم الفتح" })
              ] });
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: (e) => {
                  if (!isMe) {
                    e.stopPropagation();
                    onOpenViewOnce(msg);
                  }
                },
                className: `flex items-center gap-2 py-1 px-1 select-none ${isMe ? "text-white" : "text-slate-800 cursor-pointer"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full border border-dashed flex items-center justify-center font-bold text-xs shrink-0 ${isMe ? "border-white text-white" : "border-[#2AABEE] text-[#2AABEE]"}`, children: "1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[13px]", children: msg.type === "video" ? "مقطع فيديو" : "صورة" })
                ]
              }
            );
          })() : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            msg.type === "image" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[6px] overflow-hidden select-none", children: [
              msg.previewUrl && !imageLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: msg.previewUrl,
                  alt: "معاينة",
                  referrerPolicy: "no-referrer",
                  className: "absolute inset-0 w-full h-full object-cover filter blur-xs"
                }
              ),
              msg.mediaUrl || msg.previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: msg.mediaUrl || msg.previewUrl,
                  alt: msg.mediaName || "صورة",
                  referrerPolicy: "no-referrer",
                  loading: "lazy",
                  onLoad: () => setImageLoaded(true),
                  className: "w-auto max-w-full max-h-[380px] object-contain rounded-[6px] block cursor-pointer hover:opacity-98 transition mx-auto",
                  onClick: (e) => {
                    e.stopPropagation();
                    onImageClick(msg.mediaUrl || msg.previewUrl || "");
                  }
                }
              ) : isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-2 text-slate-700 text-xs p-6 min-h-[160px] min-w-[200px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-6 h-6 animate-spin text-[#2AABEE]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: effectiveProgress !== void 0 && effectiveProgress > 0 ? `جاري الرفع... ${effectiveProgress}%` : "جاري التحضير..." })
              ] }) : isFailed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-2 text-rose-600 text-xs p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-6 h-6 text-rose-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فشل رفع الصورة" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onRetry(msg);
                    },
                    className: "px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg flex items-center gap-1.5 font-bold transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إعادة المحاولة" })
                    ]
                  }
                )
              ] }) : null,
              !hasCaption && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1.5 ltr:right-2 rtl:left-2 flex items-center gap-1 text-[11px] text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] pointer-events-none", title: formatFullDateTime(msg.timestamp), children: [
                msg.isEncrypted && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatMessageTime(msg.timestamp) }),
                isMe && /* @__PURE__ */ jsxRuntimeExports.jsx(MessageStatusIcon, { status: msg.status || "sent" })
              ] })
            ] }),
            msg.type === "video" && (() => {
              const videoSrc = msg.mediaUrl || localBlobUrl || (isMe ? msg.previewUrl : null);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[6px] overflow-hidden select-none", children: [
                videoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  VideoPlayer,
                  {
                    src: videoSrc,
                    poster: msg.thumbnailUrl || msg.previewUrl,
                    duration: msg.videoDuration,
                    isMe,
                    onFullscreen: () => onVideoClick(videoSrc)
                  }
                ) : isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-2 text-slate-700 text-xs p-6 min-h-[160px] min-w-[200px] w-full", children: [
                  msg.thumbnailUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: msg.thumbnailUrl,
                      alt: "معاينة الفيديو",
                      referrerPolicy: "no-referrer",
                      className: "w-full h-32 object-cover rounded-lg opacity-40 blur-xs mb-1"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin text-[#2AABEE]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px]", children: effectiveProgress !== void 0 && effectiveProgress > 0 ? `جاري رفع الفيديو... ${effectiveProgress}%` : "جاري التحضير والرفع..." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "bg-[#2AABEE] h-full transition-all duration-300",
                      style: { width: `${effectiveProgress || 15}%` }
                    }
                  ) })
                ] }) : isFailed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-2 text-rose-600 text-xs p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-6 h-6 text-rose-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فشل رفع الفيديو" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.stopPropagation();
                        onRetry(msg);
                      },
                      className: "px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg flex items-center gap-1.5 font-bold transition",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إعادة المحاولة" })
                      ]
                    }
                  )
                ] }) : null,
                !hasCaption && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1.5 ltr:right-2 rtl:left-2 flex items-center gap-1 text-[11px] text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] pointer-events-none", title: formatFullDateTime(msg.timestamp), children: [
                  msg.isEncrypted && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatMessageTime(msg.timestamp) }),
                  isMe && /* @__PURE__ */ jsxRuntimeExports.jsx(MessageStatusIcon, { status: msg.status || "sent" })
                ] })
              ] });
            })(),
            msg.type === "voice" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-1", children: msg.mediaUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              VoicePlayer,
              {
                id: msg.id || `voice_${msg.timestamp}`,
                src: msg.mediaUrl,
                duration: msg.audioDuration,
                isMe
              }
            ) : isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-2 py-1 min-w-[180px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-black/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin text-[#2AABEE]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium text-slate-700 mb-1", children: "جاري رفع الرسالة الصوتية..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-200 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "bg-[#2AABEE] h-full transition-all duration-300",
                    style: { width: `${effectiveProgress || 10}%` }
                  }
                ) })
              ] })
            ] }) : isFailed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 text-xs px-2 py-1 bg-rose-100 rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-rose-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4 text-rose-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فشل الرفع" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => onRetry(msg),
                  className: "px-2 py-1 bg-rose-200 hover:bg-rose-300 text-rose-800 text-[10px] font-bold rounded-md flex items-center gap-1 transition",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إعادة" })
                  ]
                }
              )
            ] }) : null }),
            msg.text && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `break-words text-[14.2px] leading-relaxed whitespace-pre-wrap ${isMe ? "text-white" : "text-slate-900"} ${isMedia ? "px-1 pt-1.5 pb-0.5" : "px-0.5"}`,
                children: renderMessageTextWithLinks(msg.text, isMe, onOpenSecretAuth)
              }
            )
          ] }),
          reactionsEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex flex-wrap gap-1 mt-1 pt-1 border-t ${isMe ? "border-white/20" : "border-slate-100"}`, children: reactionsEntries.map(([rxUser, emoji]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              onClick: () => msg.id && onToggleReaction(msg.id, String(emoji)),
              className: `text-xs px-1.5 py-0.5 rounded-full border flex items-center gap-1 cursor-pointer transition ${isMe ? "bg-white/20 border-white/40 text-white font-bold" : String(rxUser) === String(userId) ? "bg-blue-50 border-blue-200 text-[#2AABEE] font-bold" : "bg-white border-slate-200 text-slate-700"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(emoji) })
            },
            rxUser
          )) }),
          (!isMedia || hasCaption) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-[11px] mt-0.5 flex items-center justify-end gap-1 px-0.5 ${isMe ? "text-blue-100" : "text-slate-400"}`, children: [
            msg.isEncrypted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "مشفرة تماماً من طرف إلى طرف (E2EE)", className: "inline-flex items-center opacity-85", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5 ml-0.5 text-current" }) }),
            msg.isEdited && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic ml-1", children: "(معدلة)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: formatFullDateTime(msg.timestamp), children: formatMessageTime(msg.timestamp) }),
            isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center ml-0.5", children: isFailed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onRetry(msg),
                className: "flex items-center gap-1 text-rose-300 bg-rose-950/50 px-1.5 py-0.5 rounded hover:bg-rose-900 transition cursor-pointer",
                title: "إعادة المحاولة",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-3 h-3 text-rose-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold", children: "إعادة" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageStatusIcon, { status: msg.status || "sent" }) })
          ] })
        ]
      }
    )
  ] });
});
function ChatRoom({ userId, onStartCall, onOpenCallModal }) {
  const { chatId: rawChatId } = useParams();
  const chatId = rawChatId ? decodeURIComponent(rawChatId).replace(/ /g, "+") : "";
  const navigate = useNavigate();
  const [messages, setMessages] = reactExports.useState([]);
  const [outboxMessages, setOutboxMessages] = reactExports.useState([]);
  const [newMessage, setNewMessage] = reactExports.useState("");
  const [editingMessage, setEditingMessage] = reactExports.useState(null);
  const [replyingTo, setReplyingTo] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!chatId) return;
    const loadOutbox = async () => {
      const items = await outboxStorage.getOutboxMessages(chatId);
      setOutboxMessages(items);
    };
    loadOutbox();
    const unsubscribe = outboxStorage.subscribe(() => {
      loadOutbox();
    });
    return () => unsubscribe();
  }, [chatId]);
  const displayedMessages = reactExports.useMemo(() => {
    const existingIds = new Set(messages.map((m) => m.id || m.clientMessageId));
    const pendingAsMessages = outboxMessages.filter((o) => !existingIds.has(o.messageId) && !existingIds.has(o.clientMessageId)).map((o) => ({
      id: o.messageId,
      clientMessageId: o.clientMessageId,
      chatId: o.chatId,
      sender: o.senderId,
      receiverId: o.receiverId,
      text: o.text,
      timestamp: o.createdAt,
      createdAt: o.createdAt,
      type: o.type,
      status: o.status === "failed" ? "failed" : "pending",
      isViewOnce: o.isViewOnce,
      replyTo: o.replyTo ? { id: o.replyTo.id, sender: o.replyTo.sender, text: o.replyTo.text } : void 0
    }));
    const combined = [...messages, ...pendingAsMessages];
    combined.sort((a, b) => (a.timestamp || a.createdAt || 0) - (b.timestamp || b.createdAt || 0));
    return combined;
  }, [messages, outboxMessages]);
  const [selectedMessageForAction, setSelectedMessageForAction] = reactExports.useState(null);
  const [deleteModalMessage, setDeleteModalMessage] = reactExports.useState(null);
  const [showCopiedToast, setShowCopiedToast] = reactExports.useState(false);
  const [uploadProgressMap, setUploadProgressMap] = reactExports.useState({});
  const [isGroup, setIsGroup] = reactExports.useState(false);
  const [isSavedMessages, setIsSavedMessages] = reactExports.useState(false);
  const [otherUser, setOtherUser] = reactExports.useState("");
  const [otherDisplayName, setOtherDisplayName] = reactExports.useState("");
  const [otherUserData, setOtherUserData] = reactExports.useState(null);
  const [showContactProfileModal, setShowContactProfileModal] = reactExports.useState(false);
  const [showEncryptionInfoModal, setShowEncryptionInfoModal] = reactExports.useState(false);
  const [pinnedMessage, setPinnedMessage] = reactExports.useState(null);
  const [secretSession, setSecretSession] = reactExports.useState(null);
  const [showSecretAuthModal, setShowSecretAuthModal] = reactExports.useState(false);
  const [secretAuthModalMode, setSecretAuthModalMode] = reactExports.useState("join");
  const [showSecretChatModal, setShowSecretChatModal] = reactExports.useState(false);
  const [authenticatedSecretSession, setAuthenticatedSecretSession] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!chatId) return;
    const unsub = secretChatService.listenToSecretSession(chatId, (s) => {
      setSecretSession(s);
    });
    return () => unsub();
  }, [chatId]);
  const location = useLocation();
  reactExports.useEffect(() => {
    const search = location.search || window.location.search || (window.location.hash.includes("?") ? window.location.hash.slice(window.location.hash.indexOf("?")) : "");
    if (search) {
      const urlParams = new URLSearchParams(search);
      if (urlParams.get("action") === "secret_join" || urlParams.has("join_secret")) {
        handleOpenSecretVault("join");
      }
    }
  }, [location.search, location.hash, chatId]);
  const handleOpenSecretVault = async (forcedMode) => {
    try {
      const session = await secretChatService.getSecretSession(chatId);
      setSecretSession(session);
      setSecretAuthModalMode(forcedMode || (session ? "join" : "create"));
      setShowSecretAuthModal(true);
    } catch (err) {
      console.error("Error fetching secret session:", err);
      setSecretAuthModalMode(forcedMode || "join");
      setShowSecretAuthModal(true);
    }
  };
  const handleSecretAuthenticated = (session) => {
    setAuthenticatedSecretSession(session);
    setShowSecretAuthModal(false);
    setShowSecretChatModal(true);
  };
  const handleDownloadProfilePicture = async (photoUrl, name, e) => {
    if (e) e.stopPropagation();
    try {
      const res = await fetch(photoUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `profile_${name || "user"}_${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2e3);
    } catch (err) {
      const a = document.createElement("a");
      a.href = photoUrl;
      a.target = "_blank";
      a.download = `profile_${name || "user"}_${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  const messagesEndRef = reactExports.useRef(null);
  const chatContainerRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const [showAttachMenu, setShowAttachMenu] = reactExports.useState(false);
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [selectedImageModal, setSelectedImageModal] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const [videoPreview, setVideoPreview] = reactExports.useState(null);
  const [selectedVideoModal, setSelectedVideoModal] = reactExports.useState(null);
  const videoInputRef = reactExports.useRef(null);
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const [recordingTime, setRecordingTime] = reactExports.useState(0);
  const recordingTimeRef = reactExports.useRef(0);
  const [audioBlob, setAudioBlob] = reactExports.useState(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = reactExports.useState(null);
  const [recordingNotice, setRecordingNotice] = reactExports.useState(null);
  const mediaRecorderRef = reactExports.useRef(null);
  const recordingStreamRef = reactExports.useRef(null);
  const shouldSendOnStopRef = reactExports.useRef(false);
  const recordedMimeTypeRef = reactExports.useRef("audio/webm");
  const audioChunksRef = reactExports.useRef([]);
  const recordingTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const unsub = chatUploadManager.subscribe((task) => {
      if (task.chatId === chatId) {
        setUploadProgressMap((prev) => ({
          ...prev,
          [task.messageId]: task.progress,
          [task.clientMessageId]: task.progress
        }));
      }
    });
    return () => unsub();
  }, [chatId]);
  reactExports.useEffect(() => {
    if (!chatId || !userId) return;
    const getChatDetails = async () => {
      if (chatId === `saved_${userId}`) {
        setIsSavedMessages(true);
        setOtherDisplayName("الرسائل المحفوظة");
        return;
      }
      try {
        const chatDoc = await getDoc(doc(db, "chats", chatId));
        if (chatDoc.exists()) {
          const data = chatDoc.data();
          if (data.isSavedMessages) {
            setIsSavedMessages(true);
            setOtherDisplayName("الرسائل المحفوظة");
          } else if (data.isGroup || data.participants.length > 2) {
            setIsGroup(true);
            setOtherDisplayName(data.groupName || `مجموعة (${data.participants.length} أعضاء)`);
          } else {
            const other = data.participants.find((p) => p !== userId);
            if (other) {
              setOtherUser(other);
              if (other === IMI_BOT_ID || chatId.startsWith("bot_")) {
                setOtherDisplayName("مساعد IMI الذكي");
              } else {
                const uDoc = await getDoc(doc(db, "users", other));
                if (uDoc.exists()) {
                  setOtherDisplayName(uDoc.data().displayName || other);
                }
              }
            }
          }
          if (data.pinnedMessageId && data.pinnedMessageText) {
            setPinnedMessage({ id: data.pinnedMessageId, text: data.pinnedMessageText });
          }
        }
      } catch (err) {
        console.warn("Error fetching chat info:", err);
      }
    };
    getChatDetails();
  }, [chatId, userId]);
  reactExports.useEffect(() => {
    if (!otherUser || otherUser === IMI_BOT_ID) return;
    const unsub = onSnapshot(
      doc(db, "users", otherUser),
      (snap) => {
        if (snap.exists()) {
          setOtherUserData(snap.data());
        }
      },
      (error) => {
        console.warn("Presence listener notice:", error);
      }
    );
    return () => unsub();
  }, [otherUser]);
  reactExports.useEffect(() => {
    if (!chatId || !userId) return;
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc"),
      limitToLast(120)
    );
    let isFirstMessagesLoad = true;
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }));
        const filteredMsgs = msgs.filter((m) => !m.deletedFor?.includes(userId));
        if (!isFirstMessagesLoad) {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const newMsg = change.doc.data();
              if (newMsg.sender !== userId && (!newMsg.timestamp || Date.now() - newMsg.timestamp < 15e3)) {
                notificationService.playMessageTone();
              }
            }
          });
        }
        isFirstMessagesLoad = false;
        const decryptAll = async () => {
          try {
            const decryptedList = await Promise.all(
              filteredMsgs.map(async (m) => {
                if ((m.text === "[رسالة مشفرة 🔒]" || !m.text) && m.cipherText && m.cipherText !== "[رسالة مشفرة 🔒]") {
                  return { ...m, text: m.cipherText };
                }
                if (m.isEncrypted && m.cipherText && m.cipherText !== "[رسالة مشفرة 🔒]") {
                  if (m.iv) {
                    try {
                      const participants = [m.sender, m.receiverId || otherUser || userId].filter(Boolean);
                      const plain = await cryptoHelper.decryptText(m.cipherText, m.iv, chatId, participants);
                      if (plain && plain !== "[رسالة مشفرة 🔒]") {
                        return { ...m, text: plain };
                      }
                    } catch {
                    }
                  }
                  return { ...m, text: m.cipherText };
                }
                return m;
              })
            );
            setMessages(decryptedList);
            messagingService.markMessagesRead(chatId, decryptedList, userId);
          } catch {
            setMessages(filteredMsgs);
            messagingService.markMessagesRead(chatId, filteredMsgs, userId);
          }
        };
        decryptAll();
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, `chats/${chatId}/messages`);
      }
    );
    return () => unsubscribe();
  }, [chatId, userId]);
  reactExports.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessages.length]);
  const handleDeleteForEveryone = async (msg) => {
    if (!chatId || !msg.id) return;
    try {
      await messagingService.deleteMessageForEveryone(chatId, msg, userId);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2e3);
    } catch (err) {
      console.warn("Failed to delete message for everyone:", err);
      setRecordingNotice(err.message || "فشل حذف الرسالة لدى الجميع");
      setTimeout(() => setRecordingNotice(null), 3500);
    } finally {
      setDeleteModalMessage(null);
      setSelectedMessageForAction(null);
    }
  };
  const handleDeleteForMe = async (msg) => {
    if (!chatId || !msg.id) return;
    try {
      await messagingService.deleteMessageForMe(chatId, msg.id, userId);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    } catch (err) {
      console.error("Failed to delete message for me:", err);
    } finally {
      setDeleteModalMessage(null);
      setSelectedMessageForAction(null);
    }
  };
  const handleDeletePermanently = async (msg) => {
    if (!chatId || !msg.id) return;
    try {
      await messagingService.deletePermanently(chatId, msg.id);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
    } catch (err) {
      console.error("Failed to permanently delete message:", err);
    } finally {
      setDeleteModalMessage(null);
      setSelectedMessageForAction(null);
    }
  };
  const handleCopyMessageText = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setShowCopiedToast(true);
    setSelectedMessageForAction(null);
    setTimeout(() => setShowCopiedToast(false), 2e3);
  };
  const handleRetryMessage = async (msg) => {
    if (!chatId || !msg.id) return;
    await messagingService.retryMessage(chatId, msg);
  };
  const handleToggleReaction = async (msgId, emoji) => {
    if (!chatId || !msgId) return;
    const targetMsg = messages.find((m) => m.id === msgId);
    await messagingService.toggleReaction(chatId, msgId, targetMsg?.reactions, emoji, userId);
  };
  const handlePinMessage = async (msg) => {
    if (!chatId || !msg.id) return;
    await messagingService.pinMessage(chatId, msg, userId);
    setPinnedMessage({
      id: msg.id,
      text: msg.text || (msg.type === "image" ? "صورة" : "رسالة صوتية")
    });
  };
  const [isViewOnceActive, setIsViewOnceActive] = reactExports.useState(false);
  const [activeViewOnceMsg, setActiveViewOnceMsg] = reactExports.useState(null);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (videoPreview) {
      handleSendVideo();
      return;
    }
    if (imagePreview) {
      handleSendImage();
      return;
    }
    if (!newMessage.trim() || !chatId) return;
    const text = newMessage.trim();
    const replyData = replyingTo ? { id: replyingTo.id || "", text: replyingTo.text || "", sender: replyingTo.sender } : null;
    const sendWithViewOnce = isViewOnceActive;
    setNewMessage("");
    setReplyingTo(null);
    setIsViewOnceActive(false);
    if (editingMessage && editingMessage.id) {
      editingMessage.id;
      const target = editingMessage;
      setEditingMessage(null);
      try {
        await messagingService.editMessage(chatId, target, text, userId);
      } catch (err) {
        console.warn("Failed to edit message:", err);
        setRecordingNotice(err.message || "فشل تعديل الرسالة");
        setTimeout(() => setRecordingNotice(null), 3500);
      }
      return;
    }
    try {
      notificationService.playSentTone();
      await messagingService.sendTextMessage({
        chatId,
        senderId: userId,
        receiverId: otherUser,
        otherDisplayName,
        text,
        replyTo: replyData,
        isViewOnce: sendWithViewOnce
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    const instantUrl = URL.createObjectURL(file);
    setImagePreview({
      file,
      url: instantUrl,
      compressedBlob: file
    });
    compressImage(file, 960, 0.75).then((compressed) => {
      setImagePreview((prev) => {
        if (!prev || prev.file !== file) return prev;
        return {
          ...prev,
          compressedBlob: compressed.file,
          previewUrl: compressed.previewUrl,
          dataUrl: compressed.dataUrl
        };
      });
    }).catch((err) => {
      console.warn("Image compression fallback:", err);
    });
  };
  const handleSendImage = async () => {
    if (!imagePreview || !chatId) return;
    const caption = newMessage.trim();
    const sendWithViewOnce = isViewOnceActive;
    setNewMessage("");
    setIsViewOnceActive(false);
    const blobToUpload = imagePreview.compressedBlob || imagePreview.file;
    const previewUrl = imagePreview.url;
    const dataUrl = imagePreview.dataUrl;
    setImagePreview(null);
    const tempId = `temp_img_${Date.now()}`;
    const optimisticMsg = {
      id: tempId,
      chatId,
      sender: userId,
      receiverId: otherUser || "group",
      type: "image",
      text: caption || void 0,
      mediaUrl: previewUrl,
      previewUrl,
      status: "sending",
      timestamp: Date.now(),
      createdAt: Date.now(),
      isViewOnce: sendWithViewOnce,
      viewedBy: []
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    try {
      notificationService.playSentTone();
      await messagingService.sendMediaMessage({
        chatId,
        senderId: userId,
        receiverId: otherUser,
        type: "image",
        file: blobToUpload,
        caption,
        previewUrl,
        dataUrl,
        isViewOnce: sendWithViewOnce
      });
    } catch (err) {
      console.error("Failed to dispatch image message:", err);
    }
  };
  const handleVideoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    const url = URL.createObjectURL(file);
    setVideoPreview({
      file,
      url,
      thumbnailUrl: void 0,
      duration: void 0
    });
    try {
      const metadata = await extractVideoMetadata(file);
      setVideoPreview(
        (prev) => prev && prev.file === file ? {
          ...prev,
          thumbnailUrl: metadata.thumbnailDataUrl || prev.thumbnailUrl,
          duration: metadata.duration || prev.duration
        } : prev
      );
    } catch (err) {
      console.warn("Video metadata extraction fallback:", err);
    }
  };
  const handleSendVideo = async () => {
    if (!videoPreview || !chatId) return;
    const caption = newMessage.trim();
    const sendWithViewOnce = isViewOnceActive;
    setNewMessage("");
    setIsViewOnceActive(false);
    const targetPreview = videoPreview;
    setVideoPreview(null);
    const tempId = `temp_vid_${Date.now()}`;
    const optimisticMsg = {
      id: tempId,
      chatId,
      sender: userId,
      receiverId: otherUser || "group",
      type: "video",
      text: caption || void 0,
      mediaUrl: targetPreview.url,
      previewUrl: targetPreview.url,
      thumbnailUrl: targetPreview.thumbnailUrl,
      videoDuration: targetPreview.duration,
      status: "sending",
      timestamp: Date.now(),
      createdAt: Date.now(),
      isViewOnce: sendWithViewOnce,
      viewedBy: []
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    try {
      notificationService.playSentTone();
      await messagingService.sendMediaMessage({
        chatId,
        senderId: userId,
        receiverId: otherUser,
        type: "video",
        file: targetPreview.file,
        videoDuration: targetPreview.duration,
        caption,
        thumbnailUrl: targetPreview.thumbnailUrl,
        previewUrl: targetPreview.thumbnailUrl,
        isViewOnce: sendWithViewOnce
      });
    } catch (err) {
      console.error("Failed to dispatch video message:", err);
    }
  };
  const getSupportedAudioMimeType2 = () => {
    if (typeof window === "undefined" || typeof MediaRecorder === "undefined") return "";
    const candidateTypes = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4;codecs=mp4a.40.2",
      "audio/mp4",
      "audio/aac",
      "audio/ogg;codecs=opus",
      "audio/ogg"
    ];
    for (const t of candidateTypes) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return "";
  };
  const startRecording = async () => {
    setRecordingNotice(null);
    try {
      const { stream, isFallback } = await getAudioMediaStream();
      if (isFallback) {
        setRecordingNotice("تم تفعيل وضع التسجيل الآمن");
      }
      recordingStreamRef.current = stream;
      audioChunksRef.current = [];
      const detectedMime = getSupportedAudioMimeType2();
      recordedMimeTypeRef.current = detectedMime || "";
      const options = detectedMime ? { mimeType: detectedMime } : {};
      let mediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream, options);
      } catch {
        mediaRecorder = new MediaRecorder(stream);
      }
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.onstop = async () => {
        const finalMime = mediaRecorder.mimeType || recordedMimeTypeRef.current || "audio/webm";
        const blob = new Blob(audioChunksRef.current, { type: finalMime });
        if (recordingStreamRef.current) {
          try {
            recordingStreamRef.current.getTracks().forEach((track) => track.stop());
          } catch (e) {
          }
          recordingStreamRef.current = null;
        }
        if (shouldSendOnStopRef.current) {
          shouldSendOnStopRef.current = false;
          const duration = Math.max(1, recordingTimeRef.current || 1);
          await sendAudioBlob(blob, duration);
        } else {
          setAudioBlob(blob);
          setAudioPreviewUrl(URL.createObjectURL(blob));
        }
      };
      try {
        mediaRecorder.start(250);
      } catch {
        mediaRecorder.start();
      }
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimeRef.current = 0;
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const next = prev + 1;
          recordingTimeRef.current = next;
          return next;
        });
      }, 1e3);
    } catch (err) {
      console.error("Microphone access error:", err);
      setRecordingNotice(err?.message || "تعذر الوصول إلى الميكروفون. يرجى التحقق من صلاحيات المتصفح.");
      setTimeout(() => setRecordingNotice(null), 5e3);
    }
  };
  const cancelRecording = () => {
    setRecordingNotice(null);
    shouldSendOnStopRef.current = false;
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
      }
    }
    if (recordingStreamRef.current) {
      recordingStreamRef.current.getTracks().forEach((track) => track.stop());
      recordingStreamRef.current = null;
    }
    setIsRecording(false);
    setAudioBlob(null);
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setAudioPreviewUrl(null);
    audioChunksRef.current = [];
    setRecordingTime(0);
    recordingTimeRef.current = 0;
  };
  const stopAndSendVoice = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    shouldSendOnStopRef.current = true;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.requestData();
      } catch (e) {
      }
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
      }
    }
    setIsRecording(false);
  };
  const sendAudioBlob = async (blob, duration) => {
    if (!blob || blob.size === 0 || !chatId) return;
    const sendWithViewOnce = isViewOnceActive;
    setIsViewOnceActive(false);
    try {
      notificationService.playSentTone();
      await messagingService.sendMediaMessage({
        chatId,
        senderId: userId,
        receiverId: otherUser,
        type: "voice",
        file: blob,
        duration: Math.max(1, duration || 1),
        isViewOnce: sendWithViewOnce
      });
    } catch (err) {
      console.error("Failed to send voice message:", err);
    } finally {
      setAudioBlob(null);
      if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
      setAudioPreviewUrl(null);
      audioChunksRef.current = [];
    }
  };
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full w-full max-h-[100dvh] bg-slate-50 text-slate-900 dir-rtl relative select-none overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-header shrink-0 border-b border-slate-200/80 p-2.5 sm:p-3 flex items-center justify-between shadow-xs z-30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => {
            if (!isSavedMessages && !isGroup) {
              setShowContactProfileModal(true);
            }
          },
          className: `flex items-center gap-2 sm:gap-3 min-w-0 flex-1 ${!isSavedMessages && !isGroup ? "cursor-pointer group" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  navigate("/");
                },
                className: "p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition btn-tactile cursor-pointer shrink-0",
                "aria-label": "رجوع",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 transition-transform group-hover:scale-105", children: [
              isSavedMessages ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#2AABEE] to-blue-600 flex items-center justify-center text-white shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-5 h-5" }) }) : isGroup ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#2AABEE] to-[#229ED9] flex items-center justify-center text-white font-bold shadow-xs overflow-hidden border border-slate-200", children: otherUserData?.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: otherUserData.photoURL,
                  alt: otherDisplayName,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: otherDisplayName ? otherDisplayName.charAt(0).toUpperCase() : "U" }) }),
              isUserOnline(otherUserData?.lastSeen, otherUserData?.online) && !isSavedMessages && !isGroup && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-500 border-2 border-white rounded-full animate-pulse" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-[#2AABEE] transition", children: otherDisplayName || "محادثة" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] sm:text-[11px] text-[#2AABEE] font-medium truncate", children: isSavedMessages ? "مساحتك الخاصة لحفظ الرسائل" : isGroup ? "مجموعة" : formatLastSeen(otherUserData?.lastSeen, otherUserData?.online) })
            ] })
          ]
        }
      ),
      !isSavedMessages && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 sm:gap-1 text-slate-600 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleOpenSecretVault(secretSession ? "join" : "create"),
            className: `p-1.5 sm:p-2 rounded-full transition btn-tactile cursor-pointer relative ${secretSession ? "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 ring-1 ring-cyan-400" : "hover:bg-slate-100 text-slate-500 hover:text-slate-700"}`,
            title: "المحادثة السرية المشفرة برمز أمان خاص",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              secretSession && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 ring-1 ring-white animate-pulse" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowEncryptionInfoModal(true),
            className: "p-1.5 sm:p-2 rounded-full hover:bg-blue-50 hover:text-[#2AABEE] transition btn-tactile cursor-pointer text-[#2AABEE]",
            title: "تشفير المحادثة ورمز الأمان (E2EE)",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 sm:w-5 sm:h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => onStartCall && onStartCall(
              otherUser || otherUserData?.phoneNumber || "",
              otherDisplayName || "مستخدم",
              "voice"
            ),
            className: "p-1.5 sm:p-2 rounded-full hover:bg-blue-50 hover:text-[#2AABEE] transition btn-tactile cursor-pointer",
            title: "مكالمة صوتية",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 sm:w-5 sm:h-5 text-[#2AABEE]" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => onStartCall && onStartCall(
              otherUser || otherUserData?.phoneNumber || "",
              otherDisplayName || "مستخدم",
              "video"
            ),
            className: "p-1.5 sm:p-2 rounded-full hover:bg-blue-50 hover:text-[#2AABEE] transition btn-tactile cursor-pointer",
            title: "مكالمة فيديو",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4 sm:w-5 sm:h-5 text-[#2AABEE]" })
          }
        )
      ] })
    ] }),
    secretSession && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-slate-950 via-[#0a1525] to-slate-950 border-b border-cyan-500/30 px-3 sm:px-4 py-2 flex items-center justify-between text-white shadow-md z-10 animate-in slide-in-from-top-2 duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-cyan-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-cyan-300 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "محادثة سرية مقفلة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-300 truncate", children: secretSession.status === "closed_for_review" ? "مقفلة في وضع المراجعة" : "محمية برمز أمان خاص خلف النقاط الثلاث" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleOpenSecretVault("join"),
          className: "px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-[#2AABEE] hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3.5 h-3.5 text-slate-950" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "دخول بالرمز السري 🔓" })
          ]
        }
      ) })
    ] }),
    pinnedMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => {
          const el = document.getElementById(pinnedMessage.id);
          el?.scrollIntoView({ behavior: "smooth" });
        },
        className: "bg-white/95 border-b border-slate-200 px-4 py-2 flex items-center justify-between shadow-xs cursor-pointer hover:bg-slate-50 transition z-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "w-4 h-4 text-[#2AABEE] shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs truncate", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[#2AABEE] ml-1", children: "مثبت:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-700", children: pinnedMessage.text })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                setPinnedMessage(null);
              },
              className: "p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: chatContainerRef,
        className: "flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 bg-[#f0f4f9] relative select-text",
        children: [
          !isSavedMessages && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center my-2 animate-in fade-in duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowEncryptionInfoModal(true),
              className: "bg-blue-50/90 hover:bg-blue-100 text-blue-900 border border-blue-200/70 rounded-xl px-3 py-1.5 text-[11.5px] leading-relaxed max-w-sm text-center shadow-xs cursor-pointer transition flex items-center justify-center gap-1.5 font-normal",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-[#2AABEE] shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الرسائل والمكالمات مشفرة تماماً من طرف إلى طرف. لا أحد خارج هذه المحادثة يمكنه قراءتها." })
              ]
            }
          ) }),
          displayedMessages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-slate-400 text-center px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-6 h-6 text-slate-400 -rotate-45" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-slate-600", children: "لا توجد رسائل بعد" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1 max-w-[240px]", children: "ابدأ المحادثة الآن بإرسال نص، صورة، أو رسالة صوتية" })
          ] }) : displayedMessages.map((msg, idx) => {
            const prevMsg = idx > 0 ? displayedMessages[idx - 1] : null;
            const isDifferentDay = !prevMsg || Boolean(msg.timestamp && prevMsg.timestamp) && formatDateDivider(msg.timestamp) !== formatDateDivider(prevMsg.timestamp);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
              isDifferentDay && msg.timestamp && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center my-3 select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-200/90 text-slate-700 font-semibold text-[11px] px-3.5 py-1 rounded-full shadow-2xs border border-slate-300/40", children: formatDateDivider(msg.timestamp) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MessageItem,
                {
                  msg,
                  userId,
                  uploadProgress: msg.id ? uploadProgressMap[msg.id] : msg.clientMessageId ? uploadProgressMap[msg.clientMessageId] : void 0,
                  onImageClick: (url) => setSelectedImageModal(url),
                  onVideoClick: (url) => setSelectedVideoModal(url),
                  onRetry: handleRetryMessage,
                  onReply: (m) => {
                    setReplyingTo(m);
                    inputRef.current?.focus();
                  },
                  onEdit: (m) => {
                    setEditingMessage(m);
                    setNewMessage(m.text || "");
                    inputRef.current?.focus();
                  },
                  onDeleteClick: (m) => setDeleteModalMessage(m),
                  onOpenActionMenu: (m) => setSelectedMessageForAction(m),
                  onToggleReaction: handleToggleReaction,
                  onPinMessage: handlePinMessage,
                  onOpenViewOnce: (m) => setActiveViewOnceMsg(m),
                  onOpenSecretAuth: () => handleOpenSecretVault("join")
                }
              )
            ] }, msg.id || msg.clientMessageId || `${msg.timestamp}_${idx}`);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
        ]
      }
    ),
    replyingTo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-100 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs animate-in slide-in-from-bottom-2 duration-150", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-r-2 border-[#2AABEE] pr-2 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-[#2AABEE]", children: [
          "الرد على ",
          replyingTo.sender === userId ? "نفسك" : otherDisplayName || "مستخدم",
          ":"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-600 truncate max-w-[200px]", children: replyingTo.text || (replyingTo.type === "image" ? "📷 صورة" : replyingTo.type === "video" ? "🎬 فيديو" : "🎤 رسالة صوتية") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setReplyingTo(null),
          className: "p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    editingMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border-t border-amber-200 px-4 py-2 flex items-center justify-between text-xs animate-in slide-in-from-bottom-2 duration-150", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4 text-amber-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "تعديل الرسالة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setEditingMessage(null);
            setNewMessage("");
          },
          className: "p-1 text-amber-600 hover:text-amber-800 rounded-full cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    imagePreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 text-white p-3 flex items-center justify-between gap-3 border-t border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imagePreview.url,
            alt: "معاينة الصورة",
            className: "w-14 h-14 object-cover rounded-lg border border-white/20"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold truncate max-w-[180px]", children: imagePreview.file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400", children: [
            (imagePreview.file.size / 1024).toFixed(0),
            " كيلوبايت"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsViewOnceActive(!isViewOnceActive),
            className: `w-8 h-8 rounded-full border transition cursor-pointer flex items-center justify-center ${isViewOnceActive ? "bg-[#2AABEE] border-[#2AABEE] text-white shadow-md ring-2 ring-[#2AABEE]/40 font-bold" : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white font-medium"}`,
            title: isViewOnceActive ? "عرض لمرة واحدة مفعل" : "تفعيل العرض لمرة واحدة",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: "1" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              if (imagePreview.url) URL.revokeObjectURL(imagePreview.url);
              setImagePreview(null);
            },
            className: "p-2 text-slate-400 hover:text-white rounded-full cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleSendImage,
            className: "px-4 py-2 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer bg-[#2AABEE] hover:bg-[#229ED9]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 ml-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isViewOnceActive ? "إرسال لمرة واحدة" : "إرسال الصورة" })
            ]
          }
        )
      ] })
    ] }),
    videoPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/95 text-white p-3 flex items-center justify-between gap-3 border-t border-slate-800 animate-in slide-in-from-bottom-2 duration-150", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 overflow-hidden", children: [
        videoPreview.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: videoPreview.thumbnailUrl,
            alt: "معاينة الفيديو",
            className: "w-14 h-14 object-cover rounded-lg border border-white/20"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-6 h-6 text-[#2AABEE]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold truncate max-w-[180px]", children: videoPreview.file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-slate-400", children: [
            (videoPreview.file.size / (1024 * 1024)).toFixed(1),
            " ميغابايت",
            videoPreview.duration ? ` • ${Math.round(videoPreview.duration)} ثانية` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsViewOnceActive(!isViewOnceActive),
            className: `w-8 h-8 rounded-full border transition cursor-pointer flex items-center justify-center ${isViewOnceActive ? "bg-[#2AABEE] border-[#2AABEE] text-white shadow-md ring-2 ring-[#2AABEE]/40 font-bold" : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white font-medium"}`,
            title: isViewOnceActive ? "عرض لمرة واحدة مفعل" : "تفعيل العرض لمرة واحدة",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: "1" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              if (videoPreview.url) URL.revokeObjectURL(videoPreview.url);
              setVideoPreview(null);
            },
            className: "p-2 text-slate-400 hover:text-white rounded-full cursor-pointer",
            title: "إلغاء",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleSendVideo,
            className: "px-4 py-2 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer bg-[#2AABEE] hover:bg-[#229ED9]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 ml-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isViewOnceActive ? "إرسال لمرة واحدة" : "إرسال الفيديو" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-dock shrink-0 border-t border-slate-200/80 p-2.5 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/*",
          className: "hidden",
          onChange: handleImageSelect
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: videoInputRef,
          type: "file",
          accept: "video/*",
          className: "hidden",
          onChange: handleVideoSelect
        }
      ),
      recordingNotice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 p-2.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold rounded-2xl flex items-center justify-between shadow-xs animate-in fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🎙️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: recordingNotice })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setRecordingNotice(null),
            className: "text-amber-600 hover:text-amber-800 p-1 cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ] }),
      isRecording ? (
        /* Active Voice Recording Bar */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 bg-red-50/80 border border-red-200/80 p-2 rounded-2xl animate-in fade-in duration-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: cancelRecording,
              className: "p-2 text-red-500 hover:bg-red-100 rounded-full transition cursor-pointer",
              title: "إلغاء التسجيل",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LiveWaveform, { stream: recordingStreamRef.current, isRecording: true, barCount: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold text-red-600", children: formatTime(recordingTime) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: stopAndSendVoice,
              className: "p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition transform active:scale-95 cursor-pointer flex items-center justify-center",
              title: "إرسال التسجيل الصوتي",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5 ml-0.5" })
            }
          )
        ] })
      ) : (
        /* Standard Input Bar */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          showAttachMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-14 right-2 bg-white border border-slate-200 shadow-xl rounded-2xl p-2 flex gap-3 z-30 animate-in zoom-in-95 duration-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => {
                  setShowAttachMenu(false);
                  fileInputRef.current?.click();
                },
                className: "flex flex-col items-center p-2 hover:bg-slate-50 rounded-xl cursor-pointer transition",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-100 text-[#2AABEE] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-600 font-semibold mt-1", children: "صورة" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => {
                  setShowAttachMenu(false);
                  videoInputRef.current?.click();
                },
                className: "flex flex-col items-center p-2 hover:bg-purple-50 rounded-xl cursor-pointer transition",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-600 font-semibold mt-1", children: "فيديو" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendMessage, className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleOpenSecretVault(),
                className: "w-8 h-8 rounded-full border border-slate-200 hover:border-cyan-400 bg-white hover:bg-cyan-50 text-slate-400 hover:text-cyan-600 transition-all duration-150 cursor-pointer flex items-center justify-center shrink-0 shadow-2xs group relative",
                title: "محادثة سرية مقفلة برمز أمان خاص (3 نقط)",
                "aria-label": "المحادثة السرية",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MoreHorizontal, { className: "w-4 h-4 transition-transform group-hover:scale-110" }),
                  secretSession && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${secretSession.status === "closed_for_review" ? "bg-amber-400" : "bg-cyan-400"} ring-1 ring-white animate-pulse` })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowAttachMenu(!showAttachMenu),
                className: `p-2 rounded-full transition cursor-pointer ${showAttachMenu ? "bg-slate-200 text-[#2AABEE]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`,
                title: "إرفاق ملف",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsViewOnceActive(!isViewOnceActive),
                className: `w-9 h-9 rounded-full border transition-all duration-150 cursor-pointer flex items-center justify-center shrink-0 ${isViewOnceActive ? "bg-[#2AABEE] border-[#2AABEE] text-white shadow-sm ring-2 ring-[#2AABEE]/30 font-bold" : "bg-white text-slate-500 hover:text-[#2AABEE] hover:bg-blue-50 border-slate-200 font-medium"}`,
                title: isViewOnceActive ? "العرض لمرة واحدة مفعل" : "تفعيل العرض لمرة واحدة",
                "aria-label": "عرض لمرة واحدة",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: "1" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                type: "text",
                placeholder: isViewOnceActive ? "رسالة للعرض لمرة واحدة..." : "اكتب رسالة...",
                value: newMessage,
                onChange: (e) => setNewMessage(e.target.value),
                onFocus: () => setShowAttachMenu(false),
                className: `flex-1 text-sm px-4 py-2.5 rounded-full outline-none border transition ${isViewOnceActive ? "bg-blue-50/50 border-[#2AABEE] text-slate-900 placeholder-blue-700/60 focus:ring-1 focus:ring-[#2AABEE]" : "bg-white text-slate-900 placeholder-slate-400 border-slate-200 focus:border-[#2AABEE] focus:ring-1 focus:ring-[#2AABEE]/20"}`
              }
            ),
            newMessage.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "w-10 h-10 rounded-full text-white shadow-sm transition transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shrink-0 bg-[#2AABEE] hover:bg-[#229ED9]",
                title: "إرسال",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5 ml-0.5" })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: startRecording,
                className: "w-10 h-10 rounded-full text-white shadow-sm transition transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center shrink-0 bg-[#2AABEE] hover:bg-[#229ED9]",
                title: "تسجيل رسالة صوتية",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-5 h-5" })
              }
            )
          ] })
        ] })
      )
    ] }),
    selectedMessageForAction && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0",
          onClick: () => setSelectedMessageForAction(null)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white rounded-t-3xl sm:rounded-3xl p-4 w-full sm:max-w-md shadow-2xl border border-slate-100 z-10 animate-in slide-in-from-bottom duration-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-1 bg-slate-200 rounded-full mx-auto mb-3 sm:hidden" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-around bg-slate-50 rounded-2xl p-2 mb-3 border border-slate-100 shadow-inner", children: QUICK_EMOJIS.map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              if (selectedMessageForAction.id) {
                handleToggleReaction(selectedMessageForAction.id, emoji);
              }
              setSelectedMessageForAction(null);
            },
            className: "w-9 h-9 flex items-center justify-center hover:scale-130 active:scale-90 transition text-xl cursor-pointer",
            children: emoji
          },
          emoji
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-slate-50 rounded-xl mb-3 text-xs text-slate-600 truncate border-r-4 border-[#2AABEE]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[#2AABEE] ml-1", children: selectedMessageForAction.sender === userId ? "أنت:" : `${otherDisplayName || "مستخدم"}:` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedMessageForAction.text || (selectedMessageForAction.type === "image" ? "📷 صورة" : selectedMessageForAction.type === "voice" ? "🎤 رسالة صوتية" : "رسالة") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 divide-y divide-slate-100 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                const target = selectedMessageForAction;
                setSelectedMessageForAction(null);
                setDeleteModalMessage(target);
              },
              className: "w-full py-3 px-3 flex items-center justify-between text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حذف الرسالة" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-normal text-rose-400", children: selectedMessageForAction.sender === userId ? isMessageWithinFourHours(selectedMessageForAction.timestamp) ? "لدى الجميع / لدي" : "لدي فقط (مضت 4 ساعات)" : "لدي فقط" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setReplyingTo(selectedMessageForAction);
                setSelectedMessageForAction(null);
                inputRef.current?.focus();
              },
              className: "w-full py-3 px-3 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition cursor-pointer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-blue-50 text-[#2AABEE] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rotate-180" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الرد على الرسالة" })
              ] })
            }
          ),
          selectedMessageForAction.text && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleCopyMessageText(selectedMessageForAction.text),
              className: "w-full py-3 px-3 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition cursor-pointer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-blue-50 text-[#2AABEE] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نسخ النص" })
              ] })
            }
          ),
          selectedMessageForAction.sender === userId && selectedMessageForAction.type === "text" && (isMessageWithinFourHours(selectedMessageForAction.timestamp) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setEditingMessage(selectedMessageForAction);
                setNewMessage(selectedMessageForAction.text || "");
                setSelectedMessageForAction(null);
                inputRef.current?.focus();
              },
              className: "w-full py-3 px-3 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تعديل الرسالة" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-amber-600 font-normal", children: "خلال 4 ساعات" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full py-3 px-3 flex items-center justify-between text-xs font-medium text-slate-400 bg-slate-50/50 rounded-xl cursor-not-allowed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تعديل الرسالة" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "انتهت مهلة التعديل (4 ساعات)" })
          ] })),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                handlePinMessage(selectedMessageForAction);
                setSelectedMessageForAction(null);
              },
              className: "w-full py-3 px-3 flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition cursor-pointer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تثبيت الرسالة" })
              ] })
            }
          )
        ] })
      ] })
    ] }),
    deleteModalMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0",
          onClick: () => setDeleteModalMessage(null)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl border border-slate-100 z-10 text-center animate-in zoom-in-95 duration-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-900 mb-1", children: "حذف الرسالة؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mb-4 leading-relaxed", children: deleteModalMessage.sender === userId ? isMessageWithinFourHours(deleteModalMessage.timestamp) ? "هل تريد حذف هذه الرسالة لدى الجميع أم حذفها من جهازك فقط؟" : "مضت أكثر من 4 ساعات على إرسال هذه الرسالة، لذلك لم يعد بالإمكان حذفها لدى الجميع. يمكنك فقط حذفها من جهازك." : "هل أنت متأكد من رغبتك في حذف هذه الرسالة من محادثتك؟" }),
        deleteModalMessage.sender === userId && !isMessageWithinFourHours(deleteModalMessage.timestamp) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 mb-4 bg-amber-50 border border-amber-200/80 rounded-xl text-[11px] text-amber-800 text-right flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-amber-600 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "انتهت مهلة الـ 4 ساعات للحذف لدى الطرف الآخر." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          deleteModalMessage.sender === userId && isMessageWithinFourHours(deleteModalMessage.timestamp) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleDeleteForEveryone(deleteModalMessage),
              className: "w-full py-2.5 px-4 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الحذف لدى الجميع" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleDeleteForMe(deleteModalMessage),
              className: "w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الحذف لدي فقط" })
            }
          ),
          deleteModalMessage.sender === userId && isMessageWithinFourHours(deleteModalMessage.timestamp) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleDeletePermanently(deleteModalMessage),
              className: "w-full py-2 px-4 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-rose-200",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حذف نهائي من المحادثة" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setDeleteModalMessage(null),
              className: "w-full py-2.5 px-4 text-slate-500 hover:bg-slate-50 rounded-xl text-xs font-medium transition cursor-pointer",
              children: "إلغاء"
            }
          )
        ] })
      ] })
    ] }),
    showCopiedToast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg backdrop-blur-xs animate-in fade-in duration-150", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تمت العملية بنجاح" })
    ] }),
    selectedImageModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelectedImageModal(null),
            className: "p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: selectedImageModal,
            download: "imi_image.jpg",
            target: "_blank",
            rel: "noreferrer",
            className: "p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer",
            title: "فتح بالحجم الكامل",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              }
            ) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full flex items-center justify-center max-w-5xl mx-auto overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: selectedImageModal,
          alt: "صورة مكبرة",
          className: "max-w-full max-h-[85vh] rounded-md object-contain shadow-2xl transition-transform transform hover:scale-105 duration-300"
        }
      ) })
    ] }),
    selectedVideoModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelectedVideoModal(null),
            className: "p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: selectedVideoModal,
            download: "imi_video.mp4",
            target: "_blank",
            rel: "noreferrer",
            className: "p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer",
            title: "تحميل الفيديو",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              }
            ) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full flex items-center justify-center max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          src: selectedVideoModal,
          controls: true,
          autoPlay: true,
          playsInline: true,
          className: "max-w-full max-h-[85vh] rounded-xl shadow-2xl bg-black"
        }
      ) })
    ] }),
    showContactProfileModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in dir-rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowContactProfileModal(false),
          className: "absolute top-3 left-3 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition z-10 cursor-pointer shadow-md",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-72 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] flex items-center justify-center overflow-hidden", children: [
        otherUserData?.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: otherUserData.photoURL,
            alt: otherDisplayName,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-white text-5xl font-extrabold border-4 border-white/40", children: otherDisplayName ? otherDisplayName.charAt(0).toUpperCase() : "U" }),
        otherUserData?.photoURL && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: (e) => handleDownloadProfilePicture(otherUserData.photoURL, otherDisplayName, e),
            className: "absolute bottom-3 left-3 bg-black/70 hover:bg-black/90 text-white text-xs font-bold px-3.5 py-2 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-lg border border-white/20 transition cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-[#2AABEE]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تحميل الصورة الشخصية" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-right space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-extrabold text-slate-900", children: otherDisplayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#2AABEE] font-mono mt-0.5 dir-ltr text-right", children: otherUserData?.phoneNumber || otherUser })
        ] }),
        otherUserData?.about && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-3.5 rounded-2xl border border-slate-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-slate-400 block mb-1", children: "النبذة (الحالة)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-700 font-medium leading-relaxed", children: otherUserData.about })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                setShowContactProfileModal(false);
                if (onStartCall) onStartCall(otherUser || otherUserData?.phoneNumber || "", otherDisplayName, "voice");
              },
              className: "flex-1 py-3 bg-blue-50 hover:bg-blue-100 text-[#2AABEE] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مكالمة صوتية" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                setShowContactProfileModal(false);
                if (onStartCall) onStartCall(otherUser || otherUserData?.phoneNumber || "", otherDisplayName, "video");
              },
              className: "flex-1 py-3 bg-sky-50 hover:bg-sky-100 text-[#2AABEE] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مكالمة فيديو" })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    activeViewOnceMsg && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewOnceViewerModal,
      {
        msg: activeViewOnceMsg,
        chatId,
        userId,
        senderName: activeViewOnceMsg.sender === userId ? "أنت" : otherDisplayName || "مستخدم",
        senderAvatar: otherUserData?.photoURL,
        onClose: () => setActiveViewOnceMsg(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EncryptionInfoModal,
      {
        isOpen: showEncryptionInfoModal,
        onClose: () => setShowEncryptionInfoModal(false),
        chatId,
        currentUserId: userId,
        otherUserId: otherUser,
        otherDisplayName
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SecretAuthModal,
      {
        isOpen: showSecretAuthModal,
        onClose: () => setShowSecretAuthModal(false),
        chatId,
        userId,
        otherUser: otherUser || "",
        otherDisplayName,
        existingSession: secretSession,
        initialMode: secretAuthModalMode,
        onAuthenticated: handleSecretAuthenticated
      }
    ),
    showSecretChatModal && authenticatedSecretSession && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SecretChatModal,
      {
        chatId,
        userId,
        otherUser: otherUser || "",
        otherDisplayName,
        otherAvatar: otherUserData?.photoURL,
        isOpen: showSecretChatModal,
        onClose: () => {
          setShowSecretChatModal(false);
          setAuthenticatedSecretSession(null);
        },
        initialSession: authenticatedSecretSession
      }
    )
  ] });
}

export { ChatRoom as default };
