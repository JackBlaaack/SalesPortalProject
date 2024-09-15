import { expect } from "allure-playwright";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../config/enviroments";
import { STATUS_CODES } from "../../data/types/api.types";
import { SignInApiClient } from "../../api/clients/signIn.client";
import { logStep } from "utils/report/logStep";

export class SignInApiService {
  private token!: string;

  constructor(private signInClient = new SignInApiClient()) {}

  @logStep()
  async loginAsAdmin() {
    const response = await this.signInClient.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
    expect(response.status).toBe(STATUS_CODES.OK);
    this.token = `Bearer ${response.body.token}`;
    return response.body.token;
  }
  @logStep()
  async getToken() {
    if (!this.token) {
      await this.loginAsAdmin();
    }
    return this.token;
  }
}

export default new SignInApiService();
