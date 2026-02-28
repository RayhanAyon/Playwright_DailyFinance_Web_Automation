import {test , expect} from "@playwright/test";
import jsonData from "../Utils/userData.json";
import loginPage from "../pages/loginPage";
import ProfileUpdatePage from "../pages/profileUpdatePage";

let page;
test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await page.goto("/");
    const login = new loginPage(page);
    const latestUser = jsonData[jsonData.length - 1];
    await login.doLogin(latestUser.email, latestUser.password);
    await expect(page.getByText("Dashboard") ).toBeVisible({timeout: 20000});
});

test.afterAll(async () => {
  await page.close();
});


test.describe("User can update profile picture", () => {

    test ("User can update profile picture successfully", async () => {

        const profileUpdatePage = new ProfileUpdatePage(page);
        await profileUpdatePage.updateProfilePicture("./Utils/image.jpg");
        

    });

    
});