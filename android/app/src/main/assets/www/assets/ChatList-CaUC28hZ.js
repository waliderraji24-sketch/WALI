import { r as reactExports, j as jsxRuntimeExports, m as Camera, E as Plus, f as Sparkles, X, q as CheckCircle2, G as Clock, D as Download, J as VolumeX, K as Volume2, T as Trash2, O as ChevronLeft, Q as ChevronRight, Y as Send, z as React, p as Home, U as User, e as MessageSquare, Z as Users, _ as Film, $ as Radio, B as Bell, a0 as Settings, a1 as LogOut, a as ShieldCheck, S as Smartphone, P as Phone, a2 as UserCheck, b as Search, a3 as Loader2, s as AlertCircle, V as Video, C as Check, a4 as UserPlus, g as Copy, a5 as Ban, R as RefreshCw, c as Share2, a6 as ShieldAlert, u as useTranslation, a7 as useNavigate, a8 as Menu, a9 as Circle, aa as PhoneCall, ab as ArrowUpRight, ac as ArrowDownLeft, ad as Bookmark, M as MessageCircle, L as Lock } from './vendor-react-DAzNXBh_.js';
import { d as db, h as handleFirestoreError, O as OperationType, u as uploadMedia, m as messagingService, a as usePWAInstall, I as InstallInstructionsModal, n as notificationService, b as androidBridge, i as isUserOnline, f as formatLastSeen, c as auth, P as PWAInstallButton } from './index-1f3YQYJq.js';
import { x as query, y as limit, z as where, n as collection, A as onSnapshot, j as setDoc, h as doc, k as deleteDoc, m as updateDoc, o as getDocs } from './vendor-firebase-DLAfa3Dz.js';
import { f as formatChatListTime, M as MessageStatusIcon } from './MessageStatusIcon-CUdySMPl.js';
import { f as findRegisteredUserByPhone } from './userService-eU_CWHi8.js';

const performanceTracker = {
  mark: (n) => {
  },
  measure: (n, s, e) => {
  },
  logMetrics: () => {
  },
  registerListener: (cb) => {
  },
  unregisterListener: (cb) => {
  },
  startTimer: (id) => {
  },
  endTimer: (id, a, b, c) => {
  }
};

