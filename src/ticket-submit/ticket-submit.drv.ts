import TicketsService from '../tickets.srv';
import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';

class TicketSubmitDirectiveController {
  newTicket: {};
  isSubmitted: boolean;
  /* @ngInject */
  constructor(private ticketsService: TicketsService) {
    this.newTicket = {};
    this.isSubmitted = false;
  };

  submitNewTicket(isValid: boolean): void {
    this.isSubmitted = true;
    this.ticketsService.postNewTicketToServer(this.newTicket);
    //maybe should clear the newTicket field
  }
}

export default function TicketSubmitDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    scope: {
    },
    template: '<h3>Add a new Ticket:</h3>' +
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
                  '<textarea type="text" name="content" rows="5" class="form-control" ng-model="ctrl.newTicket.content"/></textarea>' +
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
