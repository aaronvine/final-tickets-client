/// <reference path='../typings/tsd.d.ts' />

import Ticket from './common/ticket';
import TicketList from '././common/ticketList';

class TicketsService {

  greetingsMessage: string;
  globalTicketList: TicketList;
  ticketsPromise = Q.defer();
  ticketSubmitPromise = Q.defer();
  replySubmitPromise = Q.defer();

  constructor(private $http: ng.IHttpService) {
    this.greetingsMessage = 'default';
  }

  getGlobalTicketsList(): TicketList {
    return this.globalTicketList;
  }

  getGreetingsMessage(): ng.IPromise<string> {
    console.log('getting message from server');
    return this.$http.get('http://localhost:3000/test')
      .then((res) => res.data);
  }

  getTicketsFromServer(): ng.IPromise<JSON> {
    console.log('getting tickets from server');
    return this.$http.get('http://localhost:3000/tickets')
      .then((res) => res.data);
  }

  buildTicketsListFromJson(json: JSON): TicketList {
    console.log('building json: ', JSON.stringify(json));
    let numOfTickets = Object.keys(json).length;
    this.globalTicketList = new TicketList(Array.apply(null, Array(numOfTickets)).map(function(item, index) {
      return new Ticket(json[index].id, json[index].title, json[index].content, json[index].userEmail, json[index].replies);
    }));
    console.log('built TicketList: ', this.globalTicketList);
    return this.globalTicketList;
  }

  postNewTicketToServer(newTicket: {}): void {
    console.log('sending a new ticket to the server: ', JSON.stringify(newTicket));
    this.$http.post('http://localhost:3000/tickets', JSON.stringify(newTicket));
    this.ticketSubmitPromise.resolve();
  }

  postNewReplyToServer(ticketId: string, newReply: {}): void {
    console.log('sending a new reply to the server: ', JSON.stringify(newReply));
    this.$http.post('http://localhost:3000/tickets/' + ticketId + '/replies', JSON.stringify(newReply));
    this.replySubmitPromise.resolve();
  }

  getTicketsPromise() {
      return this.ticketsPromise.promise;
  }

  setTicketsPromise() {
      this.ticketsPromise = Q.defer();
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
