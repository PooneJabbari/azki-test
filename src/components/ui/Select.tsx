import { Fragment, type FC, type ReactNode } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { ArrowIcon } from ".";

type SelectProps<T> = {
  className?: string | undefined;
  title: string;
  options: Option<T>[];
} & (
  | {
      multiple?: true;
      value?: T[] | undefined;
      onChange?: (value: T[]) => void;
    }
  | {
      multiple?: false | undefined;
      value?: T | undefined;
      onChange?: (value: T) => void;
    }
);

const optionDetailStyles = cva("block truncate", {
  variants: {
    selected: {
      true: "font-semibold",
      false: "font-normal",
    },
  },
});

const optionDetailArrowStyles = cva(
  "absolute inset-y-0 right-0 flex items-center pr-4",
  {
    variants: {
      active: {
        true: "text-white",
        false: "text-teal-600",
      },
    },
  },
);

interface OptionDetailProps
  extends VariantProps<typeof optionDetailStyles>,
    VariantProps<typeof optionDetailArrowStyles> {
  value: ReactNode;
}

const OptionDetail: FC<OptionDetailProps> = ({ selected, active, value }) => {
  return <span className={optionDetailStyles({ selected })}>{value}</span>;
};

const optionStyles = cva("relative cursor-default select-none py-2 pl-3 pr-9", {
  variants: {
    active: {
      true: "bg-teal-600 text-white",
      false: "text-neutral-900",
    },
  },
});

type ListboxButtonProps<T> = {
  title: string;
  value: T | T[] | undefined;
  options: Option<T>[];
};

function ListboxButton<T>({ options, value, title }: ListboxButtonProps<T>) {
  const selectedOptions = getSelectedOptions(options, value);
  const text = getSelectedOptionsText(selectedOptions);
  return (
    <Listbox.Button className="relative h-10 w-full cursor-default rounded-md border border-neutral-300 py-2 pl-10 pr-3 text-left shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
        <ArrowIcon
          className="w-2 -rotate-90 text-neutral-500"
          aria-hidden="true"
        />
      </span>
      {text ? (
        <span className="block truncate text-right">{text}</span>
      ) : (
        <span className="block text-right text-neutral-400">{title}</span>
      )}
    </Listbox.Button>
  );
}

export function Select<T>({
  options,
  multiple,
  value,
  onChange,
  className,
  title,
}: SelectProps<T>) {
  return (
    <Listbox value={value} onChange={onChange} multiple={multiple}>
      {({ open }) => (
        <div className={twMerge("relative", className)}>
          <ListboxButton options={options} value={value} title={title} />

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-end text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={String(option.value)}
                  className={({ active }) => optionStyles({ active })}
                  value={option.value}
                >
                  {({ selected, active }) => (
                    <OptionDetail
                      selected={selected}
                      active={active}
                      value={option.label}
                    />
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

export type Option<T> = {
  label: ReactNode;
  value: T;
};

export function getSelectedOptions<T>(
  options: Option<T>[],
  value: undefined | T | T[],
) {
  return Array.isArray(value)
    ? options.filter((option) => value?.includes(option.value))
    : options.find((option) => option.value === value);
}

export function getSelectedOptionsText<T>(
  selectedOptions: undefined | Option<T> | Option<T>[],
) {
  if (!selectedOptions) {
    return undefined;
  }
  return Array.isArray(selectedOptions)
    ? selectedOptions.map((option) => option.label).join(", ")
    : selectedOptions.label;
}
