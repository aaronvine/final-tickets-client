/// <reference path='../typings/tsd.d.ts' />

import Ticket from './common/ticket';
import Reply from './common/reply';

class TicketsService {

  greetingsMessage: string;
  globalTicketList: Ticket[];
  ticketSubmitPromise = Q.defer();
  replySubmitPromise = Q.defer();

  constructor(private $http: ng.IHttpService) {
    this.greetingsMessage = 'default';
  }

  getGlobalTicketsList(): Ticket[] {
    return this.globalTicketList;
  }

  getGreetingsMessage(): ng.IPromise<string> {
    console.log('TicketsService is getting greetings message from server');
    return this.$http.get('http://localhost:3000/test')
      .then((res) => res.data);
  }

  getTicketsFromServer(): ng.IPromise<JSON> {
    console.log('TicketsService is getting tickets from server');
    return this.$http.get('http://localhost:3000/tickets')
      .then((res) => res.data);
  }

  buildRepliesListFromJson(json: JSON): Reply[] {
    console.log('TicketsService is building replies json: ', JSON.stringify(json));
    let numOfReplies = Object.keys(json).length;
    let repliesList = Array.apply(null, Array(numOfReplies)).map(function(item, index) {
      return new Reply(json[index].content, json[index].userEmail);
    });
    console.log('TicketsService built the replies list: ', repliesList);
    return repliesList;
  }

  buildTicketsListFromJson(json: JSON): Ticket[] {
    console.log('TicketsService is building ticket json: ', JSON.stringify(json));
    let numOfTickets = Object.keys(json).length;
    this.globalTicketList = Array.apply(null, Array(numOfTickets)).map(function(item, index) {
      return new Ticket(json[index].id, json[index].title, json[index].content, json[index].userEmail, json[index].replies);
    });
    console.log('TicketsService built the tickets list: ', this.globalTicketList);
    return this.globalTicketList;
  }

  getRepliesFromServer(ticketId: string): ng.IPromise<JSON> {
    console.log('TicketsService is getting replies from server');
    return this.$http.get('http://localhost:3000/tickets/' + ticketId + '/replies')
      .then((res) => res.data);
  }

  postNewTicketToServer(newTicket: {}): void {
    console.log('TicketsService is sending a new ticket to the server: ', JSON.stringify(newTicket));
    this.$http.post('http://localhost:3000/tickets', JSON.stringify(newTicket));
    this.ticketSubmitPromise.resolve();
  }

  postNewReplyToServer(ticketId: string, newReply: {}): void {
    console.log('TicketsService is sending a new reply to the server: ', JSON.stringify(newReply));
    this.$http.post('http://localhost:3000/tickets/' + ticketId + '/replies', JSON.stringify(newReply));
    this.replySubmitPromise.resolve();
  }

  getTicketSubmitPromise() {
      return this.ticketSubmitPromise.promise;
  }

  setTicketSubmitPromise() {
      this.ticketSubmitPromise = Q.defer();
  }

  getReplySubmitPromise() {
      return this.replySubmitPromise.promise;
  }

  setReplySubmitPromise() {
      this.replySubmitPromise = Q.defer();
  }
}

export default TicketsService;
