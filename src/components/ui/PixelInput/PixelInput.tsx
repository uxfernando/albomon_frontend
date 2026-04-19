import React, { InputHTMLAttributes } from "react";
import styles from "./PixelInput.module.css";

interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const PixelInput: React.FC<PixelInputProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${styles.inputParent} ${className}`}>
      <input
        className={`bg-zinc-100 text-[10px] px-4 py-3 border-2 border-solid  w-full box-border text-zinc-600 outline-none focus:bg-zinc-300 focus:border-zinc-500 placeholder:text-zinc-400 ${styles.pixelInput}`}
        {...props}
      />
    </div>
  );
};

export default PixelInput;
