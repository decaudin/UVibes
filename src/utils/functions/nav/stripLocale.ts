export function stripLocaleFromPath(pathname: string): string {
    return pathname.replace(/^\/(fr|en)(\/|$)/, '/');
}