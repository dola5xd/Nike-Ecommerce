import { getSavedCards, SavedCard } from "@/_actions/getSavedCards";
import { Button } from "@/_components/ui/Button";
import { authOptions } from "@/_lib/authOptions";
import { user } from "@/_types/user";
import { getServerSession } from "next-auth";
import CreditCard from "../_components/CreditCard";
import AddNewCard from "../_components/AddNewCard";

async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as user;
  const stripeID = user.stripeCustomerId;

  const savedCards = (await getSavedCards(stripeID)) as SavedCard[] | [];

  return (
    <div className="flex flex-col h-full col-span-4 px-4 py-6 rounded sm:px-6 md:px-10 sm:py-8 md:py-10 outline outline-light-300 gap-y-6 sm:gap-y-8 md:gap-y-10">
      {/* Header */}
      <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5 text-center md:text-left">
          <h1 className="text-heading-3">My Payments</h1>
          <p className="text-caption text-dark-700">
            Keep tracking your payment details from here.
          </p>
        </div>
        <AddNewCard user={user} />
      </div>

      {/* Cards List */}
      {savedCards.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
          {savedCards.map((card, idx) => (
            <CreditCard card={card} key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Button className="cursor-pointer text-lead">
            ✨ Let&apos;s add one now! ✨
          </Button>
        </div>
      )}
    </div>
  );
}

export default page;
