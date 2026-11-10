import { r as reactExports, j as jsxRuntimeExports, q as CheckCircle2, b as Search, X, aM as History, R as RefreshCw, $ as Radio, aN as Disc, s as AlertCircle, V as Video, av as Play, G as Clock, T as Trash2, ak as Eye, at as MoreVertical, a3 as Loader2, J as VolumeX, K as Volume2, C as Check, E as Plus, Y as Send, c as Share2, aC as VideoOff, o as AlertTriangle, aO as SwitchCamera, aD as MicOff, ai as Mic, Z as Users, a7 as useNavigate, k as ArrowRight } from './vendor-react-DAzNXBh_.js';
import { d as db, h as handleFirestoreError, O as OperationType } from './index-1f3YQYJq.js';
import { x as query, y as limit, C as orderBy, n as collection, A as onSnapshot, m as updateDoc, h as doc, z as where, o as getDocs, j as setDoc, k as deleteDoc, I as increment, F as addDoc } from './vendor-firebase-DLAfa3Dz.js';
import { r as reelsInteractionService } from './reelsInteractionService-CDUqcAZy.js';
import { c as getProductionRtcConfiguration } from './webrtcHelper-DQrx3HkE.js';

class LiveStreamService {
  /**
   * Subscribe to all live & recorded streams with real-time updates.
   */
  subscribeToAllLiveStreams(callback) {
    const q = query(
      collection(db, "liveStreams"),
      orderBy("startedAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const streams = [];
        const now = Date.now();
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          const startedAt = data.startedAt || now;
          const lastPingAt = data.lastPingAt || startedAt;
          let status = data.status || "live";
          if (status === "live" && (now - lastPingAt > 4e4 || now - startedAt > 6 * 3600 * 1e3)) {
            status = "ended";
            updateDoc(doc(db, "liveStreams", docSnap.id), {
              status: "ended",
              endedAt: lastPingAt,
              duration: Math.max(1, Math.round((lastPingAt - startedAt) / 1e3))
            }).catch(() => {
            });
          }
          streams.push({
            id: docSnap.id,
            creatorId: data.creatorId,
            creatorName: data.creatorName || "مستخدم IMI",
            creatorPhone: data.creatorPhone || "",
            creatorAvatar: data.creatorAvatar || "",
            title: data.title || "بث مباشر تفاعلي",
            tags: data.tags || ["مباشر", "LIVEIMI"],
            thumbnailUrl: data.thumbnailUrl || "",
            recordingUrl: data.recordingUrl || "",
            status,
            startedAt,
            endedAt: data.endedAt || (status === "ended" ? lastPingAt : void 0),
            lastPingAt,
            duration: data.duration || (data.endedAt && startedAt ? Math.round((data.endedAt - startedAt) / 1e3) : Math.round((lastPingAt - startedAt) / 1e3)),
            viewerCount: status === "live" ? data.viewerCount || 1 : 0,
            totalViews: data.totalViews || data.viewerCount || 1,
            likesCount: data.likesCount || 0
          });
        });
        callback(streams);
      },
      (error) => {
        console.error("Error fetching all live streams:", error);
      }
    );
    return unsubscribe;
  }
  /**
   * Send heartbeat ping while broadcasting to keep stream alive
   */
  async pingStream(streamId) {
    try {
      const streamDocRef = doc(db, "liveStreams", streamId);
      await updateDoc(streamDocRef, {
        lastPingAt: Date.now()
      });
    } catch {
    }
  }
  /**
   * End any pending/ghost live streams for a specific user
   */
  async cleanupUserPendingLiveStreams(creatorId) {
    try {
      const q = query(
        collection(db, "liveStreams"),
        where("creatorId", "==", creatorId),
        where("status", "==", "live")
      );
      const snap = await getDocs(q);
      const now = Date.now();
      snap.docs.forEach((d) => {
        const dat = d.data();
        const lastActivity = dat.lastPingAt || dat.startedAt || 0;
        if (now - lastActivity > 12e4) {
          updateDoc(doc(db, "liveStreams", d.id), {
            status: "ended",
            endedAt: now,
            duration: Math.max(1, Math.round((now - (dat.startedAt || now)) / 1e3))
          }).catch(() => {
          });
        }
      });
    } catch (e) {
      console.warn("cleanupUserPendingLiveStreams notice:", e);
    }
  }
  subscribeToActiveLiveStreams(callback) {
    const q = query(
      collection(db, "liveStreams"),
      where("status", "==", "live"),
      limit(20)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const streams = [];
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          streams.push({
            id: docSnap.id,
            creatorId: data.creatorId,
            creatorName: data.creatorName || "مستخدم IMI",
            creatorPhone: data.creatorPhone || "",
            creatorAvatar: data.creatorAvatar || "",
            title: data.title || "بث مباشر تفاعلي",
            tags: data.tags || ["مباشر", "LIVEIMI"],
            thumbnailUrl: data.thumbnailUrl || "",
            recordingUrl: data.recordingUrl || "",
            status: data.status || "live",
            startedAt: data.startedAt || Date.now(),
            endedAt: data.endedAt,
            duration: data.duration || 0,
            viewerCount: data.viewerCount || 1,
            totalViews: data.totalViews || data.viewerCount || 1,
            likesCount: data.likesCount || 0
          });
        });
        streams.sort((a, b) => b.startedAt - a.startedAt);
        callback(streams);
      },
      (error) => {
        console.warn("Live streams subscription error:", error);
        callback([]);
      }
    );
    return unsubscribe;
  }
  /**
   * Subscribe to a single live stream's metadata (e.g. viewer count, status)
   */
  subscribeToStream(streamId, callback) {
    const streamDocRef = doc(db, "liveStreams", streamId);
    return onSnapshot(
      streamDocRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          callback(null);
          return;
        }
        const data = snapshot.data();
        callback({
          id: snapshot.id,
          creatorId: data.creatorId,
          creatorName: data.creatorName || "مستخدم IMI",
          creatorPhone: data.creatorPhone || "",
          creatorAvatar: data.creatorAvatar || "",
          title: data.title || "بث مباشر تفاعلي",
          tags: data.tags || ["مباشر"],
          thumbnailUrl: data.thumbnailUrl || "",
          recordingUrl: data.recordingUrl || "",
          status: data.status || "live",
          startedAt: data.startedAt || Date.now(),
          endedAt: data.endedAt,
          duration: data.duration || (data.endedAt && data.startedAt ? Math.round((data.endedAt - data.startedAt) / 1e3) : 0),
          viewerCount: data.viewerCount || 1,
          totalViews: data.totalViews || data.viewerCount || 1,
          likesCount: data.likesCount || 0
        });
      },
      (error) => {
        console.warn("Live stream doc subscription error:", error);
        callback(null);
      }
    );
  }
  /**
   * Start/create a new Live Stream document
   */
  async createLiveStream(params) {
    const streamId = `live_${params.creatorId}_${Date.now()}`;
    const streamDocRef = doc(db, "liveStreams", streamId);
    const newStreamData = {
      creatorId: params.creatorId,
      creatorName: params.creatorName,
      creatorPhone: params.creatorPhone || "",
      creatorAvatar: params.creatorAvatar || "",
      title: params.title.trim() || "بث مباشر جديد على Vidéo IMI",
      tags: params.tags && params.tags.length > 0 ? params.tags : ["مباشر", "Vidéo_IMI"],
      status: "live",
      startedAt: Date.now(),
      viewerCount: 1,
      // Broadcaster counts as 1 initial viewer
      likesCount: 0
    };
    try {
      await setDoc(streamDocRef, newStreamData);
      return streamId;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `liveStreams/${streamId}`);
      throw error;
    }
  }
  /**
   * Delete a live stream document completely (for creator cleanup)
   */
  async deleteLiveStream(streamId) {
    const streamDocRef = doc(db, "liveStreams", streamId);
    try {
      await deleteDoc(streamDocRef);
    } catch (error) {
      console.warn("Failed to delete live stream:", error);
      handleFirestoreError(error, OperationType.DELETE, `liveStreams/${streamId}`);
    }
  }
  /**
   * End a live stream safely and save recorded archive metadata
   */
  async endLiveStream(streamId, metadata) {
    const streamDocRef = doc(db, "liveStreams", streamId);
    try {
      const updateData = {
        status: "ended",
        endedAt: Date.now(),
        recordingUrl: metadata?.recordingUrl || "/api/reels/sample/1"
      };
      if (metadata?.duration !== void 0) updateData.duration = metadata.duration;
      if (metadata?.recordingUrl !== void 0) updateData.recordingUrl = metadata.recordingUrl;
      if (metadata?.totalViews !== void 0) updateData.totalViews = metadata.totalViews;
      if (metadata?.likesCount !== void 0) updateData.likesCount = metadata.likesCount;
      await setDoc(streamDocRef, updateData, { merge: true });
    } catch (error) {
      console.warn("Failed to end live stream:", error);
    }
  }
  /**
   * Join live stream as a viewer (increment count & register presence)
   */
  async joinLiveStream(streamId, userId, userName, userAvatar) {
    const viewerDocRef = doc(db, "liveStreams", streamId, "viewers", userId);
    const streamDocRef = doc(db, "liveStreams", streamId);
    try {
      await setDoc(viewerDocRef, {
        userId,
        userName,
        userAvatar: userAvatar || "",
        joinedAt: Date.now()
      }, { merge: true });
      await updateDoc(streamDocRef, {
        viewerCount: increment(1)
      });
    } catch (error) {
      console.warn("Failed to register viewer join:", error);
    }
  }
  /**
   * Leave live stream as a viewer (decrement count & remove presence)
   */
  async leaveLiveStream(streamId, userId) {
    const viewerDocRef = doc(db, "liveStreams", streamId, "viewers", userId);
    const streamDocRef = doc(db, "liveStreams", streamId);
    try {
      await deleteDoc(viewerDocRef);
      await updateDoc(streamDocRef, {
        viewerCount: increment(-1)
      });
    } catch (error) {
      console.warn("Failed to register viewer leave:", error);
    }
  }
  /**
   * Subscribe to real-time live comments
   */
  subscribeToComments(streamId, callback) {
    const commentsRef = collection(db, "liveStreams", streamId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"), limit(50));
    return onSnapshot(
      q,
      (snapshot) => {
        const comments = [];
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          comments.push({
            id: docSnap.id,
            streamId,
            userId: data.userId,
            userName: data.userName || "مشاهد",
            userAvatar: data.userAvatar || "",
            text: data.text || "",
            createdAt: data.createdAt || Date.now()
          });
        });
        callback(comments);
      },
      (error) => {
        console.warn("Live comments subscription error:", error);
        callback([]);
      }
    );
  }
  /**
   * Send a live comment
   */
  async sendComment(params) {
    const commentsRef = collection(db, "liveStreams", params.streamId, "comments");
    try {
      await addDoc(commentsRef, {
        userId: params.userId,
        userName: params.userName,
        userAvatar: params.userAvatar || "",
        text: params.text.trim(),
        createdAt: Date.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `liveStreams/${params.streamId}/comments`);
      throw error;
    }
  }
  /**
   * Send a live reaction (heart, fire, etc.)
   */
  async sendReaction(params) {
    const reactionsRef = collection(db, "liveStreams", params.streamId, "reactions");
    const streamDocRef = doc(db, "liveStreams", params.streamId);
    try {
      await addDoc(reactionsRef, {
        userId: params.userId,
        emoji: params.emoji,
        createdAt: Date.now()
      });
      await updateDoc(streamDocRef, {
        likesCount: increment(1)
      });
    } catch (error) {
      console.warn("Failed to send reaction:", error);
    }
  }
  /**
   * Subscribe to live reactions stream (floating hearts/emojis)
   */
  subscribeToReactions(streamId, callback) {
    const reactionsRef = collection(db, "liveStreams", streamId, "reactions");
    const q = query(reactionsRef, orderBy("createdAt", "desc"), limit(15));
    let initialLoaded = false;
    return onSnapshot(
      q,
      (snapshot) => {
        if (!initialLoaded) {
          initialLoaded = true;
          return;
        }
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            callback({
              id: change.doc.id,
              streamId,
              userId: data.userId,
              emoji: data.emoji || "❤️",
              createdAt: data.createdAt || Date.now()
            });
          }
        });
      },
      (error) => {
        console.warn("Live reactions subscription error:", error);
      }
    );
  }
  /**
   * Send a signal from Viewer to Broadcaster (e.g. join-request, answer, viewer-ice-candidate)
   */
  async sendViewerSignal(streamId, viewerId, signalData) {
    try {
      const signalDocRef = doc(db, "liveStreams", streamId, "signals", viewerId);
      await setDoc(signalDocRef, {
        ...signalData,
        viewerId,
        updatedAt: Date.now()
      }, { merge: true });
    } catch (error) {
      console.warn("Failed to send viewer signal:", error);
    }
  }
  /**
   * Subscribe to all signals on a live stream (used by Broadcaster to serve multiple viewers)
   */
  subscribeToAllSignals(streamId, onSignalReceived) {
    const signalsColRef = collection(db, "liveStreams", streamId, "signals");
    return onSnapshot(signalsColRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          const data = change.doc.data();
          onSignalReceived(change.doc.id, data);
        }
      });
    }, (error) => {
      console.warn("Error subscribing to live stream signals:", error);
    });
  }
  /**
   * Send signal from Broadcaster to a specific Viewer (e.g. offer, broadcaster-ice-candidate)
   */
  async sendBroadcasterSignal(streamId, viewerId, signalData) {
    try {
      const signalDocRef = doc(db, "liveStreams", streamId, "signals", viewerId);
      await setDoc(signalDocRef, {
        ...signalData,
        updatedAt: Date.now()
      }, { merge: true });
    } catch (error) {
      console.warn("Failed to send broadcaster signal:", error);
    }
  }
  /**
   * Subscribe to the signal document for a specific viewer (used by Viewer to receive offer/candidates)
   */
  subscribeToViewerSignalDoc(streamId, viewerId, onSignal) {
    const signalDocRef = doc(db, "liveStreams", streamId, "signals", viewerId);
    return onSnapshot(signalDocRef, (snapshot) => {
      if (snapshot.exists()) {
        onSignal(snapshot.data());
      }
    }, (error) => {
      console.warn("Error subscribing to viewer signal doc:", error);
    });
  }
  /**
   * Add ICE candidate from Broadcaster to Viewer candidate collection
   */
  async addBroadcasterCandidate(streamId, viewerId, candidate) {
    try {
      const colRef = collection(db, "liveStreams", streamId, "signals", viewerId, "b_candidates");
      await addDoc(colRef, {
        candidate,
        createdAt: Date.now()
      });
    } catch (e) {
      console.warn("Failed to add broadcaster candidate:", e);
    }
  }
  /**
   * Add ICE candidate from Viewer to Broadcaster candidate collection
   */
  async addViewerCandidate(streamId, viewerId, candidate) {
    try {
      const colRef = collection(db, "liveStreams", streamId, "signals", viewerId, "v_candidates");
      await addDoc(colRef, {
        candidate,
        createdAt: Date.now()
      });
    } catch (e) {
      console.warn("Failed to add viewer candidate:", e);
    }
  }
  /**
   * Subscribe to broadcaster ICE candidates for a viewer
   */
  subscribeToBroadcasterCandidates(streamId, viewerId, onCandidate) {
    const colRef = collection(db, "liveStreams", streamId, "signals", viewerId, "b_candidates");
    return onSnapshot(colRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const dat = change.doc.data();
          if (dat && dat.candidate) {
            onCandidate(dat.candidate);
          }
        }
      });
    }, (err) => {
      console.warn("Error in broadcaster candidates subscription:", err);
    });
  }
  /**
   * Subscribe to viewer ICE candidates for the broadcaster
   */
  subscribeToViewerCandidates(streamId, viewerId, onCandidate) {
    const colRef = collection(db, "liveStreams", streamId, "signals", viewerId, "v_candidates");
    return onSnapshot(colRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const dat = change.doc.data();
          if (dat && dat.candidate) {
            onCandidate(dat.candidate);
          }
        }
      });
    }, (err) => {
      console.warn("Error in viewer candidates subscription:", err);
    });
  }
  /**
   * Real-time live frame broadcast sync (reliable visual fallback for strict cross-network NAT)
   */
  async updateLiveFrame(streamId, frameDataUrl) {
    try {
      const streamDocRef = doc(db, "liveStreams", streamId);
      await setDoc(streamDocRef, {
        lastFrame: frameDataUrl,
        lastFrameTime: Date.now()
      }, { merge: true });
    } catch (e) {
    }
  }
  /**
   * Subscribe to live frame updates (used by Viewer as zero-failure visual fallback)
   */
  subscribeToLiveFrame(streamId, callback) {
    const streamDocRef = doc(db, "liveStreams", streamId);
    return onSnapshot(streamDocRef, (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        if (d.lastFrame && d.lastFrameTime) {
          callback(d.lastFrame, d.lastFrameTime);
        }
      }
    });
  }
  // --- Convenience & Signaling Methods ---
  async startLiveStream(streamData) {
    const streamRef = doc(db, "liveStreams", streamData.id);
    await setDoc(streamRef, {
      ...streamData,
      status: "live",
      startedAt: Date.now(),
      lastPingAt: Date.now()
    }, { merge: true });
    return streamData.id;
  }
  async updateViewerCount(streamId, delta) {
    try {
      const streamRef = doc(db, "liveStreams", streamId);
      await updateDoc(streamRef, {
        viewerCount: increment(delta)
      });
    } catch (e) {
    }
  }
  subscribeToLiveComments(streamId, callback) {
    return this.subscribeToComments(streamId, callback);
  }
  async sendLiveComment(streamId, comment) {
    const commentsRef = collection(db, "liveStreams", streamId, "comments");
    await addDoc(commentsRef, {
      ...comment,
      createdAt: comment.createdAt || Date.now()
    });
  }
  subscribeToLiveReactions(streamId, callback) {
    return this.subscribeToReactions(streamId, callback);
  }
  async sendLiveReaction(streamId, reaction) {
    const reactionsRef = collection(db, "liveStreams", streamId, "reactions");
    const streamDocRef = doc(db, "liveStreams", streamId);
    await addDoc(reactionsRef, {
      ...reaction,
      createdAt: Date.now()
    });
    try {
      await updateDoc(streamDocRef, {
        likesCount: increment(1)
      });
    } catch (e) {
    }
  }
  async requestJoin(streamId, viewerId) {
    await this.sendViewerSignal(streamId, viewerId, { type: "join-request", viewerId });
  }
  listenToJoinRequests(streamId, callback) {
    return this.subscribeToAllSignals(streamId, (viewerId, data) => {
      if (data?.type === "join-request") {
        callback(viewerId);
      }
    });
  }
  async sendOffer(streamId, viewerId, offer) {
    await this.sendBroadcasterSignal(streamId, viewerId, {
      offer: { type: offer.type, sdp: offer.sdp },
      offerCreatedAt: Date.now()
    });
  }
  listenToOffer(streamId, viewerId, callback) {
    return this.subscribeToViewerSignalDoc(streamId, viewerId, (data) => {
      if (data?.offer) {
        callback(data.offer);
      }
    });
  }
  async sendAnswer(streamId, viewerId, answer) {
    await this.sendViewerSignal(streamId, viewerId, {
      answer: { type: answer.type, sdp: answer.sdp },
      answerCreatedAt: Date.now()
    });
  }
  listenToAnswer(streamId, viewerId, callback) {
    return this.subscribeToViewerSignalDoc(streamId, viewerId, (data) => {
      if (data?.answer) {
        callback(data.answer);
      }
    });
  }
  async sendIceCandidate(streamId, viewerId, candidate, role) {
    const field = role === "broadcaster" ? "broadcasterCandidate" : "viewerCandidate";
    const payload = {
      [field]: {
        candidate: candidate.candidate,
        sdpMid: candidate.sdpMid,
        sdpMLineIndex: candidate.sdpMLineIndex
      },
      candidateUpdatedAt: Date.now()
    };
    if (role === "broadcaster") {
      await this.sendBroadcasterSignal(streamId, viewerId, payload);
    } else {
      await this.sendViewerSignal(streamId, viewerId, payload);
    }
  }
  listenToIceCandidates(streamId, viewerId, targetRole, callback) {
    const field = targetRole === "broadcaster" ? "broadcasterCandidate" : "viewerCandidate";
    return this.subscribeToViewerSignalDoc(streamId, viewerId, (data) => {
      if (data && data[field]) {
        callback(data[field]);
      }
    });
  }
}
const liveStreamService = new LiveStreamService();

