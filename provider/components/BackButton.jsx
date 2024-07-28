import Icon from "./Icon";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link className="back-button" href="javascript:window.history.back();">
      <div className="icon-28">
        <Icon
          className="back-button-icon"
          src="/icon_arrow_left.svg"
          alt="back"
          width={18.462}
          height={18.462}
        />
      </div>
      <p className="back-button-text h4-20 color-purple-01">돌아가기</p>
    </Link>
  );
}
