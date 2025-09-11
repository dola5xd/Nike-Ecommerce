import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { authOptions } from "@/_lib/authOptions";
import { userDetail } from "@/_types/user";
import { getServerSession } from "next-auth";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/_components/ui/tabs";
import { contentTabs } from "@/_data/accountTabs";
import { getUser } from "@/_actions/getUser";

async function page() {
  const session = await getServerSession(authOptions);
  const user = (await getUser(session?.user.id ?? "")) as userDetail;

  const { name, email, image } = user;

  return (
    <main className="px-32 py-10 w-screen flex flex-col gap-10">
      <div className="flex items-center w-full gap-x-2">
        <Avatar className="w-20 h-20">
          <AvatarImage src={image} className="object-cover" />
          <AvatarFallback className="text-center">{name}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="uppercase text-heading-3 futura">{name}</h1>
          <h2 className="text-caption">{email}</h2>
        </div>
      </div>
      {/* tabs */}
      <Tabs
        defaultValue={"orders"}
        className="max-w-3xl rounded w-fit ring-1 ring-light-300 gap-y-10"
      >
        <TabsList className="bg-transparent">
          {contentTabs.map((tab, i) => (
            <TabsTrigger value={tab.value} key={i}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {contentTabs.map((tab, i) => {
          const Content = tab.content;
          return (
            <TabsContent value={tab.value} key={i}>
              <Content user={user} />
            </TabsContent>
          );
        })}
      </Tabs>
    </main>
  );
}

export default page;
