import { r as reactExports, j as jsxRuntimeExports, av as Play, aw as Pause, R as RefreshCw, X, M as MessageCircle, aH as Heart, Y as Send, J as VolumeX, K as Volume2, C as Check, E as Plus, ad as Bookmark, c as Share2, a3 as Loader2, D as Download, T as Trash2, aI as Music, d as CheckCircle, _ as Film, aJ as ChevronUp, i as ChevronDown, f as Sparkles, aK as ExternalLink, q as CheckCircle2, aL as Upload, a7 as useNavigate, z as React, k as ArrowRight, s as AlertCircle } from './vendor-react-DAzNXBh_.js';
import { x as query, n as collection, C as orderBy, y as limit, z as where, H as startAfter, o as getDocs, h as doc, f as getDoc, j as setDoc, m as updateDoc, I as increment, k as deleteDoc, r as ref, u as uploadBytesResumable, d as getDownloadURL } from './vendor-firebase-DLAfa3Dz.js';
import { r as getLocalVideoBlobUrl, d as db, c as auth, v as storage, e as cleanFirestoreData } from './index-1f3YQYJq.js';
import { r as reelsInteractionService } from './reelsInteractionService-CDUqcAZy.js';

function sanitizeVideoUrl(url) {
  if (!url) return "";
  return url.trim();
}
const BUILTIN_STARTER_REELS = [
  {
    id: "starter_reel_1",
    ownerId: "imi_official",
    userId: "imi_official",
    creatorId: "imi_official",
    videoId: "sample_1",
    userDisplayName: "IMI Studio الرسمي",
    creatorName: "IMI Studio الرسمي",
    userPhone: "+212600000001",
    creatorPhone: "+212600000001",
    userPhotoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    caption: "مرحباً بكم في ريلز IMI Studio! استمتع بمشاهدة ومشاركة الفيديوهات مع أصدقائك 🚀 #IMI #Reels",
    hashtags: ["IMI", "Reels", "Explore"],
    playbackUrl: "/sample_videos/sample_1.mp4",
    videoUrl: "/sample_videos/sample_1.mp4",
    streamUrl: "/sample_videos/sample_1.mp4",
    thumbnailUrl: "",
    duration: 15,
    width: 1080,
    height: 1920,
    soundTitle: "الصوت الأصلي - IMI Studio",
    createdAt: Date.now() - 36e5 * 5,
    visibility: "public",
    status: "ready",
    viewsCount: 1240,
    viewCount: 1240,
    likesCount: 382,
    likeCount: 382,
    commentsCount: 45,
    commentCount: 45,
    sharesCount: 28,
    shareCount: 28
  },
  {
    id: "starter_reel_2",
    ownerId: "user_sara",
    userId: "user_sara",
    creatorId: "user_sara",
    videoId: "sample_2",
    userDisplayName: "سارة أحمد",
    creatorName: "سارة أحمد",
    userPhone: "+212600000002",
    creatorPhone: "+212600000002",
    userPhotoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    caption: "أجواء رائعة ولحظات مميزة اليوم ✨ شاركونا تجاربكم! #تصوير #فلوج",
    hashtags: ["تصوير", "فلوج", "يوميات"],
    playbackUrl: "/sample_videos/sample_2.mp4",
    videoUrl: "/sample_videos/sample_2.mp4",
    streamUrl: "/sample_videos/sample_2.mp4",
    thumbnailUrl: "",
    duration: 15,
    width: 1080,
    height: 1920,
    soundTitle: "موسيقى هادئة - سارة",
    createdAt: Date.now() - 36e5 * 8,
    visibility: "public",
    status: "ready",
    viewsCount: 950,
    viewCount: 950,
    likesCount: 215,
    likeCount: 215,
    commentsCount: 19,
    commentCount: 19,
    sharesCount: 12,
    shareCount: 12
  },
  {
    id: "starter_reel_3",
    ownerId: "user_karim",
    userId: "user_karim",
    creatorId: "user_karim",
    videoId: "sample_3",
    userDisplayName: "كريم المنصوري",
    creatorName: "كريم المنصوري",
    userPhone: "+212600000003",
    creatorPhone: "+212600000003",
    userPhotoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    caption: "سحر الطبيعة والمغامرة في عطلة نهاية الأسبوع 🌿🏔️ #طبيعة #سفر",
    hashtags: ["طبيعة", "سفر", "مغامرة"],
    playbackUrl: "/sample_videos/sample_3.mp4",
    videoUrl: "/sample_videos/sample_3.mp4",
    streamUrl: "/sample_videos/sample_3.mp4",
    thumbnailUrl: "",
    duration: 12,
    width: 1080,
    height: 1920,
    soundTitle: "إيقاع الطبيعة - كريم",
    createdAt: Date.now() - 36e5 * 12,
    visibility: "public",
    status: "ready",
    viewsCount: 1580,
    viewCount: 1580,
    likesCount: 420,
    likeCount: 420,
    commentsCount: 33,
    commentCount: 33,
    sharesCount: 41,
    shareCount: 41
  },
  {
    id: "starter_reel_4",
    ownerId: "user_yasmine",
    userId: "user_yasmine",
    creatorId: "user_yasmine",
    videoId: "sample_4",
    userDisplayName: "ياسمين علي",
    creatorName: "ياسمين علي",
    userPhone: "+212600000004",
    creatorPhone: "+212600000004",
    userPhotoURL: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    caption: "أفضل الحيل والنصائح لليوم 💡 جربوها وأخبروني بالنتيجة! #نصائح #إبداع",
    hashtags: ["نصائح", "إبداع", "تطوير"],
    playbackUrl: "/sample_videos/sample_4.mp4",
    videoUrl: "/sample_videos/sample_4.mp4",
    streamUrl: "/sample_videos/sample_4.mp4",
    thumbnailUrl: "",
    duration: 15,
    width: 1080,
    height: 1920,
    soundTitle: "تريند الأسبوع - ياسمين",
    createdAt: Date.now() - 36e5 * 24,
    visibility: "public",
    status: "ready",
    viewsCount: 2100,
    viewCount: 2100,
    likesCount: 560,
    likeCount: 560,
    commentsCount: 62,
    commentCount: 62,
    sharesCount: 58,
    shareCount: 58
  }
];
const LOCAL_STORAGE_REELS_CACHE_KEY = "imi_reels_real_cache_v31";
class ReelsService {
  constructor() {
    this.lastDocSnapshot = null;
    this.hasMore = true;
    this.viewedReelIdsInSession = /* @__PURE__ */ new Set();
    this.cache = /* @__PURE__ */ new Map();
    this.isQuotaExceededState = false;
    this.lastFetchTime = 0;
    for (const starter of BUILTIN_STARTER_REELS) {
      this.cache.set(starter.id, starter);
    }
    this.cleanLegacyLocalStorage();
    this.loadFromLocalStorage();
  }
  cleanLegacyLocalStorage() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("imi_reels_") || key.includes("starter"))) {
            if (key !== LOCAL_STORAGE_REELS_CACHE_KEY) {
              keysToRemove.push(key);
            }
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      }
    } catch (e) {
    }
  }
  async loadFromLocalStorage() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const raw = localStorage.getItem(LOCAL_STORAGE_REELS_CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            for (const reel of parsed) {
              if (reel && reel.id && reel.videoUrl) {
                reel.videoUrl = sanitizeVideoUrl(reel.videoUrl);
                reel.playbackUrl = sanitizeVideoUrl(reel.playbackUrl || reel.videoUrl);
                reel.streamUrl = sanitizeVideoUrl(reel.streamUrl || reel.videoUrl);
                if (reel.videoUrl.startsWith("blob:")) {
                  const idbUrl = await getLocalVideoBlobUrl(reel.id);
                  if (idbUrl) {
                    reel.videoUrl = idbUrl;
                    reel.streamUrl = idbUrl;
                    reel.playbackUrl = idbUrl;
                    this.cache.set(reel.id, reel);
                  }
                } else {
                  this.cache.set(reel.id, reel);
                }
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn("Could not load cached reels from localStorage:", e);
    }
  }
  saveToLocalStorage() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const list = Array.from(this.cache.values()).filter((r) => r.id && r.videoUrl && !r.videoUrl.startsWith("blob:")).slice(0, 30).map((r) => {
          if (r.thumbnailUrl && r.thumbnailUrl.startsWith("data:") && r.thumbnailUrl.length > 5e4) {
            return { ...r, thumbnailUrl: "" };
          }
          return r;
        });
        localStorage.setItem(LOCAL_STORAGE_REELS_CACHE_KEY, JSON.stringify(list));
      }
    } catch (e) {
      console.warn("Could not save reels to localStorage:", e);
    }
  }
  addReelToCache(reel) {
    if (reel && reel.id) {
      this.cache.set(reel.id, reel);
      this.saveToLocalStorage();
    }
  }
  getCachedReels() {
    const list = Array.from(this.cache.values()).filter(
      (r) => r.id && r.videoUrl && (r.videoUrl.startsWith("/") || r.videoUrl.startsWith("https://") || r.videoUrl.startsWith("http://") || r.videoUrl.startsWith("blob:") || r.videoUrl.startsWith("data:")) && r.status !== "failed"
    ).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return list;
  }
  isQuotaExceeded() {
    return this.isQuotaExceededState;
  }
  /**
   * Fetch real Reels from Firestore with cursor-based pagination and offline/quota fallback.
   */
  async getReelsFeed(options) {
    const pageSize = options?.pageSize || 10;
    const now = Date.now();
    if (!options?.reset && now - this.lastFetchTime < 1e3) {
      return {
        reels: this.getCachedReels(),
        hasMore: this.hasMore,
        isQuotaExceeded: this.isQuotaExceededState
      };
    }
    this.lastFetchTime = now;
    if (options?.reset) {
      this.lastDocSnapshot = null;
      this.hasMore = true;
    }
    try {
      let snapshot;
      try {
        let q = query(
          collection(db, "reels"),
          orderBy("createdAt", "desc"),
          limit(pageSize)
        );
        if (options?.filterByUserId) {
          q = query(
            collection(db, "reels"),
            where("userId", "==", options.filterByUserId),
            limit(pageSize)
          );
        }
        if (this.lastDocSnapshot && !options?.reset) {
          if (options?.filterByUserId) {
            q = query(
              collection(db, "reels"),
              where("userId", "==", options.filterByUserId),
              startAfter(this.lastDocSnapshot),
              limit(pageSize)
            );
          } else {
            q = query(
              collection(db, "reels"),
              orderBy("createdAt", "desc"),
              startAfter(this.lastDocSnapshot),
              limit(pageSize)
            );
          }
        }
        snapshot = await getDocs(q);
      } catch (indexQueryError) {
        console.warn("Reels indexed query warning, falling back to direct collection fetch:", indexQueryError);
        const fallbackQ = query(collection(db, "reels"), limit(pageSize * 2));
        snapshot = await getDocs(fallbackQ);
      }
      this.isQuotaExceededState = false;
      const fetchedReels = [];
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        let finalVideoUrl = data.videoUrl || data.streamUrl || "";
        let finalStreamUrl = data.streamUrl || data.videoUrl || "";
        if (finalVideoUrl.startsWith("blob:")) {
          const idbUrl = await getLocalVideoBlobUrl(docSnap.id);
          if (idbUrl) {
            finalVideoUrl = idbUrl;
            finalStreamUrl = idbUrl;
          } else {
            continue;
          }
        }
        if (data.status && data.status !== "ready") {
          continue;
        }
        const cleanVideoUrl = sanitizeVideoUrl(data.playbackUrl || finalVideoUrl);
        const cleanStreamUrl = sanitizeVideoUrl(data.streamUrl || finalStreamUrl || cleanVideoUrl);
        if (!cleanVideoUrl || cleanVideoUrl.length < 3) {
          continue;
        }
        const reel = {
          id: docSnap.id,
          ownerId: data.ownerId || data.userId || data.creatorId || "",
          userId: data.userId || data.creatorId || "",
          creatorId: data.creatorId || data.userId || "",
          videoId: data.videoId || "",
          userDisplayName: data.userDisplayName || data.creatorName || "مستخدم",
          creatorName: data.creatorName || data.userDisplayName || "مستخدم",
          userPhone: data.userPhone || data.creatorPhone || "",
          creatorPhone: data.creatorPhone || data.userPhone || "",
          userPhotoURL: data.userPhotoURL || data.creatorAvatar || "",
          creatorAvatar: data.creatorAvatar || data.userPhotoURL || "",
          caption: data.caption || "",
          hashtags: data.hashtags || [],
          playbackUrl: cleanVideoUrl,
          videoUrl: cleanVideoUrl,
          streamUrl: cleanStreamUrl,
          thumbnailUrl: data.thumbnailUrl || "",
          duration: data.duration || 15,
          width: data.width || 1080,
          height: data.height || 1920,
          fileSize: data.fileSize,
          mimeType: data.mimeType,
          soundTitle: data.soundTitle || "الصوت الأصلي",
          createdAt: data.createdAt || Date.now(),
          updatedAt: data.updatedAt,
          visibility: data.visibility || "public",
          status: "ready",
          viewsCount: data.viewsCount || data.viewCount || 0,
          viewCount: data.viewCount || data.viewsCount || 0,
          likesCount: data.likesCount || data.likeCount || 0,
          likeCount: data.likeCount || data.likesCount || 0,
          commentsCount: data.commentsCount || data.commentCount || 0,
          commentCount: data.commentCount || data.commentsCount || 0,
          sharesCount: data.sharesCount || data.shareCount || 0,
          shareCount: data.shareCount || data.sharesCount || 0
        };
        this.cache.set(reel.id, reel);
        fetchedReels.push(reel);
      }
      this.saveToLocalStorage();
      if (snapshot.docs.length > 0) {
        this.lastDocSnapshot = snapshot.docs[snapshot.docs.length - 1];
      }
      if (snapshot.docs.length < pageSize) {
        this.hasMore = false;
      }
      const combinedMap = /* @__PURE__ */ new Map();
      fetchedReels.forEach((r) => {
        if (r && r.id) combinedMap.set(r.id, r);
      });
      if (!options?.filterByUserId) {
        for (const starter of BUILTIN_STARTER_REELS) {
          if (!combinedMap.has(starter.id)) {
            combinedMap.set(starter.id, starter);
          }
        }
      }
      for (const cached of this.cache.values()) {
        if (cached && cached.id && !combinedMap.has(cached.id)) {
          if (options?.filterByUserId) {
            if (cached.userId === options.filterByUserId || cached.creatorId === options.filterByUserId || cached.ownerId === options.filterByUserId) {
              combinedMap.set(cached.id, cached);
            }
          } else {
            combinedMap.set(cached.id, cached);
          }
        }
      }
      const finalReels = Array.from(combinedMap.values()).filter(
        (r) => r.id && r.videoUrl && (r.videoUrl.startsWith("/") || r.videoUrl.startsWith("https://") || r.videoUrl.startsWith("http://") || r.videoUrl.startsWith("blob:") || r.videoUrl.startsWith("data:")) && r.status !== "failed"
      );
      return {
        reels: finalReels,
        hasMore: this.hasMore,
        isQuotaExceeded: false
      };
    } catch (error) {
      const isQuota = error?.code === "resource-exhausted" || error?.message && error.message.toLowerCase().includes("quota");
      if (isQuota) {
        this.isQuotaExceededState = true;
        console.warn("Firestore Quota Exceeded for today. Using local cache fallback.");
      } else {
        console.error("Error fetching reels feed from Firestore:", error);
      }
      const cachedList = this.getCachedReels();
      return {
        reels: cachedList,
        hasMore: false,
        isQuotaExceeded: isQuota,
        error: error?.message || "تعذر جلب البيانات من الخادم"
      };
    }
  }
  /**
   * Track real view in Firestore subcollection `reels/{reelId}/views/{userId}`
   */
  async trackReelView(reelId, userId) {
    if (!reelId || this.isQuotaExceededState || reelId.startsWith("demo_")) return;
    const sessionKey = `${reelId}:${userId || "anonymous"}`;
    if (this.viewedReelIdsInSession.has(sessionKey)) return;
    this.viewedReelIdsInSession.add(sessionKey);
    try {
      const reelRef = doc(db, "reels", reelId);
      if (userId) {
        const viewRef = doc(db, "reels", reelId, "views", userId);
        const viewDoc = await getDoc(viewRef);
        if (!viewDoc.exists()) {
          await setDoc(viewRef, {
            userId,
            createdAt: Date.now()
          });
        }
      }
      await updateDoc(reelRef, {
        viewsCount: increment(1),
        viewCount: increment(1)
      });
      const cached = this.cache.get(reelId);
      if (cached) {
        cached.viewsCount = (cached.viewsCount || 0) + 1;
        cached.viewCount = (cached.viewCount || 0) + 1;
      }
    } catch (err) {
      console.warn("Track reel view error:", err);
    }
  }
  /**
   * Get single Reel by ID
   */
  async getReelById(reelId) {
    if (!reelId) return null;
    if (this.cache.has(reelId)) {
      return this.cache.get(reelId);
    }
    try {
      const docSnap = await getDoc(doc(db, "reels", reelId));
      if (!docSnap.exists()) return null;
      const data = docSnap.data();
      const reel = {
        id: docSnap.id,
        userId: data.userId || data.creatorId || "",
        creatorId: data.creatorId || data.userId || "",
        userDisplayName: data.userDisplayName || data.creatorName || "مستخدم",
        creatorName: data.creatorName || data.userDisplayName || "مستخدم",
        userPhone: data.userPhone || data.creatorPhone || "",
        creatorPhone: data.creatorPhone || data.userPhone || "",
        userPhotoURL: data.userPhotoURL || data.creatorAvatar || "",
        creatorAvatar: data.creatorAvatar || data.userPhotoURL || "",
        caption: data.caption || "",
        hashtags: data.hashtags || [],
        videoUrl: data.videoUrl || data.streamUrl || "",
        streamUrl: data.streamUrl || data.videoUrl || "",
        thumbnailUrl: data.thumbnailUrl || "",
        duration: data.duration || 15,
        width: data.width || 1080,
        height: data.height || 1920,
        fileSize: data.fileSize,
        mimeType: data.mimeType,
        soundTitle: data.soundTitle || "الصوت الأصلي",
        createdAt: data.createdAt || Date.now(),
        updatedAt: data.updatedAt,
        visibility: data.visibility || "public",
        status: data.status || "ready",
        viewsCount: data.viewsCount || data.viewCount || 0,
        viewCount: data.viewCount || data.viewsCount || 0,
        likesCount: data.likesCount || data.likeCount || 0,
        likeCount: data.likeCount || data.likesCount || 0,
        commentsCount: data.commentsCount || data.commentCount || 0,
        commentCount: data.commentCount || data.commentsCount || 0,
        sharesCount: data.sharesCount || data.shareCount || 0,
        shareCount: data.shareCount || data.sharesCount || 0
      };
      this.cache.set(reel.id, reel);
      return reel;
    } catch (error) {
      console.error("Error fetching reel by id:", error);
      return null;
    }
  }
  /**
   * Delete Reel by owner
   */
  async deleteReel(reelId, userId) {
    if (!reelId || !userId) return false;
    try {
      const reelDoc = await getDoc(doc(db, "reels", reelId));
      if (reelDoc.exists()) {
        const data = reelDoc.data();
        if (data.userId !== userId && data.creatorId !== userId) {
          throw new Error("غير مصرح لك بحذف هذا الريل.");
        }
        await deleteDoc(doc(db, "reels", reelId));
      }
      this.cache.delete(reelId);
      this.saveToLocalStorage();
      return true;
    } catch (err) {
      console.error("Failed to delete reel:", err);
      return false;
    }
  }
}
const reelsService = new ReelsService();

