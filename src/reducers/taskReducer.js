export default function tasksReducer(tasks, action) {
    switch (action.type) {
        case "addEdit": {
            if (action.addOrEdit) {
                return [...tasks, action.newTask];
            } else {
                return tasks.map((task) => {
                    if (task.id === action.newTask.id) {
                        return action.newTask;
                    }
                    return task;
                });
            }
        }
        case "delete": {
            return tasks.filter((t) => t.id != action.taskId);
        }
        case "deleteAll": {
            return [];
        }
        case "fav": {
            const newt = { ...action.t, favourite: !action.t.favourite };
            return tasks.map((task) => {
                if (task.id === action.t.id) {
                    return newt;
                }
                return task;
            });
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
}
