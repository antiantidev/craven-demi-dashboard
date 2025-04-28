import { auth } from "@/auth";

export default async function UserAvatar() {
  const session = await auth();
  console.log(session); // Kiểm tra accessToken

  if (!session?.user) return null;

  const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const data = await res.json();

  // Check nếu data là Array
  const guilds = Array.isArray(data) ? data : [];

  // Lọc guilds mình là chủ
  const ownedGuilds = guilds.filter((guild) => guild.owner);

  console.log(ownedGuilds);

  return (
    <div>
      <img src={session.user.image} alt="User Avatar" />
    </div>
  );
}
