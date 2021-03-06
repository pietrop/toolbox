'use strict';

class SearchCtrl {
  constructor ($scope, WordPress) {
  	$scope.filters = {
  		acf: {}
  	};

    $scope.verifiedTick = function() {
    	if($scope.filters.acf.organisation_verified) {
    		delete $scope.filters.acf.organisation_verified;
    	} else {
    		$scope.filters.acf.organisation_verified = true;
    	}
    };

    $scope.demoTick = function() {
    	if($scope.filters.acf.has_demo) {
    		delete $scope.filters.acf.has_demo;
    	} else {
    		$scope.filters.acf.has_demo = true;
    	}
    };

   	$scope.term = null;
   	$scope.documentationLanguage = null;
   	$scope.demo = null;

   	$scope.search = function() {
   		$scope.records = null;
   		$scope.loading = true;
   		$scope.error = false;

   		WordPress.get({
	      type: 'app',
	      'filter[taxonomy]': 'post_tag',
	      'filter[term]': $scope.term,
	      'filter[orderby]': 'meta_value_num',
	      'filter[meta_key]': 'upvotes',
	      'filter[order]': 'DESC'
	    }).then(data => {
	    	if(data.data.length > 0) {
		    	$scope.records = data.data;
		    } else {
		    	$scope.error = 'Sorry, we didn\'t find results for "' + $scope.term + '"';
		    }
		    $scope.loading = false;
	    });
   	};

   	$scope.higherDownvotes = function(upvotes, downvotes) {
   		if(parseInt(upvotes) < parseInt(downvotes)) {
   			return true;
   		}

   		return false;
   	};

   	$scope.higherUpvotes = function(upvotes, downvotes) {
   		if(parseInt(upvotes) >= parseInt(downvotes)) {
   			return true;
   		}

   		return false;
   	};
  }
}

SearchCtrl.$inject = ['$scope', 'WordPressProvider'];

export default SearchCtrl;
