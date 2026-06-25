export const UserRolesEnum = {
  // Enum data type
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};
// We have exported this so that whole object is passed onto wherever it is required

export const AvailableUserRole = Object.values(UserRolesEnum);
// Above line returns an array of values of the enumerable own properties of an object

// Here what we are doing

// In userrolesenum: we are sending the whole object as once
// And in below we are sending an array will contain admin projectadmin and member in the array format also enumberable which we can loop through
// And it is not key it's the value which is passed on

export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

export const AvailableTaskStatuses = Object.values(TaskStatusEnum);
// We are exporting both the object and array if someone wants to loop through
