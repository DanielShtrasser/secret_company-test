import { memo, SyntheticEvent, useEffect, useState } from "react";
import { IData } from "../../model/types";
import { initialData } from "../../model/model";
import { getStateDiff, validateInput } from "../../utils";

import clsx from "clsx";
import style from "./Table.module.css";
import { useDebouncedState } from "../../hooks";

interface ITableProps {
  setBarShow: (x: boolean) => void;
  setDiffStateForLog: (x: [string, string][]) => void;
  isRenewed: boolean;
  setIsRenewed: (x: boolean) => void;
}

const Table = memo(function Table({
  setBarShow,
  setDiffStateForLog,
  isRenewed,
  setIsRenewed,
}: ITableProps) {
  const [currentTableState, setCurrentTableState] = useState(initialData);
  const DebouncedCurrentTableState = useDebouncedState(currentTableState, 5000);
  const [prevTableState, setPrevTableState] = useState(initialData);

  function changeHandler(
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setBarShow(false);

    const eventTargetName = e.currentTarget.name as keyof IData;
    const oldValue = currentTableState[eventTargetName];
    const newValue = e.currentTarget.value;

    let isValid: boolean = true;

    newValue.split("").forEach((l) => {
      if (!validateInput(eventTargetName, l)) isValid = false;
    });

    if (!isValid) return;

    if (oldValue === newValue) return;

    setCurrentTableState((prev) => ({ ...prev, [eventTargetName]: newValue }));
  }

  useEffect(() => {
    if (isRenewed) {
      setPrevTableState(currentTableState);
      setIsRenewed(false);
    }
  }, [isRenewed]);

  useEffect(() => {
    const diff = getStateDiff(currentTableState, prevTableState);
    if (!diff.length) return;
    setDiffStateForLog(diff);
    setBarShow(true);
  }, [DebouncedCurrentTableState]);

  return (
    <div className={style.table}>
      <div className={clsx([style.cell, style.date])}>
        <input
          value={currentTableState.date}
          onChange={changeHandler}
          name="date"
        />
      </div>
      <div className={clsx([style.cell, style.shift])}>
        <input
          value={currentTableState.shift}
          onChange={changeHandler}
          name="shift"
        />
      </div>
      <div className={clsx([style.cell, style.master])}>
        <input
          value={currentTableState.master}
          onChange={changeHandler}
          name="master"
        />
      </div>
      <div className={clsx([style.cell, style.place])}>
        <input
          value={currentTableState.place}
          onChange={changeHandler}
          name="place"
        />
      </div>
      <div className={clsx([style.cell, style.staff])}>
        <input
          value={currentTableState.staff}
          onChange={changeHandler}
          name="staff"
        />
      </div>
      <div className={clsx([style.cell, style.staffCount])}>
        <input
          value={currentTableState.staffCount}
          onChange={changeHandler}
          name="staffCount"
        />
      </div>
      <div className={style.comments}>
        <textarea
          value={currentTableState.comments}
          onChange={changeHandler}
          rows={5}
          name="comments"
        ></textarea>
      </div>
      <div className={clsx([style.cell, style.equipment])}>
        <input
          value={currentTableState.equipment}
          onChange={changeHandler}
          name="equipment"
        />
      </div>
      <div className={clsx([style.cell, style.equipmentStatus])}>
        <input
          value={currentTableState.equipmentStatus}
          onChange={changeHandler}
          name="equipmentStatus"
        />
      </div>
      <div className={clsx([style.cell, style.someNumber])}>
        <input
          value={currentTableState.someNumber}
          onChange={changeHandler}
          name="someNumber"
        />
      </div>
      <div className={clsx([style.cell, style.csomeAbbreviationell])}>
        <input
          value={currentTableState.someAbbreviation}
          onChange={changeHandler}
          name="someAbbreviation"
        />
      </div>
      <div className={clsx([style.cell, style.percentage])}>
        <input
          value={currentTableState.percentage}
          onChange={changeHandler}
          name="percentage"
        />
        <div className={style.percentSymbol}>%</div>
      </div>
      <div className={clsx([style.cell, style.statusDesc])}>
        <input
          value={currentTableState.statusDesc}
          onChange={changeHandler}
          name="statusDesc"
        />
      </div>
    </div>
  );
});

export default Table;