const NEUTRAL_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";
function StatusManager({
  userPhone,
  userName,
  userAvatar,
  usersData
}) {
  const [statuses, setStatuses] = reactExports.useState([]);
  const [isCreating, setIsCreating] = reactExports.useState(false);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [localPreview, setLocalPreview] = reactExports.useState(null);
  const [isVideo, setIsVideo] = reactExports.useState(false);
  const [caption, setCaption] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [uploadSuccess, setUploadSuccess] = reactExports.useState(false);
  const [viewingUserPhone, setViewingUserPhone] = reactExports.useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = reactExports.useState(0);
  const [isStoryPaused, setIsStoryPaused] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [storyProgress, setStoryProgress] = reactExports.useState(0);
  const [isMediaLoaded, setIsMediaLoaded] = reactExports.useState(false);
  const [statusReplyText, setStatusReplyText] = reactExports.useState("");
  const [statusToastMessage, setStatusToastMessage] = reactExports.useState(null);
  const videoRef = reactExports.useRef(null);
  const STATUT_LIFETIME_MS = 28 * 60 * 60 * 1e3;
  reactExports.useEffect(() => {
    if (!userPhone) return;
    const now = Date.now();
    const q = query(
      collection(db, "statuses"),
      where("expiresAt", ">", now),
      limit(50)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const nowServerTime = Date.now();
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        })).filter((item) => item.expiresAt > nowServerTime);
        items.sort((a, b) => a.createdAt - b.createdAt);
        setStatuses(items);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, "statuses");
      }
    );
    const cleanupInterval = setInterval(() => {
      const nowCurrent = Date.now();
      setStatuses((prev) => prev.filter((item) => item.expiresAt > nowCurrent));
    }, 3e4);
    return () => {
      unsubscribe();
      clearInterval(cleanupInterval);
    };
  }, [userPhone]);
  const userStatusMap = reactExports.useMemo(() => {
    const map = {};
    statuses.forEach((st) => {
      if (!map[st.userPhone]) {
        map[st.userPhone] = [];
      }
      map[st.userPhone].push(st);
    });
    return map;
  }, [statuses]);
  const myStatuses = reactExports.useMemo(() => userStatusMap[userPhone] || [], [userStatusMap, userPhone]);
  const otherUsersPhones = reactExports.useMemo(
    () => Object.keys(userStatusMap).filter((ph) => ph !== userPhone),
    [userStatusMap, userPhone]
  );
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localPreview) {
      URL.revokeObjectURL(localPreview);
    }
    const fileIsVideo = file.type.startsWith("video/");
    setIsVideo(fileIsVideo);
    setSelectedFile(file);
    setLocalPreview(URL.createObjectURL(file));
  };
  const handleCloseCreate = () => {
    if (localPreview) {
      URL.revokeObjectURL(localPreview);
    }
    setSelectedFile(null);
    setLocalPreview(null);
    setIsVideo(false);
    setCaption("");
    setIsCreating(false);
    setUploading(false);
    setUploadProgress(0);
    setUploadSuccess(false);
  };
  const handlePostStatus = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadProgress(15);
    setUploadSuccess(false);
    const statusId = `status_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    try {
      const ext = isVideo ? "mp4" : "jpg";
      const uploadResult = await uploadMedia({
        file: selectedFile,
        type: "STATUS_IMAGE",
        ownerId: userPhone,
        customFileName: `${statusId}.${ext}`,
        onProgress: (pct) => setUploadProgress(pct)
      });
      const createdAt = Date.now();
      const expiresAt = createdAt + STATUT_LIFETIME_MS;
      const currentUserPhoto = usersData[userPhone]?.photoURL || userAvatar || "";
      const newStatusDoc = {
        id: statusId,
        userId: userPhone,
        userPhone,
        userName: userName || usersData[userPhone]?.displayName || "مستخدم",
        userAvatar: currentUserPhoto,
        mediaUrl: uploadResult.downloadURL,
        thumbnailUrl: uploadResult.downloadURL,
        caption: caption.trim(),
        createdAt,
        expiresAt
      };
      await setDoc(doc(db, "statuses", statusId), newStatusDoc);
      performanceTracker.endTimer(statusId, "image", "إنشاء حالة (28h)", "تم النشر بنجاح");
      setUploadProgress(100);
      setUploadSuccess(true);
      setTimeout(() => {
        handleCloseCreate();
      }, 700);
    } catch (err) {
      console.error("Failed to post status:", err);
      setStatusToastMessage(err?.message || "حدث خطأ أثناء رفع الحالة. يرجى المحاولة مرة أخرى.");
      setTimeout(() => setStatusToastMessage(null), 3500);
      setUploading(false);
    }
  };
  const handleDeleteStatus = async (statusId, e) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "statuses", statusId));
      setStatusToastMessage("تم حذف الحالة بنجاح");
      setTimeout(() => setStatusToastMessage(null), 2500);
      setStatuses((prev) => prev.filter((s) => s.id !== statusId));
      if (myStatuses.length <= 1) {
        setViewingUserPhone(null);
      } else if (currentStoryIndex >= myStatuses.length - 1) {
        setCurrentStoryIndex(Math.max(0, myStatuses.length - 2));
      }
    } catch (err) {
      console.error("Failed to delete status:", err);
    }
  };
  const showToast = (msg) => {
    setStatusToastMessage(msg);
    setTimeout(() => setStatusToastMessage(null), 3e3);
  };
  const handleDownloadStatus = async (mediaUrl, isVideo2, e) => {
    e.stopPropagation();
    showToast("جاري بدء تحميل الحالة...");
    try {
      const response = await fetch(mediaUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `status_${Date.now()}.${isVideo2 ? "mp4" : "jpg"}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
      showToast("تم تحميل الحالة بنجاح!");
    } catch (err) {
      console.warn("Direct blob download fallback:", err);
      const a = document.createElement("a");
      a.href = mediaUrl;
      a.target = "_blank";
      a.download = `status_${Date.now()}.${isVideo2 ? "mp4" : "jpg"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("تم فتح رابط التحميل المباشر");
    }
  };
  const handleSendStatusReply = async () => {
    if (!statusReplyText.trim() || !viewingUserPhone || !currentStory) return;
    const replyMsgText = statusReplyText.trim();
    setStatusReplyText("");
    setIsStoryPaused(false);
    const targetRecipient = viewingUserPhone;
    const recipientName = usersData[viewingUserPhone]?.displayName || currentStory.userName;
    const chatId = [userPhone, targetRecipient].sort().join("_");
    const formattedText = `📌 *رد على الحالة (${recipientName}):*
"${currentStory.caption || (isCurrentStoryVideo ? "🎥 فيديو" : "📷 صورة")}"

${replyMsgText}`;
    try {
      await messagingService.sendTextMessage({
        chatId,
        senderId: userPhone,
        receiverId: targetRecipient,
        otherDisplayName: recipientName,
        text: formattedText
      });
      showToast("تم إرسال الرد إلى المحادثة بنجاح! 💬");
    } catch (err) {
      console.error("Failed to send status reply:", err);
      showToast("فشل إرسال الرد، يرجى المحاولة لاحقاً");
    }
  };
  const formatTimeAgo = (timestamp) => {
    const diffSec = Math.floor((Date.now() - timestamp) / 1e3);
    if (diffSec < 60) return "الآن";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
    const diffHours = Math.floor(diffMin / 60);
    return `منذ ${diffHours} ساعة`;
  };
  const activeViewingStories = viewingUserPhone ? userStatusMap[viewingUserPhone] || [] : [];
  const currentStory = activeViewingStories[currentStoryIndex];
  const isCurrentStoryVideo = currentStory?.mediaUrl?.includes(".mp4") || currentStory?.mediaUrl?.includes("video");
  reactExports.useEffect(() => {
    setIsMediaLoaded(false);
    setStoryProgress(0);
  }, [viewingUserPhone, currentStoryIndex]);
  const handleNextStory = () => {
    if (currentStoryIndex < activeViewingStories.length - 1) {
      setCurrentStoryIndex((curr) => curr + 1);
    } else {
      setViewingUserPhone(null);
      setCurrentStoryIndex(0);
    }
  };
  reactExports.useEffect(() => {
    if (!viewingUserPhone || activeViewingStories.length === 0 || isStoryPaused || !isMediaLoaded || isCurrentStoryVideo) {
      return;
    }
    const duration = 5e3;
    const startTime = Date.now() - storyProgress / 100 * duration;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, elapsed / duration * 100);
      setStoryProgress(pct);
      if (elapsed >= duration) {
        clearInterval(interval);
        handleNextStory();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [viewingUserPhone, currentStoryIndex, activeViewingStories.length, isStoryPaused, isMediaLoaded, isCurrentStoryVideo, storyProgress]);
  reactExports.useEffect(() => {
    if (isCurrentStoryVideo && videoRef.current) {
      if (isStoryPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((e) => {
          if (e?.name !== "AbortError") console.warn("Could not auto-play status video", e);
        });
      }
    }
  }, [isStoryPaused, isCurrentStoryVideo]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white min-h-full flex flex-col select-none", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3.5 flex items-center justify-between border-b border-slate-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-extrabold text-slate-900", children: "الحالة والقصص" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "تختفي الحالات تلقائياً بعد 28 ساعة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setIsCreating(true),
          className: "p-2.5 text-[#2AABEE] hover:text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-2xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-xs",
          title: "إضافة حالة جديدة",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إضافة حالة" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-4 px-4 py-3.5 hover:bg-slate-50 cursor-pointer transition active:bg-slate-100 border-b border-slate-100",
        onClick: () => {
          if (myStatuses.length > 0) {
            setViewingUserPhone(userPhone);
            setCurrentStoryIndex(0);
          } else {
            setIsCreating(true);
          }
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-14 h-14 rounded-full p-[2.5px] transition-all ${myStatuses.length > 0 ? "bg-gradient-to-tr from-emerald-400 via-sky-400 to-[#2AABEE] shadow-md shadow-sky-500/20" : "bg-slate-200"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: usersData[userPhone]?.photoURL || userAvatar || NEUTRAL_AVATAR,
                    alt: "حالاتي",
                    referrerPolicy: "no-referrer",
                    className: "w-full h-full rounded-full object-cover border-2 border-white bg-slate-100"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setIsCreating(true);
                },
                className: "absolute bottom-0 right-0 bg-[#2AABEE] hover:bg-sky-600 text-white rounded-full p-1 border-2 border-white transition shadow-sm cursor-pointer",
                title: "إضافة حالة",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 stroke-[3]" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900 text-base", children: "حالاتي" }),
              myStatuses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold text-[#2AABEE] bg-sky-50 px-2 py-0.5 rounded-full", children: [
                myStatuses.length,
                " ",
                myStatuses.length === 1 ? "حالة نشطة" : "حالات نشطة"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs mt-0.5", children: myStatuses.length > 0 ? `آخر تحديث ${formatTimeAgo(myStatuses[myStatuses.length - 1].createdAt)}` : "انقر لنشر صورة أو فيديو في حالتك" })
          ] })
        ]
      }
    ),
    otherUsersPhones.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-1.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-extrabold text-slate-600 tracking-wider", children: "التحديثات الأخيرة من جهات الاتصال" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold text-slate-400", children: [
        otherUsersPhones.length,
        " جهات"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pb-24 divide-y divide-slate-100", children: [
      otherUsersPhones.map((ph) => {
        const userStories = userStatusMap[ph];
        const latestStory = userStories[userStories.length - 1];
        const userInfo = usersData[ph] || {};
        const photo = userInfo.photoURL || latestStory.userAvatar;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => {
              setViewingUserPhone(ph);
              setCurrentStoryIndex(0);
            },
            className: "flex items-center gap-4 px-4 py-3.5 hover:bg-slate-50 cursor-pointer transition active:bg-slate-100",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full p-[2.5px] bg-gradient-to-tr from-emerald-400 to-[#2AABEE] shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: photo || NEUTRAL_AVATAR,
                  alt: userInfo.displayName || latestStory.userName,
                  referrerPolicy: "no-referrer",
                  className: "w-full h-full rounded-full object-cover border-2 border-white bg-slate-100"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-900 text-sm", children: userInfo.displayName || latestStory.userName || ph }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400", children: formatTimeAgo(latestStory.createdAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs mt-0.5 truncate max-w-[220px]", children: latestStory.caption || `${userStories.length} ${userStories.length === 1 ? "قصة" : "قصص"}` })
              ] })
            ]
          },
          ph
        );
      }),
      otherUsersPhones.length === 0 && myStatuses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center flex flex-col items-center justify-center text-slate-400 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-8 h-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-700", children: "لا توجد حالات حالياً" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 max-w-xs", children: 'كن أول من يشارك لحظاته اليومية! انقر على زر "إضافة حالة" لمشاركة صورة أو فيديو.' })
      ] })
    ] }),
    isCreating && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 dir-rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-5 space-y-4 relative shadow-2xl text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sky-400 font-bold text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إضافة حالة جديدة (28 ساعة)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleCloseCreate,
            className: "text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/5] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center", children: localPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            src: localPreview,
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
            className: "w-full h-full object-contain"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: localPreview, alt: "المعاينة", className: "w-full h-full object-contain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              if (localPreview) URL.revokeObjectURL(localPreview);
              setSelectedFile(null);
              setLocalPreview(null);
              setIsVideo(false);
            },
            className: "absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-full backdrop-blur-sm transition cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col items-center justify-center gap-2.5 cursor-pointer p-6 text-center w-full h-full hover:bg-slate-900/50 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-7 h-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-200 block", children: "اختر صورة أو فيديو للحالة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 block", children: "تدعم الصور والفيديوهات القصيرة حتى 28 ساعة" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*,video/*",
            onChange: handleFileSelect,
            className: "hidden"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: caption,
          onChange: (e) => setCaption(e.target.value),
          placeholder: "اكتب تعليقاً على حالتك...",
          className: "w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-[#2AABEE] transition text-right placeholder-slate-500"
        }
      ) }),
      uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-sky-400 font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: uploadSuccess ? "تم النشر بنجاح!" : "جارٍ نشر الحالة..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            uploadProgress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-slate-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-gradient-to-r from-sky-400 to-[#2AABEE] transition-all duration-300 rounded-full",
            style: { width: `${uploadProgress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleCloseCreate,
            disabled: uploading,
            className: "flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition cursor-pointer",
            children: "إلغاء"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handlePostStatus,
            disabled: !selectedFile || uploading,
            className: "flex-1 py-2.5 bg-gradient-to-r from-[#2AABEE] to-[#229ED9] hover:from-sky-400 hover:to-[#2AABEE] disabled:opacity-50 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-sky-500/20 cursor-pointer",
            children: uploadSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4 text-white" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تم النشر" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نشر الحالة" })
            ] })
          }
        )
      ] })
    ] }) }),
    viewingUserPhone && currentStory && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black flex flex-col justify-between p-3 sm:p-4 select-none dir-rtl",
        onMouseDown: () => setIsStoryPaused(true),
        onMouseUp: () => setIsStoryPaused(false),
        onTouchStart: () => setIsStoryPaused(true),
        onTouchEnd: () => setIsStoryPaused(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 z-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 w-full", children: activeViewingStories.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-1 h-1 bg-white/25 rounded-full overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-white transition-all duration-75",
                    style: {
                      width: idx < currentStoryIndex ? "100%" : idx === currentStoryIndex ? `${storyProgress}%` : "0%"
                    }
                  }
                )
              },
              s.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-white pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: usersData[viewingUserPhone]?.photoURL || currentStory.userAvatar || NEUTRAL_AVATAR,
                    alt: currentStory.userName,
                    referrerPolicy: "no-referrer",
                    className: "w-10 h-10 rounded-full object-cover border-2 border-white/30"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-extrabold text-sm leading-tight", children: usersData[viewingUserPhone]?.displayName || currentStory.userName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/80 flex items-center gap-1 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                    formatTimeAgo(currentStory.createdAt),
                    " • صالح لمدة 28 ساعة"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => handleDownloadStatus(currentStory.mediaUrl, !!isCurrentStoryVideo, e),
                    className: "p-2 text-white/90 hover:text-white rounded-full bg-black/40 backdrop-blur-md transition cursor-pointer",
                    title: "تحميل الحالة",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
                  }
                ),
                isCurrentStoryVideo && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    },
                    className: "p-2 text-white/90 hover:text-white rounded-full bg-black/40 backdrop-blur-md transition cursor-pointer",
                    title: isMuted ? "تشغيل الصوت" : "كتم الصوت",
                    children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4" })
                  }
                ),
                viewingUserPhone === userPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => handleDeleteStatus(currentStory.id, e),
                    className: "p-2 text-red-400 hover:text-red-300 rounded-full bg-black/40 backdrop-blur-md transition cursor-pointer",
                    title: "حذف هذه الحالة",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      setViewingUserPhone(null);
                      setCurrentStoryIndex(0);
                    },
                    className: "p-2 text-white/90 hover:text-white rounded-full bg-black/40 backdrop-blur-md transition cursor-pointer",
                    title: "إغلاق",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] })
            ] })
          ] }),
          statusToastMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-[#2AABEE] text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg border border-white/20 animate-fade-in", children: statusToastMessage }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 my-2 flex items-center justify-center overflow-hidden", children: [
            !isMediaLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" }) }),
            isCurrentStoryVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                ref: videoRef,
                src: currentStory.mediaUrl,
                autoPlay: true,
                playsInline: true,
                muted: isMuted,
                onCanPlay: () => setIsMediaLoaded(true),
                onTimeUpdate: (e) => {
                  if (e.currentTarget.duration && !isStoryPaused) {
                    setStoryProgress(e.currentTarget.currentTime / e.currentTarget.duration * 100);
                  }
                },
                onEnded: handleNextStory,
                className: `max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-opacity duration-300 ${isMediaLoaded ? "opacity-100" : "opacity-0"}`
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: currentStory.mediaUrl,
                alt: "الحالة",
                referrerPolicy: "no-referrer",
                onLoad: () => setIsMediaLoaded(true),
                className: `max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-opacity duration-300 ${isMediaLoaded ? "opacity-100" : "opacity-0"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  if (currentStoryIndex > 0) {
                    setCurrentStoryIndex((prev) => prev - 1);
                  }
                },
                className: "absolute left-0 top-0 bottom-0 w-1/3 opacity-0 hover:opacity-20 transition flex items-center justify-start pl-4 cursor-pointer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-10 h-10 text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  if (currentStoryIndex < activeViewingStories.length - 1) {
                    setCurrentStoryIndex((prev) => prev + 1);
                  } else {
                    setViewingUserPhone(null);
                  }
                },
                className: "absolute right-0 top-0 bottom-0 w-1/3 opacity-0 hover:opacity-20 transition flex items-center justify-end pr-4 cursor-pointer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-10 h-10 text-white" })
              }
            )
          ] }),
          currentStory.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-black/70 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center text-white text-xs sm:text-sm z-20 max-w-md mx-auto w-full mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium leading-relaxed", children: currentStory.caption }) }),
          viewingUserPhone !== userPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "z-30 w-full max-w-md mx-auto pt-1 pb-1 px-1 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: statusReplyText,
                onChange: (e) => setStatusReplyText(e.target.value),
                onFocus: () => setIsStoryPaused(true),
                onBlur: () => setIsStoryPaused(false),
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleSendStatusReply();
                },
                placeholder: `رد على ${usersData[viewingUserPhone]?.displayName || currentStory.userName}...`,
                className: "w-full bg-black/60 border border-white/20 text-white text-xs sm:text-sm px-4 py-2.5 rounded-full placeholder-white/60 focus:outline-none focus:border-[#2AABEE] backdrop-blur-md"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleSendStatusReply,
                disabled: !statusReplyText.trim(),
                className: "absolute left-1.5 p-2 rounded-full bg-[#2AABEE] text-white hover:bg-sky-400 disabled:opacity-40 transition cursor-pointer",
                title: "إرسال الرد",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) })
        ]
      }
    )
  ] });
}

function TelegramDrawer({
  isOpen = false,
  onClose,
  userId,
  userName,
  userEmail,
  userAbout,
  userPhone,
  userAvatar,
  isOnline = false,
  activeItem = "home",
  unreadMessagesCount = 0,
  onOpenHome,
  onOpenProfile,
  onOpenMessages,
  onOpenContacts,
  onOpenCallsTab,
  onOpenOnlineTab,
  onOpenProfileSettings,
  onOpenReels,
  onOpenLive,
  onOpenNotifications,
  onOpenCallModal,
  onLogout,
  isDesktopEmbedded = false,
  isCollapsed = false,
  onToggleCollapse
}) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showInstallGuide, setShowInstallGuide] = React.useState(false);
  const handleItemClick = (action) => {
    if (!isDesktopEmbedded && onClose) {
      onClose();
    }
    action?.();
  };
  const handleOpenProfile = () => {
    handleItemClick(onOpenProfile || onOpenProfileSettings);
  };
  const renderAvatar = (sizeClass = "w-14 h-14", textClass = "text-xl", showDot = true) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: handleOpenProfile,
      className: `relative ${sizeClass} rounded-full shrink-0 border-2 border-[#2AABEE] shadow-xs overflow-hidden bg-gradient-to-tr from-[#2AABEE] to-blue-600 flex items-center justify-center text-white font-bold cursor-pointer select-none group transition-transform hover:scale-105 active:scale-95`,
      title: "عرض وتعديل الملف الشخصي",
      children: [
        userAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: userAvatar,
            alt: userName || "مستخدم IMI",
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: textClass, children: userName ? userName.trim().charAt(0).toUpperCase() : "U" }),
        showDot && isOnline && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full shadow-xs",
            title: "متصل الآن"
          }
        )
      ]
    }
  );
  if (isDesktopEmbedded && isCollapsed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        "aria-label": "الشريط الجانبي الرئيسي المصغر",
        className: "w-[72px] h-full bg-white border-l border-slate-200 flex flex-col items-center py-4 justify-between select-none z-20 shrink-0 transition-all duration-300",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                onClick: () => handleItemClick(onOpenHome || onOpenMessages),
                className: "w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2AABEE] to-blue-600 text-white font-extrabold flex items-center justify-center shadow-xs cursor-pointer hover:shadow-md transition active:scale-95 text-xs",
                title: "IMI الرئيسية",
                children: "IMI"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: renderAvatar("w-10 h-10", "text-sm") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col items-center gap-2 my-auto py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleItemClick(onOpenHome || onOpenMessages),
                className: `relative p-2.5 rounded-2xl transition cursor-pointer group ${activeItem === "home" ? "bg-[#2AABEE] text-white shadow-md shadow-blue-500/20 font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`,
                title: "الرئيسية",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Home, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleOpenProfile,
                className: `relative p-2.5 rounded-2xl transition cursor-pointer group ${activeItem === "profile" ? "bg-[#2AABEE] text-white shadow-md font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`,
                title: "الملف الشخصي",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => handleItemClick(onOpenMessages),
                className: `relative p-2.5 rounded-2xl transition cursor-pointer group ${activeItem === "messages" ? "bg-[#2AABEE] text-white shadow-md font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`,
                title: "الرسائل",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5" }),
                  unreadMessagesCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white", children: unreadMessagesCount > 9 ? "9+" : unreadMessagesCount })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleItemClick(onOpenContacts),
                className: `relative p-2.5 rounded-2xl transition cursor-pointer group ${activeItem === "friends" ? "bg-[#2AABEE] text-white shadow-md font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`,
                title: "الأصدقاء وجهات الاتصال",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleItemClick(onOpenReels),
                className: `relative p-2.5 rounded-2xl transition cursor-pointer group ${activeItem === "reels" ? "bg-gradient-to-tr from-[#2AABEE] to-indigo-600 text-white shadow-md font-bold" : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"}`,
                title: "فيديوهات IMI (ريلز)",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => handleItemClick(onOpenLive),
                className: `relative p-2.5 rounded-2xl transition cursor-pointer group ${activeItem === "live" ? "bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-md font-bold" : "text-slate-600 hover:text-rose-600 hover:bg-rose-50"}`,
                title: "البث المباشر (LIVEIMI)",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-5 h-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleItemClick(onOpenNotifications),
                className: `relative p-2.5 rounded-2xl transition cursor-pointer group ${activeItem === "notifications" ? "bg-[#2AABEE] text-white shadow-md font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`,
                title: "الإشعارات والتنبيهات",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleItemClick(onOpenProfileSettings),
                className: `relative p-2.5 rounded-2xl transition cursor-pointer group ${activeItem === "settings" ? "bg-[#2AABEE] text-white shadow-md font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`,
                title: "إعدادات الحساب",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 pt-2 border-t border-slate-200 w-full px-2", children: [
            onToggleCollapse && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onToggleCollapse,
                className: "p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer",
                title: "توسيع الشريط الجانبي",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onLogout,
                className: "p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition cursor-pointer",
                title: "تسجيل الخروج",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5" })
              }
            )
          ] })
        ]
      }
    );
  }
  const renderSidebarBody = (isDrawer = false) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full bg-white text-slate-900 select-none overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 relative shrink-0", children: [
      isDrawer && onClose ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "absolute top-4 left-4 p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer",
          "aria-label": "إغلاق الشريط الجانبي",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      ) : onToggleCollapse ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onToggleCollapse,
          className: "absolute top-4 left-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer",
          title: "طي الشريط الجانبي",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
        }
      ) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5", children: [
        renderAvatar("w-14 h-14", "text-xl", true),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: handleOpenProfile,
            className: "flex-1 min-w-0 cursor-pointer group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-extrabold text-slate-900 tracking-tight truncate group-hover:text-[#2AABEE] transition", children: userName || "مستخدم IMI" }),
                userPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "حساب موثق", className: "inline-flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4 text-[#2AABEE] shrink-0" }) })
              ] }),
              userEmail ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-medium truncate dir-ltr text-right mt-0.5", title: userEmail, children: userEmail }) : userPhone ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#2AABEE] font-mono dir-ltr text-right mt-0.5 truncate", children: userPhone }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-0.5 truncate", children: "عضو تطبيق IMI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${isOnline ? "bg-blue-500" : "bg-slate-300"}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-500 font-medium", children: isOnline ? "متصل الآن" : "غير متصل" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5 p-3 bg-slate-50/90 border border-slate-200/90 rounded-2xl text-[11px] space-y-1.5 shadow-2xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-medium", children: "الاسم الحقيقي:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-900 truncate max-w-[140px]", children: userName || "غير محدد" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-medium", children: "البريد الإلكتروني:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800 dir-ltr truncate max-w-[140px]", title: userEmail || "غير مرتبط", children: userEmail || "غير مرتبط" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-medium", children: "رقم الهاتف:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-slate-900 dir-ltr", children: userPhone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-emerald-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3 h-3 text-emerald-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: userPhone })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-normal", children: "غير مسجل" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-slate-200/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-medium", children: "حالة الحساب:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3 text-emerald-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حساب نشط وموثق" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto py-2.5 px-2.5 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleItemClick(onOpenHome || onOpenMessages),
          className: `w-full px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition cursor-pointer text-right group ${activeItem === "home" ? "bg-[#2AABEE]/15 text-[#2AABEE] font-extrabold" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-xl flex items-center justify-center transition ${activeItem === "home" ? "bg-[#2AABEE] text-white shadow-xs" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Home, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold flex-1", children: "الرئيسية" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleOpenProfile,
          className: `w-full px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition cursor-pointer text-right group ${activeItem === "profile" ? "bg-[#2AABEE]/15 text-[#2AABEE] font-extrabold" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-xl flex items-center justify-center transition ${activeItem === "profile" ? "bg-[#2AABEE] text-white shadow-xs" : "bg-blue-50 text-[#2AABEE] group-hover:bg-[#2AABEE] group-hover:text-white"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold flex-1", children: "الملف الشخصي" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleItemClick(onOpenMessages),
          className: `w-full px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition cursor-pointer text-right group ${activeItem === "messages" ? "bg-[#2AABEE]/15 text-[#2AABEE] font-extrabold" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-xl flex items-center justify-center transition ${activeItem === "messages" ? "bg-[#2AABEE] text-white shadow-xs" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold flex-1", children: "الرسائل" }),
            unreadMessagesCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-full shadow-xs", children: unreadMessagesCount })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleItemClick(onOpenContacts),
          className: `w-full px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition cursor-pointer text-right group ${activeItem === "friends" ? "bg-[#2AABEE]/15 text-[#2AABEE] font-extrabold" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-xl flex items-center justify-center transition ${activeItem === "friends" ? "bg-[#2AABEE] text-white shadow-xs" : "bg-blue-50 text-[#2AABEE] group-hover:bg-[#2AABEE] group-hover:text-white"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "الأصدقاء" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "جهات الاتصال ودليل الأرقام" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleItemClick(onOpenReels),
          className: `w-full px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition cursor-pointer text-right group ${activeItem === "reels" ? "bg-indigo-50 text-indigo-700 font-extrabold" : "text-slate-700 hover:bg-indigo-50/60 hover:text-indigo-600"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-xl flex items-center justify-center transition ${activeItem === "reels" ? "bg-indigo-600 text-white shadow-xs" : "bg-gradient-to-tr from-[#2AABEE] to-indigo-600 text-white shadow-2xs"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "الفيديو / Reels" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold", children: "ريلز" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleItemClick(onOpenLive),
          className: `w-full px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition cursor-pointer text-right group ${activeItem === "live" ? "bg-rose-50 text-rose-700 font-extrabold" : "text-slate-700 hover:bg-rose-50/60 hover:text-rose-600"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-xl flex items-center justify-center transition ${activeItem === "live" ? "bg-rose-600 text-white shadow-xs" : "bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-2xs"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Live (بث مباشر)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-white animate-ping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مباشر" })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleItemClick(onOpenNotifications),
          className: `w-full px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition cursor-pointer text-right group ${activeItem === "notifications" ? "bg-[#2AABEE]/15 text-[#2AABEE] font-extrabold" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-xl flex items-center justify-center transition ${activeItem === "notifications" ? "bg-[#2AABEE] text-white shadow-xs" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold flex-1", children: "الإشعارات" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleItemClick(onOpenProfileSettings),
          className: `w-full px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition cursor-pointer text-right group ${activeItem === "settings" ? "bg-[#2AABEE]/15 text-[#2AABEE] font-extrabold" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-xl flex items-center justify-center transition ${activeItem === "settings" ? "bg-[#2AABEE] text-white shadow-xs" : "bg-amber-50 text-amber-600 group-hover:bg-amber-100"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold flex-1", children: "الإعدادات" })
          ]
        }
      ),
      !isInstalled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            if (isInstallable) {
              install();
            } else {
              setShowInstallGuide(true);
            }
          },
          className: "w-full px-3.5 py-2.5 rounded-2xl flex items-center gap-3 transition cursor-pointer text-right group bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200 mt-1 shadow-2xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl flex items-center justify-center bg-sky-600 text-white shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold block truncate", children: "تثبيت التطبيق على هاتفك" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-sky-600 block truncate", children: "إضافة أيقونة التطبيق لشاشة الهاتف" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-sky-600 shrink-0" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 border-t border-slate-200/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            window.location.hash = "";
            window.location.reload();
          },
          className: "w-full px-3.5 py-2.5 rounded-xl flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition cursor-pointer text-right text-xs font-bold border border-blue-200 dark:border-slate-700 shadow-2xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "محول المواقع إلى تطبيقات (App Studio) 📱" })
          ]
        }
      ),
      onOpenCallsTab && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleItemClick(onOpenCallsTab),
          className: "w-full px-3.5 py-2 rounded-xl flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer text-right text-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-emerald-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "سجل المكالمات" })
          ]
        }
      ),
      onOpenOnlineTab && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleItemClick(onOpenOnlineTab),
          className: "w-full px-3.5 py-2 rounded-xl flex items-center gap-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer text-right text-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4 text-[#2AABEE]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الأصدقاء المتصلين الآن" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 my-2 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-emerald-600 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col text-[10px] leading-snug", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-emerald-950", children: "تشفير تام للاتصال (E2EE)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-800", children: "حماية المحادثات والمكالمات بتقنية AES-256" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-slate-200 bg-white shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onLogout,
        className: "w-full py-2.5 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer active:scale-98",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تسجيل الخروج" })
        ]
      }
    ) })
  ] });
  if (isDesktopEmbedded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          "aria-label": "الشريط الجانبي الرئيسي",
          className: "w-[280px] h-full bg-white border-l border-slate-200 flex flex-col select-none z-20 shrink-0 transition-all duration-300",
          children: renderSidebarBody(false)
        }
      ),
      showInstallGuide && /* @__PURE__ */ jsxRuntimeExports.jsx(InstallInstructionsModal, { isIOS, onClose: () => setShowInstallGuide(false) })
    ] });
  }
  if (!isOpen) {
    return showInstallGuide ? /* @__PURE__ */ jsxRuntimeExports.jsx(InstallInstructionsModal, { isIOS, onClose: () => setShowInstallGuide(false) }) : null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex dir-rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-80 max-w-[85%] h-full bg-white text-slate-900 flex flex-col shadow-2xl z-50 transform transition-transform duration-300 ease-out border-l border-slate-200", children: renderSidebarBody(true) }),
    showInstallGuide && /* @__PURE__ */ jsxRuntimeExports.jsx(InstallInstructionsModal, { isIOS, onClose: () => setShowInstallGuide(false) })
  ] });
}

