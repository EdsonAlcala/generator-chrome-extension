export default function ($stateProvider, $urlRouterProvider) {
    "ngInject";

    $stateProvider
        .state('<%= name %>', {
            url: '/<%= name %>',
            component: '<%= name %>'
        });
}