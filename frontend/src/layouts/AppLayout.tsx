import { Link, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
("react-toastify");
import "react-toastify/ReactToastify.css";
import Logo from "../components/Logo";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  console.log(data);
  console.log(isError);
  console.log(isLoading);

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to={"/auth/login"} />;
  if (data)
    return (
      <>
        <header className="bg-gray-800 py-5">
          <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="w-64">
              <Link to={"/"}>
                <Logo />
              </Link>
            </div>
            <NavMenu nombre={data.name} />
          </div>
        </header>
        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
        </section>

        <footer className="py5">
          <p className="text-center">
            Todos los derecheos reservados {new Date().getFullYear()}
          </p>
        </footer>
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          closeOnClick={true}
          limit={1000}
        />
      </>
    );
}
