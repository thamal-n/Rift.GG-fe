type KdaDisplayProps = {
    kda: string;
    className?: string;
};

function KdaDisplay({
    kda,
    className = "text-base font-medium text-green-100",
}: KdaDisplayProps) {
    return (
        <span className={className}>
            {kda.split("/").map((value, index) => (
                <span key={index}>
                    {index > 0 && (
                        <span className="mx-1 font-normal text-zinc-600">/</span>
                    )}
                    {index === 1 ? (
                        <span className="text-[0.97em]">{value}</span>
                    ) : (
                        value
                    )}
                </span>
            ))}
        </span>
    );
}

export default KdaDisplay;
