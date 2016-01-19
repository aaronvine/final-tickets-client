import TicketsService from '../../tickets.srv';
import TicketList from '../../common/ticketList';
import Ticket from '../../common/ticket';

class ReplySubmitDirectiveController {
  newReply: {};
  isSubmitted: boolean;

  /* @ngInject */
  constructor(private ticketsService: TicketsService, private $state: any) {
    this.newReply = {};
    this.isSubmitted = false;
  };

  submitNewReply(isValid: boolean, id: string): void {
    console.log('id: ', id);
    this.isSubmitted = true;
    this.ticketsService.postNewReplyToServer(id, this.newReply);
    //maybe should clear the newReply field
    this.ticketsService.getReplySubmitPromise()
    .then(() => {
      this.$state.go('home');
    });
  }
}

export default function ReplySubmitDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    scope: {
      id: '@',
    },
    template: '<h3>Add a new Reply:</h3>' +
              '<form name="submitReplyForm" class="form" ng-submit="ctrl.submitNewReply(submitReplyForm.$valid, id)" novalidate>' +
                '<div class="form-group">' +
                  '<label>Email address</label>' +
                  '<input type="email" name="userEmail" class="form-control" ng-model="ctrl.newReply.userEmail" ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" required/>' +
                  '<p ng-show="submitReplyForm.userEmail.$invalid" class="help-block">Enter a valid email address.</p>' +
                '</div>' +
                '<div class="form-group">' +
                  '<label>Content</label>' +
                  '<textarea type="text" name="content" rows="5" class="form-control" ng-model="ctrl.newReply.content"/></textarea>' +
                '</div>' +
                '<div class="row">' +
                  '<div class="col">' +
                    '<button class="btn btn-success pull-right" ng-disabled="submitReplyForm.$invalid"><span class="glyphicon glyphicon-plus-sign"></span>   Add</button>' +
                  '</div>' +
                '</div>' +
              '</form>',
    controller: ReplySubmitDirectiveController,
    controllerAs: 'ctrl'
  };
}
