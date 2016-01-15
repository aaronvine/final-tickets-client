
class Ticket {

  id: string;
  title: string;
  content: string;
  userEmail: string;

  constructor(id: string, title: string, content: string, userEmail: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userEmail = userEmail;
  }

  getTicketId(): string {
    return this.id;
  }

  getTicketTitle(): string {
    return this.title;
  }

  getTicketContent(): string {
    return this.content;
  }

  getTicketUserEmail(): string {
    return this.userEmail;
  }

}

export default Ticket;
