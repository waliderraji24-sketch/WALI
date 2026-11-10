import { j as jsxRuntimeExports, G as Clock, C as Check, ay as CheckCheck, s as AlertCircle } from './vendor-react-DAzNXBh_.js';

function formatMessageTime(timestamp) {
  if (!timestamp || isNaN(timestamp)) return "";
  const date = new Date(timestamp);
  try {
    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "م" : "ص";
    const h12 = hours % 12 || 12;
    return `${h12.toString().padStart(2, "0")}:${minutes} ${period}`;
  }
}
function formatFullDateTime(timestamp) {
  if (!timestamp || isNaN(timestamp)) return "";
  const date = new Date(timestamp);
  try {
    return date.toLocaleString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return date.toLocaleString();
  }
}
function formatDateDivider(timestamp) {
  if (!timestamp || isNaN(timestamp)) return "";
  const date = new Date(timestamp);
  const now = /* @__PURE__ */ new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((today.getTime() - msgDay.getTime()) / (1e3 * 60 * 60 * 24));
  if (diffDays === 0) {
    return "اليوم";
  }
  if (diffDays === 1) {
    return "أمس";
  }
  if (diffDays > 1 && diffDays < 7) {
    try {
      return date.toLocaleDateString("ar-EG", { weekday: "long" });
    } catch {
      return `منذ ${diffDays} أيام`;
    }
  }
  try {
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        weekday: "short"
      });
    }
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch {
    return date.toLocaleDateString();
  }
}
function formatChatListTime(timestamp) {
  if (!timestamp || isNaN(timestamp)) return "";
  const date = new Date(timestamp);
  const now = /* @__PURE__ */ new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((today.getTime() - msgDay.getTime()) / (1e3 * 60 * 60 * 24));
  if (diffDays === 0) {
    return formatMessageTime(timestamp);
  }
  if (diffDays === 1) {
    return "أمس";
  }
  if (diffDays > 1 && diffDays < 7) {
    try {
      return date.toLocaleDateString("ar-EG", { weekday: "short" });
    } catch {
      return `منذ ${diffDays} أيام`;
    }
  }
  try {
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "numeric",
      year: "2-digit"
    });
  } catch {
    return date.toLocaleDateString();
  }
}

function MessageStatusIcon({ status = "sent", className = "" }) {
  if (status === "pending") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center opacity-75 ${className}`, title: "قيد الانتظار", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }) });
  }
  if (status === "sending" || status === "uploading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center opacity-85 ${className}`, title: status === "uploading" ? "جاري الرفع..." : "جاري الإرسال...", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 animate-pulse" }) });
  }
  if (status === "sent") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center opacity-85 transition-all ${className}`, title: "تم الإرسال", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }) });
  }
  if (status === "delivered") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center opacity-90 transition-all ${className}`, title: "تم الاستلام", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3.5 h-3.5" }) });
  }
  if (status === "read") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `inline-flex items-center text-cyan-300 transition-all ${className}`,
        title: "تمت القراءة",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3.5 h-3.5 stroke-[2.4]" })
      }
    );
  }
  if (status === "failed" || status === "upload_failed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center text-rose-400 ${className}`, title: "فشل الإرسال", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-3.5 h-3.5" }) });
  }
  return null;
}

export { MessageStatusIcon as M, formatMessageTime as a, formatFullDateTime as b, formatDateDivider as c, formatChatListTime as f };
