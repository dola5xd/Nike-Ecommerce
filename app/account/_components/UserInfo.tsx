import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { user } from "@/_types/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/authOptions";
import { getUser } from "@/_actions/getUser";

async function UserInfo() {
  const session = await getServerSession(authOptions);
  const user = (await getUser(session?.user.id ?? "")) as user;

  const { name, email, image } = user;

  return (
    <div className="flex items-center w-full gap-x-2">
      <Avatar className="w-20 h-20">
        <AvatarImage src={image} className="object-cover" />
        <AvatarFallback className="text-center uppercase futura text-lead">
          {name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="uppercase text-heading-3 futura">{name}</h1>
        <h2 className="text-caption">{email}</h2>
      </div>
    </div>
  );
}

export default UserInfo;