function ReelPlayer({
  reel,
  isActive,
  isPreload,
  isMuted,
  onToggleMute,
  onDoubleTap,
  onSingleTap,
  onVideoEnd,
  onTimeUpdate
}) {
  const videoRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const progressBarRef = reactExports.useRef(null);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [isBuffering, setIsBuffering] = reactExports.useState(false);
  const [hasError, setHasError] = reactExports.useState(false);
  const [showPlayStateIcon, setShowPlayStateIcon] = reactExports.useState(null);
  const [progressPercent, setProgressPercent] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(reel.duration || 15);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const getInitialUrl = reactExports.useCallback(() => {
    const raw = sanitizeVideoUrl(reel.videoUrl || reel.streamUrl || reel.playbackUrl);
    if (raw) return raw;
    if (reel.videoId) return `/api/reels/stream/${reel.videoId}`;
    if (reel.id?.startsWith("demo-") || reel.id?.startsWith("sample-")) {
      return "/sample_videos/sample_1.mp4";
    }
    return "";
  }, [reel]);
  const [currentVideoSrc, setCurrentVideoSrc] = reactExports.useState(getInitialUrl);
  const lastTapTimeRef = reactExports.useRef(0);
  const playIconTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const fresh = getInitialUrl();
    setCurrentVideoSrc(fresh);
    setHasError(false);
  }, [getInitialUrl]);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = isMuted;
      video.muted = isMuted;
    }
  }, [isMuted]);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let isCancelled = false;
    if (isActive) {
      video.defaultMuted = isMuted;
      video.muted = isMuted;
      video.playsInline = true;
      try {
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");
      } catch (_) {
      }
      const startPlayback = () => {
        if (isCancelled) return;
        const playPromise = video.play();
        if (playPromise !== void 0) {
          playPromise.then(() => {
            if (!isCancelled) {
              setIsPlaying(true);
              setIsBuffering(false);
              setHasError(false);
            }
          }).catch((err) => {
            if (isCancelled || err?.name === "AbortError") return;
            if (!video.muted) {
              video.defaultMuted = true;
              video.muted = true;
              video.play().then(() => {
                if (!isCancelled) {
                  setIsPlaying(true);
                  setIsBuffering(false);
                  setHasError(false);
                }
              }).catch((fallbackErr) => {
                if (isCancelled || fallbackErr?.name === "AbortError") return;
                console.warn("[ReelPlayer] Playback restricted by browser policy:", fallbackErr);
                if (!isCancelled) {
                  setIsPlaying(false);
                  setIsBuffering(false);
                }
              });
            } else {
              if (!isCancelled) {
                setIsPlaying(false);
                setIsBuffering(false);
              }
            }
          });
        }
      };
      if (video.readyState >= 2) {
        startPlayback();
      } else {
        const handleCanPlay = () => {
          startPlayback();
          video.removeEventListener("canplay", handleCanPlay);
        };
        video.addEventListener("canplay", handleCanPlay);
        const timer = setTimeout(startPlayback, 150);
        return () => {
          isCancelled = true;
          clearTimeout(timer);
          video.removeEventListener("canplay", handleCanPlay);
        };
      }
    } else {
      video.pause();
      setIsPlaying(false);
      setIsBuffering(false);
      if (!isPreload) {
        try {
          video.currentTime = 0;
        } catch (_) {
        }
      }
    }
    return () => {
      isCancelled = true;
    };
  }, [isActive, isPreload, isMuted, currentVideoSrc]);
  const handleContainerClick = reactExports.useCallback(
    (e) => {
      const now = Date.now();
      const DOUBLE_TAP_GAP = 280;
      const rect = containerRef.current?.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      const relativeX = rect ? (clientX - rect.left) / rect.width * 100 : 50;
      const relativeY = rect ? (clientY - rect.top) / rect.height * 100 : 50;
      const video = videoRef.current;
      if (!video) return;
      if (now - lastTapTimeRef.current < DOUBLE_TAP_GAP) {
        lastTapTimeRef.current = 0;
        onDoubleTap?.(relativeX, relativeY);
        if (video.paused) {
          video.play().then(() => setIsPlaying(true)).catch(() => {
          });
        }
        return;
      }
      lastTapTimeRef.current = now;
      if (hasError) {
        handleRetry();
        return;
      }
      if (video.paused) {
        video.defaultMuted = isMuted;
        video.muted = isMuted;
        const playPromise = video.play();
        if (playPromise !== void 0) {
          playPromise.then(() => {
            setIsPlaying(true);
            setShowPlayStateIcon("play");
            setHasError(false);
          }).catch(() => {
            video.defaultMuted = true;
            video.muted = true;
            video.play().then(() => {
              setIsPlaying(true);
              setShowPlayStateIcon("play");
              setHasError(false);
            }).catch(() => {
            });
          });
        }
      } else {
        video.pause();
        setIsPlaying(false);
        setShowPlayStateIcon("pause");
      }
      if (playIconTimerRef.current) clearTimeout(playIconTimerRef.current);
      playIconTimerRef.current = setTimeout(() => {
        setShowPlayStateIcon(null);
      }, 550);
      onSingleTap?.();
    },
    [onDoubleTap, onSingleTap, hasError, isMuted]
  );
  const handleRetry = (e) => {
    if (e) e.stopPropagation();
    setHasError(false);
    setIsBuffering(true);
    const video = videoRef.current;
    if (video) {
      const targetUrl = getInitialUrl();
      if (!targetUrl) {
        setIsBuffering(false);
        setHasError(true);
        return;
      }
      setCurrentVideoSrc(targetUrl);
      video.src = targetUrl;
      video.load();
      video.defaultMuted = true;
      video.muted = true;
      video.play().then(() => {
        setIsPlaying(true);
        setIsBuffering(false);
        setHasError(false);
      }).catch(() => {
        setIsBuffering(false);
        setHasError(true);
      });
    }
  };
  const handleSeek = (e) => {
    e.stopPropagation();
    const bar = progressBarRef.current;
    const video = videoRef.current;
    if (!bar || !video || !duration) return;
    const rect = bar.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(clickPos * duration, duration));
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      onClick: handleContainerClick,
      className: "relative w-full h-full bg-black overflow-hidden select-none flex items-center justify-center cursor-pointer",
      children: [
        reel.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: reel.thumbnailUrl,
            alt: reel.caption || "",
            className: "absolute inset-0 w-full h-full object-cover pointer-events-none z-0 filter brightness-90"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black pointer-events-none z-0" }),
        (isActive || isPreload) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            src: currentVideoSrc,
            poster: reel.thumbnailUrl,
            playsInline: true,
            loop: true,
            muted: isMuted,
            preload: isActive ? "auto" : "metadata",
            crossOrigin: "anonymous",
            className: "absolute inset-0 w-full h-full object-cover z-0",
            onWaiting: (e) => {
              e.stopPropagation();
              setIsBuffering(true);
            },
            onPlaying: (e) => {
              e.stopPropagation();
              setIsBuffering(false);
              setIsPlaying(true);
              setHasError(false);
            },
            onPlay: (e) => {
              e.stopPropagation();
              setIsPlaying(true);
              setIsBuffering(false);
              setHasError(false);
            },
            onPause: (e) => {
              e.stopPropagation();
              setIsPlaying(false);
            },
            onLoadedMetadata: (e) => {
              e.stopPropagation();
              setDuration(e.currentTarget.duration || reel.duration || 15);
              setIsBuffering(false);
            },
            onCanPlay: (e) => {
              e.stopPropagation();
              setIsBuffering(false);
            },
            onTimeUpdate: (e) => {
              e.stopPropagation();
              const cur = e.currentTarget.currentTime;
              const dur = e.currentTarget.duration || duration || 15;
              setCurrentTime(cur);
              setProgressPercent(cur / dur * 100);
              onTimeUpdate?.(cur, dur);
            },
            onEnded: (e) => {
              e.stopPropagation();
              onVideoEnd?.();
            },
            onError: (e) => {
              e.stopPropagation();
              const video = videoRef.current;
              const err = video?.error;
              if (err && err.code === 1) return;
              console.warn("[ReelPlayer] Video error on reel:", reel.id, "src:", currentVideoSrc, "code:", err?.code);
              const candidateUrls = [
                reel.playbackUrl,
                reel.streamUrl,
                reel.videoUrl,
                reel.videoId ? `/api/reels/stream/${reel.videoId}` : null,
                reel.id?.startsWith("demo-") || reel.id?.startsWith("sample-") ? "/sample_videos/sample_1.mp4" : null
              ].map((u) => sanitizeVideoUrl(u)).filter((u) => Boolean(u && u !== currentVideoSrc));
              if (candidateUrls.length > 0) {
                const nextCandidate = candidateUrls[0];
                console.log("[ReelPlayer] Trying next source candidate:", nextCandidate);
                setCurrentVideoSrc(nextCandidate);
                setIsBuffering(false);
              } else {
                setHasError(true);
                setIsBuffering(false);
              }
            }
          }
        ),
        isBuffering && isActive && !hasError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border-3 border-white/20 border-t-[#2AABEE] animate-spin" }) }),
        showPlayStateIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none z-25 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white shadow-2xl border border-white/20 transform scale-110 animate-scale-up", children: showPlayStateIcon === "play" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-9 h-9 translate-x-0.5 fill-white text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-9 h-9 fill-white text-white" }) }) }),
        !isPlaying && isActive && !isBuffering && !hasError && !showPlayStateIcon && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center text-white/95 shadow-2xl border border-white/25 mb-2 transform transition hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 translate-x-0.5 fill-white text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/90 text-xs font-semibold bg-black/60 px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-lg border border-white/10", children: "انقر للتشغيل" })
        ] }),
        hasError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-black/85 p-6 text-center z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 translate-x-0.5 fill-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white mb-1", children: "اضغط لتشغيل الفيديو" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60 mb-4 max-w-xs", children: "يمكنك إعادة المحاولة أو تشغيل المقطع تلقائياً" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleRetry,
              className: "px-5 py-2.5 bg-[#2AABEE] hover:bg-[#229ED9] rounded-full text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-lg active:scale-95",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تشغيل الفيديو الآن" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: progressBarRef,
            onClick: handleSeek,
            className: "absolute bottom-0 left-0 right-0 h-1.5 hover:h-2.5 bg-white/20 z-30 cursor-pointer transition-all group",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-white group-hover:bg-[#2AABEE] transition-all duration-75 relative rounded-r-full",
                style: { width: `${progressPercent}%` },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" })
              }
            )
          }
        )
      ]
    }
  );
}

