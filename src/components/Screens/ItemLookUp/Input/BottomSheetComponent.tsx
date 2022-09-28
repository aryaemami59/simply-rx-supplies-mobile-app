import { FC, memo, useState, useCallback } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectVendorsArr,
  selectAllVendorOfficialNames,
} from "../../../../redux/addedSlice";
import { Button } from "@rneui/themed";
import { BottomSheet } from "@rneui/base";
import { View, StyleSheet } from "react-native";
import BottomSheetVendorCheckbox from "../SearchResults/BottomSheetVendorCheckbox";

const BottomSheetComponent: FC = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const vendors = useAppSelector(selectVendorsArr);
  const officialVendorNames = useAppSelector(selectAllVendorOfficialNames);

  const showBottomSheet = useCallback(() => {
    setVisible(true);
  }, []);

  const hideBottomSheet = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <Button onPress={showBottomSheet} title="Exclude Vendors" />
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
