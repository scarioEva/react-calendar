import {useEffect, useState} from "react";

const getWindowDimensions = () => {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height,
  };
};

export const useDimensions = () => {
  const [{height, width}, setWindowDimensions] = useState({
    height: undefined,
    width: undefined,
  });
  const [noWindow, setNoWindow] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      setNoWindow(false);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return {
    height,
    width,
    isXL: width >= 1200,
    isXXL: width >= 1600,
    isLG: width >= 992,
    isMD: width >= 768,
    isSM: width >= 576,
    isXS: width < 576,
    noWindow,
  };
};
