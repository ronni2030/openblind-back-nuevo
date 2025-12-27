import './Badge.css';

/**
 * Badge Component - Etiqueta de estado
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Texto del badge
 * @param {string} props.variant - 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'neutral'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {React.ReactNode} props.icon - Ícono opcional
 * @param {string} props.className - Clases adicionales
 */
export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
  ...props
}) {
  const classes = `
    badge
    badge--${variant}
    badge--${size}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <span className={classes} {...props}>
      {icon && <span className="badge__icon">{icon}</span>}
      <span className="badge__text">{children}</span>
    </span>
  );
}
