import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./components/page/RootLayout";
import MainPage from "./components/page/main/MainPage";
import ProjectPage from "./components/page/project/ProjectPage";
import DetailProject from "./components/page/project/DetailProject";
import { useModal, useTheme } from "./store";
import MainModal from "./components/page/modal/MainModal";
import ManageTag from "./components/page/additionalSetting/ManageTag";
import { useEffect } from "react";

function App() {
    const { modalName } = useModal();
    const { isDark } = useTheme();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    return (
        <BrowserRouter>
            <main className="relative h-screen w-screen bg-bg-primary">
                {modalName && <MainModal />}
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<MainPage />} />
                        <Route
                            path="/project/:projectId"
                            element={<ProjectPage />}
                        >
                            <Route
                                path="detail/:cardId"
                                element={<DetailProject />}
                            />
                        </Route>
                        <Route path="manage-tag" element={<ManageTag />} />
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
