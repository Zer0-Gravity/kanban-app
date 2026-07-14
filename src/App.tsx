import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./components/page/RootLayout";
import MainPage from "./components/page/main/MainPage";
import ProjectPage from "./components/page/project/ProjectPage";
import DetailProject from "./components/page/project/DetailProject";
import { useModal } from "./store";
import MainModal from "./components/page/modal/MainModal";

function App() {
    const { modalName } = useModal();
    return (
        <BrowserRouter>
            <main className="relative h-screen w-screen">
                {modalName && <MainModal />}
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path="/project" element={<ProjectPage />}>
                            <Route path="detail" element={<DetailProject />} />
                        </Route>
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
