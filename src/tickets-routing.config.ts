import TicketsService from './tickets.srv';
import TicketList from './common/ticketList';
import Ticket from './common/ticket';

/*@ngInject*/
export default function ticketsRoutingConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>{{ctrl.greetings}}</h1>' +
                  '<search></search>' +
                  '<latest-tickets ng-model=ctrl.tickets></latest-tickets>' +
                  '<a ui-sref="submit"><b>Submit a new ticket</b></a>',
        controller: function (ticketsService: TicketsService, $scope: any) {
          ticketsService.getGreetingsMessage()
            .then((data) => {
              this.greetings = data;
            });
          ticketsService.getTicketsFromServer()
            .then((data) => {
              this.tickets = ticketsService.buildTicketsListFromJson(data);
              ticketsService.ticketsPromise.resolve('tickets get request has been resolved!');
            });
        },
        controllerAs: 'ctrl'
      })
      .state('ticket', {
        url: '/ticket/:ticketId',
        resolve: {
            ticket: function ($stateParams, ticketsService: TicketsService, $state) {
                try {
                    return ticketsService.globalTicketList.getTicketList().filter(function (ticket) {
                      return ticket.getTicketId() === $stateParams.ticketId;
                    })[0];
                } catch (e) {
                  console.error(e);
                  $state.go('404');
                }
            }
        },
        template: '<ticket-view ticket="ctrl.item"></ticket-view>',
        controller: function (ticket: Ticket) {
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
