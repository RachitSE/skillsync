import "./globals.css";
import "@fontsource/sora/400.css";
import "@fontsource/inter/400.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "SkillSync",
  description: "Your AI-powered career roadmap builder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sora">
        <AuthProvider>{children}</AuthProvider> {/* ✅ Wrap here */}
      </body>
    </html>
  );
}
