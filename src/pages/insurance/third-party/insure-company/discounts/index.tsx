import { getThirdDiscounts } from "@/api";
import { Layout } from "@/components/layout";
import { Button, Select, Title } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { useOrder } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function InsureCompanyPage() {
  const [showModal, setShowModal] = useState(false);
  const { order, setOrder } = useOrder();

  const translations: { [key in keyof typeof order]: string } = useMemo(
    () => ({
      insuranceType: "نوع بیمه",
      vehicleType: "نوع وسیله نقلیه",
      vehicleModel: "مدل وسیله نقلیه",
      insuranceCompany: "شرکت بیمه‌کننده",
      thirdPartyDiscount: "تخفیف شخص ثالث",
      accidentDiscount: "تخفیف حادثه",
    }),
    [],
  );

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
      <Modal
        title="استعلام"
        isOpen={showModal}
        size="md"
        onClose={() => setShowModal(false)}
      >
        <div className="space-y-4">
          {Object.entries(order).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-row-reverse justify-between space-x-4 text-right"
            >
              <span className="flex-1 text-neutral-500">
                {translations[key as keyof typeof order]}
              </span>
              <span className="flex-1 text-right text-teal-800">{value}</span>
            </div>
          ))}
        </div>
      </Modal>
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
              setShowModal(true);
            }}
          >
            استعلام قیمت
          </Button>
        </div>
      </div>
    </Layout>
  );
}
