export const truncate = (text: string, lenght = 15) => {
  return text.length > lenght ? text.slice(0, lenght) + '...' : text;
};
