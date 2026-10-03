import { log } from "console";

/*
1. Reverse an Array (Using a Loop)
Problem Statement: Write a TypeScript function that takes an array of numbers and returns a new array with the elements in reverse order, using a loop instead of the built-in reverse() method.

Example 1:
Input: [10, 20, 30]
Output: [30, 20, 10]
*/
function reverseArray(arr: number[]): number[] {
    const reverced: number[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reverced.push(arr[i]);
    }
    return reverced;
}

console.log(reverseArray([10, 20, 30]));
console.log("**********************************");

/*
2. Find the Maximum Element (Using a Loop)
Problem Statement: Write a TypeScript function that finds and returns the largest number in an array without using Math.max().

Example 1:
Input: [5, 12, 3, 9, 22]
Output: 22
*/
function findMax(arr: number[]): number {
    if (arr.length === 0) throw new Error("Array is empty");

    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
console.log(findMax([5, 12, 3, 91, 21]));
console.log("**********************************");

/*
3. Count Even and Odd Numbers in an Array
Problem Statement: Write a TypeScript function that takes an array of integers and counts how many numbers are even and how many are odd. Return an object with the counts.

Example 1:
Input: [1, 2, 3, 4, 5]
Output: { even: 2, odd: 3 }
*/
function countEvenOdd(arr: number[]): { even: number; odd: number } {
    let evenCount = 0;
    let oddCount = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            evenCount++;
        } else {
            oddCount++
        }
    }
    return { even: evenCount, odd: oddCount };
}
console.log(countEvenOdd([1, 2, 3, 4, 5, 6, 7]));
console.log("**********************************");

/*
4. Count Vowels in a String (Manual Character Check)
Problem Statement: Write a TypeScript function that counts the number of vowels (a, e, i, o, u) in a string by manually checking each character in a loop.

Example 1:
Input: "Playwright"
Output: 3
*/
function countVowels(str: string): number {
    let count = 0;
    const lowerStr = str.toLocaleLowerCase();

    for (let i = 0; i < lowerStr.length; i++) {
        const char = lowerStr[i];
        if (char === "a" || char === "e" || char === "i" || char === "o" || char === "o") {
            count++;
        }
    }
    return count;
}
console.log(countVowels("Playwright"));
console.log("**********************************");

/*
5. Sum of Array Elements (Using an Accumulator Loop)
Problem Statement: Write a TypeScript function that calculates the sum of all elements in an array using a standard for loop instead of reduce().

Example 1:
Input: [1, 2, 3, 4, 5]
Output: 15
*/
function sumArray(arr: number[]): number {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
console.log(sumArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log("**********************************");

/*
6. Check Palindrome String (Two-Pointer Logic)
Problem Statement: Write a TypeScript function to check if a string is a palindrome by comparing characters from the outside moving inwards, without using .reverse().

Example 1:
Input: "madam"
Output: true
*/
function isPalindrome(str: String): boolean {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(`Is Palindrome : ${isPalindrome("madam")}`);
console.log(`Is Palindrome : ${isPalindrome("hello")}`);
console.log("**********************************");

/*
7. Find Index of an Element (Linear Search)
Problem Statement: Write a TypeScript function that performs a linear search to find the index of a target string in an array. Return -1 if not found (do not use indexOf()).

Example 1:
Input: arr = ["button", "input", "dropdown"], target = "input"
Output: 1
*/
function linearSearch(arr: String[], target: string): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}
console.log(`Linaer search : ${linearSearch(["button", "input", "dropdown"], "input")}`);
console.log("**********************************");

/*
8. Merge Two Arrays (Manual Traversal)
Problem Statement: Write a TypeScript function that takes two arrays and combines them into a single array using loops, without using the spread operator (...) or concat().

Example 1:
Input: [1, 2], [3, 4]
Output: [1, 2, 3, 4]
*/
function mergeArrays(arr1: number[], arr2: number[]): number[] {
    const merged: number[] = [];

    for (let i = 0; i < arr1.length; i++) {
        merged.push(arr1[i]);
    }

    for (let j = 0; j < arr2.length; j++) {
        merged.push(arr2[j]);
    }
    return merged;
}
console.log(`Mearged array : ${mergeArrays([1, 2], [3, 4])}`);
console.log("**********************************");

/*
9. Remove Duplicates from an Array (Manual Lookup)
Problem Statement: Write a TypeScript function that removes duplicates from an array of numbers using a core logic check, without using Set.

Example 1:
Input: [1, 2, 2, 3, 4, 4, 5]
Output: [1, 2, 3, 4, 5]
*/
function removeDuplicates(arr: number[]): number[] {
    const unique: number[] = [];

    for (let i = 0; i < arr.length; i++) {
        let isDulicate = false;

        for (let j = 0; j < unique.length; j++) {
            if (arr[i] === unique[j]) {
                isDulicate = true;
                break;
            }
        }
        if (!isDulicate) {
            unique.push(arr[i])
        }
    }
    return unique;
}
console.log(`Removed duplicates: ${removeDuplicates([1, 2, 2, 3, 4, 4, 5])}`);
console.log("**********************************");

/*
10. Find Factorial of a Number (Using a Loop)
Problem Statement: Write a TypeScript function that calculates the factorial of a given non-negative integer using a for loop.

Example 1:
Input: 5
Output: 120
*/
function factorial(n: number): number {
    if (n < 0) throw new Error("Number must be non-negative");

    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
console.log(`Factorial of given number is : ${factorial(5)}`);
