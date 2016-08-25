import { AngularHnPage } from './app.po';

describe('angular-hn App', function() {
  let page: AngularHnPage;

  beforeEach(() => {
    page = new AngularHnPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
