import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Cargando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={styles.spinner}></div>
      {message && <p className="text-zinc-500 font-medium animate-pulse">{message}</p>}
    </div>
  );
};

export default Loader;
