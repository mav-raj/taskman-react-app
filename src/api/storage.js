const KEY = "userToken";

export const saveUser = (user, token) => {
  if (getUser()) {
    return;
  }
  localStorage.setItem(KEY, JSON.stringify({ user, token }));
};

export const deleteUser = () => {
  localStorage.removeItem(KEY);
};

export const getUser = () => {
  const user = localStorage.getItem(KEY); // returns {userId: "someId", token: someToken}
  if (!user) {
    return false;
  }
  return JSON.parse(user);
};

export const getAuthToken = () => {
  const token = localStorage.getItem(KEY)
    ? JSON.parse(localStorage.getItem(KEY)).token
    : "";
  return token;
};
