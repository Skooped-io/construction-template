import staticConfig from '../../siteConfig.json';

const API_URL = import.meta.env.VITE_CONFIG_API_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export const seoConfig = staticConfig;

export async function loadDynamicConfig() {
  if (!API_URL || !CLIENT_ID) return null;
  try {
    const res = await fetch(`${API_URL}/api/site/${CLIENT_ID}/dynamic`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function getImage(dynamicConfig: any, slot: string, fallback: string): string {
  return dynamicConfig?.images?.[slot]?.url || fallback;
}

export function getPrimaryColor(dynamicConfig: any): string {
  return dynamicConfig?.branding?.primaryColor || staticConfig.branding?.primaryColor || '#C8933A';
}
