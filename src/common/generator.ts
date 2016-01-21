import Ticket from './ticket';
import Reply from './reply';

class Generator {

  static uuid() {
      return Math.floor(Math.random() * 999999).toString(36);
  }

  static generateRandomTicketList(): Ticket[] {
      let t1 = new Ticket(this.uuid(), 'Hello', 'I have a problem', 'bob@bobcorp.com', []);
      let t2 = new Ticket(this.uuid(), 'Problem with domain', 'It is not working', 'alice@alicecorp.com', []);
      let t3 = new Ticket(this.uuid(), 'Help me again', 'My site is broken', 'bob@bobcorp.com', []);
      return [t1, t2, t3];
  }

  static generateRandomRepliesList(): Reply[] {
      let r1 = new Reply('I have a problem', 'bob@bobcorp.com');
      let r2 = new Reply('It is not working', 'alice@alicecorp.com');
      let r3 = new Reply('My site is broken', 'bob@bobcorp.com');
      return [r1, r2, r3];
  }

  static generateRandomTicket(): Ticket {
    return new Ticket('e5', 'Hello', 'I have a problem', 'bob@bobcorp.com', []);
  }

}

export default Generator;
