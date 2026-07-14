import { useModal } from "../../../store";
import NewBoard from "./submodal/NewBoard";
import NewCard from "./submodal/NewCard";
import NewProject from "./submodal/NewProject";
import NewTask from "./submodal/NewTask";

function MainModal() {
    const { modalName } = useModal();

    return (
        <main className="absolute inset-0 bg-black/50 z-50 flex justify-center items-center">
            {modalName === "new-project" && <NewProject />}
            {modalName === "new-card" && <NewCard />}
            {modalName === "new-board" && <NewBoard />}
            {modalName === "new-task" && <NewTask />}
        </main>
    );
}

export default MainModal;
