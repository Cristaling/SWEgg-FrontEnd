export class AuthService {
    constructor() {
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token') != null;
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    logout() {
        localStorage.removeItem('token');
    }
}
