import Link from "next/link";
import style from "./top-navigation.module.css";
import Icon from "../Icon";
import TOP_NAV_TYPE from "./TOP_NAV_TYPE";
import BackButton from "../BackButton";

export default function ({ type, link, title, right }) {
  if (type === TOP_NAV_TYPE.HOME) {
    return (
      <header className={style.home}>
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
  return (
    <header className={style.others}>
      <BackButton />
      {right ? right : null}
    </header>
  );
}
