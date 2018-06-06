angular.module('myExame')
    .controller('mainController', ['$scope', '$location', function($scope, $location) {

        console.log("name is here home ")

        $scope.next = () => {
            $location.path('/login')
        }

        console.log($scope.id)
    }])