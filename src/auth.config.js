import Discord from "next-auth/providers/discord";

export default {
  providers: [
    Discord({
      authorization: {
        params: {
          scope: "identify guilds email",
        },
      },
    }),
  ],
};
