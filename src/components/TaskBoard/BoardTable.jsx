import TableRow from "./TableRow";
import TableTittle from "./TableTittle";
import EmptyTable from "./EmptyTable";
import { useContext } from "react";
import { SearchKey, TaskContext } from "../../contexts/TaskContexts";

export default function BoardTable() {
    const { search } = useContext(SearchKey);
    const tasks = useContext(TaskContext);
    const newTask = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="overflow-auto">
            <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                    <TableTittle />
                </thead>
                <tbody>
                    {newTask.map((task) => (
                        <TableRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
            {!tasks.length && <EmptyTable />}
        </div>
    );
}
