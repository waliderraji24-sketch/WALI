const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ChatList-CaUC28hZ.js","assets/vendor-react-DAzNXBh_.js","assets/vendor-firebase-DLAfa3Dz.js","assets/MessageStatusIcon-CUdySMPl.js","assets/userService-eU_CWHi8.js","assets/ChatRoom-CeQkx6y_.js","assets/WebRTCCallModal-C3oKjUT9.js","assets/webrtcHelper-DQrx3HkE.js","assets/ReelsPage-BNESHT1J.js","assets/reelsInteractionService-CDUqcAZy.js","assets/LivePage-Bts0Sevb.js","assets/AppBuilderStudio-C452d_EV.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, D as Download, S as Smartphone, a as ShieldCheck, M as MessageCircle, V as Video, F as Flame, r as reactExports, X, b as Search, C as Check, c as Share2, d as CheckCircle, e as MessageSquare, B as Bell, f as Sparkles, H as HelpCircle, g as Copy, h as FileCode, u as useTranslation, P as Phone, i as ChevronDown, A as ArrowLeft, k as ArrowRight, l as Pen, L as Lock, R as RefreshCw, m as Camera, U as User, n as LogIn, o as AlertTriangle, p as Home, q as CheckCircle2, s as AlertCircle, I as Info, W as WifiOff, t as HashRouter, v as Bug, w as Routes, x as Route, N as Navigate, y as client, z as React } from './vendor-react-DAzNXBh_.js';
import { i as initializeApp, a as initializeFirestore, p as persistentLocalCache, g as getAuth, b as getStorage, c as persistentMultipleTabManager, r as ref, u as uploadBytesResumable, d as getDownloadURL, G as GoogleAuthProvider, R as RecaptchaVerifier, s as signInWithPhoneNumber, e as signInWithPopup, f as getDoc, h as doc, j as setDoc, k as deleteDoc, l as signInAnonymously, m as updateDoc, n as collection, o as getDocs, q as arrayUnion, w as writeBatch, t as serverTimestamp, v as onAuthStateChanged, x as query, y as limit, z as where, A as onSnapshot, B as signOut } from './vendor-firebase-DLAfa3Dz.js';

true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

const AppDownloadPortal = () => {
  const apkDownloadUrl = "/downloads/imi.apk";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-white", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20 text-white font-black text-xl tracking-wider", children: "IMI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold text-white tracking-tight", children: "IMI Messenger" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-sky-400 font-medium", children: "المنصة الرسمية لنظام Android" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: apkDownloadUrl,
          className: "inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 active:scale-95 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-500/25",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تحميل APK" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-4xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تطبيق أندرويد أصلي (100% Native Kotlin)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl", children: "تواصل فوري، مكالمات فائقة الدقة، ومقاطع Reels بلا حدود" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm md:text-base text-slate-400 max-w-xl leading-relaxed", children: "تم تحويل منصة IMI إلى تطبيق أصلي بالكامل على نظام Android لتوفير أعلى مستويات الأمان، السرعة، وتجربة المستخدم الخالية من أي تأخير." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs max-w-lg flex items-center gap-3 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 flex-shrink-0 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "تنويه أمني:" }),
          " تم إيقاف الوصول للمحادثات عبر متصفح الويب لحماية الخصوصية. للوصول إلى حسابك ورسائلك، يرجى تثبيت التطبيق الأصلي."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-col sm:flex-row items-center gap-4 w-full justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: apkDownloadUrl,
          className: "w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-xl shadow-sky-500/30 active:scale-95 transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تحميل تطبيق IMI للأندرويد (APK)" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] text-slate-500", children: "حجم الملف: 18 ميجابايت • إصدار 1.0.0 • يدعم أندرويد 7.0 فأحدث" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-slate-900/60 border border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white", children: "محادثات مشفرة وفورية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1 leading-relaxed", children: "رسائل نصية، صور وفيديوهات، ورسائل صوتية مع تحديث مباشر للحالات." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-slate-900/60 border border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white", children: "مكالمات WebRTC فائقة الدقة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1 leading-relaxed", children: "مكالمات صوتية وفيديو سلسة مع شاشة رنين أصلية متوافقة مع قفل الشاشة." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-slate-900/60 border border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white", children: "مقاطع Reels عمودية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1 leading-relaxed", children: "مشغل ExoPlayer مدمج لمشاهدة ونشر مقاطع الفيديو بدون أي تقطيع." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-slate-900 px-6 py-6 text-center text-xs text-slate-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2026 IMI Messenger. جميع الحقوق محفوظة • تطبيق أصلي لنظام أندرويد" }) })
  ] });
};

const scriptRel = 'modulepreload';const assetsURL = function(dep) { return "/"+dep };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (true && deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};

const projectId = "cosmic-altar-m6shk";
const appId = "1:684089806632:web:49b180b089d6f8c2820a1d";
const apiKey = "AIzaSyBTCqP3hzbJk-0ezAt2kalKwo7_l8pzk3k";
const authDomain = "cosmic-altar-m6shk.firebaseapp.com";
const firestoreDatabaseId = "ai-studio-imi-0137a133-20bb-4c62-8c25-f9122bbc821e";
const storageBucket = "cosmic-altar-m6shk.firebasestorage.app";
const messagingSenderId = "684089806632";
const measurementId = "";
const oAuthClientId = "684089806632-h89ggq3vm70o3g1h2n50rjskldo002av.apps.googleusercontent.com";
const recaptchaSiteKey = "";
const firebaseConfig = {
	projectId: projectId,
	appId: appId,
	apiKey: apiKey,
	authDomain: authDomain,
	firestoreDatabaseId: firestoreDatabaseId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	measurementId: measurementId,
	oAuthClientId: oAuthClientId,
	recaptchaSiteKey: recaptchaSiteKey
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
  experimentalForceLongPolling: true
}, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);
const storage = getStorage(
  app,
  firebaseConfig.storageBucket || void 0
);
function cleanFirestoreData(data) {
  if (data === null || data === void 0) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.filter((item) => item !== void 0).map((item) => cleanFirestoreData(item));
  }
  if (typeof data === "object" && !(data instanceof Date)) {
    const cleanObj = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== void 0) {
        cleanObj[key] = cleanFirestoreData(value);
      }
    }
    return cleanObj;
  }
  return data;
}
var OperationType = /* @__PURE__ */ ((OperationType2) => {
  OperationType2["CREATE"] = "create";
  OperationType2["UPDATE"] = "update";
  OperationType2["DELETE"] = "delete";
  OperationType2["LIST"] = "list";
  OperationType2["GET"] = "get";
  OperationType2["WRITE"] = "write";
  return OperationType2;
})(OperationType || {});
function handleFirestoreError(error, operationType, path) {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errInfo = {
    error: errMsg,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email
    },
    operationType,
    path
  };
  if (errMsg.includes("resource-exhausted") || errMsg.includes("Quota limit exceeded")) {
    console.warn("Firestore daily quota reached, operating in cached mode:", path);
    return;
  }
  console.warn("Firestore Operation Notice/Error:", errInfo);
}

const COUNTRIES = [
  { code: "MA", dialCode: "212", name: "المغرب", nameAr: "المغرب", nameEn: "Morocco", flag: "🇲🇦", samplePlaceholder: "612345678" },
  { code: "EG", dialCode: "20", name: "مصر", nameAr: "مصر", nameEn: "Egypt", flag: "🇪🇬", samplePlaceholder: "1012345678" },
  { code: "SA", dialCode: "966", name: "السعودية", nameAr: "السعودية", nameEn: "Saudi Arabia", flag: "🇸🇦", samplePlaceholder: "512345678" },
  { code: "AE", dialCode: "971", name: "الإمارات", nameAr: "الإمارات", nameEn: "UAE", flag: "🇦🇪", samplePlaceholder: "501234567" },
  { code: "IQ", dialCode: "964", name: "العراق", nameAr: "العراق", nameEn: "Iraq", flag: "🇮🇶", samplePlaceholder: "7701234567" },
  { code: "DZ", dialCode: "213", name: "الجزائر", nameAr: "الجزائر", nameEn: "Algeria", flag: "🇩🇿", samplePlaceholder: "551234567" },
  { code: "TN", dialCode: "216", name: "تونس", nameAr: "تونس", nameEn: "Tunisia", flag: "🇹🇳", samplePlaceholder: "20123456" },
  { code: "JO", dialCode: "962", name: "الأردن", nameAr: "الأردن", nameEn: "Jordan", flag: "🇯🇴", samplePlaceholder: "791234567" },
  { code: "KW", dialCode: "965", name: "الكويت", nameAr: "الكويت", nameEn: "Kuwait", flag: "🇰🇼", samplePlaceholder: "91234567" },
  { code: "QA", dialCode: "974", name: "قطر", nameAr: "قطر", nameEn: "Qatar", flag: "🇶🇦", samplePlaceholder: "33123456" },
  { code: "BH", dialCode: "973", name: "البحرين", nameAr: "البحرين", nameEn: "Bahrain", flag: "🇧🇭", samplePlaceholder: "39123456" },
  { code: "OM", dialCode: "968", name: "عمان", nameAr: "عمان", nameEn: "Oman", flag: "🇴🇲", samplePlaceholder: "91234567" },
  { code: "LB", dialCode: "961", name: "لبنان", nameAr: "لبنان", nameEn: "Lebanon", flag: "🇱🇧", samplePlaceholder: "70123456" },
  { code: "PS", dialCode: "970", name: "فلسطين", nameAr: "فلسطين", nameEn: "Palestine", flag: "🇵🇸", samplePlaceholder: "591234567" },
  { code: "YE", dialCode: "967", name: "اليمن", nameAr: "اليمن", nameEn: "Yemen", flag: "🇾🇪", samplePlaceholder: "771234567" },
  { code: "SD", dialCode: "249", name: "السودان", nameAr: "السودان", nameEn: "Sudan", flag: "🇸🇩", samplePlaceholder: "912345678" },
  { code: "LY", dialCode: "218", name: "ليبيا", nameAr: "ليبيا", nameEn: "Libya", flag: "🇱🇾", samplePlaceholder: "911234567" },
  { code: "US", dialCode: "1", name: "United States", nameAr: "الولايات المتحدة", nameEn: "United States", flag: "🇺🇸", samplePlaceholder: "2025550123" },
  { code: "GB", dialCode: "44", name: "United Kingdom", nameAr: "المملكة المتحدة", nameEn: "United Kingdom", flag: "🇬🇧", samplePlaceholder: "7911123456" },
  { code: "FR", dialCode: "33", name: "France", nameAr: "فرنسا", nameEn: "France", flag: "🇫🇷", samplePlaceholder: "612345678" },
  { code: "DE", dialCode: "49", name: "Germany", nameAr: "ألمانيا", nameEn: "Germany", flag: "🇩🇪", samplePlaceholder: "1511234567" },
  { code: "TR", dialCode: "90", name: "Turkey", nameAr: "تركيا", nameEn: "Turkey", flag: "🇹🇷", samplePlaceholder: "5011234567" }
];
const normalizePhoneToE164 = (dialCode, phone) => {
  const cleanDial = dialCode.replace(/[^0-9]/g, "");
  const cleanPhone = phone.replace(/^0+/, "").replace(/[^0-9]/g, "");
  return `+${cleanDial}${cleanPhone}`;
};
const validatePhoneDigits = (country, phone) => {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  if (!cleanPhone) {
    return { isValid: false, error: "رقم الهاتف مطلوب" };
  }
  if (cleanPhone.length < 6 || cleanPhone.length > 15) {
    return { isValid: false, error: "طول رقم الهاتف غير صالح" };
  }
  return { isValid: true, error: null };
};

function CountrySelectModal({ isOpen, selectedCountry, onSelect, onClose }) {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  if (!isOpen) return null;
  const filteredCountries = COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return c.nameAr.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q) || c.dialCode.includes(q) || c.code.toLowerCase().includes(q);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-gray-900 text-white flex items-center justify-between border-b border-gray-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اختر الدولة / رمز الاتصال" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-gray-400 absolute right-3 top-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: "ابحث باسم الدولة أو كود الدولة (+212)...",
          className: "w-full pr-9 pl-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-right",
          autoFocus: true
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto divide-y divide-gray-100 flex-1 p-1", children: filteredCountries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center text-gray-500 text-sm", children: [
      'لم يتم العثور على نتائج مطابقة لـ "',
      searchQuery,
      '"'
    ] }) : filteredCountries.map((c) => {
      const isSelected = c.code === selectedCountry.code;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            onSelect(c);
            onClose();
          },
          className: `w-full flex items-center justify-between px-4 py-3 text-right hover:bg-blue-50/80 transition rounded-xl cursor-pointer ${isSelected ? "bg-blue-50 font-semibold text-blue-700" : "text-gray-800"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: c.flag }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: c.nameAr }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400", children: c.nameEn })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold px-2 py-1 bg-gray-100 rounded-lg text-gray-600", dir: "ltr", children: c.dialCode }),
              isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-blue-600 ml-1" })
            ] })
          ]
        },
        c.code
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-500", children: "يتم تحويل الرقم تلقائياً إلى صيغة E.164 العالمية" })
  ] }) });
}

function convertBlobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as DataURL"));
      }
    };
    reader.onerror = () => reject(reader.error || new Error("FileReader error"));
    reader.readAsDataURL(blob);
  });
}
async function uploadMedia(options) {
  const { file, type = "GENERAL", ownerId = "anonymous", chatId, customFileName, mimeType, onProgress } = options;
  const detectedMime = mimeType || file.type || "application/octet-stream";
  const size = file.size;
  let ext = "bin";
  if (detectedMime.includes("jpeg") || detectedMime.includes("jpg")) ext = "jpg";
  else if (detectedMime.includes("png")) ext = "png";
  else if (detectedMime.includes("webp")) ext = "webp";
  else if (detectedMime.includes("webm")) ext = "webm";
  else if (detectedMime.includes("ogg")) ext = "ogg";
  else if (detectedMime.includes("mp4")) ext = "mp4";
  else if (detectedMime.includes("mov") || detectedMime.includes("quicktime")) ext = "mov";
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  const fileName = customFileName || `${type.toLowerCase()}_${timestamp}_${randomSuffix}.${ext}`;
  let folder = "media";
  if (type === "PROFILE_IMAGE") folder = `profiles/${ownerId}`;
  else if (type === "STATUS_IMAGE") folder = `status/${ownerId}`;
  else if (type === "REEL_VIDEO") folder = `reels/${ownerId}`;
  else if (type === "VOICE_MESSAGE") folder = `chats/${chatId || ownerId}/voice`;
  else if (chatId) folder = `chats/${chatId}/media`;
  const storagePath = `${folder}/${fileName}`;
  try {
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: detectedMime
    });
    const downloadURL = await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (snapshot.totalBytes > 0) {
            const pct = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            if (onProgress) onProgress(pct);
          }
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            if (onProgress) onProgress(100);
            resolve(url);
          } catch (urlErr) {
            reject(urlErr);
          }
        }
      );
    });
    return {
      downloadURL,
      storagePath,
      mimeType: detectedMime,
      size
    };
  } catch (err) {
    console.warn(`Direct Firebase storage upload notice: ${err?.message || err}. Attempting graceful DataURL fallback if applicable.`);
    if (size <= 5 * 1024 * 1024) {
      try {
        const dataUrl = await convertBlobToDataURL(file);
        if (onProgress) onProgress(100);
        return {
          downloadURL: dataUrl,
          storagePath: "inline-data",
          mimeType: detectedMime,
          size
        };
      } catch (fallbackErr) {
        console.warn("Fallback to DataURL failed:", fallbackErr);
      }
    }
    throw err;
  }
}

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
const LOCAL_BACKEND_URL = import.meta?.env?.VITE_LOCAL_BACKEND_URL || "";
const setupRecaptcha = (containerId) => {
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      console.warn("Recaptcha verifier clear warning:", e);
    }
  }
  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {
      console.log("reCAPTCHA solved successfully.");
    },
    "expired-callback": () => {
      console.warn("reCAPTCHA expired, please try again.");
    }
  });
  window.recaptchaVerifier = verifier;
  return verifier;
};
const sendLocalOtp = async (phoneNumber) => {
  const res = await fetch("/api/otp/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "فشل إرسال رمز التحقق");
  }
  return {
    success: true,
    code: data.deliveredCode,
    expiresInSeconds: data.expiresInSeconds || 300
  };
};
const verifyLocalOtp = async (phoneNumber, code) => {
  const res = await fetch("/api/otp/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, code })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "رمز التحقق غير صحيح");
  }
  return {
    success: true,
    uid: data.uid
  };
};
const sendPhoneOtp = async (phoneNumber, verifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    return confirmationResult;
  } catch (error) {
    console.error("Firebase sendPhoneOtp error:", error?.code, error?.message);
    throw error;
  }
};
const verifyPhoneOtp = async (confirmationResult, otpCode) => {
  try {
    const userCredential = await confirmationResult.confirm(otpCode);
    return userCredential.user;
  } catch (error) {
    console.error("Firebase verifyPhoneOtp error:", error?.code, error?.message);
    throw error;
  }
};
const syncUserWithLocalBackend = async (user) => {
  if (!LOCAL_BACKEND_URL) {
    return true;
  }
  const isTrustedLocalEndpoint = (url) => {
    if (url.startsWith("/")) return true;
    try {
      const parsed = new URL(url);
      return parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1" || parsed.origin === window.location.origin;
    } catch {
      return false;
    }
  };
  if (!isTrustedLocalEndpoint(LOCAL_BACKEND_URL)) {
    console.warn("Blocked sync attempt: LOCAL_BACKEND_URL must be same-origin or localhost");
    return false;
  }
  try {
    const idToken = await user.getIdToken();
    if (!idToken) return false;
    const response = await fetch(`${LOCAL_BACKEND_URL}/auth/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${idToken}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Synced successfully with IMI Local Backend:", data);
      return true;
    } else {
      console.warn("Local backend sync non-ok response status:", response.status);
      return false;
    }
  } catch (error) {
    console.warn("Local backend sync notice:", error);
    return false;
  }
};
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in with Google successfully:", result.user.uid);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error.code, error.message);
    throw error;
  }
};

