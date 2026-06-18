type DdragonIconProps = {
    src?: string;
    alt?: string;
    className?: string;
};

function DdragonIcon({ src, alt = "", className = "" }: DdragonIconProps) {
    if (!src) {
        return (
            <div
                className={`rounded border border-white/10 bg-zinc-900/80 ${className}`}
                aria-hidden="true"
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`rounded border border-white/10 object-cover ${className}`}
        />
    );
}

export default DdragonIcon;
