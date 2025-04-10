"use client";
import { motion } from "framer-motion";
import LoginButton from "./LoginButton";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-20 py-4 backdrop-blur-md bg-[#0A0F2C]/70 border-b border-white/10 flex justify-between items-center"
    >
      <div className="text-white text-xl font-semibold tracking-tight">
        SkillSync
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {pathname === "/dashboard" ? (
              <Link href="/">
                <Button variant="ghost" className="text-white hover:text-blue-400">
                  Home
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:text-blue-400">
                  Dashboard
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </Button>

            <img
              src={user.photoURL ?? "/default_image.jpg"}
              alt={user.displayName ?? "User"}
              className="w-8 h-8 rounded-full border border-white/20 object-cover"
            />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </motion.nav>
  );
}