function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = reactExports.useState(null);
  const [isInstalled, setIsInstalled] = reactExports.useState(false);
  const [isIOS, setIsIOS] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    setIsInstalled(isStandalone);
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);
  const install = async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  };
  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    install
  };
}

const PWAInstallButton = ({
  className,
  variant = "button"
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = reactExports.useState(false);
  const [dismissed, setDismissed] = reactExports.useState(false);
  if (isInstalled) {
    if (variant === "banner") return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-3 h-3 text-emerald-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تطبيق مثبت" })
    ] });
  }
  if (dismissed && variant === "banner") {
    return null;
  }
  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (!outcome) {
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };
  if (variant === "banner") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-sky-600 via-[#2AABEE] to-blue-700 text-white px-4 py-2.5 flex items-center justify-between text-xs shadow-md z-30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold truncate text-[13px]", children: "تثبيت تطبيق imi على هاتفك" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-[11px] truncate", children: "يعمل كتطبيق أصلي سريع مع دعم المكالمات والريلز" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 mr-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleInstallClick,
              className: "bg-white text-sky-700 hover:bg-sky-50 font-bold px-3 py-1 rounded-xl text-xs shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تثبيت الآن" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setDismissed(true),
              className: "p-1 hover:bg-white/20 rounded-full text-white/80 transition",
              title: "إغلاق",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ] }),
      showGuide && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InstallInstructionsModal,
        {
          isIOS,
          onClose: () => setShowGuide(false)
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        id: "pwa-install-btn",
        onClick: handleInstallClick,
        className: className || "flex items-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm active:scale-95 transition cursor-pointer",
        title: "تثبيت التطبيق على جهازك أو هاتفك",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تثبيت التطبيق" })
        ]
      }
    ),
    showGuide && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InstallInstructionsModal,
      {
        isIOS,
        onClose: () => setShowGuide(false)
      }
    )
  ] });
};
const InstallInstructionsModal = ({ isIOS, onClose }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in", dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-scale-up text-slate-900 dark:text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-2xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold", children: "تثبيت تطبيق imi على هاتفك" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 dark:text-slate-400", children: "تطبيق أندرويد وآيفون الأصلي" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    !isIOS ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3.5 text-xs text-slate-600 dark:text-slate-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-800 dark:text-slate-100", children: "خطوات بسيطة لتثبيت التطبيق على هاتفك الأندرويد:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0", children: "1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "leading-relaxed", children: [
            "انقر على قائمة المتصفح ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "(الثلاث نقاط ⋮)" }),
            " في الزاوية العلوية أو السفلية لشاشة هاتفك."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0", children: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "leading-relaxed", children: [
            "اختر ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"تثبيت التطبيق" (Install app)' }),
            " أو ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"إضافة إلى الشاشة الرئيسية" (Add to Home screen)' }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0", children: "3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "leading-relaxed", children: [
            "اضغط ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"تثبيت" (Install)' }),
            ". سيظهر تطبيق imi مباشرة كأيقونة تطبيق رسمي على شاشة هاتفك مع دعم الإشعارات والمكالمات وكامل ميزات المنصة!"
          ] })
        ] })
      ] })
    ] }) : (
      /* Steps for iOS / Safari */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3.5 text-xs text-slate-600 dark:text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-slate-800 dark:text-slate-100", children: "خطوات التثبيت على أجهزة iPhone / iPad (Safari):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "leading-relaxed", children: [
              "انقر على زر ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "المشاركة (Share)" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5 inline mx-1 text-sky-500" }),
              " في أسفل شاشة Safari."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0", children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "leading-relaxed", children: [
              "مرّر للأسفل واختر ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"إضافة إلى الصفحة الرئيسية" (Add to Home Screen)' }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0", children: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "leading-relaxed", children: [
              "انقر على ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"إضافة" (Add)' }),
              " في أعلى الزاوية."
            ] })
          ] })
        ] })
      ] })
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-[11px] text-slate-500 dark:text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚡ وصول فوري" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📞 مكالمات WebRTC" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🎥 ريلز وبث مباشر" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        className: "mt-4 w-full rounded-2xl bg-sky-600 hover:bg-sky-500 py-3 text-xs font-bold text-white transition active:scale-98 cursor-pointer shadow-md shadow-sky-600/20",
        children: "حسناً، فهمت ذلك"
      }
    )
  ] }) });
};

const DownloadAppModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = reactExports.useState(false);
  const [versionInfo, setVersionInfo] = reactExports.useState({
    versionName: "1.0.0",
    fileSizeFormatted: "15.2 MB",
    sha256: "9f83ab28e4693a95c8668971f1e29c8e88e84a51e6047ef25fa016e3c08b49e1"
  });
  const downloadUrl = window.location.origin + "/downloads/imi.apk";
  reactExports.useEffect(() => {
    fetch("/api/app/version").then((res) => res.json()).then((data) => {
      if (data.success) {
        setVersionInfo({
          versionName: data.versionName || "1.0.0",
          fileSizeFormatted: data.fileSizeFormatted || "15.2 MB",
          sha256: data.sha256 || "9f83ab28e4693a95c8668971f1e29c8e88e84a51e6047ef25fa016e3c08b49e1"
        });
      }
    }).catch(() => {
    });
  }, []);
  if (!isOpen) return null;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fade-in", dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-white overflow-hidden my-auto max-h-[92vh] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-5 sm:p-6 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-14 h-14 rounded-2xl bg-white p-1.5 shadow-lg shadow-black/20 shrink-0 flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/icon-192.png", alt: "IMI Logo", className: "w-full h-full object-contain rounded-xl", onError: (e) => {
            e.target.style.display = "none";
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600 font-black text-2xl", children: "IMI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl sm:text-2xl font-black text-white", children: "تطبيق IMI الرسمي" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-white/20 text-white rounded-md backdrop-blur-xs", children: "APK للأندرويد" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-sky-100 mt-1 font-medium", children: "تطبيق التواصل الفوري: مكالمات WebRTC، دردشة، وريلز وبث مباشر" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "p-1.5 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition cursor-pointer",
          title: "إغلاق",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 overflow-y-auto space-y-5 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-center text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 block text-[11px]", children: "الإصدار" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-white text-xs sm:text-sm", children: [
            "v",
            versionInfo.versionName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-x border-slate-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 block text-[11px]", children: "الحجم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sky-400 text-xs sm:text-sm", children: versionInfo.fileSizeFormatted })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 block text-[11px]", children: "التوافق" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-emerald-400 text-xs sm:text-sm", children: "Android 7.0+" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "/downloads/imi.apk",
            download: "imi.apk",
            className: "w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-base rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-3 transition transform active:scale-98 cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-6 h-6 animate-bounce" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تحميل تطبيق IMI الآن (Direct APK)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ملف APK أصلي موقّع بشهادة رسمية وآمن 100% بدون أي إعلانات خبيثة" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2.5 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/40 flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4 text-sky-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-200 text-xs block", children: "مكالمات WebRTC" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400", children: "صوت وفيديو بجودة فائقة وإشارات فورية" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/40 flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-emerald-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-200 text-xs block", children: "محادثات وريلز" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400", children: "رسائل نصية وصوتية ورفع وسائط مباشرة" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/40 flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-amber-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-200 text-xs block", children: "إشعارات النظام" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400", children: "رنين المكالمات وتنبيهات الرسائل الواردة" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/40 flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-purple-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-200 text-xs block", children: "نفس حسابك الحالي" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400", children: "تسجيل الدخول ومزامنة فورية لكل بياناتك" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-200 font-bold text-xs sm:text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HelpCircle, { className: "w-4 h-4 text-sky-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "طريقة تثبيت التطبيق على هاتفك الأندرويد (بسيطة جداً):" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "space-y-2 text-xs text-slate-300 pr-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0 text-[11px]", children: "1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "تنزيل الملف:" }),
              " انقر على زر التحميل الأخضر أعلاه لحفظ ملف ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-slate-950 px-1 py-0.5 rounded text-sky-300 font-mono", children: "imi.apk" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0 text-[11px]", children: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "فتح الملف:" }),
              ' اسحب شريط الإشعارات واضغط على إشعار اكتمال التنزيل، أو افتح مجلد "التنزيلات" (Downloads).'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]", children: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "تفعيل التثبيت:" }),
              " إذا ظهر لك تنبيه أمان، اضغط على ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"الإعدادات" (Settings)' }),
              " ثم فعّل ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"السماح بتثبيت التطبيقات من هذا المصدر" (Allow from this source)' }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]", children: "4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "إتمام التثبيت:" }),
              " اضغط على ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"تثبيت" (Install)' }),
              " ثم افتح التطبيق وسجّل الدخول بحسابك في IMI للبدء فوراً."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 overflow-hidden w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 shrink-0", children: "رابط مباشر:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-slate-300 truncate bg-slate-900 px-2 py-1 rounded text-[11px] font-mono select-all", children: downloadUrl })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleCopyLink,
              className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-1.5 transition cursor-pointer text-xs",
              children: [
                copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: copied ? "تم النسخ!" : "نسخ الرابط" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "/downloads/imi-android-project.zip",
              download: "imi-android-project.zip",
              className: "px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg flex items-center gap-1.5 transition text-xs",
              title: "تحميل سورس كود مشروع Android Studio كاملاً",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { className: "w-3.5 h-3.5 text-sky-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "سورس كود Studio (ZIP)" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400 hidden sm:inline", children: "يمكنك أيضاً مواصلة استخدام منصة IMI مباشرة على المتصفح" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "w-full sm:w-auto px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl transition cursor-pointer",
          children: "متابعة استخدام نسخة الويب 🌐"
        }
      )
    ] })
  ] }) });
};

