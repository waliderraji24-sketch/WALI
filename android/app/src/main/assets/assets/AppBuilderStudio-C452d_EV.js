import { j as jsxRuntimeExports, S as Smartphone, e as MessageSquare, r as reactExports, f as Sparkles, aP as Globe, aQ as ClipboardPaste, a3 as Loader2, k as ArrowRight, q as CheckCircle2, a as ShieldCheck, aR as Layers, I as Info, m as Camera, aL as Upload, aS as Compass, B as Bell, aG as RotateCcw, aT as Palette, aU as Sliders, aV as Apple, au as RotateCw, W as WifiOff, ak as Eye, aW as Signal, aA as Wifi, aX as Battery, aK as ExternalLink, o as AlertTriangle, aY as PackageCheck, D as Download, aZ as FileCode2, a_ as Key, C as Check, g as Copy, s as AlertCircle } from './vendor-react-DAzNXBh_.js';

function AppBuilderHeader({
  currentLang,
  onLanguageChange,
  onOpenSocialHub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-40 select-none shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base sm:text-lg font-black text-white tracking-tight", children: "IMI Universal App Studio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-[10px] font-bold", children: "PRO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400", children: currentLang === "ar" ? "تحويل أي موقع ويب إلى تطبيق جوال أصلي لـ Android و Apple" : currentLang === "fr" ? "Convertissez n’importe quel site web en application mobile native" : "Turn any website URL into installable Android and Apple apps" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onOpenSocialHub,
          className: "px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95",
          title: "الانتقال إلى منصة المحادثات والمكالمات",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5 text-blue-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline", children: currentLang === "ar" ? "مركز تواصل IMI" : currentLang === "fr" ? "Hub IMI" : "IMI Social Hub" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-slate-800/80 border border-slate-700 rounded-xl p-0.5 text-xs font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onLanguageChange("ar"),
            className: `px-2 py-1 rounded-lg transition cursor-pointer ${currentLang === "ar" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"}`,
            children: "عربي"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onLanguageChange("en"),
            className: `px-2 py-1 rounded-lg transition cursor-pointer ${currentLang === "en" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"}`,
            children: "EN"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onLanguageChange("fr"),
            className: `px-2 py-1 rounded-lg transition cursor-pointer ${currentLang === "fr" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"}`,
            children: "FR"
          }
        )
      ] })
    ] })
  ] }) });
}

function UrlAuditStep({
  url,
  setUrl,
  isAnalyzing,
  onAnalyze,
  demoSites,
  lang
}) {
  const [inputError, setInputError] = reactExports.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setInputError("يرجى إدخال عنوان موقع ويب صالح للبدء.");
      return;
    }
    setInputError(null);
    onAnalyze();
  };
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setInputError(null);
      }
    } catch {
    }
  };
  const handleSelectDemo = (siteUrl) => {
    setUrl(siteUrl);
    setInputError(null);
    onAnalyze(siteUrl);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl mx-auto space-y-8 select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lang === "ar" ? "محرك التحويل الذكي إلى تطبيقات Android و iOS" : lang === "fr" ? "Moteur de conversion intelligent vers Android & iOS" : "Universal Website to Native Android & iOS Engine" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-black text-white tracking-tight", children: lang === "ar" ? "حوّل أي موقع إلى تطبيق جوال حقيقي قابل للتثبيت" : lang === "fr" ? "Transformez n’importe quel site en application mobile installable" : "Convert Any Website into an Installable Mobile App" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 max-w-xl mx-auto leading-relaxed", children: lang === "ar" ? "أدخل رابط موقعك وسيقوم النظام بفحصه تلقائياً وتوليد حزم التثبيت (APK, AAB, Xcode, PWA) مع التخصيص الكامل للهوية والأيقونات والكاميرا." : lang === "fr" ? "Entrez l’URL de votre site web pour générer automatiquement les packages (APK, AAB, Xcode, PWA) avec personnalisation complète." : "Enter your website URL to automatically audit compatibility and generate native packages (APK, AAB, Xcode, PWA)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col sm:flex-row items-stretch gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                dir: "ltr",
                value: url,
                onChange: (e) => {
                  setUrl(e.target.value);
                  if (inputError) setInputError(null);
                },
                disabled: isAnalyzing,
                placeholder: "https://yourwebsite.com",
                className: "w-full ps-11 pe-24 py-4 bg-slate-950/80 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-2xl text-sm font-mono placeholder:text-slate-500 outline-none transition disabled:opacity-50"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handlePaste,
                disabled: isAnalyzing,
                className: "absolute inset-y-0 end-2 my-auto h-8 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer",
                title: "لصق من الحافظة",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardPaste, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "لصق" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: isAnalyzing || !url.trim(),
              className: "px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition cursor-pointer shrink-0 active:scale-95",
              children: isAnalyzing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جاري الفحص..." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فحص وتجهيز التطبيق" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:rotate-180" })
              ] })
            }
          )
        ] }),
        inputError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-400 font-semibold px-2 animate-fade-in", children: inputError })
      ] }),
      isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-slate-800/80 space-y-3 animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-slate-300 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-3.5 h-3.5 text-blue-400 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جاري تحليل الموقع واختبار التوافقية الذكية..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-blue-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فحص بروتوكول الأمان وتشفير SSL" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-blue-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "استكشاف ملفات PWA Manifest و الأيقونات" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-blue-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "التحقق من ملاءمة الشاشات الذكية (Viewport)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-blue-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "كشف متطلبات الكاميرا والميكروفون والملفات" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-slate-400 px-1 font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "أو جرب بنقرة واحدة مع أحد المواقع الشائعة:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-blue-400", children: "نماذج متوافقة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: demoSites.map((site) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleSelectDemo(site.url),
          disabled: isAnalyzing,
          className: "p-3.5 bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center justify-between transition cursor-pointer text-right group shadow-2xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0",
                  style: { backgroundColor: site.themeColor },
                  children: site.name.charAt(0)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-slate-200 group-hover:text-white truncate", children: site.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-500 truncate", children: site.category })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition shrink-0 font-semibold", children: "تجربة ◀" })
          ]
        },
        site.url
      )) })
    ] })
  ] });
}

