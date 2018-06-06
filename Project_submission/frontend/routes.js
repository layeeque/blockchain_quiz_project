var app = angular.module('myExame', ['ngRoute'])
app.config(($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: './views/entry.html',
            controller: 'mainController'
        })
        .when('/login', {
            templateUrl: './views/login.html',
            controller: 'loginController'
        })
        .when('/home', {
            templateUrl: './views/home.html',
            controller: 'homeController'
        })
        .when('/test', {
            templateUrl: './views/test.html',
            controller: 'testController'
        })

        .when('/result', {
            templateUrl: './views/result.html',
            controller: 'resultController'
        })

})

app.factory('loginInfo', function() {
    var ID = 13;
    var Account = 13;
    // factory function body that constructs shinyNewServiceInstance
    return {
        setData: (_ID, _Account) => {
            console.log('seting Account'+_Account)
            this.ID = _ID;
            this.Account = _Account;
        },
        getData: () => {
            console.log('getting Account'+this.Account)
            return { "ID": this.ID, "Account": this.Account };
        }

    }
});

app.factory('questions', function() {
    var question;
    // factory function body that constructs shinyNewServiceInstance
    return {
        setQuestions: (_question) => {
            console.log("coming........")
            this.question = _question;

        },
        getQuestions: () => {
            console.log("coming.....geting...")
            return this.question;

        }

    }
});