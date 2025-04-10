"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function LoginButton() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
        });
      }

      console.log("User saved to Firestore ✅");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
    >
      Sign in with Google
    </button>
  );
}
