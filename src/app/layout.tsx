import type { Metadata } from "next";

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
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }}></script>
        <main className="container py-4">{children}</main>
      </body>
    </html>
  );
}