function ReelCommentsModal({
  isOpen,
  onClose,
  reel,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  onCommentAdded
}) {
  const [comments, setComments] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [inputText, setInputText] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isOpen || !reel.id) return;
    let isMounted = true;
    setIsLoading(true);
    reelsInteractionService.getComments(reel.id, 30).then((data) => {
      if (isMounted) {
        setComments(data);
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) setIsLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [isOpen, reel.id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isSubmitting) return;
    const text = inputText.trim();
    setInputText("");
    setIsSubmitting(true);
    try {
      const newComment = await reelsInteractionService.addComment(
        reel.id,
        currentUserId,
        currentUserName,
        currentUserAvatar,
        text
      );
      setComments((prev) => [newComment, ...prev]);
      onCommentAdded?.();
    } catch (err) {
      console.warn("Failed to add comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const addEmoji = (emoji) => {
    setInputText((prev) => prev + emoji);
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity dir-rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md bg-white rounded-t-3xl h-[65vh] max-h-[550px] flex flex-col shadow-2xl z-10 overflow-hidden animate-slide-up border-t border-slate-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-2.5 flex items-center justify-between border-b border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-900", children: "التعليقات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full", children: comments.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 border-2 border-[#2AABEE] border-t-transparent rounded-full animate-spin" }) }) : comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-44 text-center text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-10 h-10 mb-2 opacity-40 text-[#2AABEE]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-slate-600", children: "لا توجد تعليقات بعد" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "كن أول من يترك تعليقاً لطيفاً على هذا الريل!" })
      ] }) : comments.map((comment) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-to-tr from-[#2AABEE] to-sky-400 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden shadow-xs", children: comment.userAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: comment.userAvatar, alt: comment.userName, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: comment.userName?.charAt(0).toUpperCase() || "U" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-900 truncate", children: comment.userName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: new Date(comment.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-700 mt-1 leading-relaxed break-words", children: comment.text })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-slate-400 hover:text-rose-500 p-1 transition cursor-pointer self-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3.5 h-3.5" }) })
      ] }, comment.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar", children: ["❤️", "🔥", "👏", "😍", "✨", "😂", "💯", "🙌"].map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => addEmoji(emoji),
          className: "text-lg hover:scale-125 transition-transform p-1 cursor-pointer shrink-0",
          children: emoji
        },
        emoji
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-3 bg-white border-t border-slate-200 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "أضف تعليقاً...",
            value: inputText,
            onChange: (e) => setInputText(e.target.value),
            className: "flex-1 bg-slate-100 text-slate-900 text-xs px-4 py-2.5 rounded-full outline-none border border-slate-200 focus:border-[#2AABEE]",
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: !inputText.trim() || isSubmitting,
            className: "p-2.5 rounded-full bg-[#2AABEE] text-white disabled:opacity-40 hover:bg-[#229ED9] transition cursor-pointer shadow-xs shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 rotate-180" })
          }
        )
      ] })
    ] })
  ] });
}

