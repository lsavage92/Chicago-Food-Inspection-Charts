angular.module('foodInspection', [
  'chart.js',
  'foodInspection.services'
])
.controller("LineCtrl", function ($scope, chicagoDataAPIService) {
  $scope.passFailData = [[],[]];
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.series = ['Passing', 'Failing'];

  $scope.getMonthlyData = function() {
    chicagoDataAPIService.getMonthlyAmount('?$limit=2000&$order=inspection_date DESC&$where=facility_type = \'Grocery Store\' AND results = \'Pass\' AND inspection_date >= \'2015-01-01\' AND inspection_date <= \'2015-12-31\'')
      .then(function(monthlyData) {
        $scope.passFailData[0] = monthlyData;
    });

    chicagoDataAPIService.getMonthlyAmount('?$limit=2000&$order=inspection_date DESC&$where=facility_type = \'Grocery Store\' AND results = \'Fail\' AND inspection_date >= \'2015-01-01\' AND inspection_date <= \'2015-12-31\'')
      .then(function(monthlyData) {
        $scope.passFailData[1] = monthlyData;
    });

  }

  $scope.getMonthlyData();
})
.controller("RadarCtrl", function($scope, chicagoDataAPIService) {

});