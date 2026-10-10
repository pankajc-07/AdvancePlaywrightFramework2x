/*
1. Check if Two Strings are Anagrams
Problem Statement: Write a TypeScript function that checks if two strings are anagrams of each other (contain the exact same characters in any order). Return a boolean.

Q1: Extract Numbers from a Price String
Problem Statement: When scraping e-commerce sites, prices often come with currency symbols and commas (e.g., "$1,249.99"). Write a TypeScript function that extracts only the numeric value as a number.
*/
function extractPrice(priceString: string): number {
    const cleaned = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned);
}

console.log(extractPrice('"$1,249.99'));
console.log("************************************");

/*
Q2: Clean and Capitalize Labels
Problem Statement: UI labels often have extra whitespace and inconsistent casing. Write a function that trims leading/trailing spaces, converts the string to lowercase, and capitalizes the first letter of each word.
*/
function formatLable(lable: string): string {
    return lable.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

console.log(formatLable('   submit order button    '));
console.log("************************************");

/*
Q3: Check for Palindrome (Validating IDs or Slugs)
Problem Statement: Write a function to check if a given string or test ID is a palindrome (reads the same forwards and backwards, ignoring case and non-alphanumeric characters).
*/
function isPalindrome(text: string): boolean {
    const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reverced = cleaned.split('').reverse().join('');
    return cleaned === reverced;
}

console.log(isPalindrome('RaceCar'));
console.log("************************************");

/*
Q4: Find Duplicate Test Names or Elements
Problem Statement: Given an array of test names or element texts, write a function that returns an array of duplicates to ensure test uniqueness.
*/
function findDuplicates(items: string[]): string[] {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    for (const item of items) {
        if (seen.has(item)) {
            duplicates.add(item);
        } else {
            seen.add(item);
        }
    }
    return Array.from(duplicates);
}

console.log(findDuplicates(["login_test", "checkout_test", "login_test", "cart_test"]));
console.log("************************************");

/*
Q5: Remove Falsy Values from Test Data
Problem Statement: When extracting dynamic configuration options or optional form fields, your array might contain falsy values (null, undefined, "", 0, false). Write a function to clean the array.
*/
function cleanArray<T>(arr: (T | null | undefined | false | "" | 0)[]): T[] {
    return arr.filter(Boolean) as T[];
}

console.log(cleanArray(["Admin", "", null, "User", undefined, "Guest"]));
console.log("************************************");

/*
Q6: Find the Maximum Value (Pagination / Pricing)
Problem Statement: Given an array of numeric pagination numbers or item prices found on a page, write a function to find the maximum value without using Math.max directly on an unspread array.
*/
function getMaxNumber(numbers: number[]): number {
    if (numbers.length === 0) throw new Error('Array is Empty');
    return Math.max(...numbers);
}

console.log(getMaxNumber([10, 55, 23, 99, 4]));
console.log("************************************");

/*
Q7: Count Test Status Occurrences
Problem Statement: Given an array of test execution results (e.g., ["passed", "failed", "passed", "skipped", "passed"]), write a function that returns an object mapping each status to its count.
*/
function countTestResults(results: string[]): Record<string, number> {
    return results.reduce((acc, status) => {
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
}

console.log(countTestResults(["passed", "failed", "passed", "skipped", "passed"]));
console.log("************************************");

/*
Q8: Merge Test Data Objects
Problem Statement: Write a function that merges default test configuration options with user-provided overrides.
*/
interface TestConfig {
    timeout: number;
    headless: boolean;
    browser: string;
}

function mergeConfig(defaultConfig: TestConfig, overrides: Partial<TestConfig>): TestConfig {
    return { ...defaultConfig, ...overrides };
}

// Example usage:
const baseConfig: TestConfig = { timeout: 30000, headless: true, browser: "chromium" };
console.log(mergeConfig(baseConfig, { headless: false }));
// Output: { timeout: 30000, headless: false, browser: "chromium" }
console.log("************************************");

/*
Q9: Basic Asynchronous Delay (Custom Wait)
Problem Statement: Sometimes you need a simple custom sleep/delay function in TypeScript for debugging or specific waiting conditions before Playwright's built-in auto-waiting kicks in. Write an async delay function.
*/
async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Example usage inside an async function:
async function runTest() {
    console.log("Waiting...");
    await delay(1000); // Wait 1 second
    console.log("Resumed!");
}
console.log("************************************");

/*
Q10: Chunking Data for Batch Test Execution
Problem Statement: If you have a large array of user test data and want to process them in batches of a specific size, write a function that splits an array into smaller chunks.
*/
function chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

// Example usage:
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7], 3));
// Output: [[1, 2, 3], [4, 5, 6], [7]]

