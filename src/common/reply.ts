
class Reply {

  content: string;
  userEmail: string;

  constructor(content: string, userEmail: string) {
    this.content = content;
    this.userEmail = userEmail;
  }

  getReplyContent(): string {
    return this.content;
  }

  getReplyUserEmail(): string {
    return this.userEmail;
  }

}

export default Reply;
