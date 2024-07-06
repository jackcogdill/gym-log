import "./styles.scss";
import Protected from "./protected";
import type { Metadata } from "next";
import { AuthProvider } from "../lib/context/auth";

export const metadata: Metadata = {
  title: "Gym Log",
  description: "Log your gym sessions",
};

const themeScript = `
  (() => {
    function setTheme(theme) {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }

    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    themeQuery.onchange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    setTheme(themeQuery.matches ? "dark" : "light");
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-100">
      <body className="h-100">
        <script dangerouslySetInnerHTML={{ __html: themeScript }}></script>
        <AuthProvider>
          <main className="h-100 container py-4">
            <Protected>{children}</Protected>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
