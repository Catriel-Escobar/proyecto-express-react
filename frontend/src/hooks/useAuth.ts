import { getUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false, // false o 1
    refetchOnWindowFocus: false, // cuando salis y volves a la pestana esto volveria a hacer la peticion.
  });

  return { data, isError, isLoading };
};
