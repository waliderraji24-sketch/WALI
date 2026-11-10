import { r as reactExports, j as jsxRuntimeExports, U as User, az as Activity, a0 as Settings, aA as Wifi, K as Volume2, a as ShieldCheck, o as AlertTriangle, aB as PhoneOff, P as Phone, aC as VideoOff, V as Video, aD as MicOff, ai as Mic, aE as Volume1, aF as Server, X, C as Check, aG as RotateCcw } from './vendor-react-DAzNXBh_.js';
import { b as androidBridge, d as db, s as sendFcmCancelCall, t as sendFcmCallNotification } from './index-1f3YQYJq.js';
import { m as updateDoc, h as doc, A as onSnapshot, n as collection, F as addDoc, j as setDoc } from './vendor-firebase-DLAfa3Dz.js';
import { g as getWebRtcDiagnostics, f as fetchDynamicTurnConfiguration, D as DEFAULT_VIDEO_CONSTRAINTS, a as DEFAULT_AUDIO_CONSTRAINTS, M as MOBILE_VIDEO_CONSTRAINTS, b as getIceServers, c as getProductionRtcConfiguration, p as performIceRestart } from './webrtcHelper-DQrx3HkE.js';
import { f as findRegisteredUserByPhone } from './userService-eU_CWHi8.js';

