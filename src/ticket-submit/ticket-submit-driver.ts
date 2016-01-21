/// <reference path='../../typings/tsd.d.ts'/>

export default class TicketSubmitDriver {

  elem: JQuery;
  scope;

  constructor(elem, scope) {
    this.elem = elem;
    this.scope = scope;
  }

  static build(): TicketSubmitDriver {
    let elem, scope : any;
    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      elem = $compile('<ticket-submit></ticket-submit>')(scope);
      scope.$digest();
    });
    return new TicketSubmitDriver(elem, scope);
  }

  getTitle(): string {
    return this.elem.find('h3').text();
  }

  getInput(): any {
    return this.elem.find('input');
  }

  getTextarea(): any {
    return this.elem.find('textarea');
  }

  getForm(): any {
    return this.elem.find('form');
  }

  getButton(): any {
    return this.elem.find('button');
  }

  getTitleWarning(): any {
    return this.elem.find('.help-block').eq(0).text();
  }

  getUserEmailWarning(): any {
    return this.elem.find('.help-block').eq(1).text();
  }

}
