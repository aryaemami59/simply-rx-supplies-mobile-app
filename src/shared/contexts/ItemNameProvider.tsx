import type { FC, ReactNode } from "react";
import { createContext, memo } from "react";
import type { ItemName } from "../../types/api";

type Props = {
  children: ReactNode;
  itemName: ItemName;
};

export const ItemNameContext = createContext<ItemName>("10 Dram Vials");

const ItemNameProvider: FC<Props> = ({ children, itemName }) => (
  <ItemNameContext.Provider value={itemName}>
    {children}
  </ItemNameContext.Provider>
);

export default memo<Props>(ItemNameProvider);
