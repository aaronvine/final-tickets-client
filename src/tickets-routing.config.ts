import TicketsService from './tickets.srv';
import Reply from './common/reply';
import Ticket from './common/ticket';

/*@ngInject*/
export default function ticketsRoutingConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>{{ctrl.greetings}}</h1>' +
                  '<search tickets="ctrl.tickets"></search>' +
                  '<latest-tickets tickets="ctrl.tickets"></latest-tickets>' +
                  '<a ui-sref="submit"><b>Submit a new ticket</b></a>',
        resolve: {
          tickets: function (ticketsService: TicketsService) {
            return ticketsService.getTicketsFromServer()
              .then((res) => (ticketsService.buildTicketsListFromJson(res)));
          },
          greetingMessage: function (ticketsService: TicketsService) {
            return ticketsService.getGreetingsMessage();
          }
        },
        controller: function (tickets: Ticket[], greetingMessage) {
          this.greeting = greetingMessage;
          this.tickets = tickets;
        },
        controllerAs: 'ctrl'
      })
      .state('ticket', {
        url: '/ticket/:ticketId',
        resolve: {
            ticket: function ($stateParams, ticketsService: TicketsService, $state) {
              return ticketsService.globalTicketList.filter(function (ticket) {
                return ticket.getTicketId() === $stateParams.ticketId;
              })[0];
            },
            replies: function ($stateParams, ticketsService: TicketsService) {
              return ticketsService.getRepliesFromServer($stateParams.ticketId)
                .then((res) => (ticketsService.buildRepliesListFromJson(res)));
            }
        },
        template: '<ticket-view ticket="ctrl.ticket"></ticket-view>',
        controller: function (ticket: Ticket, replies: Reply[]) {
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
