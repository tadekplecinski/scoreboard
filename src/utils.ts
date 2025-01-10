export const generateId = (length = 8): string => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 16).toString(16);
  }
  return result;
};

export const wait = (time = 100) =>
  new Promise((resolve) => setTimeout(resolve, time));
