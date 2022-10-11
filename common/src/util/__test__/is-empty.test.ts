import {isEmpty} from "../string";

it('should process empty string correctly', async () => {
    expect(isEmpty('')).toBeTruthy();
})

it('should accept strings', async () => {
    expect(isEmpty('test')).toBeFalsy();
})