function LiveSection({
  liveStreams,
  currentUserId,
  currentUserName,
  onSelectStream,
  onOpenGoLive,
  onRefresh,
  isLoading
}) {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [deletingStreamId, setDeletingStreamId] = reactExports.useState(null);
  const [feedbackMsg, setFeedbackMsg] = reactExports.useState(null);
  const [selectedCreatorArchive, setSelectedCreatorArchive] = reactExports.useState(null);
  const { activeLiveList, allRecordedList } = reactExports.useMemo(() => {
    const live = liveStreams.filter((s) => s.status === "live");
    const recorded = liveStreams.filter((s) => s.status === "ended");
    return { activeLiveList: live, allRecordedList: recorded };
  }, [liveStreams]);
  const { filteredLive, filteredRecorded } = reactExports.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return { filteredLive: activeLiveList, filteredRecorded: [] };
    }
    const live = activeLiveList.filter(
      (s) => s.title.toLowerCase().includes(q) || s.creatorName.toLowerCase().includes(q) || s.tags?.some((t) => t.toLowerCase().includes(q))
    );
    const rec = allRecordedList.filter(
      (s) => s.title.toLowerCase().includes(q) || s.creatorName.toLowerCase().includes(q) || s.tags?.some((t) => t.toLowerCase().includes(q))
    );
    return { filteredLive: live, filteredRecorded: rec };
  }, [searchQuery, activeLiveList, allRecordedList]);
  const creatorRecordings = reactExports.useMemo(() => {
    if (!selectedCreatorArchive) return [];
    return allRecordedList.filter((s) => s.creatorId === selectedCreatorArchive.creatorId);
  }, [selectedCreatorArchive, allRecordedList]);
  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "اليوم";
    const date = new Date(timestamp);
    return date.toLocaleDateString("ar-EG", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const handleDeleteStream = async (e, streamId) => {
    e.stopPropagation();
    try {
      setDeletingStreamId(streamId);
      await liveStreamService.deleteLiveStream(streamId);
      setFeedbackMsg("تم حذف التسجيل بنجاح");
      setTimeout(() => setFeedbackMsg(null), 3e3);
    } catch (err) {
      console.error("Failed to delete live stream:", err);
      setFeedbackMsg("فشل حذف البث");
      setTimeout(() => setFeedbackMsg(null), 3e3);
    } finally {
      setDeletingStreamId(null);
    }
  };
  const handleForceCleanupMyStreams = async () => {
    if (currentUserId) {
      await liveStreamService.cleanupUserPendingLiveStreams(currentUserId);
      setFeedbackMsg("تم تحديث وإنهاء أي بث معلق بنجاح");
      setTimeout(() => setFeedbackMsg(null), 3e3);
      onRefresh?.();
    }
  };
  const isSearching = searchQuery.trim().length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col bg-slate-950 text-white overflow-y-auto no-scrollbar pb-24 pt-16 px-3.5 select-none dir-rtl", children: [
    feedbackMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl border border-emerald-400 animate-fade-in flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feedbackMsg })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5 absolute right-3 text-white/40 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: "ابحث بالاسم لعرض البث المباشر أو التسجيلات...",
            className: "w-full bg-slate-900/90 border border-white/10 rounded-xl pr-9 pl-8 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-rose-500 transition"
          }
        ),
        searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSearchQuery(""),
            className: "absolute left-2.5 text-white/40 hover:text-white p-0.5 cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setSelectedCreatorArchive({
            creatorId: currentUserId,
            creatorName: currentUserName,
            creatorAvatar: void 0
          }),
          className: "p-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0",
          title: "تسجيلاتي الخاصة",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-3.5 h-3.5 text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] hidden sm:inline", children: "تسجيلاتي" })
          ]
        }
      ),
      onRefresh && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onRefresh,
          className: "p-2 rounded-xl bg-slate-900 text-white/70 hover:text-white border border-white/10 transition cursor-pointer shrink-0",
          title: "تحديث البثوث",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}` })
        }
      )
    ] }),
    isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-white/70 font-bold px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          'نتائج البحث لـ "',
          searchQuery,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/40", children: [
          "(",
          filteredLive.length,
          " مباشر، ",
          filteredRecorded.length,
          " مسجل)"
        ] })
      ] }),
      filteredLive.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-black text-rose-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3.5 h-3.5 text-rose-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "البثوث المباشرة الحالية" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: filteredLive.map((stream) => renderLiveStreamCard(stream)) })
      ] }),
      filteredRecorded.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-black text-sky-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Disc, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "التسجيلات السابقة المحفوظة" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: filteredRecorded.map((stream) => renderRecordedCard(stream)) })
      ] }),
      filteredLive.length === 0 && filteredRecorded.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center bg-slate-900/50 rounded-2xl border border-white/5 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-8 h-8 text-white/30 mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60", children: "لا توجد بثوث مباشرة أو تسجيلات مطابقة لبحثك" })
      ] })
    ] }) : (
      /* ================= DEFAULT CLEAN VIEW (Active Live Streams) ================= */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3.5 h-3.5 text-rose-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-black text-white", children: [
              "البثوث المباشرة الآن (",
              activeLiveList.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleForceCleanupMyStreams,
              className: "text-[10px] text-white/40 hover:text-white/80 transition underline cursor-pointer",
              title: "إذا كان يظهر لك أنك تبث وأنت لا تبث، اضغط هنا لتنظيف البث",
              children: "تنظيف أي بث معلق"
            }
          )
        ] }),
        activeLiveList.length === 0 ? (
          /* Empty Active Live Streams State */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center p-8 my-auto bg-slate-900/50 rounded-3xl border border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-8 h-8" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black text-white mb-1", children: "لا يوجد بث مباشر نشط حالياً" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60 max-w-xs mb-5 leading-relaxed", children: "كن أول من يبدأ بثاً حياً الآن وتفاعل مع أصدقائك وجمهورك، أو ابحث بالاسم عن تسجيلات أي منشئ محتوى." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: onOpenGoLive,
                className: "px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 hover:from-rose-500 hover:to-red-400 text-white text-xs font-black shadow-xl shadow-rose-600/30 flex items-center gap-2 transition transform hover:scale-105 active:scale-95 cursor-pointer border border-white/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ابدأ بث مباشر جديد" })
                ]
              }
            ) })
          ] })
        ) : (
          /* Active Live Streams Grid */
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5", children: activeLiveList.map((stream) => renderLiveStreamCard(stream)) })
        )
      ] })
    ),
    selectedCreatorArchive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 dir-rtl animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-lg bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-white/10 max-h-[85vh] flex flex-col overflow-hidden shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-[#2AABEE] flex items-center justify-center text-white font-bold text-sm overflow-hidden border border-white/20", children: selectedCreatorArchive.creatorAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: selectedCreatorArchive.creatorAvatar,
              alt: selectedCreatorArchive.creatorName,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedCreatorArchive.creatorName.charAt(0).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-black text-white", children: [
              "تسجيلات البث: ",
              selectedCreatorArchive.creatorName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-white/50", children: [
              creatorRecordings.length,
              " تسجيل محفوظ في الأرشيف"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSelectedCreatorArchive(null),
            className: "p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 overflow-y-auto no-scrollbar space-y-3 flex-1", children: creatorRecordings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Disc, { className: "w-8 h-8 text-white/20 mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50", children: "لا توجد تسجيلات سابقة محفوظة لهذا المنشئ حالياً." })
      ] }) : creatorRecordings.map((recording) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => {
            setSelectedCreatorArchive(null);
            onSelectStream(recording);
          },
          className: "group bg-slate-950/90 rounded-2xl p-3 border border-white/10 hover:border-sky-500/40 transition cursor-pointer flex items-center justify-between gap-3 shadow-md",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-16 h-16 rounded-xl bg-black flex items-center justify-center overflow-hidden shrink-0 border border-white/10 group-hover:border-sky-400 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-sky-400 fill-sky-400 group-hover:scale-110 transition" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white truncate group-hover:text-sky-300 transition", children: recording.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[10px] text-white/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-sky-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDuration(recording.duration) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(recording.endedAt || recording.startedAt) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-sky-400 group-hover:underline pl-1", children: "مشاهدة" }),
              recording.creatorId === currentUserId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => handleDeleteStream(e, recording.id),
                  disabled: deletingStreamId === recording.id,
                  className: "p-2 rounded-xl bg-white/5 hover:bg-rose-600/80 text-white/60 hover:text-white transition cursor-pointer",
                  title: "حذف هذا التسجيل",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Trash2,
                    {
                      className: `w-3.5 h-3.5 ${deletingStreamId === recording.id ? "animate-spin" : ""}`
                    }
                  )
                }
              )
            ] })
          ]
        },
        recording.id
      )) })
    ] }) })
  ] });
  function renderLiveStreamCard(stream) {
    const isMyStream = stream.creatorId === currentUserId;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "group relative bg-slate-900/95 rounded-2xl overflow-hidden border border-rose-500/40 hover:border-rose-500 shadow-lg hover:shadow-rose-950/50 transition duration-200 flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => onSelectStream(stream),
              className: "relative w-full aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/40 flex items-center justify-center overflow-hidden cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full border border-rose-500/20 animate-ping opacity-25" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-36 h-36 rounded-full border border-rose-500/10" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full border-2 border-rose-500 p-0.5 bg-black/60 backdrop-blur-md flex items-center justify-center transition transform group-hover:scale-110 shadow-xl shadow-rose-950/60", children: stream.creatorAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: stream.creatorAvatar,
                      alt: stream.creatorName,
                      className: "w-full h-full rounded-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-lg", children: stream.creatorName ? stream.creatorName.charAt(0).toUpperCase() : "U" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-white drop-shadow-md group-hover:text-rose-400 transition flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3.5 h-3.5 text-rose-500 animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "انقر للانضمام للبث المباشر" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md border border-white/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3 h-3 text-white" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مباشر الآن" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3 text-rose-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stream.viewerCount || 1 })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-slate-900 flex items-center justify-between gap-2 border-t border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                onClick: () => onSelectStream(stream),
                className: "flex-1 min-w-0 cursor-pointer space-y-0.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white truncate group-hover:text-rose-400 transition", children: stream.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-white/60 truncate block", children: [
                    "@",
                    stream.creatorName,
                    " ",
                    isMyStream && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400 font-bold", children: "(أنت)" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setSelectedCreatorArchive({
                    creatorId: stream.creatorId,
                    creatorName: stream.creatorName,
                    creatorAvatar: stream.creatorAvatar
                  });
                },
                className: "p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition cursor-pointer border border-white/10 flex items-center gap-1 shrink-0",
                title: `عرض تسجيلات ${stream.creatorName}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(MoreVertical, { className: "w-4 h-4" })
              }
            )
          ] })
        ]
      },
      stream.id
    );
  }
  function renderRecordedCard(stream) {
    const isMyStream = stream.creatorId === currentUserId;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => onSelectStream(stream),
        className: "group bg-slate-900/90 rounded-2xl p-3 border border-white/10 hover:border-sky-500/40 transition cursor-pointer flex items-center justify-between gap-3 shadow-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-14 h-14 rounded-xl bg-black flex items-center justify-center overflow-hidden shrink-0 border border-white/10 group-hover:border-sky-400 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-sky-400 fill-sky-400 group-hover:scale-110 transition" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white truncate group-hover:text-sky-300 transition", children: stream.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] text-white/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "@",
                  stream.creatorName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-sky-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDuration(stream.duration) })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 shrink-0", children: isMyStream && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => handleDeleteStream(e, stream.id),
              disabled: deletingStreamId === stream.id,
              className: "p-2 rounded-xl bg-white/5 hover:bg-rose-600/80 text-white/60 hover:text-white transition cursor-pointer",
              title: "حذف هذا التسجيل",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: `w-3.5 h-3.5 ${deletingStreamId === stream.id ? "animate-spin" : ""}` })
            }
          ) })
        ]
      },
      stream.id
    );
  }
}

