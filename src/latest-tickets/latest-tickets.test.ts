import Generator from '../common/generator';
import LatestTicketsDriver from './latest-tickets-driver';

describe('latest-tickets directive', function () {

  beforeEach(function() {
    angular.mock.module('tickets');
  });

  it('should render the title based on the given title', function () {
    let tickets = Generator.generateRandomTicketList();
    let length = tickets.length;
    let latestTicketsDriver = LatestTicketsDriver.build(tickets);
    expect(latestTicketsDriver.getLatestTicketsTitle()).toBe('Latest Tickets');
  });

  it('should show up to 5 tickets', function () {
    let items = Generator.generateRandomTicketList();
    let length = items.length;
    let latestTicketsDriver = LatestTicketsDriver.build(items);
    expect(latestTicketsDriver.getTicketListLength()).toBe(length);
    let moreItems = Generator.generateRandomTicketList();
    let finalItmes = items.concat(moreItems);
    latestTicketsDriver = LatestTicketsDriver.build(finalItmes);
    expect(latestTicketsDriver.getTicketListLength()).toBe(5);
  });

  it('should render the latest tickets titles based on the given list of tickets', function () {
    let items = Generator.generateRandomTicketList();
    let latestTicketsDriver = LatestTicketsDriver.build(items);
    expect(latestTicketsDriver.getTicketTitleAt(2)).toEqual(items[2].getTicketTitle());
  });

  it('should render the latest tickets content based on the given list of tickets', function () {
    let items = Generator.generateRandomTicketList();
    let latestTicketsDriver = LatestTicketsDriver.build(items);
    expect(latestTicketsDriver.getTicketContentAt(1)).toEqual(items[1].getTicketContent().split('\n')[0]);
  });

});
