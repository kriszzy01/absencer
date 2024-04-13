export type AbsenceType = "MEDICAL" | "ANNUAL_LEAVE" | "SICKNESS";

type Employee = {
  firstName: string;
  lastName: string;
  id: string;
};

export type BaseAbsence = {
  id: number;
  startDate: string;
  days: number;
  absenceType: AbsenceType;
  approved: boolean;
};

export type Absence = BaseAbsence & {
  employee: Employee;
};

export type EmployeeAbsences = Employee & {
  cummulativeAbsences: BaseAbsence[];
};
