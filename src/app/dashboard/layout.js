import Sidebar from "@/components/ui/dashboard/Sidebar";

export default function RootLayout({ children }) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
}
