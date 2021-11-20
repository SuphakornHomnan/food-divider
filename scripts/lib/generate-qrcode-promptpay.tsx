import { QRCode, IProps } from "react-qrcode-logo";
const generatePayload = require("promptpay-qr");

export function generateQRCode(inputNumber: string): JSX.Element {
  const inputNum: string = inputNumber.trim();
  if (inputNum.length !== 10 && inputNum.length !== 13) {
    throw new Error("string input must be length equal 10 or 13");
  }
  const payload: string = generatePayload(inputNum, {});
  const options: IProps = {
    value: payload,
    ecLevel: "M",
    enableCORS: false,
    size: 250,
    quietZone: 10,
    bgColor: "#FFFFFF",
    fgColor: "#000000ff",
    logoImage:
      "https://webisora.com/wp-content/uploads/2017/09/WebisoraLogo_B.png",
    logoWidth: 180,
    logoHeight: 40,
    logoOpacity: 1,
    qrStyle: "squares",
  };
  return <QRCode {...options} />;
}
