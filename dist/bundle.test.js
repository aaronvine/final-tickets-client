(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ticket_1 = require('./ticket');
var reply_1 = require('./reply');
var Generator = (function () {
    function Generator() {
    }
    Generator.uuid = function () {
        return Math.floor(Math.random() * 999999).toString(36);
    };
    Generator.generateRandomTicketList = function () {
        var t1 = new ticket_1["default"](this.uuid(), 'Hello', 'I have a problem', 'bob@bobcorp.com', []);
        var t2 = new ticket_1["default"](this.uuid(), 'Problem with domain', 'It is not working', 'alice@alicecorp.com', []);
        var t3 = new ticket_1["default"](this.uuid(), 'Help me again', 'My site is broken', 'bob@bobcorp.com', []);
        return [t1, t2, t3];
    };
    Generator.generateRandomRepliesList = function () {
        var r1 = new reply_1["default"]('I have a problem', 'bob@bobcorp.com');
        var r2 = new reply_1["default"]('It is not working', 'alice@alicecorp.com');
        var r3 = new reply_1["default"]('My site is broken', 'bob@bobcorp.com');
        return [r1, r2, r3];
    };
    Generator.generateRandomTicket = function () {
        return new ticket_1["default"]('e5', 'Hello', 'I have a problem', 'bob@bobcorp.com', []);
    };
    return Generator;
})();
exports.__esModule = true;
exports["default"] = Generator;

},{"./reply":2,"./ticket":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var LatestTicketsDriver = (function () {
    function LatestTicketsDriver(elem, scope) {
        this.elem = elem;
        this.scope = scope;
    }
    LatestTicketsDriver.build = function (tickets) {
        var elem, scope;
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.tickets = tickets;
            elem = $compile('<latest-tickets tickets="tickets"></latest-tickets>')(scope);
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
    LatestTicketsDriver.prototype.getTicketContentAt = function (i) {
        return this.elem.find('.ticket-content').eq(i).text();
    };
    return LatestTicketsDriver;
})();
exports.__esModule = true;
exports["default"] = LatestTicketsDriver;

},{}],5:[function(require,module,exports){
var generator_1 = require('../common/generator');
var latest_tickets_driver_1 = require('./latest-tickets-driver');
describe('latest-tickets directive', function () {
    beforeEach(function () {
        angular.mock.module('tickets');
    });
    it('should render the title based on the given title', function () {
        var tickets = generator_1["default"].generateRandomTicketList();
        var length = tickets.length;
        var latestTicketsDriver = latest_tickets_driver_1["default"].build(tickets);
        expect(latestTicketsDriver.getLatestTicketsTitle()).toBe('Latest Tickets');
    });
    it('should show up to 5 tickets', function () {
        var items = generator_1["default"].generateRandomTicketList();
        var length = items.length;
        var latestTicketsDriver = latest_tickets_driver_1["default"].build(items);
        expect(latestTicketsDriver.getTicketListLength()).toBe(length);
        var moreItems = generator_1["default"].generateRandomTicketList();
        var finalItmes = items.concat(moreItems);
        latestTicketsDriver = latest_tickets_driver_1["default"].build(finalItmes);
        expect(latestTicketsDriver.getTicketListLength()).toBe(5);
    });
    it('should render the latest tickets titles based on the given list of tickets', function () {
        var items = generator_1["default"].generateRandomTicketList();
        var latestTicketsDriver = latest_tickets_driver_1["default"].build(items);
        expect(latestTicketsDriver.getTicketTitleAt(2)).toEqual(items[2].getTicketTitle());
    });
    it('should render the latest tickets content based on the given list of tickets', function () {
        var items = generator_1["default"].generateRandomTicketList();
        var latestTicketsDriver = latest_tickets_driver_1["default"].build(items);
        expect(latestTicketsDriver.getTicketContentAt(1)).toEqual(items[1].getTicketContent().split('\n')[0]);
    });
});

},{"../common/generator":1,"./latest-tickets-driver":4}],6:[function(require,module,exports){
var SearchDriver = (function () {
    function SearchDriver(elem, scope) {
        this.elem = elem;
        this.scope = scope;
    }
    SearchDriver.build = function (tickets) {
        var elem, scope;
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.tickets = tickets;
            elem = $compile('<search tickets="tickets"></search>')(scope);
            scope.$digest();
        });
        return new SearchDriver(elem, scope);
    };
    SearchDriver.prototype.getTitle = function () {
        return this.elem.find('h3').text();
    };
    SearchDriver.prototype.getInput = function () {
        return this.elem.find('input');
    };
    SearchDriver.prototype.clickOnInput = function () {
        this.elem.find('input').triggerHandler('click');
    };
    SearchDriver.prototype.inputSearchPhrase = function (searchPhrase) {
        this.getInput().val(searchPhrase);
        this.scope.$digest();
    };
    ;
    SearchDriver.prototype.getSuggestions = function () {
        return this.elem.find('.suggestion');
    };
    return SearchDriver;
})();
exports.__esModule = true;
exports["default"] = SearchDriver;

},{}],7:[function(require,module,exports){
var generator_1 = require('../common/generator');
var search_driver_1 = require('./search-driver');
describe('search directive', function () {
    beforeEach(function () {
        angular.mock.module('tickets');
    });
    it('should contain a relevant title', function () {
        var tickets = generator_1["default"].generateRandomTicketList();
        var searchDrive = search_driver_1["default"].build(tickets);
        expect(searchDrive.getTitle()).toBe('Search For A Ticket');
    });
    it('should contain a search input element', function () {
        var tickets = generator_1["default"].generateRandomTicketList();
        var searchDrive = search_driver_1["default"].build(tickets);
        expect(searchDrive.getInput().length).toBeGreaterThan(0);
    });
    it('should show the result according to the search phrase', function () {
        var tickets = generator_1["default"].generateRandomTicketList();
        var searchDrive = search_driver_1["default"].build(tickets);
        searchDrive.inputSearchPhrase('he');
        expect(searchDrive.getSuggestions().length).toBe(2);
    });
});

},{"../common/generator":1,"./search-driver":6}],8:[function(require,module,exports){
/// <reference path='../../typings/tsd.d.ts'/>
var TicketSubmitDriver = (function () {
    function TicketSubmitDriver(elem, scope) {
        this.elem = elem;
        this.scope = scope;
    }
    TicketSubmitDriver.build = function () {
        var elem, scope;
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            elem = $compile('<ticket-submit></ticket-submit>')(scope);
            scope.$digest();
        });
        return new TicketSubmitDriver(elem, scope);
    };
    TicketSubmitDriver.prototype.getTitle = function () {
        return this.elem.find('h3').text();
    };
    TicketSubmitDriver.prototype.getInput = function () {
        return this.elem.find('input');
    };
    TicketSubmitDriver.prototype.getTextarea = function () {
        return this.elem.find('textarea');
    };
    TicketSubmitDriver.prototype.getForm = function () {
        return this.elem.find('form');
    };
    TicketSubmitDriver.prototype.getButton = function () {
        return this.elem.find('button');
    };
    TicketSubmitDriver.prototype.getTitleWarning = function () {
        return this.elem.find('.help-block').eq(0).text();
    };
    TicketSubmitDriver.prototype.getUserEmailWarning = function () {
        return this.elem.find('.help-block').eq(1).text();
    };
    return TicketSubmitDriver;
})();
exports.__esModule = true;
exports["default"] = TicketSubmitDriver;

},{}],9:[function(require,module,exports){
var ticket_submit_driver_1 = require('./ticket-submit-driver');
describe('ticket-submit directive', function () {
    beforeEach(function () {
        angular.mock.module('tickets');
    });
    it('should contain a relevant title', function () {
        var ticketSubmitDriver = ticket_submit_driver_1["default"].build();
        expect(ticketSubmitDriver.getTitle()).toBe('Add a new Ticket');
    });
    it('should contain a submit form', function () {
        var ticketSubmitDriver = ticket_submit_driver_1["default"].build();
        expect(ticketSubmitDriver.getForm().length).toBeGreaterThan(0);
    });
    it('should contain 2 inputs and 1 textarea', function () {
        var ticketSubmitDriver = ticket_submit_driver_1["default"].build();
        expect(ticketSubmitDriver.getInput().length).toBe(2);
        expect(ticketSubmitDriver.getTextarea().length).toBe(1);
    });
    it('should contain a submit button', function () {
        var ticketSubmitDriver = ticket_submit_driver_1["default"].build();
        expect(ticketSubmitDriver.getButton().length).toBeGreaterThan(0);
    });
    it('should show a warning if the title field is empty', function () {
        var ticketSubmitDriver = ticket_submit_driver_1["default"].build();
        expect(ticketSubmitDriver.getTitleWarning()).toBe('Title is required.');
    });
    it('should show a warning if the email is incorrect', function () {
        var ticketSubmitDriver = ticket_submit_driver_1["default"].build();
        expect(ticketSubmitDriver.getUserEmailWarning()).toBe('Enter a valid email address.');
    });
});

},{"./ticket-submit-driver":8}],10:[function(require,module,exports){
var RepliesDriver = (function () {
    function RepliesDriver(elem, scope) {
        this.elem = elem;
        this.scope = scope;
    }
    RepliesDriver.build = function (replies) {
        var elem, scope;
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.replies = replies;
            elem = $compile('<replies replies="replies"></replies>')(scope);
            scope.$digest();
        });
        return new RepliesDriver(elem, scope);
    };
    RepliesDriver.prototype.getRepliesTitle = function () {
        return this.elem.find('h3').text();
    };
    RepliesDriver.prototype.getRepliesListLength = function () {
        return this.elem.find('.reply').length;
    };
    RepliesDriver.prototype.getReplyContentAt = function (i) {
        return this.elem.find('.reply-content').eq(i).text();
    };
    RepliesDriver.prototype.getReplyUserEmailAt = function (i) {
        return this.elem.find('.reply-user-email').eq(i).text().split(' ')[1];
    };
    return RepliesDriver;
})();
exports.__esModule = true;
exports["default"] = RepliesDriver;

},{}],11:[function(require,module,exports){
var generator_1 = require('../../common/generator');
var replies_driver_1 = require('./replies-driver');
describe('replies directive', function () {
    beforeEach(function () {
        angular.mock.module('tickets');
    });
    it('should render the title based on the given title', function () {
        var replies = generator_1["default"].generateRandomRepliesList();
        var length = replies.length;
        var repliesDriver = replies_driver_1["default"].build(replies);
        expect(repliesDriver.getRepliesTitle()).toBe('Replies');
    });
    it('should show the correct amount of replies', function () {
        var replies = generator_1["default"].generateRandomRepliesList();
        var length = replies.length;
        var repliesDriver = replies_driver_1["default"].build(replies);
        expect(repliesDriver.getRepliesListLength()).toBe(length);
    });
    it('should render the replies user email based on the given list of replies', function () {
        var replies = generator_1["default"].generateRandomRepliesList();
        var repliesDriver = replies_driver_1["default"].build(replies);
        expect(repliesDriver.getReplyUserEmailAt(2)).toEqual(replies[2].getReplyUserEmail());
    });
    it('should render the replies content based on the given list of replies', function () {
        var replies = generator_1["default"].generateRandomRepliesList();
        var repliesDriver = replies_driver_1["default"].build(replies);
        expect(repliesDriver.getReplyContentAt(1)).toEqual(replies[1].getReplyContent());
    });
});

},{"../../common/generator":1,"./replies-driver":10}],12:[function(require,module,exports){
/// <reference path='../../../typings/tsd.d.ts'/>
var ReplySubmitDriver = (function () {
    function ReplySubmitDriver(elem, scope) {
        this.elem = elem;
        this.scope = scope;
    }
    ReplySubmitDriver.build = function (id) {
        var elem, scope;
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.id = id;
            elem = $compile('<reply-submit id={{id}}></reply-submit>')(scope);
            scope.$digest();
        });
        return new ReplySubmitDriver(elem, scope);
    };
    ReplySubmitDriver.prototype.getTitle = function () {
        return this.elem.find('h3').text();
    };
    ReplySubmitDriver.prototype.getInput = function () {
        return this.elem.find('input');
    };
    ReplySubmitDriver.prototype.getTextarea = function () {
        return this.elem.find('textarea');
    };
    ReplySubmitDriver.prototype.getForm = function () {
        return this.elem.find('form');
    };
    ReplySubmitDriver.prototype.getButton = function () {
        return this.elem.find('button');
    };
    ReplySubmitDriver.prototype.getUserEmailWarning = function () {
        return this.elem.find('.help-block').eq(0).text();
    };
    return ReplySubmitDriver;
})();
exports.__esModule = true;
exports["default"] = ReplySubmitDriver;

},{}],13:[function(require,module,exports){
var reply_submit_driver_1 = require('./reply-submit-driver');
describe('reply-submit directive', function () {
    beforeEach(function () {
        angular.mock.module('tickets');
    });
    it('should contain a relevant title', function () {
        var replySubmitDriver = reply_submit_driver_1["default"].build('a1');
        expect(replySubmitDriver.getTitle()).toBe('Add a new Reply');
    });
    it('should contain a submit form', function () {
        var replySubmitDriver = reply_submit_driver_1["default"].build('a1');
        expect(replySubmitDriver.getForm().length).toBeGreaterThan(0);
    });
    it('should contain 1 input and 1 textarea', function () {
        var replySubmitDriver = reply_submit_driver_1["default"].build('a1');
        expect(replySubmitDriver.getInput().length).toBe(1);
        expect(replySubmitDriver.getTextarea().length).toBe(1);
    });
    it('should contain a submit button', function () {
        var replySubmitDriver = reply_submit_driver_1["default"].build('a1');
        expect(replySubmitDriver.getButton().length).toBeGreaterThan(0);
    });
    it('should show a warning if the email is incorrect', function () {
        var replySubmitDriver = reply_submit_driver_1["default"].build('a1');
        expect(replySubmitDriver.getUserEmailWarning()).toBe('Enter a valid email address.');
    });
});

},{"./reply-submit-driver":12}],14:[function(require,module,exports){
var TicketViewDriver = (function () {
    function TicketViewDriver(elem, scope) {
        this.elem = elem;
        this.scope = scope;
    }
    TicketViewDriver.build = function (ticket) {
        var elem, scope;
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.ticket = ticket;
            elem = $compile('<ticket-view ticket="ticket"></ticket-view>')(scope);
            scope.$digest();
        });
        return new TicketViewDriver(elem, scope);
    };
    TicketViewDriver.prototype.getEmail = function () {
        return this.elem.find('h3').eq(0).text().split(' ')[1];
    };
    TicketViewDriver.prototype.getRepliesDrv = function () {
        return this.elem.find('replies');
    };
    TicketViewDriver.prototype.getReplySubmitDrv = function () {
        return this.elem.find('reply-submit');
    };
    TicketViewDriver.prototype.getTicketTitle = function () {
        return this.elem.find('.ticket-title').text();
    };
    TicketViewDriver.prototype.getTicketContent = function () {
        return this.elem.find('.ticket-content').text();
    };
    return TicketViewDriver;
})();
exports.__esModule = true;
exports["default"] = TicketViewDriver;

},{}],15:[function(require,module,exports){
var generator_1 = require('../common/generator');
var ticket_view_driver_1 = require('./ticket-view-driver');
describe('ticket-view directive', function () {
    beforeEach(function () {
        angular.mock.module('tickets');
    });
    it('should contain a replies directive', function () {
        var testTicket = generator_1["default"].generateRandomTicket();
        var ticketViewDriver = ticket_view_driver_1["default"].build(testTicket);
        expect(ticketViewDriver.getRepliesDrv().length).toBeGreaterThan(0);
    });
    it('should contain a submit reply directive', function () {
        var testTicket = generator_1["default"].generateRandomTicket();
        var ticketViewDriver = ticket_view_driver_1["default"].build(testTicket);
        expect(ticketViewDriver.getReplySubmitDrv().length).toBeGreaterThan(0);
    });
    it('render the correct email address', function () {
        var testTicket = generator_1["default"].generateRandomTicket();
        var ticketViewDriver = ticket_view_driver_1["default"].build(testTicket);
        expect(ticketViewDriver.getEmail()).toBe('bob@bobcorp.com');
    });
    it('render the correct ticket title', function () {
        var testTicket = generator_1["default"].generateRandomTicket();
        var ticketViewDriver = ticket_view_driver_1["default"].build(testTicket);
        expect(ticketViewDriver.getTicketTitle()).toBe('Hello');
    });
    it('render the correct ticket content', function () {
        var testTicket = generator_1["default"].generateRandomTicket();
        var ticketViewDriver = ticket_view_driver_1["default"].build(testTicket);
        expect(ticketViewDriver.getTicketContent()).toBe('I have a problem');
    });
});

},{"../common/generator":1,"./ticket-view-driver":14}],16:[function(require,module,exports){

},{}],17:[function(require,module,exports){

},{}]},{},[5,7,9,11,13,15,16,17]);
