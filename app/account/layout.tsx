import Header from "@/_components/layout/Header";
import { ReactNode } from "react";
import UserInfo from "./_components/UserInfo";
import Tabs from "./_components/Tabs";

function layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh">
      <Header />
      <section className="h-[calc(100vh-160px)] flex flex-col w-screen gap-10 px-32 py-10">
        <UserInfo />
        <div className="grid items-start w-full grid-cols-5 gap-x-4">
          <Tabs />
          {children}
        </div>
      </section>
    </main>
  );
}

export default layout;
