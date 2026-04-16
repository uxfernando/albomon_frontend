import React, { InputHTMLAttributes } from 'react';
import styles from './PixelInput.module.css';

interface PixelInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const PixelInput: React.FC<PixelInputProps> = ({ className = '', ...props }) => {
  return (
    <div className={`${styles.inputParent} ${className}`}>
      <input 
        className={styles.pixelInput} 
        {...props} 
      />
    </div>
  );
};

export default PixelInput;