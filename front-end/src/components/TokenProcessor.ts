export interface TokenProcessorOnTextEvent {
  paragraph: string;
  paragraphIdx: number;
  paragraphs: string[];
  span: string;
  spanIdx: number;
}

export interface TokenProcessorOnTokenEvent extends TokenProcessorOnTextEvent {
  tokenType: string;
  tokenId: string;
  tokenText: string;
  tokens: string[];
}

export interface TokenProcessorOnJoinEvent<T> {
  paragraph: string;
  paragraphIdx: number;
  paragraphs: string[];
  spans: T[];
}

export function TokenProcessor<T>(
  textWithTokens: string[],
  onToken: (event: TokenProcessorOnTokenEvent) => T,
  onText: (event: TokenProcessorOnTextEvent) => T,
  onJoin: (event: TokenProcessorOnJoinEvent<T>) => T
): T[] {
  return textWithTokens.map((paragraph, paragraphIdx, paragraphs) => {
    const spans = paragraph
      .split(/({[a-z-]*:[a-z-]*:[a-zA-Z --,.—_:"']*})/)
      .map((span, spanIdx) => {
        if (span.startsWith("{") && span.endsWith("}")) {
          const tokens = span.substring(1, span.length - 1).split(":");
          return onToken({
            paragraph: paragraph,
            paragraphs: paragraphs,
            paragraphIdx: paragraphIdx,
            span: span,
            spanIdx: spanIdx,
            tokenType: tokens[0],
            tokenId: tokens[1],
            tokenText: tokens[2],
            tokens: tokens,
          });
        } else {
          return onText({
            paragraph: paragraph,
            paragraphs: paragraphs,
            paragraphIdx: paragraphIdx,
            span: span,
            spanIdx: spanIdx,
          });
        }
      });
    return onJoin({
      spans: spans,
      paragraphIdx: paragraphIdx,
      paragraphs: paragraphs,
      paragraph: paragraph,
    });
  });
}
