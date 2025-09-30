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
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="flex flex-col px-4 py-5 md:px-10 xl:px-20 lg:flex-row gap-7">
        <div className="w-full lg:w-2/3">
          <Invoice cart={cart} />
        </div>

        <div className="w-full lg:w-1/3">
          <UserInfo savedCards={savedCards} user={user} />
        </div>
      </section>
    </main>
  );
}

export default page;
