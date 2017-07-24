import { JsjobPage } from './app.po';

describe('jsjob App', () => {
  let page: JsjobPage;

  beforeEach(() => {
    page = new JsjobPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
