import TicketsService from '../tickets.srv';
import Reply from '../common/reply';
import Ticket from '../common/ticket';

class TicketSubmitDirectiveController {
  newTicket: {};
  isSubmitted: boolean;
  title = 'Add a new Ticket';

  /* @ngInject */
  constructor(private ticketsService: TicketsService, private $state: any) {
    this.newTicket = {};
    this.isSubmitted = false;
  };

  submitNewTicket(isValid: boolean): void {
    this.isSubmitted = true;
    this.ticketsService.postNewTicketToServer(this.newTicket);
    this.ticketsService.getTicketSubmitPromise()
    .then(() => {
      this.$state.go('home');
    });
  }
}

export default function TicketSubmitDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    scope: {
    },
    template: '<h3>{{ctrl.title}}</h3>' +
              '<form name="submitTicketForm" class="form" ng-submit="ctrl.submitNewTicket(submitTicketForm.$valid)" novalidate>' +
                '<div class="form-group">' +
                  '<label>Title</label>' +
                  '<input type="text" name="title" id="input-ticket-title" class="form-control" ng-model="ctrl.newTicket.title" ng-minlength="3" ng-maxlength="50" required/>' +
                  '<p ng-show="submitTicketForm.title.$invalid" class="help-block">Title is required.</p>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label>Email address</label>' +
                  '<input type="email" name="userEmail" id="input-ticket-email" class="form-control" ng-model="ctrl.newTicket.userEmail" ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" required/>' +
                  '<p ng-show="submitTicketForm.userEmail.$invalid" class="help-block">Enter a valid email address.</p>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label>Content</label>' +
                  // '<textarea type="text" name="content" rows="5" class="form-control" ng-model="ctrl.newTicket.content"/></textarea>' +
                  '<div text-angular name="content" id="input-ticket-content" ng-model="ctrl.newTicket.content" ta-text-editor-class="border-around" ta-html-editor-class="border-around"></div>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col">' +
                    '<button id="button-ticket-submit" class="btn btn-success pull-right" ng-disabled="submitTicketForm.$invalid"><span class="glyphicon glyphicon-plus-sign"></span>   Add</button>' +
                  '</div>' +
                '</div>' +
              '</form>',
    controller: TicketSubmitDirectiveController,
    controllerAs: 'ctrl'
  };
}
