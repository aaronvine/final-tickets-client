import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';
import TicketSubmitDriver from './ticket-submit-driver';
import TicketsService from '../tickets.srv';

describe('ticket-submit directive', function () {

  beforeEach(function () {
    angular.mock.module('tickets');
  });

  it('should contain a relevant title', function () {
    let ticketSubmitDriver = TicketSubmitDriver.build();
    expect(ticketSubmitDriver.getTitle()).toBe('Add a new Ticket');
  });

  it('should contain a submit form', function () {
    let ticketSubmitDriver = TicketSubmitDriver.build();
    expect(ticketSubmitDriver.getForm().length).toBeGreaterThan(0);
  });

  it('should contain 2 inputs and 1 textarea', function () {
    let ticketSubmitDriver = TicketSubmitDriver.build();
    expect(ticketSubmitDriver.getInput().length).toBe(2);
    expect(ticketSubmitDriver.getTextarea().length).toBe(1);
  });

  it('should contain a submit button', function () {
    let ticketSubmitDriver = TicketSubmitDriver.build();
    expect(ticketSubmitDriver.getButton().length).toBeGreaterThan(0);
  });

});
