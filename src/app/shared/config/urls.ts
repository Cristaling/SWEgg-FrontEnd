const baseEndpoint = 'api';

export const urls = {
    loginUserUrl: [baseEndpoint, 'security', 'login'].join('/'),
    getProfileUrl: [baseEndpoint, 'user', 'profile'].join('/'),
    registerUserUrl: [baseEndpoint, 'register'].join('/'),
    changePasswordUrl: [baseEndpoint, 'security', 'password'].join('/')
};