function ReelCard({
  reel,
  isActive,
  isPreload,
  isMuted,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  onToggleMute,
  onDelete
}) {
  const [isLiked, setIsLiked] = reactExports.useState(reel.isLikedByMe || false);
  const [likeCount, setLikeCount] = reactExports.useState(reel.likeCount || reel.likesCount || 0);
  const [commentCount, setCommentCount] = reactExports.useState(reel.commentCount || reel.commentsCount || 0);
  const [shareCount, setShareCount] = reactExports.useState(reel.shareCount || reel.sharesCount || 0);
  const [isBookmarked, setIsBookmarked] = reactExports.useState(false);
  const [bookmarkCount, setBookmarkCount] = reactExports.useState(reel.bookmarkCount || reel.bookmarksCount || 0);
  const [isFollowed, setIsFollowed] = reactExports.useState(reel.isFollowedByMe || false);
  const [isCommentsOpen, setIsCommentsOpen] = reactExports.useState(false);
  const [toastMessage, setToastMessage] = reactExports.useState(null);
  const [isCaptionExpanded, setIsCaptionExpanded] = reactExports.useState(false);
  const [isDownloading, setIsDownloading] = reactExports.useState(false);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = reactExports.useState(false);
  const [heartBursts, setHeartBursts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (currentUserId && reel.id) {
      reelsInteractionService.isReelLiked(reel.id, currentUserId).then((liked) => {
        setIsLiked(liked);
      });
    }
  }, [reel.id, currentUserId]);
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };
  const handleToggleLike = async () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikeCount((prev) => nextLiked ? prev + 1 : Math.max(0, prev - 1));
    await reelsInteractionService.toggleLike(reel.id, currentUserId, isLiked);
  };
  const handleToggleBookmark = () => {
    const nextBookmarked = !isBookmarked;
    setIsBookmarked(nextBookmarked);
    setBookmarkCount((prev) => nextBookmarked ? prev + 1 : Math.max(0, prev - 1));
    triggerToast(nextBookmarked ? "تمت الإضافة للمفضلة ✨" : "تمت الإزالة من المفضلة");
  };
  const handleDoubleTap = reactExports.useCallback(
    (x, y) => {
      const burstId = Date.now() + Math.random();
      setHeartBursts((prev) => [...prev, { id: burstId, x, y }]);
      setTimeout(() => {
        setHeartBursts((prev) => prev.filter((h) => h.id !== burstId));
      }, 950);
      if (!isLiked) {
        handleToggleLike();
      }
    },
    [isLiked]
  );
  const handleToggleFollow = (e) => {
    e.stopPropagation();
    const newFollow = reelsInteractionService.toggleFollow(reel.creatorId, currentUserId, isFollowed);
    setIsFollowed(newFollow);
    triggerToast(newFollow ? "تمت المتابعة بنجاح ✨" : "تم إلغاء المتابعة");
  };
  const handleShare = async (e) => {
    e.stopPropagation();
    const success = await reelsInteractionService.shareReel(reel);
    setShareCount((prev) => prev + 1);
    if (success) {
      triggerToast("تم نسخ الرابط بنجاح! 🚀");
    }
  };
  const handleDownload = async (e) => {
    e.stopPropagation();
    if (isDownloading) return;
    setIsDownloading(true);
    triggerToast("جارٍ تجهيز الفيديو للتحميل...");
    const videoUrl = reel.videoUrl || reel.streamUrl || reel.playbackUrl || "";
    try {
      if (!videoUrl) throw new Error("رابط الفيديو غير صالح");
      try {
        const response = await fetch(videoUrl);
        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          const a2 = document.createElement("a");
          a2.href = blobUrl;
          a2.download = `imi_reel_${reel.id || Date.now()}.mp4`;
          document.body.appendChild(a2);
          a2.click();
          document.body.removeChild(a2);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1e4);
          triggerToast("تم تحميل الفيديو بنجاح 📥");
          return;
        }
      } catch (_) {
      }
      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = `imi_reel_${reel.id || Date.now()}.mp4`;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      triggerToast("بدأ تحميل الفيديو 📥");
    } catch (err) {
      triggerToast("تعذر تحميل الفيديو");
    } finally {
      setIsDownloading(false);
    }
  };
  const handleDeleteConfirm = async (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
    if (isDeleting) return;
    setIsDeleting(true);
    triggerToast("جارٍ حذف الريل...");
    try {
      const success = await reelsService.deleteReel(reel.id, currentUserId);
      if (success) {
        triggerToast("تم حذف الريل بنجاح");
        onDelete?.(reel.id);
      } else {
        triggerToast("تعذر الحذف، يرجى المحاولة لاحقاً");
      }
    } catch (err) {
      triggerToast("حدث خطأ أثناء الحذف");
    } finally {
      setIsDeleting(false);
    }
  };
  const isMyReel = reel.creatorId === currentUserId || reel.userId === currentUserId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full bg-black select-none snap-start flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReelPlayer,
      {
        reel,
        isActive,
        isPreload,
        isMuted,
        onToggleMute,
        onDoubleTap: handleDoubleTap
      }
    ),
    heartBursts.map((heart) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute pointer-events-none z-40 animate-tiktok-heart text-rose-500",
        style: { left: `${heart.x}%`, top: `${heart.y}%` },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-24 h-24 fill-rose-500 text-rose-500 drop-shadow-[0_10px_25px_rgba(244,63,94,0.6)]" })
      },
      heart.id
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-16 right-4 z-30 flex items-center gap-2", children: [
      isMuted && isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            onToggleMute();
          },
          className: "bg-black/60 hover:bg-black/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-md transition cursor-pointer active:scale-95 animate-pulse",
          children: "انقر لتشغيل الصوت"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            onToggleMute();
          },
          className: "p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer border border-white/10 shadow-lg",
          title: isMuted ? "تشغيل الصوت" : "كتم الصوت",
          children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-5 h-5 text-rose-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-5 h-5 text-emerald-400" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 bottom-14 flex flex-col items-center gap-3.5 z-25 pointer-events-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden shadow-2xl bg-gradient-to-tr from-[#2AABEE] to-[#229ED9] flex items-center justify-center text-white font-bold text-base border-2 border-white", children: reel.creatorAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: reel.creatorAvatar, alt: reel.creatorName, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: reel.creatorName?.charAt(0).toUpperCase() || "U" }) }),
        !isMyReel && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleToggleFollow,
            className: `absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${isFollowed ? "bg-emerald-500 text-white" : "bg-[#FE2C55] text-white hover:scale-115 active:scale-90"}`,
            title: isFollowed ? "تتابع" : "متابعة",
            children: isFollowed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 stroke-[3]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 stroke-[3]" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleToggleLike,
            className: `p-2.5 rounded-full transition-transform active:scale-125 cursor-pointer backdrop-blur-xs ${isLiked ? "text-[#FE2C55]" : "text-white hover:text-white/80"}`,
            title: "إعجاب",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Heart,
              {
                className: `w-7 h-7 drop-shadow-md transition-all ${isLiked ? "fill-[#FE2C55] scale-110" : ""}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-[11px] font-bold -mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]", children: likeCount > 999 ? `${(likeCount / 1e3).toFixed(1)}k` : likeCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setIsCommentsOpen(true);
            },
            className: "p-2.5 rounded-full text-white hover:text-white/80 transition-transform active:scale-125 cursor-pointer",
            title: "التعليقات",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-7 h-7 drop-shadow-md fill-white/10" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-[11px] font-bold -mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]", children: commentCount > 999 ? `${(commentCount / 1e3).toFixed(1)}k` : commentCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleToggleBookmark,
            className: `p-2.5 rounded-full transition-transform active:scale-125 cursor-pointer ${isBookmarked ? "text-amber-400" : "text-white hover:text-white/80"}`,
            title: "إضافة للمفضلة",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bookmark,
              {
                className: `w-7 h-7 drop-shadow-md transition-all ${isBookmarked ? "fill-amber-400" : "fill-white/10"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-[11px] font-bold -mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]", children: bookmarkCount > 999 ? `${(bookmarkCount / 1e3).toFixed(1)}k` : bookmarkCount })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleShare,
            className: "p-2.5 rounded-full text-white hover:text-white/80 transition-transform active:scale-125 cursor-pointer",
            title: "مشاركة",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-7 h-7 drop-shadow-md" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-[11px] font-bold -mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]", children: shareCount > 0 ? shareCount > 999 ? `${(shareCount / 1e3).toFixed(1)}k` : shareCount : "مشاركة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleDownload,
            disabled: isDownloading,
            className: "p-2.5 rounded-full text-white hover:text-white/80 transition-transform active:scale-125 cursor-pointer disabled:opacity-50",
            title: "تنزيل الفيديو",
            children: isDownloading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-6 h-6 animate-spin text-[#2AABEE]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-6 h-6 drop-shadow-md hover:text-[#2AABEE] transition" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-[10px] font-bold -mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]", children: "تنزيل" })
      ] }),
      isMyReel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            setShowDeleteConfirm(true);
          },
          disabled: isDeleting,
          className: "p-2 rounded-full text-rose-400 hover:text-rose-300 transition-transform active:scale-125 cursor-pointer disabled:opacity-50",
          title: "حذف الفيديو",
          children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin text-rose-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5 drop-shadow-md" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2", children: [
        isActive && !isMuted && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-1 text-white/80 font-bold text-xs pointer-events-none animate-float-note-1", children: "♪" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-4 -left-1 text-sky-300 font-bold text-xs pointer-events-none animate-float-note-2", children: "♫" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-full bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-900 border-2 border-slate-700 shadow-2xl flex items-center justify-center ${isActive && !isMuted ? "animate-vinyl-spin" : ""}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full overflow-hidden border border-white/60 flex items-center justify-center bg-slate-900", children: reel.creatorAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: reel.creatorAvatar, alt: "sound", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-3 h-3 text-[#2AABEE]" }) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-4 bottom-5 right-20 z-20 text-right pointer-events-auto dir-rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide hover:underline cursor-pointer", children: [
          "@",
          reel.creatorName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-3.5 h-3.5 text-[#2AABEE] fill-[#2AABEE] text-white shrink-0 drop-shadow-md" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-white/95 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: isCaptionExpanded ? "" : "line-clamp-2", children: reel.caption }),
        reel.caption && reel.caption.length > 75 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsCaptionExpanded(!isCaptionExpanded),
            className: "text-[11px] font-bold text-white/70 hover:text-white mt-0.5 cursor-pointer",
            children: isCaptionExpanded ? "عرض أقل" : "...المزيد"
          }
        )
      ] }),
      reel.hashtags && reel.hashtags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-2.5", children: reel.hashtags.map((tag, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-[11px] font-semibold text-white/90 hover:text-[#2AABEE] cursor-pointer drop-shadow-sm transition",
          children: tag.startsWith("#") ? tag : `#${tag}`
        },
        idx
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white/90 text-[11px] font-medium max-w-[240px] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-3.5 h-3.5 text-white/80 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden whitespace-nowrap w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-marquee inline-block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: reel.soundTitle || "الصوت الأصلي - " + reel.creatorName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: reel.soundTitle || "الصوت الأصلي - " + reel.creatorName })
        ] }) })
      ] })
    ] }),
    toastMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white border border-[#2AABEE]/40 px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md animate-bounce", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-[#2AABEE]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: toastMessage })
    ] }),
    showDeleteConfirm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm pointer-events-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-2xl animate-fade-in-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-6 h-6 text-rose-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white text-lg font-bold mb-2", children: "حذف الفيديو" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm mb-6 leading-relaxed", children: "هل أنت متأكد من رغبتك في حذف هذا الفيديو نهائياً؟" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setShowDeleteConfirm(false);
            },
            className: "flex-1 py-3 px-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 transition cursor-pointer",
            children: "إلغاء"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleDeleteConfirm,
            className: "flex-1 py-3 px-4 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition cursor-pointer",
            children: "نعم، احذف"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReelCommentsModal,
      {
        isOpen: isCommentsOpen,
        onClose: () => setIsCommentsOpen(false),
        reel,
        currentUserId,
        currentUserName,
        currentUserAvatar,
        onCommentAdded: () => setCommentCount((prev) => prev + 1)
      }
    )
  ] });
}

