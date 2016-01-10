
class TicketsService {

  greetingsMessage: string;

  constructor(private $http: ng.IHttpService) {
    this.greetingsMessage = 'Welcome!';
  }

  getGreetingsMessage(): ng.IPromise<string> {
    console.log('getting message from server');
    // return this.$http.get('http://localhost:3000/test')
    //   .then(function (response) {
    //       return response.data;
    //   });
    return this.$http.get('http://localhost:3000/test')
      .then((res) => res.data);
  }

}

export default TicketsService;
