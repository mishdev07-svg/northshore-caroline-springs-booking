import { env } from "cloudflare:workers";

import { getChatGPTUser, requireChatGPTUser } from "@/app/chatgpt-auth";

type RuntimeEnv = {
  ADMIN_EMAILS?: string;
};

export async function requireAdmin(returnTo: string) {
  const user = await requireChatGPTUser(returnTo);
  return isAdminEmail(user.email) ? user : null;
}

export async function getAdmin() {
  const user = await getChatGPTUser();
  return user && isAdminEmail(user.email) ? user : null;
}

function isAdminEmail(email: string) {
  const runtimeEnv = env as unknown as RuntimeEnv;
  const allowedEmails = (runtimeEnv.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(email.trim().toLowerCase());
}
