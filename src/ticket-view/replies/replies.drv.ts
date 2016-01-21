import TicketsService from '../../tickets.srv';
import Ticket from '../../common/ticket';
import Reply from '../../common/reply';


class RepliesDirectiveController {
  replies: Reply[];
  title = 'Replies';

  /* @ngInject */
  constructor() {
    console.log('RepliesDirectiveController.ticketReplies: ', this.replies);
  }

}

export default function RepliesDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    scope: {
      replies: '='
    },
    template: '<h3>{{ctrl.title}}</h3>' +
              '<ul class="replies-list">' +
                '<li class="reply" ng-repeat="reply in ctrl.replies"><pre class="reply-content">{{reply.getReplyContent()}}</pre><pre class="reply-user-email">from: {{reply.getReplyUserEmail()}}</pre></li>' +
              '</ul>',
    controller: RepliesDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true
  };
}
