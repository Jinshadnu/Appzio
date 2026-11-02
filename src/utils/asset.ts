/// <reference types="vite/client" />

/**
 * Asset URL helper to resolve paths correctly in all deployment environments
 * (GitHub Pages subpaths, custom domains, or root deployments)
 */
export const getAssetUrl = (path: string | undefined | null): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = (import.meta as any).env?.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${cleanPath}`;
};
