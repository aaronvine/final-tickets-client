import ReplySubmitDriver from './reply-submit-driver';

describe('reply-submit directive', function () {

  beforeEach(function () {
    angular.mock.module('tickets');
  });

  it('should contain a relevant title', function () {
    let replySubmitDriver = ReplySubmitDriver.build('a1');
    expect(replySubmitDriver.getTitle()).toBe('Add a new Reply');
  });

  it('should contain a submit form', function () {
    let replySubmitDriver = ReplySubmitDriver.build('a1');
    expect(replySubmitDriver.getForm().length).toBeGreaterThan(0);
  });

  it('should contain 1 input and 1 textarea', function () {
    let replySubmitDriver = ReplySubmitDriver.build('a1');
    expect(replySubmitDriver.getInput().length).toBe(1);
    expect(replySubmitDriver.getTextarea().length).toBe(1);
  });

  it('should contain a submit button', function () {
    let replySubmitDriver = ReplySubmitDriver.build('a1');
    expect(replySubmitDriver.getButton().length).toBeGreaterThan(0);
  });

  it('should show a warning if the email is incorrect', function () {
    let replySubmitDriver = ReplySubmitDriver.build('a1');
    expect(replySubmitDriver.getUserEmailWarning()).toBe('Enter a valid email address.');
  });

});
