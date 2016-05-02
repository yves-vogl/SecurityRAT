'use strict';

angular.module('sdlctoolApp')
    .controller('StatusColumnBulkController',function($scope, $stateParams, $uibModalInstance, $filter, entity, StatusColumn, sharedProperties) {
    	$scope.statusColumns = [];
    	$scope.state = {
    			active: true,
    			isEnum: true
    	}
    	
    	$scope.getIndeterminateForActiveButton = function(selector) {
        	var count = 0;
        	$scope.state[selector] = $scope.statusColumns[0][selector];
        	angular.forEach($scope.statusColumns, function(stat) {
    			if(stat[selector] === $scope.state[selector]) {
    				count++
    			}
        	});
        	
        	if(count !== $scope.statusColumns.length) {
        		delete $scope.state[selector];
        	}
        }
    	
        $scope.loadAll = function() {
        	$scope.showTypes = 'Show selected option columns';
    		$scope.glyphicon = "glyphicon glyphicon-plus";
    		$scope.show = true;
        	$scope.statusColumns = sharedProperties.getProperty();
        	$scope.getIndeterminateForActiveButton('active');
        	$scope.getIndeterminateForActiveButton('isEnum');
        };
        $scope.loadAll();
        
        $scope.toggleShowHide = function() {
        	$scope.show = !$scope.show;
        	if($scope.show) {
        		$scope.showTypes = 'Show selected option columns';
        		$scope.glyphicon = "glyphicon glyphicon-plus";
        	} else {
        		$scope.showTypes = 'Hide selected option columns';
        		$scope.glyphicon = "glyphicon glyphicon-minus";
        	}
        }  		  
        var onSaveFinished = function (result) {
            $scope.$emit('sdlctoolApp:statusColumnUpdate', result);
            $uibModalInstance.close(result);
        };

        $scope.save = function () {
    		angular.forEach($scope.statusColumns, function(statColumn) {
    			if(angular.isDefined($scope.state.active))
    				statColumn.active = $scope.state.active;
    			if(angular.isDefined($scope.state.isEnum))
    				statColumn.isEnum = $scope.state.isEnum;
    			StatusColumn.update(statColumn, onSaveFinished);
    		});
        };
        
        $scope.clear = function() {
        	$uibModalInstance.dismiss('cancel');
        };
    });