/// <reference path="angular.js" />




function contactController($scope, $http, $q) {
    $scope.contacts = [];
    $scope.contact = {};



    init();

    function init() {
        getContacts();


        $scope.viewed = false; //modal was not viewed
        $scope.m_show = "modal"; //hide modal
        $scope.modalActive = true; //modal was not viewed



    }



    $scope.show_modal = function (contact) { //execute when modal opened
        console.log(contact);
        $scope.deleteContact = contact;
        $scope.m_show = "modal-show";
        $scope.modalActive = false;
    }

    $scope.closeDeleteModal = function () { //execute when used wants to delete contact
        $scope.m_show = "modal";
        $scope.modalActive = true;
        console.log($scope.deleteContact.Id);
        remove($scope.deleteContact.Id);
        alert("Deleted!");
        location.reload();
    }

    $scope.closeModal = function () { //user cancels modal
        $scope.m_show = "modal";
        $scope.modalActive = true;
        //location.reload();
    }


    $scope.viewContact = function (id) {//view specific contact
        console.log(id);
        $scope.singleContact = $scope.contacts.filter(function (item) {
            return item.Id == id;
        });
        console.log($scope.singleContact = $scope.singleContact[0]);
        $scope.viewed = true;
    }
    
    $scope.saveContact = function (contact) { //problem z asinhronostjo

        var numContactItems = Object.keys(contact).length;

        if (contact == undefined || numContactItems < 4) {
            alert("empty fields! fill them out!");
            //location.reload();
        
        } else {
            save(contact);
            $scope.newcontact = {};
            alert("new contact made!");
        }
  
    }

 
    function getContacts() { //gets contacts from api, returns array
        
        var deferred = $q.defer();
        
        $http.get('/api/Contact').success(function (results) {
            console.log("results:", results);

            $scope.contacts = results;
            deferred.resolve(results);
            
        }).error(function (data, status, headers, config) {
            deferred.reject('Failed getting contacts');
        });

        return deferred.promise;
    };

    function getContact(id) {//gets single contact
        var deferred = $q.defer();
        $http.get('/api/Contact/' + id).success(function (results) {
            $scope.contact = results;
            deferred.resolve(results);
        }).error(function (data, status, headers, config) {
            deferred.reject('Failed getting contact');
        });

        return deferred.promise;
    };



    function save(contact) { //saves contact
        console.log("value of contact in save function", contact);
        var deferred = $q.defer();
        $http.post('/api/Contact/' ,contact).success(function (results) {
            $scope.contact = results;
            deferred.resolve(results);
        }).error(function (data, status, headers, config) {
            console.log("'Failed saving contact'")
            deferred.reject('Failed saving contact');
        });

        return deferred.promise;
    };

    function edit(contact) {// edits contact, not implemented yet
        var deferred = $q.defer();
        $http.put('/api/Contact/' + contact).success(function (results) {
            $scope.contact = results;
            deferred.resolve(results);
        }).error(function (data, status, headers, config) {
            deferred.reject('Failed editing contact');
        });

        return deferred.promise;
    };

    function remove(id) {// removes contact 
        var deferred = $q.defer();
        $http.delete('/api/Contact/' + id).success(function (results) {
            deferred.resolve(results);
        }).error(function (data, status, headers, config) {
            deferred.reject('Failed deleteing contact');
        });

        return deferred.promise;
    };

    $scope.edit = function (id) {
        var deferred = $q.defer();

        if (id) {
            $scope.title = 'Edit Contact';
            $scope.saveButtonText = 'Update';
            getContact(id);
            $("#modalEdit").modal();
        }
        else {
            $scope.title = 'Add Contact';
            $scope.saveButtonText = 'Save';
            $scope.contact = {};
            $("#modalEdit").modal();
        }
    }

    //$scope.delete = function (id) {
    //    remove(id).then(processSuccess, processError);
    //    getContacts();
    //}

    $scope.save = function () {
        if ($scope.editForm.$valid) {
            if (!$scope.contact.id) {
                save($scope.contact).then(processSuccess, processError);

            }
            else {
                edit($scope.contact).then(processSuccess, processError);
            }

            getContacts();
        }
    }

    function processSuccess() {
        $scope.editForm.$dirty = false;
        toastr.success('Save with success');

        $timeout(function () {
            $route.reload();
        }, 1000);
    }

    function processError(error) {
        toastr.error(error);
    }


}
