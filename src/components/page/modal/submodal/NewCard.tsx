import { useForm } from "react-hook-form";
import HeaderModal from "../../utilityComponent/HeaderModal";

function NewCard() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleNewCard = (e) => {
        e.preventDefault();
    };

    return (
        <main className="bg-white">
            <HeaderModal title="New Card" />

            <form onSubmit={handleSubmit(handleNewCard)}>
                {/* Card Title */}

                <div>
                    <label htmlFor="title">Card Title</label>
                    <input
                        {...register("title", {
                            required: "Card title is required",
                        })}
                    />
                    {errors.title && (
                        <span>{errors.title.message as string}</span>
                    )}
                </div>

                {/* Tag */}
                <select>
                    <option value="tech">Tech</option>
                    <option value="food">Food</option>
                </select>

                {/* Description */}
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea {...register("description")} />
                </div>

                {/* Deadline Date */}
                <div>
                    <label htmlFor="date">Deadline</label>
                    <input type="date" {...register("date")} />
                </div>

                <button type="submit">Create</button>
            </form>
        </main>
    );
}

export default NewCard;
