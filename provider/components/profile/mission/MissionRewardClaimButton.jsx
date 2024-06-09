"use client";

import { claimMissionReward } from "@/app/actions/payment";
import { TRANSACTION_CODE } from "@/enums/REWARD_CLAIM_STATUS";
import { useNearWallet } from "@/hooks/wallet";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ rewardClaimStatus }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={TRANSACTION_CODE[rewardClaimStatus] === 1 || pending}
    >
      <h4 className={`h4-20`}>
        {TRANSACTION_CODE[rewardClaimStatus] === 1
          ? "요청 완료"
          : pending
          ? "요청중"
          : "보상 요청"}
      </h4>
    </button>
  );
};

export default function MissionRewardClaimButton({
  missionId,
  coinNetworkId,
  amount,
  rewardClaimStatus,
}) {
  const { accountId } = useNearWallet();

  const handleClaim = async () => {
    try {
      await claimMissionReward({
        missionId,
        coinNetworkId,
        amount,
        userAddress: accountId,
        rewardClaimStatus,
      });

      alert("보상 요청이 승인되었습니다.");
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handleClaim}>
      <SubmitButton rewardClaimStatus={rewardClaimStatus} />
    </form>
  );
}
