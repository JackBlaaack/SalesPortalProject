import { test as setup } from "../../../fixtures/services.fixture";
import signInApiService from "../../../api/service/signIn.api";

const authFile = "src/.auth/user.json";

setup("Should login with valid credentials", async ({ page, request }) => {
  
  const token = await signInApiService.loginAsAdmin();
  await page.context().addCookies([
    {
      name: "Authorization",
      value: token,
      url: "https://anatoly-karpovich.github.io/aqa-course-project/",
    },
  ]);

  await page.context().storageState({ path: authFile });
});