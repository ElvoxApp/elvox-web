const Input = ({
    type = "text",
    id,
    placeholder,
    defaultValue,
    register,
    errors,
    rules,
    className
}) => {
    return (
        <input
            type={type}
            id={id}
            defaultValue={defaultValue}
            className={`outline-none border-none bg-field-light dark:bg-field-dark  rounded-md w-full h-11 p-3 text-primary-light dark:text-primary-dark placeholder:text-secondary-light dark:placeholder:text-secondary-dark active:bg-field-light dark:active:bg-field-dark  ${className} ${
                type === "number" ? "appearance-none" : ""
            } ${
                errors?.[id]
                    ? "ring-2 shake ring-red-400"
                    : "focus:border-accent focus:ring-2 focus:ring-accent"
            }`}
            placeholder={placeholder}
            {...register(
                id,
                typeof rules === "function" ? { validate: rules } : rules
            )}
        />
    )
}
export default Input