function LiveViewerModal({
  stream,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  onClose
}) {
  const [currentStream, setCurrentStream] = reactExports.useState(stream);
  const [comments, setComments] = reactExports.useState([]);
  const [commentText, setCommentText] = reactExports.useState("");
  const [isFollowed, setIsFollowed] = reactExports.useState(false);
  const [isEnded, setIsEnded] = reactExports.useState(stream.status === "ended");
  const [floatingHearts, setFloatingHearts] = reactExports.useState([]);
  const [showToast, setShowToast] = reactExports.useState({
    message: "",
    visible: false
  });
  const commentsEndRef = reactExports.useRef(null);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [isLiveWebRtcActive, setIsLiveWebRtcActive] = reactExports.useState(false);
  const [isConnectingLive, setIsConnectingLive] = reactExports.useState(stream.status === "live");
  const videoRef = reactExports.useRef(null);
  const remoteStreamRef = reactExports.useRef(null);
  const peerConnectionRef = reactExports.useRef(null);
  const queuedCandidatesRef = reactExports.useRef([]);
  const processedOfferTimeRef = reactExports.useRef(0);
  const [showDiagnostics, setShowDiagnostics] = reactExports.useState(true);
  const [diagViewer, setDiagViewer] = reactExports.useState({
    joinRequestSent: false,
    joinRequestSentAt: null,
    offerReceived: false,
    offerReceivedAt: null,
    answerCreated: false,
    answerCreatedAt: null,
    connectionState: "new",
    signalingState: "stable",
    iceGatheringState: "new",
    iceConnectionState: "new",
    remoteTracksCount: 0,
    remoteVideoTrack: "none",
    remoteAudioTrack: "none",
    remoteMediaStreamReceived: false,
    remoteMediaStreamId: null,
    videoReadyState: 0,
    videoReadyStateText: "HAVE_NOTHING",
    videoHasSrcObject: false,
    playbackStarted: false,
    playbackError: null,
    broadcasterCandidatesReceived: 0,
    viewerCandidatesSent: 0,
    lastError: null
  });
  reactExports.useEffect(() => {
    if (!stream.id || !currentUserId || isEnded) return;
    let pc = null;
    let unsubSignal = null;
    let unsubCandidates = null;
    queuedCandidatesRef.current = [];
    processedOfferTimeRef.current = 0;
    const setupViewerWebRtc = async () => {
      try {
        const rtcConfig = await getProductionRtcConfiguration();
        pc = new RTCPeerConnection(rtcConfig);
        peerConnectionRef.current = pc;
        const updatePcStats = () => {
          if (!pc) return;
          setDiagViewer((prev) => ({
            ...prev,
            connectionState: pc.connectionState,
            signalingState: pc.signalingState,
            iceGatheringState: pc.iceGatheringState,
            iceConnectionState: pc.iceConnectionState
          }));
        };
        pc.onsignalingstatechange = updatePcStats;
        pc.onicegatheringstatechange = updatePcStats;
        pc.oniceconnectionstatechange = updatePcStats;
        pc.onconnectionstatechange = () => {
          updatePcStats();
          console.log("[VIEWER_WEBRTC] Connection state:", pc?.connectionState);
          if (pc?.connectionState === "connected") {
            setIsLiveWebRtcActive(true);
            setIsConnectingLive(false);
          } else if (pc?.connectionState === "failed") {
            console.warn("[VIEWER_WEBRTC] Connection failed, attempting rejoin...");
            liveStreamService.sendViewerSignal(stream.id, currentUserId, {
              joinRequest: {
                requestedAt: Date.now(),
                userName: currentUserName
              },
              type: "join-request",
              status: "requesting"
            });
          }
        };
        pc.ontrack = (event) => {
          console.log("[VIEWER_WEBRTC] Remote track received from Broadcaster:", event.track.kind);
          const remoteStream = event.streams && event.streams[0] ? event.streams[0] : new MediaStream([event.track]);
          remoteStreamRef.current = remoteStream;
          const vTracks = remoteStream.getVideoTracks();
          const aTracks = remoteStream.getAudioTracks();
          setDiagViewer((prev) => ({
            ...prev,
            remoteTracksCount: remoteStream.getTracks().length,
            remoteVideoTrack: vTracks.length > 0 && vTracks[0].readyState === "live" ? "active" : "inactive",
            remoteAudioTrack: aTracks.length > 0 && aTracks[0].readyState === "live" ? "active" : "inactive",
            remoteMediaStreamReceived: true,
            remoteMediaStreamId: remoteStream.id,
            videoHasSrcObject: true
          }));
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
            videoRef.current.muted = isMuted;
            videoRef.current.play().then(() => {
              setIsPlaying(true);
              setDiagViewer((p) => ({ ...p, playbackStarted: true, playbackError: null }));
            }).catch((err) => {
              if (err?.name !== "AbortError") {
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  setIsMuted(true);
                  videoRef.current.play().then(() => {
                    setIsPlaying(true);
                    setDiagViewer((p) => ({ ...p, playbackStarted: true, playbackError: null }));
                  }).catch((err2) => {
                    setDiagViewer((p) => ({ ...p, playbackError: err2?.message || "Autoplay prevented" }));
                  });
                }
              }
            });
          }
          setIsLiveWebRtcActive(true);
          setIsConnectingLive(false);
        };
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            const candJson = event.candidate.toJSON();
            setDiagViewer((prev) => ({
              ...prev,
              viewerCandidatesSent: prev.viewerCandidatesSent + 1
            }));
            liveStreamService.addViewerCandidate(stream.id, currentUserId, candJson);
          }
        };
        unsubCandidates = liveStreamService.subscribeToBroadcasterCandidates(stream.id, currentUserId, async (candidate) => {
          setDiagViewer((prev) => ({
            ...prev,
            broadcasterCandidatesReceived: prev.broadcasterCandidatesReceived + 1
          }));
          if (pc && pc.remoteDescription) {
            try {
              await pc.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
            }
          } else {
            queuedCandidatesRef.current.push(candidate);
          }
        });
        unsubSignal = liveStreamService.subscribeToViewerSignalDoc(stream.id, currentUserId, async (signal) => {
          if (!pc || !signal) return;
          const offerData = signal.offer || (signal.type === "offer" && signal.sdp ? { sdp: signal.sdp, createdAt: signal.createdAt || Date.now() } : null);
          if (offerData && offerData.sdp) {
            const offerTime = offerData.createdAt || 1;
            if (offerTime > processedOfferTimeRef.current) {
              processedOfferTimeRef.current = offerTime;
              try {
                await pc.setRemoteDescription(new RTCSessionDescription({
                  type: "offer",
                  sdp: offerData.sdp
                }));
                setDiagViewer((prev) => ({
                  ...prev,
                  offerReceived: true,
                  offerReceivedAt: offerTime,
                  signalingState: pc?.signalingState || "stable"
                }));
                while (queuedCandidatesRef.current.length > 0) {
                  const cand = queuedCandidatesRef.current.shift();
                  if (cand) {
                    try {
                      await pc.addIceCandidate(new RTCIceCandidate(cand));
                    } catch (e) {
                    }
                  }
                }
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                setDiagViewer((prev) => ({
                  ...prev,
                  answerCreated: true,
                  answerCreatedAt: Date.now(),
                  signalingState: pc?.signalingState || "stable"
                }));
                await liveStreamService.sendViewerSignal(stream.id, currentUserId, {
                  answer: {
                    type: "answer",
                    sdp: answer.sdp,
                    answeredAt: Date.now()
                  },
                  type: "answer",
                  status: "answered"
                });
              } catch (e) {
                console.warn("[VIEWER_WEBRTC] Error handling offer:", e);
                setDiagViewer((prev) => ({
                  ...prev,
                  lastError: {
                    message: e?.message || "Error handling offer",
                    code: e?.name,
                    component: "LiveViewerModal.handleOffer"
                  }
                }));
              }
            }
          }
        });
        const joinTime = Date.now();
        await liveStreamService.sendViewerSignal(stream.id, currentUserId, {
          joinRequest: {
            requestedAt: joinTime,
            userName: currentUserName
          },
          type: "join-request",
          status: "requesting"
        });
        setDiagViewer((prev) => ({
          ...prev,
          joinRequestSent: true,
          joinRequestSentAt: joinTime
        }));
      } catch (err) {
        console.warn("[VIEWER_WEBRTC] WebRTC setup error:", err);
        setDiagViewer((prev) => ({
          ...prev,
          lastError: {
            message: err?.message || "WebRTC setup failed",
            code: err?.name,
            component: "LiveViewerModal.setupViewerWebRtc"
          }
        }));
        setIsConnectingLive(false);
      }
    };
    setupViewerWebRtc();
    return () => {
      if (unsubSignal) unsubSignal();
      if (unsubCandidates) unsubCandidates();
      if (pc) {
        try {
          pc.close();
        } catch {
        }
      }
      peerConnectionRef.current = null;
    };
  }, [stream.id, currentUserId, isEnded]);
  reactExports.useEffect(() => {
    if (videoRef.current && remoteStreamRef.current && videoRef.current.srcObject !== remoteStreamRef.current) {
      videoRef.current.srcObject = remoteStreamRef.current;
      videoRef.current.play().catch(() => {
      });
    }
  });
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const READY_STATES = ["HAVE_NOTHING", "HAVE_METADATA", "HAVE_CURRENT_DATA", "HAVE_FUTURE_DATA", "HAVE_ENOUGH_DATA"];
    const updateVideoDiag = () => {
      setDiagViewer((prev) => ({
        ...prev,
        videoReadyState: video.readyState,
        videoReadyStateText: READY_STATES[video.readyState] || `STATE_${video.readyState}`,
        videoHasSrcObject: !!video.srcObject,
        playbackStarted: !video.paused && video.readyState >= 2,
        playbackError: video.error ? `Code ${video.error.code}: ${video.error.message || "Media Error"}` : null
      }));
    };
    video.addEventListener("loadedmetadata", updateVideoDiag);
    video.addEventListener("loadeddata", updateVideoDiag);
    video.addEventListener("canplay", updateVideoDiag);
    video.addEventListener("playing", updateVideoDiag);
    video.addEventListener("pause", updateVideoDiag);
    video.addEventListener("error", updateVideoDiag);
    const diagInterval = setInterval(updateVideoDiag, 1e3);
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          updateVideoDiag();
        }).catch((err) => {
          if (err?.name !== "AbortError") setIsPlaying(false);
          updateVideoDiag();
        });
      }
    }, 200);
    return () => {
      clearInterval(diagInterval);
      clearTimeout(timer);
      video.removeEventListener("loadedmetadata", updateVideoDiag);
      video.removeEventListener("loadeddata", updateVideoDiag);
      video.removeEventListener("canplay", updateVideoDiag);
      video.removeEventListener("playing", updateVideoDiag);
      video.removeEventListener("pause", updateVideoDiag);
      video.removeEventListener("error", updateVideoDiag);
    };
  }, []);
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying && !videoRef.current.paused) {
      setIsMuted(!isMuted);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch((err) => {
        if (err?.name !== "AbortError") setIsPlaying(false);
      });
    }
  };
  const triggerToast = (message) => {
    setShowToast({ message, visible: true });
    setTimeout(() => setShowToast({ message: "", visible: false }), 2500);
  };
  reactExports.useEffect(() => {
    if (!stream.id || !currentUserId) return;
    liveStreamService.joinLiveStream(stream.id, currentUserId, currentUserName, currentUserAvatar);
    const unsubStream = liveStreamService.subscribeToStream(stream.id, (updated) => {
      if (updated) {
        setCurrentStream(updated);
        if (updated.status === "ended") {
          setIsEnded(true);
          setIsLiveWebRtcActive(false);
        }
      } else {
        setIsEnded(true);
      }
    });
    const unsubComments = liveStreamService.subscribeToComments(stream.id, (newComments) => {
      setComments(newComments);
      setTimeout(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
    const unsubReactions = liveStreamService.subscribeToReactions(stream.id, (reaction) => {
      triggerFloatingReaction(reaction.emoji);
    });
    return () => {
      liveStreamService.leaveLiveStream(stream.id, currentUserId);
      unsubStream();
      unsubComments();
      unsubReactions();
    };
  }, [stream.id, currentUserId]);
  const triggerFloatingReaction = (emoji) => {
    const heartId = Date.now() + Math.random();
    const randomLeft = 60 + Math.random() * 30;
    setFloatingHearts((prev) => [...prev, { id: heartId, emoji, left: randomLeft }]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId));
    }, 2e3);
  };
  const handleSendComment = async (e) => {
    if (e) e.preventDefault();
    if (!commentText.trim() || isEnded) return;
    const text = commentText.trim();
    setCommentText("");
    try {
      await liveStreamService.sendComment({
        streamId: currentStream.id,
        userId: currentUserId,
        userName: currentUserName,
        userAvatar: currentUserAvatar,
        text
      });
    } catch (err) {
      console.warn("Failed to send live comment:", err);
    }
  };
  const handleSendReaction = async (emoji) => {
    if (isEnded) return;
    triggerFloatingReaction(emoji);
    try {
      await liveStreamService.sendReaction({
        streamId: currentStream.id,
        userId: currentUserId,
        emoji
      });
    } catch (err) {
      console.warn("Failed to send reaction:", err);
    }
  };
  const handleToggleFollow = () => {
    const newFollow = reelsInteractionService.toggleFollow(currentStream.creatorId, currentUserId, isFollowed);
    setIsFollowed(newFollow);
    triggerToast(newFollow ? "تمت متابعة الحساب" : "تم إلغاء المتابعة");
  };
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentStream.title,
          text: `شاهد البث المباشر لـ ${currentStream.creatorName} على Vidéo IMI!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        triggerToast("تم نسخ رابط البث");
      }
    } catch (err) {
    }
  };
  const videoSource = !isLiveWebRtcActive && currentStream.recordingUrl ? currentStream.recordingUrl : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden dir-rtl select-none animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md h-full bg-slate-950 flex flex-col overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black flex items-center justify-center overflow-hidden z-0", onClick: togglePlay, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          ref: videoRef,
          autoPlay: true,
          loop: !isLiveWebRtcActive,
          muted: isMuted,
          playsInline: true,
          src: videoSource,
          className: "absolute inset-0 w-full h-full object-contain bg-black z-0 cursor-pointer opacity-100",
          onPlay: () => setIsPlaying(true),
          onPause: () => setIsPlaying(false),
          onError: () => {
            console.warn("Video playback notice");
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-14 left-3 right-3 z-40 max-w-sm mx-auto font-mono text-[11px] dir-ltr pointer-events-auto", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 px-3 py-1.5 flex items-center justify-between border-b border-emerald-500/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-emerald-400 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
            "LIVE DIAGNOSTICS (Viewer)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowDiagnostics(!showDiagnostics),
              className: "text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-emerald-300 transition cursor-pointer",
              children: showDiagnostics ? "Hide ▲" : "Show ▼"
            }
          )
        ] }),
        showDiagnostics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1.5 max-h-60 overflow-y-auto text-[10.5px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-2 gap-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Join request: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.joinRequestSent ? "text-emerald-400 font-bold" : "text-slate-500", children: diagViewer.joinRequestSent ? `YES (${new Date(diagViewer.joinRequestSentAt || 0).toLocaleTimeString()})` : "NO" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Offer received: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.offerReceived ? "text-emerald-400 font-bold" : "text-amber-400 font-bold", children: diagViewer.offerReceived ? `YES (${new Date(diagViewer.offerReceivedAt || 0).toLocaleTimeString()})` : "WAITING..." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Answer created: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.answerCreated ? "text-emerald-400 font-bold" : "text-slate-500", children: diagViewer.answerCreated ? `YES (${new Date(diagViewer.answerCreatedAt || 0).toLocaleTimeString()})` : "NO" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Signaling state: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sky-300", children: diagViewer.signalingState })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Connection state: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.connectionState === "connected" ? "text-emerald-400 font-bold" : "text-amber-300", children: diagViewer.connectionState })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "ICE connection: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.iceConnectionState === "connected" ? "text-emerald-400 font-bold" : "text-slate-300", children: diagViewer.iceConnectionState })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Remote tracks: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: diagViewer.remoteTracksCount })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Remote Stream: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.remoteMediaStreamReceived ? "text-emerald-400 font-bold" : "text-slate-500", children: diagViewer.remoteMediaStreamReceived ? "RECEIVED" : "NO" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Remote video: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.remoteVideoTrack === "active" ? "text-emerald-400 font-bold" : "text-slate-400", children: diagViewer.remoteVideoTrack })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Remote audio: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.remoteAudioTrack === "active" ? "text-emerald-400 font-bold" : "text-slate-400", children: diagViewer.remoteAudioTrack })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "video.readyState: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: diagViewer.videoReadyState >= 2 ? "text-emerald-400 font-bold" : "text-amber-300", children: [
                diagViewer.videoReadyState,
                " (",
                diagViewer.videoReadyStateText,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "srcObject set: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.videoHasSrcObject ? "text-emerald-400 font-bold" : "text-slate-500", children: diagViewer.videoHasSrcObject ? "YES" : "NO" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Playback started: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.playbackStarted ? "text-emerald-400 font-bold" : "text-amber-300 font-bold", children: diagViewer.playbackStarted ? "YES" : "NO" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Playback error: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagViewer.playbackError ? "text-rose-400 font-bold" : "text-emerald-400", children: diagViewer.playbackError || "None" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "ICE exchanged: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sky-300 font-bold", children: [
                "Sent: ",
                diagViewer.viewerCandidatesSent,
                " | Received: ",
                diagViewer.broadcasterCandidatesReceived
              ] })
            ] })
          ] }),
          diagViewer.lastError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-2 rounded-lg bg-rose-950/70 border border-rose-600/40 text-[10px] text-rose-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-rose-400", children: [
              "Error in: ",
              diagViewer.lastError.component
            ] }),
            diagViewer.lastError.code && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Code: ",
              diagViewer.lastError.code
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Message: ",
              diagViewer.lastError.message
            ] })
          ] })
        ] })
      ] }) }),
      !isLiveWebRtcActive && !videoSource && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-slate-950 z-1 p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 p-1 mb-4 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden", children: currentStream.creatorAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: currentStream.creatorAvatar,
            alt: currentStream.creatorName,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-black text-white", children: currentStream.creatorName ? currentStream.creatorName.charAt(0).toUpperCase() : "U" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-white mb-1", children: currentStream.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/60", children: [
          "@",
          currentStream.creatorName
        ] })
      ] }),
      isConnectingLive && !isLiveWebRtcActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs z-15 pointer-events-none text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-10 h-10 text-rose-500 animate-spin mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-white/90", children: "جاري الاتصال بالبث المباشر..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none" }),
      !isPlaying && !isConnectingLive && videoSource && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            togglePlay();
          },
          className: "w-24 h-24 rounded-full bg-rose-600/90 hover:bg-rose-500 backdrop-blur-md flex items-center justify-center border-4 border-white/30 shadow-[0_0_50px_rgba(225,29,72,0.6)] animate-pulse cursor-pointer transform hover:scale-110 transition-all",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-12 h-12 text-white fill-white ml-2" })
        }
      ) }),
      isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 right-4 z-20 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-lg pointer-events-none transition-opacity", children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-5 h-5 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-5 h-5 text-white" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none z-30 overflow-hidden", children: floatingHearts.map((heart) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: { left: `${heart.left}%` },
        className: "absolute bottom-20 text-3xl animate-float-up",
        children: heart.emoji
      },
      heart.id
    )) }),
    showToast.visible && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20 shadow-xl animate-fade-in", children: showToast.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex items-center justify-between p-3.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full overflow-hidden border border-rose-500 bg-slate-800 flex items-center justify-center shrink-0", children: currentStream.creatorAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: currentStream.creatorAvatar,
            alt: currentStream.creatorName,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-bold", children: currentStream.creatorName ? currentStream.creatorName.charAt(0).toUpperCase() : "U" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0 max-w-[90px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white truncate", children: currentStream.creatorName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-white/60 truncate", children: [
            currentStream.viewerCount || 1,
            " مشاهد"
          ] })
        ] }),
        currentStream.creatorId !== currentUserId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleToggleFollow,
            className: `px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer flex items-center gap-0.5 ${isFollowed ? "bg-white/20 text-white" : "bg-rose-600 hover:bg-rose-500 text-white shadow-xs"}`,
            children: [
              isFollowed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-2.5 h-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-2.5 h-2.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isFollowed ? "متابع" : "متابعة" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        isEnded ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-slate-600/80 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مسجل" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3.5 h-3.5 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مباشر" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    isEnded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-slate-800 border-2 border-white/20 p-0.5 mb-4 shadow-xl flex items-center justify-center overflow-hidden", children: currentStream.creatorAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: currentStream.creatorAvatar,
          alt: currentStream.creatorName,
          className: "w-full h-full rounded-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black text-white", children: currentStream.creatorName ? currentStream.creatorName.charAt(0).toUpperCase() : "U" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-white mb-1", children: "انتهى البث المباشر" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/60 mb-6", children: [
        "بث بواسطة @",
        currentStream.creatorName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 w-full max-w-xs mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/50 block mb-1", children: "المشاهدات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black text-white", children: currentStream.totalViews || currentStream.viewerCount || 1 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/50 block mb-1", children: "الإعجابات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black text-rose-400", children: currentStream.likesCount || 0 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "px-8 py-3 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-black shadow-xl shadow-rose-600/30 transition transform active:scale-95 cursor-pointer",
          children: "العودة للرئيسية"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 mt-auto p-3 flex flex-col space-y-2 bg-gradient-to-t from-black/95 via-black/70 to-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto no-scrollbar space-y-1.5 max-h-48 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/50 backdrop-blur-md p-2 rounded-xl border border-white/10 max-w-[85%] text-[11px] text-white/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-rose-400 block", children: "💬 مرحباً بك في البث المباشر:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "احرص على أن تكون التعليقات محترمة وإيجابية مع الجميع." })
        ] }),
        comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 max-w-[85%] text-xs text-white animate-fade-in",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sky-400 text-[11px] block mb-0.5", children: c.userName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 break-words", children: c.text })
            ]
          },
          c.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: commentsEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 justify-end py-1", children: ["❤️", "🔥", "👏", "🎉", "💯"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => handleSendReaction(emoji),
          className: "w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-sm transition transform active:scale-125 cursor-pointer shadow-md",
          children: emoji
        },
        emoji
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendComment, className: "flex-1 flex items-center relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: commentText,
              onChange: (e) => setCommentText(e.target.value),
              placeholder: "أضف تعليقاً حياً...",
              disabled: isEnded,
              className: "w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-rose-500 disabled:opacity-50"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: !commentText.trim() || isEnded,
              className: "absolute left-1.5 p-1.5 rounded-full bg-rose-600 text-white disabled:opacity-40 transition cursor-pointer",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleShare,
            className: "p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition cursor-pointer",
            title: "مشاركة البث",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" })
          }
        )
      ] })
    ] })
  ] }) });
}

function LiveBroadcasterModal({
  isOpen,
  onClose,
  creatorId,
  creatorName,
  creatorPhone,
  creatorAvatar,
  onBroadcastStarted
}) {
  const [streamTitle, setStreamTitle] = reactExports.useState("بث مباشر تفاعلي");
  const [selectedTag, setSelectedTag] = reactExports.useState("عام");
  const [isBroadcasting, setIsBroadcasting] = reactExports.useState(false);
  const [isStartingLive, setIsStartingLive] = reactExports.useState(false);
  const [streamId, setStreamId] = reactExports.useState(null);
  const [viewerCount, setViewerCount] = reactExports.useState(1);
  const [likesCount, setLikesCount] = reactExports.useState(0);
  const [broadcastDuration, setBroadcastDuration] = reactExports.useState(0);
  const [isEnded, setIsEnded] = reactExports.useState(false);
  const [endStats, setEndStats] = reactExports.useState(null);
  const [isMicMuted, setIsMicMuted] = reactExports.useState(false);
  const [isVideoOff, setIsVideoOff] = reactExports.useState(false);
  const [facingMode, setFacingMode] = reactExports.useState("user");
  const [errorText, setErrorText] = reactExports.useState(null);
  const [comments, setComments] = reactExports.useState([]);
  const [myCommentText, setMyCommentText] = reactExports.useState("");
  const [floatingHearts, setFloatingHearts] = reactExports.useState([]);
  const videoRef = reactExports.useRef(null);
  const mediaStreamRef = reactExports.useRef(null);
  const durationTimerRef = reactExports.useRef(null);
  const commentsEndRef = reactExports.useRef(null);
  const streamIdRef = reactExports.useRef(null);
  const peerConnectionsRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const processedJoinRequestsRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const processedAnswersRef = reactExports.useRef(/* @__PURE__ */ new Map());
  reactExports.useEffect(() => {
    streamIdRef.current = streamId;
  }, [streamId]);
  const [showDiagnostics, setShowDiagnostics] = reactExports.useState(true);
  const [diagHost, setDiagHost] = reactExports.useState({
    getUserMedia: "PENDING",
    getUserMediaError: null,
    cameraTrack: "none",
    micTrack: "none",
    localTracksCount: 0,
    peerConnectionsCount: 0,
    latestViewerId: null,
    signalingState: "stable",
    iceGatheringState: "new",
    iceConnectionState: "new",
    connectionState: "new",
    stunCandidateCount: 0,
    turnCandidateCount: 0,
    firestoreSignalingStatus: "IDLE",
    offerCreated: false,
    offerCreatedAt: null,
    answerReceived: false,
    answerReceivedAt: null,
    broadcasterCandidatesSent: 0,
    viewerCandidatesReceived: 0,
    lastError: null
  });
  reactExports.useEffect(() => {
    const handleBeforeUnload = () => {
      if (streamIdRef.current) {
        liveStreamService.endLiveStream(streamIdRef.current).catch(() => {
        });
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (streamIdRef.current) {
        liveStreamService.endLiveStream(streamIdRef.current).catch(() => {
        });
      }
      peerConnectionsRef.current.forEach((pc) => {
        try {
          pc.close();
        } catch {
        }
      });
      peerConnectionsRef.current.clear();
    };
  }, []);
  const startCamera = async (currentFacing) => {
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: currentFacing,
            width: { ideal: 1080 },
            height: { ideal: 1920 },
            frameRate: { ideal: 30, max: 60 }
          },
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, sampleRate: 48e3, channelCount: 2 }
        });
      } catch (e1) {
        console.warn("Level 1 camera constraints failed, trying Level 2:", e1);
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: currentFacing },
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, sampleRate: 48e3, channelCount: 2 }
          });
        } catch (e2) {
          console.warn("Level 2 camera constraints failed, trying Level 3:", e2);
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, sampleRate: 48e3, channelCount: 2 }
            });
          } catch (e3) {
            console.warn("Level 3 camera constraints failed, trying video only:", e3);
            stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false
            });
          }
        }
      }
      if (stream) {
        mediaStreamRef.current = stream;
        setErrorText(null);
        const vTracks = stream.getVideoTracks();
        const aTracks = stream.getAudioTracks();
        setDiagHost((prev) => ({
          ...prev,
          getUserMedia: "SUCCESS",
          getUserMediaError: null,
          cameraTrack: vTracks.length > 0 && vTracks[0].readyState === "live" ? "active" : "inactive",
          micTrack: aTracks.length > 0 && aTracks[0].readyState === "live" ? "active" : "inactive",
          localTracksCount: stream.getTracks().length
        }));
        const bindStreamToVideo = () => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.muted = true;
            videoRef.current.setAttribute("playsinline", "true");
            videoRef.current.play().catch((e) => {
              if (e?.name !== "AbortError") console.warn("Video play notice:", e);
            });
          }
        };
        bindStreamToVideo();
        setTimeout(bindStreamToVideo, 100);
        setTimeout(bindStreamToVideo, 300);
      }
    } catch (err) {
      console.warn("Camera access error:", err);
      const errMsg = err?.message || "Permission denied or no device";
      setDiagHost((prev) => ({
        ...prev,
        getUserMedia: "FAILED",
        getUserMediaError: errMsg,
        cameraTrack: "none",
        micTrack: "none",
        localTracksCount: 0,
        lastError: {
          message: errMsg,
          code: err?.name,
          component: "LiveBroadcasterModal.startCamera"
        }
      }));
      setErrorText("يرجى السماح بالوصول للكاميرا والميكروفون لبدء البث المباشر");
    }
  };
  reactExports.useEffect(() => {
    if (isOpen && !isEnded) {
      startCamera(facingMode);
    }
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current);
      }
    };
  }, [isOpen, isEnded]);
  reactExports.useEffect(() => {
    let pingInterval = null;
    if (isBroadcasting) {
      durationTimerRef.current = setInterval(() => {
        setBroadcastDuration((prev) => prev + 1);
      }, 1e3);
      if (streamId) {
        liveStreamService.pingStream(streamId);
        pingInterval = setInterval(() => {
          liveStreamService.pingStream(streamId);
        }, 8e3);
      }
    } else {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    }
    return () => {
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
      if (pingInterval) clearInterval(pingInterval);
    };
  }, [isBroadcasting, streamId]);
  reactExports.useEffect(() => {
    if (!isBroadcasting || !streamId) return;
    const queuedViewerCandidates = /* @__PURE__ */ new Map();
    const unsubViewerCandMap = /* @__PURE__ */ new Map();
    setDiagHost((prev) => ({
      ...prev,
      firestoreSignalingStatus: "LISTENING"
    }));
    const handleViewerSignal = async (viewerId, signalData) => {
      if (!mediaStreamRef.current || !signalData) return;
      const answerData = signalData.answer || (signalData.type === "answer" && signalData.sdp ? { sdp: signalData.sdp, answeredAt: signalData.answeredAt || Date.now() } : null);
      if (answerData && answerData.sdp) {
        const answerTime = answerData.answeredAt || Date.now();
        const lastAnswer = processedAnswersRef.current.get(viewerId) || 0;
        if (answerTime > lastAnswer) {
          processedAnswersRef.current.set(viewerId, answerTime);
          const pc = peerConnectionsRef.current.get(viewerId);
          if (pc && (pc.signalingState === "have-local-offer" || pc.signalingState === "have-remote-offer")) {
            try {
              await pc.setRemoteDescription(new RTCSessionDescription({
                type: "answer",
                sdp: answerData.sdp
              }));
              setDiagHost((prev) => ({
                ...prev,
                answerReceived: true,
                answerReceivedAt: Date.now(),
                signalingState: pc.signalingState,
                connectionState: pc.connectionState
              }));
              const queued = queuedViewerCandidates.get(viewerId) || [];
              while (queued.length > 0) {
                const cand = queued.shift();
                if (cand) {
                  try {
                    await pc.addIceCandidate(new RTCIceCandidate(cand));
                  } catch (e) {
                  }
                }
              }
            } catch (err) {
              console.warn(`[BROADCASTER_WEBRTC] Failed to set remote answer for viewer ${viewerId}:`, err);
              setDiagHost((prev) => ({
                ...prev,
                lastError: {
                  message: err?.message || "Failed to set remote answer",
                  code: err?.name,
                  component: "LiveBroadcasterModal.setRemoteDescription"
                }
              }));
            }
          }
          return;
        }
      }
      const joinAt = signalData.joinRequest?.requestedAt || (signalData.type === "join-request" ? signalData.requestedAt || signalData.createdAt || 1 : 0);
      if (joinAt > 0 && !answerData && viewerId !== creatorId) {
        if (Date.now() - joinAt > 12e4) {
          return;
        }
        const lastJoin = processedJoinRequestsRef.current.get(viewerId) || 0;
        if (joinAt > lastJoin) {
          processedJoinRequestsRef.current.set(viewerId, joinAt);
          try {
            if (peerConnectionsRef.current.has(viewerId)) {
              try {
                peerConnectionsRef.current.get(viewerId)?.close();
              } catch {
              }
              peerConnectionsRef.current.delete(viewerId);
            }
            if (unsubViewerCandMap.has(viewerId)) {
              unsubViewerCandMap.get(viewerId)?.();
              unsubViewerCandMap.delete(viewerId);
            }
            queuedViewerCandidates.set(viewerId, []);
            const rtcConfig = await getProductionRtcConfiguration();
            const pc = new RTCPeerConnection(rtcConfig);
            peerConnectionsRef.current.set(viewerId, pc);
            const updatePcStats = () => {
              setDiagHost((prev) => ({
                ...prev,
                peerConnectionsCount: peerConnectionsRef.current.size,
                latestViewerId: viewerId,
                signalingState: pc.signalingState,
                iceGatheringState: pc.iceGatheringState,
                iceConnectionState: pc.iceConnectionState,
                connectionState: pc.connectionState
              }));
            };
            pc.onsignalingstatechange = updatePcStats;
            pc.onicegatheringstatechange = updatePcStats;
            pc.oniceconnectionstatechange = updatePcStats;
            pc.onconnectionstatechange = updatePcStats;
            mediaStreamRef.current.getTracks().forEach((track) => {
              const sender = pc.addTrack(track, mediaStreamRef.current);
              try {
                const params = sender.getParameters();
                if (!params.encodings) {
                  params.encodings = [{}];
                }
                if (track.kind === "video") {
                  params.encodings[0].maxBitrate = 35e5;
                } else if (track.kind === "audio") {
                  params.encodings[0].maxBitrate = 128e3;
                }
                sender.setParameters(params).catch(() => {
                });
              } catch (e) {
              }
            });
            pc.onicecandidate = (event) => {
              if (event.candidate) {
                const candJson = event.candidate.toJSON();
                const candStr = event.candidate.candidate || "";
                const isStun = candStr.includes("srflx") || candStr.includes("host");
                const isTurn = candStr.includes("relay");
                setDiagHost((prev) => ({
                  ...prev,
                  stunCandidateCount: isStun ? prev.stunCandidateCount + 1 : prev.stunCandidateCount,
                  turnCandidateCount: isTurn ? prev.turnCandidateCount + 1 : prev.turnCandidateCount,
                  broadcasterCandidatesSent: prev.broadcasterCandidatesSent + 1
                }));
                liveStreamService.addBroadcasterCandidate(streamId, viewerId, candJson);
              }
            };
            const unsubV = liveStreamService.subscribeToViewerCandidates(streamId, viewerId, async (candidate) => {
              setDiagHost((prev) => ({
                ...prev,
                viewerCandidatesReceived: prev.viewerCandidatesReceived + 1
              }));
              if (pc.remoteDescription) {
                try {
                  await pc.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (e) {
                }
              } else {
                queuedViewerCandidates.get(viewerId)?.push(candidate);
              }
            });
            unsubViewerCandMap.set(viewerId, unsubV);
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            setDiagHost((prev) => ({
              ...prev,
              offerCreated: true,
              offerCreatedAt: Date.now(),
              signalingState: pc.signalingState
            }));
            await liveStreamService.sendBroadcasterSignal(streamId, viewerId, {
              offer: {
                type: "offer",
                sdp: offer.sdp,
                createdAt: Date.now()
              },
              status: "offered"
            });
          } catch (err) {
            console.warn(`[BROADCASTER_WEBRTC] Failed to create offer for viewer ${viewerId}:`, err);
            setDiagHost((prev) => ({
              ...prev,
              lastError: {
                message: err?.message || "Failed to create offer",
                code: err?.name,
                component: "LiveBroadcasterModal.createOffer"
              }
            }));
          }
        }
      }
      if (signalData.viewerCandidate) {
        const pc = peerConnectionsRef.current.get(viewerId);
        if (pc && pc.remoteDescription) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(signalData.viewerCandidate));
          } catch (err) {
          }
        } else if (pc) {
          queuedViewerCandidates.get(viewerId)?.push(signalData.viewerCandidate);
        }
      }
    };
    const unsubSignals = liveStreamService.subscribeToAllSignals(streamId, handleViewerSignal);
    const unsubStream = liveStreamService.subscribeToStream(streamId, (streamData) => {
      if (streamData) {
        setViewerCount(streamData.viewerCount || 1);
        setLikesCount(streamData.likesCount || 0);
      }
    });
    const unsubComments = liveStreamService.subscribeToComments(streamId, (newComments) => {
      setComments(newComments);
      setTimeout(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
    const unsubReactions = liveStreamService.subscribeToReactions(streamId, (reaction) => {
      triggerFloatingReaction(reaction.emoji);
    });
    return () => {
      unsubViewerCandMap.forEach((u) => u());
      unsubViewerCandMap.clear();
      unsubSignals();
      unsubStream();
      unsubComments();
      unsubReactions();
    };
  }, [isBroadcasting, streamId]);
  const triggerFloatingReaction = (emoji) => {
    const heartId = Date.now() + Math.random();
    const randomLeft = 60 + Math.random() * 30;
    setFloatingHearts((prev) => [...prev, { id: heartId, emoji, left: randomLeft }]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId));
    }, 2e3);
  };
  const handleToggleMic = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicMuted(!audioTrack.enabled);
      }
    }
  };
  const handleToggleVideo = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };
  const handleFlipCamera = () => {
    const nextFacing = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextFacing);
    startCamera(nextFacing);
  };
  const handleStartBroadcast = async () => {
    const finalTitle = streamTitle.trim() || "بث مباشر جديد";
    try {
      setIsStartingLive(true);
      setErrorText(null);
      if (!mediaStreamRef.current) {
        await startCamera(facingMode);
      }
      const newStreamId = await liveStreamService.createLiveStream({
        creatorId: creatorId || "anon_creator",
        creatorName: creatorName || "مذيع",
        creatorPhone: creatorPhone || "",
        creatorAvatar: creatorAvatar || "",
        title: finalTitle,
        tags: [selectedTag, "LIVEIMI"]
      });
      setStreamId(newStreamId);
      setIsBroadcasting(true);
      if (onBroadcastStarted) onBroadcastStarted(newStreamId);
    } catch (err) {
      console.error("Failed to start live stream:", err);
      setErrorText("فشل بدء البث المباشر: " + (err?.message || "يرجى التحقق من الاتصال"));
    } finally {
      setIsStartingLive(false);
    }
  };
  const handleEndBroadcast = async () => {
    if (streamId) {
      await liveStreamService.endLiveStream(streamId, {
        duration: broadcastDuration,
        totalViews: Math.max(viewerCount, 1),
        likesCount
      });
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    setEndStats({
      duration: broadcastDuration,
      viewers: viewerCount,
      likes: likesCount
    });
    setIsBroadcasting(false);
    setIsEnded(true);
  };
  const handleDeleteBroadcast = async () => {
    if (streamId) {
      await liveStreamService.deleteLiveStream(streamId);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    onClose();
  };
  const handleSendComment = async (e) => {
    if (e) e.preventDefault();
    if (!myCommentText.trim() || !streamId) return;
    const textToSend = myCommentText.trim();
    setMyCommentText("");
    try {
      await liveStreamService.sendComment({
        streamId,
        userId: creatorId,
        userName: `${creatorName} (المضيف)`,
        userAvatar: creatorAvatar,
        text: textToSend
      });
    } catch (err) {
      console.warn("Failed to send comment:", err);
    }
  };
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden dir-rtl select-none animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md h-full bg-black flex flex-col overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        ref: videoRef,
        autoPlay: true,
        playsInline: true,
        muted: true,
        className: `absolute inset-0 w-full h-full object-contain z-0 ${facingMode === "user" ? "scale-x-[-1]" : ""}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-14 left-3 right-3 z-40 max-w-sm mx-auto font-mono text-[11px] dir-ltr pointer-events-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/90 backdrop-blur-md border border-sky-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 px-3 py-1.5 flex items-center justify-between border-b border-sky-500/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sky-400 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-sky-400 animate-pulse" }),
          "LIVE DIAGNOSTICS (Host)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowDiagnostics(!showDiagnostics),
            className: "text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-sky-300 transition cursor-pointer",
            children: showDiagnostics ? "Hide ▲" : "Show ▼"
          }
        )
      ] }),
      showDiagnostics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1.5 max-h-60 overflow-y-auto text-[10.5px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-2 gap-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "getUserMedia: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagHost.getUserMedia === "SUCCESS" ? "text-emerald-400 font-bold" : diagHost.getUserMedia === "FAILED" ? "text-rose-400 font-bold" : "text-amber-400 font-bold", children: diagHost.getUserMedia })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Camera track: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagHost.cameraTrack === "active" ? "text-emerald-400 font-bold" : "text-slate-400", children: diagHost.cameraTrack })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Mic track: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagHost.micTrack === "active" ? "text-emerald-400 font-bold" : "text-slate-400", children: diagHost.micTrack })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Local tracks: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: diagHost.localTracksCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Signaling state: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sky-300", children: diagHost.signalingState })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Connection state: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagHost.connectionState === "connected" ? "text-emerald-400 font-bold" : "text-amber-300", children: diagHost.connectionState })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "ICE gathering: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-200", children: diagHost.iceGatheringState })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "ICE connection: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagHost.iceConnectionState === "connected" ? "text-emerald-400 font-bold" : "text-slate-300", children: diagHost.iceConnectionState })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "STUN candidates: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: diagHost.stunCandidateCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "TURN candidates: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: diagHost.turnCandidateCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Signaling status: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-300", children: diagHost.firestoreSignalingStatus })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Active viewers (PCs): " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: diagHost.peerConnectionsCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Offer created: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagHost.offerCreated ? "text-emerald-400 font-bold" : "text-slate-500", children: diagHost.offerCreated ? `YES (${new Date(diagHost.offerCreatedAt || 0).toLocaleTimeString()})` : "NO" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Answer received: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: diagHost.answerReceived ? "text-emerald-400 font-bold" : "text-slate-500", children: diagHost.answerReceived ? `YES (${new Date(diagHost.answerReceivedAt || 0).toLocaleTimeString()})` : "NO" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "ICE exchanged: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sky-300 font-bold", children: [
              "Sent: ",
              diagHost.broadcasterCandidatesSent,
              " | Received: ",
              diagHost.viewerCandidatesReceived
            ] })
          ] })
        ] }),
        diagHost.lastError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-2 rounded-lg bg-rose-950/70 border border-rose-600/40 text-[10px] text-rose-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-rose-400", children: [
            "Error in: ",
            diagHost.lastError.component
          ] }),
          diagHost.lastError.code && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "Code: ",
            diagHost.lastError.code
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "Message: ",
            diagHost.lastError.message
          ] })
        ] })
      ] })
    ] }) }),
    isVideoOff && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center text-white z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "w-16 h-16 text-white/40 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white/70", children: "الكاميرا متوقفة مؤقتاً" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none z-30 overflow-hidden", children: floatingHearts.map((heart) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: { left: `${heart.left}%` },
        className: "absolute bottom-20 text-3xl animate-float-up",
        children: heart.emoji
      },
      heart.id
    )) }),
    !isBroadcasting && !isEnded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex flex-col justify-between h-full p-4 bg-gradient-to-b from-black/80 via-black/40 to-black/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-4 h-4 text-rose-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-white", children: "إعداد البث المباشر" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-sm mx-auto w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-white/80", children: "عنوان البث المباشر:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: streamTitle,
              onChange: (e) => setStreamTitle(e.target.value),
              placeholder: "مثال: دردشة مسائية مع الأصدقاء...",
              className: "w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-white placeholder-white/50 text-sm focus:outline-none focus:border-rose-500 transition",
              maxLength: 100
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: ["عام", "دردشة", "موسيقى", "ألعاب", "سؤال وجواب"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedTag(tag),
              className: `px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${selectedTag === tag ? "bg-rose-600 text-white shadow-md" : "bg-white/10 text-white/70 hover:bg-white/20"}`,
              children: [
                "#",
                tag
              ]
            },
            tag
          )) })
        ] }),
        errorText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-rose-600/90 text-white rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-4 h-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: errorText })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleFlipCamera,
              className: "p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition cursor-pointer shadow-md",
              title: "قلب الكاميرا",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SwitchCamera, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleToggleMic,
              className: `p-3 rounded-full backdrop-blur-md border border-white/20 transition cursor-pointer shadow-md ${isMicMuted ? "bg-rose-600 text-white" : "bg-black/60 text-white"}`,
              title: "كتم الميكروفون",
              children: isMicMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleToggleVideo,
              className: `p-3 rounded-full backdrop-blur-md border border-white/20 transition cursor-pointer shadow-md ${isVideoOff ? "bg-rose-600 text-white" : "bg-black/60 text-white"}`,
              title: "تشغيل/إيقاف الكاميرا",
              children: isVideoOff ? /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleStartBroadcast,
            disabled: isStartingLive,
            className: `w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 hover:from-rose-500 hover:to-red-400 text-white font-black text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 transition transform active:scale-95 border border-white/20 ${isStartingLive ? "opacity-70 cursor-wait" : "cursor-pointer"}`,
            children: isStartingLive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "جاري تشغيل البث..." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ابدأ البث المباشر الآن" })
            ] })
          }
        )
      ] })
    ] }),
    isBroadcasting && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex flex-col justify-between h-full p-3 bg-gradient-to-b from-black/70 via-transparent to-black/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-white/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3.5 h-3.5 text-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "مباشر" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 font-mono text-[11px] mr-1", children: formatDuration(broadcastDuration) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-rose-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: viewerCount })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleEndBroadcast,
            className: "px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-lg transition transform active:scale-95 cursor-pointer border border-white/20",
            children: "إنهاء البث"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-end max-h-[45%] space-y-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto no-scrollbar space-y-2 max-h-48 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/50 backdrop-blur-md p-2 rounded-xl border border-white/10 max-w-[85%] text-[11px] text-white/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-rose-400 block", children: "💡 تلميح البث المباشر:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "أنت تبث الآن لجميع متابعي Vidéo IMI. سيظهر تعليقات وتفاعلات المتابعين هنا!" })
          ] }),
          comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 max-w-[85%] text-xs text-white animate-fade-in",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sky-400 text-[11px]", children: [
                  c.userName,
                  ":"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 break-words", children: c.text })
              ]
            },
            c.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: commentsEndRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendComment, className: "flex-1 flex items-center relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: myCommentText,
                onChange: (e) => setMyCommentText(e.target.value),
                placeholder: "كتابة رسالة للمشاهدين...",
                className: "w-full bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-rose-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: !myCommentText.trim(),
                className: "absolute left-1.5 p-1.5 rounded-full bg-rose-600 text-white disabled:opacity-40 transition cursor-pointer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleFlipCamera,
              className: "p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 cursor-pointer shadow-md",
              title: "قلب الكاميرا",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SwitchCamera, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleToggleMic,
              className: `p-2.5 rounded-full backdrop-blur-md border border-white/20 cursor-pointer shadow-md ${isMicMuted ? "bg-rose-600 text-white" : "bg-black/60 text-white"}`,
              title: "كتم الصوت",
              children: isMicMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] }),
    isEnded && endStats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex flex-col items-center justify-center h-full p-6 bg-slate-950 text-white text-center animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-4 shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black text-white mb-1", children: "تم إنهاء البث المباشر" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60 mb-6", children: "تم حفظ وتسجيل البث بنجاح في قسم LIVEIMI! إليك ملخص البث:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 w-full max-w-xs mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 border border-white/10 p-3 rounded-2xl flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50 mb-1", children: "المدة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-white font-mono", children: formatDuration(endStats.duration) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 border border-white/10 p-3 rounded-2xl flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50 mb-1", children: "المشاهدين" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-rose-400 font-mono", children: endStats.viewers })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900/90 border border-white/10 p-3 rounded-2xl flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50 mb-1", children: "التفاعلات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black text-amber-400 font-mono", children: endStats.likes })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5 w-full max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 text-white text-xs font-black shadow-lg transition transform active:scale-95 cursor-pointer border border-white/20",
            children: "حفظ في أرشيف البث المباشر"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleDeleteBroadcast,
            className: "w-full py-2.5 rounded-2xl bg-white/10 hover:bg-rose-500/20 text-white/80 hover:text-rose-400 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-white/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-rose-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "حذف هذا البث نهائياً" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}

