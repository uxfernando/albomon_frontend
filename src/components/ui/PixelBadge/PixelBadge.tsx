import { HTMLAttributes } from "react";
import styles from "./PixelBadge.module.css";

interface PixelBadgeProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const PixelBadge: React.FC<PixelBadgeProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`text-center text-[10px] w-full ${styles.pixelBadge} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default PixelBadge;
