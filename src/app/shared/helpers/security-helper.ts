import {Md5} from 'ts-md5';

export class SecurityHelper {
    static hashPassword(password: string) {
        const md5 = new Md5();
        return md5.appendStr(password).end();
    }
}
