import { FcDeleteDatabase } from "react-icons/fc";

export default function EmptyTable() {
    return (
        <div className="grid border-b border-[#2E3443] justify-items-center p-6">
            <FcDeleteDatabase size={48} />
            <h2 className="text-center text-3xl">Task List is empty!</h2>
        </div>
    );
}
