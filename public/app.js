import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

uiRoutes.enable();
uiRoutes
.when('/', {
  template,
  resolve: {
    statuses($http) {
      return $http.get('../api/sites/status').then(function (resp) {
        return resp.data;
      });
    }
  }
});

uiModules
.get('app/my_plugin', [])
.controller('Statuses', function ($scope, $route, $interval) {
  $scope.title = 'My Plugin';
  $scope.statuses = $route.current.locals.statuses;
});
