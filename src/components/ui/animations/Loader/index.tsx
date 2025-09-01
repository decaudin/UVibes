export default function Loader() {

    return (
        <div className="flex justify-center items-center">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-300 animate-sun-pulse shadow-xl" />
                <div className="absolute inset-0 rounded-full blur-xl bg-yellow-200 opacity-50 animate-sun-glow" />
                <div className="absolute inset-0 rounded-full blur-md bg-yellow-200 opacity-40 animate-sun-glow" />
            </div>
        </div>
    )
}