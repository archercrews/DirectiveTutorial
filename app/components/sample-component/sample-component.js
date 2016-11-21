(function(){
'use strict';

angular
  .module('myApp')
  .directive('sampleComponent', sampleComponent);

  function sampleComponent(){
    var directive = {
      templateUrl: 'app/components/sample-component/sample-component.html',
      controller: Controller
    };

    return directive;
  }

  function Controller() {

  }
})();
