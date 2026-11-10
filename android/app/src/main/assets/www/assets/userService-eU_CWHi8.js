import { d as db } from './index-1f3YQYJq.js';
import { f as getDoc, h as doc, x as query, n as collection, z as where, y as limit, o as getDocs } from './vendor-firebase-DLAfa3Dz.js';

async function findRegisteredUserByPhone(searchQuery, excludeUserId) {
  const queryTrim = searchQuery.trim();
  if (!queryTrim || queryTrim.length < 3) return null;
  try {
    if (queryTrim.length >= 10 && !queryTrim.includes(" ")) {
      const directDoc = await getDoc(doc(db, "users", queryTrim));
      if (directDoc.exists() && directDoc.id !== excludeUserId) {
        const data = directDoc.data();
        return {
          id: directDoc.id,
          authUid: data.authUid || directDoc.id,
          displayName: data.displayName || "مستخدم IMI",
          phoneNumber: data.phoneNumber || directDoc.id,
          photoURL: data.photoURL,
          about: data.about,
          online: !!data.online,
          lastSeen: data.lastSeen
        };
      }
    }
    const cleanDigits = queryTrim.replace(/\D/g, "");
    const cleanNoLeadingZero = cleanDigits.replace(/^0+/, "");
    const candidates = /* @__PURE__ */ new Set();
    candidates.add(queryTrim);
    if (queryTrim.startsWith("+")) {
      candidates.add(queryTrim);
    } else {
      candidates.add(`+${queryTrim}`);
    }
    if (cleanDigits) {
      candidates.add(cleanDigits);
      candidates.add(`+${cleanDigits}`);
      candidates.add(`+212${cleanNoLeadingZero}`);
      candidates.add(`+966${cleanNoLeadingZero}`);
      candidates.add(`+20${cleanNoLeadingZero}`);
      candidates.add(`+971${cleanNoLeadingZero}`);
      candidates.add(`+213${cleanNoLeadingZero}`);
      candidates.add(`+216${cleanNoLeadingZero}`);
      candidates.add(cleanNoLeadingZero);
      if (cleanDigits.startsWith("0")) {
        candidates.add(cleanDigits);
      } else {
        candidates.add(`0${cleanDigits}`);
      }
    }
    for (const candidate of candidates) {
      const q = query(
        collection(db, "users"),
        where("phoneNumber", "==", candidate),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const docSnap = snap.docs[0];
        if (docSnap.id !== excludeUserId && docSnap.data().authUid !== excludeUserId) {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            authUid: data.authUid || docSnap.id,
            displayName: data.displayName || "مستخدم IMI",
            phoneNumber: data.phoneNumber,
            photoURL: data.photoURL,
            about: data.about,
            online: !!data.online,
            lastSeen: data.lastSeen
          };
        }
      }
    }
    if (cleanNoLeadingZero) {
      const qNational = query(
        collection(db, "users"),
        where("nationalPhone", "==", cleanNoLeadingZero),
        limit(1)
      );
      const snapNat = await getDocs(qNational);
      if (!snapNat.empty) {
        const docSnap = snapNat.docs[0];
        if (docSnap.id !== excludeUserId && docSnap.data().authUid !== excludeUserId) {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            authUid: data.authUid || docSnap.id,
            displayName: data.displayName || "مستخدم IMI",
            phoneNumber: data.phoneNumber,
            photoURL: data.photoURL,
            about: data.about,
            online: !!data.online,
            lastSeen: data.lastSeen
          };
        }
      }
    }
    if (cleanDigits.length >= 7) {
      const qClean = query(
        collection(db, "users"),
        where("cleanDigits", "==", cleanDigits),
        limit(1)
      );
      const snapClean = await getDocs(qClean);
      if (!snapClean.empty) {
        const docSnap = snapClean.docs[0];
        if (docSnap.id !== excludeUserId && docSnap.data().authUid !== excludeUserId) {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            authUid: data.authUid || docSnap.id,
            displayName: data.displayName || "مستخدم IMI",
            phoneNumber: data.phoneNumber,
            photoURL: data.photoURL,
            about: data.about,
            online: !!data.online,
            lastSeen: data.lastSeen
          };
        }
      }
    }
  } catch (err) {
    console.warn("Error finding user by phone:", err);
  }
  return null;
}

export { findRegisteredUserByPhone as f };
