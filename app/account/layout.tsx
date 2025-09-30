import Header from "@/_components/layout/Header";
import { ReactNode } from "react";
import UserInfo from "./_components/UserInfo";
import Tabs from "./_components/Tabs";

function layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col min-h-dvh">
      <Header />

      <section className="flex flex-col flex-1 w-full gap-3 px-6 py-6 md:gap-10 lg:flex-row md:px-16">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-10 h-fit lg:w-1/4">
          <UserInfo />
          <Tabs />
        </aside>

        <div className="flex-1 w-full">{children}</div>
      </section>
    </main>
  );
}

export default layout;
