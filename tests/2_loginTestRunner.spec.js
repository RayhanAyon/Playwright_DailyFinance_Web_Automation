import {test, expect} from '@playwright/test';
import jsonData from "../Utils/userData.json"
import loginPage from '../pages/loginPage';
import { time } from 'node:console';


test.describe("User can Login Successfully", () => {

    const latestUser = jsonData[jsonData.length - 1];

    test ("User Login Successful", async ({page}) => {
        await page.goto("/");
        const login = new loginPage(page);
        await login.doLogin(latestUser.email, latestUser.password);
        await expect(page.getByText("Dashboard") ).toBeVisible({timeout: 20000});
    });


    test ("User can not Log in With Invalid Email", async ({page}) => {
        await page.goto("/");
        const login = new loginPage(page);
        await login.doLogin("abc@gmail.com", latestUser.password);
        await expect(page.getByText("Invalid email or password") ).toBeVisible({timeout: 20000});
    });


    test ("User can not Log in With Invalid Password", async ({page}) => {
        await page.goto("/");
        const login = new loginPage(page);
        await login.doLogin(latestUser.email, "invalidPassword");
        await expect(page.getByText("Invalid email or password") ).toBeVisible({timeout: 20000});
    });


});