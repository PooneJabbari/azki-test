import { getVehicleTypes } from "@/api";
import { Layout } from "@/components/layout";
import { ArrowIcon, Button, Select, Title } from "@/components/ui";
import { useOrder } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function ThirdPartyPage() {
  const router = useRouter();
  const { order, setOrder } = useOrder();

  const { data } = useQuery({
    queryKey: ["vehicleTypes"],
    queryFn: getVehicleTypes,
  });

  if (!data) {
    return null;
  }
  const types = data.map(({ title }) => ({ label: title, value: title }));
  const models = data
    .find(({ title }) => order.vehicleType === title)
    ?.usages.map(({ title }) => ({ label: title, value: title }));

  return (
    <Layout>
      <div className="space-y-8 px-6 py-12 md:px-12 lg:px-24">
        <Title>بیمه شخص ثالث</Title>
        <span className="block text-right text-sm text-neutral-500">
          نوع و مدل خودروی خود را انتخاب کنید
        </span>
        <div className="flex flex-row-reverse gap-4">
          <Select
            className="flex-1"
            title="نوع خودرو"
            options={types}
            value={order.vehicleType}
            onChange={(type: string) =>
              setOrder({ ...order, vehicleType: type })
            }
          />
          <Select
            className="flex-1"
            title="مدل خودرو"
            options={models ?? []}
            value={order.vehicleModel}
            onChange={(model: string) =>
              setOrder({ ...order, vehicleModel: model })
            }
          />
        </div>
        <div className="flex flex-row-reverse justify-between text-xs sm:text-sm">
          <Button
            variant="outlined"
            className="relative text-nowrap"
            onClick={() => {
              router.back();
            }}
          >
            بازگشت
            <ArrowIcon className="absolute right-4 w-3 rotate-180" />
          </Button>
          <Button
            variant="outlined"
            className="relative"
            disabled={!order.vehicleType || !order.vehicleModel}
            onClick={() => router.push("/insurance/third-party/insure-company")}
          >
            مرحله بعد
            <ArrowIcon className="absolute left-4 w-3 " />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
