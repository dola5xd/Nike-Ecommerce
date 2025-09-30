import { getServerSession } from "next-auth";
import AccountDetails from "../_components/AccountDetails";
import { authOptions } from "@/_lib/authOptions";
import { userDetail } from "@/_types/user";

async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as userDetail;

  return (
    <div className="flex flex-col h-full col-span-4 px-4 py-6 rounded md:px-10 md:py-10 outline outline-light-300 gap-y-8">
      <div className="space-y-1.5">
        <h1 className="text-heading-3">Account Details</h1>
        <p className="text-caption text-dark-700">
          Edit your account information from here.
        </p>
      </div>
      <AccountDetails user={user} />
    </div>
  );
}

export default Page;
