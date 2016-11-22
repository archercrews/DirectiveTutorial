(function(){
'use strict';

angular
  .module('myApp')
  .directive('userInfoCard', userInfoCard);

  function userInfoCard(){
    var directive = {
      templateUrl: 'app/components/userInfoCard/userInfoCard.html',
      controller: Controller
    };

    return directive;
  };

  Controller.$inject = ['$scope'];

  function Controller($scope) {
    $scope.user = {
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
  };
})();
