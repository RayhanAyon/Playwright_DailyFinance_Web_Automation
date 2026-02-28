import {test, expect} from '@playwright/test';
import jsonData from "../Utils/userData.json"
import loginPage from "../pages/loginPage";
import resetPasswordPage from "../pages/resetPasswordPage";


const latestUser = jsonData[ jsonData.length - 1 ];
const newPass = "12345";

test.describe("User can reset password", () => {

    test ("User can reset password successfully", async ({page , request}) => {

        await page.goto("/");

        const resetPassword = new resetPasswordPage(page);
        await resetPassword.requestResetLink(latestUser.email);

        await page.waitForTimeout(4000);

        const baseUrl = "https://gmail.googleapis.com";
        
        const allEmailId = await request.get(baseUrl+"/gmail/v1/users/me/messages/", {
        headers: {
            "Authorization": "Bearer "+process.env.GMAIL_TOKEN,
            "Content-Type": "application/json"
        }
        });

        const emailData = await allEmailId.json();
        const emailId = emailData.messages[0].id; 

        const readEmail = await request.get(baseUrl+"/gmail/v1/users/me/messages/"+emailId, {
        headers: {
            "Authorization": "Bearer "+process.env.GMAIL_TOKEN,
            "Content-Type": "application/json"
        }
    });

    const email = await readEmail.json();
    const emailContent = email.snippet;
    const resetLink = emailContent.split(": ")[1];

    await page.goto(resetLink);
    await resetPassword.setNewPassword(newPass , newPass);
    await expect(page.getByText('Password reset successfully')).toBeVisible({ timeout: 60000 });


    });

    test ("Login With new Password Successfully", async ({page}) => {
        await page.goto("/");
        const login = new loginPage(page);
        await login.doLogin(latestUser.email, newPass);
        await expect(page.getByText("Dashboard") ).toBeVisible({timeout: 20000});
    });


    test ("User can not reset Password when password and confirm password mismatches", async ({page , request}) => {

        await page.goto("/");

        const resetPassword = new resetPasswordPage(page);
        await resetPassword.requestResetLink(latestUser.email);

        await page.waitForTimeout(4000);

        const baseUrl = "https://gmail.googleapis.com";
        
        const allEmailId = await request.get(baseUrl+"/gmail/v1/users/me/messages/", {
        headers: {
            "Authorization": "Bearer "+process.env.GMAIL_TOKEN,
            "Content-Type": "application/json"
        }
        });

        const emailData = await allEmailId.json();
        const emailId = emailData.messages[0].id; 

        const readEmail = await request.get(baseUrl+"/gmail/v1/users/me/messages/"+emailId, {
        headers: {
            "Authorization": "Bearer "+process.env.GMAIL_TOKEN,
            "Content-Type": "application/json"
        }
    });

    const email = await readEmail.json();
    const emailContent = email.snippet;
    const resetLink = emailContent.split(": ")[1];

    await page.goto(resetLink);
    await resetPassword.setNewPassword(newPass , "12345567");
    await expect(page.getByText('Passwords do not match')).toBeVisible({ timeout: 60000 });


    });



    test ("User can not reset Password with alreay used link", async ({page , request}) => {

        await page.goto("/");

        const resetPassword = new resetPasswordPage(page);
        await resetPassword.requestResetLink(latestUser.email);

        await page.waitForTimeout(4000);

        const baseUrl = "https://gmail.googleapis.com";
    
        const allEmailId = await request.get(baseUrl+"/gmail/v1/users/me/messages/", {
        headers: {
            "Authorization": "Bearer "+process.env.GMAIL_TOKEN,
            "Content-Type": "application/json"
        }
        });

        const emailData = await allEmailId.json();
        const emailId = emailData.messages[1].id; 

        const readEmail = await request.get(baseUrl+"/gmail/v1/users/me/messages/"+emailId, {
        headers: {
            "Authorization": "Bearer "+process.env.GMAIL_TOKEN,
            "Content-Type": "application/json"
        }
    });

    const email = await readEmail.json();
    const emailContent = email.snippet;
    const oldResetLink = emailContent.split(": ")[1];

    await page.goto(oldResetLink);
    await resetPassword.setNewPassword(newPass , newPass);
    await expect(page.getByText('Error resetting password')).toBeVisible({ timeout: 60000 });


    });


    test ("User can not reset Password with unregistered Email", async ({page , request}) => {

        await page.goto("/");

        const resetPassword = new resetPasswordPage(page);
        await resetPassword.requestResetLink("abc@mail.com");

        await expect(page.getByText('Your email is not registered')).toBeVisible({ timeout: 20000 });


    });



});