function WebRTCCallModal({
  userId,
  userName,
  activeCall,
  initialCallee,
  autoAccept,
  onCloseCall
}) {
  const [callSession, setCallSession] = reactExports.useState(activeCall || null);
  const [callType, setCallType] = reactExports.useState(
    activeCall?.type || initialCallee?.type || "video"
  );
  const [signalingState, setSignalingState] = reactExports.useState(() => {
    if (activeCall && activeCall.caller !== userId) {
      return "RINGING";
    }
    return "CALLING";
  });
  const [statusText, setStatusText] = reactExports.useState("جاري تهيئة الاتصال...");
  const [callDuration, setCallDuration] = reactExports.useState(0);
  const callDurationRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    callDurationRef.current = callDuration;
  }, [callDuration]);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [isVideoOff, setIsVideoOff] = reactExports.useState(
    (activeCall?.type || initialCallee?.type) === "voice"
  );
  const [isSpeaker, setIsSpeaker] = reactExports.useState(() => {
    const initialType = activeCall?.type || initialCallee?.type || "voice";
    return initialType === "video";
  });
  const toggleSpeaker = reactExports.useCallback(() => {
    setIsSpeaker((prev) => {
      const next = !prev;
      androidBridge.setSpeakerphone(next);
      return next;
    });
  }, []);
  reactExports.useEffect(() => {
    androidBridge.setCallAudioMode(callType, isSpeaker);
    return () => {
      androidBridge.resetCallAudioMode();
    };
  }, [callType, isSpeaker]);
  const [showDiagnostics, setShowDiagnostics] = reactExports.useState(false);
  const [diagnostics, setDiagnostics] = reactExports.useState(null);
  const [isAudioPlaybackBlocked, setIsAudioPlaybackBlocked] = reactExports.useState(false);
  const isProcessingQueueRef = reactExports.useRef(false);
  const unlockAudioContext = reactExports.useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") {
          ctx.resume().catch(() => {
          });
        }
      }
      if (remoteAudioRef.current) {
        remoteAudioRef.current.play().then(() => {
          setIsAudioPlaybackBlocked(false);
        }).catch((e) => {
          console.warn("[WEBRTC_AUDIO] Manual unlock notice:", e);
        });
      }
    } catch (e) {
    }
  }, []);
  const [isTurnSettingsOpen, setIsTurnSettingsOpen] = reactExports.useState(false);
  const [turnUrlInput, setTurnUrlInput] = reactExports.useState(() => {
    return localStorage.getItem("imi_custom_turn_url") || localStorage.getItem("custom_turn_url") || "";
  });
  const [turnUserInput, setTurnUserInput] = reactExports.useState(() => {
    return localStorage.getItem("imi_custom_turn_user") || localStorage.getItem("custom_turn_username") || "";
  });
  const [turnCredInput, setTurnCredInput] = reactExports.useState(() => {
    return localStorage.getItem("imi_custom_turn_cred") || localStorage.getItem("custom_turn_credential") || "";
  });
  const [turnSaveSuccess, setTurnSaveSuccess] = reactExports.useState(null);
  const iceRestartAttemptsRef = reactExports.useRef(0);
  const MAX_ICE_RESTART_ATTEMPTS = 3;
  const handleSaveTurnSettings = (e) => {
    if (e) e.preventDefault();
    if (turnUrlInput.trim()) {
      localStorage.setItem("imi_custom_turn_url", turnUrlInput.trim());
      localStorage.setItem("imi_custom_turn_user", turnUserInput.trim());
      localStorage.setItem("imi_custom_turn_cred", turnCredInput.trim());
      localStorage.setItem("custom_turn_url", turnUrlInput.trim());
      localStorage.setItem("custom_turn_username", turnUserInput.trim());
      localStorage.setItem("custom_turn_credential", turnCredInput.trim());
      setTurnSaveSuccess("تم حفظ إعدادات خادم TURN بنجاح");
    } else {
      handleResetTurnSettings();
      return;
    }
    setTimeout(() => setTurnSaveSuccess(null), 3e3);
  };
  const handleApplyFallbackTurn = () => {
    const defaultUrl = "turn:openrelay.metered.ca:443,turn:openrelay.metered.ca:80";
    const defaultUser = "openrelayproject";
    const defaultCred = "openrelayproject";
    setTurnUrlInput(defaultUrl);
    setTurnUserInput(defaultUser);
    setTurnCredInput(defaultCred);
    localStorage.setItem("imi_custom_turn_url", defaultUrl);
    localStorage.setItem("imi_custom_turn_user", defaultUser);
    localStorage.setItem("imi_custom_turn_cred", defaultCred);
    localStorage.setItem("custom_turn_url", defaultUrl);
    localStorage.setItem("custom_turn_username", defaultUser);
    localStorage.setItem("custom_turn_credential", defaultCred);
    setTurnSaveSuccess("تم تفعيل خوادم OpenRelay الاحتياطية");
    setTimeout(() => setTurnSaveSuccess(null), 3e3);
  };
  const handleResetTurnSettings = () => {
    setTurnUrlInput("");
    setTurnUserInput("");
    setTurnCredInput("");
    localStorage.removeItem("imi_custom_turn_url");
    localStorage.removeItem("imi_custom_turn_user");
    localStorage.removeItem("imi_custom_turn_cred");
    localStorage.removeItem("custom_turn_url");
    localStorage.removeItem("custom_turn_username");
    localStorage.removeItem("custom_turn_credential");
    setTurnSaveSuccess("تمت العودة للخوادم الافتراضية");
    setTimeout(() => setTurnSaveSuccess(null), 3e3);
  };
  const isCaller = !activeCall || activeCall.caller === userId;
  const targetName = isCaller ? initialCallee?.name || activeCall?.calleeName || activeCall?.callee || "مستخدم" : activeCall?.callerName || activeCall?.caller || "متصل";
  const callIdRef = reactExports.useRef(activeCall?.id || null);
  const localVideoRef = reactExports.useRef(null);
  const remoteVideoRef = reactExports.useRef(null);
  const remoteAudioRef = reactExports.useRef(null);
  const peerConnectionRef = reactExports.useRef(null);
  const localStreamRef = reactExports.useRef(null);
  const remoteStreamRef = reactExports.useRef(new MediaStream());
  const timerRef = reactExports.useRef(null);
  const ringTimeoutRef = reactExports.useRef(null);
  const iceDisconnectionTimerRef = reactExports.useRef(null);
  const diagnosticsIntervalRef = reactExports.useRef(null);
  const unsubCallDocRef = reactExports.useRef(null);
  const unsubCallerCandidatesRef = reactExports.useRef(null);
  const unsubCalleeCandidatesRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (remoteVideoRef.current && remoteStreamRef.current && remoteVideoRef.current.srcObject !== remoteStreamRef.current) {
      remoteVideoRef.current.srcObject = remoteStreamRef.current;
      remoteVideoRef.current.play().catch(() => {
      });
    }
    if (remoteAudioRef.current && remoteStreamRef.current && remoteAudioRef.current.srcObject !== remoteStreamRef.current) {
      remoteAudioRef.current.srcObject = remoteStreamRef.current;
      remoteAudioRef.current.play().then(() => {
        setIsAudioPlaybackBlocked(false);
      }).catch((e) => {
        if (e?.name !== "AbortError") {
          setIsAudioPlaybackBlocked(true);
        }
      });
    }
  });
  const iceCandidateQueueRef = reactExports.useRef([]);
  const processedCandidateKeysRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const isIceRestartingRef = reactExports.useRef(false);
  const callStartTimeRef = reactExports.useRef(Date.now());
  const getCandidateKey = (c) => {
    return `${c.candidate || ""}_${c.sdpMid || ""}_${c.sdpMLineIndex ?? ""}`;
  };
  const getMediaStream = async (type) => {
    if (localStreamRef.current) return localStreamRef.current;
    const audioConstraints = DEFAULT_AUDIO_CONSTRAINTS;
    const videoConstraints = type === "video" ? DEFAULT_VIDEO_CONSTRAINTS : false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints,
        video: videoConstraints
      });
      localStreamRef.current = stream;
      if (localVideoRef.current && type === "video") {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (err) {
      console.warn("[WEBRTC_MEDIA] Standard getUserMedia failed, attempting adaptive fallback:", err);
      if (type === "video") {
        try {
          const mobileStream = await navigator.mediaDevices.getUserMedia({
            audio: audioConstraints,
            video: MOBILE_VIDEO_CONSTRAINTS
          });
          localStreamRef.current = mobileStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mobileStream;
          }
          return mobileStream;
        } catch (vErr) {
          console.warn("[WEBRTC_MEDIA] Video access rejected, falling back to audio only:", vErr);
          const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
            audio: audioConstraints,
            video: false
          });
          localStreamRef.current = audioOnlyStream;
          setIsVideoOff(true);
          return audioOnlyStream;
        }
      }
      setStatusText("تعذر الوصول لأجهزة الصوت أو الكاميرا");
      throw err;
    }
  };
  const handleIncomingCandidate = async (candidateData, msgCallId, timestamp) => {
    if (msgCallId !== callIdRef.current) return;
    if (timestamp && timestamp < callStartTimeRef.current - 1e4) return;
    if (!candidateData || !candidateData.candidate) return;
    const candidateKey = getCandidateKey(candidateData);
    if (processedCandidateKeysRef.current.has(candidateKey)) return;
    processedCandidateKeysRef.current.add(candidateKey);
    const pc = peerConnectionRef.current;
    if (!pc || pc.signalingState === "closed") return;
    const cleanCandidate = {
      candidate: candidateData.candidate,
      sdpMid: candidateData.sdpMid !== void 0 ? candidateData.sdpMid : null,
      sdpMLineIndex: candidateData.sdpMLineIndex !== void 0 ? candidateData.sdpMLineIndex : null
    };
    if (candidateData.usernameFragment) {
      cleanCandidate.usernameFragment = candidateData.usernameFragment;
    }
    if (pc.remoteDescription && pc.remoteDescription.type) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(cleanCandidate));
      } catch (e) {
        console.warn("[WEBRTC_ICE] Direct candidate add deferred, queueing:", e);
        iceCandidateQueueRef.current.push(cleanCandidate);
      }
    } else {
      iceCandidateQueueRef.current.push(cleanCandidate);
    }
  };
  const processCandidateQueue = async () => {
    const pc = peerConnectionRef.current;
    if (!pc || !pc.remoteDescription || !pc.remoteDescription.type || pc.signalingState === "closed") return;
    if (isProcessingQueueRef.current) return;
    isProcessingQueueRef.current = true;
    try {
      while (iceCandidateQueueRef.current.length > 0) {
        const candidateData = iceCandidateQueueRef.current.shift();
        if (candidateData && candidateData.candidate) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidateData));
          } catch (e) {
            console.warn("[WEBRTC_ICE] Error applying queued candidate:", e);
          }
        }
      }
    } finally {
      isProcessingQueueRef.current = false;
    }
  };
  const setupPeerConnection = async (callId) => {
    if (peerConnectionRef.current) {
      try {
        peerConnectionRef.current.close();
      } catch (e) {
      }
      peerConnectionRef.current = null;
    }
    callIdRef.current = callId;
    const dynamicServers = getIceServers();
    const config = await getProductionRtcConfiguration();
    const combinedServers = [...dynamicServers, ...config.iceServers || []];
    const seenMap = /* @__PURE__ */ new Set();
    const uniqueServers = [];
    for (const server of combinedServers) {
      const urls = Array.isArray(server.urls) ? server.urls : [server.urls];
      const key = `${urls.slice().sort().join(",")}_${server.username || ""}`;
      if (!seenMap.has(key)) {
        seenMap.add(key);
        uniqueServers.push(server);
      }
    }
    const pc = new RTCPeerConnection({
      ...config,
      iceServers: uniqueServers
    });
    peerConnectionRef.current = pc;
    remoteStreamRef.current = new MediaStream();
    pc.ontrack = (event) => {
      console.log(`[WEBRTC_TRACK] Remote track received: kind=${event.track.kind}, id=${event.track.id}`);
      if (event.streams && event.streams[0]) {
        event.streams[0].getTracks().forEach((track) => {
          if (!remoteStreamRef.current.getTracks().some((t) => t.id === track.id)) {
            remoteStreamRef.current.addTrack(track);
          }
        });
      } else if (event.track) {
        if (!remoteStreamRef.current.getTracks().some((t) => t.id === event.track.id)) {
          remoteStreamRef.current.addTrack(event.track);
        }
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStreamRef.current;
        remoteVideoRef.current.muted = true;
        remoteVideoRef.current.play().catch((err) => {
          if (err?.name !== "AbortError") ;
        });
      }
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStreamRef.current;
        remoteAudioRef.current.play().catch((e) => {
          if (e?.name !== "AbortError") {
            console.warn("[WEBRTC_AUDIO] Remote audio autoplay notice:", e);
          }
        });
      }
    };
    pc.onconnectionstatechange = () => {
      const cState = pc.connectionState;
      console.log(`[WEBRTC_STATE] ConnectionState: ${cState}`);
      handleConnectionStateTransition(cState, pc);
    };
    pc.oniceconnectionstatechange = () => {
      const iState = pc.iceConnectionState;
      console.log(`[WEBRTC_STATE] IceConnectionState: ${iState}`);
      if (iState === "connected" || iState === "completed") {
        iceRestartAttemptsRef.current = 0;
        if (iceDisconnectionTimerRef.current) {
          clearTimeout(iceDisconnectionTimerRef.current);
          iceDisconnectionTimerRef.current = null;
        }
        if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
        setSignalingState("CONNECTED");
        setStatusText("متصل الآن");
      } else if (iState === "disconnected") {
        handleIceDisconnection(pc);
      } else if (iState === "failed") {
        triggerIceRestart(pc);
      }
    };
    pc.onicegatheringstatechange = () => {
      console.log(`[WEBRTC_STATE] IceGatheringState: ${pc.iceGatheringState}`);
    };
    pc.onicecandidate = (event) => {
      if (event.candidate && callIdRef.current) {
        const subCol = isCaller ? "callerCandidates" : "calleeCandidates";
        const candidatePayload = {
          ...event.candidate.toJSON(),
          callId: callIdRef.current,
          senderId: userId,
          timestamp: Date.now()
        };
        addDoc(collection(db, "calls", callIdRef.current, subCol), candidatePayload).catch((err) => {
          console.warn("[WEBRTC_SIGNALING] Candidate write notice:", err);
        });
      }
    };
    return pc;
  };
  const handleConnectionStateTransition = (state, pc) => {
    if (state === "connected") {
      if (iceDisconnectionTimerRef.current) {
        clearTimeout(iceDisconnectionTimerRef.current);
        iceDisconnectionTimerRef.current = null;
      }
      setSignalingState("CONNECTED");
      setStatusText("متصل الآن");
    } else if (state === "disconnected") {
      handleIceDisconnection(pc);
    } else if (state === "failed") {
      triggerIceRestart(pc);
    } else if (state === "closed") {
      setSignalingState("ENDED");
    }
  };
  const handleIceDisconnection = (pc) => {
    setSignalingState("RECONNECTING");
    setStatusText("جاري إعادة الاتصال بالشبكة...");
    if (!iceDisconnectionTimerRef.current) {
      iceDisconnectionTimerRef.current = setTimeout(() => {
        if (pc.iceConnectionState === "disconnected" || pc.connectionState === "disconnected") {
          console.log("[WEBRTC_RECOVERY] Disconnection exceeded grace period, performing ICE restart...");
          triggerIceRestart(pc);
        }
        iceDisconnectionTimerRef.current = null;
      }, 3e3);
    }
  };
  const triggerIceRestart = async (pc) => {
    if (isIceRestartingRef.current || !callIdRef.current || pc.signalingState === "closed") return;
    if (iceRestartAttemptsRef.current >= MAX_ICE_RESTART_ATTEMPTS) {
      console.warn(`[WEBRTC_ICE_RESTART] Maximum ICE restart attempts (${MAX_ICE_RESTART_ATTEMPTS}) reached.`);
      setStatusText("تعذر استعادة الاتصال بعد 3 محاولات (انقطاع المسار)");
      return;
    }
    iceRestartAttemptsRef.current += 1;
    isIceRestartingRef.current = true;
    setSignalingState("RECONNECTING");
    setStatusText(`جاري إعادة محاولة الاتصال بالشبكة (محاولة ${iceRestartAttemptsRef.current} من ${MAX_ICE_RESTART_ATTEMPTS})...`);
    try {
      await fetchDynamicTurnConfiguration().catch(() => {
      });
      const offer = await performIceRestart(pc);
      if (offer && callIdRef.current) {
        await updateDoc(doc(db, "calls", callIdRef.current), {
          iceRestartOffer: { type: offer.type, sdp: offer.sdp, timestamp: Date.now(), senderId: userId },
          status: "reconnecting",
          updatedAt: Date.now()
        });
      }
    } catch (err) {
      console.warn("[WEBRTC_ICE_RESTART] Failed to publish ICE restart offer:", err);
    } finally {
      setTimeout(() => {
        isIceRestartingRef.current = false;
      }, 5e3);
    }
  };
  reactExports.useEffect(() => {
    const handleNetworkChange = () => {
      console.log(`[WEBRTC_NETWORK] Network event detected: online=${navigator.onLine}`);
      if (navigator.onLine && peerConnectionRef.current) {
        const pc = peerConnectionRef.current;
        if (pc.connectionState !== "connected" || pc.iceConnectionState !== "connected") {
          console.log("[WEBRTC_NETWORK] Resuming connection after network change...");
          triggerIceRestart(pc);
        }
      } else if (!navigator.onLine) {
        setSignalingState("RECONNECTING");
        setStatusText("انقطع الاتصال بالإنترنت...");
      }
    };
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
    const conn = navigator.connection;
    if (conn && conn.addEventListener) {
      conn.addEventListener("change", handleNetworkChange);
    }
    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
      if (conn && conn.removeEventListener) {
        conn.removeEventListener("change", handleNetworkChange);
      }
    };
  }, []);
  reactExports.useEffect(() => {
    diagnosticsIntervalRef.current = setInterval(async () => {
      const pc = peerConnectionRef.current;
      const currentCallId = callIdRef.current || "N/A";
      const diag = await getWebRtcDiagnostics(
        pc,
        currentCallId,
        signalingState,
        localStreamRef.current,
        remoteStreamRef.current
      );
      setDiagnostics(diag);
    }, 1500);
    return () => {
      if (diagnosticsIntervalRef.current) clearInterval(diagnosticsIntervalRef.current);
    };
  }, [signalingState]);
  reactExports.useEffect(() => {
    if (autoAccept && activeCall && signalingState === "RINGING") {
      console.log("Auto-accepting incoming call via native bridge");
      handleAcceptCall();
    }
  }, [autoAccept, activeCall, signalingState]);
  const initiateOutgoingCall = async () => {
    try {
      setSignalingState("CALLING");
      setStatusText("جاري الاتصال...");
      callStartTimeRef.current = Date.now();
      await fetchDynamicTurnConfiguration().catch(() => {
      });
      const stream = await getMediaStream(callType);
      const callId = `call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      callIdRef.current = callId;
      const pc = await setupPeerConnection(callId);
      stream.getTracks().forEach((track) => {
        const sender = pc.addTrack(track, stream);
        try {
          const params = sender.getParameters();
          if (!params.encodings) params.encodings = [{}];
          if (track.kind === "video") params.encodings[0].maxBitrate = 25e5;
          if (track.kind === "audio") params.encodings[0].maxBitrate = 128e3;
          sender.setParameters(params).catch(() => {
          });
        } catch (e) {
        }
      });
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: callType === "video"
      });
      await pc.setLocalDescription(offer);
      let resolvedCallee = initialCallee?.phone || activeCall?.callee || "user2";
      let resolvedCalleeName = initialCallee?.name || activeCall?.calleeName || targetName;
      if (initialCallee?.phone) {
        try {
          const registered = await findRegisteredUserByPhone(initialCallee.phone, userId);
          if (registered) {
            resolvedCallee = registered.authUid || registered.id || resolvedCallee;
            if (registered.displayName) resolvedCalleeName = registered.displayName;
          }
        } catch (e) {
          console.warn("Callee resolution notice:", e);
        }
      }
      const session = {
        id: callId,
        caller: userId,
        callerName: userName || userId,
        callee: resolvedCallee,
        calleeName: resolvedCalleeName,
        type: callType,
        status: "offered",
        offer: { type: offer.type, sdp: offer.sdp },
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      setCallSession(session);
      ringTimeoutRef.current = setTimeout(() => {
        setStatusText("لم يتم الرد");
        setSignalingState("ENDED");
        if (callIdRef.current) {
          updateDoc(doc(db, "calls", callIdRef.current), { status: "missed" }).catch(() => {
          });
        }
        setTimeout(() => handleEndCall("skip"), 1500);
      }, 45e3);
      await setDoc(doc(db, "calls", callId), session);
      sendFcmCallNotification({
        calleeId: resolvedCallee,
        callId,
        callerId: userId,
        callerName: userName || userId,
        callType
      });
      const unsub = onSnapshot(doc(db, "calls", callId), async (snap) => {
        if (!snap.exists()) return;
        const data = snap.data();
        if (data.status === "accepted" && data.answer && pc.signalingState === "have-local-offer") {
          if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
          await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
          await processCandidateQueue();
          setSignalingState("CONNECTED");
          setStatusText("متصل الآن");
        } else if (data.iceRestartAnswer && data.iceRestartAnswer.senderId !== userId && pc.signalingState === "have-local-offer") {
          await pc.setRemoteDescription(new RTCSessionDescription(data.iceRestartAnswer));
          await processCandidateQueue();
          setSignalingState("CONNECTED");
          setStatusText("متصل الآن");
        } else if (data.status === "declined" || data.status === "ended" || data.status === "missed") {
          if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
          setStatusText(data.status === "declined" ? "تم رفض المكالمة" : "تم إنهاء المكالمة");
          setSignalingState("ENDED");
          setTimeout(() => handleEndCall("skip"), 800);
        }
      }, (err) => console.warn("Call listener err:", err));
      unsubCallDocRef.current = unsub;
      const unsubCandidates = onSnapshot(collection(db, "calls", callId, "calleeCandidates"), (snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            handleIncomingCandidate(data, data.callId || callId, data.timestamp);
          }
        });
      }, (err) => console.warn("Candidate err:", err));
      unsubCalleeCandidatesRef.current = unsubCandidates;
    } catch (err) {
      console.error("[WEBRTC_CALL] Outgoing call initiation failed:", err);
      if (ringTimeoutRef.current) clearTimeout(ringTimeoutRef.current);
      const isMediaErr = err?.name === "NotAllowedError" || err?.name === "NotFoundError";
      const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
      const errorLabel = isOffline ? "NETWORK_OFFLINE" : isMediaErr ? "MEDIA_PERMISSION_DENIED" : "ICE_CHECK_FAILED";
      setStatusText(errorLabel);
      setSignalingState("ENDED");
      setTimeout(() => handleEndCall("ended"), 1800);
    }
  };
  const handleAcceptCall = async () => {
    if (!activeCall || !activeCall.offer) return;
    if (unsubCallDocRef.current) unsubCallDocRef.current();
    try {
      setSignalingState("ACCEPTING");
      setStatusText("جاري الربط مع المتصل...");
      callStartTimeRef.current = Date.now();
      await fetchDynamicTurnConfiguration().catch(() => {
      });
      const type = activeCall.type;
      setCallType(type);
      const stream = await getMediaStream(type);
      const callId = activeCall.id;
      callIdRef.current = callId;
      const pc = await setupPeerConnection(callId);
      stream.getTracks().forEach((track) => {
        const sender = pc.addTrack(track, stream);
        try {
          const params = sender.getParameters();
          if (!params.encodings) params.encodings = [{}];
          if (track.kind === "video") params.encodings[0].maxBitrate = 25e5;
          if (track.kind === "audio") params.encodings[0].maxBitrate = 128e3;
          sender.setParameters(params).catch(() => {
          });
        } catch (e) {
        }
      });
      await pc.setRemoteDescription(new RTCSessionDescription(activeCall.offer));
      await processCandidateQueue();
      const answer = await pc.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: type === "video"
      });
      await pc.setLocalDescription(answer);
      await updateDoc(doc(db, "calls", callId), {
        answer: { type: answer.type, sdp: answer.sdp },
        status: "accepted",
        updatedAt: Date.now()
      });
      const unsubCandidates = onSnapshot(collection(db, "calls", callId, "callerCandidates"), (snap) => {
        snap.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            handleIncomingCandidate(data, data.callId || callId, data.timestamp);
          }
        });
      }, (err) => console.warn("Candidate err:", err));
      unsubCallerCandidatesRef.current = unsubCandidates;
      const unsub = onSnapshot(doc(db, "calls", callId), async (snap) => {
        if (!snap.exists()) return;
        const data = snap.data();
        if (data.iceRestartOffer && data.iceRestartOffer.senderId !== userId && pc.signalingState === "stable") {
          console.log("[WEBRTC_ICE_RESTART] Callee received iceRestartOffer, answering...");
          await pc.setRemoteDescription(new RTCSessionDescription(data.iceRestartOffer));
          await processCandidateQueue();
          const restartAnswer = await pc.createAnswer();
          await pc.setLocalDescription(restartAnswer);
          await updateDoc(doc(db, "calls", callId), {
            iceRestartAnswer: { type: restartAnswer.type, sdp: restartAnswer.sdp, senderId: userId },
            updatedAt: Date.now()
          });
        }
        if (data.status === "ended" || data.status === "declined") {
          setStatusText("تم إنهاء المكالمة");
          setSignalingState("ENDED");
          setTimeout(() => handleEndCall("skip"), 600);
        }
      }, (err) => console.warn("Call listener err:", err));
      unsubCallDocRef.current = unsub;
      setSignalingState("CONNECTED");
      setStatusText("متصل الآن");
    } catch (err) {
      console.error("[WEBRTC_CALL] Failed to accept call:", err);
      const isMediaErr = err?.name === "NotAllowedError" || err?.name === "NotFoundError";
      setStatusText(isMediaErr ? "MEDIA_PERMISSION_DENIED" : "REMOTE_DESCRIPTION_TIMEOUT");
      setSignalingState("ENDED");
      setTimeout(() => handleEndCall("ended"), 1800);
    }
  };
  reactExports.useEffect(() => {
    if (isCaller) {
      initiateOutgoingCall();
    } else if (activeCall) {
      callIdRef.current = activeCall.id;
      setSignalingState("RINGING");
      setStatusText(`مكالمة ${activeCall.type === "video" ? "فيديو" : "صوتية"} واردة...`);
      const unsubIncoming = onSnapshot(doc(db, "calls", activeCall.id), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.status === "ended" || data.status === "declined" || data.status === "missed") {
            setStatusText("تم إنهاء المكالمة");
            setSignalingState("ENDED");
            setTimeout(() => handleEndCall("skip"), 600);
          }
        }
      }, (err) => console.warn("Incoming call err:", err));
      unsubCallDocRef.current = unsubIncoming;
    }
    return () => {
      cleanupCall();
    };
  }, []);
  reactExports.useEffect(() => {
    if (signalingState === "CONNECTED") {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1e3);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [signalingState]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const handleEndCall = (statusArg) => {
    const overrideStatus = typeof statusArg === "string" ? statusArg : "ended";
    const currentId = callIdRef.current || callSession?.id || activeCall?.id;
    setSignalingState("ENDING");
    cleanupCall();
    onCloseCall();
    if (currentId && overrideStatus !== "skip") {
      updateDoc(doc(db, "calls", currentId), {
        status: overrideStatus,
        duration: callDurationRef.current,
        updatedAt: Date.now()
      }).catch((err) => {
        console.warn("Failed to update call status:", err);
      });
      if (signalingState === "RINGING" || callSession?.status === "offered") {
        const targetCallee = callSession?.callee || activeCall?.callee;
        if (targetCallee) {
          sendFcmCancelCall(targetCallee, currentId);
        }
      }
    }
  };
  const cleanupCall = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }
    if (iceDisconnectionTimerRef.current) {
      clearTimeout(iceDisconnectionTimerRef.current);
      iceDisconnectionTimerRef.current = null;
    }
    if (diagnosticsIntervalRef.current) {
      clearInterval(diagnosticsIntervalRef.current);
      diagnosticsIntervalRef.current = null;
    }
    if (unsubCallDocRef.current) {
      unsubCallDocRef.current();
      unsubCallDocRef.current = null;
    }
    if (unsubCallerCandidatesRef.current) {
      unsubCallerCandidatesRef.current();
      unsubCallerCandidatesRef.current = null;
    }
    if (unsubCalleeCandidatesRef.current) {
      unsubCalleeCandidatesRef.current();
      unsubCalleeCandidatesRef.current = null;
    }
    if (peerConnectionRef.current) {
      try {
        peerConnectionRef.current.close();
      } catch (e) {
      }
      peerConnectionRef.current = null;
    }
    if (localStreamRef.current) {
      try {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch (e) {
      }
      localStreamRef.current = null;
    }
    if (remoteStreamRef.current) {
      try {
        remoteStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch (e) {
      }
      remoteStreamRef.current = new MediaStream();
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    androidBridge.resetCallAudioMode();
  };
  const toggleMute = () => {
    if (!localStreamRef.current) return;
    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = isMuted;
      setIsMuted(!isMuted);
    }
  };
  const toggleVideo = () => {
    if (!localStreamRef.current) return;
    const videoTrack = localStreamRef.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = isVideoOff;
      setIsVideoOff(!isVideoOff);
    }
  };
  const rttMs = diagnostics?.currentRoundTripTime ? Math.round(diagnostics.currentRoundTripTime) : 0;
  const packetsLost = diagnostics?.packetsLost ?? 0;
  const packetsReceived = diagnostics?.packetsReceived ?? 0;
  const packetLossPercent = packetsReceived > 0 ? (packetsLost / (packetsLost + packetsReceived) * 100).toFixed(1) : "0";
  let qualityRating = "excellent";
  let qualityText = "ممتازة";
  if (rttMs > 300 || packetsLost > 10) {
    qualityRating = "poor";
    qualityText = "ضعيفة";
  } else if (rttMs > 150 || packetsLost > 3) {
    qualityRating = "good";
    qualityText = "جيدة";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between items-center select-none overflow-hidden dir-rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: remoteAudioRef, autoPlay: true, playsInline: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute inset-0 w-full h-full bg-slate-900 overflow-hidden ${callType === "video" ? "block" : "hidden"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          ref: remoteVideoRef,
          autoPlay: true,
          muted: true,
          playsInline: true,
          className: "w-full h-full object-contain bg-black"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-5 left-5 w-28 md:w-36 aspect-[3/4] bg-slate-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl z-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: localVideoRef,
            autoPlay: true,
            muted: true,
            playsInline: true,
            className: `w-full h-full object-contain bg-black transform -scale-x-100 ${isVideoOff ? "hidden" : "block"}`
          }
        ),
        isVideoOff && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 mb-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: "الكاميرا مغلقة" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 w-full p-4 pt-6 flex flex-col items-center text-white bg-gradient-to-b from-black/85 via-black/50 to-transparent z-30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex items-center justify-between px-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowDiagnostics(!showDiagnostics),
            className: `p-2.5 rounded-full backdrop-blur-md border transition cursor-pointer ${showDiagnostics ? "bg-sky-500/30 text-sky-300 border-sky-500/50" : "bg-black/40 text-slate-300 border-white/10 hover:text-white hover:bg-black/60"}`,
            title: "بيانات التشخيص WebRTC",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-white tracking-wide", children: targetName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs md:text-sm font-medium mt-0.5 ${signalingState === "RECONNECTING" ? "text-amber-400 animate-pulse" : "text-slate-300"}`, children: signalingState === "CONNECTED" ? formatTime(callDuration) : statusText })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsTurnSettingsOpen(true),
            className: `p-2.5 rounded-full backdrop-blur-md border transition cursor-pointer ${isTurnSettingsOpen ? "bg-amber-500/30 text-amber-300 border-amber-500/50" : "bg-black/40 text-slate-300 border-white/10 hover:text-white hover:bg-black/60"}`,
            title: "إعدادات خادم TURN / 4G/5G",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5 text-amber-400" })
          }
        )
      ] }),
      signalingState === "CONNECTED" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2 mt-2 animate-in fade-in duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${qualityRating === "excellent" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : qualityRating === "good" ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : "bg-rose-500/20 text-rose-300 border-rose-500/30"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "جودة الشبكة: ",
            qualityText
          ] }),
          rttMs > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-90 font-mono", children: [
            "(",
            rttMs,
            "ms)"
          ] }),
          packetsLost > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] opacity-80", children: [
            "فقدان: ",
            packetLossPercent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${diagnostics?.selectedCandidateType === "relay" ? "bg-purple-900/70 text-purple-300 border-purple-500/40" : diagnostics?.selectedCandidateType === "srflx" || diagnostics?.selectedCandidateType === "prflx" || diagnostics?.isDirectP2P ? "bg-emerald-900/70 text-emerald-300 border-emerald-500/40" : diagnostics?.selectedCandidateType === "host" ? "bg-sky-900/70 text-sky-300 border-sky-500/40" : "bg-slate-800/80 text-slate-300 border-white/10"}`, children: diagnostics?.mediaTransportLabel || (diagnostics?.selectedCandidateType === "relay" ? "🔄 مسار ممرر (TURN Relay)" : diagnostics?.selectedCandidateType === "srflx" || diagnostics?.selectedCandidateType === "prflx" ? "⚡ اتصال مباشر نظير-إلى-نظير (Direct P2P via STUN)" : diagnostics?.selectedCandidateType === "host" ? "🏠 شبكة محلية (Direct LAN)" : "⚡ اتصال مباشر (Direct P2P)") })
      ] }),
      isAudioPlaybackBlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 animate-in fade-in slide-in-from-top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: unlockAudioContext,
          className: "px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-full flex items-center gap-2 shadow-xl cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4 animate-bounce" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اضغط هنا لتفعيل صوت الطرف الآخر (تجاوز حظر المتصفح)" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-0.5 mt-2 bg-black/40 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-300 text-[10px] font-semibold shadow-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "اتصال مباشر مشفر (DTLS-SRTP P2P)" })
      ] })
    ] }),
    showDiagnostics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-24 left-4 right-4 max-w-sm mx-auto bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-xs font-mono text-slate-200 z-40 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 dir-ltr text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 pb-2 mb-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-bold text-sky-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "WebRTC Diagnostics" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-bold ${diagnostics?.connectionState === "connected" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`, children: diagnostics?.connectionState?.toUpperCase() || "OFFLINE" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Signaling: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: diagnostics?.signalingStatus })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "ICE Conn: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: diagnostics?.iceConnectionState })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "ICE Gather: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: diagnostics?.iceGatheringState })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Selected Path: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold uppercase px-1.5 py-0.5 rounded text-[10px] ${diagnostics?.selectedCandidateType === "relay" ? "bg-purple-900/60 text-purple-300 border border-purple-500/40" : diagnostics?.selectedCandidateType === "srflx" || diagnostics?.isDirectP2P ? "bg-emerald-900/60 text-emerald-300 border border-emerald-500/40" : diagnostics?.selectedCandidateType === "host" ? "bg-sky-900/60 text-sky-300 border border-sky-500/40" : "text-slate-400"}`, children: diagnostics?.selectedCandidateType || "none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Pair: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sky-300 text-[10px]", children: diagnostics?.selectedCandidatePair || "None" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 bg-white/5 rounded-lg p-1.5 border border-white/10 text-[10px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-400 mb-0.5 font-semibold", children: "Candidates Gathered:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Host: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-emerald-400", children: diagnostics?.hostCandidatesGathered ?? 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "STUN (srflx): ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-sky-400", children: diagnostics?.stunCandidatesGathered ?? 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "TURN (relay): ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: diagnostics?.turnCandidatesGathered ? "text-purple-400" : "text-slate-400", children: diagnostics?.turnCandidatesGathered ?? 0 })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "RTT: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-emerald-400", children: diagnostics?.currentRoundTripTime ? `${diagnostics.currentRoundTripTime} ms` : "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Bitrate Out: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: diagnostics?.availableOutgoingBitrate ? `${diagnostics.availableOutgoingBitrate} kbps` : "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Mic / Cam: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white text-[10px]", children: [
            diagnostics?.microphoneState === "enabled" ? "🎙️On" : "🔇Muted",
            " | ",
            diagnostics?.cameraState === "enabled" ? "📷On" : "Off"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Remote Tracks: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white text-[10px]", children: [
            "A:",
            diagnostics?.remoteAudioTrackState === "live" ? "🟢" : "⚪",
            " V:",
            diagnostics?.remoteVideoTrackState === "live" ? "🟢" : "⚪"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Packets Lost: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagnostics?.packetsLost ? "text-rose-400" : "text-slate-200", children: diagnostics?.packetsLost ?? 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Net: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-300", children: [
            diagnostics?.networkType,
            " (",
            diagnostics?.isOnline ? "Online" : "Offline",
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex items-center justify-between bg-white/5 rounded-lg px-2 py-1 text-[10px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Media Flow (In / Out):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-emerald-300 font-semibold", children: [
            "↓ ",
            Math.round((diagnostics?.bytesReceived || 0) / 1024),
            " KB | ↑ ",
            Math.round((diagnostics?.bytesSent || 0) / 1024),
            " KB",
            diagnostics?.hasBidirectionalMedia ? " (2-Way Active)" : ""
          ] })
        ] })
      ] }),
      diagnostics?.networkLimitationNotice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 p-2 rounded-lg bg-rose-950/80 border border-rose-500/40 text-[10.5px] text-rose-300 leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-rose-400 block mb-0.5", children: "⚠️ تنبيه الاتصال المباشر (Direct P2P Notice):" }),
        diagnostics.networkLimitationNotice
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 pt-2 border-t border-white/10 text-[10px] flex items-center justify-between text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "TURN Status: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: diagnostics?.turnConfigured ? "text-emerald-400" : "text-amber-400", children: diagnostics?.turnStatusText })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Creds: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-sky-300", children: diagnostics?.turnCredentialStatus })
        ] })
      ] })
    ] }),
    (callType === "voice" || signalingState !== "CONNECTED") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-[#0b141a] flex flex-col items-center justify-center p-6 text-center z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center mt-10", children: [
        signalingState === "CALLING" || signalingState === "RINGING" || signalingState === "RECONNECTING" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-56 h-56 rounded-full bg-white/5 animate-ping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-44 h-44 rounded-full bg-white/10 animate-pulse" })
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-700 flex items-center justify-center text-white text-5xl font-bold shadow-2xl z-10 overflow-hidden", children: targetName.charAt(0).toUpperCase() })
      ] }),
      diagnostics?.networkLimitationNotice && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 max-w-sm mx-auto p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs text-center leading-relaxed shadow-lg z-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-6 h-6 mx-auto mb-2 text-rose-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-rose-300 text-sm mb-1", children: "فحص الاتصال المباشر (P2P NAT Analysis)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: diagnostics.networkLimitationNotice })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 w-full px-6 pb-12 pt-8 flex items-center justify-center bg-gradient-to-t from-black/95 via-black/60 to-transparent z-30", children: signalingState === "RINGING" ? (
      /* Incoming Call Controls: Accept & Decline */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full justify-between max-w-xs animate-in slide-in-from-bottom-10 fade-in duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleEndCall("declined"),
            className: "flex flex-col items-center gap-3 cursor-pointer group active:scale-90 transition-transform",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[#FF3B30] text-white flex items-center justify-center transition-transform transform hover:scale-105 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "w-8 h-8" }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleAcceptCall,
            className: "flex flex-col items-center gap-3 cursor-pointer group active:scale-90 transition-transform",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[#34C759] text-white flex items-center justify-center transition-transform transform hover:scale-105 animate-bounce shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-8 h-8 animate-pulse" }) })
          }
        )
      ] })
    ) : (
      /* Active / Outgoing Call Controls */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm justify-between items-center bg-[#1c1e21]/80 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: toggleVideo,
            className: `flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-full transition cursor-pointer active:scale-90 ${isVideoOff ? "text-white/50 hover:bg-white/10" : "bg-white/20 text-white"}`,
            title: isVideoOff ? "تشغيل الكاميرا" : "إيقاف الكاميرا",
            children: isVideoOff ? /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: toggleMute,
            className: `flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-full transition cursor-pointer active:scale-90 ${isMuted ? "bg-white/20 text-white" : "text-white/50 hover:bg-white/10"}`,
            title: isMuted ? "إلغاء كتم الصوت" : "كتم الصوت",
            children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: toggleSpeaker,
            className: `flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-full transition cursor-pointer active:scale-90 ${isSpeaker ? "bg-white/20 text-white" : "text-white/50 hover:bg-white/10"}`,
            title: isSpeaker ? "مكبر الصوت (سبيكر) مُفعل" : "سماعة الأذن (الهاتف) مفعلة",
            children: isSpeaker ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume1, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleEndCall("ended"),
            className: "w-14 h-14 rounded-full bg-[#FF3B30] hover:bg-[#FF453A] active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer ml-2 shadow-2xl",
            title: "إنهاء المكالمة",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "w-7 h-7" })
          }
        )
      ] })
    ) }),
    isTurnSettingsOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-slate-900 border border-white/20 rounded-3xl p-6 text-white shadow-2xl space-y-4 dir-rtl text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/10 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-white", children: "إعدادات خادم TURN / Relay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "للاتصال العابر للشبكات (4G/5G ↔ Wi-Fi)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsTurnSettingsOpen(false),
            className: "w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-300 leading-relaxed bg-amber-500/10 border border-amber-500/20 rounded-xl p-3", children: [
        "يُستخدم خادم ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "TURN" }),
        " لتمرير بيانات الصوت والفيديو بين الأجهزة عندما يكون أحد الطرفين على شبكة 4G/5G والآخر على Wi-Fi أو خلف جدار ناري متشدد."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveTurnSettings, className: "space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "رابط خادم TURN (يمكن إدخال عدة خوادم مفصولة بفواصل)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              dir: "ltr",
              placeholder: "turn:openrelay.metered.ca:443,turn:openrelay.metered.ca:80",
              value: turnUrlInput,
              onChange: (e) => setTurnUrlInput(e.target.value),
              className: "w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-mono"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "اسم المستخدم (Username)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              dir: "ltr",
              placeholder: "openrelayproject",
              value: turnUserInput,
              onChange: (e) => setTurnUserInput(e.target.value),
              className: "w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-mono"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-slate-300 mb-1", children: "كلمة المرور / الاعتماد (Credential)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "password",
              dir: "ltr",
              placeholder: "••••••••••••",
              value: turnCredInput,
              onChange: (e) => setTurnCredInput(e.target.value),
              className: "w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-mono"
            }
          )
        ] }),
        turnSaveSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5 animate-in fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: turnSaveSuccess })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              className: "w-full py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-98 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حفظ الإعدادات محلياً (localStorage)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleApplyFallbackTurn,
                className: "flex-1 py-2 bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl text-[11px] font-medium transition cursor-pointer flex items-center justify-center gap-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "استخدام OpenRelay الاحتياطي" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleResetTurnSettings,
                className: "py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-[11px] font-medium transition cursor-pointer flex items-center justify-center gap-1",
                title: "إعادة ضبط للإعدادات الافتراضية",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "إعادة ضبط" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}

export { WebRTCCallModal as default };
