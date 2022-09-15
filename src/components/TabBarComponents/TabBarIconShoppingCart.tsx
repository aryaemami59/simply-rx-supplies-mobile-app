import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { checkIfAnyItemsAdded } from "../../redux/addedSlice";
import { Badge } from "@rneui/themed";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { Ionicons } from "@expo/vector-icons";

type Props = tabBarIconProps;

const TabBarIconShoppingCart: FC<Props> = ({
  focused,
  color,
  size,
}): JSX.Element => {
  const ifAdded = useAppSelector(checkIfAnyItemsAdded);
  return (
    <>
      <Ionicons
        name={ifAdded ? "cart" : "cart-outline"}
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
