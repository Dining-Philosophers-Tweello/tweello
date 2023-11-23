export interface Workspace {
  _id: string;
  name: string;
  members: string[];
  creator: string;
  boards: Board[];
  updatedAt: string;
  createdAt: string;
}

export interface Board {
  _id: string;
  name: string;
  description: string;
  columns: Column[];
  updatedAt: string;
  createdAt: string;
}

export interface Column {
  _id: string;
  name: string;
  tasks: Task[];
  updatedAt: string;
  createdAt: string;
}

export interface Task {
  _id: string;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
}

export const nullWorkspace = {
  _id: "-1",
  name: "",
  members: [],
  creator: "",
  boards: [],
  updatedAt: "",
  createdAt: "",
};

export const nullBoard = {
  _id: "-1",
  name: "",
  description: "",
  columns: [],
  updatedAt: "",
  createdAt: "",
};

export const nullColumn = {
  _id: "-1",
  name: "",
  tasks: [],
  updatedAt: "",
  createdAt: "",
};

export const nullTask = {
  _id: "-1",
  name: "",
  description: "",
  updatedAt: "",
  createdAt: "",
};
