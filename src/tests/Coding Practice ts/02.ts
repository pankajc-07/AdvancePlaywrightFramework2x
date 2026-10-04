import { log } from "node:console";

/*
1. Reverse a String (Using a Loop)
Problem Statement: Write a TypeScript function that takes a string and returns it in reverse order using a loop, without using .reverse().

Example 1:
Input: "playwright"
Output: "thgiryalp"
*/
function reverseString(str: String): String {
    let reverced = "";

    for (let i = str.length - 1; i >= 0; i--) {
        reverced += str[i];
    }
    return reverced;
}

console.log(`Reverced string : ${reverseString("playwright")}`);
console.log("**********************************");

/*
2. Count Specific Character Frequency
Problem Statement: Write a TypeScript function that counts how many times a specific target character appears in a string.

Example 1:
Input: str = "javascript", char = "a"
Output: 2
*/
function countCharecter(str: String, targer: string): number {
    let count = 0;
    for (let i = 0; i <= str.length; i++) {
        if (str[i] === targer) {
            count++;
        }
    }
    return count;
}

console.log(countCharecter('automation', 'a'));
console.log(countCharecter('javascript', 'a'));
console.log("**********************************");

/*
3. Remove All Spaces from a String
Problem Statement: Write a TypeScript function that removes all white spaces from a given string using a loop.

Example 1:
Input: "playwright test automation"
Output: "playwrighttestautomation"
*/
function removeSpaces(str: String): string {
    let result = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] !== " ") {
            result += str[i];
        }
    }
    return result;
}

console.log(removeSpaces("playwright test automation"));
console.log("**********************************");

/*
4. Toggle Case of Each Character
Problem Statement: Write a TypeScript function that swaps the case of each character in a string (convert lowercase to uppercase and uppercase to lowercase).

Example 1:
Input: "Playwright"
Output: "pLAYWRIGHT"
*/
function toggleCase(str: String): String {
    let toggled = "";

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === char.toUpperCase()) {
            toggled += char.toLowerCase();
        } else {
            toggled += char.toUpperCase();
        }
    }
    return toggled;
}

console.log(toggleCase("Playwright"));
console.log("**********************************");

/*
5. Count Words in a Sentence
Problem Statement: Write a TypeScript function that counts the number of words in a sentence by counting spaces (assuming words are separated by a single space).

Example 1:
Input: "Hello Playwright Test Automation"
Output: 4
*/
function countWords(str: string): number {
    const trimmed = str.trim();

    if (trimmed.length === 0) return 0;

    let spaces = 0;
    for (let i = 0; i < trimmed.length; i++) {
        if (trimmed[i] === " ") {
            spaces++;
        }
    }
    return spaces + 1;
}

console.log(countWords("Hello Playwright Test Automation"));
console.log("**********************************");

/*
6. Replace a Character Manually
Problem Statement: Write a TypeScript function that replaces all occurrences of a specific old character with a new character, without using replaceAll() or replace().

Example 1:
Input: str = "hello world", oldChar = "l", newChar = "z"
Output: "hezzo worzd"
*/
function replaceChar(str: string, oldChar: string, newChar: string): string {
    let result = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] === oldChar) {
            result += newChar;
        } else {
            result += str[i];
        }
    }
    return result;
}

console.log(replaceChar("hello world", "l", "z"));
console.log("**********************************");

/*
7. Find the First Non-Repeating Character
Problem Statement: Write a TypeScript function that finds the first character in a string that does not repeat anywhere else in the string. Return the character, or an empty string if none exists.

Example 1:
Input: "swiss"
Output: "w"
*/
function firtNonoRepeatingChar(str: string): string {
    for (let i = 0; i < str.length; i++) {

        let isUnique = true;
        for (let j = 0; j < str.length; j++) {
            if (i !== j && str[i] === str[j]) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            return str[i];
        }
    }
    return "";
}

console.log(firtNonoRepeatingChar("swiss"));
console.log("**********************************");

/*
8. Check if a String Contains a Substring (Manual Search)
Problem Statement: Write a TypeScript function that checks if a target substring exists inside a main string, returning a boolean (without using includes() or indexOf()).

Example 1:
Input: main = "automation testing", sub = "test"
Output: true
*/
function containsSubstring(main: string, sub: string): boolean {
    if (sub === "") return true;
    if (sub.length > main.length) return false;

    for (let i = 0; i <= main.length - sub.length; i++) {
        let match = true;
        for (let j = 0; j < sub.length; j++) {
            if (main[i + j] !== sub[j]) {
                match = false;
                break;
            }
        }
        if (match) return true;
    }
    return false;
}

console.log(containsSubstring("automation testing", "test"));
console.log("**********************************");

/*
9. Find the Longest Word in a Sentence
Problem Statement: Write a TypeScript function that finds and returns the longest word in a sentence string.

Example 1:
Input: "Playwright is a fantastic framework"
Output: "framework
*/
function findLongestWord(str: string): string {
    let currentWord = "";
    let longestWord = "";

    for (let i = 0; i <= str.length; i++) {
        if (i < str.length && str[i] !== " ") {
            currentWord += str[i];
        } else {
            if (currentWord.length > longestWord.length) {
                longestWord = currentWord;
            }
            currentWord = "";
        }
    }
    return longestWord;
}

console.log(findLongestWord("Playwright is a fantastic frameworksss"));
console.log("**********************************");

/*
10. Capitalize the First Letter of Each Word
Problem Statement: Write a TypeScript function that capitalizes the first letter of every word in a sentence.

Example 1:
Input: "playwright test automation"
Output: "Playwright Test Automation"
*/
function capitalizeWords(str: string): string {
    if (str.length === 0) return "";

    let result = "";
    let capitalizeNext = true;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === " ") {
            result += " ";
            capitalizeNext = true;
        } else if (capitalizeNext) {
            result += char.toUpperCase();
            capitalizeNext = false;
        } else {
            result += char;
        }
    }
    return result;
}

console.log(capitalizeWords("playwright test automation")); // "Playwright Test Automation"

