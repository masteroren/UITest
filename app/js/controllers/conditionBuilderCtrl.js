(function(){
    'use strict'

    app.controller('conditionBuilderController', ConditionBuilderController);

    ConditionBuilderController.$inject=['$scope','$compile','conditionsBuilderService'];

    function ConditionBuilderController($scope,$compile,conditionsBuilderService){

        var onConditionTextChanged = $scope.$on('onConditionTextChanged', function(event, args){
            var rowObject = conditionsBuilderService.getRow(args.uniqueIndex);
            rowObject.text = args.text
        })

        // **************
        $scope.add = function(){
            conditionsBuilderService.add();
            drawRows();
        }
        // **************

        // **************
        $scope.addBelow = function(){
            conditionsBuilderService.addBelow($scope.selectedRow);
            drawRows();
        }
        // **************

        // **************
        $scope.addAbove = function(){
        }
        // **************

        // **************
        $scope.removeRow = function(row){
        }
        // **************

        // **************
        function drawRows(){
            $('.container').html('');
            var template = conditionsBuilderService.getTemplate();
            $('.container').append($compile(template)($scope));
        }
        // **************
    }
})();