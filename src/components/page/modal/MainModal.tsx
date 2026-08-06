import Alert from "./Alert";
import NewBoard from "./submodal/NewBoard";
import NewCard from "./submodal/NewCard";
import NewCollections from "./submodal/NewCollections";
import NewProject from "./submodal/NewProject";
import NewTag from "./submodal/NewTag";
import NewTask from "./submodal/NewTask";

function MainModal() {
    return (
        <>
            <NewProject />
            <NewCard />
            <NewBoard />
            <NewTask />
            <NewCollections />
            <NewTag />
            <Alert />
        </>
    );
}

export default MainModal;
