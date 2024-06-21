import { addUserToProject } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
  user: TeamMember;
  resetData: () => void;
};

export default function SearchResult({ user, resetData }: SearchResultProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data: { message: string }) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
      resetData();
      navigate(location.pathname, { replace: true });
    },
  });
  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id,
    };
    mutate(data);
  };
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between items-center">
        <p className="font-semibold">{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUserToProject}>
          Agregar al Proyecto
        </button>
      </div>
    </>
  );
}