function AuditReportCard({
  report,
  onProceed,
  onRecheck,
  lang
}) {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 60) return "text-blue-400 border-blue-500/30 bg-blue-500/10";
    return "text-amber-400 border-amber-500/30 bg-amber-500/10";
  };
  const getScoreGrade = (score) => {
    if (score >= 85) return "ممتاز - جاهز للتحويل الفوري والتثبيت";
    if (score >= 70) return "جيد جداً - متوافق بالكامل مع Android و iOS";
    return "متوسط - سيعمل بشكل سليم عبر غلاف WebView";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-3xl mx-auto space-y-6 select-none animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0",
            style: { backgroundColor: report.themeColor || "#0284c7" },
            children: report.icons.bestIconUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: report.icons.bestIconUrl,
                alt: report.title,
                className: "w-full h-full object-cover rounded-2xl",
                onError: (e) => {
                  e.target.style.display = "none";
                }
              }
            ) : report.title.charAt(0).toUpperCase()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-white", children: report.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30", children: "متوافق" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-blue-400 dir-ltr text-right truncate max-w-sm mt-0.5", children: report.finalUrl }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-1 line-clamp-1", children: report.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center shadow-lg ${getScoreColor(
              report.compatibilityScore
            )}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-black", children: [
                report.compatibilityScore,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-wider font-bold", children: "التوافق" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400 mt-1.5 font-medium", children: getScoreGrade(report.compatibilityScore) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-slate-800 text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-medium", children: "تشفير SSL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: `w-4 h-4 ${report.isHttps ? "text-emerald-400" : "text-amber-400"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white", children: report.isHttps ? "HTTPS آمن" : "غير مشفر" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-medium", children: "شاشات الهواتف" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4 text-emerald-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white", children: report.isMobileResponsive ? "متجاوب تماماً" : "تكيف تلقائي" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-medium", children: "بيان PWA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white", children: report.pwaManifest.found ? "Manifest متاح" : "توليد تلقائي" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400 font-medium", children: "زمن الاستجابة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold font-mono text-white", children: [
            report.responseTimeMs,
            " ms"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-right space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-blue-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "معمارية التطبيق: Native WebView مقابل PWA" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-300 leading-relaxed", children: [
        report.security.explanation,
        " ستقوم المنصة بتغليف الموقع داخل محرك",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: " Android WebView و iOS WKWebView " }),
        "الأصلي (يعمل مع أي موقع دون الحاجة لملكية النطاق)."
      ] }),
      report.pwaCapability && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-2.5 rounded-xl text-xs flex items-start gap-2 ${report.pwaCapability.isFullySupportedOnSite ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300" : "bg-amber-500/10 border border-amber-500/30 text-amber-300"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: report.pwaCapability.explanation })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-2 text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-300", children: "الأذونات والميزات المكتشفة:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3.5 h-3.5 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الكاميرا والميكروفون" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5 text-indigo-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "رفع وتنزيل الملفات" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-3.5 h-3.5 text-emerald-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تحديد الموقع الجغرافي" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3.5 h-3.5 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الإشعارات الفورية (Push)" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onRecheck,
          className: "w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فحص رابط آخر" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onProceed,
          className: "w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition cursor-pointer active:scale-95",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "متابعة لتخصيص ومعاينة التطبيق" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:rotate-180" })
          ]
        }
      )
    ] })
  ] }) });
}

const PRESET_COLORS = [
  "#0284c7",
  // Sky Blue
  "#2563eb",
  // Royal Blue
  "#4f46e5",
  // Indigo
  "#7c3aed",
  // Purple
  "#059669",
  // Emerald
  "#d97706",
  // Amber
  "#dc2626",
  // Red
  "#0f172a"
  // Dark Slate
];
function AppCustomizerStep({
  config,
  onChange,
  onProceedToPreview,
  onBack,
  lang
}) {
  const [activeTab, setActiveTab] = reactExports.useState("identity");
  const handleFeatureToggle = (featureKey) => {
    onChange({
      features: {
        ...config.features,
        [featureKey]: !config.features[featureKey]
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl mx-auto space-y-6 select-none animate-fade-in text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center p-1 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-xs font-bold text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("identity"),
          className: `flex-1 py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "identity" ? "bg-blue-600 text-white shadow-xs" : "hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الهوية والألوان" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("features"),
          className: `flex-1 py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "features" ? "bg-blue-600 text-white shadow-xs" : "hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sliders, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الميزات والأذونات" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("splash"),
          className: `flex-1 py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === "splash" ? "bg-blue-600 text-white shadow-xs" : "hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "شاشة البداية" })
          ]
        }
      )
    ] }),
    activeTab === "identity" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-slate-300", children: "المنصات المستهدفة للتطبيق:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onChange({ platform: "both" }),
              className: `p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${config.platform === "both" ? "border-blue-500 bg-blue-500/10 text-white shadow-sm ring-1 ring-blue-500/30" : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4 text-emerald-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "w-4 h-4 text-blue-400" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Android و Apple" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onChange({ platform: "android" }),
              className: `p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${config.platform === "android" ? "border-emerald-500 bg-emerald-500/10 text-white shadow-sm ring-1 ring-emerald-500/30" : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4 text-emerald-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Android فقط" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onChange({ platform: "ios" }),
              className: `p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${config.platform === "ios" ? "border-blue-500 bg-blue-500/10 text-white shadow-sm ring-1 ring-blue-500/30" : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "w-4 h-4 text-blue-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Apple iOS فقط" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-slate-300", children: "اسم التطبيق (App Name):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: config.appName,
              onChange: (e) => onChange({ appName: e.target.value }),
              className: "w-full px-4 py-3 bg-slate-950/80 border border-slate-700 focus:border-blue-500 rounded-xl text-white text-sm font-semibold outline-none transition",
              placeholder: "اسم متجرك أو شركتك"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-slate-300", children: "معرف الحزمة (Package ID / Bundle ID):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              dir: "ltr",
              value: config.packageId,
              onChange: (e) => onChange({ packageId: e.target.value }),
              className: "w-full px-4 py-3 bg-slate-950/80 border border-slate-700 focus:border-blue-500 rounded-xl text-white text-xs font-mono outline-none transition text-left",
              placeholder: "com.example.app"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-slate-300", children: "اللون الرئيسي للهوية (Theme Color):" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
          PRESET_COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onChange({ themeColor: c }),
              className: `w-9 h-9 rounded-xl transition cursor-pointer transform hover:scale-110 shadow-xs flex items-center justify-center ${config.themeColor.toLowerCase() === c.toLowerCase() ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-105" : "opacity-85 hover:opacity-100"}`,
              style: { backgroundColor: c }
            },
            c
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "color",
                value: config.themeColor,
                onChange: (e) => onChange({ themeColor: e.target.value }),
                className: "w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                dir: "ltr",
                value: config.themeColor,
                onChange: (e) => onChange({ themeColor: e.target.value }),
                className: "w-20 bg-transparent text-xs font-mono text-white outline-none"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    activeTab === "features" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-slate-400", children: "تحكم بميزات المتصفح والأذونات المدمجة في التطبيق:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-bold text-white", children: "السحب للأسفل لتحديث الصفحة (Pull to Refresh)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400", children: "إمكانية تحديث المحتوى بسلاسة عند سحب شاشة التطبيق للأسفل" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: config.features.pullToRefresh,
              onChange: () => handleFeatureToggle("pullToRefresh"),
              className: "w-5 h-5 rounded cursor-pointer accent-blue-600"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-bold text-white", children: "دعم الكاميرا والميكروفون (WebRTC & Media)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400", children: "تمكين التقاط الصور ومكالمات الفيديو داخل التطبيق تلقائياً" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: config.features.cameraMic,
              onChange: () => handleFeatureToggle("cameraMic"),
              className: "w-5 h-5 rounded cursor-pointer accent-blue-600"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-bold text-white", children: "رفع وتحميل الملفات (File Chooser & Download Manager)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400", children: "فتح استوديو الهاتف لرفع المستندات وتنزيل الفواتير والصور" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: config.features.fileUploads,
              onChange: () => handleFeatureToggle("fileUploads"),
              className: "w-5 h-5 rounded cursor-pointer accent-blue-600"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-bold text-white", children: "شاشة بديلة مخصصة عند انقطاع الإنترنت (Offline Screen)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400", children: "عرض واجهة أنيقة مع زر إعادة المحاولة بدلاً من رسائل الخطأ الافتراضية" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: config.features.offlinePage,
              onChange: () => handleFeatureToggle("offlinePage"),
              className: "w-5 h-5 rounded cursor-pointer accent-blue-600"
            }
          )
        ] })
      ] })
    ] }),
    activeTab === "splash" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-slate-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-bold text-white", children: "تفعيل شاشة البداية المتحركة (Splash Screen)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400", children: "عرض شعار واسم التطبيق أثناء تحميل الصفحة الأولى" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: config.splashScreen.showSplash,
            onChange: (e) => onChange({
              splashScreen: {
                ...config.splashScreen,
                showSplash: e.target.checked
              }
            }),
            className: "w-5 h-5 rounded cursor-pointer accent-blue-600"
          }
        )
      ] }),
      config.splashScreen.showSplash && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-slate-300", children: "نص شاشة البداية:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: config.splashScreen.splashText,
              onChange: (e) => onChange({
                splashScreen: {
                  ...config.splashScreen,
                  splashText: e.target.value
                }
              }),
              className: "w-full px-4 py-3 bg-slate-950/80 border border-slate-700 focus:border-blue-500 rounded-xl text-white text-sm outline-none transition",
              placeholder: config.appName
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-slate-300 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مدة ظهور شاشة البداية:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-blue-400", children: [
              (config.splashScreen.splashDelayMs / 1e3).toFixed(1),
              " ثوانٍ"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: "1000",
              max: "4000",
              step: "500",
              value: config.splashScreen.splashDelayMs,
              onChange: (e) => onChange({
                splashScreen: {
                  ...config.splashScreen,
                  splashDelayMs: Number(e.target.value)
                }
              }),
              className: "w-full accent-blue-600 cursor-pointer"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الرجوع للتقرير" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onProceedToPreview,
          className: "w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition cursor-pointer active:scale-95",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "المعاينة التفاعلية وتوليد الحزم" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:rotate-180" })
          ]
        }
      )
    ] })
  ] });
}

