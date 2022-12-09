import type { FC, ReactNode } from "react";
import { createContext, memo } from "react";
import type { VendorNameType } from "../../types/api";

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
