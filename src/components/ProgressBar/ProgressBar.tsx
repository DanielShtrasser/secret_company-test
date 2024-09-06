import { useEffect, useRef, useState } from "react";
import style from "./ProgressBar.module.css";

export interface IProgressBarProps {
  seconds?: number;
  setBarShow: (x: boolean) => void;
  setRenew: (x: boolean) => void;
}

export default function ProgressBar({
  seconds = 10,
  setBarShow,
  setRenew,
}: IProgressBarProps) {
  const [time, setTime] = useState(seconds);
  const barItemsCountRef = useRef("-".repeat(seconds).split("")).current;
  const barRef = useRef<HTMLDivElement | null>(null);

  let intervalId = 0;

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalId);

      setRenew(true);
      setBarShow(false);
    }
  }, [time]);

  // этот код уменьшет количество barItem в bar
  useEffect(() => {
    intervalId = setInterval(() => {
      barItemsCountRef.length && barItemsCountRef.pop();
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // здесь устанавливается ширина ProgressBar. 65 это ширина span, взята из макета
  useEffect(() => {
    if (barRef.current)
      barRef.current.style.width = seconds ? `${seconds * 65}px` : "650px";
  }, []);

  return (
    <div className={style.container}>
      <p className={style.barMessage}>
        {`Отправка данных через ${time} секунд`}
      </p>
      <div ref={barRef} className={style.bar}>
        {barItemsCountRef.map((_, i) => (
          <span className={style.barItem} key={i}></span>
        ))}
      </div>
    </div>
  );
}
