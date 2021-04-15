export const escapePath = (path: string): string => {
  return path.replace(/\//g, '_');
};