function ReelsFeed({
  reels,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  hasMore,
  onLoadMore,
  onRefresh,
  onOpenUpload,
  isMuted,
  onToggleMute,
  onDeleteReel,
  isLoading
}) {
  const containerRef = reactExports.useRef(null);
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const itemRefs = reactExports.useRef(/* @__PURE__ */ new Map());
  const viewTimerRef = reactExports.useRef(null);
  const isScrollingRef = reactExports.useRef(false);
  const scrollTimeoutRef = reactExports.useRef(null);
  const scrollEndTimerRef = reactExports.useRef(null);
  const activeIndexRef = reactExports.useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const scrollToIndex = reactExports.useCallback((index) => {
    const container = containerRef.current;
    if (!container || index < 0 || index >= reels.length) return;
    isScrollingRef.current = true;
    setActiveIndex(index);
    const targetTop = index * container.clientHeight;
    container.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 450);
  }, [reels.length]);
  reactExports.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        let bestCandidate = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute("data-reel-index");
            if (indexAttr !== null) {
              const idx = parseInt(indexAttr, 10);
              if (!isNaN(idx)) {
                if (!bestCandidate || entry.intersectionRatio > bestCandidate.ratio) {
                  bestCandidate = { index: idx, ratio: entry.intersectionRatio };
                }
              }
            }
          }
        });
        if (bestCandidate && bestCandidate.ratio >= 0.55 && bestCandidate.index !== activeIndexRef.current) {
          setActiveIndex(bestCandidate.index);
        }
      },
      {
        root: container,
        threshold: [0.3, 0.55, 0.85]
      }
    );
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
    };
  }, [reels]);
  const handleScroll = reactExports.useCallback(() => {
    if (isScrollingRef.current) return;
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container || container.clientHeight === 0 || isScrollingRef.current) return;
      const scrollPos = container.scrollTop;
      const height = container.clientHeight;
      const index = Math.round(scrollPos / height);
      if (index >= 0 && index < reels.length && index !== activeIndexRef.current) {
        setActiveIndex(index);
      }
    }, 90);
  }, [reels.length]);
  reactExports.useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.querySelector(".fixed.z-50") || document.querySelector("input:focus, textarea:focus")) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (activeIndexRef.current < reels.length - 1) {
          scrollToIndex(activeIndexRef.current + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (activeIndexRef.current > 0) {
          scrollToIndex(activeIndexRef.current - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reels.length, scrollToIndex]);
  reactExports.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e) => {
      if (document.querySelector(".fixed.z-50")) return;
      if (Math.abs(e.deltaY) < 25) return;
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }
      if (e.deltaY > 0 && activeIndex < reels.length - 1) {
        e.preventDefault();
        scrollToIndex(activeIndex + 1);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        e.preventDefault();
        scrollToIndex(activeIndex - 1);
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex, reels.length, scrollToIndex]);
  reactExports.useEffect(() => {
    if (viewTimerRef.current) clearTimeout(viewTimerRef.current);
    const currentReel = reels[activeIndex];
    if (currentReel) {
      viewTimerRef.current = setTimeout(() => {
        reelsService.trackReelView(currentReel.id, currentUserId);
      }, 2e3);
    }
    return () => {
      if (viewTimerRef.current) clearTimeout(viewTimerRef.current);
    };
  }, [activeIndex, reels, currentUserId]);
  const lastRequestedLengthRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (hasMore && reels.length > 0 && activeIndex >= reels.length - 2 && lastRequestedLengthRef.current !== reels.length) {
      lastRequestedLengthRef.current = reels.length;
      onLoadMore();
    }
  }, [activeIndex, reels.length, hasMore, onLoadMore]);
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        scrollToIndex(Math.min(activeIndex + 1, reels.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        scrollToIndex(Math.max(activeIndex - 1, 0));
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        onToggleMute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, reels.length, onToggleMute, scrollToIndex]);
  if (isLoading && reels.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-black text-white p-6 text-center select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-2 border-white/20 border-t-[#2AABEE] rounded-full animate-spin mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-white/70", children: "جاري تحميل الريلز..." })
    ] });
  }
  if (reels.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-black text-white p-6 text-center select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#2AABEE]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-10 h-10" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-1.5", children: "لا توجد مقاطع ريلز بعد" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70 mb-6 max-w-xs leading-relaxed", children: "كن أول من يشارك فيديو في ريلز وتفاعل مع أصدقائك!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3", children: [
        onOpenUpload && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: onOpenUpload,
            className: "px-6 py-2.5 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-bold shadow-lg flex items-center gap-2 transition transform active:scale-95 cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 stroke-[3]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نشر فيديو الآن" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: onRefresh,
            className: "px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "تحديث الخلاصة" })
            ]
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: containerRef,
        onScroll: handleScroll,
        className: "w-full h-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar relative focus:outline-none scroll-smooth touch-pan-y flex flex-col",
        tabIndex: 0,
        children: reels.map((reel, idx) => {
          const isActive = idx === activeIndex;
          const isPreload = Math.abs(idx - activeIndex) <= 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-reel-index": idx,
              ref: (el) => {
                if (el) itemRefs.current.set(idx, el);
                else itemRefs.current.delete(idx);
              },
              style: { height: "100%", minHeight: "100%", maxHeight: "100%" },
              className: "w-full h-full min-h-full max-h-full basis-full snap-start snap-always relative overflow-hidden flex-none shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ReelCard,
                {
                  reel,
                  isActive,
                  isPreload,
                  isMuted,
                  currentUserId,
                  currentUserName,
                  currentUserAvatar,
                  onToggleMute,
                  onDelete: onDeleteReel
                }
              )
            },
            reel.id ? `${reel.id}_${idx}` : `reel_idx_${idx}`
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col gap-2 absolute left-2 top-1/2 -translate-y-1/2 z-30 pointer-events-auto", children: [
      activeIndex > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => scrollToIndex(activeIndex - 1),
          className: "p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-lg cursor-pointer transition active:scale-90",
          title: "الفيديو السابق (سهم للأعلى)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-5 h-5" })
        }
      ),
      activeIndex < reels.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => scrollToIndex(activeIndex + 1),
          className: "p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-lg cursor-pointer transition active:scale-90",
          title: "الفيديو التالي (سهم للأسفل)",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5" })
        }
      )
    ] })
  ] });
}

