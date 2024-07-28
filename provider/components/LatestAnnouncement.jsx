import fetchWithRetry from "@/functions/api";
import TopNavigation from "./navigation/TopNavigation";

async function getLatestAnnouncement() {
  const getLatestAnnouncementResponse = await fetchWithRetry(
    "/content/latest-announcement"
  );

  if (!getLatestAnnouncementResponse.ok) {
    if (getLatestAnnouncementResponse.status === 404) {
      return null;
    } else {
      throw new Error("최신 공지사항을 조회하는 중 에러가 발생했습니다.");
    }
  }

  return await getLatestAnnouncementResponse.json();
}

export default async function LatestAnnouncement() {
  const latestAnnouncement = await getLatestAnnouncement();

  return (
    <TopNavigation
      link={
        latestAnnouncement == null
          ? "/"
          : `/community/${latestAnnouncement.contentId}`
      }
      title={
        latestAnnouncement == null
          ? "최신 공지 데이터가 없습니다."
          : latestAnnouncement.title
      }
    />
  );
}
