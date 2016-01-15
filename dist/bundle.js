(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Ticket = (function () {
    function Ticket(id, title, content, userEmail) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userEmail = userEmail;
    }
    Ticket.prototype.getTicketId = function () {
        return this.id;
    };
    Ticket.prototype.getTicketTitle = function () {
        return this.title;
    };
    Ticket.prototype.getTicketContent = function () {
        return this.content;
    };
    Ticket.prototype.getTicketUserEmail = function () {
        return this.userEmail;
    };
    return Ticket;
})();
exports.__esModule = true;
exports["default"] = Ticket;

},{}],2:[function(require,module,exports){
var ticket_1 = require('./ticket');
var TicketList = (function () {
    function TicketList(myTicketList) {
        this.myTicketList = myTicketList;
    }
    TicketList.prototype.getTicketList = function () {
        return this.myTicketList;
    };
    TicketList.prototype.addNewTicket = function (newTicket) {
        this.myTicketList.push(newTicket);
    };
    TicketList.prototype.updateTicketList = function (updatedTicketList) {
        this.myTicketList = updatedTicketList;
    };
    TicketList.uuid = function () {
        return Math.floor(Math.random() * 999999).toString(36);
    };
    TicketList.generateRandomTicketList = function () {
        var t1 = new ticket_1["default"](this.uuid(), 'Hello', 'I have a problem', 'bob@bobcorp.com');
        var t2 = new ticket_1["default"](this.uuid(), 'Problem with domain', 'It is not working', 'alice@alicecorp.com');
        var t3 = new ticket_1["default"](this.uuid(), 'Help me again', 'My site is broken', 'bob@bobcorp.com');
        return new TicketList([t1, t2, t3]);
    };
    return TicketList;
})();
exports.__esModule = true;
exports["default"] = TicketList;

},{"./ticket":1}],3:[function(require,module,exports){
var LatestTicketsDirectiveController = (function () {
    /* @ngInject */
    function LatestTicketsDirectiveController($parse, $element, $scope, ticketsService) {
        var _this = this;
        this.itemsLimit = 5;
        this.title = 'Latest Tickets';
        console.log('builiding the controller, waiting for the promise to be resolved');
        ticketsService.getTicketsPromise()
            .then(function (message) {
            console.log(message);
            _this.items = $parse($element.attr('ng-model'))($scope.$parent);
            console.log('items: ', _this.items);
            _this.items.updateTicketList(_this.items.getTicketList().splice(_this.items.getTicketList().length - _this.itemsLimit, _this.itemsLimit));
            $scope.items = _this.items;
            $scope.title = _this.title;
            $scope.$apply();
        });
    }
    return LatestTicketsDirectiveController;
})();
function LatestTicketsDirectiveFactory() {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {},
        link: function (scope, element, attr, ngModelController) {
            scope.ngModelController = ngModelController;
        },
        template: '<h3>{{title}}</h3>' +
            '<ul class="latest-tickets-list">' +
            '<li class="ticket" ng-repeat="ticket in items.getTicketList()"><a ui-sref="ticket({ticketId: ticket.getTicketId()})"><b>{{ticket.getTicketTitle()}}</b></a><br><pre>{{ticket.getTicketContent().split("\n")[0]}}</pre></li>' +
            '</ul>',
        controller: LatestTicketsDirectiveController
    };
}
exports.__esModule = true;
exports["default"] = LatestTicketsDirectiveFactory;

},{}],4:[function(require,module,exports){
var TicketViewDirectiveController = (function () {
    /* @ngInject */
    function TicketViewDirectiveController($scope) {
        this.ticket = $scope.ticket;
    }
    ;
    return TicketViewDirectiveController;
})();
function TicketViewDirectiveFactory() {
    return {
        restrict: 'E',
        scope: {
            ticket: '='
        },
        template: '<h3>Ticket ID: #{{ctrl.ticket.getTicketId()}} , User Email: <a ui-sref="user-tickets({email: ctrl.ticket.getTicketUserEmail()})">{{ctrl.ticket.getTicketUserEmail()}}</a></h3>' +
            '<ul class="latest-tickets-list">' +
            '<li class="ticket" <b>{{ctrl.ticket.getTicketTitle()}}</b><br><pre>{{ctrl.ticket.getTicketContent()}}</pre></li>' +
            '</ul>',
        controller: TicketViewDirectiveController,
        controllerAs: 'ctrl'
    };
}
exports.__esModule = true;
exports["default"] = TicketViewDirectiveFactory;

},{}],5:[function(require,module,exports){
/*@ngInject*/
function ticketsRoutingConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
        url: '/',
        template: '<h1>{{ctrl.greetings}}</h1>' +
            '<latest-tickets ng-model=ctrl.tickets></latest-tickets>',
        controller: function (ticketsService) {
            var _this = this;
            ticketsService.getGreetingsMessage()
                .then(function (data) {
                _this.greetings = data;
            });
            ticketsService.getTicketsFromServer()
                .then(function (data) {
                _this.tickets = ticketsService.buildTicketsListFromJson(data);
                ticketsService.ticketsPromise.resolve('tickets get request has been resolved!');
            });
        },
        controllerAs: 'ctrl'
    })
        .state('ticket', {
        url: '/ticket/:ticketId',
        resolve: {
            ticket: function ($stateParams, ticketsService, $state) {
                try {
                    // console.log('builiding the routing config, waiting for the promise to be resolved');
                    // ticketsService.getTicketsPromise()
                    // .then((message: string) => {
                    //   console.log('config prmoise has been resolved');
                    return ticketsService.globalTicketList.getTicketList().filter(function (ticket) {
                        return ticket.getTicketId() === $stateParams.ticketId;
                    })[0];
                }
                catch (e) {
                    console.error(e);
                    $state.go('404');
                }
            }
        },
        template: '<ticket-view ticket="ctrl.item"></ticket-view>',
        controller: function (ticket) {
            console.log('UI ROUTE: TICKET: ', ticket);
            this.item = ticket;
        },
        controllerAs: 'ctrl'
    })
        .state('404', {
        template: '<h2>404!</h2>'
    });
}
exports.__esModule = true;
exports["default"] = ticketsRoutingConfig;

},{}],6:[function(require,module,exports){
/// <reference path='../typings/tsd.d.ts' />
var latest_tickets_drv_1 = require('./latest-tickets/latest-tickets.drv');
var ticket_view_drv_1 = require('./ticket-view/ticket-view.drv');
var tickets_routing_config_1 = require('./tickets-routing.config');
var tickets_srv_1 = require('./tickets.srv');
angular.module('tickets', ['ui.router'])
    .service('ticketsService', tickets_srv_1["default"])
    .directive('latestTickets', latest_tickets_drv_1["default"])
    .directive('ticketView', ticket_view_drv_1["default"])
    .config(tickets_routing_config_1["default"])
    .controller('ticketsCtrl', function (ticketsService) {
    var _this = this;
    ticketsService.getGreetingsMessage()
        .then(function (data) {
        _this.greetings = data;
    });
    ticketsService.getTicketsFromServer()
        .then(function (data) {
        _this.tickets = ticketsService.buildTicketsListFromJson(data);
        ticketsService.ticketsPromise.resolve('tickets get request has been resolved!');
    });
});

},{"./latest-tickets/latest-tickets.drv":3,"./ticket-view/ticket-view.drv":4,"./tickets-routing.config":5,"./tickets.srv":7}],7:[function(require,module,exports){
/// <reference path='../typings/tsd.d.ts' />
var ticket_1 = require('./common/ticket');
var ticketList_1 = require('././common/ticketList');
var TicketsService = (function () {
    function TicketsService($http) {
        this.$http = $http;
        this.ticketsPromise = Q.defer();
        this.greetingsMessage = 'default';
    }
    TicketsService.prototype.getGreetingsMessage = function () {
        console.log('getting message from server');
        return this.$http.get('http://localhost:3000/test')
            .then(function (res) { return res.data; });
    };
    TicketsService.prototype.getTicketsFromServer = function () {
        console.log('getting tickets from server');
        return this.$http.get('http://localhost:3000/tickets')
            .then(function (res) { return res.data; });
    };
    TicketsService.prototype.buildTicketsListFromJson = function (json) {
        console.log('building json: ', JSON.stringify(json));
        var numOfTickets = Object.keys(json).length;
        this.globalTicketList = new ticketList_1["default"](Array.apply(null, Array(numOfTickets)).map(function (item, index) {
            return new ticket_1["default"](json[index].id, json[index].title, json[index].content, json[index].userEmail);
        }));
        console.log('built TicketList: ', this.globalTicketList);
        return this.globalTicketList;
    };
    TicketsService.prototype.getTicketsPromise = function () {
        return this.ticketsPromise.promise;
    };
    return TicketsService;
})();
exports.__esModule = true;
exports["default"] = TicketsService;

},{"././common/ticketList":2,"./common/ticket":1}]},{},[6]);
