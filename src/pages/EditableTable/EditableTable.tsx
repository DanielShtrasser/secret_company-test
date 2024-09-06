import { useEffect, useState } from "react";
import Table from "../../components/Table";
import ProgressBar from "../../components/ProgressBar";

import style from "./EditableTable.module.css";

export default function EditableTable() {
  const [barShow, setBarShow] = useState(false);
  const [diffStateForLog, setDiffStateForLog] = useState<[string, string][]>(
    []
  );
  const [renew, setRenew] = useState(false);
  const [isRenewed, setIsRenewed] = useState(false);

  useEffect(() => {
    if (renew) {
      diffStateForLog.forEach(([k, v], i) => {
        console.log(
          `изменение № ${i + 1}: значение поля ${k} изменено на "${v}"`
        );
      });
      setRenew(false);
      setIsRenewed(true);
    }
  }, [renew]);

  return (
    <div className={style.table_container}>
      <Table
        setBarShow={setBarShow}
        setDiffStateForLog={setDiffStateForLog}
        isRenewed={isRenewed}
        setIsRenewed={setIsRenewed}
      />
      {barShow && <ProgressBar setRenew={setRenew} setBarShow={setBarShow} />}
    </div>
  );
}
