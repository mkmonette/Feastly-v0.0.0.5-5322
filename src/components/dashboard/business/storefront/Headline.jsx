import React from 'react';

export default function Headline({
  normalText,
  highlightText,
  tokens,
  className = '',
  as = 'h2',
  style = {},
  normalColor = null,
  highlightColor = null
}) {
  const Component = as;

  const normalStyle = {
    color: normalColor || tokens.colors.sectionHeadlineNormal
  };

  const highlightStyle = {
    color: highlightColor || tokens.colors.sectionHeadlineHighlight || tokens.colors.sectionHeadlineNormal
  };

  return (
    <Component className={className} style={style}>
      <span style={normalStyle}>
        {normalText}
      </span>
      {highlightText && (
        <>
          {' '}
          <span style={highlightStyle}>
            {highlightText}
          </span>
        </>
      )}
    </Component>
  );
}