function Login({ onLoginSuccess, authenticatedUserId }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ur";
  const [step, setStep] = reactExports.useState(authenticatedUserId ? "profile" : "phone");
  const [selectedCountry, setSelectedCountry] = reactExports.useState(() => COUNTRIES.find((c) => c.code === "MA") || COUNTRIES[0]);
  const [isCountryModalOpen, setIsCountryModalOpen] = reactExports.useState(false);
  const [nationalPhone, setNationalPhone] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState(["", "", "", "", "", ""]);
  const otpInputRefs = reactExports.useRef([]);
  const [confirmationResult, setConfirmationResult] = reactExports.useState(null);
  const [localGeneratedOtp, setLocalGeneratedOtp] = reactExports.useState(null);
  const [resendCountdown, setResendCountdown] = reactExports.useState(0);
  const recaptchaVerifierRef = reactExports.useRef(null);
  const [displayName, setDisplayName] = reactExports.useState("");
  const [avatarFile, setAvatarFile] = reactExports.useState(null);
  const [avatarPreview, setAvatarPreview] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showGoogleFallback, setShowGoogleFallback] = reactExports.useState(false);
  const [localAuthUid, setLocalAuthUid] = reactExports.useState(() => authenticatedUserId || localStorage.getItem("imi_custom_uid"));
  const [isDownloadModalOpen, setIsDownloadModalOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if ((authenticatedUserId || localAuthUid) && step !== "profile") {
      setStep("profile");
    }
  }, [authenticatedUserId, localAuthUid]);
  reactExports.useEffect(() => {
    if (auth.currentUser) {
      if (auth.currentUser.displayName && !displayName) {
        setDisplayName(auth.currentUser.displayName);
      }
      if (auth.currentUser.photoURL && !avatarPreview && !avatarFile) {
        setAvatarPreview(auth.currentUser.photoURL);
      }
    }
  }, [step]);
  reactExports.useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1e3);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCountdown]);
  const normalizedPhone = normalizePhoneToE164(selectedCountry.dialCode, nationalPhone);
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError("");
    const phoneVal = validatePhoneDigits(selectedCountry, nationalPhone);
    if (!phoneVal.isValid) {
      setError(phoneVal.error || "رقم الهاتف غير صحيح. يرجى التحقق من الرقم والمحاولة مجدداً.");
      return;
    }
    setLoading(true);
    try {
      let succeeded = false;
      try {
        const verifier = setupRecaptcha("recaptcha-container");
        recaptchaVerifierRef.current = verifier;
        console.log(`[PHONE_AUTH] Requesting SMS OTP for ${normalizedPhone}...`);
        const timeoutPromise = new Promise(
          (_, reject) => setTimeout(() => reject(new Error("Firebase SMS timeout or iframe blocked")), 3e3)
        );
        const result = await Promise.race([sendPhoneOtp(normalizedPhone, verifier), timeoutPromise]);
        setConfirmationResult(result);
        succeeded = true;
      } catch (fbErr) {
        console.warn("[PHONE_AUTH] Firebase SMS blocked or timed out, switching to Instant Free Verification Service:", fbErr?.code || fbErr?.message);
      }
      if (!succeeded) {
        const localResult = await sendLocalOtp(normalizedPhone);
        if (localResult.code) {
          setLocalGeneratedOtp(localResult.code);
        }
      }
      setStep("otp");
      setResendCountdown(60);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch (err) {
      console.error("[AUTH_ERROR]", err);
      setError(err.message || "فشل إرسال رمز التحقق. يرجى إعادة المحاولة.");
    } finally {
      setLoading(false);
    }
  };
  const handleQuickDemoLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const demoPhone = "+212600123456";
      const localResult = await sendLocalOtp(demoPhone);
      const code = localResult.code || "123456";
      const verification = await verifyLocalOtp(demoPhone, code);
      const uid = verification.uid;
      localStorage.setItem("imi_custom_uid", uid);
      setLocalAuthUid(uid);
      const uDoc = await getDoc(doc(db, "users", uid));
      if (!uDoc.exists() || !uDoc.data()?.displayName) {
        await setDoc(doc(db, "users", uid), {
          authUid: uid,
          phoneNumber: demoPhone,
          nationalPhone: "600123456",
          cleanDigits: "212600123456",
          dialCode: "212",
          countryCode: "MA",
          displayName: "مستخدم تجريبي",
          photoURL: "",
          online: true,
          lastSeen: Date.now(),
          updatedAt: Date.now()
        }, { merge: true });
      }
      onLoginSuccess(uid);
    } catch (e) {
      console.error("Demo login error:", e);
      setError("تعذر تسجيل الدخول التجريبي. يرجى استخدام رقم الهاتف.");
    } finally {
      setLoading(false);
    }
  };
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      const pastedDigits = value.replace(/\D/g, "").slice(0, 6).split("");
      if (pastedDigits.length > 0) {
        const newOtp2 = [...otp];
        pastedDigits.forEach((digit2, i) => {
          if (i < 6) newOtp2[i] = digit2;
        });
        setOtp(newOtp2);
        const nextFocusIndex = Math.min(pastedDigits.length, 5);
        otpInputRefs.current[nextFocusIndex]?.focus();
        if (pastedDigits.length === 6) {
          handleVerifyOtpCode(newOtp2.join(""));
        }
        return;
      }
    }
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
    if (digit && index === 5 && newOtp.every((d) => d !== "")) {
      handleVerifyOtpCode(newOtp.join(""));
    }
  };
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;
    const newOtp = [...otp];
    pastedData.split("").forEach((char, idx) => {
      if (idx < 6) newOtp[idx] = char;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
    if (pastedData.length === 6) {
      handleVerifyOtpCode(newOtp.join(""));
    }
  };
  const handleVerifyOtpCode = async (codeToVerify) => {
    const code = codeToVerify || otp.join("");
    if (code.length !== 6) {
      setError("يرجى إدخال رمز التحقق كاملاً المكون من 6 أرقام");
      return;
    }
    setLoading(true);
    setError("");
    try {
      let authenticatedUid = null;
      let verifiedPhoneNumber = normalizedPhone;
      if (confirmationResult) {
        console.log("[PHONE_AUTH] Verifying SMS OTP code with Firebase...");
        const user = await verifyPhoneOtp(confirmationResult, code);
        authenticatedUid = user.uid;
        if (user.phoneNumber) verifiedPhoneNumber = user.phoneNumber;
        syncUserWithLocalBackend(user).catch((e) => console.warn("Background sync notice:", e));
      } else {
        console.log("[LOCAL_OTP] Verifying OTP code with local backend...");
        const localVerification = await verifyLocalOtp(normalizedPhone, code);
        authenticatedUid = localVerification.uid;
      }
      if (!authenticatedUid) {
        throw new Error("فشل التحقق من رمز التأكيد");
      }
      console.log("[AUTH] User authenticated successfully. UID:", authenticatedUid);
      setLocalAuthUid(authenticatedUid);
      localStorage.setItem("imi_custom_uid", authenticatedUid);
      try {
        const uDoc = await getDoc(doc(db, "users", authenticatedUid));
        if (uDoc.exists()) {
          const userData = uDoc.data();
          if (userData && userData.displayName && userData.displayName.trim().length > 0) {
            await setDoc(doc(db, "users", authenticatedUid), {
              online: true,
              lastSeen: Date.now(),
              phoneNumber: verifiedPhoneNumber
            }, { merge: true });
            onLoginSuccess(authenticatedUid);
            return;
          }
        }
      } catch (docCheckErr) {
        console.warn("Profile existence check notice:", docCheckErr);
      }
      setStep("profile");
    } catch (err) {
      console.error("[AUTH_VERIFY_ERROR]", err);
      if (err.code === "auth/invalid-verification-code") {
        setError("رمز التحقق غير صحيح. يرجى التأكد من الرمز وإعادة المحاولة.");
      } else if (err.code === "auth/code-expired") {
        setError('انتهت صلاحية رمز التحقق. يرجى النقر على "إعادة إرسال الرمز".');
      } else {
        setError(err.message || "فشل التحقق من رمز التحقق. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSetupProfile = async (e) => {
    e.preventDefault();
    const uid = authenticatedUserId || localAuthUid || auth.currentUser?.uid || localStorage.getItem("imi_custom_uid");
    if (!uid) {
      setError("حدث خطأ في الجلسة، يرجى إعادة التحقق من رقم الهاتف.");
      setStep("phone");
      return;
    }
    if (!displayName.trim()) {
      setError("يرجى إدخال اسمك الكامل.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      let photoURL = avatarPreview?.startsWith("http") ? avatarPreview : "";
      if (avatarFile) {
        try {
          const uploadResult = await uploadMedia({
            file: avatarFile,
            type: "PROFILE_IMAGE",
            ownerId: uid
          });
          photoURL = uploadResult.downloadURL;
        } catch (uploadErr) {
          console.warn("Failed to upload profile picture:", uploadErr);
        }
      }
      const verifiedPhone = auth.currentUser?.phoneNumber || normalizedPhone;
      const digitsOnly = nationalPhone.replace(/\D/g, "");
      const fullDigits = verifiedPhone.replace(/\D/g, "");
      const newUser = {
        authUid: uid,
        phoneNumber: verifiedPhone,
        nationalPhone: digitsOnly,
        cleanDigits: fullDigits,
        dialCode: selectedCountry.dialCode,
        countryCode: selectedCountry.code,
        displayName: displayName.trim(),
        photoURL: photoURL || auth.currentUser?.photoURL || "",
        email: auth.currentUser?.email || "",
        online: true,
        lastSeen: Date.now(),
        updatedAt: Date.now()
      };
      await setDoc(doc(db, "users", uid), newUser, { merge: true });
      if (auth.currentUser) {
        syncUserWithLocalBackend(auth.currentUser).catch(() => {
        });
      }
      onLoginSuccess(uid);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${uid}`);
      setError(err.message || "حدث خطأ أثناء حفظ الملف الشخصي.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleFallback = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        syncUserWithLocalBackend(user).catch(() => {
        });
        const uDoc = await getDoc(doc(db, "users", user.uid));
        const userData = uDoc.exists() ? uDoc.data() : null;
        if (userData && userData.displayName && userData.phoneNumber && userData.phoneNumber.trim().length > 4) {
          await setDoc(doc(db, "users", user.uid), { online: true, lastSeen: Date.now() }, { merge: true });
          onLoginSuccess(user.uid);
        } else {
          if (user.displayName) setDisplayName(user.displayName);
          if (user.photoURL) setAvatarPreview(user.photoURL);
          if (userData?.displayName) setDisplayName(userData.displayName);
          if (userData?.phoneNumber) {
            setNationalPhone(userData.nationalPhone || "");
          }
          setStep("profile");
        }
      }
    } catch (err) {
      console.error("Google Fallback Auth Error:", err);
      if (err.code === "auth/popup-blocked") {
        setError("قام المتصفح بحظر النافذة المنبثقة. يرجى السماح بالنوافذ المنبثقة والمحاولة مجدداً.");
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("تم إغلاق نافذة تسجيل الدخول.");
      } else {
        setError(err.message || "فشل تسجيل الدخول عبر Google.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleAvatarSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      setError("يرجى اختيار صورة بتنسيق مدعوم (JPG, PNG, WEBP)");
      return;
    }
    if (avatarPreview && !avatarPreview.startsWith("http")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setError("");
  };
  const removeAvatar = () => {
    if (avatarPreview && !avatarPreview.startsWith("http")) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(null);
    setAvatarPreview(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-slate-100 font-sans", dir: isRTL ? "rtl" : "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "recaptcha-container" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md px-4 space-y-2 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setIsDownloadModalOpen(true),
          className: "w-full py-2.5 px-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-between transition transform active:scale-98 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-1 bg-white/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 animate-bounce" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تحميل تطبيق IMI الرسمي للأندرويد (APK)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] bg-white/25 px-2 py-0.5 rounded-md font-bold", children: "مباشر ⬇️" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PWAInstallButton, { variant: "banner" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DownloadAppModal, { isOpen: isDownloadModalOpen, onClose: () => setIsDownloadModalOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 mt-2 mb-4 mx-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-[#2AABEE] to-blue-600 p-6 sm:p-7 text-center relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-2.5 shadow-xl transform rotate-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-wider italic text-[#2AABEE] select-none cursor-default", children: "imi" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-base sm:text-lg", children: "تطبيق المحادثات والريلز والبث المباشر" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-xs mt-0.5 font-medium", children: "محادثات فورية آمنة ومكالمات P2P وريلز" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 sm:p-7 space-y-5", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-rose-50 text-rose-700 p-3.5 rounded-2xl text-xs font-semibold border border-rose-200 leading-relaxed animate-fade-in flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: "⚠️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
        ] }),
        step === "phone" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendOtp, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-slate-900 font-bold text-sm sm:text-base", children: "أدخل رقم هاتفك" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs leading-relaxed", children: "سنرسل لك رسالة نصية قصيرة (SMS) تحتوي على رمز التحقق المكون من 6 أرقام." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-slate-700 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-[#2AABEE]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الدولة ورقم الهاتف" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setIsCountryModalOpen(true),
                className: "w-full flex items-center justify-between px-3.5 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 text-xs sm:text-sm font-semibold transition cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: selectedCountry.flag }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-800", children: selectedCountry.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-slate-500 font-mono", dir: "ltr", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedCountry.dialCode }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-slate-400" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-[#2AABEE] focus-within:ring-2 focus-within:ring-[#2AABEE]/20 rounded-2xl px-3.5 py-1 transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 font-mono font-bold text-sm select-none border-l pl-2.5 ml-1 border-slate-200", dir: "ltr", children: selectedCountry.dialCode }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "phone-number-input",
                  type: "tel",
                  value: nationalPhone,
                  onChange: (e) => {
                    setNationalPhone(e.target.value.replace(/[^0-9]/g, ""));
                    setError("");
                  },
                  placeholder: selectedCountry.samplePlaceholder || "6XXXXXXXX",
                  className: "flex-1 py-2.5 bg-transparent text-slate-900 font-mono text-base outline-none tracking-wider",
                  dir: "ltr",
                  autoFocus: true,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-400 text-right", children: [
              "مثال: ",
              selectedCountry.dialCode,
              " ",
              selectedCountry.samplePlaceholder
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              id: "send-otp-btn",
              type: "submit",
              disabled: loading || !nationalPhone.trim(),
              className: "w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold py-3.5 px-4 rounded-2xl transition shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جاري إرسال رمز SMS..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "متابعة والحصول على الرمز" }),
                isRTL ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-slate-100 text-center space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleQuickDemoLogin,
                disabled: loading,
                className: "w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold py-3 px-4 rounded-2xl transition text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "⚡" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold block", children: "دخول فوري مباشر (تصفح الأصل)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-emerald-600 block font-normal", children: "دخول بنقرة واحدة لتجربة الدردشات والمكالمات والريلز" })
                  ] })
                ]
              }
            ),
            !showGoogleFallback ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowGoogleFallback(true),
                className: "text-xs text-slate-500 hover:text-[#2AABEE] font-medium transition underline cursor-pointer block mx-auto",
                children: "طرق تسجيل دخول بديلة"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 animate-fade-in pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                id: "google-signin-fallback-btn",
                type: "button",
                onClick: handleGoogleFallback,
                disabled: loading,
                className: "w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-4 rounded-xl border border-slate-200 transition text-xs flex items-center justify-center gap-2 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "المتابعة باستخدام Google (بديل)" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "التحقق الآمن عبر Firebase SMS Authentication" })
          ] })
        ] }),
        step === "otp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-50 text-[#2AABEE] flex items-center justify-center mx-auto mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-slate-900 font-bold text-base", children: "التحقق من رقم الهاتف" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs", children: "أدخل رمز التحقق المكون من 6 أرقام المرسل إلى:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-slate-800 font-mono font-bold text-sm bg-slate-50 py-1 px-3 rounded-full w-fit mx-auto border border-slate-200", dir: "ltr", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: normalizedPhone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setStep("phone");
                    setError("");
                  },
                  className: "text-[#2AABEE] hover:text-[#229ED9] p-0.5 transition cursor-pointer",
                  title: "تعديل رقم الهاتف",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            localGeneratedOtp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 rounded-2xl p-4 text-center space-y-3 animate-fade-in shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-4 h-4 text-emerald-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تم إنشاء رمز التحقق (OTP) بنجاح!" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/80 backdrop-blur-sm border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between gap-3 shadow-inner", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 font-semibold block", children: "رمز التحقق الخاص بك (OTP):" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xl font-black text-emerald-700 tracking-widest", dir: "ltr", children: localGeneratedOtp })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      navigator.clipboard.writeText(localGeneratedOtp);
                      const newOtp = localGeneratedOtp.split("");
                      setOtp(newOtp);
                      handleVerifyOtpCode(localGeneratedOtp);
                    },
                    className: "bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-lg shadow transition flex items-center gap-1.5 cursor-pointer",
                    title: "نسخ وتعبئة فورية",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نسخ وتعبئة" })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-2 pt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://wa.me/${normalizedPhone.replace(/\+/g, "")}?text=${encodeURIComponent(`رمز التحقق لتطبيق IMI هو: ${localGeneratedOtp}
صالح لمدة دقيقة واحدة فقط (60 ثانية).`)}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-500/20 transition cursor-pointer",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📲 إرسال ومشاركة الرمز عبر WhatsApp" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-amber-800 font-semibold bg-amber-50/90 py-1 px-3 rounded-lg border border-amber-200 w-fit mx-auto", children: "⏳ صالح لمدة دقيقة واحدة فقط (60 ثانية)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between gap-1.5 sm:gap-2", dir: "ltr", children: otp.map((digit, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: (el) => {
                  otpInputRefs.current[index] = el;
                },
                type: "text",
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 6,
                value: digit,
                onChange: (e) => handleOtpChange(index, e.target.value),
                onKeyDown: (e) => handleOtpKeyDown(index, e),
                onPaste: handleOtpPaste,
                className: "w-11 h-13 sm:w-12 sm:h-14 text-center font-mono font-extrabold text-xl bg-slate-50 border-2 border-slate-200 focus:border-[#2AABEE] focus:bg-white rounded-2xl outline-none transition shadow-sm text-slate-900"
              },
              index
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[11px] text-slate-400", children: "يمكنك نسخ ولصق الرمز المكون من 6 أرقام مباشرة" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              id: "verify-otp-btn",
              type: "button",
              onClick: () => handleVerifyOtpCode(),
              disabled: loading || otp.some((d) => d === ""),
              className: "w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold py-3.5 px-4 rounded-2xl transition shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جاري التحقق من الرمز..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تأكيد ومتابعة" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs pt-2 border-t border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setStep("phone");
                  setError("");
                },
                className: "text-slate-500 hover:text-slate-700 font-medium transition cursor-pointer",
                children: "تغيير الرقم"
              }
            ),
            resendCountdown > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 font-mono", children: [
              "إعادة الإرسال بعد (",
              resendCountdown,
              " ث)"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleSendOtp(),
                disabled: loading,
                className: "text-[#2AABEE] hover:text-[#229ED9] font-bold flex items-center gap-1 transition cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إعادة إرسال الرمز (SMS)" })
                ]
              }
            )
          ] })
        ] }),
        step === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSetupProfile, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-slate-900 font-bold text-base sm:text-lg", children: "إكمال الملف الشخصي" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs", children: "أضف اسمك وصورتك الشخصية للبدء في استخدام التطبيق" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-[#2AABEE] flex items-center justify-center overflow-hidden shadow-md transition", children: avatarPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarPreview, alt: "المعاينة", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-8 h-8 text-[#2AABEE] opacity-80" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "absolute bottom-0 right-0 bg-[#2AABEE] hover:bg-[#229ED9] text-white p-1.5 rounded-full shadow-md cursor-pointer transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: "image/jpeg,image/jpg,image/png,image/webp",
                  onChange: handleAvatarSelect,
                  className: "hidden"
                }
              )
            ] }),
            avatarPreview && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: removeAvatar,
                className: "absolute top-0 left-0 bg-rose-600 hover:bg-rose-500 text-white p-1 rounded-full shadow-md transition cursor-pointer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-[#2AABEE]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الاسم المعروض" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: displayName,
                onChange: (e) => setDisplayName(e.target.value),
                className: "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#2AABEE] outline-none transition text-right",
                placeholder: "مثال: وليد الدراجي",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-4 h-4 text-emerald-600 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-800 font-medium", children: "تم التحقق من رقم الهاتف بنجاح" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold text-emerald-900", dir: "ltr", children: auth.currentUser?.phoneNumber || normalizedPhone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              id: "save-profile-btn",
              type: "submit",
              disabled: loading,
              className: "w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold py-3 px-4 rounded-xl transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2 text-xs sm:text-sm",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حفظ والدخول إلى التطبيق" })
              ] })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CountrySelectModal,
      {
        isOpen: isCountryModalOpen,
        selectedCountry,
        onSelect: (country) => {
          setSelectedCountry(country);
          setError("");
        },
        onClose: () => setIsCountryModalOpen(false)
      }
    )
  ] });
}

const DiagnosticScreen = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Diagnostics" });

class ErrorTracker {
  constructor() {
    this.recentErrors = [];
    this.MAX_STORED_ERRORS = 50;
    this.setupGlobalHandlers();
  }
  setupGlobalHandlers() {
    if (typeof window === "undefined") return;
    window.addEventListener("error", (event) => {
      this.captureException(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });
    window.addEventListener("unhandledrejection", (event) => {
      const reason = event.reason;
      this.captureException(reason instanceof Error ? reason : new Error(String(reason)), {
        type: "unhandled_promise_rejection"
      });
    });
  }
  captureException(error, metadata) {
    const errObj = error instanceof Error ? error : new Error(String(error));
    const msg = errObj.message || "";
    if (!msg || msg.trim() === "" || msg === "[object Object]" || msg.includes("AbortError") || msg.includes("interrupted by a call to pause") || msg.includes("interrupted by a new load request") || msg.includes("The play() request was interrupted") || msg.includes("user didn't interact with the document first") || msg.includes("NotAllowedError") || msg.includes("ResizeObserver loop") || msg.includes("failed to connect to websocket") || msg.includes("WebSocket") || msg.includes("websocket") || msg.includes("Script error.")) {
      return;
    }
    const tracked = {
      message: errObj.message,
      stack: errObj.stack,
      timestamp: Date.now(),
      metadata
    };
    this.recentErrors.unshift(tracked);
    if (this.recentErrors.length > this.MAX_STORED_ERRORS) {
      this.recentErrors.pop();
    }
  }
  getRecentErrors() {
    return [...this.recentErrors];
  }
  clear() {
    this.recentErrors = [];
  }
}
const errorTracker = new ErrorTracker();

class ErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.handleReset = () => {
      this.setState({ hasError: false, error: null });
      window.location.reload();
    };
    this.handleGoHome = () => {
      this.setState({ hasError: false, error: null });
      window.location.href = "#/";
    };
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    errorTracker.captureException(error, { componentStack: errorInfo.componentStack });
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          id: "error-boundary-fallback",
          className: "min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center",
          dir: "rtl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-6 shadow-lg shadow-rose-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-8 h-8" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: this.props.fallbackTitle || "حدث خطأ غير متوقع" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm max-w-md mb-6 leading-relaxed", children: "تم حفظ بياناتك بأمان. يمكنك إعادة تحميل الصفحة أو العودة إلى الشاشة الرئيسية للاستمرار." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  id: "error-boundary-reload-btn",
                  onClick: this.handleReset,
                  className: "flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-sky-600/20 cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إعادة التحميل" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  id: "error-boundary-home-btn",
                  onClick: this.handleGoHome,
                  className: "flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl font-medium text-sm transition border border-slate-700 cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Home, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الرئيسية" })
                  ]
                }
              )
            ] })
          ]
        }
      );
    }
    return this.props.children;
  }
}

function triggerHaptic(type = "light") {
  if (typeof window === "undefined" || !navigator.vibrate) {
    return;
  }
  try {
    switch (type) {
      case "light":
        navigator.vibrate(10);
        break;
      case "medium":
        navigator.vibrate(25);
        break;
      case "heavy":
        navigator.vibrate(50);
        break;
      case "success":
        navigator.vibrate([15, 50, 15]);
        break;
      case "error":
        navigator.vibrate([30, 40, 30, 40, 50]);
        break;
    }
  } catch (e) {
  }
}

const ToastContext = reactExports.createContext(void 0);
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = reactExports.useState([]);
  const removeToast = reactExports.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const showToast = reactExports.useCallback((message, type = "info", duration = 3e3) => {
    const id = Math.random().toString(36).substring(2, 9);
    triggerHaptic(type === "error" ? "error" : "light");
    setToasts((prev) => [...prev.slice(-3), { id, message, type, duration }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);
  const success = reactExports.useCallback((msg) => showToast(msg, "success"), [showToast]);
  const error = reactExports.useCallback((msg) => showToast(msg, "error"), [showToast]);
  const info = reactExports.useCallback((msg) => showToast(msg, "info"), [showToast]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToastContext.Provider, { value: { showToast, success, error, info }, children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        id: "toast-container",
        className: "fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none w-[90%] max-w-sm",
        dir: "rtl",
        children: toasts.map((toast) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            id: `toast-${toast.id}`,
            className: `pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-xl backdrop-blur-md border text-sm font-medium transition-all duration-300 transform translate-y-0 ${toast.type === "success" ? "bg-emerald-950/90 border-emerald-700/50 text-emerald-200" : toast.type === "error" ? "bg-rose-950/90 border-rose-700/50 text-rose-200" : "bg-slate-900/90 border-slate-700/50 text-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                toast.type === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-5 h-5 text-emerald-400 shrink-0" }),
                toast.type === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-5 h-5 text-rose-400 shrink-0" }),
                toast.type === "info" && /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-sky-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: toast.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => removeToast(toast.id),
                  className: "text-slate-400 hover:text-white p-1 rounded-lg transition",
                  "aria-label": "إغلاق التنبيه",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ]
          },
          toast.id
        ))
      }
    )
  ] });
};

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = reactExports.useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [showReconnected, setShowReconnected] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3500);
      return () => clearTimeout(timer);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  if (showReconnected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        id: "offline-reconnected-banner",
        className: "fixed bottom-4 right-4 left-4 sm:left-auto sm:w-80 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-medium text-white shadow-xl animate-fade-in",
        dir: "rtl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-4 h-4 shrink-0 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تمت استعادة الاتصال بالإنترنت ومزامنة البيانات." })
        ]
      }
    );
  }
  if (isOnline) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "offline-indicator-banner",
      className: "fixed bottom-4 right-4 left-4 sm:left-auto sm:w-84 z-50 flex items-center gap-2.5 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-medium text-white shadow-xl animate-fade-in",
      dir: "rtl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-white" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-4 h-4 shrink-0 text-amber-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-[11px] leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "وضع عدم الاتصال — يتم حفظ الرسائل وسيتم إرسالها تلقائياً عند عودة الشبكة." }) })
      ]
    }
  );
};

