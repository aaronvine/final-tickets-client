import TicketsService from '../tickets.srv';
import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';

class LatestTicketsDirectiveController {
  items: TicketList;
  itemsLimit = 5;
  title = 'Latest Tickets';

  /* @ngInject */
  constructor($parse: ng.IParseService, $element: any, $scope: any, ticketsService: TicketsService) {
    console.log('builiding the latest-tickets controller, waiting for the promise to be resolved');
    ticketsService.getTicketsPromise()
    .then((message: string) => {
        console.log(message);
        let tempItemsList = $parse($element.attr('ng-model'))($scope.$parent).getTicketList();
        let myItemsList = $.extend(true, [], tempItemsList);
        this.items = new TicketList(myItemsList);
        console.log('items: ', this.items);
        this.items.updateTicketList(this.items.getTicketList().splice(this.items.getTicketList().length - this.itemsLimit, this.itemsLimit));
        $scope.items = this.items;
        $scope.title = this.title;
        $scope.$digest();
        ticketsService.setTicketsPromise();
      });
  }
}

export default function LatestTicketsDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    require: 'ngModel',
    scope: {
    },
    link: function (scope: any, element: any , attr: ng.IAttributes, ngModelController: ng.INgModelController) {
      scope.ngModelController = ngModelController;
    },
    template: '<h3>{{title}}</h3>' +
              '<ul class="latest-tickets-list">' +
                '<li class="ticket" ng-repeat="ticket in items.getTicketList()"><a ui-sref="ticket({ticketId: ticket.getTicketId()})"><b>{{ticket.getTicketTitle()}}</b></a><br><pre>{{ticket.getTicketContent().split("\n")[0]}}</pre></li>' +
              '</ul>',
    controller: LatestTicketsDirectiveController
  };
}
