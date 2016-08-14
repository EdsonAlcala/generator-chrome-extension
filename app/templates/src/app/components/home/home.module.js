import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import homeConfig from './home.config';

export default angular.module('home', [
  uiRouter
])
.config(homeConfig)
.component('home', homeComponent) 
.name;

