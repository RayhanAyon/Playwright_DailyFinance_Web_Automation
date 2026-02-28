import {test, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import jsonData from "../Utils/userData.json"
import fs from  "fs"
import registrationPage from "../pages/registrationPage";
import { generateRandomId } from '../Utils/utils.js';
import { request } from 'http';


test.describe("User can Registration Successfully", () => {

test ("User Registration Successful", async ({page , request}) => {
    await page.goto("/");
    
    const registration = new registrationPage(page);

    const userModel = {
        firstName : faker.person.firstName(),
        lastName : faker.person.lastName(),
        email : "rrayon1999+" + generateRandomId(1000, 9999) + "@gmail.com",
        password : faker.internet.password(),
        phoneNumber : `014${generateRandomId(10000000, 99999999)}`,
        address : faker.location.city()

    }

    await registration.registerUser(userModel);
    
    const toastMessage = page.locator(".Toastify__toast");
    await toastMessage.waitFor({ timeout: 20000 });
    await expect(toastMessage).toContainText("successful");

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
    //console.log("Email Content: ", emailContent);   
    const expectedMsg =  "excited to have you onboard.";
    expect(emailContent).toContain(expectedMsg);

     jsonData.push(userModel);
     fs.writeFileSync('./Utils/userData.json', JSON.stringify(jsonData, null, 2)); 
    });


    test ("User can register By Only Mandatory Field", async ({page , request}) => {
    await page.goto("/");
    
    const registration = new registrationPage(page);

    const userModel = {
        firstName : faker.person.firstName(),
        lastName : faker.person.lastName(),
        email : "rrayon1999+" + generateRandomId(1000, 9999) + "@gmail.com",
        password : faker.internet.password(),
        phoneNumber : `014${generateRandomId(10000000, 99999999)}`,
        address : " "

    }

    await registration.registerUser(userModel);
    
    const toastMessage = page.locator(".Toastify__toast");
    await toastMessage.waitFor({ timeout: 20000 });
    await expect(toastMessage).toContainText("successful");

    await page.waitForTimeout(2000);

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
    //console.log("Email Content: ", emailContent);   
    const expectedMsg =  "excited to have you onboard.";
    expect(emailContent).toContain(expectedMsg);

     jsonData.push(userModel);
     fs.writeFileSync('./Utils/userData.json', JSON.stringify(jsonData, null, 2)); 
    });


    test ("User can not register with already used email", async ({page , request}) => {
    await page.goto("/");
    
    const registration = new registrationPage(page);
    const lastMail = jsonData[jsonData.length - 1];

    const userModel = {
        firstName : faker.person.firstName(),
        lastName : faker.person.lastName(),
        email : lastMail.email,
        password : faker.internet.password(),
        phoneNumber : `014${generateRandomId(10000000, 99999999)}`,
        address : faker.location.city()

    }

    await registration.registerUser(userModel);
    
    const toastMessage = page.locator(".Toastify__toast");
    await toastMessage.waitFor({ timeout: 20000 });
    await expect(toastMessage).toContainText("User with this email address already exists");
    
    });



    test ("User can not register with Invalid Phone Number", async ({page , request}) => {
    await page.goto("/");
    
    const registration = new registrationPage(page);

    const userModel = {
        firstName : faker.person.firstName(),
        lastName : faker.person.lastName(),
        email : "rrayon1999+" + generateRandomId(1000, 9999) + "@gmail.com",
        password : faker.internet.password(),
        phoneNumber : `RRA${generateRandomId(10000000, 99999999)}`,
        address : faker.location.city()

    }

    await registration.registerUser(userModel);
    
    const toastMessage = page.locator(".Toastify__toast");
    await toastMessage.waitFor({ timeout: 10000 });
    await expect(toastMessage).toContainText("Phone Number is not valid");
    
    });

});