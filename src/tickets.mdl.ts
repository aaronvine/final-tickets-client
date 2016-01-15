/// <reference path='../typings/tsd.d.ts' />

import LatestTicketsDirectiveFactory from './latest-tickets/latest-tickets.drv';
import LatestTicketsDirectiveController from './latest-tickets/latest-tickets.drv';
import TicketViewDirectiveFactory from './ticket-view/ticket-view.drv';
import TicketViewDirectiveController from './ticket-view/ticket-view.drv';
import ticketsRoutingConfig from './tickets-routing.config';
import TicketsService from './tickets.srv';

angular.module('tickets', ['ui.router'])
.service('ticketsService', TicketsService)
.directive('latestTickets', LatestTicketsDirectiveFactory)
.directive('ticketView', TicketViewDirectiveFactory)
.config(ticketsRoutingConfig)
//checking connection with server
.controller('ticketsCtrl', function (ticketsService: TicketsService) {
  ticketsService.getGreetingsMessage()
    .then((data) => {
      this.greetings = data;
    });
  ticketsService.getTicketsFromServer()
    .then((data) => {
      this.tickets = ticketsService.buildTicketsListFromJson(data);
      ticketsService.ticketsPromise.resolve('tickets get request has been resolved!');
    });
});
