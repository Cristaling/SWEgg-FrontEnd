import { AppJobsModule } from './app-jobs.module';

describe('AppJobsModule', () => {
  let appJobsModule: AppJobsModule;

  beforeEach(() => {
    appJobsModule = new AppJobsModule();
  });

  it('should create an instance', () => {
    expect(appJobsModule).toBeTruthy();
  });
});
