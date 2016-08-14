export default function ($locationProvider, $urlRouterProvider) {
    'ngInject';
    
    //default route
    $urlRouterProvider.otherwise("/");

    //remove # from url
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('!');
}


