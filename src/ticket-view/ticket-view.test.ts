import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';
import TicketViewDriver from './ticket-view-driver';
import TicketsService from '../tickets.srv';

describe('ticket-view directive', function () {

  beforeEach(function () {
    angular.mock.module('tickets');
  });

  it('should contain a replies directive', function () {
    let testTicket = new Ticket('e5', 'Hello', 'I have a problem', 'bob@bobcorp.com', []);
    let ticketViewDriver = TicketViewDriver.build(testTicket);
    expect(ticketViewDriver.getRepliesDrv().length).toBeGreaterThan(0);
  });

  it('should contain a submit reply directive', function () {
    let testTicket = new Ticket('e5', 'Hello', 'I have a problem', 'bob@bobcorp.com', []);
    let ticketViewDriver = TicketViewDriver.build(testTicket);
    expect(ticketViewDriver.getReplySubmitDrv().length).toBeGreaterThan(0);
  });

  it('show the correct email address', function () {
    let testTicket = new Ticket('e5', 'Hello', 'I have a problem', 'bob@bobcorp.com', []);
    let ticketViewDriver = TicketViewDriver.build(testTicket);
    expect(ticketViewDriver.getEmail()).toBe('bob@bobcorp.com');
  });

});
