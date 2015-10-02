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
.controller("RadarCtrl", function ($scope, chicagoDataAPIService) {
  $scope.labels = ["Risk 1 (High)", "Risk 2 (Medium)", "Risk 3 (Low)"];
  $scope.series = ["Grocery Stores", "Bakeries"];
  $scope.data = [[0, 0, 0], [0, 0, 0]];

  //Gather risk data for grocery stores and bakeries.
  $scope.getRiskData = function() {
    chicagoDataAPIService.getRisk(1, 'Grocery Store')
      .then(function(riskAmount) {
        $scope.data[0][0] = riskAmount;
    });

    chicagoDataAPIService.getRisk(2, 'Grocery Store')
      .then(function(riskAmount) {
        $scope.data[0][1] = riskAmount;
    });

    chicagoDataAPIService.getRisk(3, 'Grocery Store')
      .then(function(riskAmount) {
        $scope.data[0][2] = riskAmount;
    });

    chicagoDataAPIService.getRisk(1, 'Bakery')
      .then(function(riskAmount) {
        $scope.data[1][0] = riskAmount;
    });

    chicagoDataAPIService.getRisk(2, 'Bakery')
      .then(function(riskAmount) {
        $scope.data[1][1] = riskAmount;
    });

    chicagoDataAPIService.getRisk(3, 'Bakery')
      .then(function(riskAmount) {
        $scope.data[1][2] = riskAmount;
    });
  }

  //update risk data in current scope
  $scope.getRiskData();
});