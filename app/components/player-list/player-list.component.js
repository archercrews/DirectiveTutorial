(function(){


'use strict';

angular
  .module('myApp')
  .directive('playerList', playerList);

  function playerList(){
    var directive = {
      templateUrl: 'app/components/player-list/player-list.component.html',
      controller: Controller,
      controllerAs: 'playerlist'
    };

    return directive;
  }

  function Controller() {
    var vm = this;

    vm.toggleLock = toggleLock;
    vm.reset = reset;

    var ogPossibles = {
      'Field Corner': ['White'],
      'Boundary Corner': ['Lewis', 'McFadden'],
      'Star': ['Lewis', 'Taylor', 'Westbrook', 'Marshall'],
      'Strong Safety': ['Lewis', 'Westbrook', 'Marshall', 'Andrews'],
      'Free Safety': ['James']
    };

    var possibles = angular.copy(ogPossibles);

    var template = {
      'Field Corner': null,
      'Boundary Corner': null,
      'Star': null,
      'Strong Safety': null,
      'Free Safety': null
    };

    vm.results = getList(template, possibles);

    function reset(){
      debugger;
      possibles = angular.copy(ogPossibles);

      vm.results = getList(template, possibles);
    }

    function toggleLock(position, name){
      if(possibles[position].length < 2){
        throw new Error('Removing that player would result in an empty list');
      }

      var oldPossibles = possibles;

      if(_.find(possibles[position], function(possible){
        return possible === name;
      }) === null){
        possibles[position].push(name);
      } else {
        _.remove(possibles[position], function(playerName){
          return playerName === name;
        });
      }

      var newResults = getList(template, possibles);

      if(newResults.length < 1){
        possibles = oldPossibles;
        throw new Error('Removing that player would result in an empty list');
      }else{
        vm.results = newResults;
      }
    }

    function getList(template, possibles){
      var done = false;
      var entry;
      var results = [];

      var fcCount = possibles['Field Corner'].length - 1,
          bcCount = possibles['Boundary Corner'].length - 1,
          starCount = possibles['Star'].length - 1,
          ssCount = possibles['Strong Safety'].length - 1,
          fsCount = possibles['Free Safety'].length - 1;

      do{
        entry = getEntry(template,
                         possibles,
                         fcCount,
                         bcCount,
                         starCount,
                         ssCount,
                         fsCount);

        if(_.uniq(_.values(entry)).length === _.keys(entry).length &&
         _.filter(results, function(result) {
          return result === entry;
        }).length === 0){
            results.push(entry);
        }

        if(fsCount <= 0 &&
          ssCount <= 0 &&
          starCount <= 0 &&
          bcCount <= 0 &&
          fcCount <= 0){
          done = true;
        }else{
          if(fsCount > 0) {
            fsCount--;
          } else if(ssCount > 0) {
            fsCount = possibles['Free Safety'].length - 1;
            ssCount--;
          } else if(starCount > 0) {
            ssCount = possibles['Strong Safety'].length - 1;
            fsCount = possibles['Free Safety'].length - 1;
            starCount--;
          } else if(bcCount > 0) {
            starCount = possibles['Star'].length - 1;
            ssCount = possibles['Strong Safety'].length - 1;
            fsCount = possibles['Free Safety'].length - 1;
            bcCount--;
          } else if(fcCount > 0) {
            bcCount = possibles['Boundary Corner'].length - 1;
            starCount = possibles['Star'].length - 1;
            ssCount = possibles['Strong Safety'].length - 1;
            fsCount = possibles['Free Safety'].length - 1;
            fcCount--;
          }
        }
      }while(!done);

      return results;
    }

    function getEntry(template, possibles, fcIndex, bcIndex, starIndex, ssIndex, fsIndex){
      var entry = angular.copy(template);

      entry['Field Corner'] = possibles['Field Corner'][fcIndex];
      entry['Boundary Corner'] = possibles['Boundary Corner'][bcIndex];
      entry['Star'] = possibles['Star'][starIndex];
      entry['Strong Safety'] = possibles['Strong Safety'][ssIndex];
      entry['Free Safety'] = possibles['Free Safety'][fsIndex];

      return entry;
    }
  }
})();
