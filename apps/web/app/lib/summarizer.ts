import OpenAI from 'openai';
import { SearchResult } from '../types/search';

export class ContentSummarizer {
  private static readonly openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  static async summarize(results: SearchResult[], query: string): Promise<string> {
    try {
      const prompt = this.createPrompt(results, query);
      const completion = await this.generateSummary(prompt);
      return completion.choices?.[0]?.message?.content || this.getDefaultMessage();
    } catch (error) {
      console.error('Summary generation error:', error);
      return this.getDefaultMessage();
    }
  }

  private static createPrompt(results: SearchResult[], query: string): string {
    return `
検索クエリ: "${query}"

以下の検索結果を要約してください：

${results.map(this.formatSearchResult).join('\n')}

要約のガイドライン：
1. 最も関連性の高い情報を優先
2. 客観的な事実を中心に
3. 複数の情報源からの共通点を見つける
4. 300文字程度で簡潔に
5. 情報の出典を明記

形式：
- 要約：[主要なポイントをまとめる]
- 参考：[使用した主な情報源を列挙]
`;
  }

  private static formatSearchResult(result: SearchResult, index: number): string {
    return `
[結果${index + 1}]
タイトル: ${result.title}
概要: ${result.snippet}
URL: ${result.url}
`;
  }

  private static async generateSummary(prompt: string) {
    return await this.openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "あなたは検索結果を要約する専門家です。与えられた情報を正確に分析し、重要なポイントを簡潔にまとめてください。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4o-mini",
      temperature: 0.3,
    });
  }

  private static getDefaultMessage(): string {
    return "要約の生成に失敗しました。";
  }
} 