import { faker } from "@faker-js/faker";

const generateMockAbsence = () => ({
  id: faker.number.int(),
  startDate: faker.date.anytime().toString(),
  days: faker.number.int({ min: 1, max: 12 }),
  absenceType: faker.word.adjective(),
  employee: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    id: faker.string.uuid(),
  },
  approved: faker.datatype.boolean(),
});

export const mockAbsence = [generateMockAbsence(), generateMockAbsence()];

export const mockConflicts = {
  conflicts: faker.datatype.boolean(),
};
