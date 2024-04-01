import { getThirdDiscounts } from "@/api";
import { Layout } from "@/components/layout";
import { Button, Select, Title } from "@/components/ui";
import { useOrder } from "@/context";
import { useQuery } from "@tanstack/react-query";

export default function InsureCompanyPage() {
  const { order, setOrder } = useOrder();

  const { data } = useQuery({
    queryKey: ["thirdDiscounts"],
    queryFn: getThirdDiscounts,
  });

  if (!data) {
    return null;
  }

  const discounts = data.map(({ title }) => ({ label: title, value: title }));

  return (
    <Layout>
      <div className="space-y-8 px-6 py-12 md:px-12 lg:px-24">
        <Title>بیمه شخص ثالث</Title>
        <span className="block text-right text-sm text-neutral-500">
          درصد تخفیف بیمه شخص ثالث و حوادث راننده را وارد کنید
        </span>
        <Select
          className="flex-1"
          title="درصد تخفیف ثالث"
          options={discounts}
          value={order.thirdPartyDiscount}
          onChange={(discount: string) =>
            setOrder({ ...order, thirdPartyDiscount: discount })
          }
        />
        <Select
          className="flex-1"
          title="درصد تخفیف حوادث راننده"
          options={discounts}
          value={order.accidentDiscount}
          onChange={(discount: string) =>
            setOrder({ ...order, accidentDiscount: discount })
          }
        />
        <div className="flex flex-row justify-center sm:justify-normal">
          <Button
            variant="outlined"
            disabled={!order.thirdPartyDiscount || !order.accidentDiscount}
            onClick={() => {
              console.log({ order });
            }}
          >
            استعلام قیمت
          </Button>
        </div>
      </div>
    </Layout>
  );
}
