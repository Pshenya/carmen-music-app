import { forwardRef } from "react"
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  className,
  disabled,
  ...props
}, ref) => {
  return (
    <textarea
      className={twMerge(`flex w-full max-h-[180px] rounded-md bg-neutral-800/60 border border-transparent p-4 text-sm
                        text-white border-none focus:outline-primary transition-all duration-100
                          file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400
                          disabled:cursor-not-allowed disabled:opacity-50 focus:outline-1`, className)}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea';

export default Textarea;

