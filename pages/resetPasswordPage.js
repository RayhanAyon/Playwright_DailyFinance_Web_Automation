class resetPasswordPage {

    constructor(page) {

        this.page = page;

        this.forgotPasswordLink = page.getByRole('link', { name: 'Reset it here' });
        this.emailTxt = page.getByRole('textbox' , { name: 'Email'});
        this.sendResetLinkBtn = page.getByRole('button', { name: 'SEND RESET LINK' });

        this.newPasswordTxt =  page.getByLabel('New Password *');
        this.confirmPasswordTxt = page.getByLabel('Confirm Password *');
        this.resetPasswordBtn = page.getByRole('button', { name: 'Reset Password' });

    }

    async requestResetLink(email) {
        await this.forgotPasswordLink.click();
        await this.emailTxt.fill(email);
        await this.sendResetLinkBtn.click();
    }

    async setNewPassword(newPassword, confirmNewPass) {
        await this.newPasswordTxt.fill(newPassword);
        await this.confirmPasswordTxt.fill(confirmNewPass);
        await this.resetPasswordBtn.click();
    }
}



export default resetPasswordPage;