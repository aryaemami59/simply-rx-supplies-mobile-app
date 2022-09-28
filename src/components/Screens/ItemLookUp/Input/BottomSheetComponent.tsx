import { FC, memo, useState, useCallback } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectVendorsArr,
  selectAllVendorOfficialNames,
} from "../../../../redux/addedSlice";
import {
  officialVendorNameType,
  vendorNameType,
} from "../../../../../CustomTypes/types";
import { Button } from "@rneui/themed";
import { BottomSheet } from "@rneui/base";
import { View, StyleSheet } from "react-native";
import BottomSheetVendorCheckbox from "../SearchResults/BottomSheetVendorCheckbox";

const BottomSheetComponent: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const vendors = useAppSelector<vendorNameType[]>(selectVendorsArr);
  const officialVendorNames = useAppSelector<officialVendorNameType[]>(
    selectAllVendorOfficialNames
  );

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
          {officialVendorNames.map((e: officialVendorNameType, i: number) => (
            <BottomSheetVendorCheckbox
              key={e}
              title={e}
              vendorName={vendors[i]}
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
