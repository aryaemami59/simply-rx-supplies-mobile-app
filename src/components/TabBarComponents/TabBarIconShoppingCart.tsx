import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { checkIfAnyItemsAdded } from "../../redux/addedSlice";
import { Badge, Icon } from "@rneui/themed";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { tabBarIconProps } from "../../../Main";
// type tabBarIconType = BottomTabNavigationOptions["tabBarIcon"];

type Props = tabBarIconProps;

const TabBarIconShoppingCart: FC<Props> = ({
  focused,
  color,
  size,
}): JSX.Element => {
  const ifAdded = useAppSelector(checkIfAnyItemsAdded);
  return (
    <>
      <Icon
        name={ifAdded ? "cart" : "cart-outline"}
        type="ionicon"
        color={color}
        size={30}
      />
      {ifAdded ? (
        <Badge
          status="error"
          containerStyle={{
            position: "absolute",
            right: 48,
            top: 5,
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default memo<Props>(TabBarIconShoppingCart);
