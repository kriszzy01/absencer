import { http, HttpResponse } from "msw";

import { API_BASE_URL } from "@/config";

import { mockAbsence, mockConflicts } from "../data/absences";

export const absencesHandlers = [
  http.get(`${API_BASE_URL}/absences`, () => {
    return HttpResponse.json(mockAbsence, { status: 200 });
  }),
  http.get(`${API_BASE_URL}/conflict/:absenceId`, () => {
    return HttpResponse.json(mockConflicts, { status: 200 });
  }),
];
