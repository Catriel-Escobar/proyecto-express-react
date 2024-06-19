import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { TaskFormData } from "@/types/index";
import { createTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

type RespSucces = {
  message: string;
};

export default function AddTaskModal() {
  const initialValues: TaskFormData = {
    name: "",
    description: "",
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  /** SI MODAL EXISTE */
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const show = queryParams.get("newTask") ? true : false;

  /** OBTENER PROJECTID */
  const params = useParams();
  const projectId = params.projectId!;
  //! REACT-QUERY
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data: RespSucces) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success(data.message);
      reset();
      navigate(location.pathname, { replace: true }); //
    },
  });

  const handleCreateTask = async (taskForm: TaskFormData) => {
    const data = { taskForm, projectId };
    await mutateAsync(data);
  };
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                    <form
                      className="mt-10 space-y-3"
                      onSubmit={handleSubmit(handleCreateTask)}
                    >
                      <TaskForm errors={errors} register={register} />
                      <input
                        type="submit"
                        value={"Guardar Tarea"}
                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                      />
                    </form>
                  </p>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
