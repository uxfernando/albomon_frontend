import React, { ButtonHTMLAttributes } from "react";
import styles from "./PrimaryButton.module.css";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button className={`${styles.primaryButton} ${className}`} {...props}>
      <span className="text">{children}</span>
    </button>
  );
};

export default PrimaryButton;
