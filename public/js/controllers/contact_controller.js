'use strict';

function ContactCtrl($scope, $rootScope, $routeParams ,$http, GlobalUtil) {
  $scope.userid = $routeParams.id;

  getUserInfo();

  function getUserInfo() {
    $http.get('/api/getuserinfo/' + $scope.userid).success(function(response) {
        console.log(response);
      $scope.firstname = response[0].firstname;
      $scope.lastname = response[0].lastname;
      $scope.orgname = response[0].orgname;
      $scope.primaryemail = response[0].primary_email;
      $scope.primaryemailtxt = response[0].email;
      $scope.primarypic = response[0].primary_pic;
      $scope.primarypicname = response[0].picname;
      $scope.summary = response[0].summary;
      $rootScope.usernmae = response[0].username;
    }).error(function(err) {
      console.log(err);
    });
  }

  getEmails();

  function getEmails() {
    $http.get('/api/getuseremails/' + $scope.userid).success(function(data) {
      $scope.emails = data;
      $scope.rows = [];
      $scope.cols = [];
      $scope.$watch("emails.length", function() {
        $scope.rows.length = Math.ceil($scope.emails.length / 2);
        $scope.cols.length = 2;
      });
    }).error(function(err) {
      console.log(err);
    });
  }

  getPictures();

  function getPictures() {
    $http.get('/api/getpictures/' + $scope.userid).success(function(data) {
      $scope.pictures = data;
      $scope.prows = [];
      $scope.pcols = [];
      $scope.$watch("pics.length", function() {
        $scope.prows.length = Math.ceil($scope.pictures.length / 4);
        $scope.pcols.length = 4;
      });
    }).error(function(err) {
      console.log(err);
    });
  }

  $scope.open_add_email_dlg = function () {
    $scope.isEmailDlgOpen = true;
  };

  $scope.close_add_email_dlg = function () {
    $scope.isEmailDlgOpen = false;
  };

  $scope.save_email = function() {
    var email = {'email': $scope.email, 'userid': $scope.userid};
    $http.post('/api/addemail', email).success(function(data) {
      getEmails();
    }).error(function(data) {

    });
    $scope.isEmailDlgOpen = false;
  };

  $scope.removeemail = function(email_id) {
    $http.delete('/api/removeemail/'+email_id).success(function(data) {
      getEmails();
      getUserInfo();
    }).error(function(data) {

    });
  };

  $scope.setprimaryemail = function(email_id) {
    $http.put('/api/setprimaryemail/' + $scope.userid + '/' +email_id).success(function(data) {
      getUserInfo();
    }).error(function(data) {

    });
  };

  $scope.open_person_dlg = function (newPerson) {
    $scope.title = newPerson ? "Create Person" : "Edit Person";
    $scope.button_title = newPerson ? "Create" : "Save";
    $scope.isPersonDlgOpen = true;
    $scope.first_name = $scope.firstname;
    $scope.last_name = $scope.lastname;
  };

  $scope.close_person_dlg = function () {
    $scope.isPersonDlgOpen = false;
  };

  $scope.$on('showDialog', function() {
    if(GlobalUtil.showDialogName == 'person') {
      $scope.open_person_dlg(true);
      $scope.isPersonDlgOpen = true;
    } else if(GlobalUtil.showDialogName == 'organization') {
      $scope.open_org_dlg(true);
      $scope.isOrgDlgOpen = true;
    }
  });

  $scope.$on("setImageName", function(name) {
    $scope.$apply(function() {
      $scope.isImgDlgOpen = false;
    });
    getPictures();
  });

  $scope.save_person = function() {
    var person = {firstname: $scope.first_name, lastname: $scope.last_name};
      $http.put('/api/updateperson/'+$scope.userid, person).success(function(data) {
        $scope.isPersonDlgOpen = false;
        $scope.firstname = $scope.first_name;
        $scope.lastname = $scope.last_name;
        $scope.first_name = "";
        $scope.last_name = "";
      }).error(function(data) {

      });
  }

  $scope.delete_person = function() {
    $http.delete('/api/deleteperson/'+$scope.userid).success(function(data) {
      $scope.firstname = '';
      $scope.lastname = '';
    }).error(function(data) {

    });
  };

  $scope.open_org_dlg = function(newOrg) {
    $scope.title = newOrg ? "Create Organization" : "Edit Organization";
    $scope.button_title = newOrg ? "Create" : "Save";
    $scope.isOrgDlgOpen = true;
    $scope.org_name = $scope.orgname;
  }

  $scope.close_org_dlg = function() {
    $scope.isOrgDlgOpen = false;
  }

  $scope.delete_org = function() {
    $http.delete('/api/deleteorg/'+$scope.userid).success(function(data) {
      $scope.orgname = "";
    }).error(function(data) {

    });
  };

  $scope.save_organization = function() {
    var organization = {orgname: $scope.org_name};

    $http.put('/api/updateorg/'+$scope.userid, organization).success(function(data) {
      $scope.isOrgDlgOpen = false;
      $scope.orgname = $scope.org_name;
      $scope.org_name = "";
    }).error(function(data) {

    });

  };

  $scope.save_summary = function() {
    var summary = {summary: $scope.txtsummary}
    $http.put('/api/updatesummary/'+$scope.userid, summary).success(function(data) {
      $scope.summary = $scope.txtsummary;
      $scope.isSummaryDlgOpen = false;
    }).error(function(data) {

    });
  };

  $scope.open_summary_dlg = function() {
    $scope.txtsummary = $scope.summary;
    $scope.isSummaryDlgOpen = true;
  };

  $scope.close_summary_dlg = function() {
    $scope.isSummaryDlgOpen = false;
  };

  $scope.open_img_dlg = function() {
    $scope.isImgDlgOpen = true;
  };

  $scope.close_img_dlg = function() {
    $scope.isImgDlgOpen = false;
  };

  $scope.setprimarypic = function(pic_id) {
    $http.put('/api/setprimarypic/' + $scope.userid + '/' + pic_id).success(function(data) {
      getUserInfo();
    }).error(function(data) {

    });
  };

  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };

}
