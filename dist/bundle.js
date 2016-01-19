(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Ticket = (function () {
    function Ticket(id, title, content, userEmail, replies) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userEmail = userEmail;
        this.replies = replies;
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
    Ticket.prototype.getTicketReplies = function () {
        return this.replies;
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
        var t1 = new ticket_1["default"](this.uuid(), 'Hello', 'I have a problem', 'bob@bobcorp.com', []);
        var t2 = new ticket_1["default"](this.uuid(), 'Problem with domain', 'It is not working', 'alice@alicecorp.com', []);
        var t3 = new ticket_1["default"](this.uuid(), 'Help me again', 'My site is broken', 'bob@bobcorp.com', []);
        return new TicketList([t1, t2, t3]);
    };
    return TicketList;
})();
exports.__esModule = true;
exports["default"] = TicketList;

},{"./ticket":1}],3:[function(require,module,exports){
var ticketList_1 = require('../common/ticketList');
var LatestTicketsDirectiveController = (function () {
    /* @ngInject */
    function LatestTicketsDirectiveController($parse, $element, $scope, ticketsService) {
        var _this = this;
        this.itemsLimit = 5;
        this.title = 'Latest Tickets';
        console.log('builiding the latest-tickets controller, waiting for the promise to be resolved');
        ticketsService.getTicketsPromise()
            .then(function (message) {
            console.log(message);
            var tempItemsList = $parse($element.attr('ng-model'))($scope.$parent).getTicketList();
            var myItemsList = $.extend(true, [], tempItemsList);
            _this.items = new ticketList_1["default"](myItemsList);
            console.log('items: ', _this.items);
            _this.items.updateTicketList(_this.items.getTicketList().splice(_this.items.getTicketList().length - _this.itemsLimit, _this.itemsLimit));
            $scope.items = _this.items;
            $scope.title = _this.title;
            $scope.$digest();
            ticketsService.setTicketsPromise();
            ticketsService.setTicketSubmitPromise();
            ticketsService.setReplySubmitPromise();
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

},{"../common/ticketList":2}],4:[function(require,module,exports){
var SearchDirectiveController = (function () {
    /* @ngInject */
    function SearchDirectiveController(ticketsService, $scope, $rootScope) {
        var _this = this;
        this.ticketsService = ticketsService;
        this.$rootScope = $rootScope;
        console.log('builiding the search controller, waiting for the promise to be resolved');
        ticketsService.getTicketsPromise()
            .then(function (message) {
            console.log(message);
            // this.searchItmes = ticketsService.getGlobalTicketsList().getTicketList().map(function (ticket) {
            //   return {
            //             id: ticket.getTicketId(),
            //             title: ticket.getTicketTitle()
            //         };
            // });
            _this.searchItmes = ticketsService.getGlobalTicketsList().getTicketList();
            console.log('searchItems: ', _this.searchItmes);
            _this.suggestions = [];
            _this.selectedIndex = -1;
        });
    }
    ;
    // invoke on ng-change
    SearchDirectiveController.prototype.search = function () {
        console.log('invoked search function!!!');
        this.suggestions = [];
        var myMaxSuggestionListLength = 0;
        var that = this;
        this.searchItmes.every(function (item) {
            var searchItemsLowercase = angular.lowercase(item.getTicketTitle());
            console.log('searchItemsLowercase: ', searchItemsLowercase);
            var searchTextLowercase = angular.lowercase(that.searchText);
            console.log('searchTextLowercase: ', searchTextLowercase);
            if (searchItemsLowercase.indexOf(searchTextLowercase) > -1) {
                console.log('found a match: ', searchTextLowercase);
                that.suggestions.push(item);
                myMaxSuggestionListLength += 1;
                if (myMaxSuggestionListLength === 3) {
                    // break the 'every' loop
                    return false;
                }
                else {
                    return true;
                }
            }
            return true;
        });
    };
    SearchDirectiveController.prototype.checkKeyDown = function (event) {
        if (event.keyCode === 40) {
            //down key, increment selectedIndex
            event.preventDefault();
            if (this.selectedIndex + 1 !== this.suggestions.length) {
                this.selectedIndex++;
            }
        }
        else if (event.keyCode === 38) {
            //up key, decrement selectedIndex
            event.preventDefault();
            if (this.selectedIndex - 1 !== -1) {
                this.selectedIndex--;
            }
        }
        else if (event.keyCode === 13) {
            //enter key, empty suggestions array
            event.preventDefault();
            this.suggestions = [];
        }
    };
    SearchDirectiveController.prototype.checkKeyUp = function (event) {
        if (event.keyCode !== 8 || event.keyCode !== 46) {
            //delete or backspace
            if (this.searchText === '') {
                this.suggestions = [];
            }
        }
    };
    return SearchDirectiveController;
})();
function SearchDirectiveFactory() {
    return {
        restrict: 'E',
        scope: {},
        template: '<h3>Search For A Ticket</h3>' +
            '<input type="text" placeholder="Search for tickets" class="input" ng-keydown="ctrl.checkKeyDown($event)" ng-keyup="ctrl.checkKeyUp($event)" ng-model="ctrl.searchText" ng-change="ctrl.search()"/>' +
            '<ul class="suggestions-list">' +
            '<li ng-repeat="suggestion in ctrl.suggestions track by $index" ng-class="suggestion" ng-click="ctrl.goToTicketView($index)"><a ui-sref="ticket({ticketId: suggestion.getTicketId()})">{{suggestion.getTicketTitle()}}</a></li>' +
            '</ul>',
        controller: SearchDirectiveController,
        controllerAs: 'ctrl'
    };
}
exports.__esModule = true;
exports["default"] = SearchDirectiveFactory;

},{}],5:[function(require,module,exports){
var TicketSubmitDirectiveController = (function () {
    /* @ngInject */
    function TicketSubmitDirectiveController(ticketsService, $state) {
        this.ticketsService = ticketsService;
        this.$state = $state;
        this.newTicket = {};
        this.isSubmitted = false;
    }
    ;
    TicketSubmitDirectiveController.prototype.submitNewTicket = function (isValid) {
        var _this = this;
        this.isSubmitted = true;
        this.ticketsService.postNewTicketToServer(this.newTicket);
        //maybe should clear the newTicket field
        this.ticketsService.getTicketSubmitPromise()
            .then(function () {
            _this.$state.go('home');
        });
    };
    return TicketSubmitDirectiveController;
})();
function TicketSubmitDirectiveFactory() {
    return {
        restrict: 'E',
        scope: {},
        template: '<h3>Add a new Ticket</h3>' +
            '<form name="submitTicketForm" class="form" ng-submit="ctrl.submitNewTicket(submitTicketForm.$valid)" novalidate>' +
            '<div class="form-group">' +
            '<label>Title</label>' +
            '<input type="text" name="title" class="form-control" ng-model="ctrl.newTicket.title" ng-minlength="3" ng-maxlength="50" required/>' +
            '<p ng-show="submitTicketForm.title.$invalid" class="help-block">Title is required.</p>' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Email address</label>' +
            '<input type="email" name="userEmail" class="form-control" ng-model="ctrl.newTicket.userEmail" ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" required/>' +
            '<p ng-show="submitTicketForm.userEmail.$invalid" class="help-block">Enter a valid email address.</p>' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Content</label>' +
            '<textarea type="text" name="content" rows="5" class="form-control" ng-model="ctrl.newTicket.content"/></textarea>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col">' +
            '<button class="btn btn-success pull-right" ng-disabled="submitTicketForm.$invalid"><span class="glyphicon glyphicon-plus-sign"></span>   Add</button>' +
            '</div>' +
            '</div>' +
            '</form>',
        controller: TicketSubmitDirectiveController,
        controllerAs: 'ctrl'
    };
}
exports.__esModule = true;
exports["default"] = TicketSubmitDirectiveFactory;

},{}],6:[function(require,module,exports){
var RepliesDirectiveController = (function () {
    /* @ngInject */
    function RepliesDirectiveController($parse, $element, $scope, ticketsService) {
        this.title = 'Replies';
        var repliesList = $parse($element.attr('ng-model'))($scope.$parent);
        this.items = repliesList;
        console.log('items (replies): ', this.items);
    }
    return RepliesDirectiveController;
})();
function RepliesDirectiveFactory() {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {},
        link: function (scope, element, attr, ngModelController) {
            scope.ngModelController = ngModelController;
        },
        template: '<h3>{{ctrl.title}}</h3>' +
            '<ul class="replies-list">' +
            '<li class="reply" ng-repeat="reply in ctrl.items"><pre>{{reply.content}}<br>from: {{reply.userEmail}}</pre></li>' +
            '</ul>',
        controller: RepliesDirectiveController,
        controllerAs: 'ctrl'
    };
}
exports.__esModule = true;
exports["default"] = RepliesDirectiveFactory;

},{}],7:[function(require,module,exports){
var ReplySubmitDirectiveController = (function () {
    /* @ngInject */
    function ReplySubmitDirectiveController(ticketsService, $state) {
        this.ticketsService = ticketsService;
        this.$state = $state;
        this.newReply = {};
        this.isSubmitted = false;
    }
    ;
    ReplySubmitDirectiveController.prototype.submitNewReply = function (isValid, id) {
        var _this = this;
        console.log('id: ', id);
        this.isSubmitted = true;
        this.ticketsService.postNewReplyToServer(id, this.newReply);
        //maybe should clear the newReply field
        this.ticketsService.getReplySubmitPromise()
            .then(function () {
            _this.$state.go('home');
        });
    };
    return ReplySubmitDirectiveController;
})();
function ReplySubmitDirectiveFactory() {
    return {
        restrict: 'E',
        scope: {
            id: '@'
        },
        template: '<h3>Add a new Reply:</h3>' +
            '<form name="submitReplyForm" class="form" ng-submit="ctrl.submitNewReply(submitReplyForm.$valid, id)" novalidate>' +
            '<div class="form-group">' +
            '<label>Email address</label>' +
            '<input type="email" name="userEmail" class="form-control" ng-model="ctrl.newReply.userEmail" ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" required/>' +
            '<p ng-show="submitReplyForm.userEmail.$invalid" class="help-block">Enter a valid email address.</p>' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Content</label>' +
            '<textarea type="text" name="content" rows="5" class="form-control" ng-model="ctrl.newReply.content"/></textarea>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col">' +
            '<button class="btn btn-success pull-right" ng-disabled="submitReplyForm.$invalid"><span class="glyphicon glyphicon-plus-sign"></span>   Add</button>' +
            '</div>' +
            '</div>' +
            '</form>',
        controller: ReplySubmitDirectiveController,
        controllerAs: 'ctrl'
    };
}
exports.__esModule = true;
exports["default"] = ReplySubmitDirectiveFactory;

},{}],8:[function(require,module,exports){
var TicketViewDirectiveController = (function () {
    /* @ngInject */
    function TicketViewDirectiveController(ticketsService, $scope) {
        this.ticket = $scope.ticket;
        this.ticketReplies = this.ticket.getTicketReplies();
        this.ticketId = this.ticket.getTicketId();
        console.log('ticket-id(ticket view): ', this.ticketId);
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
        template: '<h3>From: <a ui-sref="user-tickets({email: ctrl.ticket.getTicketUserEmail()})">{{ctrl.ticket.getTicketUserEmail()}}</a></h3>' +
            '<ul class="latest-tickets-list">' +
            '<li class="ticket" <b>{{ctrl.ticket.getTicketTitle()}}</b><br><pre>{{ctrl.ticket.getTicketContent()}}</pre></li>' +
            '</ul>' +
            '<replies ng-model="ctrl.ticketReplies"></replies>' +
            '<reply-submit id="{{ctrl.ticketId}}"></reply-submit>',
        controller: TicketViewDirectiveController,
        controllerAs: 'ctrl'
    };
}
exports.__esModule = true;
exports["default"] = TicketViewDirectiveFactory;

},{}],9:[function(require,module,exports){
/*@ngInject*/
function ticketsRoutingConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
        url: '/',
        template: '<h1>{{ctrl.greetings}}</h1>' +
            '<search></search>' +
            '<latest-tickets ng-model=ctrl.tickets></latest-tickets>' +
            '<a ui-sref="submit"><b>Submit a new ticket</b></a>',
        controller: function (ticketsService, $scope) {
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
        .state('submit', {
        url: '/submit',
        template: '<ticket-submit></ticket-submit>',
        controller: function () {
            console.log('UI ROUTE: TICKET SUBMIT');
        },
        controllerAs: 'ctrl'
    })
        .state('404', {
        template: '<h2>404!</h2>'
    });
}
exports.__esModule = true;
exports["default"] = ticketsRoutingConfig;

},{}],10:[function(require,module,exports){
/// <reference path='../typings/tsd.d.ts' />
var latest_tickets_drv_1 = require('./latest-tickets/latest-tickets.drv');
var ticket_view_drv_1 = require('./ticket-view/ticket-view.drv');
var ticket_submit_drv_1 = require('./ticket-submit/ticket-submit.drv');
var search_drv_1 = require('./search/search.drv');
var replies_drv_1 = require('./ticket-view/replies/replies.drv');
var reply_submit_drv_1 = require('./ticket-view/reply-submit/reply-submit.drv');
var tickets_routing_config_1 = require('./tickets-routing.config');
var tickets_srv_1 = require('./tickets.srv');
angular.module('tickets', ['ui.router'])
    .service('ticketsService', tickets_srv_1["default"])
    .directive('latestTickets', latest_tickets_drv_1["default"])
    .directive('ticketView', ticket_view_drv_1["default"])
    .directive('ticketSubmit', ticket_submit_drv_1["default"])
    .directive('search', search_drv_1["default"])
    .directive('replies', replies_drv_1["default"])
    .directive('replySubmit', reply_submit_drv_1["default"])
    .config(tickets_routing_config_1["default"]);

},{"./latest-tickets/latest-tickets.drv":3,"./search/search.drv":4,"./ticket-submit/ticket-submit.drv":5,"./ticket-view/replies/replies.drv":6,"./ticket-view/reply-submit/reply-submit.drv":7,"./ticket-view/ticket-view.drv":8,"./tickets-routing.config":9,"./tickets.srv":11}],11:[function(require,module,exports){
/// <reference path='../typings/tsd.d.ts' />
var ticket_1 = require('./common/ticket');
var ticketList_1 = require('././common/ticketList');
var TicketsService = (function () {
    function TicketsService($http) {
        this.$http = $http;
        this.ticketsPromise = Q.defer();
        this.ticketSubmitPromise = Q.defer();
        this.replySubmitPromise = Q.defer();
        this.greetingsMessage = 'default';
    }
    TicketsService.prototype.getGlobalTicketsList = function () {
        return this.globalTicketList;
    };
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
            return new ticket_1["default"](json[index].id, json[index].title, json[index].content, json[index].userEmail, json[index].replies);
        }));
        console.log('built TicketList: ', this.globalTicketList);
        return this.globalTicketList;
    };
    TicketsService.prototype.postNewTicketToServer = function (newTicket) {
        console.log('sending a new ticket to the server: ', JSON.stringify(newTicket));
        this.$http.post('http://localhost:3000/tickets', JSON.stringify(newTicket));
        this.ticketSubmitPromise.resolve();
    };
    TicketsService.prototype.postNewReplyToServer = function (ticketId, newReply) {
        console.log('sending a new reply to the server: ', JSON.stringify(newReply));
        this.$http.post('http://localhost:3000/tickets/' + ticketId + '/replies', JSON.stringify(newReply));
        this.replySubmitPromise.resolve();
    };
    TicketsService.prototype.getTicketsPromise = function () {
        return this.ticketsPromise.promise;
    };
    TicketsService.prototype.setTicketsPromise = function () {
        this.ticketsPromise = Q.defer();
    };
    TicketsService.prototype.getTicketSubmitPromise = function () {
        return this.ticketSubmitPromise.promise;
    };
    TicketsService.prototype.setTicketSubmitPromise = function () {
        this.ticketSubmitPromise = Q.defer();
    };
    TicketsService.prototype.getReplySubmitPromise = function () {
        return this.replySubmitPromise.promise;
    };
    TicketsService.prototype.setReplySubmitPromise = function () {
        this.replySubmitPromise = Q.defer();
    };
    return TicketsService;
})();
exports.__esModule = true;
exports["default"] = TicketsService;

},{"././common/ticketList":2,"./common/ticket":1}]},{},[10]);
