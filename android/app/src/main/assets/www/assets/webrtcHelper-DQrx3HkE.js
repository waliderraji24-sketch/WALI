const __vite_import_meta_env__ = {"VITE_TURN_CREDENTIAL": "Walid", "VITE_TURN_URL": "turn:YOUR_SERVER_IP:3478?transport=udp   turn:YOUR_SERVER_IP:3478?transport=tcp   turns:YOUR_SERVER_IP:5349?transport=tcp", "VITE_TURN_USERNAME": "Walid"};
let cachedDynamicIceServers = null;
let cachedExpiresAt = 0;
let isFetchingCredentials = false;
let currentCredentialStatus = "NOT_CONFIGURED";
async function fetchDynamicTurnConfiguration() {
  if (cachedDynamicIceServers && Date.now() < cachedExpiresAt - 6e4) {
    currentCredentialStatus = "CONFIGURED";
    return cachedDynamicIceServers;
  }
  if (isFetchingCredentials) {
    return cachedDynamicIceServers;
  }
  try {
    isFetchingCredentials = true;
    currentCredentialStatus = "FETCHING";
    const res = await fetch("/api/turn/credentials");
    if (res.ok) {
      const data = await res.json();
      if (data.configured && data.iceServers && data.iceServers.length > 0) {
        cachedDynamicIceServers = data.iceServers;
        cachedExpiresAt = data.expiresAt || Date.now() + 36e5;
        currentCredentialStatus = "CONFIGURED";
        return cachedDynamicIceServers;
      } else {
        currentCredentialStatus = "NOT_CONFIGURED";
      }
    } else {
      currentCredentialStatus = "FETCH_FAILED";
    }
  } catch (err) {
    currentCredentialStatus = "FETCH_FAILED";
    console.warn("[WEBRTC_TURN] Dynamic credential endpoint fetch notice:", err);
  } finally {
    isFetchingCredentials = false;
  }
  return null;
}
if (typeof window !== "undefined") {
  fetchDynamicTurnConfiguration().catch(() => {
  });
}
const PUBLIC_STUN_SERVERS = [
  { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
  { urls: ["stun:stun2.l.google.com:19302", "stun:stun3.l.google.com:19302", "stun:stun4.l.google.com:19302"] },
  { urls: ["stun:stun.cloudflare.com:3478"] },
  { urls: ["stun:global.stun.twilio.com:3478"] },
  { urls: ["stun:stun.services.mozilla.com:3478"] }
];
const getIceServers = () => {
  const servers = [...PUBLIC_STUN_SERVERS];
  try {
    const localUrl = localStorage.getItem("imi_custom_turn_url") || localStorage.getItem("custom_turn_url");
    const localUser = localStorage.getItem("imi_custom_turn_user") || localStorage.getItem("custom_turn_username");
    const localPass = localStorage.getItem("imi_custom_turn_cred") || localStorage.getItem("custom_turn_credential");
    if (localUrl && localUser && localPass) {
      servers.push({
        urls: localUrl.split(",").map((u) => u.trim()).filter(Boolean),
        username: localUser,
        credential: localPass
      });
    }
  } catch (e) {
  }
  const metaEnv = __vite_import_meta_env__ || {};
  const turnUrl = metaEnv.VITE_TURN_URL;
  const turnUser = metaEnv.VITE_TURN_USERNAME;
  const turnCred = metaEnv.VITE_TURN_CREDENTIAL;
  if (turnUrl && turnUser && turnCred) {
    servers.push({
      urls: turnUrl.split(",").map((u) => u.trim()).filter(Boolean),
      username: turnUser,
      credential: turnCred
    });
  }
  return servers;
};
function isTurnConfigured() {
  if (cachedDynamicIceServers && cachedDynamicIceServers.length > 0) {
    const hasRelay = cachedDynamicIceServers.some((s) => {
      const urls = Array.isArray(s.urls) ? s.urls : [s.urls];
      return urls.some((u) => u.startsWith("turn:") || u.startsWith("turns:"));
    });
    if (hasRelay) return true;
  }
  const metaEnv = __vite_import_meta_env__ || {};
  const envUrl = metaEnv.VITE_TURN_URL;
  const envUser = metaEnv.VITE_TURN_USERNAME;
  const envPass = metaEnv.VITE_TURN_CREDENTIAL;
  let localUrl = "";
  try {
    localUrl = (localStorage.getItem("imi_custom_turn_url") || localStorage.getItem("custom_turn_url") || "").trim();
  } catch (e) {
  }
  return Boolean(envUrl && envUser && envPass || localUrl);
}
function getTurnStatus(pc, turnCandidateGathered, selectedCandidateType) {
  if (!isTurnConfigured()) {
    return "TURN_SERVER_NOT_DEPLOYED";
  }
  if (selectedCandidateType === "relay") {
    return "TURN_RELAY_ACTIVE";
  }
  if (selectedCandidateType === "srflx" || selectedCandidateType === "host") {
    return "TURN_CONFIGURED";
  }
  if (pc && pc.iceGatheringState === "complete" && !turnCandidateGathered) {
    if (pc.connectionState === "connected" || pc.iceConnectionState === "connected") {
      return "TURN_CONFIGURED";
    }
    return "TURN_ALLOCATION_FAILED";
  }
  return "TURN_CONFIGURED";
}
function getRtcConfiguration() {
  const metaEnv = __vite_import_meta_env__ || {};
  const envTurnUrl = metaEnv.VITE_TURN_URL?.trim();
  const envTurnUser = metaEnv.VITE_TURN_USERNAME?.trim();
  const envTurnPass = metaEnv.VITE_TURN_CREDENTIAL?.trim();
  let localTurnUrl = "";
  let localTurnUser = "";
  let localTurnPass = "";
  try {
    localTurnUrl = (localStorage.getItem("imi_custom_turn_url") || localStorage.getItem("custom_turn_url") || "").trim();
    localTurnUser = (localStorage.getItem("imi_custom_turn_user") || localStorage.getItem("custom_turn_username") || "").trim();
    localTurnPass = (localStorage.getItem("imi_custom_turn_cred") || localStorage.getItem("custom_turn_credential") || "").trim();
  } catch (e) {
  }
  const combinedServers = [...PUBLIC_STUN_SERVERS];
  if (cachedDynamicIceServers && cachedDynamicIceServers.length > 0) {
    combinedServers.push(...cachedDynamicIceServers);
  }
  if (localTurnUrl && localTurnUser && localTurnPass) {
    const rawUrls = localTurnUrl.split(",").map((u) => u.trim()).filter(Boolean);
    const parsedUrls = [];
    rawUrls.forEach((u) => {
      if (!u.startsWith("turn:") && !u.startsWith("turns:")) {
        parsedUrls.push(`turns:${u}:443?transport=tcp`);
        parsedUrls.push(`turn:${u}:3478?transport=udp`);
        parsedUrls.push(`turn:${u}:3478?transport=tcp`);
      } else {
        parsedUrls.push(u);
      }
    });
    combinedServers.push({
      urls: parsedUrls.length === 1 ? parsedUrls[0] : parsedUrls,
      username: localTurnUser,
      credential: localTurnPass
    });
  }
  if (envTurnUrl && envTurnUser && envTurnPass) {
    const rawUrls = envTurnUrl.split(",").map((u) => u.trim()).filter(Boolean);
    const parsedUrls = [];
    rawUrls.forEach((u) => {
      if (!u.startsWith("turn:") && !u.startsWith("turns:")) {
        parsedUrls.push(`turns:${u}:443?transport=tcp`);
        parsedUrls.push(`turn:${u}:3478?transport=udp`);
        parsedUrls.push(`turn:${u}:3478?transport=tcp`);
      } else {
        parsedUrls.push(u);
      }
    });
    combinedServers.push({
      urls: parsedUrls.length === 1 ? parsedUrls[0] : parsedUrls,
      username: envTurnUser,
      credential: envTurnPass
    });
  }
  return {
    iceServers: combinedServers,
    iceTransportPolicy: "all",
    bundlePolicy: "max-bundle",
    rtcpMuxPolicy: "require"
  };
}
async function getProductionRtcConfiguration() {
  if (!cachedDynamicIceServers) {
    try {
      await Promise.race([
        fetchDynamicTurnConfiguration(),
        new Promise((resolve) => setTimeout(resolve, 2e3))
      ]);
    } catch (e) {
      console.warn("[WEBRTC_CONFIG] Dynamic turn prefetch timeout/error:", e);
    }
  }
  return getRtcConfiguration();
}
getRtcConfiguration();
async function getWebRtcDiagnostics(pc, callId, signalingStatus = "CONNECTED", localStream = null, remoteStream = null) {
  const turnConfigured = isTurnConfigured();
  const isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
  let networkType = "unknown";
  if (typeof navigator !== "undefined" && "connection" in navigator) {
    const conn = navigator.connection;
    if (conn) {
      networkType = conn.effectiveType || conn.type || "unknown";
    }
  }
  const remoteAudioTrack = remoteStream?.getAudioTracks()[0];
  const remoteVideoTrack = remoteStream?.getVideoTracks()[0];
  const localAudioTrack = localStream?.getAudioTracks()[0];
  const localVideoTrack = localStream?.getVideoTracks()[0];
  const remoteAudioTrackState = remoteAudioTrack ? remoteAudioTrack.readyState === "live" && remoteAudioTrack.enabled ? "live" : "muted" : "none";
  const remoteVideoTrackState = remoteVideoTrack ? remoteVideoTrack.readyState === "live" && remoteVideoTrack.enabled ? "live" : "muted" : "none";
  const microphoneState = localAudioTrack ? localAudioTrack.enabled ? "enabled" : "muted" : "no-track";
  const cameraState = localVideoTrack ? localVideoTrack.enabled ? "enabled" : "disabled" : "no-track";
  const base = {
    callId: callId || "N/A",
    signalingStatus,
    connectionState: pc ? pc.connectionState : "uninitialized",
    iceConnectionState: pc ? pc.iceConnectionState : "uninitialized",
    iceGatheringState: pc ? pc.iceGatheringState : "uninitialized",
    signalingState: pc ? pc.signalingState : "uninitialized",
    localAudioTrack: localStream ? localStream.getAudioTracks().filter((t) => t.enabled).length : 0,
    remoteAudioTrack: remoteStream ? remoteStream.getAudioTracks().length : 0,
    localVideoTrack: localStream ? localStream.getVideoTracks().filter((t) => t.enabled).length : 0,
    remoteVideoTrack: remoteStream ? remoteStream.getVideoTracks().length : 0,
    selectedCandidateType: "unknown",
    localCandidateType: "N/A",
    remoteCandidateType: "N/A",
    selectedProtocol: "N/A",
    selectedCandidatePair: "None",
    hostCandidatesGathered: 0,
    stunCandidatesGathered: 0,
    turnCandidatesGathered: 0,
    remoteAudioTrackState,
    remoteVideoTrackState,
    microphoneState,
    cameraState,
    connectionFailureReason: null,
    turnCredentialStatus: currentCredentialStatus,
    currentRoundTripTime: 0,
    availableOutgoingBitrate: 0,
    availableIncomingBitrate: 0,
    packetsLost: 0,
    packetsReceived: 0,
    packetsSent: 0,
    bytesReceived: 0,
    bytesSent: 0,
    audioBytesReceived: 0,
    audioBytesSent: 0,
    audioPacketsReceived: 0,
    audioPacketsSent: 0,
    videoBytesReceived: 0,
    videoBytesSent: 0,
    videoPacketsReceived: 0,
    videoPacketsSent: 0,
    hasBidirectionalAudio: false,
    hasBidirectionalVideo: false,
    hasBidirectionalMedia: false,
    turnConfigured,
    turnCandidateGathered: false,
    turnStatusText: getTurnStatus(),
    networkType,
    isOnline
  };
  if (!pc || pc.signalingState === "closed") {
    return base;
  }
  try {
    const stats = await pc.getStats();
    let selectedPair = null;
    const candidates = /* @__PURE__ */ new Map();
    let relayCandidateFound = false;
    let hostCount = 0;
    let srflxCount = 0;
    let relayCount = 0;
    stats.forEach((report) => {
      if (report.type === "local-candidate" || report.type === "remote-candidate") {
        candidates.set(report.id, report);
        if (report.type === "local-candidate") {
          if (report.candidateType === "relay") {
            relayCandidateFound = true;
            relayCount++;
          } else if (report.candidateType === "srflx") {
            srflxCount++;
          } else if (report.candidateType === "host") {
            hostCount++;
          }
        }
      }
      if (report.type === "transport" && report.selectedCandidatePairId) {
        selectedPair = stats.get(report.selectedCandidatePairId);
      }
      if (!selectedPair && report.type === "candidate-pair" && (report.selected || report.state === "succeeded")) {
        selectedPair = report;
      }
      if (report.type === "inbound-rtp") {
        const pLost = report.packetsLost || 0;
        const pRecv = report.packetsReceived || 0;
        const bRecv = report.bytesReceived || 0;
        base.packetsLost += pLost;
        base.packetsReceived += pRecv;
        base.bytesReceived += bRecv;
        const mediaKind = report.kind || report.mediaType;
        if (mediaKind === "audio") {
          base.audioPacketsReceived += pRecv;
          base.audioBytesReceived += bRecv;
        } else if (mediaKind === "video") {
          base.videoPacketsReceived += pRecv;
          base.videoBytesReceived += bRecv;
        }
      }
      if (report.type === "outbound-rtp") {
        const pSent = report.packetsSent || 0;
        const bSent = report.bytesSent || 0;
        base.packetsSent += pSent;
        base.bytesSent += bSent;
        const mediaKind = report.kind || report.mediaType;
        if (mediaKind === "audio") {
          base.audioPacketsSent += pSent;
          base.audioBytesSent += bSent;
        } else if (mediaKind === "video") {
          base.videoPacketsSent += pSent;
          base.videoBytesSent += bSent;
        }
      }
    });
    base.hasBidirectionalAudio = base.audioBytesSent > 0 && base.audioBytesReceived > 0;
    base.hasBidirectionalVideo = base.videoBytesSent > 0 && base.videoBytesReceived > 0;
    base.hasBidirectionalMedia = base.bytesSent > 0 && base.bytesReceived > 0;
    base.hostCandidatesGathered = hostCount;
    base.stunCandidatesGathered = srflxCount;
    base.turnCandidatesGathered = relayCount;
    base.turnCandidateGathered = relayCandidateFound;
    if (selectedPair) {
      const localCand = candidates.get(selectedPair.localCandidateId);
      const remoteCand = candidates.get(selectedPair.remoteCandidateId);
      const localType = (localCand?.candidateType || "").toLowerCase();
      const remoteType = (remoteCand?.candidateType || "").toLowerCase();
      const proto = (localCand?.protocol || selectedPair.protocol || "udp").toUpperCase();
      base.localCandidateType = localType || "unknown";
      base.remoteCandidateType = remoteType || "unknown";
      base.selectedProtocol = proto;
      base.selectedCandidatePair = `${(localType || "UNKNOWN").toUpperCase()} (${proto}) ⇄ ${(remoteType || "UNKNOWN").toUpperCase()} (${proto})`;
      if (localType === "relay" || remoteType === "relay") {
        base.selectedCandidateType = "relay";
        base.mediaTransportMode = "RELAYED_TURN";
        base.mediaTransportLabel = "🔄 اتصال مرحّل (Relayed via TURN)";
        base.isDirectP2P = false;
        base.isRelayed = true;
      } else if (
        // Both sides must be verified non-relay candidates
        (localType === "host" || localType === "srflx" || localType === "prflx") && (remoteType === "host" || remoteType === "srflx" || remoteType === "prflx")
      ) {
        if (localType === "host" && remoteType === "host") {
          base.selectedCandidateType = "host";
          base.mediaTransportMode = "DIRECT_LAN";
          base.mediaTransportLabel = "🏠 اتصال مباشر عبر الشبكة المحلية (Direct LAN)";
        } else {
          base.selectedCandidateType = localType === "srflx" || remoteType === "srflx" ? "srflx" : "prflx";
          base.mediaTransportMode = "DIRECT_P2P_STUN";
          base.mediaTransportLabel = "⚡ اتصال مباشر نظير-إلى-نظير (Direct P2P via STUN)";
        }
        base.isDirectP2P = true;
        base.isRelayed = false;
      } else {
        base.selectedCandidateType = "undetermined";
        base.mediaTransportMode = "CONNECTING";
        base.mediaTransportLabel = "⏳ جاري التحقق من أطراف المسار...";
        base.isDirectP2P = false;
        base.isRelayed = false;
      }
      if (selectedPair.currentRoundTripTime !== void 0) {
        base.currentRoundTripTime = Math.round(selectedPair.currentRoundTripTime * 1e3);
      }
      if (selectedPair.availableOutgoingBitrate !== void 0) {
        base.availableOutgoingBitrate = Math.round(selectedPair.availableOutgoingBitrate / 1e3);
      }
      if (selectedPair.availableIncomingBitrate !== void 0) {
        base.availableIncomingBitrate = Math.round(selectedPair.availableIncomingBitrate / 1e3);
      }
    } else {
      base.selectedCandidateType = "none";
      base.selectedCandidatePair = "None (Awaiting Pair Selection)";
      base.mediaTransportMode = "CONNECTING";
      base.mediaTransportLabel = "⏳ جاري البحث عن أفضل مسار مباشر...";
      base.isDirectP2P = false;
      base.isRelayed = false;
    }
    base.turnStatusText = getTurnStatus(pc, relayCandidateFound, base.selectedCandidateType);
    if (pc.connectionState === "failed" || pc.iceConnectionState === "failed") {
      base.mediaTransportMode = "FAILED";
      base.mediaTransportLabel = "⚠️ تعذر تأسيس الاتصال المباشر";
      const gatheredStun = srflxCount > 0;
      base.failureEvidence = `فشل مسار الربط (ICE Failed). المرشحات المحلية المجمعة: Local Host=${hostCount}, STUN srflx=${srflxCount}, Relay=${relayCount}.`;
      base.possibleCauses = [
        "وجود جدار حماية متماثل (Symmetric NAT أو CGNAT من مزود الاتصال الخلوي) يمنع اختراق الـ UDP المباشر",
        "حظر حزم الـ UDP من قبل مشغل شبكة الإنترنت أو جدار الحماية المؤسسي",
        "عدم وصول مرشحي الطرف البعيد أو انقطاع جلسة الإشارات"
      ];
      base.networkLimitationNotice = `تعذر تأسيس مسار P2P مباشر. الأدلة: ${base.failureEvidence}. الأسباب المحتملة: جدار ناري متماثل (Symmetric NAT)، حظر منافذ UDP، أو انقطاع المسار. في هذه البيئات المقيدة يلزم خادم ترحيل TURN مخصص.`;
      if (relayCount === 0 && !turnConfigured) {
        base.connectionFailureReason = "Direct P2P failed across candidate checks. Probable Symmetric NAT / strict CGNAT or UDP firewall block; private TURN server is not configured.";
      } else if (relayCount === 0 && turnConfigured) {
        base.connectionFailureReason = "Direct P2P failed. Private TURN server is configured but relay allocation was unreachable or timed out.";
      } else {
        base.connectionFailureReason = "Connection checks failed on all candidate pairs (firewall, routing, or media block).";
      }
    } else if (pc.iceConnectionState === "disconnected") {
      base.connectionFailureReason = "Temporary network disruption. ICE reconnecting...";
      base.networkLimitationNotice = "انقطاع مؤقت في مسار الشبكة المباشر. جاري محاولة إعادة الاتصال...";
    } else if (signalingStatus === "ENDED") {
      base.connectionFailureReason = "Signaling session ended.";
      base.networkLimitationNotice = null;
    } else {
      base.connectionFailureReason = null;
      base.networkLimitationNotice = null;
    }
    return base;
  } catch (err) {
    console.warn("[WEBRTC_DIAGNOSTICS] Error reading stats:", err);
    return base;
  }
}
const DEFAULT_AUDIO_CONSTRAINTS = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  sampleRate: 48e3,
  channelCount: 2
};
const DEFAULT_VIDEO_CONSTRAINTS = {
  width: { ideal: 1280, max: 1920, min: 640 },
  height: { ideal: 720, max: 1080, min: 480 },
  frameRate: { ideal: 30, max: 60, min: 15 },
  facingMode: "user"
};
const MOBILE_VIDEO_CONSTRAINTS = {
  width: { ideal: 640, max: 854 },
  height: { ideal: 480, max: 480 },
  frameRate: { ideal: 15, max: 20 },
  facingMode: "user"
};
async function performIceRestart(pc) {
  if (pc.signalingState === "closed") return null;
  try {
    console.log("[WEBRTC_ICE_RESTART] Triggering pc.restartIce() and creating restart offer...");
    if (typeof pc.restartIce === "function") {
      pc.restartIce();
    }
    const offer = await pc.createOffer({ iceRestart: true });
    await pc.setLocalDescription(offer);
    console.log("[WEBRTC_ICE_RESTART] Local description set with iceRestart offer successfully.");
    return offer;
  } catch (err) {
    console.error("[WEBRTC_ICE_RESTART] Failed to perform ICE restart offer:", err);
    return null;
  }
}

export { DEFAULT_VIDEO_CONSTRAINTS as D, MOBILE_VIDEO_CONSTRAINTS as M, DEFAULT_AUDIO_CONSTRAINTS as a, getIceServers as b, getProductionRtcConfiguration as c, fetchDynamicTurnConfiguration as f, getWebRtcDiagnostics as g, performIceRestart as p };
