const baseEndpoint = 'api';

export const urls = {
    loginUserUrl: [baseEndpoint, 'security', 'login'].join('/'),
    getProfileUrl: [baseEndpoint, 'user', 'profile'].join('/'),
    registerUserUrl: [baseEndpoint, 'register'].join('/'),
    jobCreateUrl: ['api', 'job'].join('/'),
    jobTypesUrl: ['api', 'job', 'types'].join('/'),
    changePasswordUrl: [baseEndpoint, 'security', 'password'].join('/'),
    profilePictureUrl: [baseEndpoint, 'user', 'profile-picture'].join('/'),
    userUrl: [baseEndpoint, 'user/'].join('/'),
    abilitiesUrl: [baseEndpoint, 'ability'].join('/'),
    toggleEndorsementUrl: [baseEndpoint, 'ability', 'endorse'].join('/'),
    endorsementsUrl: [baseEndpoint, 'ability', 'endorsements'].join('/'),
    jobUrl: ['api', 'job'].join('/'),
    getJobSummaries: ['api', 'job', 'summaries'].join('/'),
    getUserRelatedJobSummaries: ['api', 'job', 'related'].join('/'),
    getApplicationsForJob: ['api', 'job-application', 'getByJob'].join('/'),


};
