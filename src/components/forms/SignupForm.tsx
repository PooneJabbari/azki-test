import { FC } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  type DefaultValues,
  type SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../ui";

const phoneRegex = new RegExp("/0?9[0-9]{9}$/");
const farsiRegex = new RegExp("^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$");
const lowerRegex = new RegExp("(?=.*[a-z])");
const upperRegex = new RegExp("(?=.*[A-Z])");

const formSchema = z.object({
  fName: z
    .string({ required_error: "نام خود را وارد کنید." })
    .regex(farsiRegex, "فقط از حروف فارسی استفاده کنید."),
  lName: z
    .string({ required_error: "نام خانوادگی خود را وارد کنید." })
    .regex(farsiRegex, "فقط از حروف فارسی استفاده کنید."),
  phone: z
    .string({ required_error: "شماره موبایل خود را وارد کنید." })
    .regex(phoneRegex, "شماره موبایل خود را به درستی وارد کنید."),
  password: z
    .string({ required_error: "رمز عبور خود را وارد کنید." })
    .min(4, "رمز طولانی‌تری انتخاب کنید")
    .max(10, "رمز کوتاه‌تری انتخاب کنید")
    .regex(lowerRegex, "رمز عبور باید حداقل یک حرف لاتین کوچک داشته باشد.")

    .regex(upperRegex, "رمز عبور باید حداقل یک حرف لاتین بزرگ داشته باشد."),
});

type FormSchema = z.infer<typeof formSchema>;

type Props = {
  onSubmit: SubmitHandler<FormSchema>;
};

export const SignupForm: FC<Props> = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-8 text-right text-3xl font-bold">ثبت نام</div>
      <div className="grid grid-cols-2 grid-rows-5 gap-x-4 gap-y-6">
        <Input
          className="col-span-2 row-start-2 md:col-span-1 md:row-span-1"
          placeholder="نام خانوادگی"
          error={errors.lName?.message}
          {...register("lName")}
        />
        <Input
          className="col-span-2 md:col-span-1"
          placeholder="نام"
          error={errors.fName?.message}
          {...register("fName")}
        />
        <Input
          className="col-span-2 row-start-3 md:row-start-2"
          placeholder="شماره موبایل"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          className="col-span-2 row-start-4 md:row-start-3"
          placeholder="رمز عبور"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>
      <Button variant="filled">ثبت نام</Button>
    </form>
  );
};
