/**
 * LLM provider resolution.
 *
 * Reads API keys from the environment and resolves the first available provider.
 * When no key is set, `resolveProvider()` returns a sentinel with `apiKey: undefined`
 * so `LLMClient.isAvailable` returns `false` — the normal CI path.
 */

export interface ResolvedProvider {
    name: string;
    model: string;
    baseUrl: string;
    apiKey?: string;
    /** Env var name to set for this provider, surfaced in error messages. */
    keyEnv: string;
    dialect: 'openai' | 'anthropic';
}

export function resolveProvider(): ResolvedProvider {
    const deepseekKey = process.env.DEEPSEEK_API_KEY;
    if (deepseekKey) {
        return {
            name: 'deepseek',
            model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
            baseUrl: 'https://api.deepseek.com/v1',
            apiKey: deepseekKey,
            keyEnv: 'DEEPSEEK_API_KEY',
            dialect: 'openai',
        };
    }

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey) {
        return {
            name: 'openrouter',
            model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o',
            baseUrl: 'https://openrouter.ai/api/v1',
            apiKey: openRouterKey,
            keyEnv: 'OPENROUTER_API_KEY',
            dialect: 'openai',
        };
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
        return {
            name: 'openai',
            model: process.env.OPENAI_MODEL || 'gpt-4o',
            baseUrl: 'https://api.openai.com/v1',
            apiKey: openaiKey,
            keyEnv: 'OPENAI_API_KEY',
            dialect: 'openai',
        };
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey) {
        return {
            name: 'anthropic',
            model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
            baseUrl: 'https://api.anthropic.com',
            apiKey: anthropicKey,
            keyEnv: 'ANTHROPIC_API_KEY',
            dialect: 'anthropic',
        };
    }

    // No key found — LLMClient.isAvailable returns false, agents degrade gracefully.
    return {
        name: 'none',
        model: '',
        baseUrl: '',
        apiKey: undefined,
        keyEnv: 'DEEPSEEK_API_KEY',
        dialect: 'openai',
    };
}

/** Backward-compat stub for callers that only need to know if any key is set. */
export function hasApiKey(): boolean {
    return resolveProvider().apiKey !== undefined;
}