import { AppJobModule } from './app-job.module';

describe('AppJobModule', () => {
  let appJobModule: AppJobModule;

  beforeEach(() => {
    appJobModule = new AppJobModule();
  });

  it('should create an instance', () => {
    expect(appJobModule).toBeTruthy();
  });
});
