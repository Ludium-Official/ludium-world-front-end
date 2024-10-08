"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { updateMission } from "../../../actions";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="button-L-2 background-purple-01 h5-18 color-white"
      type="submit"
      disabled={pending}
    >
      {pending ? "미션을 수정하는 중입니다..." : "미션 수정하기"}
    </button>
  );
};

export default function MissionEditor({
  mission: {
    title,
    orderNum,
    description,
    missionSubmitForm,
    rewardToken,
    rewardAmount,
    ...mission
  },
  postingId,
  coinList,
}) {
  const editorRef = useRef();
  const submitFormEditorRef = useRef();

  const handleEditWorkContent = async (missionData) => {
    const { editorInstance } = editorRef.current;
    const submitFormEditorInstance = submitFormEditorRef.current.editorInstance;

    try {
      const message = await updateMission({
        postingId,
        title: missionData.get("title"),
        description: editorInstance.getMarkdown(),
        missionSubmitForm: submitFormEditorInstance.getMarkdown(),
        orderNum: missionData.get("orderNum"),
        rewardToken: missionData.get("rewardToken"),
        rewardAmount: missionData.get("rewardAmount"),
        mission,
      });

      if (message) {
        alert(message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className="frame-116" action={handleEditWorkContent}>
      <div className="input-2">
        <label className="h5-18 color-gray-03" htmlFor="title">
          제목
        </label>
        <input
          className="frame-102-3 background-white border-gray-05 p1-18 color-gray-04"
          type="text"
          name="title"
          id="title"
          defaultValue={title}
          placeholder="미션 제목을 입력해주세요"
        />
      </div>
      <div className="input-2">
        <label className="h5-18 color-gray-03" htmlFor="orderNum">
          순번
        </label>
        <input
          className="frame-102-3 background-white border-gray-05 p1-18 color-gray-04"
          type="number"
          name="orderNum"
          id="orderNum"
          defaultValue={orderNum}
        />
      </div>
      <div className="input-2">
        <label className="h5-18 color-gray-03" htmlFor="rewardToken">
          토큰
        </label>
        {coinList.length > 0 ? (
          <select
            className="frame-102-3 background-white border-gray-05 p1-18 color-gray-04"
            name="rewardToken"
            id="rewardToken"
            defaultValue={rewardToken}
          >
            {coinList.map(({ coin, id }) => (
              <option key={id} value={id}>
                {coin.name}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input
              className="frame-102-3 background-white border-gray-05 p1-18 color-gray-04"
              type="type"
              name="rewardToken"
              id="rewardToken"
              placeholder="토큰 정보를 불러오는 중 에러가 발생했습니다."
              disabled={true}
            />
            <input
              type="hidden"
              name="rewardToken"
              id="rewardToken"
              defaultValue={rewardToken}
            />
          </>
        )}
      </div>
      <div className="input-2">
        <label className="h5-18 color-gray-03" htmlFor="rewardAmount">
          금액
        </label>
        <input
          className="frame-102-3 background-white border-gray-05 p1-18 color-gray-04"
          type="number"
          name="rewardAmount"
          id="rewardAmount"
          step="any"
          defaultValue={rewardAmount}
        />
      </div>
      <div className="input-2">
        <p className="h5-18 color-gray-03">내용</p>
        <div className="frame-102-4 background-white content-editor">
          <Editor editorRef={editorRef} content={description} height="100%" />
        </div>
      </div>
      <div className="input-2">
        <p className="h5-18 color-gray-03">제출 양식</p>
        <div className="frame-102-4 background-white content-editor">
          <Editor
            editorRef={submitFormEditorRef}
            content={missionSubmitForm}
            height="100%"
          />
        </div>
      </div>
      <div className="frame-157">
        <SubmitButton />
      </div>
    </form>
  );
}
