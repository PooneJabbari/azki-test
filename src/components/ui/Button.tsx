import type { ButtonHTMLAttributes, FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  "flex flex-row items-center py-2 px-12 gap-1 border border-transparent justify-center disabled:bg-gray-300 rounded-full self-center bg-teal-500 border-teal-500",
  {
    variants: {
      variant: {
        outlined: "bg-transparent border",
        filled: "text-white border-transparent",
        content: "bg-transparent border-transparent p-0",
        icon: "bg-transparent border-transparent p-2",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  },
);

const filledButtonTextStyles = cva("text-md font-medium text-white");

const defaultButtonTextStyles = cva("text-md font-medium text-primary-500");

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonStyles> {
  isActive?: boolean;
  isHidden?: boolean;
}

export const Button: FC<ButtonProps> = ({
  isActive,
  variant,
  className,
  isHidden,
  children,
  ...props
}) => {
  if (isHidden) {
    return null;
  }

  return (
    <button
      className={twMerge(buttonStyles({ variant }), className)}
      {...props}
    >
      {children ? (
        <div
          className={
            !variant || variant === "filled"
              ? filledButtonTextStyles()
              : defaultButtonTextStyles()
          }
        >
          {children}
        </div>
      ) : null}
    </button>
  );
};
