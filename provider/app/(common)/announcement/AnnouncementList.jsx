import LABEL_TYPE from "@/components/label/LABEL_TYPE";
import Row from "@/components/table/Row";
import fetchWithRetry from "@/functions/api";
import { Fragment } from "react";

async function getAnnouncementList() {
  const getannouncementsResponse = await fetchWithRetry(`/announcement`);

  if (!getannouncementsResponse.ok) return [];

  return await getannouncementsResponse.json();
}

export default async function AnnouncementList() {
  const announcements = await getAnnouncementList();

  return (
    <>
      {announcements.map(({ postingId, title }, index) => (
        <Fragment key={postingId}>
          <Row
            label={{ type: LABEL_TYPE.Time, text: "마감 미설정" }}
            title={{ link: `/announcement/${postingId}`, text: title }}
            fixed={{ label: { type: LABEL_TYPE.Default, text: "진행중" } }}
          />
          {index < announcements.length - 1 ? (
            <div className="line border-gray-05" />
          ) : null}
        </Fragment>
      ))}
    </>
  );
}
