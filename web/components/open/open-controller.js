'use strict';

var openController = BrowsePassControllers.controller('OpenController',
    ['$scope', '$http', '$location', 'DialogService', 'VaultService',
    function($scope, $http, $location, dialogService, vaultService) {
        $scope.clear = function() {
            $scope.sources = {};
            $scope.sources.file = {};
            //$scope.sources.gdrive = {};
            $scope.sources.url = $location.hash();
            $scope.selected = {};
            $scope.selected.source = null;

            $scope.credentials = {};
            $scope.credentials.password = '';
            $scope.credentials.file = {};
            //$scope.credentials.gdrive = {};
            $scope.selected.credentials = {};
        }

        $scope.clear();

        // $scope.$watch('sources.gdrive', function(newValue, oldValue) {
        //     if (newValue != oldValue && newValue.hasOwnProperty('name')) {
        //         $scope.selected.source = 'GDrive';
        //     }
        // }, true);


        $scope.$watch('sources.file', function(newValue, oldValue) {
            if (newValue != oldValue && newValue.hasOwnProperty('name')) {
                $scope.selected.source = 'File';
            }
        }, true);


        // $scope.selected.source = 'File';
        // $scope.selected.source.file.url = "file:///home/miyurud/keepass/Database.kdbx"


        // $scope.$watch('sources.url', function(newValue, oldValue) {
        //     if (newValue != oldValue) {
        //         $scope.selected.source = 'URL';
        //     }
        //     if ($scope.sources.url.trim().length == 0) {
        //         $scope.selected.source = null;
        //     }
        // });

        $scope.$watch('credentials.password', function(newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.selected.credentials.password = newValue.length > 0;
            }
        });
        // $scope.$watch('credentials.gdrive', function(newValue, oldValue) {
        //     if (newValue != oldValue && newValue.hasOwnProperty('name')) {
        //         $scope.selected.credentials.gdrive = true;
        //     }
        // }, true);
        // $scope.$watch('credentials.file', function(newValue, oldValue) {
        //     if (newValue != oldValue && newValue.hasOwnProperty('name')) {
        //         $scope.selected.credentials.file = true;
        //     }
        // }, true);

        $scope.loaded = false;
        $scope.loading = false;

        $scope.load = function() {
            if ($scope.loaded || $scope.loading) {
                return;
            }
            $scope.loading = true;

            function loadStream(stream) {
                var key = '';
                if ($scope.selected.credentials.password) {
                    key += readPassword($scope.credentials.password);
                }
                if (key == '') {
                    dialogService.alert('BrowsePass', 'Please supply at least a password, or a key file to open the vault.');
                    $scope.loading = false;
                    return;
                }

                document.getElementById("loadBtn").style.display = 'none';
                document.getElementById("loadingBtn").style.display = 'block';

                try {
                    vaultService.load(stream, key);
                    $scope.loaded = true;
                    document.getElementById("alertPanel").style.display = 'block';
                    document.getElementById("didPanel").style.display = 'block';

                    $scope.clear();
                } catch (ex) {
                    dialogService.alert('BrowsePass', ex);
                }
                $scope.loading = false;
            }

            // let reader = new FileReader();
            // let content = reader.readAsText("file://home/miyurud/keepass/Database.kdbx");

            var stream = $scope.sources[$scope.selected.source.toLowerCase()].data;
            stream = new jDataView(stream, 0, stream.byteLength, true);
            loadStream(stream);

        }
        $scope.unload = function() {
            vaultService.unload();
            $scope.loaded = false;
        }
    }]);
