import TicketsService from '../tickets.srv';
import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';

class SearchDirectiveController {
  searchItmes: Ticket[];
  suggestions: Ticket[];
  selectedIndex: number;
  searchText: string;

  /* @ngInject */
  constructor(private ticketsService: TicketsService, $scope: any, private $rootScope: any) {
    console.log('builiding the search controller, waiting for the promise to be resolved');
    ticketsService.getTicketsPromise()
    .then((message: string) => {
      console.log(message);
      // this.searchItmes = ticketsService.getGlobalTicketsList().getTicketList().map(function (ticket) {
      //   return {
      //             id: ticket.getTicketId(),
      //             title: ticket.getTicketTitle()
      //         };
      // });
      this.searchItmes = ticketsService.getGlobalTicketsList().getTicketList();
      console.log('searchItems: ', this.searchItmes);
      this.suggestions = [];
      this.selectedIndex = -1;
    });
  };

  // invoke on ng-change
  search(): void {
    console.log('invoked search function!!!');
    this.suggestions = [];
    let myMaxSuggestionListLength = 0;
    let that = this;
    this.searchItmes.every(function (item) {
      let searchItemsLowercase = angular.lowercase(item.getTicketTitle());
      console.log('searchItemsLowercase: ', searchItemsLowercase);
      let searchTextLowercase = angular.lowercase(that.searchText);
      console.log('searchTextLowercase: ', searchTextLowercase);
      if (searchItemsLowercase.indexOf(searchTextLowercase) > -1) {
        console.log('found a match: ', searchTextLowercase);
        that.suggestions.push(item);
        myMaxSuggestionListLength += 1;
        if (myMaxSuggestionListLength === 3) {
          // break the 'every' loop
          return false;
        } else {
          return true;
        }
      }
      return true;
    });
  }

  checkKeyDown (event) {
		if (event.keyCode === 40) {
      //down key, increment selectedIndex
			event.preventDefault();
			if (this.selectedIndex + 1 !== this.suggestions.length) {
				this.selectedIndex++;
			}
		} else if (event.keyCode === 38) {
      //up key, decrement selectedIndex
			event.preventDefault();
			if (this.selectedIndex - 1 !== -1) {
				this.selectedIndex--;
			}
		} else if (event.keyCode === 13) {
      //enter key, empty suggestions array
			event.preventDefault();
			this.suggestions = [];
		}
	}

  checkKeyUp (event) {
		if (event.keyCode !== 8 || event.keyCode !== 46) {
      //delete or backspace
			if (this.searchText === '') {
				this.suggestions = [];
			}
		}
	}

}

export default function SearchDirectiveFactory(): ng.IDirective {
  return <ng.IDirective> {
    restrict: 'E',
    scope: {
    },
    template: '<h3>Search For A Ticket</h3>' +
              '<input type="text" placeholder="Search for tickets" class="input" ng-keydown="ctrl.checkKeyDown($event)" ng-keyup="ctrl.checkKeyUp($event)" ng-model="ctrl.searchText" ng-change="ctrl.search()"/>' +
              '<ul class="suggestions-list">' +
                '<li ng-repeat="suggestion in ctrl.suggestions track by $index" ng-class="suggestion" ng-click="ctrl.goToTicketView($index)"><a ui-sref="ticket({ticketId: suggestion.getTicketId()})">{{suggestion.getTicketTitle()}}</a></li>' +
              '</ul>',
    controller: SearchDirectiveController,
    controllerAs: 'ctrl'
  };
}
