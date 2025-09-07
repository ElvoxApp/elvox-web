// ReusableInput.jsx
const Input = ({
    type = "text",
    id,
    placeholder,
    defaultValue,
    register,
    errors,
    rules
}) => {
    return (
        <input
            type={type}
            id={id}
            defaultValue={defaultValue}
            className={`outline-none border-none bg-field rounded-md w-full h-11 p-3 text-primary placeholder:text-secondary active:bg-field ${
                type === "number" ? "appearance-none" : ""
            } ${
                !errors?.[id]
                    ? "focus:border-accent focus:ring-2 focus:ring-accent"
                    : ""
            } ${errors?.[id] ? "ring-2 ring-red-400" : ""}`}
            placeholder={placeholder}
            {...register(
                id,
                typeof rules === "function" ? { validate: rules } : rules
            )}
        />
    )
}
export default Input
//{...register("eop", { validate: validateEmailOrPhone })}
