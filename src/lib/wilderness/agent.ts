import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const message = z.object({ speaker: z.enum(["you", "clerk", "court", "accuser"]), content: z.string().max(1200) });
const caseFile = z.object({
  title: z.string().max(160),
  problem: z.string().max(4000),
  recurringPattern: z.string().max(2000),
  pressurePoints: z.string().max(1200),
  desiredAuthority: z.string().max(1200),
});
const input = z.object({
  kind: z.enum(["clerk", "accuser", "clarify"]),
  caseFile,
  selected: z.array(z.string().max(60)).max(3),
  messages: z.array(message).max(10),
  response: z.string().max(2000),
  step: z.number().int().min(0).max(6),
});

export type WildernessAgentInput = z.infer<typeof input>;

export const getWildernessReply = createServerFn({ method: "POST" })
  .validator((value: unknown) => input.parse(value))
  .handler(async ({ data }) => {
    const { generateWildernessReply } = await import("./agent.server");
    return generateWildernessReply(data);
  });
