(function(){
    'use strict'

    app.directive('row', Row);

    Row.$inject = [];

    function Row(){

        return {

            scope:{
                level: '@',
                uniqueIndex: '@',
                text: '@'
            },
            templateUrl: 'app/views/partials/rowTemplate.html',
            controller: function($scope){
                $scope.fakeArray = [];

                $scope.row = {
                    value: ''
                }

                for(var i = 0; i < $scope.level; i++){
                    $scope.fakeArray.push(i);
                }

                $scope.textChanged = function(){
                    $scope.$emit('onConditionTextChanged', {
                        text: $scope.row.value,
                        uniqueIndex: $scope.uniqueIndex
                    })
                }
            },
            link: function(scope, element, attrs){

                scope.row.value = scope.text == 'undefined' ? '' : scope.text;

                element.bind('click', function(){

                    scope.$parent.selectedRow = {
                        rowElement: element,
                        rowLevel: scope.level,
                        rowUniqueIndex: scope.uniqueIndex
                    }

                })

            }

        }


    }
})();