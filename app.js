
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
            url: '/inicio',
            templateUrl: 'form-inicio.html'
        })

        .state('form.percepcion', {
            url: '/percepcion',
            templateUrl: 'form-percepcion.html'
        })
    
        .state('form.vamos', {
            url: '/vamos',
            templateUrl: 'form-vamos.html'
        })
        
        .state('form.ingresos', {
            url: '/ingresos',
            templateUrl: 'form-ingresos.html'
        })
        
        .state('form.cdv-material', {
            url: '/calidad-de-vida-material',
            templateUrl: 'form-cdv-material.html'
        })
        
        .state('form.cdv-educativa', {
            url: '/calidad-de-vida-educativa',
            templateUrl: 'form-cdv-educativa.html'
        })
        
        .state('form.cdv-social', {
            url: '/calidad-de-vida-social',
            templateUrl: 'form-cdv-social.html'
        })
        
        .state('form.participacion', {
            url: '/participacion',
            templateUrl: 'form-participacion.html'
        })
        
        .state('form.final', {
            url: '/final',
            templateUrl: 'form-final.html'
        })
       
    // catch all route
    // send users to the begin page 
    $urlRouterProvider.otherwise('/app/inicio');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        alert('Tieso!');
    };
    
});

