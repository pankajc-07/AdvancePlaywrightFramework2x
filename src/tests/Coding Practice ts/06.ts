function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) return [map.get(diff)!, i];
        map.set(nums[i], i);
    }
    return [];
}

console.log(twoSum([2, 3, 5, 8, 9, 7], 5));
console.log("**************************************************");

/*
1. Reverse a String
Problem Statement: Write a TypeScript function that takes a string and returns it reversed.
*/
function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

console.log(reverseString("typescript"));
console.log("**************************************************");

/*
2. Palindrome Check
Problem Statement: Write a function to check if a string is a palindrome (reads the same forwards and backwards), ignoring case and non-alphanumeric characters.
*/
function isPalindrome(str: string): boolean {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reverced = cleaned.split('').reverse().join('');
    return cleaned === reverced;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log("**************************************************");

/*
3. First Non-Repeating Character
Problem Statement: Given a string, find the index of the first non-repeating character. Return -1 if all characters repeat.
*/
function firstNonReapeatingChar(str: string): number {
    const charCount: { [key: string]: number } = {};

    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (let i = 0; i < str.length; i++) {
        if (charCount[str[i]] === 1) {
            return i;
        }
    }
    return -1;
}

console.log(firstNonReapeatingChar("swiss"));
console.log("**************************************************");

/*
4. Valid Anagram
Problem Statement: Given two strings, write a function to determine if they are anagrams of each other (contain the exact same characters with the same frequencies).
*/
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const sortStr = (str: string) => str.split('').sort().join('');
    return sortStr(s) === sortStr(t);
}

console.log(isAnagram("listen", "silent")); // true
console.log("**************************************************");

/*
5. Longest Substring Without Repeating Characters
Problem Statement: Find the length of the longest substring without repeating characters in a given string.
*/
function lengthOfLongestString(s: string): number {
    let maxLength = 0;
    let left = 0;
    const seen = new Set<string>();

    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
console.log(lengthOfLongestString("abcabcbb"));
console.log("**************************************************");

/*
6. Basic String Compression
Problem Statement: Implement a method for basic string compression using the counts of repeated characters (e.g., "aabcccccaaa" becomes "a2b1c5a3"). If the compressed string is not shorter than the original, return the original string.
*/
function compressString(str: string): string {
    let compressed: string[] = [];
    let count = 0;

    for (let i = 0; i < str.length; i++) {
        count++;
        if (i + 1 >= str.length || str[i] !== str[i + 1]) {
            compressed.push(str[i] + count);
            count = 0;
        }
    }

    const result = compressed.join('');
    return result.length < str.length ? result : str;
}

// Example usage:
console.log(compressString("aabcccccaaa")); // "a2b1c5a3"
console.log("**************************************************");

/*
7. Capitalize Words
Problem Statement: Write a function that capitalizes the first letter of each word in a sentence.
*/
function capitalizeWords(sentence: string): string {
    return sentence
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Example usage:
console.log(capitalizeWords("hello typescript world")); // "Hello Typescript World"
console.log("**************************************************");

/*
8. Check String Rotation
Problem Statement: Given two strings, write a function to check if str2 is a rotation of str1 (e.g., "waterbottle" is a rotation of "erbottlewat").
*/
function isRotation(str1: string, str2: string): boolean {
    if (str1.length !== str2.length || str1.length === 0) return false;
    const concatenated = str1 + str1;
    return concatenated.includes(str2);
}

// Example usage:
console.log(isRotation("waterbottle", "erbottlewat")); // true
console.log("**************************************************");

/*
9. Longest Common Prefix
Problem Statement: Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.
*/
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }

    return prefix;
}

// Example usage:
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log("**************************************************");

/*
10. Count Vowels and Consonants
Problem Statement: Write a function that counts and returns the total number of vowels and consonants in a given string.
*/
function countVowelsAndConsonants(str: string): { vowels: number; consonants: number } {
    const vowels = str.toLowerCase().match(/[aeiou]/g);
    const consonants = str.toLowerCase().match(/[b-df-hj-np-tv-z]/g);

    return {
        vowels: vowels ? vowels.length : 0,
        consonants: consonants ? consonants.length : 0
    };
}

// Example usage:
console.log(countVowelsAndConsonants("TypeScript")); // { vowels: 2, consonants: 8 }

