import Link from "next/link";
import ContentNavigation from "../../../components/ContentNavigation";
import Viewer from "../../../components/Viewer";
import fetchWithRetry from "../../../functions/api";
import announcementstyle from "../announcement.module.css";
import { ModuleViewer } from "./module/[moduleId]/page";
import ModuleCreateButton from "./ModuleCreateButton";

export const metadata = {
    title: "공고"
}

export async function getAnnouncement(announcementId) {
    const getAnnouncementResponse = await fetchWithRetry(`/announcement/${announcementId}`);

    if (!getAnnouncementResponse.ok) return null;

    return await getAnnouncementResponse.json();
}

export default async function AnnouncementPage({ params: { announcementId } }) {
    const announcement = await getAnnouncement(announcementId);
    const links = [{
        href: "/announcement",
        text: "돌아가기"
    }, {
        href: `/announcement/${announcementId}/edit`,
        text: "수정하기"
    }]

    return <>
        <ContentNavigation links={links} />
        <article className={announcementstyle.wrapper}>
            <h1 className={announcementstyle.title}>{announcement.title}</h1>
            <section className={announcementstyle["content-area"]}>
                <Viewer content={announcement.content} height="100%" />
            </section>
            <h2 className={announcementstyle["title-label"]}>모듈 목록</h2>
            <ModuleCreateButton announceId={announcementId} />
            <section className={`${announcementstyle["announcement-list"]} ${announcementstyle["module-list"]}`}>
                {announcement.modules.map(module => <div key={crypto.randomUUID()} >
                    <ContentNavigation links={[{
                        href: `/announcement/${announcementId}/module/${module.id}`,
                        text: "모듈보기"
                    }]}/>
                    <ModuleViewer announcementId={announcementId} moduleId={module.id} />
                </div>)}
            </section>
        </article>
    </>
}