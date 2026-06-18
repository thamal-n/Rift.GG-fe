function Header() {
    return (
        <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-green-500/10 bg-zinc-950/80 px-6 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-green-500/40 to-transparent" />
            <div className="flex items-center gap-3">
                <img
                    src="/app-icon.jpg"
                    alt="Rift.GG"
                    className="h-8 w-8 rounded-lg object-cover shadow-lg shadow-green-900/50"
                />
                <span className="bg-linear-to-r from-green-300 to-emerald-500 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
                    Rift.GG
                </span>
            </div>
            <p className="text-xs tracking-widest text-zinc-600 uppercase">League of Legends</p>
        </header>
    );
}

export default Header;
