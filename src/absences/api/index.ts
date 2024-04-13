import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { Absence } from "@/types";

type CheckConflictsDTO = {
  absenceId: number;
};

type CheckConflictsResponse = { conflicts: boolean };

const getAbsences = async () => {
  const { data } = await axios.get<Absence[]>(`/absences`);
  return data;
};

const checkConflicts = async ({ absenceId }: CheckConflictsDTO) => {
  const { data } = await axios.get<CheckConflictsResponse>(
    `/conflict/${absenceId}`
  );

  return data;
};

export const useAbsences = () => {
  return useQuery({
    queryKey: ["absences"],
    queryFn: getAbsences,
  });
};

export const useCheckConflicts = ({ absenceId }: CheckConflictsDTO) => {
  return useQuery({
    queryKey: ["conflicts", absenceId],
    queryFn: () => checkConflicts({ absenceId }),
  });
};
