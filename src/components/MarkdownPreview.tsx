import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      className="markdown-preview"
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownPreview;