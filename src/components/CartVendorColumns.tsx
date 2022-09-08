import { Badge, ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { useAppSelector } from "../redux/store";
import {
  selectVendorOfficialName,
  addedItemsLength,
} from "../redux/addedSlice";
import CartColumnListItems from "./CartColumnListItems";
import { View } from "react-native";
import CartQRCodeImage from "./CartQRCodeImage";

interface Props {
  vendorName: string;
}

const CartVendorColumns: FC<Props> = ({ vendorName }): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));

  const clickHandler = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  return (
    <>
      <ListItem.Accordion
        bottomDivider
        containerStyle={{ backgroundColor: "lightblue" }}
        isExpanded={expanded}
        onPress={clickHandler}
        content={
          <>
            <ListItem.Title>{officialVendorName}</ListItem.Title>
            <Badge
              status="success"
              value={addedItemsLen}
              containerStyle={{ position: "absolute", right: 60 }}
            />
          </>
        }>
        <CartQRCodeImage vendorName={vendorName} />
        <CartColumnListItems vendorName={vendorName} />
      </ListItem.Accordion>
    </>
  );
};

export default memo(CartVendorColumns);
