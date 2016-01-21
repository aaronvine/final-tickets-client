/// <reference path='../../../typings/tsd.d.ts'/>

export default class ReplySubmitDriver {

  elem: JQuery;
  scope;

  constructor(elem, scope) {
    this.elem = elem;
    this.scope = scope;
  }

  static build(id: string): ReplySubmitDriver {
    let elem, scope : any;
    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      scope.id = id;
      elem = $compile('<reply-submit id={{id}}></reply-submit>')(scope);
      scope.$digest();
    });
    return new ReplySubmitDriver(elem, scope);
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

  getUserEmailWarning(): any {
    return this.elem.find('.help-block').eq(0).text();
  }

}
