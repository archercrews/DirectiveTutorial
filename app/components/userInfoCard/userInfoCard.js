(function(){
'use strict';

angular
  .module('myApp');

angular.module('myApp').controller('mainCtrl', ['$scope', function($scope) {
  $scope.user1 = {
    name: 'Luke Skywalker',
    address: {
      street: 'PO Box 123',
      city: 'Secret Rebel Base',
      planet: 'Yavin 4'
    },
    friends: [
      'Han',
      'Leia',
      'Chewy'
    ]
  };
  $scope.user2 = {
    name: 'Han Solo',
    address: {
      street: 'PO Box 123',
      city: 'Mos Eisley',
      planet: 'Tattoine'
    },
    friends: [
      'Luke',
      'Leia',
      'Chewy'
    ]
  };
}]);

angular
  .module('myApp')
  .directive('userInfoCard', userInfoCard);

  function userInfoCard(){
    var directive = {
      templateUrl: 'app/components/userInfoCard/userInfoCard.html',
      controller: Controller,
      scope: {
        initialCollapsed: '@collapsed',
        user: '='
      }
    };

    return directive;
  };

  Controller.$inject = ['$scope'];

  function Controller($scope) {

    $scope.collapsedState = ($scope.initialCollapsed === 'true');
    //$scope.collapsed = false;
    $scope.collapse = function() {
      $scope.collapsed = !$scope.collapsed;
    }

    $scope.knightMe = function(user) {
      user.rank = "knight";
    }
  };

angular
  .module('myApp')
  .directive('address', address);

  function address(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/userInfoCard/address.html',
      controller: addressController,
      scope: true
    }
  }

  addressController.$inject = ['$scope'];
  function addressController($scope) {
    $scope.collapsed = false;
    $scope.collapseAddress = function() {
      $scope.collapsed = true;
    }
    $scope.expandAddress = function() {
      $scope.collapsed = false;
    }
  };

angular
  .module('myApp')
  .directive('removeFriend', removeFriend);

function removeFriend() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/userinfoCard/removeFriend.html',
      controller: 'removeController'
    };
  };

  Controller.$inject = ['$scope'];
  function removeController($scope) {
    $scope.removing = false;
    $scope.startRemove = function() {
      $scope.removing = true;
    };
    $scope.cancelRemove = function() {
      $scope.removing = false;
    };
    $scope.removeFriend = function(friend) {
      var idx = $scope.user.friends.indexOf(friend);
      if(idx > -1) {
        $scope.user.friends.splice(idx , 1);
      }
    };
   };
})();
