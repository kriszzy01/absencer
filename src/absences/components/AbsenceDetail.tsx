import dayjs from "dayjs";
import clsx from "clsx";

import { Absence } from "@/types";
import { DATE_FORMAT } from "@/config";
import { useCheckConflicts } from "../api";

type Props = Absence & { onSelectEmployee: () => void };

const AbsenceDetail = (props: Props) => {
  const { data, isLoading } = useCheckConflicts({ absenceId: props.id });

  const startDate = dayjs(props.startDate);

  return (
    <div
      className={clsx(
        isLoading && "bg-grey-5 animate-pulse",
        data?.conflicts && "bg-red-10",
        "p-2 border flex justify-between"
      )}
    >
      <div>
        <button
          aria-label={props.employee.firstName + props.id}
          onClick={props.onSelectEmployee}
        >
          {props.employee.firstName} {props.employee.lastName}
        </button>
        <p>Start Date: {startDate.format(DATE_FORMAT)}</p>
        <p>End Date: {startDate.add(props.days, "day").format(DATE_FORMAT)}</p>
        <p>Absence Type: {props.absenceType}</p>
        <p>Status: {props.approved ? "Approved" : "Pending"}</p>
      </div>
      <div>{data?.conflicts && <p>Conflicted!</p>}</div>
    </div>
  );
};

export default AbsenceDetail;
