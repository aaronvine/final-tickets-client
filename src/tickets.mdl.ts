/// <reference path='../typings/tsd.d.ts' />

import LatestTicketsDirectiveFactory from './latest-tickets/latest-tickets.drv';
import ticketsRoutingConfig from './tickets-routing.config';
import TicketsService from './tickets.srv';

angular.module('tickets', ['ui.router'])
.directive('latestTickets', LatestTicketsDirectiveFactory)
.config(ticketsRoutingConfig)
.service('ticketsService', TicketsService)
.controller('ticketsCtrl', function (ticketsService: TicketsService) {
    ticketsService.getGreetingsMessage()
      .then((data) => {
        this.greetings = data;
      });
});
