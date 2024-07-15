import Header from "../header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="mb-5">
        <Header />
      </div>
      <div className="container" style={{ maxWidth: "600px" }}>
        {children}
      </div>
    </>
  );
}
