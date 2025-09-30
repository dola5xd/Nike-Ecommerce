import { authOptions } from "@/_lib/authOptions";
import { getServerSession } from "next-auth";
import { AddressForm } from "@/_components/ui/AddressDialog";
import { AddressCard } from "../_components/AddressCard";
import { Button } from "@/_components/ui/Button";
import AddNewAddress from "../_components/AddNewAddress";

async function Page() {
  const session = await getServerSession(authOptions);
  const addresses = (session?.user.address || []) as AddressForm[];

  return (
    <div className="flex flex-col h-full col-span-4 px-4 py-8 rounded md:px-10 outline outline-light-300 gap-y-6">
      <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <h1 className="text-heading-3">My Address</h1>
          <p className="text-caption text-dark-700">
            Keep tracking your address from here.
          </p>
        </div>
        <AddNewAddress />
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          {addresses.map((address, idx) => (
            <AddressCard index={idx} address={address} key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1">
          <Button className="text-lead">✨ Let&apos;s add one now! ✨</Button>
        </div>
      )}
    </div>
  );
}

export default Page;
