import { NavLink } from "react-router-dom";

const navItems = [
    { label: "Search", to: "/" },
    { label: "Matches", to: null },
    { label: "Ranked", to: null },
];

function Sidebar() {
    return (
        <aside className="flex w-56 shrink-0 flex-col border-r border-green-500/10 bg-zinc-950/60 backdrop-blur-xl">
            <nav className="flex flex-col gap-1 p-4">
                <p className="mb-2 px-3 text-[10px] font-medium tracking-widest text-zinc-600 uppercase">
                    Menu
                </p>
                {navItems.map((item) =>
                    item.to ? (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            end
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-linear-to-r from-green-600/20 to-emerald-600/10 text-green-400 shadow-[inset_2px_0_0_0_rgba(74,222,128,0.8)]"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-green-300"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ) : (
                        <button
                            key={item.label}
                            type="button"
                            disabled
                            className="cursor-not-allowed rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-600 opacity-50"
                        >
                            {item.label}
                        </button>
                    )
                )}
            </nav>
        </aside>
    );
}

export default Sidebar;
