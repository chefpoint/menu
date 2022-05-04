// GET from local storage
const get = async (key) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }
};

// SAVE in local storage
const set = async (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export default {
  get,
  set,
};