const NotificationsModal = ({
  isOpen,
  onClose,
  unreadCount,
  userName,
  onOpenMessages,
  onOpenLive
}) => {
  const [soundEnabled, setSoundEnabled] = reactExports.useState(() => {
    return localStorage.getItem("imi_sound_enabled") !== "false";
  });
  const [browserPermission, setBrowserPermission] = reactExports.useState(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "default";
  });
  const [testedSound, setTestedSound] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setBrowserPermission(Notification.permission);
    }
  }, [isOpen]);
  if (!isOpen) return null;
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("imi_sound_enabled", String(next));
  };
  const handleTestSound = () => {
    notificationService.playMessageTone();
    setTestedSound(true);
    setTimeout(() => setTestedSound(false), 1500);
  };
  const handleRequestPushPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const perm = await Notification.requestPermission();
        setBrowserPermission(perm);
      } catch (err) {
        console.warn("Notification permission request error:", err);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200 dir-rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-[#2AABEE] to-blue-600 text-white p-5 flex items-center justify-between shrink-0 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-6 h-6 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base sm:text-lg font-bold", children: "مركز الإشعارات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-100", children: "إدارة التنبيهات والأصوات لتطبيق IMI" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 rounded-full hover:bg-white/20 transition cursor-pointer text-white/90 hover:text-white",
          "aria-label": "إغلاق",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto p-5 space-y-4 flex-1 text-slate-800 text-xs", children: [
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => {
            onClose();
            onOpenMessages?.();
          },
          className: "p-3.5 bg-blue-50/90 border border-blue-200 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-blue-100/80 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-[#2AABEE] text-white flex items-center justify-center font-bold", children: unreadCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-900", children: "لديك رسائل جديدة غير مقروءة" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500", children: "انقر للذهاب مباشرة إلى صندوق المحادثات" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#2AABEE] font-bold text-xs", children: "عرض" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-blue-100 text-[#2AABEE] flex items-center justify-center", children: soundEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-900", children: "أصوات التنبيه (Message Chimes)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500", children: "صوت نغمة واتساب المميزة عند وصول رسالة جديدة" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleToggleSound,
              className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${soundEnabled ? "bg-[#2AABEE]" : "bg-slate-300"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${soundEnabled ? "-translate-x-5" : "translate-x-0"}`
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 flex items-center justify-between border-t border-slate-200/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-500", children: "تجربة نغمة الإشعار:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleTestSound,
              className: "px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 font-bold text-[11px] text-[#2AABEE] transition cursor-pointer flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: testedSound ? "تم التشغيل 🔔" : "تشغيل النغمة" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-900", children: "إشعارات المتصفح والنظام" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500", children: "استلام إشعارات بالرسائل والمكالمات عند تصغير التطبيق" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `px-2 py-0.5 rounded-full font-bold text-[10px] ${browserPermission === "granted" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`,
              children: browserPermission === "granted" ? "مفعلة" : "غير مفعلة"
            }
          )
        ] }),
        browserPermission !== "granted" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleRequestPushPermission,
            className: "w-full py-2 bg-[#2AABEE] hover:bg-blue-600 text-white font-bold rounded-xl transition text-[11px] cursor-pointer",
            children: "طلب تفعيل إشعارات المتصفح"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-slate-500 px-1", children: "تنبيهات النظام الأخيرة:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-emerald-50/80 border border-emerald-200/70 rounded-2xl flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-emerald-950 block", children: "حماية التشفير التام نشطة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-emerald-800", children: "جميع المحادثات والمكالمات مشفرة ومحمية ببروتوكولات AES-256 و DTLS." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-[#2AABEE] shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-slate-900 block", children: [
              "مرحباً بك في IMI يا ",
              userName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-500", children: "تطبيق المحادثات، البث المباشر، ومقاطع الفيديو القصيرة." })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        className: "px-5 py-2 bg-slate-800 text-white hover:bg-slate-900 rounded-xl text-xs font-bold transition cursor-pointer",
        children: "إغلاق"
      }
    ) })
  ] }) });
};

function normalizePhoneNumber(raw) {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";
  let cleaned = trimmed.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("00")) {
    cleaned = "+" + cleaned.substring(2);
  }
  if (/^0[567]\d{8}$/.test(cleaned)) {
    cleaned = "+212" + cleaned.substring(1);
  } else if (/^[567]\d{8}$/.test(cleaned)) {
    cleaned = "+212" + cleaned;
  } else if (cleaned.startsWith("212") && !cleaned.startsWith("+") && cleaned.length >= 11) {
    cleaned = "+" + cleaned;
  }
  return cleaned;
}
const contactsService = {
  /**
   * Search registered users by phone number using Firestore where clauses
   * and multi-format reverse matching (E.164, local, clean digits).
   */
  async searchUserByPhone(rawPhone, excludeUserId) {
    const normalized = normalizePhoneNumber(rawPhone);
    if (!normalized || normalized.length < 5) return null;
    try {
      const usersRef = collection(db, "users");
      const candidates = /* @__PURE__ */ new Set();
      candidates.add(normalized);
      if (normalized.startsWith("+")) {
        candidates.add(normalized.substring(1));
      }
      if (normalized.startsWith("+212") && normalized.length === 13) {
        candidates.add("0" + normalized.substring(4));
        candidates.add(normalized.substring(4));
      }
      for (const candidate of candidates) {
        const q = query(usersRef, where("phoneNumber", "==", candidate), limit(1));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const d = snap.docs[0];
          if (d.id !== excludeUserId && d.data()?.authUid !== excludeUserId) {
            const data = d.data();
            return {
              id: d.id,
              authUid: data.authUid || d.id,
              displayName: data.displayName || "مستخدم IMI",
              phoneNumber: data.phoneNumber || normalized,
              photoURL: data.photoURL,
              about: data.about,
              online: !!data.online,
              lastSeen: data.lastSeen
            };
          }
        }
      }
      return await findRegisteredUserByPhone(rawPhone, excludeUserId);
    } catch (err) {
      console.warn("[contactsService] searchUserByPhone error:", err);
      return await findRegisteredUserByPhone(rawPhone, excludeUserId);
    }
  },
  /**
   * Add or update contact in user's contacts collection with reverse lookup
   */
  async addContact(currentUserId, contact) {
    const normalizedPhone = normalizePhoneNumber(contact.phoneNumber);
    if (!normalizedPhone || normalizedPhone.length < 5) {
      throw new Error("رقم الهاتف غير صالح");
    }
    const cleanDocId = normalizedPhone.replace(/[^\w+]/g, "_");
    const contactRef = doc(db, "users", currentUserId, "contacts", cleanDocId);
    const registeredUser = await this.searchUserByPhone(normalizedPhone, currentUserId);
    const record = {
      id: cleanDocId,
      phoneNumber: normalizedPhone,
      name: contact.name.trim() || registeredUser?.displayName || normalizedPhone,
      authUid: registeredUser?.authUid,
      displayName: registeredUser?.displayName,
      photoURL: registeredUser?.photoURL,
      about: registeredUser?.about,
      online: registeredUser?.online || false,
      lastSeen: registeredUser?.lastSeen,
      isBlocked: false,
      isRegistered: !!registeredUser,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    await setDoc(contactRef, record, { merge: true });
    return record;
  },
  /**
   * Delete contact
   */
  async removeContact(currentUserId, contactId) {
    const contactRef = doc(db, "users", currentUserId, "contacts", contactId);
    await deleteDoc(contactRef);
  },
  /**
   * Block or unblock a user/contact
   */
  async setContactBlocked(currentUserId, contactId, isBlocked) {
    const contactRef = doc(db, "users", currentUserId, "contacts", contactId);
    await setDoc(contactRef, { isBlocked, updatedAt: Date.now() }, { merge: true });
    const blockedRef = doc(db, "users", currentUserId, "blockedUsers", contactId);
    if (isBlocked) {
      await setDoc(blockedRef, { blockedAt: Date.now() });
    } else {
      await deleteDoc(blockedRef).catch(() => {
      });
    }
  },
  /**
   * Sync contacts from phonebook using:
   * 1. Android Native Bridge (`androidBridge.requestContacts()`) if inside Android WebView
   * 2. Modern Web Contacts Picker (`navigator.contacts.select()`) if in browser
   */
  async syncPhonebookContacts(currentUserId) {
    let rawList = [];
    const isNative = androidBridge.isNative();
    if (isNative) {
      try {
        const nativeContacts = androidBridge.requestContacts();
        if (Array.isArray(nativeContacts) && nativeContacts.length > 0) {
          rawList = nativeContacts.map((c) => ({
            name: c.name || "بدون اسم",
            phoneNumber: c.phoneNumber || ""
          }));
        } else {
          androidBridge.requestContactsPermission();
        }
      } catch (err) {
        console.warn("[contactsService] Android native bridge contacts error:", err);
      }
    }
    if (rawList.length === 0 && "contacts" in navigator && "ContactsManager" in window) {
      try {
        const props = ["name", "tel"];
        const webContacts = await navigator.contacts.select(props, { multiple: true });
        if (Array.isArray(webContacts)) {
          for (const item of webContacts) {
            const phones = item.tel || [];
            const name = item.name && item.name[0] ? item.name[0] : "";
            for (const p of phones) {
              if (p) rawList.push({ name: name || p, phoneNumber: p });
            }
          }
        }
      } catch (e) {
        console.warn("Web Contacts picker cancelled or failed:", e);
      }
    }
    if (rawList.length === 0) {
      return { syncedCount: 0, registeredCount: 0, isNative };
    }
    return await this.importContacts(currentUserId, rawList);
  },
  /**
   * Batch import a list of contacts and perform reverse lookup matching
   */
  async importContacts(currentUserId, rawList) {
    let syncedCount = 0;
    let registeredCount = 0;
    const isNative = androidBridge.isNative();
    const seen = /* @__PURE__ */ new Set();
    const uniqueItems = [];
    for (const item of rawList) {
      const norm = normalizePhoneNumber(item.phoneNumber);
      if (norm && norm.length >= 6 && !seen.has(norm)) {
        seen.add(norm);
        uniqueItems.push({ name: item.name || norm, phoneNumber: norm });
      }
    }
    for (const item of uniqueItems) {
      try {
        const added = await this.addContact(currentUserId, {
          phoneNumber: item.phoneNumber,
          name: item.name
        });
        syncedCount++;
        if (added.isRegistered) registeredCount++;
      } catch (e) {
        console.warn("Sync contact item failed:", e);
      }
    }
    return { syncedCount, registeredCount, isNative };
  },
  /**
   * Re-evaluate reverse matching for existing contacts to see if non-registered
   * contacts have recently joined IMI.
   */
  async refreshRegisteredStatus(currentUserId, contacts) {
    let newRegisteredCount = 0;
    let checkedCount = 0;
    for (const contact of contacts) {
      if (!contact.isRegistered || !contact.authUid) {
        checkedCount++;
        const regUser = await this.searchUserByPhone(contact.phoneNumber, currentUserId);
        if (regUser) {
          const contactRef = doc(db, "users", currentUserId, "contacts", contact.id);
          await updateDoc(contactRef, {
            authUid: regUser.authUid,
            displayName: regUser.displayName,
            photoURL: regUser.photoURL || null,
            about: regUser.about || null,
            online: regUser.online || false,
            lastSeen: regUser.lastSeen || null,
            isRegistered: true,
            updatedAt: Date.now()
          });
          newRegisteredCount++;
        }
      }
    }
    return { checkedCount, newRegisteredCount };
  },
  /**
   * Subscribe to user contacts with real-time updates
   */
  subscribeToContacts(currentUserId, onUpdate) {
    const contactsCol = collection(db, "users", currentUserId, "contacts");
    return onSnapshot(contactsCol, async (snapshot) => {
      const contacts = [];
      snapshot.forEach((d) => {
        contacts.push({ ...d.data(), id: d.id });
      });
      contacts.sort((a, b) => {
        if (a.isRegistered && !b.isRegistered) return -1;
        if (!a.isRegistered && b.isRegistered) return 1;
        return (a.name || "").localeCompare(b.name || "");
      });
      onUpdate(contacts);
    }, (err) => {
      console.warn("[contactsService] subscribe error:", err);
    });
  }
};

function ContactSearch({
  currentUserId,
  onSelectUser,
  onStartCall,
  onContactAdded
}) {
  const [phoneNumber, setPhoneNumber] = reactExports.useState("");
  const [isSearching, setIsSearching] = reactExports.useState(false);
  const [searchResult, setSearchResult] = reactExports.useState(null);
  const [hasSearched, setHasSearched] = reactExports.useState(false);
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const [addedSuccess, setAddedSuccess] = reactExports.useState(false);
  const [customName, setCustomName] = reactExports.useState("");
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    const clean = phoneNumber.trim();
    if (!clean || clean.length < 4) return;
    setIsSearching(true);
    setHasSearched(true);
    setSearchResult(null);
    setAddedSuccess(false);
    try {
      const user = await contactsService.searchUserByPhone(clean, currentUserId);
      setSearchResult(user);
      if (user) {
        setCustomName(user.displayName);
      }
    } catch (err) {
      console.warn("[ContactSearch] Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };
  const handleAddContact = async () => {
    if (!searchResult) return;
    setIsAdding(true);
    try {
      await contactsService.addContact(currentUserId, {
        phoneNumber: searchResult.phoneNumber,
        name: customName.trim() || searchResult.displayName
      });
      setAddedSuccess(true);
      if (onContactAdded) onContactAdded();
    } catch (err) {
      console.warn("[ContactSearch] Add contact error:", err);
    } finally {
      setIsAdding(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white dark:bg-slate-900 rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 dark:border-slate-800 dir-rtl text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 dark:text-white text-base", children: "البحث برقم الهاتف" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "ابحث عن أي مستخدم مسجل على IMI عبر رقم هاتفه" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "tel",
            dir: "ltr",
            placeholder: "+212600000000 أو 0600000000",
            value: phoneNumber,
            onChange: (e) => {
              setPhoneNumber(e.target.value);
              if (hasSearched) setHasSearched(false);
            },
            className: "w-full px-4 py-3 pl-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-left"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          disabled: isSearching || phoneNumber.trim().length < 4,
          className: "px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl text-sm transition flex items-center gap-2 shrink-0 cursor-pointer shadow-sm",
          children: [
            isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بحث" })
          ]
        }
      )
    ] }),
    isSearching && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-6 h-6 animate-spin text-emerald-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جاري البحث في قاعدة بيانات المستخدمين..." })
    ] }),
    !isSearching && hasSearched && !searchResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "لم يتم العثور على مستخدم مسجل بهذا الرقم" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-90 mt-0.5", children: "تأكد من كتابة الرقم مع رمز الدولة (مثال: +212 أو +966 أو +20)." })
      ] })
    ] }),
    !isSearching && searchResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-emerald-500/30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            searchResult.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: searchResult.photoURL,
                alt: searchResult.displayName,
                className: "w-13 h-13 rounded-2xl object-cover border-2 border-emerald-500/40"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-13 h-13 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold text-lg", children: searchResult.displayName.charAt(0) || /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6" }) }),
            isUserOnline(searchResult.lastSeen, searchResult.online) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-white dark:border-slate-800 rounded-full" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 dark:text-white text-base", children: searchResult.displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-slate-500 dark:text-slate-400 dir-ltr text-right", children: searchResult.phoneNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mt-1", children: isUserOnline(searchResult.lastSeen, searchResult.online) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-blue-600 dark:text-blue-400 font-semibold", children: "متصل الآن" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-slate-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              formatLastSeen(searchResult.lastSeen, searchResult.online)
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20", children: "مسجل في IMI" })
      ] }),
      searchResult.about && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50", children: [
        '"',
        searchResult.about,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelectUser(searchResult),
            className: "py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "محادثة" })
            ]
          }
        ),
        onStartCall && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onStartCall(searchResult.phoneNumber, searchResult.displayName, "voice"),
              className: "py-2.5 px-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-emerald-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "صوت" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onStartCall(searchResult.phoneNumber, searchResult.displayName, "video"),
              className: "py-2.5 px-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4 text-sky-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فيديو" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            disabled: isAdding || addedSuccess,
            onClick: handleAddContact,
            className: `py-2.5 px-3 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${addedSuccess ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30" : "bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"}`,
            children: isAdding ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : addedSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تمت الإضافة" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حفظ بجهاتي" })
            ] })
          }
        )
      ] })
    ] })
  ] });
}

