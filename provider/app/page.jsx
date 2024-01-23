import Icon from "@/components/Icon";
import LatestAnnouncement from "@/components/LatestAnnouncement";
import fetchWithRetry from "@/functions/api";
import Link from "next/link";
import { Fragment } from "react";

export const metadata = {
  title: "루디움",
  description:
    "공지사항 그리고 전반적인 Web3.0에 대한 정보들을 찾아 볼 수 있어.",
};

async function getTop5Announcement() {
  const getTop5AnnouncementResponse = await fetchWithRetry(
    "/announcement/top5"
  );

  if (!getTop5AnnouncementResponse.ok)
    if (getTop5AnnouncementResponse.status === 404) return [];
    else throw new Error("공고 목록을 조회하는 중 에러가 발생했습니다.");

  return await getTop5AnnouncementResponse.json();
}

async function getTop5Participation() {
  const getTop5ParticipationResponse = await fetchWithRetry("/learning/top5");

  if (!getTop5ParticipationResponse.ok)
    if (getTop5ParticipationResponse.status === 404) return [];
    else throw new Error("학습 목록을 조회하는 중 에러가 발생했습니다.");

  return await getTop5ParticipationResponse.json();
}

async function AnnouncementList() {
  const announcements = await getTop5Announcement();

  return (
    <article className="article-list-wrapper">
      <header className="article-announce">
        <h1 className="article-list-text h3-24">공고 목록</h1>
        <Link className="article-list-more" href="/announcement">
          <p className="article-list-more-text p1-18">모두 보기</p>
          <div className="article-list-more-icon">
            <Icon
              src="/icon_arrow_right.svg"
              alt="more"
              width={12}
              height={12}
            />
          </div>
        </Link>
      </header>
      <main className="article-list">
        {announcements.map((announcement, index) => (
          <Fragment key={announcement.postingId}>
            <section className="article">
              <div className="article-status">
                <p className="article-status-text caption-12 color-purple-01">
                  마감 N일전
                </p>
              </div>
              <Link
                className="article-text h4-20"
                href={`/announcement/${announcement.postingId}`}
              >
                {announcement.title}
              </Link>
            </section>
            {index < announcements.length - 1 ? (
              <div className="article-divider" />
            ) : null}
          </Fragment>
        ))}
      </main>
    </article>
  );
}

async function ParticipationList() {
  const participations = await getTop5Participation();

  return (
    <article className="article-list-wrapper">
      <header className="article-announce">
        <h1 className="article-list-text h3-24">학습 목록</h1>
        <Link className="article-list-more" href="/participation">
          <p className="article-list-more-text p1-18">모두 보기</p>
          <div className="article-list-more-icon">
            <Icon
              src="/icon_arrow_right.svg"
              alt="more"
              width={12}
              height={12}
            />
          </div>
        </Link>
      </header>
      <main className="article-list">
        {participations.map((participation, index) => (
          <Fragment key={participation.postingId}>
            <section className="article">
              <div className="article-status">
                <p className="article-status-text caption-12 color-purple-01">
                  수강기한 31일
                </p>
              </div>
              <Link
                className="article-text h4-20"
                href={`/participation/${participation.postingId}`}
              >
                {participation.title}
              </Link>
            </section>
            {index < participations.length - 1 ? (
              <div className="article-divider" />
            ) : null}
          </Fragment>
        ))}
      </main>
    </article>
  );
}

async function Content() {
  return (
    <article className="home-content">
      <div className="banner">
        <h1 style={{ textAlign: "center" }}>배너 작업중...</h1>
      </div>
      <div className="content-article">
        <AnnouncementList />
        <ParticipationList />
      </div>
    </article>
  );
}

export default async function Page() {
  return (
    <>
      <LatestAnnouncement />
      <Content />
    </>
  );
}
