import ReactMarkdown from 'react-markdown';

/**
 * 해설 텍스트 렌더러
 * 과제 명세: 개행, bold(**), italic(*) 지원
 */
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
