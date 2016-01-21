/// <reference path='../../../typings/tsd.d.ts'/>
import Reply from '../../common/reply';

export default class RepliesDriver {

  elem: JQuery;
  scope;

  constructor(elem, scope) {
    this.elem = elem;
    this.scope = scope;
  }

  static build(replies: Reply[]): RepliesDriver {
    let elem, scope : any;
    inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      scope.replies = replies;
      elem = $compile('<replies replies="replies"></replies>')(scope);
      scope.$digest();
    });
    return new RepliesDriver(elem, scope);
  }

  getRepliesTitle(): string {
    return this.elem.find('h3').text();
  }

  getRepliesListLength(): number {
    return this.elem.find('.reply').length;
  }

  getReplyContentAt(i): string {
    return this.elem.find('.reply-content').eq(i).text();
  }

  getReplyUserEmailAt(i): string {
    return this.elem.find('.reply-user-email').eq(i).text().split(' ')[1];
  }

}
