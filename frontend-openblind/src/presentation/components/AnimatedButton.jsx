import React from 'react';
import { motion } from 'framer-motion';

/**
 * Botón con animaciones de hover y tap
 */
export const AnimatedButton = ({ onClick, className, children, style }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={className}
    onClick={onClick}
    style={style}
  >
    {children}
  </motion.button>
);