function AddContactModal({
  isOpen,
  onClose,
  currentUserId,
  onSuccess
}) {
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(false);
  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone.length < 6) {
      setError("يرجى إدخال رقم هاتف صحيح");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await contactsService.addContact(currentUserId, {
        phoneNumber: cleanPhone,
        name: name.trim() || cleanPhone
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setPhone("");
        if (onSuccess) onSuccess();
        onClose();
      }, 1e3);
    } catch (err) {
      setError(err?.message || "فشل إضافة جهة الاتصال");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 dir-rtl text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 dark:text-white text-base", children: "إضافة جهة اتصال جديدة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "احفظ أصدقاءك بالاسم ورقم الهاتف" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5", children: "اسم جهة الاتصال (اختياري)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "مثال: أحمد المغربي",
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "w-full px-4 py-3 pl-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5", children: "رقم الهاتف (مع رمز الدولة)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "tel",
              dir: "ltr",
              required: true,
              placeholder: "+212600000000",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              className: "w-full px-4 py-3 pl-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "إذا كان الرقم مسجلاً على IMI، سيتم ربط الصورة وحالة الاتصال تلقائياً." })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
      ] }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تمت إضافة جهة الاتصال بنجاح!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            disabled: isLoading || success,
            className: "flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-sm",
            children: [
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : success ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: success ? "تم الحفظ" : "حفظ جهة الاتصال" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl text-sm transition cursor-pointer",
            children: "إلغاء"
          }
        )
      ] })
    ] })
  ] }) });
}

