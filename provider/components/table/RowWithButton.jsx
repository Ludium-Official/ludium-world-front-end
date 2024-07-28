import Link from "next/link";
import Label from "../label/Label";
import style from "./row.module.css";

export default function ({
  label,
  title,
  caption,
  button,
  loading,
  loadingClassName,
}) {
  if (loading) {
    return (
      <div className={`${loadingClassName} ${style.row}`}>
        <div className={style.cell}>
          {label.type ? <Label type={label.type} text={label.text} /> : null}
          <Link href={title.link}>
            <h4>{title.text}</h4>
          </Link>
        </div>
      </div>
    );
  }

  const captionClassNames = `${caption.className} ${style.cell}`;
  const buttonClassNames = `${button.className} ${style.cell}`;

  return (
    <div className={style.row}>
      <div className={style.cell}>
        {label.type ? <Label type={label.type} text={label.text} /> : null}
        <Link href={title.link}>
          <h4>{title.text}</h4>
        </Link>
      </div>
      <div className={captionClassNames}>
        <p>{caption.text}</p>
      </div>
      <div className={buttonClassNames}>
        <Link href={button.link}>
          <h5>{button.text}</h5>
        </Link>
      </div>
    </div>
  );
}
