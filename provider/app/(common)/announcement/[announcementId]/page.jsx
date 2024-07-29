import style from "@/app/(common)/announcement/announcement.module.css";
import CardTitle from "@/components/card/CardTitle";
import LABEL_TYPE from "@/components/label/LABEL_TYPE";
import TOP_NAV_TYPE from "@/components/navigation/TOP_NAV_TYPE";
import TopNavigation from "@/components/navigation/TopNavigation";
import RowWithButton from "@/components/table/RowWithButton";
import Viewer from "@/components/Viewer";
import fetchWithRetry from "@/functions/api";
import dynamic from "next/dynamic";

const DetailedAnnouncementList = dynamic(
  () => import("./DetailedAnnouncementList"),
  {
    loading: () => (
      <RowWithButton
        label={{ type: LABEL_TYPE.Time, text: "조회중" }}
        title={{
          link: "javascript:void(0)",
          text: "작업을 조회하는 중입니다...",
        }}
        loading={true}
        loadingClassName={style.loading}
      />
    ),
  }
);

export async function generateMetadata({ params: { announcementId } }) {
  const announcement = await getAnnouncement(announcementId);

  return {
    title: announcement.title,
  };
}

export async function getAnnouncement(announcementId) {
  const getAnnouncementResponse = await fetchWithRetry(
    `/announcement/${announcementId}`
  );

  if (!getAnnouncementResponse.ok)
    throw new Error("공고를 불러오는 중 에러가 발생했습니다.");

  return await getAnnouncementResponse.json();
}

export default async function AnnouncementPage({ params: { announcementId } }) {
  const announcement = await getAnnouncement(announcementId);

  return (
    <>
      <TopNavigation type={TOP_NAV_TYPE.OTHERS} />
      <article className="wrapper">
        <div className="frame-93">
          <div className={style.title}>
            <h3>공고</h3>
          </div>
          <section className={style.viewer}>
            <div className={style["viewer-title"]}>
              <div>
                <h4>{announcement.title}</h4>
              </div>
            </div>
            <div className="line border-gray-05" />
            <div className={style["viewer-contents"]}>
              <Viewer content={announcement.description} height="100%" />
            </div>
          </section>
          <section className={style.list}>
            <CardTitle className={style["row-title"]} title="작업 목록" />
            <DetailedAnnouncementList announcementId={announcementId} />
          </section>
        </div>
      </article>
    </>
  );
}
