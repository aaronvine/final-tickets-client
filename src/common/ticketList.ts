import Ticket from './ticket';

class TicketList {

  myTicketList: Ticket[];

  constructor(myTicketList: Ticket[]) {
    this.myTicketList = myTicketList;
  }

  getTicketList(): Ticket[] {
      return this.myTicketList;
  }

  addNewTicket(newTicket: Ticket): void {
      this.myTicketList.push(newTicket);
  }

  removeTicket(ticketToRemove: Ticket): void {
        this.myTicketList.splice(this.myTicketList.indexOf(ticketToRemove), 1);
  }

  static uuid() {
      return Math.floor(Math.random() * 999999).toString(36);
  }

  static generateRandomTicketList(): TicketList {
      let t1 = new Ticket(this.uuid(), 'Hello', 'I have a problem', 'bob@bobcorp.com');
      let t2 = new Ticket(this.uuid(), 'Problem with domain', 'It is not working', 'alice@alicecorp.com');
      let t3 = new Ticket(this.uuid(), 'Help me again', 'My site is broken', 'bob@bobcorp.com');
      return new TicketList([t1, t2, t3]);
  }

}

export default TicketList;
