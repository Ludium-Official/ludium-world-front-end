"use client";

import { claimMissionReward } from "@/app/actions/payment";
import { useNearWallet } from "@/hooks/wallet";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      <h4 className={`h4-20`}>{pending ? "요청중" : "보상 요청"}</h4>
    </button>
  );
};

export default function MissionRewardClaimButton({
  missionId,
  coinNetworkId,
  amount,
}) {
  const { accountId } = useNearWallet();

  const handleClaim = async () => {
    try {
      await claimMissionReward({
        missionId,
        coinNetworkId,
        amount,
        userAddress: accountId,
      });

      alert("보상 요청이 승인되었습니다.");
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handleClaim}>
      <SubmitButton />
    </form>
  );
}
