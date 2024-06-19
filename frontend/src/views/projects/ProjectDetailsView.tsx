import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetProjectsById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const params = useParams();
  const { projectId } = params;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => GetProjectsById(projectId!),
    retry: false, // cuantas veces intenta hacer la consulta.
  });
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to={"/404"} />;
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {" "}
          {data.description}
        </p>
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            onClick={() => navigate(`${location.pathname}?newTask=true`)}
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Agregar Tarea
          </button>
        </nav>
        <TaskList tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}