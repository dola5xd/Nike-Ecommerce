import { authOptions } from "@/_lib/authOptions";
import { getServerSession } from "next-auth";
import { AddressForm } from "@/_components/ui/AddressDialog";
import { AddressCard } from "../_components/AddressCard";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/_components/ui/button";
import AddNewAddress from "../_components/AddNewAddress";

async function Page() {
  const session = await getServerSession(authOptions);
  const addresses = (session?.user.address || []) as AddressForm[];

  return (
    <div className="flex flex-col h-full col-span-4 px-10 py-10 rounded outline outline-light-300 gap-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h1 className="text-heading-3">My Address</h1>
          <p className="text-caption text-dark-700">
            Keep tracking your address from here.
          </p>
        </div>
        <AddNewAddress />
      </div>
      {addresses.length > 0 ? (
        <ScrollArea className="max-h-[320px] pr-4">
          <div className="grid grid-cols-2 gap-4">
            {addresses.map((address, idx) => (
              <AddressCard index={idx} address={address} key={idx} />
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

export default Page;
