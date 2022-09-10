import { Badge, ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { useAppSelector } from "../../redux/store";
import {
  selectVendorOfficialName,
  addedItemsLength,
} from "../../redux/addedSlice";
import CartColumnListItems from "./CartColumnListItems";
import { View, Text, ScrollView, StyleSheet } from "react-native";
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
        containerStyle={styles.accordionContainerStyle}
        isExpanded={expanded}
        onPress={clickHandler}
        pad={50}
        content={
          <>
            <ListItem.Title>{officialVendorName}</ListItem.Title>
            <Badge
              // badgeStyle={{ padding: 10 }}
              textStyle={{ fontWeight: "bold" }}
              status={addedItemsLen ? "success" : "primary"}
              value={addedItemsLen}
              containerStyle={styles.badgeContainerStyle}
            />
          </>
        }>
        <View style={styles.accordionChildrenViewStyle}>
          {addedItemsLen ? (
            <ScrollView
              contentContainerStyle={styles.scrollViewContentContainerStyle}>
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

const styles = StyleSheet.create({
  accordionContainerStyle: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  badgeContainerStyle: {
    position: "absolute",
    right: 60,
  },
  scrollViewContentContainerStyle: {
    alignItems: "center",
  },
  accordionChildrenViewStyle: {
    alignItems: "center",
    padding: 10,
  },
});

export default memo(CartVendorColumns);
