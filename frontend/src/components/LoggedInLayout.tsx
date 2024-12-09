import Navbar from "./Navbar";

export default function LoggedInLayout({ children } : { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
