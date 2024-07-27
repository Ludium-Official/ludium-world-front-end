import Link from "next/link";
import { Fragment } from "react";
import Icon from "../Icon";
import style from "./card.module.css";
import LabelType from "./LabelType";

export default function ({ header, contents }) {
  return (
    <ul className={style.card}>
      <li className={style["card-title"]}>
        <div>
          <h4>{header.title}</h4>
        </div>
        <Link className={style.more} href={header.link}>
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
      </li>
      {contents.map((content, index) => (
        <Fragment key={content.id}>
          <li className={style.list}>
            {content.label.type === LabelType.Time ? (
              <label className={style["label-time"]}>
                {content.label.text}
              </label>
            ) : null}
            <Link className={style["list-title"]} href={content.title.link}>
              <h4>{content.title.text}</h4>
            </Link>
          </li>
          {index < contents.length - 1 ? (
            <hr className="article-divider" />
          ) : null}
        </Fragment>
      ))}
    </ul>
  );
}
