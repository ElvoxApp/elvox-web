import * as Switch from "@radix-ui/react-switch"

const Toggle = ({ checked, onChange, disabled = false, className = "" }) => {
    return (
        <Switch.Root
            checked={checked}
            onCheckedChange={onChange}
            disabled={disabled}
            className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        bg-field-light dark:bg-field-dark transition-colors
        data-[state=checked]:bg-field-light dark:data-[state=checked]:bg-field-dark
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        ${className}
      `}
        >
            <Switch.Thumb
                className='
          block h-5 w-5 rounded-full bg-[#8b8b96] dark:bg-[#5c5e63] data-[state=checked]:bg-[#ab8cff] transition-transform
          data-[state=checked]:translate-x-6
        '
            />
        </Switch.Root>
    )
}

export default Toggle
