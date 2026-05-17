import ReactMarkdown from 'react-markdown';

export interface IMarkdownTextProps {
  content: string;
}

export const MarkdownText = ({ content }: IMarkdownTextProps) => {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
