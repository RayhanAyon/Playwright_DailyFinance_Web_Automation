class loginPage {

    constructor(page) {
        this.page = page;

        this.emailTxt = page.locator("#email");
        this.passwordTxt = page.locator("#password");
        this.loginBtn = page.getByRole('button', { name: 'LOGIN' });

    }

    async doLogin (email, password) {
        await this.emailTxt.fill(email);
        await this.passwordTxt.fill(password);
        await this.loginBtn.click();
    }   

}

export default loginPage;