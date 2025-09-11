import Footer from "@/_components/layout/Footer";
import Header from "@/_components/layout/Header";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default layout;
