/// <reference path='../typings/tsd.d.ts' />

import LatestTicketsDirectiveFactory from './latest-tickets/latest-tickets.drv';
import TicketViewDirectiveFactory from './ticket-view/ticket-view.drv';
import TicketSubmitDirectiveFactory from './ticket-submit/ticket-submit.drv';
import SearchDirectiveFactory from './search/search.drv';
import RepliesDirectiveFactory from './ticket-view/replies/replies.drv';
import ReplySubmitDirectiveFactory from './ticket-view/reply-submit/reply-submit.drv';
import ticketsRoutingConfig from './tickets-routing.config';
import TicketsService from './tickets.srv';

angular.module('tickets', ['ui.router', 'textAngular'])
.service('ticketsService', TicketsService)
.directive('latestTickets', LatestTicketsDirectiveFactory)
.directive('ticketView', TicketViewDirectiveFactory)
.directive('ticketSubmit', TicketSubmitDirectiveFactory)
.directive('search', SearchDirectiveFactory)
.directive('replies', RepliesDirectiveFactory)
.directive('replySubmit', ReplySubmitDirectiveFactory)
.config(ticketsRoutingConfig)
.filter('htmlToPlaintext', function () {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, ' ') : '';
    };
  });
