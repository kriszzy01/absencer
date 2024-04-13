import { render, screen, waitFor, userEvent, within } from "@/test/utils";
import { mockAbsence } from "@/test/data/absences";

import Absences, { SORT_BY_OPTIONS, getSortedAbsences } from "../Absences";
import { Absence } from "@/types";

const renderAbsencesAfterSorting = async (sortBy: string) => {
  await render(<Absences />);

  await waitFor(() => {
    const selectTrigger = screen.getByRole("combobox", { name: "Sort By" });

    expect(
      within(selectTrigger).getByText("Choose sort option")
    ).toBeInTheDocument();

    userEvent.click(selectTrigger);

    expect(selectTrigger).toHaveAttribute("aria-expanded", "true");

    expect(screen.getAllByRole("option")).toHaveLength(SORT_BY_OPTIONS.length);

    userEvent.click(screen.getByRole("option", { name: sortBy }));
  });

  const sortedMockAbsences = getSortedAbsences(
    mockAbsence as Absence[],
    sortBy
  );

  const { employee } = sortedMockAbsences[0];
  const firstMockAbsenseFullName = `${employee.firstName} ${employee.lastName}`;

  const firstRenderedAbsence = screen.getAllByRole("listitem")[0];

  return { firstMockAbsenseFullName, firstRenderedAbsence };
};

describe("Absences", () => {
  it("should fetch and render absences", async () => {
    await render(<Absences />);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(mockAbsence.length);
    });
  });

  it("should sort list by name", async () => {
    const { firstRenderedAbsence, firstMockAbsenseFullName } =
      await renderAbsencesAfterSorting("Name");

    expect(
      within(firstRenderedAbsence).getByText(firstMockAbsenseFullName)
    ).toBeInTheDocument();
  });

  it("should sort list by date", async () => {
    const { firstRenderedAbsence, firstMockAbsenseFullName } =
      await renderAbsencesAfterSorting("Date");

    expect(
      within(firstRenderedAbsence).getByText(firstMockAbsenseFullName)
    ).toBeInTheDocument();
  });

  it("should sort list by absence type", async () => {
    const { firstRenderedAbsence, firstMockAbsenseFullName } =
      await renderAbsencesAfterSorting("Absence Type");

    expect(
      within(firstRenderedAbsence).getByText(firstMockAbsenseFullName)
    ).toBeInTheDocument();
  });

  it("should open dialog with cummulative employee absences", async () => {
    await render(<Absences />);

    const selectedEmployee = mockAbsence[0];

    await waitFor(() => {
      const selectedEmployeeButton = screen.getByRole("button", {
        name: selectedEmployee.employee.firstName + selectedEmployee.id,
      });

      userEvent.click(selectedEmployeeButton);
      const dialog = screen.getByRole("dialog");

      expect(dialog).toBeInTheDocument();

      expect(
        within(dialog).getByText(`Number of days: ${selectedEmployee.days}`)
      ).toBeInTheDocument();

      expect(
        within(dialog).getByText(
          `Absence Type: ${selectedEmployee.absenceType}`
        )
      );

      expect(
        within(dialog).getByText(
          `Absences for ${selectedEmployee.employee.firstName} ${selectedEmployee.employee.lastName}`
        )
      );
    });
  });
});
