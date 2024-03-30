import BaseLink from "next/link";
import { type FC, ComponentProps } from "react";

type LinkProps = ComponentProps<typeof BaseLink>;

export const Link: FC<LinkProps> = ({ children, ...props }) => {
  return <BaseLink {...props}>{children}</BaseLink>;
};
