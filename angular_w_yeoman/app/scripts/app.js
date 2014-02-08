'use strict';

var myModule = angular.module('Angello', ['ngCookies']);

myModule.controller('MainCtrl', function ($scope, $http,  angelloHelper, angelloModel, $cookieStore) {
    $scope.currentStory;

    $scope.types = angelloModel.getTypes();
    $scope.statuses = angelloModel.getStatuses();
    $scope.stories = angelloModel.getStories();

    $scope.typesIndex = angelloHelper.buildIndex($scope.types, 'name');
    $scope.statusesIndex = angelloHelper.buildIndex($scope.statuses, 'name');

    $scope.setCurrentStory = function (story) {
        $scope.currentStory = story;

        $scope.currentStatus = $scope.statusesIndex[story.status];
        $scope.currentType = $scope.typesIndex[story.type];
    };

    $scope.setCurrentStatus = function (status) {
        if (typeof $scope.currentStory !== 'undefined') {
            $scope.currentStory.status = status.name;
        }
    };

    $scope.setCurrentType = function (type) {
        if (typeof $scope.currentStory !== 'undefined') {
            $scope.currentStory.type = type.name;
        }
    };

    $scope.createStory = function () {
        $scope.stories.push({title: $scope.newStory.title, description: $scope.newStory.description});
    };


    $http.get('http://localhost:3000/login').success(function (res) {
        $scope.status = 'You are ' + (res.loggedIn?'':'not ') + 'logged in';
    });

    $scope.user = {};

    $scope.login = function(user) {
        $http.post('http://localhost:3000/login',
            {
                user: user.name,
                password: user.password
            }
        ).success(function (res){
            alert('SUCCESS');
           $scope.status = 'You are' +
               (res.loggedIn ? '' : 'not') + 'logged in';

            if(res.loggedIn){
                $cookieStore.put('sessionToken', res.token);
            }
        });
    }
});

myModule.factory('angelloHelper', function () {
    var buildIndex = function (source, property) {
        var tempArray = [];

        for (var i = 0; i < source.length; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };
    return {buildIndex: buildIndex}

});

myModule.factory('angelloModel', function () {
    var getStatuses = function () {
        var tempArray = [
            {name: 'Back Log'},
            {name: 'To Do'},
            {name: 'In Progress'},
            {name: 'Code Review'},
            {name: 'QA Review'},
            {name: 'Verified'},
            {name: 'Done'}
        ];
        return tempArray;
    };

    var getTypes = function () {
        var tempArray = [
            {name: 'Feature'},
            {name: 'Enhancement'},
            {name: 'Bug'},
            {name: 'Spike'}
        ];
        return tempArray;
    };

    var getStories = function () {
        var tempArray = [
            {title: 'Story 00', description: 'Description Pending', criteria: 'Criteria Pending', status: 'To Do', type: 'Bug', reporter: 'Joel Tellez', assignee: 'Brian Ford'},
            {title: 'Story 01', description: 'Description Pending'},
            {title: 'Story 02', description: 'Description Pending'},
            {title: 'Story 03', description: 'Description Pending'},
            {title: 'Story 04', description: 'Description Pending'},
            {title: 'Story 05', description: 'Description Pending'}
        ];
        return tempArray;
    };

    return {getStatuses: getStatuses, getTypes: getTypes, getStories: getStories};
});
