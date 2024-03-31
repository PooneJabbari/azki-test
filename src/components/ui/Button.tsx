import type {
  ButtonHTMLAttributes,
  FC,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  "flex flex-row items-center py-2 px-10 gap-1 border border-transparent justify-center disabled:bg-neutral-100 self-center",
  {
    variants: {
      color: {
        primary:
          "bg-teal-500 border-teal-500 text-white rounded-full disabled:border-neutral-200 disabled:text-neutral-300",
        base: "bg-neutral-50 disabled:bg-neutral-100 border-neutral-500 border-lg text-neutral-900 disabled:text-neutral-300 rounded-lg",
      },
      variant: {
        outlined: "bg-transparent border text-teal-500",
        filled: "",
        content: "bg-transparent border-transparent p-0",
        icon: "bg-transparent border-transparent p-2",
      },
    },
    defaultVariants: {
      color: "primary",
      variant: "filled",
    },
  },
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonStyles> {
  isHidden?: boolean;
}

export const Button: FC<ButtonProps> = ({
  variant,
  color,
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
      className={twMerge(buttonStyles({ variant, color }), className)}
      {...props}
    >
      {children}
    </button>
  );
};
