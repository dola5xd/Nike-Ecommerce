import Header from "@/_components/layout/Header";
import Invoice from "@/_components/ui/Invoice";
import UserInfo from "@/_components/ui/UserInfo";
import { authOptions } from "@/_lib/authOptions";
import { user } from "@/_types/user";
import { getServerSession } from "next-auth";
import { getSavedCards, SavedCard } from "@/_actions/getSavedCards";

async function page() {
  const user = (await getServerSession(authOptions)!)?.user as user;
  const cart = user?.cart ?? [];

  const savedCards = (await getSavedCards(user.stripeCustomerId)) as
    | SavedCard[]
    | [];

  return (
    <main className="max-h-dvh">
      <Header />
      <section className="px-20 py-5 flex gap-x-7 h-[calc(100vh-80px)]">
        <Invoice cart={cart} />
        <UserInfo savedCards={savedCards} user={user} />
      </section>
    </main>
  );
}

export default page;
