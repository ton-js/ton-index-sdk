
/**
 * These values are getting injected during the build.
 */
declare global {
  const PACKAGE_NAME: string;
  const PACKAGE_VERSION: string;
}

export const userAgent = (
  PACKAGE_NAME + '/' +
  PACKAGE_VERSION
);
