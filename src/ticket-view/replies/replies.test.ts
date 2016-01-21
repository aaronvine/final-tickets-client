import Generator from '../../common/generator';
import RepliesDriver from './replies-driver';

describe('replies directive', function () {

  beforeEach(function() {
    angular.mock.module('tickets');
  });

  it('should render the title based on the given title', function () {
    let replies = Generator.generateRandomRepliesList();
    let length = replies.length;
    let repliesDriver = RepliesDriver.build(replies);
    expect(repliesDriver.getRepliesTitle()).toBe('Replies');
  });

  it('should show the correct amount of replies', function () {
    let replies = Generator.generateRandomRepliesList();
    let length = replies.length;
    let repliesDriver = RepliesDriver.build(replies);
    expect(repliesDriver.getRepliesListLength()).toBe(length);
  });

  it('should render the replies user email based on the given list of replies', function () {
    let replies = Generator.generateRandomRepliesList();
    let repliesDriver = RepliesDriver.build(replies);
    expect(repliesDriver.getReplyUserEmailAt(2)).toEqual(replies[2].getReplyUserEmail());
  });

  it('should render the replies content based on the given list of replies', function () {
    let replies = Generator.generateRandomRepliesList();
    let repliesDriver = RepliesDriver.build(replies);
    expect(repliesDriver.getReplyContentAt(1)).toEqual(replies[1].getReplyContent());
  });

});
