class AddItems {

    constructor(page) {

        this.page = page;

        this.addCostBtn = page.getByRole ('button', {name : "Add Cost"});
        this.itemNameTxt = page.locator("#itemName");
        this.itemQuantity = page.getByRole ('button' , {name : '+'});
        this.itemAmount = page.locator("#amount");
        this.purchaseDate = page.locator("#purchaseDate");
        this.month = page.locator("#month");
        this.remarksTxt = page.locator("#remarks");
        this.submitBtn = page.getByRole('button' , {name : "Submit"});

    }

    async addToCart (itemModel) {
        await this.addCostBtn.click();
        await this.itemNameTxt.fill(itemModel.itemNameTxt);
        await this.itemQuantity.click();
        await this.itemAmount.fill(itemModel.itemAmount);
        await this.purchaseDate.fill(itemModel.purchaseDate);
        await this.month.selectOption(itemModel.month);
        await this.remarksTxt.fill(itemModel.remarksTxt);
        await this.submitBtn.click();
    }



}

export default AddItems;