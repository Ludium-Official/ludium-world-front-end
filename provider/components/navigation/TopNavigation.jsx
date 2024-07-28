import Link from "next/link";
import style from "./top-navigation.module.css";
import Icon from "../Icon";

export default function ({ link, title }) {
  return (
    <header className={style["top-nav"]}>
      <Link href={link}>
        <Icon
          src="/icon_speaker.png"
          alt="최신 공지사항 보러가기"
          width={24}
          height={24}
        />
        <h4 className={style.title}>{title}</h4>
        <Icon src="/icon_new.png" alt="최신글" width={24} height={24} />
      </Link>
    </header>
  );
}
