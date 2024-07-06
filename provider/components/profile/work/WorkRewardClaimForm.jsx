import { TRANSACTION_VALUES } from "@/enums/REWARD_CLAIM_STATUS";

function WorkReward({ work }) {
  return (
    <>
      <div className="frame-101-3">
        <div className={`frame-97 border-none`}>
          {/* {work.rewardToken == null || work.rewardAmount == null ? null : (
            <h4 className={`h4-20`}>
              {pending
                ? "요청중"
                : workRewardClaimStatus == null
                ? "요청 안됨"
                : TRANSACTION_VALUES[TRANSACTION_CODE[workRewardClaimStatus]]}
            </h4>
          )} */}
        </div>
      </div>
      <div className="frame-101-3">
        <div className={`frame-97 border-none`}>
          {work.status !== "APPROVE" ? (
            <button disabled={true}>
              <h4 className="h4-20">검증안됨</h4>
            </button>
          ) : work.rewardToken == null || work.rewardAmount == null ? null : (
            <button
              type="submit"
              disabled={
                [
                  TRANSACTION_CODE.READY,
                  TRANSACTION_CODE.TRANSACTION_APPROVED,
                ].includes(TRANSACTION_CODE[workRewardClaimStatus]) || pending
              }
            >
              <h4 className={`h4-20`}>
                {TRANSACTION_CODE[workRewardClaimStatus] ===
                TRANSACTION_CODE.READY
                  ? "요청중"
                  : TRANSACTION_CODE[workRewardClaimStatus] ===
                    TRANSACTION_CODE.TRANSACTION_APPROVED
                  ? "요청 완료"
                  : pending
                  ? "요청중"
                  : "보상 요청"}
              </h4>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default async function WorkRewardClaimForm({ work }) {
  return (
    <form className="reward-claim-form" action="">
      <WorkReward work={work} />
    </form>
  );
}
