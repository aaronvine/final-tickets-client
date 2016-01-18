import TicketsService from '../../tickets.srv';
import TicketList from '../../common/ticketList';
import Ticket from '../../common/ticket';

class RepliesDirectiveController {
  items: {}[];
  title = 'Replies';

  /* @ngInject */
  constructor($parse: ng.IParseService, $element: any, $scope: any, ticketsService: TicketsService) {
        let repliesList = $parse($element.attr('ng-model'))($scope.$parent);
        this.items = repliesList;
        console.log('items (replies): ', this.items);
  }

}

export default function RepliesDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    require: 'ngModel',
    scope: {
    },
    link: function (scope: any, element: any , attr: ng.IAttributes, ngModelController: ng.INgModelController) {
      scope.ngModelController = ngModelController;
    },
    template: '<h3>{{ctrl.title}}</h3>' +
              '<ul class="replies-list">' +
                '<li class="reply" ng-repeat="reply in ctrl.items"><pre>{{reply.content}}<br>from: {{reply.userEmail}}</pre></li>' +
              '</ul>',
    controller: RepliesDirectiveController,
    controllerAs: 'ctrl'
  };
}
