import { useContext } from "react";
import SearchForm from "./SearchForm";
import { ModalOpenCLose } from "../../contexts/ModalContext";
import { TaskDispatchContext } from "../../contexts/TaskContexts";
import { toast } from "react-toastify";

export default function BoardHead({ onsearch }) {
    const { modal, setModal } = useContext(ModalOpenCLose);
    const dispatch = useContext(TaskDispatchContext);
    return (
        <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <div className="flex items-center space-x-5">
                <SearchForm onsearch={onsearch} />
                <button
                    className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                    onClick={() => setModal(!modal)}
                >
                    Add Task
                </button>
                <button
                    className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
                    onClick={() => {
                        confirm("Are you sure you want to delete all tasks?") &&
                            (dispatch({
                                type: "deleteAll",
                            }),
                            toast.error("All Task Gone!"));
                    }}
                >
                    Delete All
                </button>
            </div>
        </div>
    );
}
