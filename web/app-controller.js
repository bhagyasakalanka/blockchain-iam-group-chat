'use strict';

var appController = BrowsePassControllers.controller('AppController', ['$scope', 'VaultService',
    function($scope, vaultService) {
        $scope.appConfig = {};
        // Should groups be shown? To only display entries, set to false.
        $scope.appConfig.showGroups = false;
        // Search term to filter the list.
        $scope.appConfig.filter = '';
        // $scope.loadedGoogleApis = {
        //     auth: false,
        //     picker: false,
        //     drive: false,
        // }
        $scope.appConfig.canCopyToClipboard = undefined;
        // This function is only usable in user-generated event such as "click".
        // The only meaningful button we have is the Load button. So the open
        // controller will call this function in load().
        $scope.testCopyToClipboard = function() {
            $scope.appConfig.canCopyToClipboard = false;
            function copyOkay(e) {
                $scope.appConfig.canCopyToClipboard = 'clipboardData' in e;
            }
            document.addEventListener('copy', copyOkay);
            try {
                document.execCommand('copy');
            } catch (e) {
                // okay to fail, it means no copy support.
            } finally {
                document.removeEventListener('copy', copyOkay);
            }
        }
        // $scope.canOpenGDrive = function() {
        //     return ($scope.loadedGoogleApis.auth && $scope.loadedGoogleApis.picker && $scope.loadedGoogleApis.drive);
        // }
        $scope.isLoaded = function() {
            return vaultService.isLoaded();
        }
        $scope.$watch('appConfig.showGroups', function(newValue, oldValue) {
            if (newValue == true) {
                $scope.appConfig.filter = '';
            }
        });
        $scope.$watch('appConfig.filter', function(newValue, oldValue) {
            if (newValue.length > 0) {
                $scope.appConfig.showGroups = false;
            }
        });
    }]);