function DeviceSimulator({ config, blocksIframe = false }) {
  const [deviceType, setDeviceType] = reactExports.useState("ios");
  const [viewMode, setViewMode] = reactExports.useState("app");
  const [iframeKey, setIframeKey] = reactExports.useState(0);
  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };
  const appInitial = (config.appName || "A").toUpperCase().charAt(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full max-w-md mx-auto select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-2.5 mb-4 shadow-xl flex items-center justify-between text-xs font-semibold text-slate-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-slate-800 p-1 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setDeviceType("ios"),
            className: `px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${deviceType === "ios" ? "bg-blue-600 text-white shadow-xs font-bold" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "iPhone 15" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setDeviceType("android"),
            className: `px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${deviceType === "android" ? "bg-emerald-600 text-white shadow-xs font-bold" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pixel 8" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-slate-800 p-1 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setViewMode("app"),
            title: "عرض التطبيق المباشر",
            className: `px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer ${viewMode === "app" ? "bg-slate-700 text-white font-bold" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "التطبيق" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setViewMode("splash"),
            title: "عرض شاشة البداية",
            className: `px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer ${viewMode === "splash" ? "bg-slate-700 text-white font-bold" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "البداية" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setViewMode("home"),
            title: "عرض أيقونة الشاشة الرئيسية",
            className: `px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer ${viewMode === "home" ? "bg-slate-700 text-white font-bold" : "text-slate-400 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "الأيقونة" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `relative w-[340px] h-[680px] bg-black rounded-[52px] p-3 shadow-2xl border-4 transition-all duration-300 ${deviceType === "ios" ? "border-slate-800 ring-2 ring-slate-700" : "border-slate-850 ring-2 ring-slate-750"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full bg-slate-950 rounded-[42px] overflow-hidden flex flex-col border border-slate-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "w-full h-11 shrink-0 flex items-center justify-between px-6 z-30 text-white text-[11px] font-semibold",
              style: { backgroundColor: viewMode === "splash" ? config.themeColor : "#0f172a" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "9:41" }),
                deviceType === "ios" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500/80" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-3.5 bg-black rounded-full border border-slate-800" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-slate-300", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Battery, { className: "w-4 h-4" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative w-full overflow-hidden flex flex-col bg-slate-900", children: [
            viewMode === "app" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col bg-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-3 py-2 text-white flex items-center justify-between shadow-xs z-10 shrink-0",
                  style: { backgroundColor: config.themeColor },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 shrink-0 text-white/90" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold truncate", children: config.appName })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleReload,
                          className: "p-1 hover:bg-white/20 rounded-full transition cursor-pointer",
                          title: "إعادة تحميل الصفحة",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-3 h-3" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: config.targetUrl,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "p-1 hover:bg-white/20 rounded-full transition cursor-pointer",
                          title: "فتح في متصفح خارجي",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative w-full h-full bg-slate-50 overflow-hidden", children: blocksIframe ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 p-5 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-50 to-slate-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-3 shadow-md",
                    style: { backgroundColor: config.themeColor },
                    children: appInitial
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-slate-900 mb-1", children: config.appName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-blue-600 dir-ltr truncate max-w-[240px] mb-3", children: config.targetUrl }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-700 dark:text-amber-400 text-[11px] text-right leading-relaxed mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-bold mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-3.5 h-3.5 text-amber-600" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "الموقع يقيد التضمين التجريبي" })
                  ] }),
                  "هذا الموقع يحظر نوافذ iframe للأمان، ولكن في تطبيق ",
                  deviceType === "ios" ? "iOS" : "Android",
                  " الأصلي سيفتح الموقع مباشرة وبأمان تام دون أي قيود."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: config.targetUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اختبار الرابط في نافذة جديدة" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  src: config.targetUrl,
                  title: config.appName,
                  className: "w-full h-full border-0 select-auto",
                  sandbox: "allow-scripts allow-same-origin allow-forms allow-popups"
                },
                iframeKey
              ) })
            ] }),
            viewMode === "splash" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "w-full h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in",
                style: { backgroundColor: config.backgroundColor || "#ffffff" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-24 h-24 rounded-3xl flex items-center justify-center text-white text-4xl font-extrabold shadow-2xl mb-5 transform transition-transform hover:scale-105",
                      style: { backgroundColor: config.themeColor },
                      children: config.iconUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: config.iconUrl, alt: config.appName, className: "w-full h-full object-cover rounded-3xl" }) : appInitial
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "text-xl font-extrabold tracking-tight mb-2",
                      style: { color: config.backgroundColor === "#ffffff" ? "#0f172a" : "#ffffff" },
                      children: config.splashScreen.splashText || config.appName
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mb-8", children: "جاري التحميل..." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-7 h-7 border-3 border-t-transparent rounded-full animate-spin",
                      style: { borderColor: config.themeColor, borderTopColor: "transparent" }
                    }
                  )
                ]
              }
            ),
            viewMode === "home" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full relative overflow-hidden bg-gradient-to-tr from-indigo-950 via-slate-900 to-sky-950 p-5 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6 text-center text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-light", children: "12:45" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300", children: "الثلاثاء، 3 نوفمبر" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4 py-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 group cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-13 h-13 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shadow-lg ring-2 ring-white/20 transform transition-transform group-hover:scale-110 active:scale-95",
                      style: { backgroundColor: config.themeColor },
                      children: config.iconUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: config.iconUrl, alt: config.appName, className: "w-full h-full object-cover rounded-2xl" }) : appInitial
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white font-medium truncate max-w-[64px] text-center drop-shadow-md", children: config.appName })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 opacity-60", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-13 h-13 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-lg font-bold shadow-md", children: "📞" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white", children: "الهاتف" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 opacity-60", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-13 h-13 rounded-2xl bg-sky-500 flex items-center justify-center text-white text-lg font-bold shadow-md", children: "💬" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white", children: "الرسائل" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 opacity-60", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-13 h-13 rounded-2xl bg-amber-600 flex items-center justify-center text-white text-lg font-bold shadow-md", children: "⚙️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white", children: "الإعدادات" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/10 backdrop-blur-md rounded-3xl p-3 flex items-center justify-around", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center text-white text-lg shadow-xs", children: "🌐" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-rose-500 flex items-center justify-center text-white text-lg shadow-xs", children: "📷" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center text-white text-lg shadow-xs", children: "🎵" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-slate-700 flex items-center justify-center text-white text-lg shadow-xs", children: "📁" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-5 bg-black shrink-0 flex items-center justify-center z-30", children: deviceType === "ios" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-1 bg-white/70 rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8 text-white/50 text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "◀" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "●" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "■" })
          ] }) })
        ] })
      }
    )
  ] });
}

