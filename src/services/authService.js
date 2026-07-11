import api from "./api";

export const registerUser = async (userData) => {
  const existing = await api.get(`/users?email=${userData.email}`);
  if (existing.data.length > 0) {
    throw new Error("Email already registered");
  }
  const newUser = { ...userData, role: "customer" };
  const res = await api.post("/users", newUser);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.get(`/users?email=${email}&password=${password}`);
  if (res.data.length === 0) {
    throw new Error("Invalid email or password");
  }
  return res.data[0];
};

export const updateUser = async (id, updates) => {
  const res = await api.patch(`/users/${id}`, updates);
  return res.data;
};
