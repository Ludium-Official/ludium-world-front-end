import BackButton from "@/components/BackButton";
import Icon from "@/components/Icon";
import fetchWithRetry from "@/functions/api";
import Link from "next/link";
import { Fragment } from "react";

export const metadata = {
  title: "공고 관리",
};

async function getAnnouncementList() {
  const getannouncementsResponse = await fetchWithRetry(`/announcement`);

  if (!getannouncementsResponse.ok) return [];

  return await getannouncementsResponse.json();
}

async function AnnouncementList() {
  const announcements = await getAnnouncementList();

  return (
    <div className="frame-119">
      {announcements.map(({ postingId, title }, index) => (
        <Fragment key={postingId}>
          <div className="frame-118">
            <div className="frame-100-2">
              <div className="frame-93-3">
                <div className="frame-4-1 background-white border-purple-01">
                  <p className="caption-12 color-purple-01">마감 미설정</p>
                </div>
                <Link
                  className="link"
                  href={`/announcement-management/${postingId}`}
                >
                  <h2 className="h4-20 color-gray-02">{title}</h2>
                </Link>
              </div>
            </div>
          </div>
          {index < announcements.length - 1 ? (
            <div className="line border-gray-05" />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

export default async function AnnouncementPage() {
  return (
    <>
      <header className="nb">
        <BackButton />
        <Link
          className="frame-56 background-white border-none link"
          href="/announcement-management/new"
        >
          <Icon
            src="/icon_plus.svg"
            alt="공고 추가하기"
            width={24}
            height={24}
          />
          <p className="h4-20 color-purple-01">추가하기</p>
        </Link>
      </header>
      <article className="wrapper">
        <div className="frame-93-7">
          <div className="frame-57">
            <h1 className="h3-24 color-black">공고 목록</h1>
          </div>
          <div className="frame-34">
            <AnnouncementList />
          </div>
        </div>
      </article>
    </>
  );
}
