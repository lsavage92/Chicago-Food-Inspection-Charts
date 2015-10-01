angular.module('foodInspection', [
  'chart.js',
  'foodInspection.services'
])
.controller("LineCtrl", function ($scope, chicagoDataAPIService) {
  //$scope.passFailData[0] are the passing values while $scope.passFailData[1] are the failing values
  $scope.passFailData = [[],[]];
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.series = ['Passing', 'Failing'];

  $scope.getMonthlyData = function() {
    //Query for all data in 2015 by month for Grocery Store's that passed inspection
    chicagoDataAPIService.getMonthlyAmount('?$limit=2000&$order=inspection_date DESC&$where=facility_type = \'Grocery Store\' AND results = \'Pass\' AND inspection_date >= \'2015-01-01\' AND inspection_date <= \'2015-12-31\'')
      .then(function(monthlyData) {
        $scope.passFailData[0] = monthlyData;
    });

    //Query for all data in 2015 by month for Grocery Store's that failed inspection
    chicagoDataAPIService.getMonthlyAmount('?$limit=2000&$order=inspection_date DESC&$where=facility_type = \'Grocery Store\' AND results = \'Fail\' AND inspection_date >= \'2015-01-01\' AND inspection_date <= \'2015-12-31\'')
      .then(function(monthlyData) {
        $scope.passFailData[1] = monthlyData;
    });

  }

  //Get data from promises
  $scope.getMonthlyData();
})
.controller("RadarCtrl", function ($scope) {
  $scope.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

  $scope.data = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
});