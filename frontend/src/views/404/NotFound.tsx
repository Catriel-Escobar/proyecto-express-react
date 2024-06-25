import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h2 className="font-black text-center text-4xl text-white">
        Pagina no encontrada
      </h2>
      <p className="text-center mt-10 text-white">
        Volver a{" "}
        <Link to={"/"} className="text-fuchsia-500">
          Inicio
        </Link>
      </p>
    </>
  );
}
