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
      <div className="d-flex align-items-center justify-content-center">
        {children}
      </div>
    </>
  );
}
