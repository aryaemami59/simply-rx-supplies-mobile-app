import { FC, memo, useCallback, useState } from "react";
// import QRCode from "qrcode";
import { useAppSelector } from "../../redux/store";
import {
  selectQRCodeContent,
  selectVendorsLinks,
} from "../../redux/addedSlice";
import { Image, View, Text, Modal } from "react-native";
import QRCode from "react-native-qrcode-svg";
// import QRCode from "react-native-qrcode";
import {
  AntDesign,
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as Print from "expo-print";
import { Button, ButtonGroup } from "@rneui/themed";
import { shareAsync } from "expo-sharing";
import { Linking } from "react-native";
import { selectVendorOfficialName } from "../../redux/addedSlice";

interface Props {
  vendorName: string;
}
const CartQRCodeImage: FC<Props> = ({ vendorName }): JSX.Element => {
  // const html = `
  // <html>
  //   <head>
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  //   </head>
  //   <body style="text-align: center;">
  //     <img
  //       src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
  //       style="width: 90vw;" />
  //   </body>
  // </html>
  // `;
  // const [selectedPrinter, setSelectedPrinter] = useState();
  // const printToFile = async () => {
  //   // On iOS/android prints the given html. On web prints the HTML from the current page.
  //   const { uri } = await Print.printToFileAsync({
  //     html,
  //   });
  //   console.log("File has been saved to:", uri);
  //   await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  // };
  const itemNumbers: string = useAppSelector<string>(
    selectQRCodeContent(vendorName)
  );

  const [showModal, setShowModal] = useState(false);

  const clickHandler = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));

  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <>
      <QRCode value={itemNumbers} />
      <Feather name="printer" size={30} color="black" />
      {/* <Button title="Print" onPress={printToFile} /> */}
      <MaterialCommunityIcons
        name="magnify-close"
        size={30}
        onPress={clickHandler}
      />
      <Text onPress={() => Linking.openURL(vendorLink)}>
        {officialVendorName} Website
      </Text>
      <ButtonGroup
        vertical
        buttons={[
          <Button size={"sm"} title="Hide Item Name" />,
          <Button size={"sm"} title="Hide Item Number" />,
          <Button size={"sm"} title="Hide Item Barcode" />,
        ]}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={clickHandler}>
        <SafeAreaView
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: Constants.statusBarHeight,
            marginTop: Constants.statusBarHeight + 10,
          }}>
          <View>
            <QRCode value={itemNumbers} size={250} />
          </View>
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 0,
            }}>
            <EvilIcons
              name="close"
              color="#0000007f"
              size={30}
              onPress={clickHandler}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default memo(CartQRCodeImage);
