import robots from '@/app/robots';
import { ngoDetails } from '@/config';

describe('robots.ts', () => {
  it('should return correct robots metadata', () => {
    const result = robots();

    expect(result).toHaveProperty('rules');
    expect(result.rules).toEqual({
      userAgent: '*',
      allow: '/',
    });

    expect(result).toHaveProperty('sitemap', `${ngoDetails.contact.website}/sitemap.xml`);
    expect(result).toHaveProperty('host', ngoDetails.contact.website);
  });
});