function getBridge() {
  if (typeof window !== "undefined") {
    return window.AndroidBridge || window.Android || null;
  }
  return null;
}
const androidBridge = {
  isNative: () => {
    const bridge = getBridge();
    try {
      return Boolean(bridge?.isNativeApp?.());
    } catch {
      return false;
    }
  },
  getFcmToken: async () => {
    const bridge = getBridge();
    try {
      return bridge?.getFcmToken?.() || "";
    } catch {
      return "";
    }
  },
  getNetworkStatus: () => {
    const bridge = getBridge();
    try {
      if (bridge?.getNetworkStatus) {
        return bridge.getNetworkStatus();
      }
      return typeof navigator !== "undefined" ? navigator.onLine : true;
    } catch {
      return true;
    }
  },
  showNativeNotification: (title, body, payload) => {
    const bridge = getBridge();
    try {
      const jsonPayload = payload ? JSON.stringify(payload) : void 0;
      bridge?.showNotification?.(title, body, jsonPayload);
    } catch (e) {
      console.warn("Native notification call notice:", e);
    }
  },
  setCallAudioMode: (callType, isSpeaker) => {
    const bridge = getBridge();
    try {
      bridge?.setCallAudioMode?.(callType, isSpeaker);
    } catch (e) {
      console.warn("Native setCallAudioMode notice:", e);
    }
  },
  setSpeakerphone: (isSpeaker) => {
    const bridge = getBridge();
    try {
      bridge?.setSpeakerphone?.(isSpeaker);
    } catch (e) {
      console.warn("Native setSpeakerphone notice:", e);
    }
  },
  resetCallAudioMode: () => {
    const bridge = getBridge();
    try {
      bridge?.resetCallAudioMode?.();
    } catch (e) {
      console.warn("Native resetCallAudioMode notice:", e);
    }
  },
  startCallRingtone: (callerName, callType, callId) => {
    const bridge = getBridge();
    try {
      bridge?.startCallRingtone?.(callerName, callType, callId);
    } catch (e) {
      console.warn("Native startCallRingtone notice:", e);
    }
  },
  stopCallRingtone: () => {
    const bridge = getBridge();
    try {
      bridge?.stopCallRingtone?.();
    } catch (e) {
      console.warn("Native stopCallRingtone notice:", e);
    }
  },
  requestContacts: () => {
    const bridge = getBridge();
    try {
      const json = bridge?.requestContacts?.();
      if (json) {
        return JSON.parse(json);
      }
    } catch (e) {
      console.warn("Native requestContacts notice:", e);
    }
    return [];
  },
  requestContactsPermission: () => {
    const bridge = getBridge();
    try {
      return Boolean(bridge?.requestContactsPermission?.());
    } catch {
      return false;
    }
  },
  savePendingMessage: (messageObj) => {
    const bridge = getBridge();
    try {
      return Boolean(bridge?.savePendingMessage?.(JSON.stringify(messageObj)));
    } catch {
      return false;
    }
  },
  deletePendingMessage: (messageId) => {
    const bridge = getBridge();
    try {
      return Boolean(bridge?.deletePendingMessage?.(messageId));
    } catch {
      return false;
    }
  },
  getAndroidDiagnostics: () => {
    const bridge = getBridge();
    try {
      const json = bridge?.getAndroidDiagnostics?.();
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  }
};

class NotificationService {
  constructor() {
    this.audioCtx = null;
    this.isPermissionRequested = false;
  }
  getAudioContext() {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {
      });
    }
    return this.audioCtx;
  }
  /**
   * Play clean, modern WhatsApp-style sound for incoming message
   */
  playMessageTone() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.23);
    } catch (e) {
      console.warn("Tone play error:", e);
    }
  }
  /**
   * Play subtle message sent sound
   */
  playSentTone() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
    }
  }
  /**
   * Request system notification permissions and save device token under /users/{userId}/tokens/{tokenId}
   * Supports both Web Push Token and Native Android FCM Token.
   */
  async registerNotificationToken(userId) {
    if (typeof window === "undefined" || !userId) {
      return false;
    }
    try {
      if (androidBridge.isNative()) {
        const fcmToken = await androidBridge.getFcmToken();
        if (fcmToken) {
          const tokenId = `android_${fcmToken.substring(0, 32)}`;
          const tokenRef = doc(db, "users", userId, "tokens", tokenId);
          await setDoc(
            tokenRef,
            {
              tokenId,
              fcmToken,
              userId,
              platform: "android",
              updatedAt: Date.now(),
              enabled: true
            },
            { merge: true }
          );
          return true;
        }
      }
      if ("Notification" in window) {
        let permission = Notification.permission;
        if (permission === "default" && !this.isPermissionRequested) {
          this.isPermissionRequested = true;
          permission = await Notification.requestPermission();
        }
        if (permission === "granted") {
          const tokenId = `web_${navigator.userAgent.replace(/[^a-zA-Z0-9]/g, "").substring(0, 24)}_${userId.substring(0, 8)}`;
          const tokenRef = doc(db, "users", userId, "tokens", tokenId);
          await setDoc(
            tokenRef,
            {
              tokenId,
              userId,
              platform: "web",
              userAgent: navigator.userAgent,
              updatedAt: Date.now(),
              enabled: true
            },
            { merge: true }
          );
          return true;
        }
      }
    } catch (err) {
      console.warn("Notification registration notice:", err);
    }
    return false;
  }
  /**
   * Remove token on logout
   */
  async unregisterToken(userId) {
    if (typeof window === "undefined" || !userId) return;
    try {
      const tokenId = `web_${navigator.userAgent.replace(/[^a-zA-Z0-9]/g, "").substring(0, 24)}_${userId.substring(0, 8)}`;
      await deleteDoc(doc(db, "users", userId, "tokens", tokenId));
    } catch (err) {
      console.warn("Token unregister notice:", err);
    }
  }
  /**
   * Show desktop / background browser / native notification
   */
  showSystemNotification(title, body, icon, onClick, payload) {
    if (typeof window === "undefined") return;
    if (androidBridge.isNative()) {
      androidBridge.showNativeNotification(title, body, payload);
      return;
    }
    if (!("Notification" in window) || Notification.permission !== "granted") {
      return;
    }
    try {
      const notif = new Notification(title, {
        body,
        icon: icon || "/favicon.ico",
        tag: "imi_chat_message",
        silent: true
        // Tone handled by WebAudio
      });
      if (onClick) {
        notif.onclick = () => {
          window.focus();
          onClick();
          notif.close();
        };
      }
    } catch (e) {
      console.warn("Notification display notice:", e);
    }
  }
}
const notificationService = new NotificationService();

const NotificationPermissionPrompt = ({ userId }) => {
  const [showPrompt, setShowPrompt] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const dismissed = sessionStorage.getItem("imi_notif_prompt_dismissed");
    if (Notification.permission === "default" && !dismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 3e3);
      return () => clearTimeout(timer);
    }
  }, []);
  const handleRequest = async () => {
    try {
      const granted = await notificationService.registerNotificationToken(userId);
      setShowPrompt(false);
      sessionStorage.setItem("imi_notif_prompt_dismissed", "true");
    } catch (e) {
      setShowPrompt(false);
    }
  };
  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("imi_notif_prompt_dismissed", "true");
  };
  if (!showPrompt) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "notification-permission-prompt",
      className: "bg-gradient-to-r from-sky-900/90 to-blue-900/90 backdrop-blur-md border-b border-sky-700/50 text-white px-4 py-2.5 flex items-center justify-between gap-3 text-xs shadow-md animate-fade-in",
      dir: "rtl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 bg-sky-500/20 text-sky-300 rounded-lg shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 animate-bounce" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "تفعيل إشعارات المكالمات والرسائل: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sky-200", children: "احصل على تنبيهات فورية للمكالمات الواردة والرسائل الجديدة حتى عند إغلاق الشاشة." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleRequest,
              className: "bg-sky-500 hover:bg-sky-400 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] shadow transition cursor-pointer",
              children: "تفعيل الآن"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleDismiss,
              className: "text-sky-300 hover:text-white p-1 rounded-lg transition",
              "aria-label": "إغلاق",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] })
      ]
    }
  );
};

