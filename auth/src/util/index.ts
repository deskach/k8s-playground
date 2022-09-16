export const noop = () => {}

export const isEmpty = (obj: any): boolean => {
    if ([null, undefined, ''].includes(obj)) {
        return true;
    } else if (['object', 'function'].includes(typeof obj)) {
        return Object.keys(obj).length == 0;
    } else if (Array.isArray(obj)) {
        return obj.length == 0;
    }

    return !!obj;
}