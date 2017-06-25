function App($scope, $http){
    
    var refresh = function(){
        $http.get('/contactList').success(function(res) {
        $scope.contactlst = res;
        $scope.contact = "";     
        });
    };
   
    refresh();
    
    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactList', $scope.contact).success(function(response){
            refresh();
        });
    };
    
    $scope.remove = function(id){
        $http.delete('/contactList/' + id).success(function(response){
            refresh();
        });
    };
    
    $scope.edit = function(id){
        $http.get('/contactList/' + id).success(function(response){
            $scope.contact = response;
        });
    };
    
    $scope.update = function(){
        $http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response){
            refresh();
        });
    };
    
    $scope.deselect = function(){
        $scope.contact = "";
    };
}