function ContactProfile({
  contact,
  currentUserId,
  isOpen,
  onClose,
  onStartChat,
  onStartCall,
  onContactUpdated
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const [isBlocking, setIsBlocking] = reactExports.useState(false);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  if (!isOpen) return null;
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contact.phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleToggleBlock = async () => {
    setIsBlocking(true);
    try {
      const nextBlocked = !contact.isBlocked;
      await contactsService.setContactBlocked(currentUserId, contact.id, nextBlocked);
      if (onContactUpdated) onContactUpdated();
    } catch (err) {
      console.warn("[ContactProfile] Block toggle failed:", err);
    } finally {
      setIsBlocking(false);
    }
  };
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setIsDeleting(true);
    try {
      await contactsService.removeContact(currentUserId, contact.id);
      if (onContactUpdated) onContactUpdated();
      onClose();
    } catch (err) {
      console.warn("[ContactProfile] Delete failed:", err);
    } finally {
      setIsDeleting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 dir-rtl text-right overflow-hidden space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider", children: "معلومات جهة الاتصال" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        contact.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: contact.photoURL,
            alt: contact.name,
            className: "w-24 h-24 rounded-3xl object-cover border-4 border-emerald-500/30 shadow-xl"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-3xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold text-3xl shadow-xl", children: contact.name.charAt(0) || /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-12 h-12" }) }),
        isUserOnline(contact.lastSeen, contact.online) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 right-1 w-5 h-5 bg-blue-500 border-3 border-white dark:border-slate-900 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800 dark:text-white", children: contact.name }),
        contact.displayName && contact.displayName !== contact.name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 mt-0.5", children: [
          "(",
          contact.displayName,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1.5 mt-1.5", children: isUserOnline(contact.lastSeen, contact.online) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-pulse" }),
          "متصل الآن"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-slate-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
          formatLastSeen(contact.lastSeen, contact.online)
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-emerald-500 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400 block", children: "رقم الهاتف" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold font-mono text-slate-800 dark:text-white dir-ltr", children: contact.phoneNumber })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleCopyPhone,
            className: "p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-500 hover:text-emerald-500 transition cursor-pointer shadow-xs",
            title: "نسخ الرقم",
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
          }
        )
      ] }),
      contact.about && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-slate-200/60 dark:border-slate-700/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400 block mb-0.5", children: "الحالة / الأخبار" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-700 dark:text-slate-200", children: [
          '"',
          contact.about,
          '"'
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            onClose();
            onStartChat({
              authUid: contact.authUid || contact.id,
              displayName: contact.name || contact.displayName || contact.phoneNumber,
              phoneNumber: contact.phoneNumber
            });
          },
          className: "py-3 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex flex-col items-center justify-center gap-1.5 transition cursor-pointer shadow-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "محادثة" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            if (onStartCall) {
              onClose();
              onStartCall(contact.phoneNumber, contact.name, "voice");
            }
          },
          className: "py-3 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-2xl text-xs flex flex-col items-center justify-center gap-1.5 transition cursor-pointer shadow-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-emerald-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مكالمة صوتية" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            if (onStartCall) {
              onClose();
              onStartCall(contact.phoneNumber, contact.name, "video");
            }
          },
          className: "py-3 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-2xl text-xs flex flex-col items-center justify-center gap-1.5 transition cursor-pointer shadow-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5 text-sky-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مكالمة فيديو" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          disabled: isBlocking,
          onClick: handleToggleBlock,
          className: `w-full py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${contact.isBlocked ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20" : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              contact.isBlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: contact.isBlocked ? "إلغاء حظر المستخدم" : "حظر هذا المستخدم" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-80", children: contact.isBlocked ? "المستخدم محظور حالياً" : "منع الرسائل والمكالمات" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          disabled: isDeleting,
          onClick: handleDelete,
          className: `w-full py-2 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${confirmDelete ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20" : "text-slate-400 hover:text-rose-500"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: confirmDelete ? "تأكيد الحذف نهائياً؟ اضغط هنا" : "حذف من جهات الاتصال" })
          ]
        }
      )
    ] })
  ] }) });
}

function ContactList({
  currentUserId,
  onStartChat,
  onStartCall
}) {
  const [contacts, setContacts] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [filterTab, setFilterTab] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [showSearchPhone, setShowSearchPhone] = reactExports.useState(false);
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [selectedContact, setSelectedContact] = reactExports.useState(null);
  const [isSyncing, setIsSyncing] = reactExports.useState(false);
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const [statusBanner, setStatusBanner] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!currentUserId) return;
    setIsLoading(true);
    const unsubscribe = contactsService.subscribeToContacts(currentUserId, (data) => {
      setContacts(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [currentUserId]);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      window.onAndroidContactsPermissionChanged = (granted) => {
        if (granted) {
          handleSyncPhonebook();
        }
      };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete window.onAndroidContactsPermissionChanged;
      }
    };
  }, [currentUserId]);
  const showToast = (message, type = "success", durationMs = 4e3) => {
    setStatusBanner({ message, type });
    setTimeout(() => setStatusBanner(null), durationMs);
  };
  const handleSyncPhonebook = reactExports.useCallback(async () => {
    if (!currentUserId || isSyncing) return;
    setIsSyncing(true);
    showToast("جاري فحص جهات اتصال الهاتف ومطابقتها مع مستخدمي IMI...", "info", 6e3);
    try {
      const res = await contactsService.syncPhonebookContacts(currentUserId);
      if (res.syncedCount > 0) {
        showToast(
          `تمت مزامنة ${res.syncedCount} جهة اتصال (${res.registeredCount} مسجلين على IMI جاهزون للتواصل!)`,
          "success",
          5e3
        );
      } else if (res.isNative) {
        showToast("يرجى منح إذن قراءة جهات الاتصال في هاتفك لإتمام المزامنة.", "info", 5e3);
      } else {
        showToast("يمكنك تحديد جهات الاتصال من هاتفك عبر نافذة النظام أو إضافتها يدوياً.", "info", 4e3);
      }
    } catch (err) {
      console.warn("Sync failed:", err);
      showToast("تعذرت مزامنة جهات الاتصال، يرجى المحاولة لاحقاً", "error", 4e3);
    } finally {
      setIsSyncing(false);
    }
  }, [currentUserId, isSyncing]);
  const handleRefreshRegistration = async () => {
    if (!currentUserId || isRefreshing) return;
    setIsRefreshing(true);
    showToast("جاري إعادة فحص ومطابقة أرقام الهواتف مع المسجلين الجدد في IMI...", "info", 4e3);
    try {
      const res = await contactsService.refreshRegisteredStatus(currentUserId, contacts);
      if (res.newRegisteredCount > 0) {
        showToast(`رائع! تم اكتشاف ${res.newRegisteredCount} من أصدقائك انضموا حديثاً إلى IMI 🎉`, "success", 5e3);
      } else {
        showToast("جهات الاتصال محدثة بالكامل مع قاعدة بيانات IMI.", "info", 3e3);
      }
    } catch (err) {
      console.warn("Refresh registration error:", err);
      showToast("تعذر تحديث حالة الحسابات", "error", 3e3);
    } finally {
      setIsRefreshing(false);
    }
  };
  const handleInviteContact = (contact) => {
    const inviteUrl = "https://imi-studio.ai.studio/";
    const inviteText = `مرحباً! أنا أستخدم تطبيق IMI للتواصل والمكالمات الصوتية والمرئية عالية الجودة ومشاركة الفيديوهات. انضم إلي الآن عبر الرابط:
${inviteUrl}`;
    const cleanPhoneDigits = contact.phoneNumber.replace(/[^\d]/g, "");
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "دعوة للانضمام إلى IMI",
        text: inviteText,
        url: inviteUrl
      }).then(() => {
        showToast(`تم فتح نافذة إرسال الدعوة لـ ${contact.name}`, "success");
      }).catch((err) => {
        if (err.name !== "AbortError") {
          openWhatsAppInvite(cleanPhoneDigits, inviteText);
        }
      });
      return;
    }
    openWhatsAppInvite(cleanPhoneDigits, inviteText);
  };
  const openWhatsAppInvite = (digits, text) => {
    const encoded = encodeURIComponent(text);
    const targetUrl = digits ? `https://api.whatsapp.com/send?phone=${digits}&text=${encoded}` : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(targetUrl, "_blank");
    showToast("تم فتح واتساب لإرسال رسالة الدعوة", "success", 4e3);
  };
  const { registeredContacts, unregisteredContacts, onlineContacts, blockedContacts } = reactExports.useMemo(() => {
    const reg = [];
    const unreg = [];
    const online = [];
    const blocked = [];
    const q = searchQuery.trim().toLowerCase();
    for (const c of contacts) {
      if (c.isBlocked) {
        blocked.push(c);
        continue;
      }
      let matches = true;
      if (q) {
        const matchesName = (c.name || "").toLowerCase().includes(q);
        const matchesPhone = (c.phoneNumber || "").includes(q);
        const matchesDisplay = (c.displayName || "").toLowerCase().includes(q);
        matches = matchesName || matchesPhone || matchesDisplay;
      }
      if (!matches) continue;
      if (c.isRegistered) {
        reg.push(c);
        if (isUserOnline(c.lastSeen, c.online)) online.push(c);
      } else {
        unreg.push(c);
      }
    }
    return {
      registeredContacts: reg,
      unregisteredContacts: unreg,
      onlineContacts: online,
      blockedContacts: blocked
    };
  }, [contacts, searchQuery]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col bg-slate-50/50 dark:bg-slate-950 dir-rtl text-right overflow-hidden select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 space-y-3 shadow-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-800 dark:text-white", children: "جهات الاتصال" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [
              registeredContacts.length,
              " على IMI • ",
              unregisteredContacts.length,
              " دعوة • ",
              onlineContacts.length,
              " متصل"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleRefreshRegistration,
              disabled: isRefreshing,
              className: "p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition flex items-center gap-1 text-xs font-semibold cursor-pointer shadow-xs",
              title: "تحديث ومطابقة المسجلين الجدد",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 text-emerald-600 dark:text-emerald-400 ${isRefreshing ? "animate-spin" : ""}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline", children: "تحديث" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleSyncPhonebook,
              disabled: isSyncing,
              className: "px-3 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-xs",
              title: "مزامنة أرقام الهاتف المحفوظة في جهازك",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: `w-4 h-4 text-emerald-600 dark:text-emerald-400 ${isSyncing ? "animate-bounce" : ""}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مزامنة الهاتف" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowAddModal(true),
              className: "px-3.5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إضافة جهة" })
              ]
            }
          )
        ] })
      ] }),
      statusBanner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `p-2.5 rounded-2xl border text-xs flex items-center justify-between gap-2 animate-in fade-in duration-200 ${statusBanner.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300" : statusBanner.type === "error" ? "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300" : "bg-sky-500/10 border-sky-500/20 text-sky-700 dark:text-sky-300"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              statusBanner.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4 shrink-0 text-emerald-600" }) : statusBanner.type === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4 shrink-0 text-rose-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 shrink-0 text-sky-600 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: statusBanner.message })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setStatusBanner(null),
                className: "p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "البحث في الأسماء وأرقام الهاتف المسجلة...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full px-4 py-2.5 pl-10 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-emerald-500 rounded-2xl text-slate-800 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            }
          ),
          searchQuery ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearchQuery(""),
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowSearchPhone(!showSearchPhone),
            className: `px-3 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${showSearchPhone ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بحث بالرقم" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setFilterTab("all"),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${filterTab === "all" ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"}`,
            children: [
              "الكل (",
              registeredContacts.length + unregisteredContacts.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setFilterTab("registered"),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${filterTab === "registered" ? "bg-emerald-600 text-white shadow-xs" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "على IMI (",
                registeredContacts.length,
                ")"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setFilterTab("invite"),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${filterTab === "invite" ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "دعوة (",
                unregisteredContacts.length,
                ")"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setFilterTab("online"),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${filterTab === "online" ? "bg-emerald-600 text-white shadow-xs" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "متصل الآن (",
                onlineContacts.length,
                ")"
              ] })
            ]
          }
        ),
        blockedContacts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setFilterTab("blocked"),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${filterTab === "blocked" ? "bg-rose-600 text-white shadow-xs" : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "المحظورون (",
                blockedContacts.length,
                ")"
              ] })
            ]
          }
        )
      ] })
    ] }),
    showSearchPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-emerald-500/5 border-b border-emerald-500/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContactSearch,
      {
        currentUserId,
        onSelectUser: (u) => {
          onStartChat({
            authUid: u.authUid,
            displayName: u.displayName,
            phoneNumber: u.phoneNumber
          });
        },
        onStartCall
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-7 h-7 animate-spin text-emerald-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جاري تحميل جهات الاتصال ومطابقتها..." })
    ] }) : contacts.length === 0 ? (
      /* Empty State: Onboarding for Phonebook Sync */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-8 h-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 dark:text-white text-base", children: "اكتشف أصدقاءك عبر أرقام الهاتف" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed", children: "قم بمزامنة أرقام الهاتف المحفوظة في جهازك لاكتشاف أصدقائك المسجلين في IMI تلقائياً عبر الهندسة العكسية، والتواصل معهم فوراً عبر الرسائل والمكالمات تماماً كما في واتساب." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-2.5 w-full pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleSyncPhonebook,
              disabled: isSyncing,
              className: "w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مزامنة جهات اتصال الهاتف الآن" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowAddModal(true),
              className: "w-full sm:w-auto py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إضافة يدوية" })
              ]
            }
          )
        ] })
      ] })
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      (filterTab === "all" || filterTab === "registered" || filterTab === "online") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide", children: [
              "جهات الاتصال على IMI (",
              filterTab === "online" ? onlineContacts.length : registeredContacts.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400", children: "أرقام مسجلة بحسابات نشطة" })
        ] }),
        (filterTab === "online" ? onlineContacts : registeredContacts).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400", children: filterTab === "online" ? "لا يوجد أي من أصدقائك متصلاً حالياً" : searchQuery ? "لا توجد نتائج مطابقة بين المسجلين على IMI" : "لم يتم العثور على أرقام مسجلة بعد في IMI. اضغط مزامنة لتحديث القائمة." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (filterTab === "online" ? onlineContacts : registeredContacts).map((contact) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => setSelectedContact(contact),
            className: "p-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 transition cursor-pointer shadow-2xs group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                  contact.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: contact.photoURL,
                      alt: contact.name,
                      className: "w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-base", children: contact.name.charAt(0) || /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }) }),
                  isUserOnline(contact.lastSeen, contact.online) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 border-2 border-white dark:border-slate-900 rounded-full" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 dark:text-white text-sm truncate", children: contact.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold", children: "IMI" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500 dark:text-slate-400 truncate", children: [
                    contact.displayName && contact.displayName !== contact.name ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      contact.displayName,
                      " • "
                    ] }) : null,
                    contact.about ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: contact.about }) : isUserOnline(contact.lastSeen, contact.online) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600 dark:text-blue-400 font-semibold", children: "متصل الآن" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatLastSeen(contact.lastSeen, contact.online) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-slate-400 dir-ltr text-right truncate", children: contact.phoneNumber })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", onClick: (e) => e.stopPropagation(), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      onStartChat({
                        authUid: contact.authUid || contact.id,
                        displayName: contact.name || contact.displayName || contact.phoneNumber,
                        phoneNumber: contact.phoneNumber
                      });
                    },
                    className: "p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition cursor-pointer",
                    title: "محادثة دردشة",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" })
                  }
                ),
                onStartCall && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => onStartCall(contact.phoneNumber, contact.name, "voice"),
                      className: "p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:text-emerald-600 text-slate-600 dark:text-slate-300 transition cursor-pointer",
                      title: "مكالمة صوتية",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-emerald-500" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => onStartCall(contact.phoneNumber, contact.name, "video"),
                      className: "p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 hover:text-sky-600 text-slate-600 dark:text-slate-300 transition cursor-pointer",
                      title: "مكالمة فيديو",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4 text-sky-500" })
                    }
                  )
                ] })
              ] })
            ]
          },
          contact.id
        )) })
      ] }),
      (filterTab === "all" || filterTab === "invite") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-slate-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide", children: [
              "دعوة إلى IMI (",
              unregisteredContacts.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400", children: "أرقام في هاتفك لم تسجل بعد" })
        ] }),
        unregisteredContacts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400", children: searchQuery ? "لا توجد نتائج مطابقة" : "جميع جهات اتصالك مسجلة على IMI! 🚀" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: unregisteredContacts.map((contact) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => setSelectedContact(contact),
            className: "p-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 transition cursor-pointer shadow-2xs group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-sm shrink-0", children: contact.name.charAt(0) || /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 dark:text-white text-sm truncate", children: contact.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-slate-400 dir-ltr text-right truncate", children: contact.phoneNumber })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleInviteContact(contact),
                  className: "px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs active:scale-95",
                  title: "إرسال رابط دعوة عبر واتساب أو الرسائل",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "دعوة" })
                  ]
                }
              ) })
            ]
          },
          contact.id
        )) })
      ] }),
      filterTab === "blocked" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-1 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide", children: [
          "المستخدمون المحظورون (",
          blockedContacts.length,
          ")"
        ] }),
        blockedContacts.map((contact) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => setSelectedContact(contact),
            className: "p-3 bg-white dark:bg-slate-900 rounded-2xl border border-rose-100 dark:border-rose-950/40 flex items-center justify-between gap-3 cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-800 dark:text-white text-sm truncate", children: contact.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-slate-400 dir-ltr text-right", children: contact.phoneNumber })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-1 rounded-lg", children: "محظور" })
            ]
          },
          contact.id
        ))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddContactModal,
      {
        isOpen: showAddModal,
        onClose: () => setShowAddModal(false),
        currentUserId
      }
    ),
    selectedContact && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContactProfile,
      {
        contact: selectedContact,
        currentUserId,
        isOpen: !!selectedContact,
        onClose: () => setSelectedContact(null),
        onStartChat,
        onStartCall
      }
    )
  ] });
}

