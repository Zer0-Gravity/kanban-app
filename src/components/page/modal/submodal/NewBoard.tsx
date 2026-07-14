import { useForm } from "react-hook-form";
import HeaderModal from "../../utilityComponent/HeaderModal";

function NewBoard() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const handleNewBoard = (formData: FormData) => {
        console.log(formData);
    };

    return (
        <main className="bg-white">
            <HeaderModal title="New Board" />

            <form onSubmit={handleSubmit(handleNewBoard)}>
                <div>
                    <label htmlFor="title">Board Title</label>
                    <input
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />
                    {errors.title && (
                        <span>{errors.title.message as string}</span>
                    )}
                </div>

                <div>
                    <label htmlFor="color">Pick Color</label>
                    <input type="color" {...register("color")} />
                </div>

                <button type="submit">Create</button>
            </form>
        </main>
    );
}

export default NewBoard;
