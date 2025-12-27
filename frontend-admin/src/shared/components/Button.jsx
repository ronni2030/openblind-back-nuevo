import { motion } from 'framer-motion';
import './Button.css';

/**
 * Button Component - Botón reutilizable con variantes y estados
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {string} props.variant - 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {boolean} props.disabled - Estado deshabilitado
 * @param {boolean} props.loading - Estado de carga
 * @param {boolean} props.fullWidth - Ancho completo
 * @param {React.ReactNode} props.leftIcon - Ícono izquierdo
 * @param {React.ReactNode} props.rightIcon - Ícono derecho
 * @param {string} props.className - Clases adicionales
 * @param {function} props.onClick - Evento click
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const classes = `
    btn
    btn--${variant}
    btn--${size}
    ${fullWidth ? 'btn--full-width' : ''}
    ${loading ? 'btn--loading' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {loading && (
        <span className="btn__spinner">
          <svg className="btn__spinner-icon" viewBox="0 0 24 24">
            <circle
              className="btn__spinner-circle"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        </span>
      )}

      {!loading && leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}

      <span className="btn__label">{children}</span>

      {!loading && rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
    </motion.button>
  );
}
