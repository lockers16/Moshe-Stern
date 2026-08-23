import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

/**
 * Helper component that renders formatted text supporting:
 * - Markdown bold: **טקסט מודגש**
 * - HTML bold: <b>טקסט מודגש</b> or <strong>טקסט מודגש</strong>
 * - Line breaks: \n (when wrapped in whitespace-pre-line)
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Split by markdown bold (**...**) or HTML bold (<b>...</b> or <strong>...</strong>)
  const parts = text.split(/(\*\*[\s\S]*?\*\*|<b>[\s\S]*?<\/b>|<strong>[\s\S]*?<\/strong>)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          const content = part.slice(2, -2);
          return (
            <strong key={index} className="font-bold text-[#112b4e]">
              {content}
            </strong>
          );
        }

        if (
          (part.startsWith('<b>') && part.endsWith('</b>')) ||
          (part.startsWith('<strong>') && part.endsWith('</strong>'))
        ) {
          const content = part.replace(/^<(b|strong)>/, '').replace(/<\/(b|strong)>$/, '');
          return (
            <strong key={index} className="font-bold text-[#112b4e]">
              {content}
            </strong>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};

export default FormattedText;
