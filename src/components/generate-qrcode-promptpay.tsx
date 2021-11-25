import { QRCode, IProps } from "react-qrcode-logo";
import { Modal } from "react-bootstrap";
import { useModal } from "../hooks/use-modal";
import { ZoomIn } from "react-feather";
const generatePayload = require("promptpay-qr");

interface QrcodeProps {
  inputNumber: string;
  size?: number;
  quietZone?: number;
  logoImage?: string;
  enableCORS?: boolean;
}

export const GenerateQRCode: React.FC<QrcodeProps> = ({
  inputNumber,
  size = 100,
  quietZone = 0,
  enableCORS = false,
  logoImage = "https://img.soccersuck.com/images/2020/07/30/FB_IMG_1596085181720.jpg",
}) => {
  const [open, close, context] = useModal(false);
  const inputNum: string = inputNumber.trim();
  if (inputNum.length !== 10 && inputNum.length !== 13) {
    throw new Error("string input must be length equal 10 or 13");
  }
  const payload: string = generatePayload(inputNum, {});
  const options: IProps = {
    value: payload,
    ecLevel: "L",
    enableCORS,
    size,
    quietZone,
    bgColor: "#FFFFFF",
    fgColor: "#000000ff",
    logoImage,
    logoWidth: 80,
    logoHeight: 80,
    logoOpacity: 0.47,
    qrStyle: "squares",
  };
  return (
    <>
      <Modal show={context.isOpen} centered onHide={close}>
        {context.message}
      </Modal>
      <div
        className="text-center"
        onClick={() =>
          open(
            <div className="text-center p-3">
              <QRCode {...options} size={options.size! * 2} />
              <p>{inputNum}</p>
            </div>
          )
        }
      >
        <QRCode {...options} />
        <div>
          <ZoomIn size={16} />
        </div>
        <p>{inputNum}</p>
      </div>
    </>
  );
};
