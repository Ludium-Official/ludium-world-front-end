"use client";

import BackButton from "@/components/BackButton";
import TOP_NAV_TYPE from "@/components/navigation/TOP_NAV_TYPE";
import TopNavigation from "@/components/navigation/TopNavigation";

export default function ApplyErrorPage({ error }) {
  const getApplicationErrorComponents = (status) => {
    switch (status) {
      case "401":
        return (
          <>
            <h1 className="h3-24 color-black">
              로그인 혹은 회원가입을 먼저 해주세요.
            </h1>
          </>
        );
      case "404":
        return (
          <h1 className="h3-24 color-black">
            지원서 양식이 작성되지 않았습니다.
          </h1>
        );
    }
  };

  return (
    <>
      <TopNavigation type={TOP_NAV_TYPE.OTHERS} />
      <article className="wrapper">
        <div className="frame">
          {getApplicationErrorComponents(error.message)}
        </div>
      </article>
    </>
  );
}
