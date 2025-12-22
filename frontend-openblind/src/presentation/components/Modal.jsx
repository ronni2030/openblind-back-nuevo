import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modal animado con backdrop
 */
export const Modal = ({ isOpen, onClose, title, children, type }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
        >
          <div className={`modal-header ${type}`}>
            <h3>{title}</h3>
          </div>
          <div className="modal-body">{children}</div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
