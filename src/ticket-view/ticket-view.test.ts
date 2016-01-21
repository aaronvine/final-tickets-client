import Generator from '../common/generator';
import TicketViewDriver from './ticket-view-driver';

describe('ticket-view directive', function () {

  beforeEach(function () {
    angular.mock.module('tickets');
  });

  it('should contain a replies directive', function () {
    let testTicket = Generator.generateRandomTicket();
    let ticketViewDriver = TicketViewDriver.build(testTicket);
    expect(ticketViewDriver.getRepliesDrv().length).toBeGreaterThan(0);
  });

  it('should contain a submit reply directive', function () {
    let testTicket = Generator.generateRandomTicket();
    let ticketViewDriver = TicketViewDriver.build(testTicket);
    expect(ticketViewDriver.getReplySubmitDrv().length).toBeGreaterThan(0);
  });

  it('render the correct email address', function () {
    let testTicket = Generator.generateRandomTicket();
    let ticketViewDriver = TicketViewDriver.build(testTicket);
    expect(ticketViewDriver.getEmail()).toBe('bob@bobcorp.com');
  });

  it('render the correct ticket title', function () {
    let testTicket = Generator.generateRandomTicket();
    let ticketViewDriver = TicketViewDriver.build(testTicket);
    expect(ticketViewDriver.getTicketTitle()).toBe('Hello');
  });

  it('render the correct ticket content', function () {
    let testTicket = Generator.generateRandomTicket();
    let ticketViewDriver = TicketViewDriver.build(testTicket);
    expect(ticketViewDriver.getTicketContent()).toBe('I have a problem');
  });

});
