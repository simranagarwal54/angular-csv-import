'use strict';

angular.module('examplesApp')
 .controller('MainCtrl', ['$scope', '$parse', function ($scope, $parse) {
    $scope.Math = window.Math;
    $scope.csv = {
    	content: null,
    	header: true,
    	headerVisible: true,
    	separator: ',',
    	separatorVisible: true,
    	result: null,
    	encoding: 'ISO-8859-1',
    	encodingVisible: true,
        uploadButtonLabel: "upload a csv file",
        progressCallback: function(progress) {
            $scope.$apply( function() {
                $scope.progress = progress;
            });
        },
        streamingCallback: function(stream) {
            if ( typeof stream != "undefined" ) {
                $scope.$apply( function() {
                    $scope.preview = stream[Math.floor(Math.random()*stream.length)];
                });
            }
        },
        streamingErrorCallback: function(streamError) {
            console.log(streamError);
        }
    };

    var _lastGoodResult = '';
    $scope.toPrettyJSON = function (json, tabWidth) {
		var objStr = JSON.stringify(json);
		var obj = null;
		try {
			obj = $parse(objStr)({});
		} catch(e){
			// eat $parse error
			return _lastGoodResult;
		}

		var result = JSON.stringify(obj, null, Number(tabWidth));
		_lastGoodResult = result;

		return result;
    };
}]);
