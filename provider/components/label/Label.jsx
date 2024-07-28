import style from "./label.module.css";
import LabelType from "./LabelType";

export default function ({ type, text }) {
  if (type === LabelType.Time) {
    return <label className={style.time}>{text}</label>;
  }

  if (type === LabelType.Default) {
    return <label className={style.default}>{text}</label>;
  }

  throw new Error("라벨 타입을 정의해줘");
}
