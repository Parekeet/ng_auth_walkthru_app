(function() {
  'use strict';

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$http", "$scope", "$log", "$state"];

  function ProfileController($http, $scope, $log, $state) {
    var vm = this;

    vm.all    = [];
    vm.category;
    vm.submit = submit;
    vm.remove = remove;
    vm.order  = [];
    vm.total   = 0;

    selectFood();

    vm.placeOrder = function() {
      $http.post('/api/orders', {
        items: vm.order,
        total: vm.total,
        phoneNumber: vm.order.phoneNumber || 'n/a'
      })
      .then(function(order) {
        // possibly show new order message

        $state.go('pending');
      });
    };

    function selectFood() {
      $http
        .get('/api/profile')
        .then(function(data) {
          vm.all = data.data;
          vm.categories = []
          vm.all.forEach(function (item) {
            if (vm.categories.indexOf(item.category) < 0) {
              vm.categories.push(item.category);
            }
          })
          console.log(data);
        }, function(err) {
          console.log(err);
        });
    }

    function submit(itemId) {
      //push stuff to an array
      if (itemId) {
        var item = _.find(vm.all, {_id: itemId});
        vm.order.push(item);
        vm.total += item.cost;
        // getTotal();
      }
    }

    function remove() {
      console.log("I'm working");

    };


    function getTotal(){
        var total = 0;
        for(var i = 0; i < order.item.length; i++){
            var item = order.item[i];
            total += (order.cost);
            vm.total.push(order.cost);
        }
        return total;
    }



    document.getElementById("category-selection").addEventListener("change", function (evt) {
      document.getElementById('order').value = ''
      vm.item = null
    })

  }

})();


console.log("PROFILE CONTROLLER HERE!");



