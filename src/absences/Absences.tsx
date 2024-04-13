import { useState } from "react";
import dayjs from "dayjs";

import { Select, Dialog } from "@/components";
import { Absence, EmployeeAbsences } from "@/types";

import { useAbsences } from "./api";
import AbsenceDetail from "./components/AbsenceDetail";
import EmployeeAbsenceDetail from "./components/EmployeeAbsenceDetail";

export const SORT_BY_OPTIONS = ["Name", "Absence Type", "Date"];

export const getSortedAbsences = (absences: Absence[], sortBy?: string) => {
  if (!sortBy) return absences;

  if (sortBy === "Name") {
    return [...absences].sort((prev, next) => {
      const prevName = `${prev.employee.firstName} ${prev.employee.lastName}`;
      const nextName = `${next.employee.firstName} ${next.employee.lastName}`;

      return prevName.localeCompare(nextName);
    });
  }

  if (sortBy === "Absence Type") {
    return [...absences].sort((prev, next) =>
      prev.absenceType.localeCompare(next.absenceType)
    );
  }

  return [...absences].sort((prev, next) => {
    const prevDay = dayjs(prev.startDate);
    const nextDay = dayjs(next.startDate);
    return prevDay.diff(nextDay);
  });
};

const getGroupedAbsences = (
  absences: Absence[],
  selectedEmployeeId?: string
) => {
  if (!selectedEmployeeId) return;

  const selectedEmployee = getSortedAbsences(
    absences,
    "Date"
  ).reduce<EmployeeAbsences>(
    (absence, { employee, ...rest }) => {
      if (employee.id === selectedEmployeeId) {
        return {
          ...employee,
          cummulativeAbsences: [...absence.cummulativeAbsences, rest],
        };
      }

      return absence;
    },
    { firstName: "", lastName: "", id: "", cummulativeAbsences: [] }
  );

  return selectedEmployee;
};

const Absences = () => {
  const { data, isLoading } = useAbsences();

  const [sortBy, setSortBy] = useState<string | undefined>();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<
    string | undefined
  >();

  if (isLoading) {
    return <p>loading</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  const sortedAbsences = getSortedAbsences(data, sortBy);

  const selectedEmployee = getGroupedAbsences(data, selectedEmployeeId);

  return (
    <div className="p-10 h-screen flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h1>Your team</h1>
        <Select
          id="Sort By"
          name="Sort By"
          selectedOption={sortBy}
          options={SORT_BY_OPTIONS}
          placeholder="Choose sort option"
          onChange={setSortBy}
        />
      </div>

      <ul className="flex flex-col gap-3 grow overflow-scroll pr-5">
        {sortedAbsences.map((absence) => (
          <li key={absence.id}>
            <AbsenceDetail
              {...absence}
              onSelectEmployee={() =>
                setSelectedEmployeeId(absence.employee.id)
              }
            />
          </li>
        ))}
      </ul>

      <Dialog
        isOpen={Boolean(selectedEmployeeId)}
        onToggle={() => setSelectedEmployeeId(undefined)}
        title={`Absences for ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`}
        description={`Total absence taken: ${selectedEmployee?.cummulativeAbsences.length}`}
      >
        <div className="flex flex-col gap-2">
          {selectedEmployee?.cummulativeAbsences.map((absence, index) => {
            return (
              <EmployeeAbsenceDetail
                key={absence.id + selectedEmployee.id}
                title={`Absence ${index + 1}`}
                {...absence}
              />
            );
          })}
        </div>
      </Dialog>
    </div>
  );
};

export default Absences;
