const baseEndpoint = 'api';

export const urls = {
    loginUserUrl: [baseEndpoint, 'security', 'login'].join('/'),
    getProfileUrl: [baseEndpoint, 'user', 'profile'].join('/'),
    registerUserUrl: [baseEndpoint, 'register'].join('/'),
    changePasswordUrl: [baseEndpoint, 'security', 'password'].join('/'),
    profilePictureUrl: [baseEndpoint, 'user', 'profile-picture'].join('/'),

    jobUrl: ['api', 'job'].join('/'),
    getJobSummaries: ['api', 'job', 'summaries'].join('/'),
    getUserJobSummaries: ['api', 'job', 'all'].join('/'),

    userUrl: [baseEndpoint, 'user/'].join('/')
};
