import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type Order = {
  insuranceType: string;
  vehicleType: string;
  vehicleModel: string;
  insuranceCompany: string;
  thirdPartyDiscount: string;
  accidentDiscount: string;
};

type orderContextType = {
  order: Order;
  setOrder: (order: Order) => void;
};

const orderContextDefaultValues: orderContextType = {
  order: {
    insuranceType: "",
    vehicleType: "",
    vehicleModel: "",
    insuranceCompany: "",
    thirdPartyDiscount: "",
    accidentDiscount: "",
  },
  setOrder: () => {},
};

const OrderContext = createContext<orderContextType>(orderContextDefaultValues);

export function useOrder() {
  return useContext(OrderContext);
}

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [order, setOrder] = useState<Order>(orderContextDefaultValues.order);

  const value = {
    order,
    setOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
