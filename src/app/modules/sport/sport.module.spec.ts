import { SportModule } from './sport.module';

describe('SportModule', () => {
  let sportModule: SportModule;

  beforeEach(() => {
    sportModule = new SportModule();
  });

  it('should create an instance', () => {
    expect(sportModule).toBeTruthy();
  });
});
