import { expect } from "@playwright/test";

class ProfileUpdatePage{

    constructor(page){
        this.page = page;

        this.profileIconBtn = page.getByLabel("account of current user");
        this.profileBtn = page.getByRole('menuitem', {name : "Profile"});
        this.editBtn = page.getByRole('button', {name : "EDIT"});
        this.chooseFileBtn = page.getByRole('button', {name : "Choose File"});
        this.uploadBtn = page.getByRole('button', {name : "UPLOAD IMAGE"});
        this.updateBtn = page.getByRole('button', {name : "UPDATE"});
         
    }

    async updateProfilePicture(filePath){
        await this.profileIconBtn.click();
        await this.profileBtn.click();
        await this.editBtn.click();
        await this.chooseFileBtn.setInputFiles(filePath);
        
        await this.uploadBtn.click();

        this.page.on('dialog', async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("Image uploaded successfully!");
        await dialog.accept();
        })

        await this.updateBtn.click();
        this.page.on('dialog', async dialog => {
        expect(dialog.type()).toContain("alert");
        expect(dialog.message()).toContain("User updated successfully!");
        await dialog.accept();
        })

    }


};

export default ProfileUpdatePage;