async function extractVideoThumbnail(file, timeInSeconds = 0.5, maxDimension = 360) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { dataUrl: "" };
  }
  return new Promise((resolve) => {
    let completed = false;
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    const release = () => {
      try {
        URL.revokeObjectURL(objectUrl);
      } catch {
      }
      video.removeAttribute("src");
      video.load();
    };
    const timeout = setTimeout(() => {
      if (!completed) {
        completed = true;
        release();
        resolve({ dataUrl: "" });
      }
    }, 4500);
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.onloadedmetadata = () => {
      const duration = video.duration || 0;
      let seekTime = timeInSeconds;
      if (duration > 0 && seekTime > duration) {
        seekTime = duration * 0.5;
      }
      video.currentTime = Math.max(0, seekTime);
    };
    video.onseeked = () => {
      if (completed) return;
      completed = true;
      clearTimeout(timeout);
      try {
        let width = video.videoWidth || 720;
        let height = video.videoHeight || 1280;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round(height * maxDimension / width);
            width = maxDimension;
          } else {
            width = Math.round(width * maxDimension / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          release();
          return resolve({ dataUrl: "" });
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "medium";
        ctx.drawImage(video, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.72);
        canvas.toBlob(
          (blob) => {
            release();
            resolve({
              dataUrl,
              blob: blob || void 0,
              width,
              height,
              duration: video.duration || 0
            });
          },
          "image/jpeg",
          0.72
        );
      } catch (err) {
        release();
        console.warn("Video thumbnail capture failed:", err);
        resolve({ dataUrl: "" });
      }
    };
    video.onerror = () => {
      if (!completed) {
        completed = true;
        clearTimeout(timeout);
        release();
        resolve({ dataUrl: "" });
      }
    };
    video.src = objectUrl;
  });
}

const DEFAULT_VIDEO_RULES = {
  maxSizeBytes: 100 * 1024 * 1024,
  // 100 MB
  allowedMimeTypes: ["video/mp4", "video/webm", "video/quicktime", "video/3gpp", "video/x-matroska"],
  maxDurationSeconds: 180
  // 3 minutes
};
function validateMediaFile(file, mediaType, customRules) {
  if (!file) {
    return { valid: false, error: "الملف غير موجود أو فارغ", code: "CORRUPT_FILE" };
  }
  let rules = { maxSizeBytes: 50 * 1024 * 1024 };
  {
    rules = { ...DEFAULT_VIDEO_RULES, ...customRules };
  }
  if (rules.maxSizeBytes && file.size > rules.maxSizeBytes) {
    const maxMb = Math.round(rules.maxSizeBytes / (1024 * 1024));
    return {
      valid: false,
      error: `حجم الملف يتجاوز الحد الأقصى المسموح به (${maxMb} ميجابايت)`,
      code: "FILE_TOO_LARGE"
    };
  }
  if (rules.allowedMimeTypes && rules.allowedMimeTypes.length > 0 && file.type) {
    const isAllowed = rules.allowedMimeTypes.some(
      (mime) => file.type.toLowerCase() === mime.toLowerCase() || file.type.startsWith(mime.split("/")[0] + "/")
    );
    if (!isAllowed) {
      return {
        valid: false,
        error: `نوع الملف غير مدعوم (${file.type})`,
        code: "INVALID_TYPE"
      };
    }
  }
  return { valid: true };
}

