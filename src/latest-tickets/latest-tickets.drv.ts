import LatestTicketsService from './latest-tickets.srv';
import TicketList from '../common/ticketList';

class LatestTicketsDirectiveController {
  items: TicketList;
  itemsLimit = 8;

  /* @ngInject */
  constructor() {
    //TODO
  }

}

export default function LatestTicketsDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    scope: {
      items: '=',
    },
    template: '',
    controller: LatestTicketsDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true
  };
}
