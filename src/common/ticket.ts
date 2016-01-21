import Reply from './reply';

class Ticket {

  id: string;
  title: string;
  content: string;
  userEmail: string;
  replies: Reply[];

  constructor(id: string, title: string, content: string, userEmail: string, replies: Reply[]) {
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

  getTicketReplies(): Reply[] {
    return this.replies;
  }

  updateReplies(replies) {
    this.replies = replies;
  }

}

export default Ticket;
