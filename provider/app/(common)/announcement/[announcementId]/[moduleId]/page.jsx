import Icon from "@/components/Icon";
import TOP_NAV_TYPE from "@/components/navigation/TOP_NAV_TYPE";
import TopNavigation from "@/components/navigation/TopNavigation";
import APPLY_CATEGORY from "@/enums/APPLY_CATEGORY";
import fetchWithRetry from "@/functions/api";
import { getDate } from "@/functions/helper";
import dynamic from "next/dynamic";
import Link from "next/link";
import style from "@/app/(common)/announcement/announcement.module.css";

const Viewer = dynamic(() => import("@/components/Viewer"), { ssr: false });

async function getDetailedAnnouncement(announcementId, detailedAnnouncement) {
  const getMakeResponse = await fetchWithRetry(
    `/announcement/${announcementId}/${detailedAnnouncement}`
  );

  if (!getMakeResponse.ok) return [];

  return await getMakeResponse.json();
}

export async function DetailedAnnouncement({ announcementId, moduleId }) {
  const detailedAnnouncement = await getDetailedAnnouncement(
    announcementId,
    moduleId
  );

  return (
    <article className={style["divided-viewer"]}>
      <section>
        <div className="frame-101">
          <div className={`${style["frame-9"]}`}>
            <div className={`${style["frame-145"]} frame-145`}>
              <h4>{detailedAnnouncement.title}</h4>
            </div>
            <div className={`${style["frame-9-2"]}`}>
              <p>작성일: {getDate(detailedAnnouncement.createAt)}</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="frame-120">
          <Viewer content={detailedAnnouncement.description} />
        </div>
      </section>
    </article>
  );
}

export default async function DetailedAnnouncementPage({
  params: { announcementId, moduleId },
}) {
  return (
    <>
      <TopNavigation
        type={TOP_NAV_TYPE.OTHERS}
        right={
          <Link
            href={`/announcement/${announcementId}/${moduleId}/apply?role=${APPLY_CATEGORY.PROVIDER}`}
          >
            <Icon src="/icon_plus.png" alt="추가하기" width={24} height={24} />
            <h4>지원하기</h4>
          </Link>
        }
      />
      <DetailedAnnouncement
        announcementId={announcementId}
        moduleId={moduleId}
      />
    </>
  );
}
