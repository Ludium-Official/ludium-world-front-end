"use client";

import { updateAnnouncementApplication } from "@/app/actions/announcement";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "지원서를 제출하는 중입니다..." : "제출하기"}
    </button>
  );
};

export default function EditApplyForm({
  announcementId,
  detailId,
  application,
}) {
  const editorRef = useRef();

  const handleApplyForm = async () => {
    const { editorInstance } = editorRef.current;

    try {
      updateAnnouncementApplication({
        announcementId,
        detailId,
        application,
        description: editorInstance.getMarkdown(),
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <form action={handleApplyForm}>
      <div>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={application.title}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <input type="hidden" name="content" />
        <div>
          <Editor
            editorRef={editorRef}
            height="100%"
            content={application.description}
          />
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}
