import { forwardRef } from "react"
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type,
  disabled,
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={twMerge(`flex w-full rounded-md bg-neutral-800/60 border border-transparent p-4 text-sm
                          text-white border-none focus:outline-primary
                          file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400
                          disabled:cursor-not-allowed disabled:opacity-50 focus:outline-1 hover:bg-neutral-700/60 transition-all duration-500 cursor-pointer`, className)}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input';

export default Input

