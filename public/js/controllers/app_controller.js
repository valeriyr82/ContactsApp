'use strict';

/* Controllers */

function AppCtrl($scope, $rootScope, $http, $dialog, GlobalUtil) {
  $scope.username = $rootScope.username;

  $scope.open_create_contact_dlg = function () {
    $scope.shouldBeOpen = true;
  };

  $scope.close_create_contact_dlg = function () {
    $scope.shouldBeOpen = false;
  };

  $scope.open_person_dlg = function() {
    $scope.shouldBeOpen = false;
    GlobalUtil.displayDialog('person');
  };

  $scope.open_org_dlg = function() {
    $scope.shouldBeOpen = false;
    GlobalUtil.displayDialog('organization');
  };

  $scope.opts = {
    backdropFade: false,
    dialogFade:false
  };
}

