import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  FC,
  PropsWithChildren,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputStyles = cva("block w-full text-right", {
  variants: {
    trailing: {
      true: "pr-9",
    },
    variant: {
      default:
        "rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-teal-500 focus:outline-none focus:ring-primary-500 text-xs sm:text-sm disabled:ring-gray-300 disabled:text-gray-500",
      search:
        "rounded-full border-0 px-4 py-1.5 text-gray-700 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
    },
  },
  defaultVariants: {
    trailing: false,
    variant: "default",
  },
});

type Props = InputHTMLAttributes<HTMLInputElement> &
  Omit<VariantProps<typeof inputStyles>, "trailing"> & {
    trailing?: ReactNode | undefined;
    error?: string;
  };

export const Input: FC<Props> = ({
  trailing,
  variant,
  error,
  className,
  ...props
}) => {
  return (
    <div className={twMerge("space-y-1", className)}>
      <div className="relative rounded-md shadow-sm">
        <input
          {...props}
          className={inputStyles({
            trailing: !!trailing,
            variant,
          })}
        />

        {trailing && <Trailing>{trailing}</Trailing>}
      </div>
      <p className="text-right text-xs text-red-400">{error}</p>
    </div>
  );
};

export const Trailing: FC<PropsWithChildren<{ isHidden?: boolean }>> = ({
  children,
  isHidden,
}) => {
  if (isHidden) {
    return null;
  }
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <span className="text-gray-500 sm:text-sm">{children}</span>
    </div>
  );
};
