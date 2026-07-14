import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useModal } from "../../../../store";

function NewProject() {
    const { closeModal } = useModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleNewProject = (e) => {
        e.preventDefault();
    };

    return (
        <main className="bg-white">
            <header>
                <h1>Create Project</h1>
                <button onClick={closeModal}>
                    <X />
                </button>
            </header>

            <form onSubmit={handleSubmit(handleNewProject)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        {...register("title", {
                            required: "Project name is required",
                        })}
                    />
                    {errors.title && (
                        <span>{errors.title.message as string}</span>
                    )}
                </div>
                <button type="submit">Create</button>
            </form>
        </main>
    );
}

export default NewProject;
