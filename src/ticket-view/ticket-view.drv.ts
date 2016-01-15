import TicketsService from '../tickets.srv';
import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';

class TicketViewDirectiveController {
  ticket: Ticket;

  /* @ngInject */
  constructor($scope: any) {
    this.ticket = $scope.ticket;
  };
}

export default function TicketViewDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
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
