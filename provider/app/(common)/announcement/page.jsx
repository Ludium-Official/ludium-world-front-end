import TOP_NAV_TYPE from "@/components/navigation/TOP_NAV_TYPE";
import TopNavigation from "@/components/navigation/TopNavigation";
import dynamic from "next/dynamic";
import style from "./announcement.module.css";
import CardTitle from "@/components/card/CardTitle";

const AnnouncementList = dynamic(() => import("./AnnouncementList"), {
  loading: () => <p>공고를 조회하는 중입니다...</p>,
});

const WorkList = dynamic(() => import("./WorkList"), {
  loading: () => <p>작업을 불러오는 중입니다...</p>,
});

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_MAP_URL,
  title: "웹 3.0 프로젝트 공고",
  description: "웹 3.0 프로젝트 최신 공고 및 기회를 확인하세요.",
  openGraph: {
    title: "웹 3.0 프로젝트 공고",
    description: "웹 3.0 프로젝트 최신 공고 및 기회를 확인하세요.",
    url: process.env.NEXT_PUBLIC_SITE_MAP_URL,
    siteName: "루디움",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "logo1.png",
        width: 70,
        height: 32,
        alt: "루디움",
      },
    ],
  },
};

export default async function AnnouncementPage() {
  return (
    <>
      <TopNavigation type={TOP_NAV_TYPE.OTHERS} />
      <article className="wrapper">
        <div className="frame-93-7">
          <div className={style.title}>
            <h3>공고 수행</h3>
          </div>
          <section className={style.list}>
            <CardTitle className={style["row-title"]} title="공고 목록" />
            <AnnouncementList />
          </section>
          <section className={style.list}>
            <CardTitle className={style["row-title"]} title="작업 목록" />
            <WorkList />
          </section>
        </div>
      </article>
    </>
  );
}
