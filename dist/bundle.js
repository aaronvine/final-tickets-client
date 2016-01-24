(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Reply = (function () {
    function Reply(content, userEmail) {
        this.content = content;
        this.userEmail = userEmail;
    }
    Reply.prototype.getReplyContent = function () {
        return this.content;
    };
    Reply.prototype.getReplyUserEmail = function () {
        return this.userEmail;
    };
    return Reply;
})();
exports.__esModule = true;
exports["default"] = Reply;

},{}],2:[function(require,module,exports){
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
    Ticket.prototype.updateReplies = function (replies) {
        this.replies = replies;
    };
    return Ticket;
})();
exports.__esModule = true;
exports["default"] = Ticket;

},{}],3:[function(require,module,exports){
var LatestTicketsDirectiveController = (function () {
    /* @ngInject */
    function LatestTicketsDirectiveController(ticketsService) {
        this.itemsLimit = 5;
        this.title = 'Latest Tickets';
        var tempTicketsList = this.tickets;
        var myTicketsList = $.extend(true, [], tempTicketsList);
        this.tickets = myTicketsList;
        if (this.tickets.length > 5) {
            this.tickets = this.tickets.splice(this.tickets.length - this.itemsLimit, this.itemsLimit);
        }
        console.log('LatestTicketsDirectiveController.tickets: ', this.tickets);
    }
    return LatestTicketsDirectiveController;
})();
function LatestTicketsDirectiveFactory() {
    return {
        restrict: 'E',
        scope: {
            tickets: '='
        },
        template: '<h3>{{ctrl.title}}</h3>' +
            '<ul class="latest-tickets-list">' +
            '<li class="ticket" ng-repeat="ticket in ctrl.tickets"><a ui-sref="ticket({ticketId: ticket.getTicketId()})"><label class="ticket-title">{{ticket.getTicketTitle()}}</label></a><br><pre class="ticket-content">{{ticket.getTicketContent().split("\n")[0] | htmlToPlaintext}}</pre></li>' +
            '</ul>',
        controller: LatestTicketsDirectiveController,
        controllerAs: 'ctrl',
        bindToController: true
    };
}
exports.__esModule = true;
exports["default"] = LatestTicketsDirectiveFactory;

},{}],4:[function(require,module,exports){
var SearchDirectiveController = (function () {
    /* @ngInject */
    function SearchDirectiveController(ticketsService) {
        this.ticketsService = ticketsService;
        this.title = 'Search For A Ticket';
        this.searchItmes = this.tickets;
        console.log('SearchDirectiveController.searchItems: ', this.searchItmes);
        this.suggestions = [];
        this.selectedIndex = -1;
    }
    ;
    // invoke on ng-change
    SearchDirectiveController.prototype.search = function () {
        console.log('SearchDirectiveController invoked search function!!!');
        this.suggestions = [];
        var myMaxSuggestionListLength = 0;
        var that = this;
        this.searchItmes.every(function (item) {
            var searchItemsLowercase = angular.lowercase(item.getTicketTitle());
            var searchTextLowercase = angular.lowercase(that.searchText);
            if (searchItemsLowercase.indexOf(searchTextLowercase) > -1) {
                console.log('SearchDirectiveController found a match: ', searchTextLowercase);
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
        scope: {
            tickets: '='
        },
        template: '<h3>{{ctrl.title}}</h3>' +
            '<input type="text" placeholder="Search for tickets" class="input" ng-keydown="ctrl.checkKeyDown($event)" ng-keyup="ctrl.checkKeyUp($event)" ng-model="ctrl.searchText" ng-change="ctrl.search()"/>' +
            '<ul class="suggestions-list">' +
            '<li ng-repeat="suggestion in ctrl.suggestions track by $index" ng-class="suggestion" ng-click="ctrl.goToTicketView($index)"><a ui-sref="ticket({ticketId: suggestion.getTicketId()})">{{suggestion.getTicketTitle()}}</a></li>' +
            '</ul>',
        controller: SearchDirectiveController,
        controllerAs: 'ctrl',
        bindToController: true
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
        this.title = 'Add a new Ticket';
        this.newTicket = {};
        this.isSubmitted = false;
    }
    ;
    TicketSubmitDirectiveController.prototype.submitNewTicket = function (isValid) {
        var _this = this;
        this.isSubmitted = true;
        this.ticketsService.postNewTicketToServer(this.newTicket);
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
        template: '<h3>{{ctrl.title}}</h3>' +
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
            // '<textarea type="text" name="content" rows="5" class="form-control" ng-model="ctrl.newTicket.content"/></textarea>' +
            '<div text-angular name="content" ng-model="ctrl.newTicket.content" ta-text-editor-class="border-around" ta-html-editor-class="border-around"></div>' +
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
    function RepliesDirectiveController() {
        this.title = 'Replies';
        console.log('RepliesDirectiveController.ticketReplies: ', this.replies);
    }
    return RepliesDirectiveController;
})();
function RepliesDirectiveFactory() {
    return {
        restrict: 'E',
        scope: {
            replies: '='
        },
        template: '<h3>{{ctrl.title}}</h3>' +
            '<ul class="replies-list">' +
            '<li class="reply" ng-repeat="reply in ctrl.replies"><pre class="reply-content">{{reply.getReplyContent()}}</pre><pre class="reply-user-email">from: {{reply.getReplyUserEmail()}}</pre></li>' +
            '</ul>',
        controller: RepliesDirectiveController,
        controllerAs: 'ctrl',
        bindToController: true
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
        this.title = 'Add a new Reply';
        this.newReply = {};
        this.isSubmitted = false;
    }
    ;
    ReplySubmitDirectiveController.prototype.submitNewReply = function (isValid, id) {
        var _this = this;
        console.log('id: ', id);
        this.isSubmitted = true;
        this.ticketsService.postNewReplyToServer(id, this.newReply);
        this.ticketsService.getReplySubmitPromise()
            .then(function () {
            _this.$state.go('ticket', { ticketId: id }, { reload: true });
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
        template: '<h3>{{ctrl.title}}</h3>' +
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
    function TicketViewDirectiveController(ticketsService) {
        this.ticketId = this.ticket.getTicketId();
        this.replies = this.ticket.getTicketReplies();
        console.log('TicketViewDirectiveController.ticket: ', this.ticket);
        console.log('TicketViewDirectiveController.replies: ', this.replies);
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
        template: '<h3>From: {{ctrl.ticket.getTicketUserEmail()}}</h3>' +
            '<label class="ticket-title">{{ctrl.ticket.getTicketTitle()}}</label><br><pre class="ticket-content"><div ng-bind-html="ctrl.ticket.getTicketContent()"></div></pre>' +
            '<replies replies="ctrl.replies"></replies>' +
            '<reply-submit id="{{ctrl.ticketId}}"></reply-submit>',
        controller: TicketViewDirectiveController,
        controllerAs: 'ctrl',
        bindToController: true
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
            '<search tickets="ctrl.tickets"></search>' +
            '<latest-tickets tickets="ctrl.tickets"></latest-tickets>' +
            '<a ui-sref="submit"><b>Submit a new ticket</b></a>',
        resolve: {
            tickets: function (ticketsService) {
                return ticketsService.getTicketsFromServer()
                    .then(function (res) { return (ticketsService.buildTicketsListFromJson(res)); });
            },
            greetingMessage: function (ticketsService) {
                return ticketsService.getGreetingsMessage();
            }
        },
        controller: function (tickets, greetingMessage) {
            this.greetings = greetingMessage;
            this.tickets = tickets;
        },
        controllerAs: 'ctrl'
    })
        .state('ticket', {
        url: '/ticket/:ticketId',
        resolve: {
            ticket: function ($stateParams, ticketsService, $state) {
                return ticketsService.globalTicketList.filter(function (ticket) {
                    return ticket.getTicketId() === $stateParams.ticketId;
                })[0];
            },
            replies: function ($stateParams, ticketsService) {
                return ticketsService.getRepliesFromServer($stateParams.ticketId)
                    .then(function (res) { return (ticketsService.buildRepliesListFromJson(res)); });
            }
        },
        template: '<ticket-view ticket="ctrl.ticket"></ticket-view>',
        controller: function (ticket, replies) {
            this.ticket = ticket;
            this.ticket.updateReplies(replies);
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
angular.module('tickets', ['ui.router', 'textAngular'])
    .service('ticketsService', tickets_srv_1["default"])
    .directive('latestTickets', latest_tickets_drv_1["default"])
    .directive('ticketView', ticket_view_drv_1["default"])
    .directive('ticketSubmit', ticket_submit_drv_1["default"])
    .directive('search', search_drv_1["default"])
    .directive('replies', replies_drv_1["default"])
    .directive('replySubmit', reply_submit_drv_1["default"])
    .config(tickets_routing_config_1["default"])
    .filter('htmlToPlaintext', function () {
    return function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, ' ') : '';
    };
});

},{"./latest-tickets/latest-tickets.drv":3,"./search/search.drv":4,"./ticket-submit/ticket-submit.drv":5,"./ticket-view/replies/replies.drv":6,"./ticket-view/reply-submit/reply-submit.drv":7,"./ticket-view/ticket-view.drv":8,"./tickets-routing.config":9,"./tickets.srv":11}],11:[function(require,module,exports){
/// <reference path='../typings/tsd.d.ts' />
var ticket_1 = require('./common/ticket');
var reply_1 = require('./common/reply');
var TicketsService = (function () {
    function TicketsService($http) {
        this.$http = $http;
        this.ticketSubmitPromise = Q.defer();
        this.replySubmitPromise = Q.defer();
        this.greetingsMessage = 'default';
    }
    TicketsService.prototype.getGlobalTicketsList = function () {
        return this.globalTicketList;
    };
    TicketsService.prototype.getGreetingsMessage = function () {
        console.log('TicketsService is getting greetings message from server');
        return this.$http.get('http://localhost:3000/test')
            .then(function (res) { return res.data; });
    };
    TicketsService.prototype.getTicketsFromServer = function () {
        console.log('TicketsService is getting tickets from server');
        return this.$http.get('http://localhost:3000/tickets')
            .then(function (res) { return res.data; });
    };
    TicketsService.prototype.buildRepliesListFromJson = function (json) {
        console.log('TicketsService is building replies json: ', JSON.stringify(json));
        var numOfReplies = Object.keys(json).length;
        var repliesList = Array.apply(null, Array(numOfReplies)).map(function (item, index) {
            return new reply_1["default"](json[index].content, json[index].userEmail);
        });
        console.log('TicketsService built the replies list: ', repliesList);
        return repliesList;
    };
    TicketsService.prototype.buildTicketsListFromJson = function (json) {
        console.log('TicketsService is building ticket json: ', JSON.stringify(json));
        var numOfTickets = Object.keys(json).length;
        this.globalTicketList = Array.apply(null, Array(numOfTickets)).map(function (item, index) {
            return new ticket_1["default"](json[index].id, json[index].title, json[index].content, json[index].userEmail, json[index].replies);
        });
        console.log('TicketsService built the tickets list: ', this.globalTicketList);
        return this.globalTicketList;
    };
    TicketsService.prototype.getRepliesFromServer = function (ticketId) {
        console.log('TicketsService is getting replies from server');
        return this.$http.get('http://localhost:3000/tickets/' + ticketId + '/replies')
            .then(function (res) { return res.data; });
    };
    TicketsService.prototype.postNewTicketToServer = function (newTicket) {
        console.log('TicketsService is sending a new ticket to the server: ', JSON.stringify(newTicket));
        this.$http.post('http://localhost:3000/tickets', JSON.stringify(newTicket));
        this.ticketSubmitPromise.resolve();
    };
    TicketsService.prototype.postNewReplyToServer = function (ticketId, newReply) {
        console.log('TicketsService is sending a new reply to the server: ', JSON.stringify(newReply));
        this.$http.post('http://localhost:3000/tickets/' + ticketId + '/replies', JSON.stringify(newReply));
        this.replySubmitPromise.resolve();
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

},{"./common/reply":1,"./common/ticket":2}]},{},[10]);
