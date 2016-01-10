(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var LatestTicketsDirectiveController = (function () {
    /* @ngInject */
    function LatestTicketsDirectiveController() {
        this.itemsLimit = 8;
        //TODO
    }
    return LatestTicketsDirectiveController;
})();
function LatestTicketsDirectiveFactory() {
    return {
        restrict: 'E',
        scope: {
            items: '='
        },
        template: '',
        controller: LatestTicketsDirectiveController,
        controllerAs: 'ctrl',
        bindToController: true
    };
}
exports.__esModule = true;
exports["default"] = LatestTicketsDirectiveFactory;

},{}],2:[function(require,module,exports){
/*@ngInject*/
function ticketsRoutingConfig($stateProvider) {
    $stateProvider
        .state("");
}
exports.__esModule = true;
exports["default"] = ticketsRoutingConfig;

},{}],3:[function(require,module,exports){
/// <reference path='../typings/tsd.d.ts' />
var latest_tickets_drv_1 = require('./latest-tickets/latest-tickets.drv');
var tickets_routing_config_1 = require('./tickets-routing.config');
var tickets_srv_1 = require('./tickets.srv');
angular.module('tickets', ['ui.router'])
    .directive('latestTickets', latest_tickets_drv_1["default"])
    .config(tickets_routing_config_1["default"])
    .service('ticketsService', tickets_srv_1["default"])
    .controller('ticketsCtrl', function (ticketsService) {
    var _this = this;
    ticketsService.getGreetingsMessage()
        .then(function (data) {
        _this.greetings = data;
    });
});

},{"./latest-tickets/latest-tickets.drv":1,"./tickets-routing.config":2,"./tickets.srv":4}],4:[function(require,module,exports){
var TicketsService = (function () {
    function TicketsService($http) {
        this.$http = $http;
        this.greetingsMessage = 'Welcome!';
    }
    TicketsService.prototype.getGreetingsMessage = function () {
        console.log('getting message from server');
        // return this.$http.get('http://localhost:3000/test')
        //   .then(function (response) {
        //       return response.data;
        //   });
        return this.$http.get('http://localhost:3000/test')
            .then(function (res) { return res.data; });
    };
    return TicketsService;
})();
exports.__esModule = true;
exports["default"] = TicketsService;

},{}]},{},[3]);
