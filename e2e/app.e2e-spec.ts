import { Test01Page } from './app.po';

describe('test01 App', () => {
  let page: Test01Page;

  beforeEach(() => {
    page = new Test01Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
