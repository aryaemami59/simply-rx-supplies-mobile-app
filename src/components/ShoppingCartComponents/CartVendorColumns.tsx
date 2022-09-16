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
import TouchableScale from "react-native-touchable-scale";
import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { VendorColumnStackParamList } from "../../../CustomTypes/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRoute } from "@react-navigation/native";

interface Props {
  // vendorName: keyof VendorColumnStackParamList;
  vendorName: string;
}

const Stack = createStackNavigator();

const VendorColumnStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // name={route.params.vendorName}
        // name={route.}
        component={CartVendorColumns}
        // component={props => (
        //   <CartVendorColumns {...props} vendorName={vendorName} />
        // )}
      />
    </Stack.Navigator>
  );
};

const CartVendorColumns = ({ vendorName, onPress }) => {
  const [expanded, setExpanded] = useState(false);
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));

  const clickHandler = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const navigation =
    useNavigation<StackNavigationProp<VendorColumnStackParamList>>();

  // const route = useRoute();

  return (
    <ListItem
      bottomDivider
      Component={TouchableScale}
      // friction={90}
      // tension={100}
      // activeScale={0.95}
      containerStyle={styles.accordionContainerStyle}
      // isExpanded={expanded}
      onPress={onPress}
      // onPress={() => navigation.push(vendorName)}
      // onPress={clickHandler}
      pad={50}
      // content={
      //   <>
      //     <ListItem.Title>{officialVendorName}</ListItem.Title>
      //     <Badge
      //       textStyle={{ fontWeight: "bold" }}
      //       status={addedItemsLen ? "success" : "primary"}
      //       value={addedItemsLen}
      //       containerStyle={styles.badgeContainerStyle}
      //     />
      //   </>
      // }
    >
      {/* <VendorColumnStack navigation={navigation} route={route} /> */}
      <ListItem.Content>
        <>
          <ListItem.Title>{officialVendorName}</ListItem.Title>
          <Badge
            textStyle={{ fontWeight: "bold" }}
            status={addedItemsLen ? "success" : "primary"}
            value={addedItemsLen}
            containerStyle={styles.badgeContainerStyle}
          />
        </>
      </ListItem.Content>
      {/* {addedItemsLen ? (
        <View style={{ alignItems: "center" }}>
          <CartQRCodeImage vendorName={vendorName} />
          <CartColumnListItems vendorName={vendorName} />
        </View>
      ) : (
        <Text style={{ textAlign: "center", paddingVertical: 20 }}>
          No Item Has Been Added Yet!
        </Text>
      )} */}
    </ListItem>
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
    height: "100%",
  },
});

// export default VendorColumnStack;
export default CartVendorColumns;
// export default memo(CartVendorColumns);
