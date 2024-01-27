import { createContext, useReducer, useState } from "react";
import tasksReducer from "../reducers/taskReducer";

export const TaskContext = createContext(null);
export const TaskDispatchContext = createContext(null);
export const TaskUpdate = createContext(null);
export const SearchKey = createContext();

export default function TasksProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, [
        {
            id: crypto.randomUUID(),
            title: "Integration API",
            description:
                "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
            tags: ["Python", "API", "Backend", "Data"],
            priority: "High",
            favourite: true,
        },
    ]);

    const [updateTask, setUpdateTask] = useState(null);
    const [search, setSearch] = useState("");

    return (
        <TaskUpdate.Provider value={{ updateTask, setUpdateTask }}>
            <SearchKey.Provider value={{ search, setSearch }}>
                <TaskContext.Provider value={tasks}>
                    <TaskDispatchContext.Provider value={dispatch}>
                        {children}
                    </TaskDispatchContext.Provider>
                </TaskContext.Provider>
            </SearchKey.Provider>
        </TaskUpdate.Provider>
    );
}
