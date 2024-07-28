import Link from "next/link";
import Label from "../label/Label";
import style from "./row.module.css";

export default function ({ label, title, fixed }) {
  return (
    <div className={style.row}>
      <div className={style.cell}>
        {label.type ? <Label type={label.type} text={label.text} /> : null}
        <Link href={title.link}>
          <h4>{title.text}</h4>
        </Link>
      </div>
      <div className={style["cell-fixed"]}>
        {fixed.label.type ? (
          <Label type={fixed.label.type} text={fixed.label.text} />
        ) : null}
      </div>
    </div>
  );
}
