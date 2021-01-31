const replaceAll = (
  str: string,
  replace: string,
  replacement: string
): string => {
  const replaceRegex = new RegExp(replace, 'g');
  return str.replace(replaceRegex, replacement);
};

export default replaceAll;
