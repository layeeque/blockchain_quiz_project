angular.module('myExame').controller('loginController', ['$scope', 'loginInfo', '$log', '$http', '$location', function($scope, loginInfo, $log, $http, $location) {

    console.log($scope.id);
    $scope.signIn = () => {

        datam = {
            "ID": $scope.ID,
            "Password": $scope.Password
        }
        $http.post('http://localhost:3000/login', datam).then(function(data1) {
            console.log("received data is " + data1.data[0].Account)
            if (data1.data != false) {
                loginInfo.setData(data1.data[0].ID, data1.data[0].Account)
                $location.path('/home')
            } else {
                $location.path('/login')
            }
        })



    }
}])