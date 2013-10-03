angular.module("contactApp").factory("GlobalUtil", function($rootScope, $http) {
  function GlobalUtil(data) {
    angular.extend(this, data);
  }
  GlobalUtil.showDialogName = '';

  GlobalUtil.displayDialog = function(name) {
    this.showDialogName = name;
    $rootScope.$broadcast('showDialog');
  };
  GlobalUtil.setImageName = function(name) {
    this.imgName = name;
    $rootScope.$broadcast("setImageName");
  }
  return GlobalUtil;
});