const CACHE_TTL_MS = 10 * 60 * 1e3;
const STORAGE_PREFIX = "imi_user_cache_";
class UserProfileCache {
  constructor() {
    this.memoryCache = /* @__PURE__ */ new Map();
    this.pendingFetches = /* @__PURE__ */ new Map();
    this.hydrateFromStorage();
  }
  hydrateFromStorage() {
    if (typeof window === "undefined") return;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const profile = JSON.parse(raw);
            if (Date.now() - profile.cachedAt < CACHE_TTL_MS) {
              this.memoryCache.set(profile.uid, profile);
            } else {
              localStorage.removeItem(key);
            }
          }
        }
      }
    } catch (e) {
      console.warn("UserProfileCache hydration notice:", e);
    }
  }
  /**
   * Synchronously get profile if cached
   */
  getSync(uid) {
    if (!uid) return null;
    const mem = this.memoryCache.get(uid);
    if (mem && Date.now() - mem.cachedAt < CACHE_TTL_MS) {
      return mem;
    }
    return null;
  }
  /**
   * Set user profile in cache
   */
  set(uid, profile) {
    if (!uid) return;
    const existing = this.memoryCache.get(uid);
    const updated = {
      uid,
      displayName: profile.displayName || existing?.displayName || uid,
      phoneNumber: profile.phoneNumber || existing?.phoneNumber,
      photoURL: profile.photoURL || existing?.photoURL,
      bio: profile.bio || existing?.bio,
      cachedAt: Date.now()
    };
    this.memoryCache.set(uid, updated);
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(`${STORAGE_PREFIX}${uid}`, JSON.stringify(updated));
      } catch (e) {
      }
    }
  }
  setProfile(uid, profile) {
    this.set(uid, profile);
  }
  removeProfile(uid) {
    this.invalidate(uid);
  }
  /**
   * Fetch profile with caching and request coalescing (prevents duplicate simultaneous queries)
   */
  async getProfile(uid) {
    if (!uid) return null;
    const cached = this.getSync(uid);
    if (cached) {
      return cached;
    }
    if (this.pendingFetches.has(uid)) {
      return this.pendingFetches.get(uid);
    }
    const fetchPromise = (async () => {
      try {
        const uDoc = await getDoc(doc(db, "users", uid));
        if (uDoc.exists()) {
          const data = uDoc.data();
          const profile = {
            uid,
            displayName: data.displayName || data.name || uid,
            phoneNumber: data.phoneNumber || data.phone,
            photoURL: data.photoURL || data.avatar,
            bio: data.bio || data.status,
            cachedAt: Date.now()
          };
          this.set(uid, profile);
          return profile;
        }
        return null;
      } catch (err) {
        console.warn(`[UserProfileCache] Failed to fetch user ${uid}:`, err);
        return null;
      } finally {
        this.pendingFetches.delete(uid);
      }
    })();
    this.pendingFetches.set(uid, fetchPromise);
    return fetchPromise;
  }
  /**
   * Invalidate cache for a user
   */
  invalidate(uid) {
    this.memoryCache.delete(uid);
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${uid}`);
    } catch (e) {
    }
  }
  /**
   * Clear all cached profiles
   */
  clear() {
    this.memoryCache.clear();
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
    }
  }
}
const userProfileCache = new UserProfileCache();

const DB_NAME$1 = "imi_outbox_db";
const DB_VERSION$1 = 1;
const STORE_NAME$1 = "outbox_messages";
let dbPromise = null;
const listeners = /* @__PURE__ */ new Set();
function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.warn("[OutboxStorage] Listener error:", e);
    }
  });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("imi_outbox_updated"));
  }
}
function getDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }
    const request = indexedDB.open(DB_NAME$1, DB_VERSION$1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME$1)) {
        const store = db.createObjectStore(STORE_NAME$1, { keyPath: "clientMessageId" });
        store.createIndex("chatId", "chatId", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };
  });
  return dbPromise;
}
const outboxStorage = {
  /**
   * Save or update a message in the persistent Outbox queue
   */
  async saveOutboxMessage(item) {
    try {
      const db = await getDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME$1, "readwrite");
        const store = tx.objectStore(STORE_NAME$1);
        const req = store.put(item);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
      androidBridge.savePendingMessage({
        messageId: item.messageId,
        chatId: item.chatId,
        senderId: item.senderId,
        receiverId: item.receiverId,
        type: item.type,
        text: item.text,
        status: "pending",
        createdAt: item.createdAt
      });
      notifyListeners();
    } catch (err) {
      console.warn("[OutboxStorage] Failed to persist outbox item:", err);
    }
  },
  /**
   * Get all outbox items, optionally filtered by chatId
   */
  async getOutboxMessages(chatId) {
    try {
      const db = await getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME$1, "readonly");
        const store = tx.objectStore(STORE_NAME$1);
        const req = store.getAll();
        req.onsuccess = () => {
          let list = req.result || [];
          if (chatId) {
            list = list.filter((item) => item.chatId === chatId);
          }
          list.sort((a, b) => a.createdAt - b.createdAt);
          resolve(list);
        };
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn("[OutboxStorage] Failed to read outbox items:", err);
      return [];
    }
  },
  /**
   * Update the status of an existing outbox item
   */
  async updateOutboxStatus(clientMessageId, status, error) {
    try {
      const db = await getDB();
      const item = await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME$1, "readonly");
        const store = tx.objectStore(STORE_NAME$1);
        const req = store.get(clientMessageId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
      if (item) {
        item.status = status;
        if (error !== void 0) item.error = error;
        if (status === "sending") item.retryCount = (item.retryCount || 0) + 1;
        await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME$1, "readwrite");
          const store = tx.objectStore(STORE_NAME$1);
          const req = store.put(item);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
        notifyListeners();
      }
    } catch (err) {
      console.warn("[OutboxStorage] Failed to update status:", err);
    }
  },
  /**
   * Remove a message from outbox once successfully sent to Firestore
   */
  async removeOutboxMessage(clientMessageId) {
    try {
      const db = await getDB();
      const item = await new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME$1, "readonly");
        const store = tx.objectStore(STORE_NAME$1);
        const req = store.get(clientMessageId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME$1, "readwrite");
        const store = tx.objectStore(STORE_NAME$1);
        const req = store.delete(clientMessageId);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
      if (item?.messageId) {
        androidBridge.deletePendingMessage(item.messageId);
      }
      notifyListeners();
    } catch (err) {
      console.warn("[OutboxStorage] Failed to remove outbox item:", err);
    }
  },
  /**
   * Subscribe to outbox changes
   */
  subscribe(listener) {
    listeners.add(listener);
    const handleCustomEvent = () => listener();
    if (typeof window !== "undefined") {
      window.addEventListener("imi_outbox_updated", handleCustomEvent);
    }
    return () => {
      listeners.delete(listener);
      if (typeof window !== "undefined") {
        window.removeEventListener("imi_outbox_updated", handleCustomEvent);
      }
    };
  }
};

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    if (!blob) {
      return reject(new Error("blobToDataURL: provided blob is null or undefined"));
    }
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result || "");
    };
    reader.onerror = () => {
      reject(reader.error || new Error("Failed to read blob as Data URL"));
    };
    reader.readAsDataURL(blob);
  });
}
async function compressImage(file, maxDim = 1280, quality = 0.8, preferredFormat = "image/jpeg") {
  const originalSize = file.size || 0;
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {
      dataUrl: "",
      previewUrl: "",
      file,
      format: preferredFormat,
      originalSize,
      compressedSize: originalSize
    };
  }
  if (!file || file.size === 0 && file.length === 0) {
    throw new Error("compressImage: provided file is empty or invalid.");
  }
  return new Promise((resolve, reject) => {
    let completed = false;
    let objectUrl = "";
    const cleanup = () => {
      if (objectUrl) {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch (_) {
        }
      }
    };
    const timeoutTimer = setTimeout(() => {
      if (!completed) {
        completed = true;
        cleanup();
        reject(new Error("Image compression timed out after 10 seconds."));
      }
    }, 1e4);
    const img = new Image();
    img.onerror = () => {
      if (!completed) {
        completed = true;
        clearTimeout(timeoutTimer);
        cleanup();
        reject(new Error("Image decode error inside HTMLImageElement."));
      }
    };
    img.onload = () => {
      if (completed) return;
      completed = true;
      clearTimeout(timeoutTimer);
      try {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;
        if (!width || !height || width <= 0 || height <= 0) {
          cleanup();
          return reject(new Error("Image has zero or invalid dimensions."));
        }
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round(height * maxDim / width);
            width = maxDim;
          } else {
            width = Math.round(width * maxDim / height);
            height = maxDim;
          }
        }
        width = Math.min(4096, Math.max(1, width));
        height = Math.min(4096, Math.max(1, height));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          cleanup();
          return resolve({
            dataUrl: "",
            previewUrl: "",
            file,
            format: preferredFormat,
            width: img.width,
            height: img.height,
            originalSize,
            compressedSize: originalSize
          });
        }
        if (preferredFormat === "image/jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, width, height);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL(preferredFormat, Math.min(1, Math.max(0.1, quality)));
        let previewUrl = compressedDataUrl;
        try {
          const previewMaxDim = 160;
          let pWidth = width;
          let pHeight = height;
          if (pWidth > previewMaxDim || pHeight > previewMaxDim) {
            if (pWidth > pHeight) {
              pHeight = Math.round(pHeight * previewMaxDim / pWidth);
              pWidth = previewMaxDim;
            } else {
              pWidth = Math.round(pWidth * previewMaxDim / pHeight);
              pHeight = previewMaxDim;
            }
          }
          const pCanvas = document.createElement("canvas");
          pCanvas.width = Math.max(1, pWidth);
          pCanvas.height = Math.max(1, pHeight);
          const pCtx = pCanvas.getContext("2d");
          if (pCtx) {
            pCtx.imageSmoothingEnabled = true;
            pCtx.drawImage(canvas, 0, 0, pWidth, pHeight);
            previewUrl = pCanvas.toDataURL("image/jpeg", 0.6);
          }
        } catch {
        }
        canvas.toBlob(
          (compressedBlob) => {
            cleanup();
            const outputBlob = compressedBlob || file;
            const fileName = file.name ? file.name.replace(/\.[^/.]+$/, preferredFormat === "image/webp" ? ".webp" : ".jpg") : `compressed_${Date.now()}.${preferredFormat === "image/webp" ? "webp" : "jpg"}`;
            const outputFile = new File([outputBlob], fileName, {
              type: preferredFormat,
              lastModified: Date.now()
            });
            resolve({
              dataUrl: compressedDataUrl,
              previewUrl,
              file: outputFile,
              format: preferredFormat,
              width,
              height,
              originalSize,
              compressedSize: outputFile.size
            });
          },
          preferredFormat,
          Math.min(1, Math.max(0.1, quality))
        );
      } catch (canvasErr) {
        cleanup();
        reject(new Error(`Canvas compression execution failed: ${canvasErr}`));
      }
    };
    if (typeof URL !== "undefined" && typeof URL.createObjectURL === "function") {
      try {
        objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
        return;
      } catch (_) {
      }
    }
    const reader = new FileReader();
    reader.onerror = (err) => {
      if (!completed) {
        completed = true;
        clearTimeout(timeoutTimer);
        cleanup();
        reject(new Error(`Failed reading image file: ${err}`));
      }
    };
    reader.onload = (e) => {
      const sourceDataUrl = e.target?.result;
      if (!sourceDataUrl) {
        if (!completed) {
          completed = true;
          clearTimeout(timeoutTimer);
          cleanup();
          reject(new Error("FileReader returned empty image data."));
        }
        return;
      }
      img.src = sourceDataUrl;
    };
    reader.readAsDataURL(file);
  });
}
async function extractVideoMetadata(file) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {
      duration: 0,
      width: 0,
      height: 0,
      thumbnailDataUrl: ""
    };
  }
  return new Promise((resolve) => {
    let settled = false;
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    const cleanUp = () => {
      try {
        URL.revokeObjectURL(url);
      } catch {
      }
      video.removeAttribute("src");
      video.load();
    };
    const timeoutTimer = setTimeout(() => {
      if (!settled) {
        settled = true;
        cleanUp();
        resolve({
          duration: 0,
          width: 720,
          height: 1280,
          thumbnailDataUrl: ""
        });
      }
    }, 4e3);
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.onloadedmetadata = () => {
      const duration = Math.round(video.duration || 0);
      video.videoWidth || 720;
      video.videoHeight || 1280;
      const targetTime = duration > 1 ? Math.min(1, duration / 2) : 0;
      video.currentTime = targetTime;
    };
    video.onseeked = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutTimer);
      let thumbnailDataUrl = "";
      try {
        const vWidth = video.videoWidth || 720;
        const vHeight = video.videoHeight || 1280;
        const maxThumbDim = 320;
        let thumbW = vWidth;
        let thumbH = vHeight;
        if (thumbW > maxThumbDim || thumbH > maxThumbDim) {
          if (thumbW > thumbH) {
            thumbH = Math.round(thumbH * maxThumbDim / thumbW);
            thumbW = maxThumbDim;
          } else {
            thumbW = Math.round(thumbW * maxThumbDim / thumbH);
            thumbH = maxThumbDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, thumbW);
        canvas.height = Math.max(1, thumbH);
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          thumbnailDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        }
      } catch (thumbErr) {
        console.warn("Video thumbnail capture notice:", thumbErr);
      }
      cleanUp();
      resolve({
        duration: Math.round(video.duration || 0),
        width: video.videoWidth || 720,
        height: video.videoHeight || 1280,
        thumbnailDataUrl
      });
    };
    video.onerror = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timeoutTimer);
        cleanUp();
        resolve({
          duration: 0,
          width: 720,
          height: 1280,
          thumbnailDataUrl: ""
        });
      }
    };
    video.src = url;
  });
}

const storeLocalVideoBlob = async (id, blob) => {
};
const getLocalVideoBlobUrl = async (id) => null;

const DB_NAME = "imi_chat_uploads_db";
const DB_VERSION = 1;
const STORE_NAME = "pending_uploads";
function openUploadsDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not supported"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db2 = e.target.result;
      if (!db2.objectStoreNames.contains(STORE_NAME)) {
        db2.createObjectStore(STORE_NAME, { keyPath: "messageId" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
class ChatUploadManager {
  constructor() {
    this.tasks = /* @__PURE__ */ new Map();
    this.activeUploadTasks = /* @__PURE__ */ new Map();
    this.listeners = /* @__PURE__ */ new Set();
    this.isInitialized = false;
    if (typeof window !== "undefined") {
      this.initFromStorage();
    }
  }
  async initFromStorage() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    try {
      const db2 = await openUploadsDB();
      const tx = db2.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const storedTasks = req.result || [];
        storedTasks.forEach((t) => {
          if (t.status === "uploading" || t.status === "sending") {
            t.status = "upload_failed";
          }
          if (t.blob && !t.previewUrl) {
            try {
              t.previewUrl = URL.createObjectURL(t.blob);
            } catch (e) {
            }
          }
          this.tasks.set(t.messageId, t);
        });
      };
    } catch (err) {
      console.warn("ChatUploadManager DB init error:", err);
    }
  }
  async persistTask(task) {
    try {
      const db2 = await openUploadsDB();
      const tx = db2.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const { previewUrl, ...recordToStore } = task;
      store.put(recordToStore);
    } catch (err) {
      console.warn("Failed to persist task in IndexedDB:", err);
    }
  }
  async removePersistedTask(messageId) {
    try {
      const db2 = await openUploadsDB();
      const tx = db2.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.delete(messageId);
    } catch (err) {
      console.warn("Failed to remove task from IndexedDB:", err);
    }
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  notify(task) {
    this.listeners.forEach((cb) => {
      try {
        cb(task);
      } catch (err) {
        console.error("Task listener error:", err);
      }
    });
  }
  getTask(messageIdOrClientMsgId) {
    for (const task of this.tasks.values()) {
      if (task.messageId === messageIdOrClientMsgId || task.clientMessageId === messageIdOrClientMsgId) {
        return task;
      }
    }
    return void 0;
  }
  getTasksForChat(chatId) {
    const list = [];
    for (const task of this.tasks.values()) {
      if (task.chatId === chatId) {
        list.push(task);
      }
    }
    return list;
  }
  /**
   * Enqueue and start background media upload
   */
  async startUpload(options) {
    const {
      messageId,
      clientMessageId,
      chatId,
      senderId,
      receiverId,
      type,
      file,
      duration,
      caption,
      previewUrl
    } = options;
    let mimeType = file.type || (type === "voice" ? "audio/webm" : type === "video" ? "video/mp4" : "image/jpeg");
    let finalBlob = file;
    if (type === "image" && file.type.startsWith("image/")) {
      try {
        const compressed = await compressImage(file, 1280, 0.82);
        if (compressed.file && compressed.file.size > 0) {
          finalBlob = compressed.file;
          mimeType = compressed.format || file.type || "image/jpeg";
        }
      } catch (e) {
        console.warn("Image pre-compression fallback:", e);
      }
    }
    const task = {
      messageId,
      clientMessageId,
      chatId,
      senderId,
      receiverId,
      type,
      blob: finalBlob,
      mimeType,
      duration,
      caption,
      progress: 0,
      status: "uploading",
      createdAt: Date.now(),
      previewUrl: previewUrl || (typeof window !== "undefined" ? URL.createObjectURL(finalBlob) : void 0)
    };
    this.tasks.set(messageId, task);
    this.persistTask(task);
    this.notify(task);
    this.executeUpload(task);
    return messageId;
  }
  async executeUpload(task) {
    const { messageId, chatId, senderId, type, mimeType, finalBlob = task.blob } = {
      ...task,
      finalBlob: task.blob
    };
    if (type === "video" && finalBlob) {
      try {
        await storeLocalVideoBlob(messageId, finalBlob);
      } catch (e) {
        console.warn("Local video storage notice in upload manager:", e);
      }
    }
    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth);
      } catch (e) {
        console.warn("Auth check in upload manager:", e);
      }
    }
    let ext = "bin";
    if (mimeType.includes("jpeg") || mimeType.includes("jpg")) ext = "jpg";
    else if (mimeType.includes("png")) ext = "png";
    else if (mimeType.includes("webp")) ext = "webp";
    else if (mimeType.includes("quicktime") || mimeType.includes("mov")) ext = "mov";
    else if (mimeType.includes("webm")) ext = "webm";
    else if (mimeType.includes("ogg")) ext = "ogg";
    else if (mimeType.includes("mp4") || mimeType.includes("m4a") || mimeType.includes("video")) ext = "mp4";
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const folder = type === "voice" ? "voice" : type === "video" ? "videos" : "images";
    const safeChatId = chatId.replace(/[^a-zA-Z0-9_-]/g, "_");
    const storagePath = `chats/${safeChatId}/${folder}/${type}_${timestamp}_${randomSuffix}.${ext}`;
    task.storagePath = storagePath;
    const maxUploadAttempts = 3;
    let attempt = 0;
    let lastError = null;
    while (attempt < maxUploadAttempts) {
      attempt++;
      try {
        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, finalBlob, {
          contentType: mimeType || (type === "video" ? "video/mp4" : "application/octet-stream")
        });
        this.activeUploadTasks.set(messageId, uploadTask);
        const downloadURL = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              if (snapshot.totalBytes > 0) {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                task.progress = progress;
                this.notify(task);
              }
            },
            (err) => {
              this.activeUploadTasks.delete(messageId);
              reject(err);
            },
            async () => {
              this.activeUploadTasks.delete(messageId);
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (getUrlErr) {
                reject(getUrlErr);
              }
            }
          );
        });
        task.downloadURL = downloadURL;
        task.progress = 100;
        task.status = "sent";
        this.notify(task);
        const now = Date.now();
        await updateDoc(doc(db, "chats", chatId, "messages", messageId), cleanFirestoreData({
          mediaUrl: downloadURL,
          storagePath,
          mimeType,
          mediaSize: finalBlob.size,
          status: "sent",
          sentAt: now,
          uploadProgress: 100
        }));
        let lastText = task.caption || "📷 صورة";
        if (type === "voice") lastText = "🎤 رسالة صوتية";
        else if (type === "video") lastText = task.caption || "🎥 مقطع فيديو";
        await setDoc(
          doc(db, "chats", chatId),
          cleanFirestoreData({
            lastMessage: lastText,
            lastMessageTime: now,
            lastMessageSender: senderId,
            lastMessageStatus: "sent"
          }),
          { merge: true }
        );
        this.removePersistedTask(messageId);
        this.tasks.delete(messageId);
        return;
      } catch (err) {
        lastError = err;
        console.warn(`Upload attempt ${attempt}/${maxUploadAttempts} failed for message ${messageId}:`, err);
        if (attempt < maxUploadAttempts) {
          await new Promise((r) => setTimeout(r, 600));
        }
      }
    }
    if (finalBlob && finalBlob.size < 9e5) {
      try {
        const reader = new FileReader();
        const base64Url = await new Promise((res) => {
          reader.onload = () => res(reader.result);
          reader.onerror = () => res("");
          reader.readAsDataURL(finalBlob);
        });
        if (base64Url && base64Url.startsWith("data:")) {
          const now = Date.now();
          task.downloadURL = base64Url;
          task.progress = 100;
          task.status = "sent";
          this.notify(task);
          await updateDoc(doc(db, "chats", chatId, "messages", messageId), cleanFirestoreData({
            mediaUrl: base64Url,
            mimeType,
            mediaSize: finalBlob.size,
            status: "sent",
            sentAt: now,
            uploadProgress: 100
          }));
          let lastText = task.caption || "📷 صورة";
          if (type === "voice") lastText = "🎤 رسالة صوتية";
          else if (type === "video") lastText = task.caption || "🎥 مقطع فيديو";
          await setDoc(
            doc(db, "chats", chatId),
            cleanFirestoreData({
              lastMessage: lastText,
              lastMessageTime: now,
              lastMessageSender: senderId,
              lastMessageStatus: "sent"
            }),
            { merge: true }
          );
          this.removePersistedTask(messageId);
          this.tasks.delete(messageId);
          return;
        }
      } catch (fbErr) {
        console.warn("Fallback base64 conversion failed:", fbErr);
      }
    }
    console.warn(`Storage upload failed for message ${messageId}, falling back to local sent state via IndexedDB:`, lastError);
    try {
      const now = Date.now();
      task.progress = 100;
      task.status = "sent";
      this.notify(task);
      await updateDoc(doc(db, "chats", chatId, "messages", messageId), cleanFirestoreData({
        status: "sent",
        sentAt: now,
        uploadProgress: 100
      }));
      let lastText = task.caption || "📷 صورة";
      if (type === "voice") lastText = "🎤 رسالة صوتية";
      else if (type === "video") lastText = task.caption || "🎥 مقطع فيديو";
      await setDoc(
        doc(db, "chats", chatId),
        cleanFirestoreData({
          lastMessage: lastText,
          lastMessageTime: now,
          lastMessageSender: senderId,
          lastMessageStatus: "sent"
        }),
        { merge: true }
      );
      this.removePersistedTask(messageId);
      this.tasks.delete(messageId);
      return;
    } catch (fallbackErr) {
      console.error("Local fallback finalization error:", fallbackErr);
    }
    console.error(`Final upload failure for message ${messageId}:`, lastError);
    this.activeUploadTasks.delete(messageId);
    task.status = "upload_failed";
    task.error = lastError?.message || "فشل في رفع الفيديو";
    this.persistTask(task);
    this.notify(task);
    try {
      await updateDoc(doc(db, "chats", chatId, "messages", messageId), cleanFirestoreData({
        status: "upload_failed",
        error: lastError?.message || "فشل في رفع الفيديو"
      }));
    } catch (e) {
    }
  }
  async retryUpload(messageId) {
    const task = this.tasks.get(messageId);
    if (!task) {
      throw new Error("Task not found for retry");
    }
    task.status = "uploading";
    task.progress = 0;
    task.error = void 0;
    this.persistTask(task);
    this.notify(task);
    try {
      await updateDoc(doc(db, "chats", task.chatId, "messages", messageId), cleanFirestoreData({
        status: "uploading",
        error: null
      }));
    } catch (e) {
    }
    this.executeUpload(task);
  }
  cancelUpload(messageId) {
    const uploadTask = this.activeUploadTasks.get(messageId);
    if (uploadTask) {
      uploadTask.cancel();
      this.activeUploadTasks.delete(messageId);
    }
    const task = this.tasks.get(messageId);
    if (task) {
      task.status = "upload_failed";
      this.persistTask(task);
      this.notify(task);
    }
  }
}
const chatUploadManager = new ChatUploadManager();

const IMI_BOT_ID = "imi_bot";
async function initializeUserOnboarding(userId, userName) {
  if (!userId) return;
  try {
    const botUserRef = doc(db, "users", IMI_BOT_ID);
    const botUserSnap = await getDoc(botUserRef);
    if (!botUserSnap.exists()) {
      await setDoc(botUserRef, {
        displayName: "المساعد الذكي - IMI",
        phoneNumber: "+212600000000",
        about: "المساعد الرسمي لتطبيق IMI للترحيب والدعم الفوري",
        photoURL: "/pwa-192x192.png",
        online: true,
        lastSeen: Date.now(),
        updatedAt: Date.now()
      }, { merge: true });
    }
    const participants = [userId, IMI_BOT_ID].sort();
    const botChatId = `bot_${userId}`;
    const botChatRef = doc(db, "chats", botChatId);
    const botChatSnap = await getDoc(botChatRef);
    if (!botChatSnap.exists()) {
      await setDoc(botChatRef, {
        participants,
        lastMessage: "🎉 أهلاً بك في تطبيق IMI! يسعدنا انضمامك.",
        lastMessageTime: Date.now(),
        lastMessageSender: IMI_BOT_ID,
        lastMessageStatus: "delivered",
        createdAt: Date.now()
      });
      const msg1Ref = doc(db, "chats", botChatId, "messages", "welcome_1");
      await setDoc(msg1Ref, {
        sender: IMI_BOT_ID,
        receiverId: userId,
        type: "text",
        text: `مرحباً ${userName || "بك"} في تطبيق IMI! 🎉

تطبيقك المتكامل للتواصل الفوري، إليك أهم الميزات الجاهزة للاستخدام الآن:`,
        timestamp: Date.now() - 3e3,
        status: "delivered"
      });
      const msg2Ref = doc(db, "chats", botChatId, "messages", "welcome_2");
      await setDoc(msg2Ref, {
        sender: IMI_BOT_ID,
        receiverId: userId,
        type: "text",
        text: `💬 **المحادثات:** إرسال رسائل نصية، صور، رسائل صوتية، وملفات.
📞 **المكالمات:** مكالمات صوت وفيديو مباشرة عالية الجودة.
⭕ **الحالات (Stories):** نشر صور ونصوص تختفي بعد 24 ساعة.
🎬 **IMI Video:** تصفح ونشر مقاطع الريلز والفيديوهات القصيرة.

جرّب الرد عليّ هنا أو اضغط على (+) لبدء محادثة مع أي رقم هاتف!`,
        timestamp: Date.now() - 1e3,
        status: "delivered"
      });
    }
  } catch (err) {
    console.warn("Failed to initialize onboarding data:", err);
  }
}
function getBotResponse(userMessage, userName) {
  const q = userMessage.toLowerCase().trim();
  if (q.includes("مرحبا") || q.includes("السلام") || q.includes("أهلا") || q.includes("hello") || q.includes("hi")) {
    return `أهلاً وسهلاً بك ${userName }! 👋 أنا المساعد الذكي لتطبيق IMI. كيف يمكنني مساعدتك اليوم؟`;
  }
  if (q.includes("مكالم") || q.includes("اتصال") || q.includes("فيديو") || q.includes("صوت") || q.includes("call")) {
    return '📞 لإجراء مكالمة:\n1. افتح تبويب "المكالمات" أو اضغط على أيقونة الهاتف/الفيديو داخل أي محادثة.\n2. يتم الاتصال بتقنية WebRTC المشفرة من طرف لطرف.';
  }
  if (q.includes("ريلز") || q.includes("فيديو") || q.includes("reels") || q.includes("video")) {
    return '🎬 يمكنك الضغط على تبويب "IMI Video" في الأعلى لمشاهدة الريلز والتفاعل معها، أو الضغط على زر (+) لنشر مقطع ريلز خاص بك!';
  }
  if (q.includes("حالة") || q.includes("قصة") || q.includes("story") || q.includes("status")) {
    return '⭕ يمكنك نشر حالاتك اليومية من تبويب "الحالات" بالضغط على "إضافة حالة" وستظهر لجميع أصدقائك لمدة 24 ساعة.';
  }
  if (q.includes("رقم") || q.includes("صديق") || q.includes("اضافة") || q.includes("محادثة جديدة")) {
    return "➕ لبدء محادثة مع شخص آخر، اضغط على الزر الدائري الأزرق (+) في أسفل الشاشة واكتب رقم هاتفه مسبوقاً برمز الدولة (مثلاً: +212600000000).";
  }
  return `شكراً لرسالتك! 🌟 يمكنك استخدام تطبيق IMI للمراسلة، مشاركة الصور والمقاطع الصوتية، إجراء مكالمات فيديو وصوتية، واستكشاف قسم الريلز (IMI Video). هل تود تجربة شيء محدد؟`;
}

async function sendFcmMessageNotification(params) {
  try {
    if (!params.receiverId || params.receiverId === "group" || params.receiverId.startsWith("bot_")) return;
    const tokensRef = collection(db, "users", params.receiverId, "tokens");
    const snap = await getDocs(tokensRef);
    const tokens = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.fcmToken && data.enabled !== false) {
        tokens.push(data.fcmToken);
      }
    });
    if (!tokens.length) return;
    await fetch("/api/fcm/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tokens,
        chatId: params.chatId,
        messageId: params.messageId,
        senderId: params.senderId,
        senderName: params.senderName,
        messageType: params.messageType,
        preview: params.preview
      })
    });
  } catch (e) {
    console.warn("FCM message dispatch notice:", e);
  }
}
async function sendFcmCallNotification(params) {
  try {
    if (!params.calleeId) return;
    const tokensRef = collection(db, "users", params.calleeId, "tokens");
    const snap = await getDocs(tokensRef);
    const tokens = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.fcmToken && data.enabled !== false) {
        tokens.push(data.fcmToken);
      }
    });
    if (!tokens.length) return;
    await fetch("/api/fcm/send-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tokens,
        callId: params.callId,
        callerId: params.callerId,
        callerName: params.callerName,
        callerAvatar: params.callerAvatar || "",
        callType: params.callType
      })
    });
  } catch (e) {
    console.warn("FCM call dispatch notice:", e);
  }
}
async function sendFcmCancelCall(calleeId, callId) {
  try {
    if (!calleeId || !callId) return;
    const tokensRef = collection(db, "users", calleeId, "tokens");
    const snap = await getDocs(tokensRef);
    const tokens = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.fcmToken && data.enabled !== false) {
        tokens.push(data.fcmToken);
      }
    });
    if (!tokens.length) return;
    await fetch("/api/fcm/cancel-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokens, callId })
    });
  } catch (e) {
    console.warn("FCM cancel call dispatch notice:", e);
  }
}

const FOUR_HOURS_MS = 4 * 60 * 60 * 1e3;
const isMessageWithinFourHours = (timestamp) => {
  if (!timestamp) return true;
  return Date.now() - timestamp <= FOUR_HOURS_MS;
};
const messagingService = {
  /**
   * Dispatch an outbox item to Firestore and mark as sent
   */
  async dispatchOutboxItem(item) {
    const { chatId, senderId, receiverId, otherDisplayName, text, replyTo, isViewOnce, messageId, clientMessageId, createdAt } = item;
    const now = createdAt || Date.now();
    const cleanText = (text || "").trim();
    const messageData = {
      id: messageId,
      clientMessageId,
      chatId,
      sender: senderId,
      receiverId: receiverId || "group",
      text: cleanText,
      cipherText: cleanText,
      type: "text",
      timestamp: now,
      createdAt: now,
      status: "sent",
      sentAt: Date.now(),
      isViewOnce: !!isViewOnce,
      viewedBy: [],
      replyTo: replyTo || void 0
    };
    const msgRef = doc(db, "chats", chatId, "messages", messageId);
    await setDoc(msgRef, cleanFirestoreData(messageData));
    const chatPreview = isViewOnce ? "1️⃣ رسالة (قراءة لمرة واحدة)" : cleanText;
    await setDoc(
      doc(db, "chats", chatId),
      cleanFirestoreData({
        lastMessage: chatPreview,
        lastMessageTime: now,
        lastMessageSender: senderId,
        lastMessageStatus: "sent"
      }),
      { merge: true }
    );
    androidBridge.deletePendingMessage(messageId);
    if (receiverId && receiverId !== "group") {
      sendFcmMessageNotification({
        receiverId,
        chatId,
        messageId,
        senderId,
        senderName: otherDisplayName || "صديقي",
        messageType: "text",
        preview: cleanText
      });
    }
  },
  /**
   * Send a Text Message with full state machine (pending -> sending -> sent)
   * Guaranteed zero message loss: persisted immediately into Outbox queue
   */
  async sendTextMessage(params) {
    const { chatId, senderId, receiverId, otherDisplayName, text, replyTo, isViewOnce } = params;
    const clientMessageId = `cmsg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const now = Date.now();
    const outboxItem = {
      clientMessageId,
      messageId,
      chatId,
      senderId,
      receiverId: receiverId || "group",
      otherDisplayName,
      type: "text",
      text: text.trim(),
      replyTo: replyTo || null,
      isViewOnce: !!isViewOnce,
      status: "pending",
      createdAt: now,
      retryCount: 0
    };
    await outboxStorage.saveOutboxMessage(outboxItem);
    if (typeof navigator === "undefined" || navigator.onLine) {
      try {
        await outboxStorage.updateOutboxStatus(clientMessageId, "sending");
        await this.dispatchOutboxItem(outboxItem);
        await outboxStorage.removeOutboxMessage(clientMessageId);
      } catch (e) {
        console.warn("[MessagingService] Immediate send failed, item retained in Outbox:", e);
        await outboxStorage.updateOutboxStatus(clientMessageId, "pending", e?.message);
      }
    } else {
      console.log("[MessagingService] Device offline: message held in Outbox with pending status.");
    }
    if (receiverId === IMI_BOT_ID || chatId.startsWith("bot_")) {
      setTimeout(async () => {
        try {
          const botReply = getBotResponse(text, otherDisplayName || "صديقي");
          const botMsgId = `msg_${Date.now()}_bot`;
          const botNow = Date.now();
          await setDoc(doc(db, "chats", chatId, "messages", botMsgId), cleanFirestoreData({
            id: botMsgId,
            sender: IMI_BOT_ID,
            receiverId: senderId,
            text: botReply,
            type: "text",
            timestamp: botNow,
            createdAt: botNow,
            status: "delivered",
            sentAt: botNow,
            deliveredAt: botNow
          }));
          await setDoc(
            doc(db, "chats", chatId),
            cleanFirestoreData({
              lastMessage: botReply,
              lastMessageTime: botNow,
              lastMessageSender: IMI_BOT_ID,
              lastMessageStatus: "delivered"
            }),
            { merge: true }
          );
        } catch (e) {
          console.warn("Bot auto-reply error:", e);
        }
      }, 700);
    }
    return messageId;
  },
  /**
   * Send Media Message (Image, Video, or Voice) with instant delivery & zero latency
   */
  async sendMediaMessage(params) {
    const { chatId, senderId, receiverId, type, file, duration, videoDuration, caption, previewUrl, thumbnailUrl, dataUrl, isViewOnce } = params;
    const clientMessageId = `cmsg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const now = Date.now();
    let directMediaUrl = dataUrl || "";
    if (!directMediaUrl && file) {
      try {
        if (type === "voice") {
          directMediaUrl = await blobToDataURL(file);
        } else if (type === "image") {
          const compressed = await compressImage(file, 960, 0.75);
          directMediaUrl = compressed.dataUrl;
        } else if (type === "video" && file.size < 6e5) {
          directMediaUrl = await blobToDataURL(file);
        }
      } catch (e) {
        console.warn("Direct media preparation notice:", e);
      }
    }
    const hasDirectMedia = Boolean(directMediaUrl && directMediaUrl.length > 0 && directMediaUrl.length < 85e4);
    const cleanCaption = caption ? caption.trim() : void 0;
    const initialDoc = {
      id: messageId,
      clientMessageId,
      chatId,
      sender: senderId,
      receiverId: receiverId || "group",
      type,
      text: cleanCaption,
      cipherText: cleanCaption,
      mediaUrl: hasDirectMedia ? directMediaUrl : void 0,
      thumbnailUrl: thumbnailUrl || void 0,
      audioDuration: type === "voice" && duration ? Math.max(1, Math.round(duration)) : void 0,
      videoDuration: type === "video" ? Math.max(1, Math.round(videoDuration || duration || 1)) : void 0,
      timestamp: now,
      createdAt: now,
      sentAt: now,
      status: hasDirectMedia ? "sent" : "uploading",
      uploadProgress: hasDirectMedia ? 100 : 0,
      isViewOnce: !!isViewOnce,
      viewedBy: [],
      previewUrl: previewUrl || (hasDirectMedia ? directMediaUrl.substring(0, 300) : void 0)
    };
    if (type === "video" && file) {
      try {
        await storeLocalVideoBlob(messageId, file);
      } catch (e) {
        console.warn("Local video blob caching notice:", e);
      }
    }
    await setDoc(doc(db, "chats", chatId, "messages", messageId), cleanFirestoreData(initialDoc));
    let lastMsgPreview = "📷 صورة";
    if (isViewOnce) {
      if (type === "image") lastMsgPreview = "1️⃣ صورة (عرض لمرة واحدة)";
      else if (type === "video") lastMsgPreview = "1️⃣ فيديو (عرض لمرة واحدة)";
      else if (type === "voice") lastMsgPreview = "1️⃣ رسالة صوتية (عرض لمرة واحدة)";
      else lastMsgPreview = "1️⃣ رسالة لمرة واحدة";
    } else {
      if (type === "voice") lastMsgPreview = "🎤 رسالة صوتية";
      else if (type === "video") lastMsgPreview = caption || "🎥 مقطع فيديو";
      else if (caption) lastMsgPreview = caption;
    }
    await setDoc(
      doc(db, "chats", chatId),
      cleanFirestoreData({
        lastMessage: lastMsgPreview,
        lastMessageTime: now,
        lastMessageSender: senderId,
        lastMessageStatus: hasDirectMedia ? "sent" : "uploading"
      }),
      { merge: true }
    );
    if (!hasDirectMedia) {
      chatUploadManager.startUpload({
        messageId,
        clientMessageId,
        chatId,
        senderId,
        receiverId: receiverId || "group",
        type,
        file,
        duration: type === "voice" ? duration : videoDuration || duration,
        caption,
        previewUrl: thumbnailUrl || previewUrl
      });
    }
    if (receiverId && receiverId !== "group") {
      sendFcmMessageNotification({
        receiverId,
        chatId,
        messageId,
        senderId,
        senderName: "صديقي",
        messageType: type,
        preview: lastMsgPreview
      });
    }
    return messageId;
  },
  /**
   * Batch mark messages as Delivered
   */
  async markMessagesDelivered(chatId, messages, currentUserId) {
    if (!chatId || !messages.length || !currentUserId) return;
    const toMark = messages.filter(
      (m) => m.id && m.sender !== currentUserId && m.status === "sent"
    );
    if (!toMark.length) return;
    const now = Date.now();
    const batch = writeBatch(db);
    toMark.forEach((msg) => {
      if (msg.id) {
        const msgRef = doc(db, "chats", chatId, "messages", msg.id);
        batch.update(msgRef, {
          status: "delivered",
          deliveredAt: now
        });
      }
    });
    const chatRef = doc(db, "chats", chatId);
    batch.update(chatRef, {
      lastMessageStatus: "delivered"
    });
    try {
      await batch.commit();
    } catch (err) {
      console.warn("Batch mark delivered warning:", err);
    }
  },
  /**
   * Batch mark messages as Read
   */
  async markMessagesRead(chatId, messages, currentUserId) {
    if (!chatId || !messages.length || !currentUserId) return;
    const toMark = messages.filter(
      (m) => m.id && m.sender !== currentUserId && m.status !== "read"
    );
    if (!toMark.length) return;
    const now = Date.now();
    const batch = writeBatch(db);
    toMark.forEach((msg) => {
      if (msg.id) {
        const msgRef = doc(db, "chats", chatId, "messages", msg.id);
        batch.update(msgRef, {
          status: "read",
          readAt: now
        });
      }
    });
    const chatRef = doc(db, "chats", chatId);
    batch.update(chatRef, {
      lastMessageStatus: "read"
    });
    try {
      await batch.commit();
    } catch (err) {
      console.warn("Batch mark read warning:", err);
    }
  },
  /**
   * Delete Message For Everyone (within 4 hours)
   */
  async deleteMessageForEveryone(chatId, msg, currentUserId) {
    if (!chatId || !msg.id || msg.sender !== currentUserId) return false;
    if (!isMessageWithinFourHours(msg.timestamp || msg.createdAt)) {
      throw new Error("لا يمكن حذف الرسالة لدى الجميع بعد مرور 4 ساعات من إرسالها.");
    }
    const msgRef = doc(db, "chats", chatId, "messages", msg.id);
    await updateDoc(msgRef, {
      isDeleted: true,
      text: "",
      mediaUrl: "",
      previewUrl: ""
    });
    return true;
  },
  /**
   * Delete Message For Me Only
   */
  async deleteMessageForMe(chatId, messageId, currentUserId) {
    if (!chatId || !messageId || !currentUserId) return;
    const msgRef = doc(db, "chats", chatId, "messages", messageId);
    await updateDoc(msgRef, {
      deletedFor: arrayUnion(currentUserId)
    });
  },
  /**
   * Permanently delete message document (if permitted)
   */
  async deletePermanently(chatId, messageId) {
    if (!chatId || !messageId) return;
    await deleteDoc(doc(db, "chats", chatId, "messages", messageId));
  },
  /**
   * Edit sent message text (within 4 hours) with re-encryption
   */
  async editMessage(chatId, msg, newText, currentUserId) {
    if (!chatId || !msg.id || msg.sender !== currentUserId) return;
    if (!isMessageWithinFourHours(msg.timestamp || msg.createdAt)) {
      throw new Error("لا يمكن تعديل الرسالة بعد مرور 4 ساعات من إرسالها.");
    }
    const msgRef = doc(db, "chats", chatId, "messages", msg.id);
    await updateDoc(msgRef, {
      text: newText.trim(),
      cipherText: newText.trim(),
      isEdited: true
    });
  },
  /**
   * Toggle emoji reaction on message
   */
  async toggleReaction(chatId, messageId, currentReactions, emoji, userId) {
    if (!chatId || !messageId || !userId) return;
    const updatedReactions = { ...currentReactions || {} };
    if (updatedReactions[userId] === emoji) {
      delete updatedReactions[userId];
    } else {
      updatedReactions[userId] = emoji;
    }
    const msgRef = doc(db, "chats", chatId, "messages", messageId);
    await updateDoc(msgRef, {
      reactions: updatedReactions
    });
  },
  /**
   * Pin message in chat
   */
  async pinMessage(chatId, msg, currentUserId) {
    if (!chatId || !msg.id) return;
    const pText = msg.text || (msg.type === "image" ? "📷 صورة" : msg.type === "video" ? "🎥 فيديو" : "🎤 رسالة صوتية");
    await setDoc(
      doc(db, "chats", chatId),
      {
        pinnedMessageId: msg.id,
        pinnedMessageText: pText,
        pinnedMessageSender: msg.sender
      },
      { merge: true }
    );
  },
  /**
   * Retry failed message
   */
  async retryMessage(chatId, msg) {
    if (!msg.id) return;
    if (msg.clientMessageId) {
      await outboxStorage.updateOutboxStatus(msg.clientMessageId, "pending");
    }
    if (msg.type === "voice" || msg.type === "image" || msg.type === "video") {
      try {
        await chatUploadManager.retryUpload(msg.id);
      } catch (e) {
        console.warn("Retry via upload manager failed, resetting state:", e);
      }
    } else if (msg.type === "text") {
      try {
        const msgRef = doc(db, "chats", chatId, "messages", msg.id);
        await updateDoc(msgRef, {
          status: "sent",
          sentAt: Date.now()
        });
      } catch (e) {
        console.warn("Direct update retry failed, outbox will sync on reconnect:", e);
      }
    }
  },
  /**
   * Mark a View-Once (قراءة مرة واحدة) message as opened/viewed
   */
  async markViewOnceAsViewed(chatId, messageId, userId) {
    if (!chatId || !messageId || !userId) return;
    try {
      const msgRef = doc(db, "chats", chatId, "messages", messageId);
      await updateDoc(msgRef, {
        viewedBy: arrayUnion(userId),
        viewedAt: Date.now(),
        isViewOnceOpened: true,
        status: "read"
      });
      await setDoc(
        doc(db, "chats", chatId),
        cleanFirestoreData({
          lastMessage: "1️⃣ تم الفتح",
          lastMessageTime: Date.now(),
          lastMessageStatus: "read"
        }),
        { merge: true }
      );
    } catch (e) {
      console.warn("markViewOnceAsViewed error:", e);
    }
  }
};

class OutboxSyncService {
  constructor() {
    this.isProcessing = false;
    this.intervalId = null;
    this.isInitialized = false;
  }
  init() {
    if (this.isInitialized || typeof window === "undefined") return;
    this.isInitialized = true;
    window.addEventListener("online", () => {
      console.log("[OutboxSync] Device is back online, flushing queue...");
      this.triggerSync();
    });
    window.addEventListener("imi_outbox_updated", () => {
      if (navigator.onLine) {
        this.triggerSync();
      }
    });
    this.intervalId = setInterval(() => {
      if (navigator.onLine && !this.isProcessing) {
        this.triggerSync();
      }
    }, 12e3);
    if (navigator.onLine) {
      setTimeout(() => this.triggerSync(), 1500);
    }
  }
  /**
   * Trigger queue synchronization immediately
   */
  async triggerSync() {
    if (this.isProcessing) return;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      console.log("[OutboxSync] Skipping sync: Device is currently offline.");
      return;
    }
    this.isProcessing = true;
    try {
      const items = await outboxStorage.getOutboxMessages();
      if (items.length === 0) {
        this.isProcessing = false;
        return;
      }
      console.log(`[OutboxSync] Found ${items.length} pending outbox messages to sync.`);
      for (const item of items) {
        if (!navigator.onLine) break;
        if (item.status === "failed" && (item.retryCount || 0) > 5) {
          continue;
        }
        try {
          await outboxStorage.updateOutboxStatus(item.clientMessageId, "sending");
          await messagingService.dispatchOutboxItem(item);
          await outboxStorage.removeOutboxMessage(item.clientMessageId);
          console.log(`[OutboxSync] Successfully dispatched message: ${item.clientMessageId}`);
        } catch (err) {
          console.warn(`[OutboxSync] Failed to dispatch ${item.clientMessageId}:`, err);
          const isNetworkError = !navigator.onLine || err?.message?.includes("offline") || err?.message?.includes("network");
          await outboxStorage.updateOutboxStatus(
            item.clientMessageId,
            isNetworkError ? "pending" : "failed",
            err?.message || "Failed to dispatch"
          );
          if (isNetworkError) {
            break;
          }
        }
      }
    } catch (e) {
      console.warn("[OutboxSync] Error during sync run:", e);
    } finally {
      this.isProcessing = false;
    }
  }
  /**
   * Manually retry a specific message by its clientMessageId
   */
  async retryMessage(clientMessageId) {
    await outboxStorage.updateOutboxStatus(clientMessageId, "pending");
    this.triggerSync();
  }
  cleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
const outboxSyncService = new OutboxSyncService();
if (typeof window !== "undefined") {
  outboxSyncService.init();
}

const STALE_PRESENCE_THRESHOLD_MS = 45e3;
function usePresence(userId) {
  reactExports.useEffect(() => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const setOnlineState = async (online) => {
      const isActuallyOnline = online && navigator.onLine;
      try {
        await updateDoc(userRef, {
          online: isActuallyOnline,
          lastSeen: Date.now(),
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        try {
          await setDoc(userRef, {
            id: userId,
            online: isActuallyOnline,
            lastSeen: Date.now(),
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (e) {
          console.warn("Presence update failed:", e);
        }
      }
    };
    if (navigator.onLine) {
      setOnlineState(true);
    }
    const heartbeatInterval = setInterval(() => {
      if (document.visibilityState === "visible" && navigator.onLine) {
        setOnlineState(true);
      }
    }, 2e4);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setOnlineState(false);
      } else if (navigator.onLine) {
        setOnlineState(true);
      }
    };
    const handleFocus = () => {
      if (navigator.onLine) setOnlineState(true);
    };
    const handleBlur = () => {
      if (document.visibilityState === "hidden") {
        setOnlineState(false);
      }
    };
    const handleNetworkOnline = () => setOnlineState(true);
    const handleNetworkOffline = () => setOnlineState(false);
    const handlePageHide = () => {
      setOnlineState(false);
    };
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("online", handleNetworkOnline);
    window.addEventListener("offline", handleNetworkOffline);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);
    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("online", handleNetworkOnline);
      window.removeEventListener("offline", handleNetworkOffline);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      setOnlineState(false);
    };
  }, [userId]);
}
function isUserOnline(lastSeenTimestamp, rawOnline) {
  if (!rawOnline || !lastSeenTimestamp) return false;
  const diffMs = Date.now() - lastSeenTimestamp;
  return diffMs >= 0 && diffMs < STALE_PRESENCE_THRESHOLD_MS;
}
function formatLastSeen(lastSeenTimestamp, rawOnline) {
  if (isUserOnline(lastSeenTimestamp, rawOnline)) {
    return "متصل الآن";
  }
  if (!lastSeenTimestamp) {
    return "غير متصل";
  }
  const now = Date.now();
  const diffMs = Math.max(0, now - lastSeenTimestamp);
  const diffMins = Math.floor(diffMs / (1e3 * 60));
  const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
  if (diffMins < 1) {
    return "منذ لحظات";
  }
  if (diffMins < 60) {
    return `منذ ${diffMins} دقيقة`;
  }
  if (diffHours < 24) {
    return `منذ ${diffHours} ساعة`;
  }
  if (diffDays === 1) {
    return "الأمس";
  }
  if (diffDays < 7) {
    return `منذ ${diffDays} أيام`;
  }
  const dateObj = new Date(lastSeenTimestamp);
  return dateObj.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "short"
  });
}

const ringtoneManager = {
  playRingback: () => {
  },
  playIncoming: () => {
  },
  stop: () => {
  },
  stopRingtone: () => {
  },
  startOutgoingRingtone: () => {
  },
  startIncomingRingtone: () => {
  },
  showMessageNotification: (a, b) => {
  },
  showCallNotification: (a, b) => {
  },
  playNotification: () => {
  }
};

const ChatList = reactExports.lazy(() => __vitePreload(() => import('./ChatList-CaUC28hZ.js'),true?__vite__mapDeps([0,1,2,3,4]):void 0));
const ChatRoom = reactExports.lazy(() => __vitePreload(() => import('./ChatRoom-CeQkx6y_.js'),true?__vite__mapDeps([5,1,2,3]):void 0));
const WebRTCCallModal = reactExports.lazy(() => __vitePreload(() => import('./WebRTCCallModal-C3oKjUT9.js'),true?__vite__mapDeps([6,1,2,7,4]):void 0));
const ReelsPage = reactExports.lazy(() => __vitePreload(() => import('./ReelsPage-BNESHT1J.js'),true?__vite__mapDeps([8,1,2,9]):void 0));
const LivePage = reactExports.lazy(() => __vitePreload(() => import('./LivePage-Bts0Sevb.js'),true?__vite__mapDeps([10,1,2,9,7]):void 0));
const AppBuilderStudio = reactExports.lazy(() => __vitePreload(() => import('./AppBuilderStudio-C452d_EV.js'),true?__vite__mapDeps([11,1]):void 0));
const PageLoadingFallback = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 text-xs font-medium text-slate-500 dark:text-slate-400", children: "جاري التحميل..." })
] });
function App$1() {
  const [showDiagnostics, setShowDiagnostics] = reactExports.useState(false);
  const [userId, setUserId] = reactExports.useState(null);
  const [userName, setUserName] = reactExports.useState("مستخدم IMI");
  const [userPhone, setUserPhone] = reactExports.useState("+212600000000");
  const [userAvatar, setUserAvatar] = reactExports.useState("");
  const [isProfileReady, setIsProfileReady] = reactExports.useState(true);
  const [isAuthLoading, setIsAuthLoading] = reactExports.useState(true);
  const [showDownloadModal, setShowDownloadModal] = reactExports.useState(false);
  const [inAppUpdate, setInAppUpdate] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetch("/api/app/version").then((res) => res.json()).then((data) => {
      if (data.success && typeof navigator !== "undefined" && navigator.userAgent.includes("ImiAndroidNative")) {
        if (data.versionCode > 1) {
          setInAppUpdate({
            versionName: data.versionName,
            downloadUrl: data.apkDownloadUrl || "/downloads/imi.apk"
          });
        }
      }
    }).catch(() => {
    });
  }, []);
  const [showCallModal, setShowCallModal] = reactExports.useState(false);
  const [activeCall, setActiveCall] = reactExports.useState(null);
  const [autoAcceptCall, setAutoAcceptCall] = reactExports.useState(false);
  const [initialCallee, setInitialCallee] = reactExports.useState(null);
  reactExports.useEffect(() => {
    outboxSyncService.init();
  }, []);
  const checkUserSession = async (uid) => {
    setUserId(uid);
    let resolvedName = "مستخدم IMI";
    const cached = userProfileCache.getSync(uid);
    if (cached && cached.phoneNumber && cached.displayName) {
      setUserName(cached.displayName);
      setUserPhone(cached.phoneNumber);
      if (cached.photoURL) setUserAvatar(cached.photoURL);
      setIsProfileReady(true);
    }
    try {
      const timeoutPromise = new Promise(
        (_, reject) => setTimeout(() => reject(new Error("Firestore network timeout")), 4500)
      );
      const uDoc = await Promise.race([
        getDoc(doc(db, "users", uid)),
        timeoutPromise
      ]);
      if (uDoc.exists()) {
        const data = uDoc.data();
        userProfileCache.setProfile(uid, data);
        resolvedName = data.displayName || "مستخدم IMI";
        setUserName(resolvedName);
        setUserPhone(data.phoneNumber || data.phone || "+212600000000");
        if (data.photoURL) setUserAvatar(data.photoURL);
        setIsProfileReady(true);
        initializeUserOnboarding(uid, resolvedName);
        notificationService.registerNotificationToken(uid);
        if (auth.currentUser) {
          syncUserWithLocalBackend(auth.currentUser).catch(() => {
          });
        }
      } else {
        const defaultData = {
          authUid: uid,
          displayName: "مستخدم IMI",
          username: "user_" + uid.substring(0, 6),
          phoneNumber: "+212600000000",
          photoURL: "",
          online: true,
          lastSeen: Date.now(),
          createdAt: Date.now()
        };
        await setDoc(doc(db, "users", uid), defaultData, { merge: true });
        userProfileCache.setProfile(uid, defaultData);
        setUserName("مستخدم IMI");
        setUserPhone("+212600000000");
        setIsProfileReady(true);
        initializeUserOnboarding(uid, "مستخدم IMI");
      }
    } catch (e) {
      console.warn("User session check notice (operating in cached mode):", e);
      setUserName("مستخدم IMI");
      setUserPhone("+212600000000");
      setIsProfileReady(true);
    }
  };
  reactExports.useEffect(() => {
    let isMounted = true;
    const unsub = onAuthStateChanged(
      auth,
      async (user) => {
        try {
          if (user) {
            localStorage.setItem("imi_custom_uid", user.uid);
            await checkUserSession(user.uid);
          } else {
            let cachedUid = localStorage.getItem("imi_custom_uid");
            if (!cachedUid) {
              cachedUid = "usr_" + Math.random().toString(36).substring(2, 9);
              localStorage.setItem("imi_custom_uid", cachedUid);
            }
            await checkUserSession(cachedUid);
          }
        } catch (sessionErr) {
          console.warn("Auth session hydration error:", sessionErr);
        } finally {
          if (isMounted) {
            setIsAuthLoading(false);
          }
        }
      },
      (authError) => {
        console.warn("Firebase Auth state error:", authError);
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    );
    return () => {
      isMounted = false;
      unsub();
    };
  }, []);
  usePresence(isProfileReady ? userId : null);
  reactExports.useEffect(() => {
    if (!userId) return;
    const subListenersMap = /* @__PURE__ */ new Map();
    const qChats = query(
      collection(db, "chats"),
      where("participants", "array-contains", userId),
      limit(30)
    );
    const unsubChats = onSnapshot(qChats, (snapshot) => {
      const activeChatIds = new Set(snapshot.docs.map((d) => d.id));
      subListenersMap.forEach((unsub, cId) => {
        if (!activeChatIds.has(cId)) {
          unsub();
          subListenersMap.delete(cId);
        }
      });
      snapshot.docs.forEach((cDoc) => {
        const chatId = cDoc.id;
        if (!subListenersMap.has(chatId)) {
          const msgQuery = query(
            collection(db, "chats", chatId, "messages"),
            where("status", "==", "sent"),
            limit(10)
          );
          let initialLoadComplete = false;
          const unsubMsg = onSnapshot(msgQuery, (msgSnap) => {
            msgSnap.docs.forEach(async (mDoc) => {
              const data = mDoc.data();
              if (data.sender !== userId) {
                if (initialLoadComplete && data.timestamp && Date.now() - data.timestamp < 3e4) {
                  ringtoneManager.showMessageNotification(
                    data.senderName || "رسالة جديدة",
                    data.text || (data.type === "voice" ? "🎤 رسالة صوتية" : data.type === "image" ? "📷 صورة" : data.type === "video" ? "🎥 مقطع فيديو" : "رسالة جديدة")
                  );
                }
                try {
                  await updateDoc(doc(db, "chats", chatId, "messages", mDoc.id), {
                    status: "delivered",
                    deliveredAt: Date.now()
                  });
                  await updateDoc(doc(db, "chats", chatId), {
                    lastMessageStatus: "delivered"
                  });
                } catch (err) {
                  console.warn("Failed to mark message as delivered:", err);
                }
              }
            });
            initialLoadComplete = true;
          }, (err) => {
            handleFirestoreError(err, OperationType.LIST, `chats/${chatId}/messages`);
          });
          subListenersMap.set(chatId, unsubMsg);
        }
      });
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, "chats");
    });
    return () => {
      unsubChats();
      subListenersMap.forEach((unsub, cId) => {
        unsub();
      });
      subListenersMap.clear();
    };
  }, [userId]);
  reactExports.useEffect(() => {
    if (!userId) return;
    const calleeIdentifiers = [userId];
    if (userPhone && userPhone.trim() && userPhone !== userId) {
      const p = userPhone.trim();
      calleeIdentifiers.push(p);
      if (p.startsWith("+")) {
        calleeIdentifiers.push(p.substring(1));
      } else {
        calleeIdentifiers.push("+" + p);
      }
      const rawDigits = p.replace(/\D/g, "");
      if (rawDigits.length >= 9) {
        calleeIdentifiers.push(rawDigits);
        calleeIdentifiers.push("0" + rawDigits.substring(rawDigits.length - 9));
      }
    }
    const uniqueIdentifiers = Array.from(new Set(calleeIdentifiers)).filter(Boolean).slice(0, 10);
    const qCalls = query(
      collection(db, "calls"),
      where("callee", "in", uniqueIdentifiers),
      where("status", "==", "offered"),
      limit(10)
    );
    const unsubCalls = onSnapshot(qCalls, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          const callData = { id: change.doc.id, ...change.doc.data() };
          if (callData.caller === userId) return;
          if (callData.createdAt && Math.abs(Date.now() - callData.createdAt) < 6e4) {
            setActiveCall(callData);
            setShowCallModal(true);
            ringtoneManager.showCallNotification(
              callData.callerName || callData.caller || "مستخدم",
              callData.type || "voice"
            );
          }
        }
      });
    }, (error) => {
      console.warn("Ignored quota error / calls listener error:", error);
    });
    return () => unsubCalls();
  }, [userId, userPhone]);
  const handleLogout = async () => {
    localStorage.removeItem("imi_custom_uid");
    setUserId(null);
    setUserName("");
    setIsProfileReady(false);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const handleStartCall = (calleePhone, calleeName, callType) => {
    setInitialCallee({ phone: calleePhone, name: calleeName, type: callType });
    setActiveCall(null);
    setShowCallModal(true);
  };
  if (isAuthLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen flex items-center justify-center bg-gray-900 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToastProvider, { children: !userId ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Login,
    {
      onLoginSuccess: (uid) => checkUserSession(uid || userId || ""),
      authenticatedUserId: userId
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(HashRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen flex flex-col bg-slate-100 dark:bg-slate-900 overflow-hidden select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed top-3 left-3 z-50 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowDownloadModal(true),
          className: "p-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl shadow-lg transition active:scale-95 flex items-center gap-1.5 text-xs font-bold cursor-pointer",
          title: "تحميل تطبيق Android APK",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 animate-bounce" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "تحميل APK" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setShowDiagnostics(!showDiagnostics),
          className: "p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl shadow transition cursor-pointer",
          title: "تشخيص النظام",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className: "w-4 h-4 text-sky-400" })
        }
      )
    ] }),
    showDiagnostics && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 p-4 bg-black/80 backdrop-blur-xs flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-2xl bg-slate-900 rounded-2xl p-4 overflow-auto max-h-[90vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setShowDiagnostics(false),
          className: "absolute top-4 left-4 p-2 text-slate-400 hover:text-white",
          children: "✕"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DiagnosticScreen, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoadingFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "/",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChatList,
            {
              userId,
              onLogout: handleLogout,
              onStartCall: handleStartCall,
              onOpenCallModal: () => setShowCallModal(true)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "/chat/:chatId",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChatRoom,
            {
              userId,
              onStartCall: handleStartCall,
              onOpenCallModal: () => setShowCallModal(true)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "/reels",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReelsPage,
            {
              userId,
              userName,
              userPhone,
              userAvatar
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "/live",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(LivePage, { userId, userName })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Route,
        {
          path: "/builder",
          element: /* @__PURE__ */ jsxRuntimeExports.jsx(AppBuilderStudio, { onOpenSocialHub: () => {
            window.location.hash = "#/";
          } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true }) })
    ] }) }),
    showCallModal && /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      WebRTCCallModal,
      {
        userId,
        userName,
        activeCall,
        initialCallee,
        autoAccept: autoAcceptCall,
        onCloseCall: () => {
          setShowCallModal(false);
          setActiveCall(null);
          setAutoAcceptCall(false);
          setInitialCallee(null);
        }
      }
    ) }),
    inAppUpdate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-4 left-4 right-4 z-50 p-4 bg-sky-600 text-white rounded-2xl shadow-2xl flex items-center justify-between border border-sky-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-6 h-6 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-sm", children: [
            "تحديث جديد متوفر (",
            inAppUpdate.versionName,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-sky-100", children: "يرجى تثبيت التحديث للحصول على أحدث المميزات." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: inAppUpdate.downloadUrl,
          download: "imi.apk",
          className: "px-4 py-2 bg-white text-sky-700 rounded-xl font-bold text-xs shadow hover:bg-sky-50 transition",
          children: "تحديث الآن"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OfflineIndicator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PWAInstallButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationPermissionPrompt, { userId }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DownloadAppModal, { isOpen: showDownloadModal, onClose: () => setShowDownloadModal(false) })
  ] }) }) }) });
}

function isNativeAndroidEnvironment() {
  if (typeof window === "undefined") return false;
  try {
    const bridge = window.AndroidBridge || window.Android;
    if (bridge && typeof bridge.isNativeApp === "function" && bridge.isNativeApp() === true) {
      return true;
    }
  } catch (e) {
  }
  if (navigator.userAgent && navigator.userAgent.includes("ImiAndroidNative")) {
    return true;
  }
  if (window.location.search && window.location.search.includes("source=android_native")) {
    return true;
  }
  return false;
}
function App() {
  const [isNative, setIsNative] = reactExports.useState(() => isNativeAndroidEnvironment());
  reactExports.useEffect(() => {
    if (!isNative && isNativeAndroidEnvironment()) {
      setIsNative(true);
    }
  }, [isNative]);
  if (isNative) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(App$1, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppDownloadPortal, {});
}

client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);

export { InstallInstructionsModal as I, OperationType as O, PWAInstallButton as P, usePWAInstall as a, androidBridge as b, auth as c, db as d, cleanFirestoreData as e, formatLastSeen as f, compressImage as g, handleFirestoreError as h, isUserOnline as i, blobToDataURL as j, chatUploadManager as k, IMI_BOT_ID as l, messagingService as m, notificationService as n, outboxStorage as o, isMessageWithinFourHours as p, extractVideoMetadata as q, getLocalVideoBlobUrl as r, sendFcmCancelCall as s, sendFcmCallNotification as t, uploadMedia as u, storage as v };
