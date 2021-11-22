import React from "react";
import Typed from "typed.js";
// interface DonateProps {
//   topic: string;
// }

const DonateTyping: React.FC = () => {
  React.useEffect(() => {
    var typed = new Typed(".type-warpp", {
      strings: ["First ^1000 sentence.", "Second sentence."],
      typeSpeed: 50,
      backSpeed: 50,
      smartBackspace: true,
      loop: true,
    //   fadeOut: true,
    
    });
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div className="warp">
      <div className="type-warp">
        <span className="type-warpp" style={{ whiteSpace: "pre" }}></span>
      </div>
    </div>
  );
};

export default DonateTyping;
