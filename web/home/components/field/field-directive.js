'use strict';

var fieldRendererDirective = BrowsePassDirectives.directive('fieldRenderer', ['$timeout', '$window',
    function($timeout, $window) {
        return {
            restrict: 'A',
            scope: {
                field: '=fieldRenderer'
            },
            templateUrl: 'components/field/field-template.html',
            link: function(scope, element, attrs) {
                scope.masked = scope.field['protected'];
                scope.unmask = function() {
                    scope.masked = !scope.masked;
                    // Wait for the hidden text to display first, then select it.
                    $timeout(function() {
                        scope.select();
                    }, 100);
                    // Remember to hide the text again after timeout
                    $timeout(function() {
                        scope.masked = !scope.masked;
                    }, 10000);
                }
                scope.select = function() {
                    var htmlElem = element[0];
                    var selectElem = htmlElem.getElementsByClassName('select-this')[0];
                    var range = $window.document.createRange();
                    range.selectNodeContents(selectElem);
                    var selection = $window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
                scope.isBlob = function() {
                    return scope.field['blob'];
                }
                scope.isImage = function() {
                    return getMimeType(scope.field['name']).indexOf('image/') == 0;
                }
                scope.getDataUrl = function() {
                    console.log('data:' + getMimeType(scope.field['name']) + ';base64,' + scope.field['value']);

                    var decodedString = atob(scope.field['value']);
                    console.log(decodedString); // Outputs: "Hello World!"

                    return 'data:' + getMimeType(scope.field['name']) + ';base64,' + scope.field['value'];
                }
                scope.canCopyToClipboard = scope.$parent.appConfig.canCopyToClipboard;
                scope.copyToClipboard = function() {
                    function copyField(evt) {
                        evt.clipboardData.setData('text', scope.field['value']);
                        evt.preventDefault();
                    }
                    document.addEventListener('copy', copyField);
                    document.execCommand('copy');
                    document.removeEventListener('copy', copyField);
                }
            },
        }
    }]);
