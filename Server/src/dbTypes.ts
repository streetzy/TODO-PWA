export type User = {
  username: string;
  email: string;
  password: string;
  groups: Group[] | null;
  inviteList: Invite[] | null;
};

export type Group = {
  todos: Todo[];
  groupName: string;
  invitedUsers: User[] | null;
  owner: User;
  admins: User[] | null;
  members: User[] | null;
};

export type Todo = {
  todoName: string;
  status: string;
  todoContent: string;
  authorId: User;
  deadline: Date | null;
  group: Group | null;
};

export type Invite = {
  invited: User;
  group: Group;
};
