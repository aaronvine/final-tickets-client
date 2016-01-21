import Generator from '../common/generator';
import SearchDriver from './search-driver';

describe('search directive', function () {

  beforeEach(function () {
    angular.mock.module('tickets');
  });

  it('should contain a relevant title', function () {
    let tickets = Generator.generateRandomTicketList();
    let searchDrive = SearchDriver.build(tickets);
    expect(searchDrive.getTitle()).toBe('Search For A Ticket');
  });

  it('should contain a search input element', function () {
    let tickets = Generator.generateRandomTicketList();
    let searchDrive = SearchDriver.build(tickets);
    expect(searchDrive.getInput().length).toBeGreaterThan(0);
  });

  it('should show the result according to the search phrase', function () {
    let tickets = Generator.generateRandomTicketList();
    let searchDrive = SearchDriver.build(tickets);
    searchDrive.inputSearchPhrase('he');
    expect(searchDrive.getSuggestions().length).toBe(2);
  });

});
