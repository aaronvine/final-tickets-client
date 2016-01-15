import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';
import LatestTicketsDriver from './latest-tickets-driver';
import TicketsService from '../tickets.srv';


describe('latest-tickets directive', function () {
  beforeEach(function() {
    angular.mock.module('tickets');
  });
  fit('should render the title based on the given title', inject (function (ticketsService: TicketsService) {
    // let testsPromise =   ticketsService.getTestsPromise();
    let items = TicketList.generateRandomTicketList();
    let length = items.getTicketList().length;
    // let deferred = Q.defer();
    // let promise = deferred.promise;
    spyOn(ticketsService, 'getTicketsPromise').and.returnValue(Q(resolve => resolve('resolved promise')));
    // deferred.resolve('tickets get request has been resolved!');
    console.log('buliding driver');
    let latestTicketsDriver = LatestTicketsDriver.build(items);
    expect(latestTicketsDriver.getLatestTicketsTitle()).toBe('testing latest tickets');
  }));
  it('should render the latest tickets based on the list of tickets', function () {
    let items = TicketList.generateRandomTicketList();
    let length = items.getTicketList().length;
    let latestTicketsDriver = LatestTicketsDriver.build(items);
    expect(latestTicketsDriver.getTicketListLength()).toBe(length);
    expect(latestTicketsDriver.getTicketTitleAt(2)).toEqual(items);
  });
  it('should show the ticket view once a ticket is clicked', function () {
    let items = TicketList.generateRandomTicketList();
    let latestTicketsDriver = LatestTicketsDriver.build(items);
    latestTicketsDriver.clickOnTicketAt(0);
    //TODO
  });
});
