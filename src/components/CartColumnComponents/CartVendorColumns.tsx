import { Badge, ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { useAppSelector } from "../../redux/store";
import {
  selectVendorOfficialName,
  addedItemsLength,
} from "../../redux/addedSlice";
import CartColumnListItems from "./CartColumnListItems";
import { View, Text, ScrollView } from "react-native";
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
        containerStyle={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
        isExpanded={expanded}
        onPress={clickHandler}
        pad={50}
        content={
          <>
            <ListItem.Title>{officialVendorName}</ListItem.Title>
            <Badge
              status="success"
              value={addedItemsLen}
              // containerStyle={{ alignSelf: "flex-end" }}
              // containerStyle={{ position: "absolute", left: 20 }}
              containerStyle={{ position: "absolute", right: 60 }}
            />
          </>
        }>
        <View style={{ alignItems: "center", padding: 10 }}>
          {addedItemsLen ? (
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
              <CartQRCodeImage vendorName={vendorName} />
              <CartColumnListItems vendorName={vendorName} />
            </ScrollView>
          ) : (
            <Text>No Item Has Been Added Yet!</Text>
          )}
        </View>
      </ListItem.Accordion>
    </>
  );
};

export default memo(CartVendorColumns);
