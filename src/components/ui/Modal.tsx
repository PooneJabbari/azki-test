import { Fragment, useRef, type FC, type PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const modalStyles = cva(
  "relative transform rounded-lg bg-white text-left shadow-xl transition-all",
  {
    variants: {
      size: {
        sm: "md:w-96 sm:w-80 w-72",
        md: "2xl:w-1/2 md:3/4 sm:w-4/5 w-96",
        lg: "w-full",
      },
      defaultVariants: {
        size: "sm",
      },
    },
  },
);

type HeaderProps = {
  title?: string | undefined;
  cancelable?: boolean | undefined;
};

const ModalHeader: FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-end border-b-2 px-8 py-2 text-teal-500">
      <p className="text-lg font-medium">{title}</p>
    </div>
  );
};

type Props = {
  isOpen: boolean;
  className?: string | undefined;
  onClose: () => void;
} & HeaderProps &
  VariantProps<typeof modalStyles>;

export const Modal: FC<PropsWithChildren<Props>> = ({
  title,
  isOpen,
  className,
  cancelable = true,
  onClose,
  children,
  size,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={twMerge("relative z-[10000]", className)}
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={modalStyles({ size })}>
                <ModalHeader title={title} cancelable={cancelable} />
                <div className="px-2 py-5 md:px-8">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
