import LoggedInNavbar from "@/components/LoggedInNavbar";

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoggedInNavbar />
      {children}
    </>
  );
}
