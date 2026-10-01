/**
 * TransactionParser — parses Applitools demo transaction amounts and computes
 * spent vs earned totals.
 *
 * Amount strings from the DOM look like:
 *   "+ 1,250 USD"   → earned (positive)
 *   "- 320 USD"     → spent  (negative)
 */

export interface TransactionSummary {
    /** All parsed numeric amounts (positive = earned, negative = spent). */
    amounts: number[];
    /** Sum of all positive amounts (earned). */
    earned: number;
    /** Sum of all negative amounts (spent, as a positive number). */
    spent: number;
    /** Net total (earned - spent). */
    total: number;
}

/**
 * Parse a single amount string like "+ 1,250 USD" or "- 320 USD" into a number.
 * Returns a signed float: positive for earned, negative for spent.
 */
export function parseAmount(raw: string): number {
    // Remove "USD" and any surrounding whitespace
    const cleaned = raw.replace(/USD/i, '').trim();
    // Remove commas from numbers like "1,250"
    const numeric = cleaned.replace(/,/g, '');
    // Collapse sign + space so parseFloat works.
    // "+ 1250" → "+1250", "- 320" → "-320"
    const signStripped = numeric.replace(/^([+-])\s+/, '$1');
    // Parse the signed number
    const value = Number.parseFloat(signStripped);
    if (Number.isNaN(value)) {
        throw new Error(`Could not parse amount from "${raw}"`);
    }
    return value;
}

/**
 * Parse an array of raw amount strings and return a summary with
 * earned, spent, and net total.
 */
export function summarize(amounts: string[]): TransactionSummary {
    const parsed = amounts.map(parseAmount);

    const earned = parsed
        .filter((n) => n > 0)
        .reduce((sum, n) => sum + n, 0);

    const spent = parsed
        .filter((n) => n < 0)
        .reduce((sum, n) => sum + Math.abs(n), 0);

    const total = earned - spent;

    return { amounts: parsed, earned, spent, total };
}