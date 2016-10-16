var myModule = angular.module('testyTheCat', ['ngSanitize', 'ngAnimate']);
myModule.controller("updateName", function($scope, $http, $sce) {
  $scope.searchTerm = "";

  $scope.outPut = function() {
    //load wikipedia 

    myBaseUrl = "http://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srwhat=text&prop=redirects&";
    mySearch = "srsearch=" + $scope.searchTerm;
    myCallBack = "&callback=JSON_CALLBACK";
    console.log($scope.searchTerm);
    // sanitize html function use ng-bind-html in view
    $scope.dataSnippet = function(html) {
      return $sce.trustAsHtml(html + "...");
    };
    $scope.wiki = "http://en.wikipedia.org/w/api.php?&action=query&list=search&srwhat=text&prop=info&inprop=url&" + mySearch + myCallBack;
    //&callback=JSON_CALLBACK and jsonp are key
    $http({
        method: "jsonp",
        url: myBaseUrl + mySearch + myCallBack
      })
      .then(function(response) {

        $scope.theData = response.data.query.search;

        //find searches
      });
  }

});