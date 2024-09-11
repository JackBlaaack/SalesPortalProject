import { faker } from "@faker-js/faker";
import { ICustomer, COUNTRIES } from "../types/customers.types";
import { getRandromEnumValue } from "../../utils/enums/getRandomValue";

export const generateNewCustomer = (params?: Partial<ICustomer>) => {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    country: getRandromEnumValue(COUNTRIES),
    city: faker.location.city(),
    street: faker.location.street(),
    house: faker.number.int(999),
    flat: faker.number.int(9999),
    phone: `+${faker.number.int(999999999999)}`,
    notes: `Notes ${faker.string.alpha(244)}`,
    ...params,
  } as ICustomer;
};
