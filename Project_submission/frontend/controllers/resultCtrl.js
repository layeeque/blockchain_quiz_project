angular.module('myExame')
    .controller('resultController', ['$scope', '$location','loginInfo','$http', function($scope, $location,loginInfo,$http) {

        $scope.id = loginInfo.getData().Account;

        startTest = () => {
            var datam={
                "participant":$scope.id
                       }

            $http.post('http://localhost:3000/getScore',datam).then(function (data1) {
                console.log("received result is " + JSON.stringify(data1.data))
                 $scope.score = data1.data;

              
            })
        }
        startTest();
    }])