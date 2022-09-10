import { FC, memo, useCallback } from "react";
import { useAppSelector } from "../../redux/store";
import {
  selectQRCodeContent,
  selectVendorsLinks,
} from "../../redux/addedSlice";
import { Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Feather } from "@expo/vector-icons";
import { ButtonGroup } from "@rneui/themed";
import { shareAsync } from "expo-sharing";
import { Linking } from "react-native";
import { selectVendorOfficialName } from "../../redux/addedSlice";
import HideItemName from "./HideItemName";
import HideItemNumber from "./HideItemNumber";
import HideItemBarcode from "./HideItemBarcode";
import QRCodeModal from "./QRCodeModal";

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

  const vendorLink = useAppSelector(selectVendorsLinks(vendorName));

  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const openLink = useCallback(() => {
    Linking.openURL(vendorLink);
  }, []);

  return (
    <>
      <QRCode value={itemNumbers} />
      <Feather name="printer" size={30} color="black" />
      <QRCodeModal itemNumbers={itemNumbers} />
      <Text onPress={openLink}>{officialVendorName} Website</Text>
      <ButtonGroup
        vertical
        buttons={[<HideItemName />, <HideItemNumber />, <HideItemBarcode />]}
      />
    </>
  );
};

export default memo(CartQRCodeImage);
