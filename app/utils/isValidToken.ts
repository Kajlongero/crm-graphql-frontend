import { cookies } from "next/headers";
import { IS_VALID_TOKEN } from "../querys/auth-query";
import { customClientWithHeaders } from "@/config/apollo-ssr";

export async function isValidToken(token: string) {
  const { data } = await customClientWithHeaders({}).query({
    query: IS_VALID_TOKEN,
    variables: {
      token: token,
    }
  });

  return data.isValidToken;
}