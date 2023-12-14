import React, { useRef, useEffect, useState } from 'react';

const EllipsisText = ({ text, maxLines }) => {
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = textRef.current;
    const containerHeight = container.clientHeight;
    const lineHeight = parseInt(getComputedStyle(container).lineHeight);
    const totalLines = Math.floor(containerHeight / lineHeight);

    setIsOverflowing(totalLines > maxLines);
  }, [text, maxLines]);

  console.log(text)
  
  return (
    <span
      ref={textRef}
      style={{
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        textOverflow: isOverflowing ? 'ellipsis' : 'clip',
        WebkitLineClamp: maxLines,
      }}
    >
      {text}
    </span>
  );
};

export default EllipsisText