function LivePage({
  userId,
  userName,
  userPhone,
  userAvatar,
  onBack
}) {
  const navigate = useNavigate();
  const [liveStreams, setLiveStreams] = reactExports.useState([]);
  const [isGoLiveOpen, setIsGoLiveOpen] = reactExports.useState(false);
  const [selectedLiveStream, setSelectedLiveStream] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsLoading(true);
    const unsub = liveStreamService.subscribeToAllLiveStreams((streams) => {
      setLiveStreams(streams);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/");
    }
  };
  const handleNavigateToReels = () => {
    navigate("/reels");
  };
  const handleRefresh = reactExports.useCallback(() => {
    setIsLoading(true);
    const unsub = liveStreamService.subscribeToAllLiveStreams((streams) => {
      setLiveStreams(streams);
      setIsLoading(false);
    });
    setTimeout(() => unsub(), 2e3);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 bg-slate-950 flex items-center justify-center overflow-hidden select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md h-full bg-black flex flex-col shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 z-30 px-3 py-2.5 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-auto border-b border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleBack,
          className: "p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition cursor-pointer shrink-0",
          title: "العودة للمحادثات",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600/20 border border-rose-500/40 text-white shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3.5 h-3.5 text-rose-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black tracking-wide", children: "LIVEIMI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setIsGoLiveOpen(true),
          className: "p-2 px-2.5 rounded-full bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white text-xs font-bold shadow-lg flex items-center gap-1 transition transform active:scale-95 cursor-pointer shrink-0 border border-rose-400/30",
          title: "بدء بث مباشر",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px]", children: "ابدأ بث" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full h-full relative flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveSection,
      {
        liveStreams,
        currentUserId: userId,
        currentUserName: userName,
        onSelectStream: (stream) => setSelectedLiveStream(stream),
        onOpenGoLive: () => setIsGoLiveOpen(true),
        onRefresh: handleRefresh,
        isLoading,
        onNavigateToReels: handleNavigateToReels
      }
    ) }),
    isGoLiveOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveBroadcasterModal,
      {
        isOpen: isGoLiveOpen,
        onClose: () => setIsGoLiveOpen(false),
        creatorId: userId,
        creatorName: userName || userId,
        creatorPhone: userPhone,
        creatorAvatar: userAvatar,
        onBroadcastStarted: (streamId) => {
          console.log("Broadcast started successfully:", streamId);
        }
      }
    ),
    selectedLiveStream && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveViewerModal,
      {
        stream: selectedLiveStream,
        currentUserId: userId,
        currentUserName: userName || userId,
        currentUserAvatar: userAvatar,
        onClose: () => setSelectedLiveStream(null)
      }
    )
  ] }) });
}

export { LivePage as default };
