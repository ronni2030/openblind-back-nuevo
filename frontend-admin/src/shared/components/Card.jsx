import { motion } from 'framer-motion';
import './Card.css';

/**
 * Card Component - Componente de tarjeta reutilizable
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {string} props.title - Título opcional
 * @param {string} props.subtitle - Subtítulo opcional
 * @param {React.ReactNode} props.icon - Ícono opcional
 * @param {string} props.variant - Variante: 'default' | 'bordered' | 'elevated' | 'glass'
 * @param {boolean} props.hoverable - Si debe tener efecto hover
 * @param {string} props.className - Clases adicionales
 * @param {function} props.onClick - Evento click
 */
export default function Card({
  children,
  title,
  subtitle,
  icon,
  variant = 'default',
  hoverable = false,
  className = '',
  onClick,
  ...props
}) {
  const classes = `
    card
    card--${variant}
    ${hoverable ? 'card--hoverable' : ''}
    ${onClick ? 'card--clickable' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hoverable ? { y: -4, transition: { duration: 0.2 } } : {}}
      {...props}
    >
      {(title || subtitle || icon) && (
        <div className="card__header">
          {icon && <div className="card__icon">{icon}</div>}
          <div className="card__header-content">
            {title && <h3 className="card__title">{title}</h3>}
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="card__body">{children}</div>
    </motion.div>
  );
}
