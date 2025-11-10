/**
 * 无序参数解析器
 */
export class ArgParser {
  private tokens: Set<string>;
  private parsed: Map<string, string> = new Map();

  constructor(args: readonly string[]) {
    // 直接使用数组，过滤空字符串
    this.tokens = new Set(args.filter(Boolean));
  }

  /**
   * 尝试从枚举值中匹配
   */
  tryMatch(key: string, enumValues: readonly string[]): string | undefined {
    const matched = [...this.tokens].filter((t) => enumValues.includes(t));

    if (matched.length === 1) {
      const value = matched[0];
      this.tokens.delete(value);
      this.parsed.set(key, value);
      return value;
    }

    return undefined;
  }

  /**
   * 尝试匹配验证器
   */
  tryMatchBy(key: string, validator: (token: string) => boolean): string | undefined {
    const matched = [...this.tokens].filter(validator);

    if (matched.length === 1) {
      const value = matched[0];
      this.tokens.delete(value);
      this.parsed.set(key, value);
      return value;
    }

    return undefined;
  }

  /**
   * 获取剩余 tokens
   */
  getRemaining(): string[] {
    return [...this.tokens];
  }

  /**
   * 获取已解析的参数
   */
  getParsed(): Record<string, string> {
    return Object.fromEntries(this.parsed);
  }
}
