import type { BottomSheetProps } from "@rneui/base";
import { BottomSheet } from "@rneui/base";
import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";

import useVendorIds from "../../../../hooks/useVendorIds";
import type { OnPress } from "../../../../types/tsHelpers";
import BottomSheetVendorCheckbox from "./BottomSheetVendorCheckbox";

const BottomSheetComponent: FC = () => {
  const [visible, setVisible] = useState(false);
  const vendorIds = useVendorIds();
  // const officialVendorNames = useAppSelector(
  //   selectAllVendorOfficialNames,
  //   shallowEqual
  // );

  const showBottomSheet: OnPress = useCallback(() => {
    Keyboard.dismiss();
    setVisible(true);
  }, []);

  const hideBottomSheet: NonNullable<BottomSheetProps["onBackdropPress"]> =
    useCallback(() => {
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
          {vendorIds.map(vendorId => (
            <BottomSheetVendorCheckbox
              key={vendorId}
              vendorId={vendorId}
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
