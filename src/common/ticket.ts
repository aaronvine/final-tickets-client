
class Ticket {

  id: string;
  title: string;
  content: string;
  userEmail: string;
  replies: {}[];

  constructor(id: string, title: string, content: string, userEmail: string, replies: {}[]) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userEmail = userEmail;
    this.replies = replies;
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

  getTicketReplies(): {}[] {
    return this.replies;
  }

}

export default Ticket;
