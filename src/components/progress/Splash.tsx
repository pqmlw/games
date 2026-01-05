// import { icLogoEmosDibina } from "@src/lib/constants/assets";

import React from "react";

const Splash: React.FC = () => {
  return (
    <div
      className={`w-full h-screen bg-emerald-200 flex items-center justify-center flex-col`}
    >
      {/* <img src={icLogoEmosDibina} className="w-1/2 md:w-[15rem] -ml-3" /> */}

      {/* <div className="mt-7">
        <div className="flex flex-row gap-4">
          <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div> */}
      <div className="text-primary mt-3 font-bold md:text-xl">
        Load application...
      </div>
    </div>
  );
};
export default Splash;
