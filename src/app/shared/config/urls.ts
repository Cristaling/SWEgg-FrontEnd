const baseEndpoint = 'api';

export const urls = {
    loginUserUrl: [baseEndpoint, 'security', 'login'].join('/'),
    getProfileUrl: [baseEndpoint, 'user', 'profile'].join('/'),
    registerUserUrl: [baseEndpoint, 'register'].join('/'),
    changePasswordUrl: [baseEndpoint, 'security', 'password'].join('/'),
    profilePictureUrl: [baseEndpoint, 'user', 'profile-picture'].join('/'),
    userUrl: [baseEndpoint, 'user/'].join('/'),
    abilitiesUrl: [baseEndpoint, 'ability'].join('/'),
    addAbilitiesUrl: [baseEndpoint, 'ability', 'add'].join('/'),
    endorsementsUrl: [baseEndpoint, 'ability', 'endorsements'].join('/'),
    jobUrl: ['api', 'job'].join('/'),
    getJobSummaries: ['api', 'job', 'summaries'].join('/'),
    getUserRelatedJobSummaries: ['api', 'job', 'related'].join('/'),

    userUrl: [baseEndpoint, 'user/'].join('/')

};
