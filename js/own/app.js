
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('tiesometer', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        .state('form', {
            url: '/app',
            templateUrl: 'form.html',
            controller: 'formController'
        })
        
        .state('form.inicio', {
            // url: '/inicio',
            templateUrl: 'form-inicio.html'
        })

        .state('form.percepcion', {
            // url: '/percepcion',
            templateUrl: 'form-percepcion.html'
        })
    
        .state('form.vamos', {
            // url: '/vamos',
            templateUrl: 'form-vamos.html'
        })
        
        .state('form.ingresos', {
            // url: '/ingresos',
            templateUrl: 'form-ingresos.html'
        })
        
        .state('form.cdv-material', {
            // url: '/calidad-de-vida-material',
            templateUrl: 'form-cdv-material.html'
        })
        
        .state('form.cdv-educativa', {
            // url: '/calidad-de-vida-educativa',
            templateUrl: 'form-cdv-educativa.html'
        })
        
        .state('form.cdv-social', {
            // url: '/calidad-de-vida-social',
            templateUrl: 'form-cdv-social.html'
        })
        
        .state('form.participacion', {
            // url: '/participacion',
            templateUrl: 'form-participacion.html'
        })

        .state('form.final', {
            // url: '/final',
            templateUrl: 'form-final.html'
        })
        
        .state('resultado', {
            url: '/:hash',
            templateUrl: 'resultado.html',
            controller: 'resultadoController'
        })
       
    // catch all route
    // send users to the begin page 
    $urlRouterProvider.otherwise('app');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope, $state, $location, $timeout) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    $state.go('form.percepcion');

    $scope.goTo = function(state) {
        $timeout(function() {
            $state.go(state);
        }, 500);
    }
    
    // function to process the form
    $scope.processForm = function() {
        var d = $scope.formData;
        var tmpcdv = parseInt(d.cdvmaterial) + parseInt(d.cdveducativa) + parseInt(d.cdvsocial);
        var cdv = 5;
        switch(tmpcdv) {
            case 3:
                cdv = 1;
                break;
            case 2:
                cdv = 2;
                break;
            case 1:
                cdv = 4;
                break;
            case 0:
                cdv = 5;
                break;
        }
        var tiesura = (parseInt(d.ingresos) + parseInt(cdv) + parseInt(d.participacion))/3;
        // Transform tiesura from (1,5) to (0,4) to calculare percentage properly
        tiesura = Math.round(((tiesura-1)*100)/4);
        // Google Analytics must be previously added
        console.log(ga);
        ga('send', 'event', {
            eventCategory: 'Tiesura',
            eventAction: 'finish',
            eventLabel: 'Porcentaje de tiesura',
            eventValue: tiesura+"%",
            transport: 'beacon'
        });
        $location.path(tiesura.toString().length+'Lt5'+tiesura+'MtR0');
    };
    
})

.controller('resultadoController', function($scope, $state, $stateParams, $location) {

    $scope.register_event = function(type, label) {
        // Google Analytics must be previously added
        ga('send', 'event', {
            eventCategory: type,
            eventAction: 'click',
            eventLabel: label,
            transport: 'beacon'
        });
    }

    $scope.get_desc_from_tiesura = function(t) {
        t = parseInt(t);
        if (t in _.range(0,20))
            return "Estoy en el taco";
        else if (t in _.range(20,40))
            return "No me puedo quejar";
        else if (t in _.range(40,60))
            return "Tiesura media";
        else if (t in _.range(60,80))
            return "La tiesura me aprieta demasiao";
        else 
            return "No puedo con más tiesura";
    }

    // Get the ranking value from hash (just the first two digits)
    var hash = $stateParams.hash;
    if ($location.$$port) port = ':'+$location.$$port;
    else port = '';
    $scope.reloadurl = $location.$$protocol+'://'+$location.$$host+port+'/%23'+$location.$$url+'r';
    if (hash != 'actua') {
        $scope.tiesura = hash.substr(4, hash.charAt(0));
        $scope.tiesura_desc = $scope.get_desc_from_tiesura($scope.tiesura);
        $scope.reload = $stateParams.hash.charAt($stateParams.hash.length-1) == 'r';
        $scope.load = !$scope.reload;
        $scope.incidence = true;
        $scope.showresult = true;
    } else {
        $scope.incidence = false;
        $scope.showresult = false;
        $scope.reload = true;
        $scope.load = !$scope.reload;
    }
});


