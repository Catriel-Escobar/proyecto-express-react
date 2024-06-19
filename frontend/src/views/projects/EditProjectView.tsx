import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetProjectsById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
export default function EditProjectView() {
  const params = useParams();
  const projectId = params.projectId!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProjects", projectId],
    queryFn: () => GetProjectsById(projectId),
    retry: false, // cuantas veces intenta hacer la consulta.
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to={"/404"} />;
  if (data) return <EditProjectForm data={data} projectId={projectId} />;
}
