import style from "./label.module.css";
import LABEL_TYPE from "./LABEL_TYPE";

export default function ({ type, text }) {
  if (type === LABEL_TYPE.Time) {
    return <label className={style.time}>{text}</label>;
  }

  if (type === LABEL_TYPE.Default) {
    return <label className={style.default}>{text}</label>;
  }

  throw new Error("라벨 타입을 정의해줘");
}
