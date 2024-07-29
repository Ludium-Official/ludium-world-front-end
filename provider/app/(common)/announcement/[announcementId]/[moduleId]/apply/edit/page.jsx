import TopNavigation from "@/components/navigation/TopNavigation";
import { getApplication } from "../page";
import EditApplyForm from "./EditApplyForm";
import style from "@/app/(common)/announcement/announcement.module.css";
import TOP_NAV_TYPE from "@/components/navigation/TOP_NAV_TYPE";

export default async function EditApply({
  params: { announcementId, moduleId },
  searchParams: { role },
}) {
  const application = await getApplication(announcementId, moduleId, role);

  return (
    <>
      <TopNavigation type={TOP_NAV_TYPE.OTHERS} />
      <article className={style.editor}>
        <section className="frame-57">
          <h3>지원서 수정</h3>
        </section>
        <EditApplyForm
          announcementId={announcementId}
          detailId={moduleId}
          application={application}
        />
      </article>
    </>
  );
}
