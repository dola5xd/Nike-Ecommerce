import { getServerSession } from "next-auth";
import AccountDetails from "../_components/AccountDetails";
import { authOptions } from "@/_lib/authOptions";
import { userDetail } from "@/_types/user";

async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as userDetail;
  return (
    <div className="flex flex-col h-full col-span-4 px-10 py-10 rounded outline outline-light-300 gap-y-10">
      <div className="space-y-1.5">
        <h1 className="text-heading-3">Account Details</h1>
        <p className="text-caption text-dark-700">
          Edit your account information from here.
        </p>
      </div>{" "}
      <AccountDetails user={user} />
    </div>
  );
}

export default page;