class ReelUploadService {
  async uploadReelDirect(file, caption, creatorInfo, onProgress) {
    try {
      const validation = validateMediaFile(file, "video");
      if (!validation.valid) {
        throw new Error(validation.error || "الملف المحدد ليس فيديو صالح أو يتجاوز الحجم المسموح به.");
      }
      const reelId = doc(collection(db, "reels")).id;
      const videoId = `vid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const currentAuthUser = auth.currentUser;
      const finalUserId = creatorInfo?.userId || currentAuthUser?.uid || "user_" + Date.now();
      const finalName = creatorInfo?.name || currentAuthUser?.displayName || "مستخدم IMI";
      const finalPhone = creatorInfo?.phone || currentAuthUser?.phoneNumber || "";
      const finalAvatar = creatorInfo?.avatar || currentAuthUser?.photoURL || "";
      onProgress?.(5);
      const { duration, width, height } = await this.getVideoMetadata(file);
      onProgress?.(10);
      let thumbnailUrl = "";
      try {
        const thumbResult = await extractVideoThumbnail(file, Math.min(1, duration > 0 ? duration / 2 : 0.5));
        thumbnailUrl = thumbResult.dataUrl;
      } catch (err) {
        console.warn("[REELS_UPLOAD] Could not extract video thumbnail:", err);
      }
      onProgress?.(15);
      let videoPlaybackUrl = "";
      const bucketCheck = await this.checkStorageBucketStatus();
      console.log("[REELS_UPLOAD] Storage backend status:", bucketCheck);
      if (bucketCheck.provisioned) {
        try {
          const safeExt = file.name.includes(".") ? file.name.substring(file.name.lastIndexOf(".")) : ".mp4";
          const storageRef = ref(storage, `reels/${videoId}${safeExt}`);
          const uploadTask = uploadBytesResumable(storageRef, file, {
            contentType: file.type || "video/mp4",
            customMetadata: {
              userId: finalUserId,
              uploadedAt: Date.now().toString()
            }
          });
          await new Promise((resolve, reject) => {
            const timeoutTimer = setTimeout(() => {
              uploadTask.cancel();
              reject(new Error("Firebase Storage upload timed out after 30 seconds"));
            }, 3e4);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                if (snapshot.totalBytes > 0) {
                  const pct = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 70);
                  onProgress?.(15 + pct);
                }
              },
              (err) => {
                clearTimeout(timeoutTimer);
                reject(err);
              },
              () => {
                clearTimeout(timeoutTimer);
                resolve();
              }
            );
          });
          videoPlaybackUrl = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("[REELS_UPLOAD] Uploaded to durable Firebase Storage successfully:", videoPlaybackUrl);
          this.uploadViaXhr(file, videoId, finalUserId, () => {
          }).catch((err) => {
            console.warn("[REELS_UPLOAD] Local stream caching warning:", err);
          });
        } catch (storageError) {
          console.warn("[REELS_UPLOAD] Firebase Storage upload attempt failed, falling back to streaming server:", storageError);
        }
      } else {
        console.warn(`[REELS_UPLOAD] Durable storage bucket '${bucketCheck.bucket}' is not yet provisioned on GCP: ${bucketCheck.message}`);
      }
      if (!videoPlaybackUrl) {
        try {
          videoPlaybackUrl = await this.uploadViaXhr(file, videoId, finalUserId, (pct) => {
            onProgress?.(15 + Math.round(pct * 0.7));
          });
          console.log("[REELS_UPLOAD] Stored on media streaming server:", videoPlaybackUrl);
        } catch (xhrError) {
          console.error("[REELS_UPLOAD] Media streaming server upload failed:", xhrError);
          throw new Error("فشل رفع الفيديو إلى خادم الوسائط وسحابة التخزين. يرجى التحقق من اتصال الإنترنت وإعادة المحاولة.");
        }
      }
      if (!videoPlaybackUrl || videoPlaybackUrl.startsWith("blob:") || videoPlaybackUrl.startsWith("file:") || videoPlaybackUrl.startsWith("data:") || videoPlaybackUrl.startsWith("/tmp/")) {
        throw new Error("فشل نشر الفيديو: لم يتم الحصول على رابط تشغيل دائم ومتاح.");
      }
      let finalThumbnailUrl = "";
      if (thumbnailUrl && !thumbnailUrl.startsWith("blob:")) {
        if (thumbnailUrl.startsWith("data:") && thumbnailUrl.length > 5e4) {
          finalThumbnailUrl = videoPlaybackUrl.includes("/api/reels/stream/") ? `${videoPlaybackUrl}?thumb=1` : "";
        } else {
          finalThumbnailUrl = thumbnailUrl;
        }
      } else {
        finalThumbnailUrl = videoPlaybackUrl.includes("/api/reels/stream/") ? `${videoPlaybackUrl}?thumb=1` : "";
      }
      onProgress?.(90);
      const newReel = {
        id: reelId,
        videoId,
        ownerId: finalUserId,
        userId: finalUserId,
        creatorId: finalUserId,
        creatorName: finalName,
        creatorAvatar: finalAvatar,
        creatorPhone: finalPhone,
        videoUrl: videoPlaybackUrl,
        streamUrl: videoPlaybackUrl,
        playbackUrl: videoPlaybackUrl,
        thumbnailUrl: finalThumbnailUrl,
        caption: caption.trim(),
        likesCount: 0,
        likeCount: 0,
        commentsCount: 0,
        commentCount: 0,
        sharesCount: 0,
        shareCount: 0,
        viewsCount: 0,
        viewCount: 0,
        duration: duration || 15,
        width: width || 1080,
        height: height || 1920,
        visibility: "public",
        status: "ready",
        createdAt: Date.now(),
        hashtags: this.extractHashtags(caption),
        soundTitle: "الصوت الأصلي - " + finalName
      };
      try {
        const cleaned = cleanFirestoreData(newReel);
        await setDoc(doc(db, "reels", reelId), cleaned);
      } catch (firestoreErr) {
        console.error("[REELS_UPLOAD] Firestore doc write failed:", firestoreErr);
        throw new Error("فشل تسجيل بيانات الفيديو في قاعدة البيانات بعد الرفع.");
      }
      reelsService.addReelToCache(newReel);
      onProgress?.(100);
      return newReel;
    } catch (error) {
      console.error("[REELS_UPLOAD] Error:", error);
      throw error;
    }
  }
  uploadViaXhr(file, videoId, userId, onProgressPercent) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = `/api/reels/upload-raw?videoId=${encodeURIComponent(videoId)}&fileName=${encodeURIComponent(file.name)}&userId=${encodeURIComponent(userId)}`;
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && e.total > 0) {
          const pct = Math.round(e.loaded / e.total * 100);
          onProgressPercent(pct);
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data.playbackUrl || `/api/reels/stream/${videoId}`);
          } catch {
            resolve(`/api/reels/stream/${videoId}`);
          }
        } else {
          reject(new Error(`Server responded with HTTP ${xhr.status}`));
        }
      };
      xhr.onerror = () => {
        reject(new Error("Network error during video upload"));
      };
      xhr.ontimeout = () => {
        reject(new Error("Upload request timed out"));
      };
      xhr.timeout = 18e4;
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.send(file);
    });
  }
  extractHashtags(text) {
    const regex = /#[\w\u0600-\u06FF]+/g;
    const matches = text.match(regex);
    return matches ? matches.map((tag) => tag.trim()) : [];
  }
  getVideoMetadata(file) {
    return new Promise((resolve) => {
      let resolved = false;
      const done = (data) => {
        if (resolved) return;
        resolved = true;
        resolve(data);
      };
      const timer = setTimeout(() => {
        done({ duration: 15, width: 1080, height: 1920 });
      }, 2500);
      try {
        const url = URL.createObjectURL(file);
        const video = document.createElement("video");
        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;
        video.onloadedmetadata = () => {
          clearTimeout(timer);
          const duration = Math.round(video.duration || 0);
          const width = video.videoWidth || 1080;
          const height = video.videoHeight || 1920;
          try {
            URL.revokeObjectURL(url);
          } catch {
          }
          done({ duration, width, height });
        };
        video.onerror = () => {
          clearTimeout(timer);
          try {
            URL.revokeObjectURL(url);
          } catch {
          }
          done({ duration: 15, width: 1080, height: 1920 });
        };
        video.src = url;
      } catch {
        clearTimeout(timer);
        done({ duration: 15, width: 1080, height: 1920 });
      }
    });
  }
  async checkStorageBucketStatus() {
    try {
      const res = await fetch("/api/reels/storage-status");
      if (res.ok) {
        const data = await res.json();
        return {
          provisioned: Boolean(data.isProvisioned),
          bucket: data.bucket || "cosmic-altar-m6shk.firebasestorage.app",
          message: data.message || ""
        };
      }
    } catch (e) {
      console.warn("[REELS_UPLOAD] Storage status query failed:", e);
    }
    return {
      provisioned: false,
      bucket: "cosmic-altar-m6shk.firebasestorage.app",
      message: "Unable to verify bucket connectivity"
    };
  }
}
const reelUploadService = new ReelUploadService();

function ReelsUploadModal({
  isOpen,
  onClose,
  creatorId,
  creatorName,
  creatorPhone,
  creatorAvatar,
  onUploadSuccess
}) {
  const [file, setFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [caption, setCaption] = reactExports.useState("");
  const [soundTitle, setSoundTitle] = reactExports.useState("");
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [error, setError] = reactExports.useState(null);
  const [storageStatus, setStorageStatus] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isOpen) {
      reelUploadService.checkStorageBucketStatus().then(setStorageStatus);
    }
  }, [isOpen]);
  if (!isOpen) return null;
  const handleFileSelect = (selectedFile) => {
    const val = validateMediaFile(selectedFile);
    if (!val.valid) {
      setError(val.error || "يرجى اختيار ملف فيديو صالح (MP4, WebM, MOV) بحجم لا يتجاوز 100 ميجابايت");
      return;
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(selectedFile);
    setError(null);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!file) {
      setError("الرجاء اختيار فيديو أولاً");
      return;
    }
    setIsUploading(true);
    setError(null);
    setProgress(0);
    try {
      const newReel = await reelUploadService.uploadReelDirect(
        file,
        caption,
        {
          userId: creatorId,
          name: creatorName,
          phone: creatorPhone,
          avatar: creatorAvatar
        },
        (pct) => {
          setProgress(pct);
        }
      );
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setFile(null);
      setPreviewUrl(null);
      setCaption("");
      setSoundTitle("");
      onUploadSuccess(newReel);
    } catch (err) {
      const errMsg = err?.message || "حدث خطأ أثناء رفع الفيديو";
      setError(errMsg);
    } finally {
      setIsUploading(false);
    }
  };
  const handleClose = () => {
    if (isUploading) return;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    onClose();
  };
  const addHashtag = (tag) => {
    setCaption((prev) => prev ? `${prev} ${tag}` : tag);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 dir-rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#18181B] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-white/10 flex justify-between items-center bg-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-[#2AABEE]/20 flex items-center justify-center text-[#2AABEE]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-black text-base", children: "نشر ريلز جديد" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleClose,
          disabled: isUploading,
          className: "text-slate-400 hover:text-white transition disabled:opacity-50 p-1.5 rounded-full hover:bg-white/10 cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex-1 overflow-y-auto flex flex-col gap-4", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-semibold", children: error }),
      storageStatus && !storageStatus.provisioned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-2xl flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-300 text-xs font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-amber-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ربط التخزين السحابي الدائم (Cloud Storage)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-300 leading-relaxed", children: "لتفعيل السلة السحابية الدائمة لمشروعك على Google Cloud مباشرة من هاتفك:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://console.firebase.google.com/project/cosmic-altar-m6shk/storage",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#2AABEE] hover:bg-[#229ED9] text-white rounded-xl text-xs font-bold transition shadow-md active:scale-95",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "فتح صفحة التخزين في Firebase Console" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
            ]
          }
        )
      ] }),
      storageStatus && storageStatus.provisioned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "التخزين السحابي الدائم مفعل ومتصل (Firebase Storage)" })
      ] }),
      !previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => fileInputRef.current?.click(),
          onDragOver: (e) => e.preventDefault(),
          onDrop: handleDrop,
          className: "border-2 border-dashed border-white/20 hover:border-[#2AABEE] bg-white/5 hover:bg-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-[#2AABEE]/20 flex items-center justify-center text-[#2AABEE] mb-3 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white mb-1", children: "اضغط لاختيار فيديو أو اسحبه إلى هنا" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400", children: "يدعم صيغ MP4, WebM بدقة عمودية 9:16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "video/*",
                onChange: handleFileChange,
                className: "hidden"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden bg-black border border-white/10 aspect-9/12 max-h-56 mx-auto w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            src: previewUrl,
            controls: true,
            playsInline: true,
            className: "w-full h-full object-contain"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              URL.revokeObjectURL(previewUrl);
              setPreviewUrl(null);
              setFile(null);
            },
            disabled: isUploading,
            className: "absolute top-2 left-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-500 transition cursor-pointer",
            title: "تغيير الفيديو",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-bold text-slate-300 mb-1.5", children: "الوصف والهاشتاقات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: caption,
            onChange: (e) => setCaption(e.target.value),
            disabled: isUploading,
            className: "w-full bg-white/5 border border-white/10 focus:border-[#2AABEE] rounded-xl p-3 text-white text-xs placeholder-slate-500 focus:outline-none resize-none h-20 transition",
            placeholder: "اكتب وصفاً جذاباً للفيديو وشارك ما تفكر به..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["#اكسبلور", "#ريلز", "#ترند", "#فيديو", "#IMI", "#لايف"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => addHashtag(tag),
          disabled: isUploading,
          type: "button",
          className: "px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#2AABEE]/20 hover:text-[#2AABEE] text-slate-400 text-[11px] font-semibold transition border border-white/5 cursor-pointer",
          children: tag
        },
        tag
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleUpload,
          disabled: !file || isUploading,
          className: "w-full bg-gradient-to-r from-[#2AABEE] to-[#229ED9] hover:from-sky-400 hover:to-[#2AABEE] disabled:opacity-40 text-white font-bold py-3.5 px-4 rounded-xl transition flex justify-center items-center gap-2 shadow-lg shadow-[#2AABEE]/20 cursor-pointer text-sm mt-2",
          children: isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "جارٍ المعالجة والنشر... ",
              progress,
              "%"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "نشر الفيديو الآن" })
          ] })
        }
      )
    ] })
  ] }) });
}

function ReelsPage({
  userId,
  userName,
  userPhone,
  userAvatar,
  onBack
}) {
  const navigate = useNavigate();
  const [reels, setReels] = reactExports.useState(() => reelsService.getCachedReels());
  const [activeCategory, setActiveCategory] = reactExports.useState("foryou");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isLoadingMore, setIsLoadingMore] = reactExports.useState(false);
  const [hasMore, setHasMore] = reactExports.useState(true);
  const [isUploadOpen, setIsUploadOpen] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(true);
  const [isQuotaExceeded, setIsQuotaExceeded] = reactExports.useState(false);
  const [showQuotaBanner, setShowQuotaBanner] = reactExports.useState(true);
  const isFetchingRef = React.useRef(false);
  const loadFeed = reactExports.useCallback(
    async (reset = false) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      if (reset) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      try {
        const res = await reelsService.getReelsFeed({
          pageSize: 10,
          reset,
          filterByUserId: activeCategory === "following" ? userId : void 0
        });
        setReels((prev) => {
          if (reset) {
            const map = /* @__PURE__ */ new Map();
            res.reels.forEach((r) => {
              if (r && r.id) map.set(r.id, r);
            });
            return Array.from(map.values());
          } else {
            const existingIds = new Set(prev.map((r) => r.id));
            const newUnique = res.reels.filter((r) => r && r.id && !existingIds.has(r.id));
            return [...prev, ...newUnique];
          }
        });
        setHasMore(res.hasMore);
        if (res.isQuotaExceeded) {
          setIsQuotaExceeded(true);
        }
      } catch (err) {
        console.warn("[ReelsPage] Feed load error:", err);
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [activeCategory, userId]
  );
  reactExports.useEffect(() => {
    loadFeed(true);
  }, [loadFeed]);
  const handleLoadMore = reactExports.useCallback(() => {
    loadFeed(false);
  }, [loadFeed]);
  const handleRefresh = reactExports.useCallback(() => {
    loadFeed(true);
  }, [loadFeed]);
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/");
    }
  };
  const handleUploadSuccess = (newReel) => {
    setActiveCategory("foryou");
    setReels((prev) => [newReel, ...prev.filter((r) => r.id !== newReel.id)]);
    setIsUploadOpen(false);
  };
  const handleDeleteReel = (reelId) => {
    setReels((prev) => prev.filter((r) => r.id !== reelId));
  };
  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 bg-black flex items-center justify-center overflow-hidden select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md h-full bg-black flex flex-col shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 w-full h-full z-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReelsFeed,
      {
        reels,
        currentUserId: userId,
        currentUserName: userName,
        currentUserAvatar: userAvatar,
        onDeleteReel: handleDeleteReel,
        onOpenUpload: () => setIsUploadOpen(true),
        onLoadMore: handleLoadMore,
        hasMore,
        onRefresh: handleRefresh,
        isMuted,
        onToggleMute: handleToggleMute,
        isLoading
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 z-30 px-3.5 pt-3 pb-4 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/70 via-black/30 to-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleBack,
          className: "p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer pointer-events-auto border border-white/10 shadow-lg",
          title: "العودة",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pointer-events-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveCategory("following"),
            className: `relative py-1 text-sm transition-all cursor-pointer ${activeCategory === "following" ? "text-white font-extrabold scale-105" : "text-white/60 hover:text-white/90 font-medium"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "أتابعهم" }),
              activeCategory === "following" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full shadow-sm" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20 text-xs", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveCategory("foryou"),
            className: `relative py-1 text-sm transition-all cursor-pointer ${activeCategory === "foryou" ? "text-white font-extrabold scale-105" : "text-white/60 hover:text-white/90 font-medium"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "لك" }),
              activeCategory === "foryou" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full shadow-sm" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setIsUploadOpen(true),
          className: "p-2.5 rounded-full bg-gradient-to-tr from-[#FE2C55] to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white shadow-xl transition-all transform active:scale-90 cursor-pointer pointer-events-auto border border-white/20",
          title: "نشر فيديو جديد",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5 stroke-[2.8]" })
        }
      )
    ] }),
    isQuotaExceeded && showQuotaBanner && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-16 left-3 right-3 z-35 bg-amber-500/90 backdrop-blur-md text-slate-950 p-2.5 rounded-xl shadow-xl flex items-start justify-between gap-2 text-xs font-medium animate-fade-in border border-amber-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCircle, { className: "w-4 h-4 text-slate-950 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "استخدام الذاكرة المؤقتة للريلز" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-900", children: "تم الوصول لحد الحصة اليومية، يمكنك مشاهدة الفيديوهات المتاحة بسلاسة." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowQuotaBanner(false),
          className: "p-1 hover:bg-black/10 rounded-full text-slate-950 cursor-pointer",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    isUploadOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReelsUploadModal,
      {
        isOpen: isUploadOpen,
        onClose: () => setIsUploadOpen(false),
        onUploadSuccess: handleUploadSuccess,
        creatorId: userId,
        creatorName: userName || userId,
        creatorPhone: userPhone,
        creatorAvatar: userAvatar
      }
    )
  ] }) });
}

export { ReelsPage as default };