const formatCallDuration = (seconds) => {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};
function ChatList({ userId, onLogout, onStartCall, onOpenCallModal }) {
  const { t } = useTranslation();
  const [chats, setChats] = reactExports.useState([]);
  const [showNewChat, setShowNewChat] = reactExports.useState(false);
  const [isGroupMode, setIsGroupMode] = reactExports.useState(false);
  const [newContactPhone, setNewContactPhone] = reactExports.useState("");
  const [groupTitle, setGroupTitle] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [usersData, setUsersData] = reactExports.useState({});
  const [unreadCounts, setUnreadCounts] = reactExports.useState({});
  const [callLogs, setCallLogs] = reactExports.useState([]);
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [showSearchInput, setShowSearchInput] = reactExports.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = reactExports.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = reactExports.useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("imi_sidebar_collapsed");
      if (saved !== null) return saved === "true";
      return window.innerWidth < 1024;
    }
    return false;
  });
  const [showNotificationsModal, setShowNotificationsModal] = reactExports.useState(false);
  const [showProfileModal, setShowProfileModal] = reactExports.useState(false);
  const [profileAvatarFile, setProfileAvatarFile] = reactExports.useState(null);
  const [profileAvatarPreview, setProfileAvatarPreview] = reactExports.useState(null);
  const [profileDisplayName, setProfileDisplayName] = reactExports.useState("");
  const [profileAbout, setProfileAbout] = reactExports.useState("");
  const [profileUpdating, setProfileUpdating] = reactExports.useState(false);
  const navigate = useNavigate();
  const currentUserData = usersData[userId] || {};
  reactExports.useEffect(() => {
    if (currentUserData.displayName) {
      setProfileDisplayName(currentUserData.displayName);
    }
    if (currentUserData.about) {
      setProfileAbout(currentUserData.about);
    }
  }, [currentUserData.displayName, currentUserData.about]);
  reactExports.useEffect(() => {
    if (!userId) return;
    const qUsers = query(collection(db, "users"), limit(100));
    const unsubscribeUsers = onSnapshot(qUsers, (snapshot) => {
      setUsersData((prev) => {
        const updatedUsers = { ...prev };
        snapshot.docs.forEach((d) => {
          const data = d.data();
          updatedUsers[d.id] = data;
          if (data.phoneNumber) {
            updatedUsers[data.phoneNumber] = data;
          }
        });
        return updatedUsers;
      });
    }, (error2) => {
      console.warn("Users listener notice:", error2);
    });
    return () => unsubscribeUsers();
  }, [userId]);
  reactExports.useEffect(() => {
    if (!userId) return;
    const qCaller = query(
      collection(db, "calls"),
      where("caller", "==", userId),
      limit(50)
    );
    const qCallee = query(
      collection(db, "calls"),
      where("callee", "==", userId),
      limit(50)
    );
    let callerCalls = [];
    let calleeCalls = [];
    const updateCombinedCalls = () => {
      const combinedMap = /* @__PURE__ */ new Map();
      [...callerCalls, ...calleeCalls].forEach((call) => {
        combinedMap.set(call.id, call);
      });
      const list = Array.from(combinedMap.values());
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setCallLogs(list);
    };
    const unsubCaller = onSnapshot(qCaller, (snap) => {
      callerCalls = snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      updateCombinedCalls();
    }, (error2) => {
      console.warn("Ignored quota error");
    });
    const unsubCallee = onSnapshot(qCallee, (snap) => {
      calleeCalls = snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
      updateCombinedCalls();
    }, (error2) => {
      console.warn("Ignored quota error");
    });
    return () => {
      unsubCaller();
      unsubCallee();
    };
  }, [userId]);
  reactExports.useEffect(() => {
    if (!userId) return;
    const unreadListenersMap = /* @__PURE__ */ new Map();
    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", userId),
      limit(50)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const chatData = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
        chatData.sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0));
        setChats(chatData);
        setLoading(false);
        const activeChatIds = new Set(chatData.map((c) => c.id));
        unreadListenersMap.forEach((unsub, cId) => {
          if (!activeChatIds.has(cId)) {
            unsub();
            unreadListenersMap.delete(cId);
          }
        });
        chatData.forEach((c) => {
          if (!unreadListenersMap.has(c.id)) {
            `unread_${c.id}`;
            const unreadQ = query(
              collection(db, "chats", c.id, "messages"),
              where("sender", "!=", userId),
              limit(20)
            );
            const unsubUnread = onSnapshot(
              unreadQ,
              (msgSnap) => {
                const unreadDocs = msgSnap.docs.filter((d) => d.data().status !== "read");
                const count = unreadDocs.length;
                setUnreadCounts((prev) => prev[c.id] === count ? prev : { ...prev, [c.id]: count });
                const rawMsgs = msgSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
                messagingService.markMessagesDelivered(c.id, rawMsgs, userId);
              },
              (err) => {
                handleFirestoreError(err, OperationType.LIST, `chats/${c.id}/messages`);
              }
            );
            unreadListenersMap.set(c.id, unsubUnread);
          }
        });
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, "chats");
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
      unreadListenersMap.forEach((unsub, cId) => {
        unsub();
      });
      unreadListenersMap.clear();
    };
  }, [userId]);
  const handleStartChatWithUser = async (targetUser) => {
    const targetUid = targetUser.authUid || targetUser.phoneNumber || targetUser.id;
    if (!targetUid) return;
    const participants = Array.from(/* @__PURE__ */ new Set([userId, targetUid])).sort();
    const chatId = participants.join("_");
    try {
      const chatRef = doc(db, "chats", chatId);
      await setDoc(
        chatRef,
        {
          participants,
          lastMessageTime: Date.now()
        },
        { merge: true }
      );
      navigate(`/chat/${encodeURIComponent(chatId)}`);
    } catch (err) {
      console.error("Failed to start chat:", err);
    }
  };
  const handleDeleteCallLog = async (callId, e) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "calls", callId));
    } catch (err) {
      console.error("Failed to delete call log:", err);
    }
  };
  const handleStartChat = async (e) => {
    e.preventDefault();
    setError("");
    const rawPhones = newContactPhone.split(",").map((p) => p.trim()).filter(Boolean);
    const targetPhones = rawPhones.map((p) => p.startsWith("+") ? p : "+" + p);
    if (!isGroupMode && (targetPhones.includes(userId) || currentUserData.phoneNumber && targetPhones.includes(currentUserData.phoneNumber))) {
      setError("لا يمكن بدء محادثة مع نفسك.");
      return;
    }
    if (targetPhones.length === 0) {
      setError("يرجى إدخال رقم هاتف واحد على الأقل.");
      return;
    }
    try {
      const targetUids = [];
      for (const phone of targetPhones) {
        const foundUser = await findRegisteredUserByPhone(phone, userId);
        if (!foundUser) {
          setError(`الرقم "${phone}" غير مسجل حالياً في التطبيق. يمكنك دعوته للانضمام.`);
          return;
        }
        targetUids.push(foundUser.authUid || foundUser.id);
      }
      const participants = Array.from(/* @__PURE__ */ new Set([userId, ...targetUids])).sort();
      const chatId = isGroupMode ? `group_${Date.now()}_${Math.random().toString(36).substring(2, 6)}` : participants.join("_");
      if (!isGroupMode) {
        const existingChat = chats.find((c) => {
          if (c.participants.length !== participants.length) return false;
          const sortedExisting = [...c.participants].sort();
          return sortedExisting.every((p, i) => p === participants[i]);
        });
        if (existingChat) {
          navigate(`/chat/${encodeURIComponent(existingChat.id)}`);
          setShowNewChat(false);
          return;
        }
      }
      const chatRef = doc(db, "chats", chatId);
      await setDoc(
        chatRef,
        {
          participants,
          lastMessageTime: Date.now(),
          isGroup: isGroupMode || participants.length > 2,
          groupName: isGroupMode ? groupTitle.trim() || "مجموعة جديدة" : null
        },
        { merge: true }
      );
      setShowNewChat(false);
      setNewContactPhone("");
      setGroupTitle("");
      navigate(`/chat/${encodeURIComponent(chatId)}`);
    } catch (err) {
      setError(err.message || "حدث خطأ غير متوقع");
    }
  };
  const handleProfileAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (profileAvatarPreview) {
      URL.revokeObjectURL(profileAvatarPreview);
    }
    setProfileAvatarFile(file);
    setProfileAvatarPreview(URL.createObjectURL(file));
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileUpdating(true);
    try {
      let photoURL = currentUserData.photoURL || "";
      if (profileAvatarFile) {
        const uploadResult = await uploadMedia({
          file: profileAvatarFile,
          type: "PROFILE_IMAGE",
          ownerId: userId
        });
        photoURL = uploadResult.downloadURL;
      }
      await setDoc(
        doc(db, "users", userId),
        {
          displayName: profileDisplayName.trim() || currentUserData.displayName || userId,
          about: profileAbout.trim() || currentUserData.about || "",
          photoURL,
          updatedAt: Date.now()
        },
        { merge: true }
      );
      setUsersData((prev) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          displayName: profileDisplayName.trim() || prev[userId]?.displayName || userId,
          about: profileAbout.trim() || prev[userId]?.about || "",
          photoURL
        }
      }));
      setShowProfileModal(false);
      setProfileAvatarFile(null);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setProfileUpdating(false);
    }
  };
  const handleDownloadMyProfilePicture = async () => {
    const photoUrl = profileAvatarPreview || currentUserData.photoURL;
    if (!photoUrl) return;
    try {
      const res = await fetch(photoUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `my_profile_picture_${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      const a = document.createElement("a");
      a.href = photoUrl;
      a.target = "_blank";
      a.download = `my_profile_picture_${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  const filteredChats = chats.filter((chat) => {
    const isSaved = chat.isSavedMessages || chat.participants.length === 1 && chat.participants[0] === userId;
    if (isSaved) return false;
    if (activeTab === "groups" && !chat.isGroup) return false;
    if (!searchQuery.trim()) return true;
    const queryLower = searchQuery.toLowerCase();
    if (chat.isGroup && chat.groupName?.toLowerCase().includes(queryLower)) return true;
    const otherParticipantId = chat.participants.find((p) => p !== userId) || userId;
    const otherUser = usersData[otherParticipantId] || {};
    const nameMatch = (otherUser.displayName || "").toLowerCase().includes(queryLower);
    const phoneMatch = (otherUser.phoneNumber || "").toLowerCase().includes(queryLower);
    const msgMatch = (chat.lastMessage || "").toLowerCase().includes(queryLower);
    return nameMatch || phoneMatch || msgMatch;
  });
  const matchingRegisteredUsers = reactExports.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const cleanDigits = searchQuery.replace(/\D/g, "");
    return Object.entries(usersData).filter(([id, data]) => {
      if (id === userId) return false;
      if (id.startsWith("+")) return false;
      const u = data || {};
      const name = (u.displayName || "").toLowerCase();
      const phone = (u.phoneNumber || "").toLowerCase();
      const nationalPhone = (u.nationalPhone || "").toLowerCase();
      const phoneDigits = phone.replace(/\D/g, "");
      if (name.includes(q)) return true;
      if (phone.includes(q) || nationalPhone.includes(q)) return true;
      if (cleanDigits.length >= 3 && phoneDigits.includes(cleanDigits)) return true;
      return false;
    }).map(([id, data]) => ({ id, ...data || {} }));
  }, [usersData, searchQuery, userId]);
  const totalUnread = reactExports.useMemo(() => {
    return Object.values(unreadCounts).reduce((sum, count) => sum + (Number(count) || 0), 0);
  }, [unreadCounts]);
  const activeSidebarItem = reactExports.useMemo(() => {
    if (activeTab === "all") return "home";
    if (activeTab === "contacts") return "friends";
    if (activeTab === "calls") return "calls";
    if (activeTab === "online") return "online";
    return "home";
  }, [activeTab]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full w-full bg-white text-slate-900 dir-rtl select-none relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex shrink-0 h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TelegramDrawer,
      {
        isDesktopEmbedded: true,
        isCollapsed: isSidebarCollapsed,
        onToggleCollapse: () => {
          setIsSidebarCollapsed((prev) => {
            const next = !prev;
            localStorage.setItem("imi_sidebar_collapsed", String(next));
            return next;
          });
        },
        userId,
        userName: currentUserData.displayName || auth.currentUser?.displayName || userId,
        userEmail: currentUserData.email || auth.currentUser?.email || "",
        userAbout: currentUserData.about,
        userPhone: currentUserData.phoneNumber || auth.currentUser?.phoneNumber || "",
        userAvatar: profileAvatarPreview || currentUserData.photoURL || auth.currentUser?.photoURL || "",
        isOnline: navigator.onLine,
        activeItem: activeSidebarItem,
        unreadMessagesCount: totalUnread,
        onOpenHome: () => {
          setActiveTab("all");
          setShowSearchInput(false);
        },
        onOpenProfile: () => setShowProfileModal(true),
        onOpenMessages: () => {
          setActiveTab("all");
          setShowSearchInput(false);
        },
        onOpenContacts: () => setActiveTab("contacts"),
        onOpenCallsTab: () => setActiveTab("calls"),
        onOpenOnlineTab: () => setActiveTab("online"),
        onOpenProfileSettings: () => setShowProfileModal(true),
        onOpenReels: () => navigate("/reels"),
        onOpenLive: () => navigate("/live"),
        onOpenNotifications: () => setShowNotificationsModal(true),
        onOpenCallModal,
        onLogout
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TelegramDrawer,
      {
        isOpen: isDrawerOpen,
        onClose: () => setIsDrawerOpen(false),
        userId,
        userName: currentUserData.displayName || auth.currentUser?.displayName || userId,
        userEmail: currentUserData.email || auth.currentUser?.email || "",
        userAbout: currentUserData.about,
        userPhone: currentUserData.phoneNumber || auth.currentUser?.phoneNumber || "",
        userAvatar: profileAvatarPreview || currentUserData.photoURL || auth.currentUser?.photoURL || "",
        isOnline: navigator.onLine,
        activeItem: activeSidebarItem,
        unreadMessagesCount: totalUnread,
        onOpenHome: () => {
          setActiveTab("all");
          setShowSearchInput(false);
        },
        onOpenProfile: () => setShowProfileModal(true),
        onOpenMessages: () => {
          setActiveTab("all");
          setShowSearchInput(false);
        },
        onOpenContacts: () => setActiveTab("contacts"),
        onOpenCallsTab: () => setActiveTab("calls"),
        onOpenOnlineTab: () => setActiveTab("online"),
        onOpenProfileSettings: () => setShowProfileModal(true),
        onOpenReels: () => navigate("/reels"),
        onOpenLive: () => navigate("/live"),
        onOpenNotifications: () => setShowNotificationsModal(true),
        onOpenCallModal,
        onLogout
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col h-full min-w-0 bg-white relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-header sticky top-0 border-b border-slate-200/80 p-3.5 flex items-center justify-between z-20 shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                if (window.innerWidth >= 768) {
                  setIsSidebarCollapsed((prev) => {
                    const next = !prev;
                    localStorage.setItem("imi_sidebar_collapsed", String(next));
                    return next;
                  });
                } else {
                  setIsDrawerOpen(true);
                }
              },
              className: "p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition btn-tactile cursor-pointer",
              title: "القائمة والشريط الجانبي",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-6 h-6" })
            }
          ),
          showSearchInput ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "بحث في المحادثات...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                autoFocus: true,
                className: "w-full bg-slate-100/90 text-slate-900 text-sm px-4 py-1.5 rounded-full outline-none border border-slate-200 focus:border-[#2AABEE] shadow-inner"
              }
            ),
            searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setSearchQuery(""),
                className: "absolute left-2.5 top-2 text-slate-400 hover:text-slate-700",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2AABEE] to-[#229ED9] flex items-center justify-center text-white font-extrabold text-sm shadow-xs", children: "IMI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-extrabold tracking-wide bg-gradient-to-r from-[#2AABEE] to-blue-600 bg-clip-text text-transparent", children: "IMI" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PWAInstallButton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowNotificationsModal(true),
              className: "p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition btn-tactile cursor-pointer relative",
              title: "الإشعارات والتنبيهات",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }),
                totalUnread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setShowSearchInput(!showSearchInput);
                if (showSearchInput) setSearchQuery("");
              },
              className: "p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition btn-tactile cursor-pointer",
              title: "بحث",
              children: showSearchInput ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50/90 border-b border-slate-200/80 px-3 py-2 flex items-center justify-around gap-2 z-10", children: [
        (() => {
          const totalUnread2 = Object.values(unreadCounts).reduce((sum, count) => sum + (Number(count) || 0), 0);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setActiveTab("all"),
              className: `relative p-2.5 rounded-2xl transition-all btn-tactile cursor-pointer flex items-center justify-center ${activeTab === "all" ? "bg-[#2AABEE] text-white shadow-md shadow-blue-500/20 scale-105 font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"}`,
              title: "الدردشات والمحادثات",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5" }),
                totalUnread2 > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute -top-1 -right-1 text-[10px] font-bold px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white animate-pulse ${activeTab === "all" ? "bg-slate-900 text-white" : "bg-red-500 text-white"}`,
                    children: totalUnread2
                  }
                )
              ]
            }
          );
        })(),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveTab("contacts"),
            className: `relative p-2.5 rounded-2xl transition-all btn-tactile cursor-pointer flex items-center justify-center ${activeTab === "contacts" ? "bg-[#2AABEE] text-white shadow-md shadow-blue-500/20 scale-105 font-bold" : "text-slate-600 hover:text-[#2AABEE] hover:bg-blue-50"}`,
            title: "جهات الاتصال والأرقام",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveTab("calls"),
            className: `relative p-2.5 rounded-2xl transition-all btn-tactile cursor-pointer flex items-center justify-center ${activeTab === "calls" ? "bg-[#2AABEE] text-white shadow-md shadow-[#2AABEE]/20 scale-105 font-bold" : "text-slate-600 hover:text-[#2AABEE] hover:bg-blue-50"}`,
            title: "المكالمات",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveTab("stories"),
            className: `relative p-2.5 rounded-2xl transition-all btn-tactile cursor-pointer flex items-center justify-center ${activeTab === "stories" ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105 font-bold" : "text-slate-600 hover:text-amber-600 hover:bg-amber-50"}`,
            title: "الحالات والقصص",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => navigate("/reels"),
            className: "relative p-2.5 rounded-2xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all btn-tactile cursor-pointer flex items-center justify-center group",
            title: "Vidéo IMI - الفيديوهات والريلز",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => navigate("/live"),
            className: "relative p-2.5 rounded-2xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all btn-tactile cursor-pointer flex items-center justify-center group",
            title: "LIVEIMI - البث المباشر",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto bg-white relative", children: activeTab === "stories" ? (
        /* Stories / Statuses tab */
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatusManager,
          {
            userPhone: currentUserData.phoneNumber || userId,
            userName: currentUserData.displayName || userId,
            userAvatar: currentUserData.photoURL,
            usersData
          }
        ) })
      ) : activeTab === "contacts" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ContactList,
        {
          currentUserId: userId,
          onStartChat: handleStartChatWithUser,
          onStartCall
        }
      ) }) : activeTab === "calls" ? (
        /* Calls Log Tab */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-100 shadow-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 text-blue-900 font-bold text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-4 h-4 text-[#2AABEE]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إجراء مكالمة سريعة" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 mb-3", children: "أدخل رقم هاتف أو معرّف أي مستخدم لبدء مكالمة صوتية أو فيديو فورية مجانية:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "رقم الهاتف (مثال: +212600000000) أو الاسم",
                  id: "quick-call-input",
                  className: "flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#2AABEE]",
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      const val = e.target.value.trim();
                      if (val && onStartCall) onStartCall(val, val, "voice");
                    }
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => {
                      const input = document.getElementById("quick-call-input");
                      const val = input?.value.trim();
                      if (val && onStartCall) {
                        onStartCall(val, val, "voice");
                      }
                    },
                    className: "flex-1 sm:flex-initial px-3 py-2 bg-[#2AABEE] hover:bg-[#229ED9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "صوت" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => {
                      const input = document.getElementById("quick-call-input");
                      const val = input?.value.trim();
                      if (val && onStartCall) {
                        onStartCall(val, val, "video");
                      }
                    },
                    className: "flex-1 sm:flex-initial px-3 py-2 bg-[#2AABEE] hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فيديو" })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          callLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-6 text-center px-4 bg-slate-50 rounded-2xl border border-slate-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-800 mb-1", children: "لا توجد مكالمات مسجلة بعد" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 max-w-xs mb-3", children: "يمكنك بدء مكالمة الآن مع أي مستخدم أو اختيار مستخدم من القائمة أدناه:" })
            ] }),
            Object.entries(usersData).filter(([id]) => id !== userId && !id.startsWith("+")).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-slate-500 mb-2 px-1", children: "المستخدمون المتاحون للاتصال:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Object.entries(usersData).filter(([id]) => id !== userId && !id.startsWith("+")).slice(0, 5).map(([otherId, userData]) => {
                const u = userData || {};
                const name = u.displayName || u.phoneNumber || otherId;
                const phone = u.phoneNumber || otherId;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-2 shadow-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-tr from-[#2AABEE] to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden", children: u.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: u.photoURL, alt: name, className: "w-full h-full object-cover" }) : name.charAt(0).toUpperCase() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-900 truncate", children: name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 truncate", children: phone })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 shrink-0", children: onStartCall && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => onStartCall(phone, name, "voice"),
                        className: "p-2 rounded-full bg-blue-50 text-[#2AABEE] hover:bg-blue-100 transition cursor-pointer",
                        title: "اتصال صوتي",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => onStartCall(phone, name, "video"),
                        className: "p-2 rounded-full bg-blue-50 text-[#2AABEE] hover:bg-blue-100 transition cursor-pointer",
                        title: "اتصال فيديو",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) })
                ] }, otherId);
              }) })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: callLogs.map((call) => {
            const isCaller = call.caller === userId;
            const otherPhone = isCaller ? call.callee : call.caller;
            const otherName = isCaller ? call.calleeName : call.callerName;
            const otherUser = usersData[otherPhone] || usersData[call.caller] || {};
            const displayTitle = otherName || otherUser.displayName || otherPhone || "متصل";
            const isVideo = call.type === "video";
            const isUnanswered = call.status === "missed" || call.status === "offered" || call.status === "declined" || !call.duration && call.status === "ended";
            call.status === "ended" || call.status === "accepted";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-3 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition flex items-center justify-between gap-3 shadow-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-gradient-to-tr from-[#2AABEE] to-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs overflow-hidden", children: otherUser.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: otherUser.photoURL, alt: displayTitle, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: displayTitle.charAt(0).toUpperCase() }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-slate-900 truncate", children: displayTitle }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium shrink-0 flex items-center gap-1", children: [
                          isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3 h-3 text-indigo-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 text-emerald-500" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isVideo ? "فيديو" : "صوتية" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5 text-[12px] text-slate-500", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isUnanswered ? "text-rose-500" : isCaller ? "text-emerald-500" : "text-blue-500", children: isCaller ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { className: "w-4 h-4" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isUnanswered ? "text-rose-600 font-medium" : "", children: isUnanswered ? isCaller ? call.status === "ended" && !call.duration ? "ألغيت" : "لم يتم الرد" : "مكالمة فائتة" : isCaller ? "صادرة" : "واردة" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatChatListTime(call.createdAt) }),
                        call.duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatCallDuration(call.duration) })
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                    onStartCall && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => onStartCall(otherPhone, displayTitle, "voice"),
                          className: "p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-[#2AABEE] transition cursor-pointer",
                          title: "اتصال صوتي",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => onStartCall(otherPhone, displayTitle, "video"),
                          className: "p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-[#2AABEE] transition cursor-pointer",
                          title: "اتصال فيديو",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: (e) => handleDeleteCallLog(call.id, e),
                        className: "p-2 rounded-full hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition cursor-pointer",
                        title: "حذف من السجل",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] })
                ]
              },
              call.id
            );
          }) })
        ] })
      ) : (
        /* Chats List */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-slate-100", children: [
          filteredChats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 flex flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-blue-50 text-[#2AABEE] flex items-center justify-center mb-3 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-8 h-8" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-800 mb-1", children: "لا توجد محادثات بعد" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 max-w-xs mb-5", children: "ابدأ مراسلة أصدقائك أو جهات اتصالك فوراً، جميع رسائلك تظهر هنا في مكان واحد" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setActiveTab("contacts"),
                className: "px-5 py-2.5 bg-[#2AABEE] hover:bg-[#229ED9] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 btn-tactile transition cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بدء محادثة جديدة" })
                ]
              }
            )
          ] }) : filteredChats.map((chat) => {
            const isSaved = chat.isSavedMessages || chat.participants.length === 1 && chat.participants[0] === userId;
            const otherParticipantId = chat.participants.find((p) => p !== userId) || userId;
            const otherUser = usersData[otherParticipantId] || {};
            const userContacts = currentUserData.contacts || {};
            const savedName = userContacts[otherUser.phoneNumber];
            const title = isSaved ? "الرسائل المحفوظة" : chat.isGroup ? chat.groupName || "مجموعة" : savedName || otherUser.displayName || otherUser.phoneNumber || otherParticipantId;
            const isOnline = !isSaved && !chat.isGroup && isUserOnline(otherUser.lastSeen, otherUser.online);
            const unread = unreadCounts[chat.id] || 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => navigate(`/chat/${encodeURIComponent(chat.id)}`),
                className: "p-3.5 hover:bg-slate-100 transition duration-150 cursor-pointer flex items-center gap-3.5 group border-b border-slate-100",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                    isSaved ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-tr from-[#2AABEE] to-blue-600 flex items-center justify-center text-white shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-6 h-6" }) }) : chat.isGroup ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-tr from-[#2AABEE] to-[#229ED9] flex items-center justify-center text-white font-bold text-lg shadow-xs overflow-hidden", children: otherUser.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: otherUser.photoURL,
                        alt: title,
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: title.charAt(0).toUpperCase() }) }),
                    isOnline && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full shadow-xs ring-1 ring-blue-400/30" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-900 truncate flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: title }) }),
                      chat.lastMessageTime && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400 font-mono shrink-0", children: formatChatListTime(chat.lastMessageTime) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 truncate flex-1", children: [
                        chat.lastMessageSender === userId && /* @__PURE__ */ jsxRuntimeExports.jsx(MessageStatusIcon, { status: chat.lastMessageStatus, className: "inline ml-1" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: chat.lastMessage === "[رسالة مشفرة 🔒]" ? "رسالة" : (chat.lastMessage || "").startsWith("🔒 ") ? (chat.lastMessage || "").replace(/^🔒\s*/, "") : chat.lastMessage || "أنقر للبدء بـ المراسلة..." })
                      ] }),
                      unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 bg-[#2AABEE] text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-sm", children: unread })
                    ] })
                  ] })
                ]
              },
              chat.id
            );
          }),
          searchQuery.trim() && matchingRegisteredUsers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-50 border-t border-slate-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-slate-700 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-[#2AABEE]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "مستخدمون مسجلون مطابقون للبحث (",
                  matchingRegisteredUsers.length,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setActiveTab("contacts"),
                  className: "text-[11px] text-[#2AABEE] hover:underline font-semibold",
                  children: "فتح دليل الأرقام"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: matchingRegisteredUsers.map((user) => {
              [userId, user.id].sort().join("_");
              const name = user.displayName || user.phoneNumber || "مستخدم";
              const phone = user.phoneNumber || user.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs hover:border-[#2AABEE]/40 transition",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        onClick: () => {
                          handleStartChatWithUser({ authUid: user.authUid || user.id, phoneNumber: phone});
                          setSearchQuery("");
                          setShowSearchInput(false);
                        },
                        className: "flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-tr from-[#2AABEE] to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden", children: user.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.photoURL, alt: name, className: "w-full h-full object-cover" }) : name.charAt(0).toUpperCase() }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-slate-900 truncate", children: name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[#2AABEE] font-mono truncate dir-ltr text-right", children: phone })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => {
                            handleStartChatWithUser({ authUid: user.authUid || user.id, phoneNumber: phone});
                            setSearchQuery("");
                            setShowSearchInput(false);
                          },
                          className: "p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2AABEE] transition cursor-pointer",
                          title: "بدء مراسلة فورية",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" })
                        }
                      ),
                      onStartCall && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => onStartCall(phone, name, "voice"),
                            className: "p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2AABEE] transition cursor-pointer",
                            title: "مكالمة صوتية",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => onStartCall(phone, name, "video"),
                            className: "p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition cursor-pointer",
                            title: "مكالمة فيديو",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4" })
                          }
                        )
                      ] })
                    ] })
                  ]
                },
                user.id
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 px-4 flex flex-col items-center justify-center text-center gap-1 opacity-75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-500 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-[#2AABEE] shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "رسائلك ومكالماتك الشخصية مشفرة تماماً من طرف إلى طرف" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "لا يمكن لأي شخص خارج هذه المحادثات قراءتها أو الاستماع إليها" })
          ] })
        ] })
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-6 z-30 flex flex-col gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setActiveTab("contacts"),
          className: "w-14 h-14 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 cursor-pointer",
          title: "جهات الاتصال والأرقام (واتساب)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NotificationsModal,
        {
          isOpen: showNotificationsModal,
          onClose: () => setShowNotificationsModal(false),
          unreadCount: totalUnread,
          userName: currentUserData.displayName || auth.currentUser?.displayName || "مستخدم IMI",
          onOpenMessages: () => {
            setActiveTab("all");
            setShowNotificationsModal(false);
          },
          onOpenLive: () => {
            setShowNotificationsModal(false);
            navigate("/live");
          }
        }
      ),
      showNewChat && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 dir-rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 shadow-2xl relative text-slate-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowNewChat(false),
            className: "absolute top-4 left-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold mb-4 flex items-center gap-2", children: [
          isGroupMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-[#2AABEE]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-[#2AABEE]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isGroupMode ? "إنشاء مجموعة جديدة" : "بدء محادثة جديدة" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleStartChat, className: "space-y-4", children: [
          isGroupMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "اسم المجموعة:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "مثلاً: فريق العمل",
                value: groupTitle,
                onChange: (e) => setGroupTitle(e.target.value),
                required: true,
                className: "w-full bg-slate-50 text-slate-900 text-sm px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#2AABEE]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: isGroupMode ? "أرقام الأعضاء (مفصولة بـ فاصلة ,):" : "رقم هاتف المستخدم (مع رمز الدولة):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: isGroupMode ? "+212600000000, +212611111111" : "+212600000000",
                value: newContactPhone,
                onChange: (e) => setNewContactPhone(e.target.value),
                required: true,
                className: "w-full bg-slate-50 text-slate-900 text-sm px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#2AABEE] dir-ltr text-right"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowNewChat(false),
                className: "px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold",
                children: "إلغاء"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "px-5 py-2.5 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-bold shadow-md transition",
                children: isGroupMode ? "إنشاء المجموعة" : "بدء المراسلة"
              }
            )
          ] })
        ] })
      ] }) }),
      showProfileModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex justify-start dir-rtl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200",
            onClick: () => !profileUpdating && setShowProfileModal(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-[400px] h-full bg-slate-50 flex flex-col shadow-2xl z-50 animate-in slide-in-from-right duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#2AABEE] text-white px-6 py-5 flex items-center gap-4 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setShowProfileModal(false),
                className: "text-white hover:bg-white/20 p-2 rounded-full transition cursor-pointer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "الملف الشخصي" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdateProfile, className: "space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-36 h-36 rounded-full overflow-hidden border-[4px] border-white bg-slate-200 flex items-center justify-center group shadow-lg transition-transform hover:scale-105", children: [
                profileAvatarPreview || currentUserData.photoURL ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: profileAvatarPreview || currentUserData.photoURL,
                    alt: "الملف الشخصي",
                    className: "w-full h-full object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-20 h-20 text-slate-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-8 h-8 mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: "تغيير الصورة" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      onChange: handleProfileAvatarSelect,
                      className: "hidden"
                    }
                  )
                ] })
              ] }),
              (profileAvatarPreview || currentUserData.photoURL) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleDownloadMyProfilePicture,
                  className: "px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2 border border-slate-200 shadow-2xs transition cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-[#2AABEE]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تحميل الصورة الشخصية" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-bold text-[#2AABEE] mb-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                  "الاسم الظاهر"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: profileDisplayName,
                    onChange: (e) => setProfileDisplayName(e.target.value),
                    placeholder: "اسمك (يظهر للآخرين)",
                    className: "w-full bg-slate-50 text-slate-900 text-base px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#2AABEE] focus:ring-2 focus:ring-[#2AABEE]/20 transition"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-slate-100 pt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-bold text-[#2AABEE] mb-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                  "نبذة (الحالة)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: profileAbout,
                    onChange: (e) => setProfileAbout(e.target.value),
                    placeholder: "اكتب نبذة قصيرة عنك...",
                    className: "w-full bg-slate-50 text-slate-900 text-base px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#2AABEE] focus:ring-2 focus:ring-[#2AABEE]/20 transition"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: profileUpdating,
                className: "w-full py-3.5 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white text-base font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed",
                children: profileUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" }) : "حفظ التغييرات"
              }
            ) })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}

export { ChatList as default };
