"use client";

import TOP_NAV_TYPE from "@/components/navigation/TOP_NAV_TYPE";
import TopNavigation from "@/components/navigation/TopNavigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectEditPage({ announcementId, moduleId, role }) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace(
        `/announcement/${announcementId}/${moduleId}/apply/edit?role=${role}`
      );
    }, 2000);
  }, []);

  return (
    <>
      <TopNavigation type={TOP_NAV_TYPE.OTHERS} />
      <article className="wrapper">
        <div className="frame">
          <h3 className="h3-24">
            이미 지원서를 제출했습니다. 곧 지원서 수정페이지로 연결됩니다.
          </h3>
        </div>
      </article>
    </>
  );
}
