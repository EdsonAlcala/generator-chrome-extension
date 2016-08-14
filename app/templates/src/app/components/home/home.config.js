export default function ($stateProvider, $urlRouterProvider) {
    "ngInject";
    
    $stateProvider
        .state('home', {
            url: '/',
            component: 'home'
        });
}