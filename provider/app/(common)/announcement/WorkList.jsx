import LABEL_TYPE from "@/components/label/LABEL_TYPE";
import RowWithButton from "@/components/table/RowWithButton";
import APPLY_CATEGORY from "@/enums/APPLY_CATEGORY";
import fetchWithRetry from "@/functions/api";
import ko_kr from "@/langs/ko_kr";
import { Fragment } from "react";
import style from "./announcement.module.css";

async function getWorkList() {
  const getWorkResponse = await fetchWithRetry("/detailed-announcement");

  if (!getWorkResponse.ok)
    if (getWorkResponse.status === 404) return [];
    else throw new Error("작업 목록을 조회하는 중 에러가 발생했습니다.");

  return getWorkResponse.json();
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

export default async function WorkList() {
  const works = await getWorkList();

  return (
    <>
      {works.map(async ({ postingId, detailId, title, status }, index) => (
        <Fragment key={detailId}>
          <RowWithButton
            label={{ type: LABEL_TYPE.Time, text: ko_kr[status] }}
            title={{ link: `/work/${detailId}`, text: title }}
            caption={{
              className: style.worker,
              text: `작업자: ${(await getWorker(detailId)) ?? "없음"}`,
            }}
            button={{
              className: style.applicate,
              link: `/announcement/${postingId}/${detailId}/apply?role=${APPLY_CATEGORY.PROVIDER}`,
              text: "지원하기",
            }}
          />
          {index < works.length - 1 ? (
            <div className="line border-gray-05" />
          ) : null}
        </Fragment>
      ))}
    </>
  );
}
