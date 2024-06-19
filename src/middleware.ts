import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './navigation';


export default createMiddleware({
  // A list of all locales that are supported
  locales,
  localePrefix,
  // Used when no locale matches
  defaultLocale: 'uz'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(uz|en|ru)/:path*']
};