function ExportPackagesStep({
  config,
  artifacts,
  isGenerating,
  onGenerate,
  onStartNew,
  lang
}) {
  const [platformTab, setPlatformTab] = reactExports.useState("android");
  const [copiedCode, setCopiedCode] = reactExports.useState(false);
  const pwaSnippet = `<!-- ضع هذا الكود داخل وسم <head> في موقعك -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="${config.themeColor}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="${config.appName}">

<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error);
}
<\/script>`;
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(pwaSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3e3);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl mx-auto space-y-6 select-none animate-fade-in text-right", children: [
    !artifacts && !isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black text-white", children: "جاهز لتوليد الحزم والتطبيق النهائي" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 max-w-md mx-auto leading-relaxed", children: "سيقوم المحرك بإنشاء مشروع Android Studio كامل مع Gradle Wrapper، وحزمة APK للاختبار، ومشروع Xcode لـ iOS، وحزمة PWA للويب." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onGenerate,
          className: "px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-2xl text-sm shadow-xl shadow-indigo-600/30 transition cursor-pointer active:scale-95 inline-flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "بناء وتوليد حزم التطبيق الآن" })
          ]
        }
      )
    ] }),
    isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white", children: "جاري توليد ملفات وحزم التطبيق..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "يتم تجميع كود Kotlin الأصلي وتهيئة مشروع Xcode وملفات الأيقونات والموارد" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-3/4 animate-pulse rounded-full" }) })
    ] }),
    artifacts && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-white", children: [
              "تم إنشاء حزم تطبيق ",
              config.appName,
              " بنجاح!"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "يمكنك الآن تنزيل ملفات المشروع الأصلية أو حزمة التثبيت المباشرة لكل منصة" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onStartNew,
            className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تطبيق جديد" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center p-1 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-xs font-bold text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setPlatformTab("android"),
            className: `flex-1 py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${platformTab === "android" ? "bg-emerald-600 text-white shadow-xs" : "hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Android (أندرويد)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setPlatformTab("ios"),
            className: `flex-1 py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${platformTab === "ios" ? "bg-blue-600 text-white shadow-xs" : "hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Apple (آبل iOS)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setPlatformTab("pwa"),
            className: `flex-1 py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${platformTab === "pwa" ? "bg-indigo-600 text-white shadow-xs" : "hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Web PWA" })
            ]
          }
        )
      ] }),
      platformTab === "android" && artifacts.android && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-white", children: "حزمة التثبيت المباشرة للأندرويد (.APK)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold", children: "تثبيت فوري" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "جاهزة للتنزيل والتثبيت المباشر على أي هاتف أندرويد لاختبار التطبيق فورياً." })
            ] })
          ] }),
          artifacts.android.apk && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: artifacts.android.apk,
              download: true,
              className: "w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تنزيل APK" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode2, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-white", children: "كود مشروع Android Studio كامل (.ZIP)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "كود Kotlin الأصلي، مع ملفات Gradle Wrapper، و AndroidManifest، وأيقونات Mipmap." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: artifacts.android.projectZip,
              download: true,
              className: "w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تنزيل سورس كود Android" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/50 border border-slate-800 rounded-2xl space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-amber-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نشر التطبيق على متجر Google Play Store (بصيغة AAB)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-300 leading-relaxed", children: [
            "يطلب متجر Google Play حزم ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "Android App Bundle (.aab)" }),
            " الموقعة بشهادة إنتاج. لإنشاء ملف AAB من الكود الذي قمت بتنزيله:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-black/60 rounded-xl font-mono text-xs text-slate-300 dir-ltr text-left overflow-x-auto", children: "./gradlew bundleRelease" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-400", children: [
            "سيتم إنشاء الملف في المسار: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "app/build/outputs/bundle/release/app-release.aab" })
          ] })
        ] })
      ] }),
      platformTab === "ios" && artifacts.ios && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-white", children: "مشروع Apple Xcode الأصلي (.ZIP)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "مشروع Swift متكامل مع WKWebView، و Info.plist للأذونات، والأيقونات." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: artifacts.ios.projectZip,
              download: true,
              className: "w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تنزيل مشروع Xcode" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/50 border border-slate-800 rounded-2xl space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-blue-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "متطلبات آبل للتوزيع على هواتف iPhone (TestFlight & App Store)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "تفرض شركة آبل توقيع تطبيقات iOS بشهادة مطور معتمدة (Apple Developer Account $99/سنة):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside text-xs text-slate-400 space-y-1.5 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "افتح المشروع في برنامج ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Xcode" }),
              " على نظام macOS."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "من خيار ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Signing & Capabilities" }),
              "، حدد حساب المطور الخاص بك."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "اختر ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Product > Archive" }),
              " لرفع النسخة مباشرة إلى ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "App Store Connect" }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              "أرسل التطبيق للمستخدمين فورياً عبر منصة ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "TestFlight" }),
              " (حتى 10,000 مستخدم)."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-emerald-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "البديل المجاني والفوري: تثبيت عبر متصفح Safari بدون رسوم آبل" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "يمكن لجميع زوار موقعك على هواتف iPhone و iPad تثبيت التطبيق مجاناً وبدون أي متجر:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400", children: [
            "1. افتح الموقع في متصفح ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Safari" }),
            ". 2. اضغط على زر ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "المشاركة" }),
            " (مربع به سهم للأعلى). 3. اختر ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "«إضافة إلى الصفحة الرئيسية»" }),
            ". سيظهر التطبيق بكامل شاشته بدون أشرطة المتصفح."
          ] })
        ] })
      ] }),
      platformTab === "pwa" && artifacts.pwa && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-amber-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "خاص بأصحاب ومديري المواقع (Domain Webmasters Only)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "بسبب سياسة أمان المتصفحات (Same-Origin Policy)، لا يمكن تفعيل Service Worker لموقع لا تملكه. تتطلب هذه الحزمة الوصول المباشر لخادم الموقع لرفع الملفات إلى المسار الجذري (Root Directory)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-400", children: [
            "* إذا كان الموقع لا يخصك وتريد تطبيقا جاهزا له، استخدم تبويب ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Android" }),
            " أو ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Apple iOS" }),
            " لتوليد تطبيق Native WebView يعمل فورا دون تعديل الخادم."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-white", children: "حزمة ملفات PWA الكاملة (.ZIP)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 mt-0.5", children: [
                "تحتوي على ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "manifest.json" }),
                " و ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "sw.js" }),
                " وشاشة عدم الاتصال ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "offline.html" }),
                "."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: artifacts.pwa.packageZip,
              download: true,
              className: "w-full sm:w-auto px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تنزيل ملفات PWA" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-slate-300 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "كود الربط السريع (ضع هذا الكود في <head> موقعك):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleCopyCode,
                className: "flex items-center gap-1 text-blue-400 hover:text-blue-300 transition cursor-pointer",
                children: copiedCode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-emerald-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "تم النسخ!" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نسخ الكود" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-300 dir-ltr text-left overflow-x-auto border border-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: pwaSnippet }) })
        ] })
      ] })
    ] })
  ] });
}

const appBuilderService = {
  /**
   * Fetch pre-configured demo sites for instant testing
   */
  async getDemoSites() {
    try {
      const res = await fetch("/api/app-builder/demo-sites");
      const data = await res.json();
      return data.sites || [];
    } catch {
      return [
        {
          name: "ويكيبيديا (Wikipedia)",
          url: "https://ar.wikipedia.org",
          category: "موسوعة ومعرفة",
          themeColor: "#3366cc",
          description: "الموسوعة الحرة باللغة العربية"
        },
        {
          name: "متجر أمازون (Amazon)",
          url: "https://www.amazon.com",
          category: "تجارة إلكترونية",
          themeColor: "#ff9900",
          description: "منصة التجارة الإلكترونية العالمية"
        },
        {
          name: "بي بي سي عربي (BBC Arabic)",
          url: "https://www.bbc.com/arabic",
          category: "أخبار وإعلام",
          themeColor: "#bb1919",
          description: "أخبار العالم باللغة العربية"
        }
      ];
    }
  },
  /**
   * Run comprehensive audit on target website URL
   */
  async analyzeWebsite(url) {
    const res = await fetch("/api/app-builder/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "فشل فحص الموقع. يرجى التأكد من صحة الرابط.");
    }
    return data.report;
  },
  /**
   * Generate Android, iOS, and PWA project packages
   */
  async generateApp(config) {
    const res = await fetch("/api/app-builder/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "فشلت عملية إنشاء التطبيق.");
    }
    return {
      buildId: data.buildId,
      artifacts: data.artifacts
    };
  }
};

function AppBuilderStudio({ onOpenSocialHub }) {
  const [currentLang, setCurrentLang] = reactExports.useState("ar");
  const [currentStep, setCurrentStep] = reactExports.useState("audit");
  const [url, setUrl] = reactExports.useState("");
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
  const [auditReport, setAuditReport] = reactExports.useState(null);
  const [auditError, setAuditError] = reactExports.useState(null);
  const [demoSites, setDemoSites] = reactExports.useState([]);
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [artifacts, setArtifacts] = reactExports.useState(null);
  const [config, setConfig] = reactExports.useState({
    appName: "My Application",
    packageId: "com.universal.app",
    targetUrl: "",
    themeColor: "#0284c7",
    backgroundColor: "#ffffff",
    platform: "both",
    features: {
      cameraMic: true,
      fileUploads: true,
      downloads: true,
      pullToRefresh: true,
      pushNotifications: true,
      offlinePage: true
    },
    splashScreen: {
      showSplash: true,
      splashDelayMs: 2e3,
      splashText: "My Application"
    }
  });
  reactExports.useEffect(() => {
    appBuilderService.getDemoSites().then(setDemoSites).catch(() => {
    });
  }, []);
  const handleAnalyze = async (overrideUrl) => {
    const target = (overrideUrl || url).trim();
    if (!target) return;
    setIsAnalyzing(true);
    setAuditError(null);
    try {
      const report = await appBuilderService.analyzeWebsite(target);
      setAuditReport(report);
      setUrl(report.finalUrl);
      setConfig((prev) => ({
        ...prev,
        appName: report.suggestedAppIdentity.appName,
        packageId: report.suggestedAppIdentity.packageId,
        targetUrl: report.finalUrl,
        themeColor: report.themeColor || "#0284c7",
        backgroundColor: report.backgroundColor || "#ffffff",
        iconUrl: report.icons.bestIconUrl,
        features: {
          ...prev.features,
          cameraMic: report.detectedFeatures.cameraMic,
          fileUploads: report.detectedFeatures.fileUploads
        },
        splashScreen: {
          ...prev.splashScreen,
          splashText: report.suggestedAppIdentity.appName
        }
      }));
      setCurrentStep("report");
    } catch (err) {
      setAuditError(err.message || "حدث خطأ أثناء فحص الموقع.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  const handleUpdateConfig = (updated) => {
    setConfig((prev) => ({
      ...prev,
      ...updated
    }));
  };
  const handleGeneratePackages = async () => {
    setIsGenerating(true);
    try {
      const res = await appBuilderService.generateApp(config);
      setArtifacts(res.artifacts);
      setCurrentStep("export");
    } catch (err) {
      alert(err.message || "فشلت عملية إنشاء الحزم.");
    } finally {
      setIsGenerating(false);
    }
  };
  const handleStartNew = () => {
    setUrl("");
    setAuditReport(null);
    setArtifacts(null);
    setCurrentStep("audit");
  };
  const STEPS = [
    { key: "audit", label: "1. إدخال الرابط" },
    { key: "report", label: "2. تقرير التوافق" },
    { key: "customize", label: "3. تخصيص الهوية" },
    { key: "preview", label: "4. المحاكي الحي" },
    { key: "export", label: "5. تنزيل الحزم" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${currentLang === "ar" ? "dir-rtl" : "dir-ltr"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AppBuilderHeader,
          {
            currentLang,
            onLanguageChange: setCurrentLang,
            onOpenSocialHub
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-900 border border-slate-800 rounded-2xl p-2 sm:p-3 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between text-xs font-bold overflow-x-auto gap-2", children: STEPS.map((step, idx) => {
            const isActive = currentStep === step.key;
            const isPassed = STEPS.findIndex((s) => s.key === currentStep) > idx || artifacts && step.key === "export";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (isPassed || isActive) setCurrentStep(step.key);
                },
                disabled: !isPassed && !isActive,
                className: `px-3 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed ${isActive ? "bg-blue-600 text-white shadow-xs font-extrabold" : isPassed ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20" : "text-slate-500 opacity-60"}`,
                children: [
                  isPassed && !isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }) : null,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step.label })
                ]
              },
              step.key
            );
          }) }) }),
          auditError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-between text-rose-300 text-xs font-semibold animate-fade-in max-w-3xl mx-auto w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4 shrink-0 text-rose-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: auditError })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setAuditError(null),
                className: "text-rose-400 hover:text-white transition cursor-pointer text-[11px]",
                children: "إغلاق"
              }
            )
          ] }),
          currentStep === "audit" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            UrlAuditStep,
            {
              url,
              setUrl,
              isAnalyzing,
              onAnalyze: handleAnalyze,
              demoSites,
              lang: currentLang
            }
          ),
          currentStep === "report" && auditReport && /* @__PURE__ */ jsxRuntimeExports.jsx(
            AuditReportCard,
            {
              report: auditReport,
              onProceed: () => setCurrentStep("customize"),
              onRecheck: () => setCurrentStep("audit"),
              lang: currentLang
            }
          ),
          currentStep === "customize" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            AppCustomizerStep,
            {
              config,
              onChange: handleUpdateConfig,
              onProceedToPreview: () => setCurrentStep("preview"),
              onBack: () => setCurrentStep("report"),
              lang: currentLang
            }
          ),
          currentStep === "preview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DeviceSimulator,
              {
                config,
                blocksIframe: auditReport?.security.blocksIframeEmbedding
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "معاينة حية وتفاعلية" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-black text-white", children: [
                  "تطبيق ",
                  config.appName,
                  " جاهز للإنشاء"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "شاهد كيف سيظهر تطبيقك للمستخدمين على شاشات iPhone وهواتف Android الحقيقية." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-3 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-300", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "الرابط المستهدف:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-blue-400 dir-ltr truncate max-w-[200px]", children: config.targetUrl })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-300", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "معرف الحزمة (Package ID):" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-slate-200 dir-ltr", children: config.packageId })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-300", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "اللون الأساسي:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-4 h-4 rounded-full shadow-xs",
                        style: { backgroundColor: config.themeColor }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-slate-300", children: config.themeColor })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-300", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "المنصة:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white", children: config.platform === "both" ? "Android + iOS" : config.platform === "android" ? "Android فقط" : "Apple iOS فقط" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setCurrentStep("customize"),
                    className: "w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sliders, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تعديل الإعدادات" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setCurrentStep("export");
                      handleGeneratePackages();
                    },
                    className: "w-full sm:flex-1 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer active:scale-95",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "توليد وتنزيل حزم التطبيق الآن" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rtl:rotate-180" })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          currentStep === "export" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ExportPackagesStep,
            {
              config,
              artifacts,
              isGenerating,
              onGenerate: handleGeneratePackages,
              onStartNew: handleStartNew,
              lang: currentLang
            }
          )
        ] })
      ]
    }
  );
}

export { AppBuilderStudio as default };
