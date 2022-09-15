import { Badge, Button, Chip, lightColors, Tooltip } from "@rneui/themed";
import {
  Dispatch,
  FC,
  memo,
  RefObject,
  useRef,
  useState,
  useCallback,
  MouseEventHandler,
  SetStateAction,
} from "react";
// import Modal from "modal-react-native-web";

import {
  itemInterface,
  checkIfAddedToAllVendors,
  selectVendorsToAddTo,
  addItems,
} from "../../redux/addedSlice";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { shallowEqual } from "react-redux";
import { Text, View, StyleSheet, Keyboard } from "react-native";

interface Props {
  itemObj: itemInterface;
}

const AddItemButton: FC<Props> = ({ itemObj }): JSX.Element => {
  const [show, setShow]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false);
  const IfAddedToAllVendors: boolean = useAppSelector<boolean>(
    checkIfAddedToAllVendors(itemObj)
  );
  const vendors: string[] = useAppSelector<string[]>(
    selectVendorsToAddTo(itemObj),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const target: RefObject<HTMLButtonElement> = useRef<null>(null);

  const showBadge = useCallback((): void => {
    setShow(true);
  }, []);
  const hideBadge = useCallback((): void => {
    setShow(false);
  }, []);

  const showThenHide = useCallback((): void => {
    showBadge();
    setTimeout(hideBadge, 1500);
  }, [showBadge, hideBadge]);

  const clickHandler = useCallback((): void => {
    Keyboard.dismiss();
    IfAddedToAllVendors
      ? showThenHide()
      : dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, showThenHide, dispatch, itemObj, vendors]);
  return (
    <>
      {/* <Button size="lg" onPress={clickHandler} title="Add Item" /> */}
      <Chip
        raised
        size="lg"
        onPress={clickHandler}
        title="Add"
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
        icon={{ name: "add", type: "Ionicons", color: "white" }}
      />
      {/* <View key={`Collapse-AddItemButtonComponent-${itemObj.name}`}>
        <Tooltip
          closeOnlyOnBackdropPress
          visible={show}
          backgroundColor={lightColors.error}
          ModalComponent={Modal}
          popover={
            <Badge value="This Item Has Already Been Added!" status="error" />
          }
          withPointer={false}
        />
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#0071dc",
  },
  titleStyle: {
    fontWeight: "700",
    // fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
  },
});

export default memo(AddItemButton);
