import TicketList from '../common/ticketList';
import Ticket from '../common/ticket';
import LatestTicketsDriver from './latest-tickets-driver';


describe('latest-tickets directive', function () {
    it('should return true', function () {
        expect(true).toBeTruthy;
    });
    beforeEach(
        angular.mock.module('tickets')
    );
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
