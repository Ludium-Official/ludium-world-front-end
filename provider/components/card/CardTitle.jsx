import Link from "next/link";
import style from "./card.module.css";
import Icon from "../Icon";

export default function ({ className, title, link }) {
  const classNames = className
    ? `${style["card-title"]} ${className}`
    : style["card-title"];
  return (
    <div className={classNames}>
      <div>
        <h4>{title}</h4>
      </div>
      {link ? (
        <Link className={style.more} href={link}>
          <p>모두 보기</p>
          <div className={style["arrow-right"]}>
            <Icon
              src="/icon_arrow_right.svg"
              alt="모든 목록 보기"
              width={10}
              height={10}
            />
          </div>
        </Link>
      ) : null}
    </div>
  );
}
