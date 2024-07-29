import style from "@/app/(common)/announcement/announcement.module.css";
import LABEL_TYPE from "@/components/label/LABEL_TYPE";
import RowWithButton from "@/components/table/RowWithButton";
import APPLY_CATEGORY from "@/enums/APPLY_CATEGORY";
import fetchWithRetry from "@/functions/api";
import ko_kr from "@/langs/ko_kr";
import { Fragment } from "react";

async function getDetailedAnnouncementList(announcementId) {
  const getDetailedAnnouncementListResponse = await fetchWithRetry(
    `/announcement/${announcementId}/detail`
  );

  if (!getDetailedAnnouncementListResponse.ok)
    throw new Error("작업을 불러오는 중 에러가 발생했습니다.");

  return getDetailedAnnouncementListResponse.json();
}

async function getWorker(workId) {
  const getWorkerResponse = await fetchWithRetry(
    `/detailed-announcement/${workId}/worker`
  );

  if (!getWorkerResponse.ok)
    if (getWorkerResponse.status === 404) return null;
    else throw new Error(500);

  const { usrId } = await getWorkerResponse.json();

  const getUserResponse = await fetchWithRetry(`/user/${usrId}`);

  if (!getUserResponse.ok) throw new Error(500);

  const { nick } = await getUserResponse.json();

  return nick;
}

export default async function ({ announcementId }) {
  const detailedAnnouncements = await getDetailedAnnouncementList(
    announcementId
  );

  return (
    <>
      {detailedAnnouncements.map(async ({ detailId, title, status }, index) => (
        <Fragment key={detailId}>
          <RowWithButton
            label={{ type: LABEL_TYPE.Time, text: ko_kr[status] }}
            title={{
              link: `/announcement/${announcementId}/${detailId}`,
              text: title === "" ? "작업 제목을 입력해주세요" : title,
            }}
            caption={{
              className: style.worker,
              text: `작업자: ${(await getWorker(detailId)) ?? "없음"}`,
            }}
            button={{
              className: style.applicate,
              link: `/announcement/${announcementId}/${detailId}/apply?role=${APPLY_CATEGORY.PROVIDER}`,
              text: "지원하기",
            }}
          />
          {index < detailedAnnouncements.length - 1 ? (
            <div className="line border-gray-05" />
          ) : null}
        </Fragment>
      ))}
    </>
  );
}
