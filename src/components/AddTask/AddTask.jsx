import { useContext, useState } from "react";
import { ModalOpenCLose } from "../../contexts/ModalContext";
import { TaskDispatchContext, TaskUpdate } from "../../contexts/TaskContexts";
import { validation } from "../../utils/validation";
import { toast } from "react-toastify";

export default function AddTask() {
    const { updateTask, setUpdateTask } = useContext(TaskUpdate);

    const [task, setTask] = useState(
        updateTask || {
            id: crypto.randomUUID(),
            title: "",
            description: "",
            tags: [],
            priority: "",
            favourite: false,
        }
    );

    const addOrEdit = Object.is(updateTask, null);
    const { modal, setModal } = useContext(ModalOpenCLose);
    const dispatch = useContext(TaskDispatchContext);

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "tags") {
            value = value.split(",");
        }
        setTask({
            ...task,
            [name]: value,
        });
    }

    return (
        <>
            <div className=" bg-black bg-opacity-50 h-full w-full z-40 fixed top-0 left-0"></div>
            <form
                className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] 
            p-9 max-md:px-4 lg:my-20 lg:p-11 z-50 absolute top-1/4 left-1/4"
            >
                <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
                    {addOrEdit ? "Add New Task" : " Edit This Task"}
                </h2>

                <div className="space-y-9 text-white lg:space-y-10">
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="title">Title</label>
                        <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="title"
                            id="title"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                            type="text"
                            name="description"
                            id="description"
                            value={task.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="tags">Tags</label>
                            <input
                                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                                type="text"
                                name="tags"
                                id="tags"
                                value={task.tags}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="priority">Priority</label>
                            <select
                                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                                name="priority"
                                id="priority"
                                value={task.priority}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex justify-between lg:mt-20">
                    <button
                        className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
                        onClick={(e) => {
                            e.preventDefault();
                            setUpdateTask(null);
                            setModal(false);
                        }}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                        onClick={(e) => {
                            e.preventDefault();
                            validation(task, updateTask)
                                ? (dispatch({
                                      type: "addEdit",
                                      addOrEdit: addOrEdit,
                                      newTask: task,
                                  }),
                                  setModal(!modal),
                                  setUpdateTask(null),
                                  addOrEdit
                                      ? toast.success(
                                            `Task '${task.title}' Created!`
                                        )
                                      : toast.success(
                                            `Task '${task.title}' Updated!`
                                        ))
                                : addOrEdit
                                ? toast.warning(`Input all value!`)
                                : toast.warning(`Change any value!`);
                        }}
                    >
                        {addOrEdit ? "Create" : "Update"}
                    </button>
                </div>
            </form>
        </>
    );
}
