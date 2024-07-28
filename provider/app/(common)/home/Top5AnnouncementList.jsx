import Card from "@/components/card/Card";
import LabelType from "@/components/label/LabelType";
import fetchWithRetry from "@/functions/api";

async function getTop5Announcement() {
  const getTop5AnnouncementResponse = await fetchWithRetry(
    "/announcement/top5"
  );

  if (!getTop5AnnouncementResponse.ok)
    if (getTop5AnnouncementResponse.status === 404) return [];
    else throw new Error("공고 목록을 조회하는 중 에러가 발생했습니다.");

  const announcements = await getTop5AnnouncementResponse.json();

  return announcements.map(({ postingId, title }) => ({
    id: postingId,
    title: {
      link: `/announcement/${postingId}`,
      text: title,
    },
    label: {
      type: LabelType.Time,
      text: "마감 미설정",
    },
  }));
}

export default async function Top5AnnouncementList() {
  const announcements = await getTop5Announcement();

  return (
    <Card
      header={{ link: "/announcement", title: "공고 목록" }}
      contents={announcements}
    />
  );
}
