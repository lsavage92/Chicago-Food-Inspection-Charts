//api endpoint: https://data.cityofchicago.org/resource/4ijn-s7e5
angular.module('foodInspection.services',[])
.factory('chicagoDataAPIService', function($http) {
  var chicagoFoodDataAPI = {};

  chicagoFoodDataAPI._riskLevels = {
    1: "Risk 1 (High)",
    2: "Risk 2 (Medium)",
    3: "Risk 3 (Low)"
  };

  chicagoFoodDataAPI.getMonthlyAmount = function(query) {
    query = query || '';
    var monthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    return $http.get('https://data.cityofchicago.org/resource/4ijn-s7e5' + query)
      .then(function(response) {
        response.data.forEach(function(data) {
          if(data.inspection_date >= '2015-01-01' && data.inspection_date <= '2015-01-31') {
            monthlyData[0]++;
          } else if (data.inspection_date >= '2015-02-01' && data.inspection_date <= '2015-02-28') {
            monthlyData[1]++;
          } else if (data.inspection_date >= '2015-03-01' && data.inspection_date <= '2015-03-31') {
            monthlyData[2]++;
          } else if (data.inspection_date >= '2015-04-01' && data.inspection_date <= '2015-04-30') {
            monthlyData[3]++;
          } else if (data.inspection_date >= '2015-05-01' && data.inspection_date <= '2015-05-31') {
            monthlyData[4]++;
          } else if (data.inspection_date >= '2015-06-01' && data.inspection_date <= '2015-06-30') {
            monthlyData[5]++;
          } else if (data.inspection_date >= '2015-07-01' && data.inspection_date <= '2015-07-31') {
            monthlyData[6]++;
          } else if (data.inspection_date >= '2015-08-01' && data.inspection_date <= '2015-08-31') {
            monthlyData[7]++;
          } else if (data.inspection_date >= '2015-09-01' && data.inspection_date <= '2015-09-30') {
            monthlyData[8]++;
          } else if (data.inspection_date >= '2015-10-01' && data.inspection_date <= '2015-10-31') {
            monthlyData[9]++;
          } else if (data.inspection_date >= '2015-11-01' && data.inspection_date <= '2015-11-30') {
            monthlyData[10]++;
          } else if (data.inspection_date >= '2015-12-01' && data.inspection_date <= '2015-12-31') {
            monthlyData[11]++;
          }
        })
        return monthlyData;
      });
  };

  chicagoFoodDataAPI.getRisk = function(riskLevel, facilityType){
    riskLevel = this._riskLevels[riskLevel] || this._riskLevels[1];
    facilityType = facilityType || 'Grocery Store'
    var riskAmount = 0;
    return $http.get('https://data.cityofchicago.org/resource/4ijn-s7e5?$limit=2000&$where=facility_type = \'' + facilityType + '\' risk = \'' + riskLevel + '\' AND inspection_date >= \'2015-01-01\' AND inspection_date <= \'2015-12-31\'')
      .then(function(response) {
        //returns the amount of establishments with the passed in riskLevel
        return response.data.length;
      });
  };

  return chicagoFoodDataAPI;
});