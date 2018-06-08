/**
 * Created by BeSsem on 06/11/2016.
 */
angular.module('ApiFromNode', [])
    .controller('mainController', ['$http', function ($http) {

        this.getdata = function () {
            var that = this;
            var param = 'test'
            $http.get('/api/todos/'+param).then(function (data) {
                that.data = data.data;
                console.log(that.data)
            });
        }
    }]);