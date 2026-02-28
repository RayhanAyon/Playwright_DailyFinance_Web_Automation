import {test , expect} from "@playwright/test";
import jsonData from "../Utils/userData.json";
import loginPage from "../pages/loginPage";
import AddItems from "../pages/addItems";
import { it } from "node:test";

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


test.describe("User can add items to the cart", () => {

    test ("User can add item 1 to the cart successfully", async () => {

        const addItems = new AddItems(page);

        const itemModel = {
            itemNameTxt : "Pen",
            itemAmount : "10",
            purchaseDate : "2024-06-15",
            month : "June",
            remarksTxt : "For office use"
        }

        await addItems.addToCart(itemModel);

    });


    test ("User can add item 2 to the cart successfully", async () => {

        const addItems = new AddItems(page);

        const itemModel = {
            itemNameTxt : "Book",
            itemAmount : "499",
            purchaseDate : "2025-05-29",
            month : "May",
            remarksTxt : "For Personal use"
        }

        await addItems.addToCart(itemModel);

    });

    test ("Assert Two Products Added Successfully", async () => {

        const totalRowsSpan = page.locator(".summary span").first();
        await expect(page.locator(".summary span").first()).toHaveText("Total Rows: 2", { timeout: 40000 });

    });


});