import Icon from "./Icon";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link className="back-button" href="javascript:window.history.back();">
      <div className="icon-28">
        <Icon src="/icon_backword.png" alt="back" width={24} height={24} />
      </div>
      <p className="back-button-text h4-20 color-purple-01">돌아가기</p>
    </Link>
  );
}
