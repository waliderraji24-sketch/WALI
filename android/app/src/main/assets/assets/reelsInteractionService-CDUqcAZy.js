import { f as getDoc, h as doc, j as setDoc, m as updateDoc, I as increment, k as deleteDoc, x as query, n as collection, C as orderBy, y as limit, o as getDocs } from './vendor-firebase-DLAfa3Dz.js';
import { d as db } from './index-1f3YQYJq.js';

class ReelInteractionService {
  /**
   * Check if a specific user liked this reel
   */
  async isReelLiked(reelId, userId) {
    if (!reelId || !userId) return false;
    try {
      const likeDoc = await getDoc(doc(db, "reels", reelId, "likes", userId));
      return likeDoc.exists();
    } catch (err) {
      console.warn("Error checking like status:", err);
      return false;
    }
  }
  /**
   * Toggle like state for authenticated user with atomic Firestore update
   */
  async toggleLike(reelId, userId, currentlyLiked) {
    if (!reelId || !userId) return currentlyLiked;
    const newLikedState = !currentlyLiked;
    const likeRef = doc(db, "reels", reelId, "likes", userId);
    const reelRef = doc(db, "reels", reelId);
    try {
      if (newLikedState) {
        await setDoc(likeRef, {
          userId,
          createdAt: Date.now()
        });
        await updateDoc(reelRef, {
          likesCount: increment(1),
          likeCount: increment(1)
        });
      } else {
        await deleteDoc(likeRef);
        await updateDoc(reelRef, {
          likesCount: increment(-1),
          likeCount: increment(-1)
        });
      }
      return newLikedState;
    } catch (err) {
      console.error("Error updating like in Firestore:", err);
      throw err;
    }
  }
  /**
   * Fetch real comments from Firestore subcollection `reels/{reelId}/comments`
   * STRICT NO-MOCK-DATA POLICY
   */
  async getComments(reelId, pageSize = 30) {
    if (!reelId) return [];
    try {
      const q = query(
        collection(db, "reels", reelId, "comments"),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
      const snapshot = await getDocs(q);
      const comments = [];
      snapshot.docs.forEach((d) => {
        const data = d.data();
        comments.push({
          id: d.id,
          reelId,
          userId: data.userId || "",
          userName: data.userName || data.userDisplayName || "مستخدم",
          userDisplayName: data.userDisplayName || data.userName || "مستخدم",
          userAvatar: data.userAvatar || data.userPhotoURL,
          userPhotoURL: data.userPhotoURL || data.userAvatar,
          text: data.text || "",
          createdAt: data.createdAt || Date.now(),
          likesCount: data.likesCount || 0
        });
      });
      return comments;
    } catch (error) {
      console.error("Error fetching comments from Firestore:", error);
      return [];
    }
  }
  /**
   * Add a real comment by authenticated user into Firestore subcollection
   */
  async addComment(params) {
    const { reelId, userId, userName, userAvatar, text } = params;
    if (!reelId || !userId || !text.trim()) {
      throw new Error("البيانات غير مكتملة لإضافة التعليق.");
    }
    const commentId = `cmt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newComment = {
      id: commentId,
      reelId,
      userId,
      userName: userName || "مستخدم",
      userDisplayName: userName || "مستخدم",
      userAvatar,
      userPhotoURL: userAvatar,
      text: text.trim(),
      createdAt: Date.now(),
      likesCount: 0
    };
    try {
      const commentRef = doc(db, "reels", reelId, "comments", commentId);
      const reelRef = doc(db, "reels", reelId);
      await setDoc(commentRef, newComment);
      await updateDoc(reelRef, {
        commentsCount: increment(1),
        commentCount: increment(1)
      });
      return newComment;
    } catch (error) {
      console.error("Error adding comment to Firestore:", error);
      throw error;
    }
  }
  /**
   * Share reel link and increment shareCount in Firestore
   */
  async shareReel(reel) {
    if (!reel.id) return false;
    try {
      await updateDoc(doc(db, "reels", reel.id), {
        sharesCount: increment(1),
        shareCount: increment(1)
      });
    } catch (e) {
      console.warn("Share count update warning:", e);
    }
    const shareUrl = `${window.location.origin}/#/reels?reelId=${reel.id}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "شاهد هذا الريل",
          text: reel.caption || "شاهد هذا الفيديو المميز!",
          url: shareUrl
        });
        return true;
      } catch (e) {
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } catch (e) {
      return false;
    }
  }
}
const reelInteractionService = new ReelInteractionService();

class ReelsInteractionService {
  async isReelLiked(reelId, userId) {
    return reelInteractionService.isReelLiked(reelId, userId);
  }
  async toggleLike(reelId, userId, currentlyLiked) {
    return reelInteractionService.toggleLike(reelId, userId, currentlyLiked);
  }
  async getComments(reelId, pageSize = 30) {
    return reelInteractionService.getComments(reelId, pageSize);
  }
  async addComment(reelId, userId, userName, userAvatar, text) {
    return reelInteractionService.addComment({
      reelId,
      userId,
      userName,
      userAvatar,
      text
    });
  }
  async shareReel(reel) {
    return reelInteractionService.shareReel(reel);
  }
  toggleFollow(creatorId, userId, currentlyFollowed) {
    return !currentlyFollowed;
  }
}
const reelsInteractionService = new ReelsInteractionService();

export { reelsInteractionService as r };
