const baseEndpoint = 'api';

export const urls = {
    loginUserUrl: [baseEndpoint, 'security', 'login'].join('/'),
    socialLoginUserUrl: [baseEndpoint, 'security', 'social', 'login'].join('/'),
    getProfileUrl: [baseEndpoint, 'user', 'profile'].join('/'),
    registerUserUrl: [baseEndpoint, 'register'].join('/'),
    jobCreateUrl: ['api', 'job'].join('/'),
    jobTypesUrl: ['api', 'job', 'types'].join('/'),
    changePasswordUrl: [baseEndpoint, 'security', 'password'].join('/'),
    profilePictureUrl: [baseEndpoint, 'user', 'profile-picture'].join('/'),
    userUrl: [baseEndpoint, 'user/'].join('/'),
    searchUserUrl: [baseEndpoint, 'user', 'search'].join('/'),
    abilitiesUrl: [baseEndpoint, 'ability'].join('/'),
    toggleEndorsementUrl: [baseEndpoint, 'ability', 'endorse'].join('/'),
    endorsementsUrl: [baseEndpoint, 'ability', 'endorsements'].join('/'),
    jobUrl: ['api', 'job'].join('/'),
    getJobSummaries: ['api', 'job', 'summaries'].join('/'),
    getOwnerJobSummaries: ['api', 'job', 'own'].join('/'),
    getUserRelatedJobSummaries: ['api', 'job', 'related'].join('/'),
    getUserRelevantJobSummaries: ['api', 'job', 'top'].join('/'),
    getApplicationsForJob: ['api', 'job-application', 'getByJob'].join('/'),
    inviteOnJob: ['api', 'job-invite'].join('/'),
    jobsInvites: ['api', 'job-invite'].join('/'),


    jobApplication: ['api', 'job-application'].join('/'),
    applicationsByJob: ['api', 'job-application', 'getByJob'].join('/'),
    verifyUser: [baseEndpoint, 'security', 'verify'].join('/'),

    userReviews: [baseEndpoint, 'review'].join('/'),

    recommandationUser: [baseEndpoint, 'recommend'].join('/'),
    ussersRecomendedToYou: [baseEndpoint, 'recommend'].join('/'),

    changeStatusJob: [baseEndpoint, 'job', 'update-status'].join('/'),
    getJobStatuses: [baseEndpoint, 'job', 'statuses'].join('/'),
    selectJobForEmployee: [baseEndpoint, 'job', 'select-employee'].join('/'),
    getUnreadNotificationsUrl: [baseEndpoint, 'notification', 'unread'].join('/'),
    markAsReadUrl: [baseEndpoint, 'notification', 'read'].join('/')
};
