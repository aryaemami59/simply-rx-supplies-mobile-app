import {
  Component,
  ComponentClass,
  FC,
  forwardRef,
  memo,
  ReactSVGElement,
  SVGProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StackScreenProps } from "@react-navigation/stack";
import qrcode from "qrcode";
// import { VendorItemsStackParamList, ShoppingCartStackParamList } from '../../../CustomTypes/types';
import QRCode, { QRCodeProps } from "react-native-qrcode-svg";
import { useAppSelector } from "../../redux/store";
import { selectQRCodeContent } from "../../redux/addedSlice";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import { View, ActivityIndicator, Platform, Pressable } from "react-native";
import { Share } from "react-native";
import { JC_AI_CENTER, height100, width100 } from "../../shared/sharedStyles";
import { Button, Image } from "@rneui/themed";
// import Share from "react-native-share";
import * as Sharing from "expo-sharing";
import { Svg } from "react-native-svg";
import { Octicons } from "@expo/vector-icons";
// const QRCodeRef = forwardRef((props: QRCodeProps, ref): JSX.Element => {
//   return <QRCode {...props} ref={ref} />;
// });

// import { ToastAndroid } from "react-native";
// import CameraRoll from "@react-native-community/cameraroll";
// import RNFS from "react-native-fs";

// const img = document.createElement("img");
// const can = document.createElement("canvas");

type Props = StackScreenProps<ShoppingCartStackParamList, "QRImage">;
// type Props = StackScreenProps<VendorItemsStackParamList, "QRImage">;

const QRCodeScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { itemNumbers } = route.params;
  // let src = "";
  // let src =
  //   "data:image/png;base64,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";
  // qrcode.toDataURL(
  //   itemNumbers,
  //   {
  //     type: "image/png",
  //   },
  //   (err, url) => {
  //     src = url;
  //   }
  // );
  // qrcode
  //   .toDataURL(itemNumbers, {
  //     type: "image/png",
  //   })
  //   .then(e => (src = e));

  // if (!src) {
  //   return <ActivityIndicator />;
  // }

  // qrcode
  //   .toDataURL(itemNumbers)
  //   .then(url => {
  //     console.log(url);
  //     src = url;
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  // const generateQR = async text => {
  //   try {
  //     console.log(await qrcode.toDataURL(text));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // generateQR(itemNumbers);

  // useEffect(() => {}, [itemNumbers]);

  // qrcode.toString(itemNumbers).then(e => console.log(e));
  // const [busy, setBusy] = useState(true);
  // const [saved, setSaved] = useState(false);

  let svg = useRef<Svg>(null);
  // let svg = useRef<Component<QRCode>>(null);

  // function saveQrToDisk() {
  //   svg.current?.toDataURL(data => {
  //     RNFS.writeFile(
  //       RNFS.CachesDirectoryPath + "/some-name.png",
  //       data,
  //       "base64"
  //     )
  //       .then(success => {
  //         return CameraRoll.saveToCameraRoll(
  //           RNFS.CachesDirectoryPath + "/some-name.png",
  //           "photo"
  //         );
  //       })
  //       .then(() => {
  //         setBusy(false);
  //         setSaved(true);
  //         // this.setState({ busy: false, imageSaved: true  })
  //         ToastAndroid.show("Saved to gallery !!", ToastAndroid.SHORT);
  //       });
  //   });
  // }
  const shareQR = () => {
    svg.toDataURL((data: string) => {
      const shareImageBase64 = {
        title: "QR",
        message: "Ehi, this is my QR code",
        url: `data:image/png;base64,${data}`,
      };
      Share.share(shareImageBase64);
    });
  };
  // let svg;
  // let url;
  // const getDataURL = () => {
  //   svg.current?.toDataURL(callback);
  // };

  // const saveQRCode = () => {
  //   svg.current?.toDataURL(callback);
  // };

  // function callback(dataURL: string) {
  //   console.log(dataURL);
  //   let shareImageBase64 = {
  //     title: "React Native",
  //     url: `data:image/png;base64,${dataURL}`,
  //     subject: "Share Link", //  for email
  //   };
  //   Share.open(shareImageBase64).catch(error => console.log(error));
  // }

  // let url = svg.current?.toDataURL(e => e);

  // const url = svg?.toDataURL(e => e);
  // useEffect(() => {
  //   console.log(svg.toDataURL());
  // }, []);

  // getDataURL() {
  //   this.svg.toDataURL(this.callback);
  // }

  // callback(dataURL) {
  //   console.log(dataURL);
  // }

  // const clickHandler = useCallback(() => {
  //   Share.share({
  //     title: svg.current?.toDataURL(e => e),
  //     message: svg.current?.toDataURL(),
  //     url: svg.current?.toDataURL(),
  //   });
  // }, []);

  return (
    <View style={{ ...JC_AI_CENTER, ...height100, paddingHorizontal: 50 }}>
      <Pressable
        // onPress={shareQR}
        onLongPress={shareQR}>
        <QRCode
          // logo={{ uri: `data:image/png;base64,${src}` }}
          value={itemNumbers}
          size={300}
          getRef={e => (svg = e)}
        />
      </Pressable>
      <Octicons
        name={Platform.OS === "android" ? "share-android" : "share"}
        onPress={shareQR}
        size={50}
        style={{ alignSelf: "flex-end", marginTop: 20 }}
      />
      {/* <Button title="Share" onPress={shareQR} /> */}
      {/* <Image
        source={{ uri: `https://192.168.50.124:3001/${src}`, height: 400 }}
        style={{ width: 400, height: 400 }}
      /> */}
    </View>
  );
};

export default memo<Props>(QRCodeScreen);
