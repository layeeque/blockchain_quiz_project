angular.module('myExame')
    .controller('homeController', ['$scope', 'loginInfo', 'questions', '$http', '$location',
        function($scope, loginInfo, questions, $http, $location) {
            $scope.id = loginInfo.getData().ID;
            $scope.account = loginInfo.getData().Account;



        }
    ])