"use server";

import HTTP_METHOD from "@/enums/HTTP_METHOD";
import { fetchPayment } from "@/functions/api";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

export async function claimMissionReward({
  missionId,
  coinNetworkId,
  amount,
  userAddress,
}) {
  const cookieStore = cookies();
  const header = headers();

  const res = await fetchPayment("/api/reward-claims", {
    method: HTTP_METHOD.POST,
    body: JSON.stringify({
      mission_id: missionId,
      coin_network_id: coinNetworkId,
      amount: amount.toString(),
      user_address: userAddress,
    }),
    headers: {
      cookie: cookieStore,
      "x-user-right": header.get("x-user-right"),
    },
  });

  if (!res.ok) {
    if (res.status === 400) {
      const result = await res.json();
      throw new Error(result.message);
    }

    throw new Error("보상을 요청하는 중 에러가 발생했습니다.");
  }

  revalidatePath("/(common)/profile/mission");
}
