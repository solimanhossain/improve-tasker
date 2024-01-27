import { useState } from "react";
import AddTask from "./AddTask/AddTask";
import BoardHead from "./TaskBoard/BoardHead";
import BoardTable from "./TaskBoard/BoardTable";
import TasksProvider from "../contexts/TaskContexts";
import { ModalOpenCLose } from "../contexts/ModalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskBoard() {
    const [modal, setModal] = useState(false);

    return (
        <ModalOpenCLose.Provider value={{ modal, setModal }}>
            <TasksProvider>
                <ToastContainer />
                <section className="mb-20" id="tasks">
                    {modal && <AddTask />}
                    <div className="container">
                        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                            <BoardHead />
                            <BoardTable />
                        </div>
                    </div>
                </section>
            </TasksProvider>
        </ModalOpenCLose.Provider>
    );
}
