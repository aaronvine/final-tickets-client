import TicketsService from '../tickets.srv';
import Reply from '../common/reply';
import Ticket from '../common/ticket';

class TicketViewDirectiveController {
  ticket: Ticket;
  replies: Reply[];
  ticketId: string;

  /* @ngInject */
  constructor(ticketsService: TicketsService) {
    this.ticketId = this.ticket.getTicketId();
    this.replies = this.ticket.getTicketReplies();
    console.log('TicketViewDirectiveController.ticket: ', this.ticket);
    console.log('TicketViewDirectiveController.replies: ', this.replies);
  };
}

export default function TicketViewDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    scope: {
      ticket: '=',
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
