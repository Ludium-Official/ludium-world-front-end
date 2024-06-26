import BackButton from "@/components/BackButton";
import WorkContentEditor from "./WorkContentEditor";
import fetchWithRetry from "@/functions/api";
import { Fragment } from "react";
import UserNick from "@/components/UserNick";
import { getTimeStamp } from "@/functions/helper";
import dynamic from "next/dynamic";
import WorkContentCommentEditor from "./WorkContentCommentEditor";
import WorkContentSubmitButton from "./WorkContentSubmitButton";
import { cookies } from "next/headers";
import UnAuthorizedError from "@/errors/UnAuthorizedError";

const Viewer = dynamic(() => import("@/components/Viewer"), { ssr: false });

export async function generateMetadata({ params: { workId, contentId } }) {
  const detailContent = await getWorkContent(workId, contentId);

  return {
    title: detailContent.title,
    description: detailContent.description,
  };
}

async function getWorkContent(workId, contentId) {
  const getWorkContentResponse = await fetchWithRetry(
    `/detailed-announcement/${workId}/${contentId}`
  );

  if (!getWorkContentResponse.ok)
    if (getWorkContentResponse.status === 404) throw new Error(404);
    else throw new Error(500);

  return await getWorkContentResponse.json();
}

async function getWorkContentCommentList(workId, contentId) {
  const getWorkContentCommentListResponse = await fetchWithRetry(
    `/detailed-announcement/${workId}/${contentId}/comment`
  );

  if (!getWorkContentCommentListResponse.ok)
    if (getWorkContentCommentListResponse.status === 404) return [];
    else throw new Error(500);

  return await getWorkContentCommentListResponse.json();
}

async function getProfile() {
  const cookieStore = cookies();

  try {
    const getProfileResponse = await fetchWithRetry(`/profile`, {
      headers: {
        cookie: cookieStore,
      },
    });

    if (!getProfileResponse.ok)
      throw new Error("프로필을 불러오는 중 에러가 발생했습니다.");

    return await getProfileResponse.json();
  } catch (error) {
    if (error instanceof UnAuthorizedError) return null;
    else throw new Error(error.message);
  }
}

async function getWorker(workId) {
  const getWorkerResponse = await fetchWithRetry(
    `/detailed-announcement/${workId}/worker`
  );
  const getCoWorkerListResponse = await fetchWithRetry(
    `/detailed-announcement/${workId}/co-worker`
  );

  if (!getWorkerResponse.ok)
    if (getWorkerResponse.status === 404) return null;
    else throw new Error(500);

  const worker = await getWorkerResponse.json();

  if (!getCoWorkerListResponse.ok) {
    if (getCoWorkerListResponse.status === 404) return [worker?.usrId];
    else throw new Error(500);
  }

  const coWorkerList = await getCoWorkerListResponse.json();

  return [worker?.usrId, ...coWorkerList.map(({ usrId }) => usrId)];
}

async function WorkContentCommentList({ workId, contentId }) {
  const comments = await getWorkContentCommentList(workId, contentId);

  return (
    <div className="frame-143">
      {comments.map((comment, index) => (
        <Fragment key={comment.detailedContentCommentId}>
          <div className="frame-142">
            <div className="frame-140">
              <div className="frame-10">
                <div className="frame-141">
                  <h3 className="h5-18">
                    <UserNick usrId={comment.usrId} />
                  </h3>
                  <div className="frame-9-3">
                    <p className="caption-12">
                      {getTimeStamp(comment.createAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="background-white comment-viewer">
              <Viewer content={comment.description} height="100%" />
            </div>
          </div>
          {index < comments.length - 1 ? (
            <div className="line border-gray-05" />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

export default async function WorkContentPage({
  params: { workId, contentId },
}) {
  const detailContent = await getWorkContent(workId, contentId);

  const workers = await getWorker(workId);
  const profile = await getProfile();

  const isEditor = profile === null ? false : workers?.includes(profile.id);
  return (
    <>
      <header className="nb">
        <BackButton />
        <WorkContentSubmitButton detailContent={detailContent} />
      </header>
      <article className="wrapper">
        <div className="frame-151">
          <div className="frame-149 comment-included-left">
            <div className="frame background-white border-gray-06">
              <div className="frame-101">
                <div className="frame-9">
                  <h1 className="h4-20 color-black">작업물 추가</h1>
                </div>
              </div>
              <div className="frame-101">
                <div className="frame-117">
                  <WorkContentEditor
                    detailContent={detailContent}
                    isEditor={isEditor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="frame-150">
            <div className="frame background-white border-gray-06 comment">
              <div className="frame-101">
                <div className="frame-9">
                  <h2 className="h4-20 color-black">코멘트</h2>
                </div>
              </div>
              <WorkContentCommentList workId={workId} contentId={contentId} />
            </div>
            <div className="frame background-white border-gray-06 comment comment-editor">
              <div className="frame-148">
                <h2 className="h5-18">코멘트 작성하기</h2>
              </div>
              <WorkContentCommentEditor
                workId={workId}
                workContentId={contentId}
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
