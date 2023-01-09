import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../trpc";

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        text: z.string({
          required_error: "Tweet text is required",
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { text } = input;
      const userId = session.user.id;
      return prisma.tweet.create({
        data: {
          text,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
});
