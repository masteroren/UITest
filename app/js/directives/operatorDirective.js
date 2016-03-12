(function(){
    'use string'

    app.directive('operator', Operator);

    Operator.$inject = [];

    function Operator(){

        return {

            scope:{
                operatorText: '@',
                operatorType: '@'
            },
            templateUrl: "app/views/partials/operatorTemplate.html",
            link: function(scope, element){

                scope.operatorText = 'AND';
                scope.operatorType = 0;

                element.bind('click', function(){
                    switch (scope.operatorType){
                        case 0:
                            scope.operatorType = 1;
                            scope.operatorText = 'OR';
                            break;
                        case 1:
                            scope.operatorType = 0;
                            scope.operatorText = 'AND';
                            break;
                    }

                    scope.$apply();
                })

            }

        }

    }
})();