import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Components from './components/components';
import AppConfig from './app.config';
import AppComponent from './app.component';

angular.module('app', [
    uiRouter,
    Components
])
.config(AppConfig)
.component('app', AppComponent);
