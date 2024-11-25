export type Status = "active" | "inactive" | "suspended";
export type Permission = {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};
export type Role = {
  _id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  status: Status;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
};
