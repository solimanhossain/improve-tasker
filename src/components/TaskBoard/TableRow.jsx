import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { TaskDispatchContext, TaskUpdate } from "../../contexts/TaskContexts";
import { ModalOpenCLose } from "../../contexts/ModalContext";
import { toast } from "react-toastify";

function Tag({ tag }) {
    let clr = `bg-blue-600`;
    if (3 >= tag.length) clr = `bg-green-600`;
    else if (6 <= tag.length) clr = `bg-red-600`;

    return (
        <li>
            <span
                className={`${clr} inline-block h-5 whitespace-nowrap rounded-[45px] z-10 px-2.5 text-sm capitalize text-[#F4F5F6]`}
            >
                {tag}
            </span>
        </li>
    );
}

export default function TableRow({ task }) {
    const { setUpdateTask } = useContext(TaskUpdate);
    const dispatch = useContext(TaskDispatchContext);
    const { modal, setModal } = useContext(ModalOpenCLose);
    return (
        <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
            <td>
                <button
                    onClick={() =>
                        dispatch({
                            type: "fav",
                            t: task,
                        })
                    }
                >
                    {task.favourite ? (
                        <FaStar color="yellow" />
                    ) : (
                        <FaStar color="gray" />
                    )}
                </button>
            </td>
            <td>{task.title}</td>
            <td>
                <div>{task.description}</div>
            </td>
            <td>
                <ul className="flex justify-center gap-1.5 flex-wrap">
                    {task.tags.map((t, i) => (
                        <Tag key={i} tag={t} />
                    ))}
                </ul>
            </td>
            <td className="text-center">{task.priority}</td>
            <td>
                <div className="flex items-center justify-center space-x-3">
                    <button
                        className="text-red-500"
                        onClick={() => {
                            confirm(
                                "Are you sure you want to delete this task?"
                            ) &&
                                (dispatch({
                                    type: "delete",
                                    taskId: task.id,
                                }),
                                toast.error(`Task "${task.title}" Deleted!`));
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="text-blue-500"
                        onClick={() => {
                            setUpdateTask(task);
                            setModal(!modal);
                            dispatch({
                                type: "addEdit",
                                newTask: task,
                            });
                        }}
                    >
                        Edit
                    </button>
                </div>
            </td>
        </tr>
    );
}
