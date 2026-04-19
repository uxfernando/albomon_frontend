import React, { ButtonHTMLAttributes } from "react";
import styles from "./PixelButton.module.css";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`w-[calc(100%-8px)] h-10 inline-flex items-center justify-center text-white border-none text-[10px] m-1.25 px-6 cursor-pointer font-bold transition-all duration-100 ${styles.pixelButton} ${className}`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export default PixelButton;
