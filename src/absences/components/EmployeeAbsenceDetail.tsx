import dayjs from "dayjs";

import { BaseAbsence } from "@/types";
import { DATE_FORMAT } from "@/config";

type Props = BaseAbsence & {
  title: string;
};

const EmployeeAbsenceDetail = (props: Props) => {
  const startDate = dayjs(props.startDate);

  return (
    <div className="flex flex-col gap-1">
      <h2>{props.title}:</h2>
      <div className="ml-2">
        <p>
          Period: {startDate.format(DATE_FORMAT)} to{" "}
          {startDate.add(props.days, "day").format(DATE_FORMAT)}
        </p>
        <p>Number of days: {props.days}</p>
        <p>Status: {props.approved ? "Approved" : "Pending"}</p>
        <p>Absence Type: {props.absenceType}</p>
      </div>
    </div>
  );
};

export default EmployeeAbsenceDetail;
