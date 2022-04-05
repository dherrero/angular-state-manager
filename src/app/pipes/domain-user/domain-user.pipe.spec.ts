import { DomainUserPipe } from './domain-user.pipe';

describe('DomainUserPipe', () => {
  const pipe = new DomainUserPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should remove de domain of the user name', () => {
    expect(pipe.transform('INTEGRATION\\pepito')).toBe('pepito');
  });

  it('should return nothing if recive nothing', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return the user name if not have domain', () => {
    expect(pipe.transform('pepito')).toBe('pepito');
  });
});
