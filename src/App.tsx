import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./components/page/RootLayout";
import MainPage from "./components/page/main/MainPage";
import ProjectPage from "./components/page/project/ProjectPage";
import DetailProject from "./components/page/project/DetailProject";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="/project" element={<ProjectPage />}>
                        <Route path="detail" element={<DetailProject />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
