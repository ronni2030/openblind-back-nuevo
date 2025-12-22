import React from 'react';

/**
 * Componente de fondo con estrellas animadas
 */
const StarBackground = () => {
  const stars = new Array(30).fill(0).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 3 + 2}s`,
    delay: `${Math.random() * 5}s`
  }));

  return (
    <div className="star-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            animationDuration: star.duration,
            animationDelay: star.delay
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
