import {PasswordHelper} from "../password-helper";

it('compares passwords correctly', async () => {
    const pwd1 = 'test';
    const hashedPwd1 = await PasswordHelper.toHash(pwd1);

    expect(PasswordHelper.compare(hashedPwd1, pwd1)).toBeTruthy();
})