import { type FC, ComponentProps } from "react";
import { Box } from "./Box";
import { twMerge } from "tailwind-merge";

type TextProps = ComponentProps<"p">;

export const Text: FC<TextProps> = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};

export const Title: FC<TextProps> = ({ children, className }) => {
  return (
    <Box
      className={twMerge(
        "relative flex h-min flex-col justify-center",
        className,
      )}
    >
      <Text className="absolute left-1/2 -translate-x-1/2 justify-center whitespace-nowrap text-8xl font-bold text-primary-700 opacity-10">
        {children}
      </Text>
      <Text className="text-5xl font-bold text-base-50">{children}</Text>
    </Box>
  );
};
