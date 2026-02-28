class RegistrationPage {

    constructor(page) {

        this.page = page;

        this.registrationLink = page.getByRole('link', { name: 'Register' });
        this.firstNameTxt = page.locator('#firstName');
        this.lastNameTxt = page.locator('#lastName');
        this.emailTxt = page.locator('#email');
        this.passwordTxt = page.locator('#password');
        this.phoneNumberTxt = page.locator('#phoneNumber');
        this.addressTxt = page.locator('#address');
        this.genderRadioBtn = page.getByRole('radio');
        this.terms = page.getByRole('checkbox');
        this.registerBtn = page.getByRole('button', { name: 'REGISTER' });
    }

    async registerUser (userModel) {
        await this.registrationLink.click();
        await this.firstNameTxt.fill(userModel.firstName);
        await this.lastNameTxt.fill(userModel.lastName);
        await this.emailTxt.fill(userModel.email);
        await this.passwordTxt.fill(userModel.password);
        await this.phoneNumberTxt.fill(userModel.phoneNumber);
        await this.addressTxt.fill(userModel.address);
        await this.genderRadioBtn.first().click();
        await this.terms.click();
        await this.registerBtn.click();
    }

}   

export default RegistrationPage;