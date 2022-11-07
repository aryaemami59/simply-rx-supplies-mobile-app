import { createContext, FC, memo, ReactNode } from "react";
import { VendorNameType } from "../../../custom_types/api";

type Props = {
  children: ReactNode;
  vendorName: VendorNameType;
};

export const VendorNameContext = createContext<VendorNameType>("MCK");

const VendorNameProvider: FC<Props> = ({ children, vendorName }) => (
  <VendorNameContext.Provider value={vendorName}>
    {children}
  </VendorNameContext.Provider>
);

export default memo<Props>(VendorNameProvider);
