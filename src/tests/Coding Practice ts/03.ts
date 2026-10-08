import { log } from "node:console";

/*
1. Check if Two Strings are Anagrams
Problem Statement: Write a TypeScript function that checks if two strings are anagrams of each other (contain the exact same characters in any order). Return a boolean.

Example 1:
Input: str1 = "listen", str2 = "silent"
Output: true
*/
function areAnagrams(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;

    const count: Record<string, number> = {};

    for (let i = 0; i < str1.length; i++) {
        const char = str1[i];
        count[char] = (count[char] || 0) + 1;
    }

    for (let i = 0; i < str2.length; i++) {
        const char = str2[i];
        if (!count[char]) {
            return false;
        }
        count[char]--;
    }
    return true;
}

console.log(areAnagrams("listen", "silent"));
console.log("************************************");

/*
2. Basic String Compression (Run-Length Encoding)
Problem Statement: Write a TypeScript function that performs basic string compression using the counts of repeated characters.

Example 1:
Input: "aabcccccaaa"
Output: "a2b1c5a3"
*/
function compressString(str: string): string {
    if (str.length === 0) return "";

    let compressed = "";
    let count = 1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            compressed += str[i] + count;
            count = 1;
        }
    }
    return compressed;
}

console.log(compressString("aabcccccaaa"));
console.log("************************************");

/*
3. Remove Consecutive Duplicate Characters
Problem Statement: Write a TypeScript function that removes adjacent duplicate characters from a string.

Example 1:
Input: "aabbccdde"
Output: "abcde"
*/
function removeConsicativeDuplicates(str: string): string {
    if (str.length === 0) return "";

    let result = str[0];
    for (let i = 1; i < str.length; i++) {
        if (str[i] !== str[i - 1]) {
            result += str[i]
        }
    }
    return result;
}

console.log(removeConsicativeDuplicates("aabbccdde"));
console.log("************************************");

/*
4. Check if String is a Rotation of Another
Problem Statement: Write a TypeScript function that checks if one string is a rotation of another string.

Example 1:
Input: str1 = "waterbottle", str2 = "erbottlewat"
Output: true"
*/
function isRotation(str1: string, str2: string): boolean {
    if (str1.length !== str2.length || str1.length === 0) return false;

    const combined = str1 + str2;
    return combined.includes(str2);
}

console.log(isRotation("waterbottle", "erbottlewat"));
console.log("************************************");

/*
5. Find the Most Frequent Character
Problem Statement: Write a TypeScript function that finds and returns the character that appears most frequently in a string.

Example 1:
Input: "programming"
Output: "r"
*/
function mostFrequestChar(str: string): string {
    const frequency: Record<string, number> = {}
    let maxChar = ""
    let maxCount = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        frequency[char] = (frequency[char] || 0) + 1;

        if (frequency[char] > maxCount) {
            maxCount = frequency[char];
            maxChar = char
        }
    }
    return maxChar;
}

console.log(mostFrequestChar("programming"));
console.log("************************************");

/*
6. Truncate a String
Problem Statement: Write a TypeScript function that truncates a string if it is longer than a specified maximum length, appending "..." to the end.

Example 1:
Input: str = "Playwright Framework", maxLength = 10
Output: "Playwri..."
*/
function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    }

    let truncated = "";
    for (let i = 0; i < maxLength; i++) {
        truncated += str[i]
    }
    return truncated + "...";
}

console.log(truncateString('Playwright Framework', 10));
console.log("************************************");

/*
7. Check if String Has All Unique Characters
Problem Statement: Write a TypeScript function that determines if a string has all unique characters (no character repeats).

Example 1:
Input: "playwright"
Output: true
*/
function hasUniqueChars(str: string): boolean {
    const seen: Record<string, boolean> = {};

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (seen[char]) {
            return false;
        }
        seen[char] = true;
    }
    return true;
}

console.log(hasUniqueChars("playwright"));
console.log(hasUniqueChars("hello"));
console.log("************************************");

/*
8. Manual Implementation of indexOf (Substring Match)
Problem Statement: Write a TypeScript function that finds the starting index of the first occurrence of a substring within a main string, without using built-in methods like indexOf(). Return -1 if not found.

Example 1:
Input: main = "automation", target = "mat"
Output: 4
*/
function manulIndexOf(main: string, target: string): number {
    if (target === "") return 0;
    if (target.length > main.length) return -1;

    for (let i = 0; i <= main.length - target.length; i++) {
        let match = true;
        for (let j = 0; j < target.length; j++) {
            if (main[i + j] !== target[j]) {
                match = false;
                break;
            }
        }
        if (match) return i;
    }
    return -1;
}

console.log(manulIndexOf("automation", "mat"));
console.log("************************************");

/*
9. Reverse Each Word in a Sentence
Problem Statement: Write a TypeScript function that reverses each individual word in a sentence while keeping their original word order intact.

Example 1:
Input: "hello world"
Output: "olleh dlrow"
*/
function reverseEachWord(sentence: string): string {
    let currentWord = "";
    let result = "";

    for (let i = 0; i <= sentence.length; i++) {
        if (i < sentence.length && sentence[i] !== " ") {
            currentWord += sentence[i];
        } else {
            let reverseWord = "";
            for (let j = currentWord.length - 1; j >= 0; j--) {
                reverseWord += currentWord[j];
            }
            result += reverseWord;
            if (i < sentence.length) {
                result += " ";
            }
            currentWord = "";
        }
    }
    return result;
}

console.log(reverseEachWord("hello world"));
console.log("************************************");

/*
10. Count Character Types (Uppercase, Lowercase, Digits, Special)
Problem Statement: Write a TypeScript function that counts the number of uppercase letters, lowercase letters, digits, and special characters in a string.

Example 1:
Input: "Test1234!"
Output: { uppercase: 1, lowercase: 3, digits: 4, special: 1 }
*/
function countCharacterTypes(str: string): { uppercase: number; lowercase: number; digits: number; special: number } {
    let uppercase = 0;
    let lowercase = 0;
    let digits = 0;
    let special = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char >= "A" && char <= "Z") {
            uppercase++;
        } else if (char >= "a" && char <= "z") {
            lowercase++;
        } else if (char >= "0" && char <= "9") {
            digits++;
        } else {
            special++;
        }
    }
    return { uppercase, lowercase, digits, special }
}

console.log(countCharacterTypes("Test1234!"));
// { uppercase: 1, lowercase: 3, digits: 4, special: 1 }
