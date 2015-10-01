angular.module('foodInspection', [
  'chart.js',
  'foodInspection.services'
])
.controller("LineCtrl", function ($scope, chicagoDataAPIService) {
  $scope.data = [[],[]];
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.series = ['Passing', 'Failing'];

  $scope.getMonthlyData = function() {
    chicagoDataAPIService.getData('?$limit=2000&$order=inspection_date DESC&$where=facility_type = \'Grocery Store\' AND results = \'Pass\' AND inspection_date >= \'2015-01-01\' AND inspection_date <= \'2015-12-31\'')
      .then(function(monthlyData) {
        $scope.data[0] = monthlyData;
    });

    chicagoDataAPIService.getData('?$limit=2000&$order=inspection_date DESC&$where=facility_type = \'Grocery Store\' AND results = \'Fail\' AND inspection_date >= \'2015-01-01\' AND inspection_date <= \'2015-12-31\'')
      .then(function(monthlyData) {
        $scope.data[1] = monthlyData;
    });

  }

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  $scope.getMonthlyData();
});