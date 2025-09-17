import { getSavedCards, SavedCard } from "@/_actions/getSavedCards";
import { Button } from "@/_components/ui/button";
import { ScrollArea } from "@/_components/ui/scroll-area";
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
    <div className="flex flex-col h-full col-span-4 px-10 py-10 rounded outline outline-light-300 gap-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h1 className="text-heading-3">My Payments</h1>
          <p className="text-caption text-dark-700">
            Keep tracking your payments details from here.
          </p>
        </div>
        <AddNewCard user={user} />
      </div>

      {savedCards.length > 0 ? (
        <ScrollArea className="max-h-[370px] pr-4">
          <div className="grid grid-cols-3 gap-4">
            {savedCards.map((card, idx) => (
              <CreditCard card={card} key={idx} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <Button className="h-full text-center cursor-pointer text-lead">
          ✨ Let&apos;s add one now! ✨
        </Button>
      )}
    </div>
  );
}

export default page;
