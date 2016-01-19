import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';
import SearchDriver from './search-driver';
import TicketsService from '../tickets.srv';

describe('search directive', function () {

  beforeEach(function () {
    angular.mock.module('tickets');
  });

  it('should contain a relevant title', function () {
    let searchDrive = SearchDriver.build();
    expect(searchDrive.getTitle()).toBe('Search For A Ticket');
  });

  it('should contain a search input element', function () {
    let searchDrive = SearchDriver.build();
    expect(searchDrive.getInput().length).toBeGreaterThan(0);
  });

  it('should show the result according to the search phrase', inject (function (ticketsService: TicketsService) {
    let searchDrive = SearchDriver.build();
    let items = TicketList.generateRandomTicketList();
    spyOn(ticketsService, 'getTicketsPromise').and.returnValue(Q.defer().resolve);
    spyOn(ticketsService, 'getGlobalTicketsList').and.returnValue(items);
    searchDrive.clickOnInput();
    searchDrive.inputSearchPhrase('he');
    expect(searchDrive.getSuggestions().length).toBe(2);
  }));

});
