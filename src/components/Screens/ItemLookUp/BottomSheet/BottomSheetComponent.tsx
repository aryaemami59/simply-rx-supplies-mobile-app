import { BottomSheet } from "@rneui/base";
import { Button } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import { selectAllVendorOfficialNames } from "../../../../redux/selectors";
import useVendorNamesList from "../../../../shared/hooks/useVendorNamesList";
import BottomSheetVendorCheckbox from "./BottomSheetVendorCheckbox";

const BottomSheetComponent: FC = () => {
  const [visible, setVisible] = useState(false);
  const vendors = useVendorNamesList();
  const officialVendorNames = useAppSelector(
    selectAllVendorOfficialNames,
    shallowEqual
  );

  const showBottomSheet = useCallback(() => {
    Keyboard.dismiss();
    setVisible(true);
  }, []);

  const hideBottomSheet = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <Button
        onPress={showBottomSheet}
        title="Exclude Vendors"
      />
      <BottomSheet
        isVisible={visible}
        onBackdropPress={hideBottomSheet}
        containerStyle={styles.bottomSheetContainer}>
        <View>
          {officialVendorNames.map((officialVendorName, index) => (
            <BottomSheetVendorCheckbox
              key={officialVendorName}
              title={officialVendorName}
              vendorName={vendors[index]}
            />
          ))}
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingBottom: 50,
  },
});

export default memo(BottomSheetComponent);
