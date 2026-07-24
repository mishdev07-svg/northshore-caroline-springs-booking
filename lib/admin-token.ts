import { env } from "cloudflare:workers";

type RuntimeEnv = {
  ADMIN_TOKEN?: string;
};

export function isValidAdminToken(value: string) {
  const runtimeEnv = env as unknown as RuntimeEnv;
  const expected = runtimeEnv.ADMIN_TOKEN ?? "";

  if (!expected || value.length !== expected.length) {
    return false;
  }

  let difference = 0;
  for (let index = 0; index < value.length; index += 1) {
    difference |= value.charCodeAt(index) ^ expected.charCodeAt(index);
  }

  return difference === 0;
}
