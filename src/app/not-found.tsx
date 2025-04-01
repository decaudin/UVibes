import Link from "next/link";

export default function NotFound() {

    return (
        <div className="text-center mb-20">
            <h1 className="text-[150px] text-sky-500 xxs:text-[200px]">404</h1>
            <p className="text-6xl">Oups ... </p>
            <p className="text-2xl mt-12 mb-16">Il semblerait que la page que vous cherchez n’existe pas.</p>
            <Link href="/" className="border border-gray-400 text-black px-8 py-3 bg-gray-200 rounded-xl shadow hover:bg-gray-300">Retourner sur la page d’accueil</Link>
        </div>
    )
}