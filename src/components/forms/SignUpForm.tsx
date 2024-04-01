import { FC } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../ui";

const phoneRegex = new RegExp("0?9[0-9]{9}$");
const farsiRegex = new RegExp("^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$");
const lowerRegex = new RegExp("(?=.*[a-z])");
const upperRegex = new RegExp("(?=.*[A-Z])");

const formSchema = z.object({
  fName: z
    .string()
    .min(1, "نام خود را وارد کنید.")
    .regex(farsiRegex, "فقط از حروف فارسی استفاده کنید."),
  lName: z
    .string()
    .min(1, "نام خانوادگی خود را وارد کنید.")
    .regex(farsiRegex, "فقط از حروف فارسی استفاده کنید."),
  phone: z
    .string()
    .min(1, "شماره موبایل خود را وارد کنید.")
    .regex(phoneRegex, "شماره موبایل خود را به درستی وارد کنید."),
  password: z
    .string()
    .min(1, "رمز عبور خود را وارد کنید.")
    .min(4, "رمز طولانی‌تری انتخاب کنید")
    .max(10, "رمز کوتاه‌تری انتخاب کنید")
    .regex(lowerRegex, "رمز عبور باید حداقل یک حرف لاتین کوچک داشته باشد.")
    .regex(upperRegex, "رمز عبور باید حداقل یک حرف لاتین بزرگ داشته باشد."),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onSubmit: SubmitHandler<FormSchema>;
};

export const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: { fName: "", lName: "", phone: "", password: "" },
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rtl-grid grid grid-cols-2 grid-rows-4 gap-x-4 gap-y-3 sm:grid-rows-3 sm:gap-y-6">
        <Controller
          control={control}
          name="fName"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="col-span-2 md:col-span-1"
                type="text"
                placeholder="نام"
                error={errors.fName?.message}
                value={value}
                onChange={onChange}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="lName"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="col-span-2 row-start-2 md:col-span-1 md:row-span-1"
                type="text"
                placeholder="نام خانوادگی"
                error={errors.lName?.message}
                value={value}
                onChange={onChange}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="col-span-2 row-start-3 md:row-start-2"
                placeholder="شماره موبایل"
                error={errors.phone?.message}
                value={value}
                onChange={onChange}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="col-span-2 row-start-4 md:row-start-3"
                placeholder="رمز عبور"
                error={errors.password?.message}
                value={value}
                onChange={onChange}
              />
            );
          }}
        />
      </div>
      <div className="flex flex-row justify-center sm:justify-normal">
        <Button type="submit" variant="filled">
          ثبت نام
        </Button>
      </div>
    </form>
  );
};
