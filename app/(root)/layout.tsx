import NavbarPage from "@/components/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarPage />
      {children}
    </>
  );
}
