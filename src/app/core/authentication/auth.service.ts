import {JsonUserData} from '../../shared/models/JsonUserData';

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
        localStorage.removeItem('current_user');
        localStorage.removeItem('profile_image');
    }

    setCurrentUser(userResponse: JsonUserData) {
        localStorage.setItem('current_user', JSON.stringify(userResponse));
    }

    getCurrentUser(): JsonUserData {
        const currentUserJson = localStorage.getItem('current_user');
        const currentUser = JSON.parse(currentUserJson);
        return currentUser;
    }

    saveProfilePicture(picture) {
        localStorage.setItem('profile_image', 'data:image/png;base64,' + picture);
    }

    getProfilePicture() {
        return localStorage.getItem('profile_image');
    }
}
