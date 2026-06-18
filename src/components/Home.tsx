import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Search from "./Search";
import Profile from "./Profile";

function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-black text-green-100">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="relative flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Search />} />
                        <Route path="/profile/:gameName/:tagLine" element={<Profile />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default Home;
