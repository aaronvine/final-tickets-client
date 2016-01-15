/// <reference path='../typings/tsd.d.ts' />

import Ticket from './common/ticket';
import TicketList from '././common/ticketList';

class TicketsService {

  greetingsMessage: string;
  globalTicketList: TicketList;
  ticketsPromise = Q.defer();

  constructor(private $http: ng.IHttpService) {
    this.greetingsMessage = 'default';
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
      return new Ticket(json[index].id, json[index].title, json[index].content, json[index].userEmail);
    }));
    console.log('built TicketList: ', this.globalTicketList);
    return this.globalTicketList;
  }

  getTicketsPromise() {
      return this.ticketsPromise.promise;
  }
}

export default TicketsService;
