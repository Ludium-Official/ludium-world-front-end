import Card from "@/components/card/Card";
import LABEL_TYPE from "@/components/label/LABEL_TYPE";
import fetchWithRetry from "@/functions/api";

async function getTop5Participation() {
  const getTop5ParticipationResponse = await fetchWithRetry("/learning/top5");

  if (!getTop5ParticipationResponse.ok)
    if (getTop5ParticipationResponse.status === 404) return [];
    else throw new Error("학습 목록을 조회하는 중 에러가 발생했습니다.");

  const participations = await getTop5ParticipationResponse.json();

  return participations.map(({ postingId, title }) => ({
    id: postingId,
    title: {
      link: `participation/${postingId}`,
      text: title,
    },
    label: {
      type: LABEL_TYPE.Time,
      text: "수강기한 미설정",
    },
  }));
}

export default async function Top5ParticipationList() {
  const participations = await getTop5Participation();

  return (
    <Card
      header={{ link: "/participation", title: "학습 목록" }}
      contents={participations}
    />
  );
}
