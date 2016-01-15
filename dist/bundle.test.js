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
var LatestTicketsDriver = (function () {
    function LatestTicketsDriver(elem, scope) {
        this.elem = elem;
        this.scope = scope;
    }
    LatestTicketsDriver.build = function (items) {
        var elem, scope;
        inject(function ($rootScope, $compile, ticketsService) {
            scope = $rootScope.$new();
            scope.title = 'testing latest tickets';
            scope.items = items;
            elem = $compile('<latest-tickets ng-model="items"></latest-tickets>')(scope);
            scope.$digest();
        });
        return new LatestTicketsDriver(elem, scope);
    };
    LatestTicketsDriver.prototype.getLatestTicketsTitle = function () {
        return this.elem.find('h3').text();
    };
    LatestTicketsDriver.prototype.getTicketListLength = function () {
        return this.elem.find('.ticket').length;
    };
    LatestTicketsDriver.prototype.getTicketTitleAt = function (i) {
        return this.elem.find('.ticket-title').eq(i).text();
    };
    LatestTicketsDriver.prototype.clickOnTicketAt = function (i) {
        this.elem.find('.ticket').eq(i).triggerHandler('click');
    };
    ;
    return LatestTicketsDriver;
})();
exports.__esModule = true;
exports["default"] = LatestTicketsDriver;

},{}],4:[function(require,module,exports){
var ticketList_1 = require('../common/ticketList');
var latest_tickets_driver_1 = require('./latest-tickets-driver');
describe('latest-tickets directive', function () {
    beforeEach(function () {
        angular.mock.module('tickets');
    });
    fit('should render the title based on the given title', inject(function (ticketsService) {
        // let testsPromise =   ticketsService.getTestsPromise();
        var items = ticketList_1["default"].generateRandomTicketList();
        var length = items.getTicketList().length;
        // let deferred = Q.defer();
        // let promise = deferred.promise;
        spyOn(ticketsService, 'getTicketsPromise').and.returnValue(Q(function (resolve) { return resolve('resolved promise'); }));
        // deferred.resolve('tickets get request has been resolved!');
        console.log('buliding driver');
        var latestTicketsDriver = latest_tickets_driver_1["default"].build(items);
        // testsPromise
        // .then((message: string) => {
        //   console.log(message);
        expect(latestTicketsDriver.getLatestTicketsTitle()).toBe('testing latest tickets');
        // });
    }));
    it('should render the latest tickets based on the list of tickets', function () {
        var items = ticketList_1["default"].generateRandomTicketList();
        var length = items.getTicketList().length;
        var latestTicketsDriver = latest_tickets_driver_1["default"].build(items);
        expect(latestTicketsDriver.getTicketListLength()).toBe(length);
        expect(latestTicketsDriver.getTicketTitleAt(2)).toEqual(items);
    });
    it('should show the ticket view once a ticket is clicked', function () {
        var items = ticketList_1["default"].generateRandomTicketList();
        var latestTicketsDriver = latest_tickets_driver_1["default"].build(items);
        latestTicketsDriver.clickOnTicketAt(0);
        //TODO
    });
});

},{"../common/ticketList":2,"./latest-tickets-driver":3}],5:[function(require,module,exports){

},{}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){

},{}],8:[function(require,module,exports){

},{}]},{},[4,5,6,7,8]);
