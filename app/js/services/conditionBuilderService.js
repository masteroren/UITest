(function(){
    'use strict'

    app.service('conditionsBuilderService', ConditionsBuilderService);

    ConditionsBuilderService.$inject = ['$filter'];

    function ConditionsBuilderService($filter){

        var self = this;
        var selectedRow;

        var rowsStructure = {
                    root: [

                    ]
                }

        //***********************
        this.add = function(){

            var _level = 0;

            if (rowsStructure.root.length != 0){
                rowsStructure.root[0].level = 1;
                _level = 1;
            }

            rowsStructure.root.push({
                level: _level,
                nestedRows: []
            })

            setIndexes(rowsStructure.root, '');

            selectedRow = {};
        }
        //***********************

        //***********************
        this.addBelow = function(selectedRow){

            var row = selectedRow.rowElement;

            if (!!row == null){
                alert('Select a line');
            }

            var index = parseInt(row.attr('id'));
            var level = parseInt(row.attr('level'));
            var uniqueIndex = selectedRow.rowUniqueIndex;

            addNestedRows(index, level, uniqueIndex);
        }
        //***********************

        //***********************
        this.getRow = function(uniqueIndex){
            return getRowObject(rowsStructure.root, uniqueIndex);
        }
        //***********************

        //***********************
        this.getTemplate = function(){
            var template = '';
            return createTemplate(rowsStructure.root, template);
        }
        //***********************

        //***********************
        function addNestedRows(index, level, uniqueIndex){

            var rowObject = getRowObject(rowsStructure.root, uniqueIndex);
            var prevRowObject = getPrevRowObject(rowsStructure.root, uniqueIndex);

            for(var i=0; i<2; i++){

                prevRowObject.nestedRows.push({
                    level: level+1,
                    nestedRows: []
                })
            }

            prevRowObject.nestedRows[0].text = rowObject.text;

            removeRowObject(rowsStructure.root, index, uniqueIndex);

            setIndexes(rowsStructure.root, '');

        }
        //***********************

        //***********************
        function removeRowObject(array, index, uniqueIndex){

            var object = $filter('filter')(array, {uniqueIndex: uniqueIndex})[0];

            if (!!object == false){
                $.each(array, function(_index, _value){

                    removeRowObject(_value.nestedRows, index, uniqueIndex);

                })
            } else {
                 array.splice(index, 1);
             }

        }
        //***********************

        //***********************
        function createTemplate(array, rowTemplate){

            if (array.length == 1 && array[0].nestedRows.length == 0){
                rowTemplate += "<div row id='0' level='0' unique-index='0' text=''></div>"
            } else {

                rowTemplate += "<div class='row'>";
                rowTemplate += "<div class='col-md-1'><div operator></div></div>";
                rowTemplate += "<div class='col-md-11'>";

                $.each(array, function(index, row){

                    rowTemplate += "<div row id='"+ index + "' level='" + row.level + "' unique-index='" + row.uniqueIndex + "' text='" + row.text + "'></div>";

                    if (row.nestedRows.length != 0){
                        rowTemplate = createTemplate(row.nestedRows, rowTemplate);
                    }

                });

                rowTemplate += "</div>";
                rowTemplate += "</div>";
            }

            return rowTemplate;
        }
        //***********************

        //***********************
        function setIndexes(array, uniqueIndex){

            $.each(array, function(index, value){

                value.index = index;
                value.uniqueIndex = uniqueIndex + index;

                if (value.nestedRows){
                    setIndexes(value.nestedRows, value.uniqueIndex);
                }

            })

        }
        //***********************

        //***********************
        function getRowObject(array, uniqueIndex){

            var object;

            $.each(array, function(index, value){

                if (value.uniqueIndex == uniqueIndex){
                    object = value;
                    return false;
                }

                if (value.nestedRows.length != 0){
                    object = getRowObject(value.nestedRows, uniqueIndex);
                }

            })

            return object;

        }
        //***********************

        //***********************
        function getPrevRowObject(array, uniqueIndex){

            var object;

            $.each(array, function(index, value){

                if (value.uniqueIndex == uniqueIndex){
                    object = array[value.index-1];
                }

                if (value.nestedRows.length != 0){
                    object = getPrevRowObject(value.nestedRows, uniqueIndex);
                }

                if (!!object != false){
                    return false;
                }

            })

            return object;

        }
        //***********************
    }

})();