import { ar } from "@faker-js/faker";

/*
1. Move All Zeros to the End
Problem Statement: Write a TypeScript function that takes an array of numbers and moves all 0s to the end while maintaining the relative order of the non-zero elements. Modify or return a new array.

Example 1:
Input: [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
*/
function moveZeroToEnd(arr: number[]): number[] {
    const result: number[] = [];
    let zeroCount = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            result.push(arr[i]);
        } else {
            zeroCount++;
        }
    }

    for (let i = 0; i < zeroCount; i++) {
        result.push(0);
    }

    return result;
}

console.log(moveZeroToEnd([0, 1, 0, 3, 12]));
console.log("****************************************************");

/*
2. Check if an Array is Sorted
Problem Statement: Write a TypeScript function that checks if an array of numbers is sorted in ascending order. Return a boolean.

Example 1:
Input: [1, 2, 3, 4, 5]
Output: true
*/
function isSortedAscending(arr: number[]): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

console.log(isSortedAscending([1, 2, 3, 4, 5])); // true
console.log(isSortedAscending([1, 3, 2, 4, 5])); // false
console.log("****************************************************");

/*
3. Find the Second Largest Element
Problem Statement: Write a TypeScript function that finds and returns the second largest number in an array of numbers.

Example 1:
Input: [10, 20, 4, 45, 99]
Output: 45
*/
function findSecondLargest(arr: number[]): number {
    if (arr.length < 2) throw new Error('Array must have atleat 2 elements');

    let max = -Infinity;
    let secondMax = - Infinity;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            secondMax = max;
            max = arr[i];
        } else if (arr[i] > secondMax && arr[i] !== max) {
            secondMax = arr[i];
        }
    }
    return secondMax;
}

console.log(findSecondLargest([10, 20, 4, 45, 99])); // 45
console.log("****************************************************");

/*
4. Find the Missing Number in an Array (1 to N)
Problem Statement: Write a TypeScript function that finds the missing number in a given array containing distinct numbers from 1 to n.

Example 1:
Input: arr = [1, 2, 4, 5], n = 5
Output: 3
*/
function missingNumber(arr: number[], n: number): number {
    const expectedSum = (n * (n + 1)) / 2;
    let actualSum = 0;

    for (let i = 0; i < arr.length; i++) {
        actualSum += arr[i];
    }

    return expectedSum - actualSum;
}

console.log(missingNumber([1, 2, 4, 5], 6)); // 3
console.log("****************************************************");

/*
5. Rotate Array Left by One Position
Problem Statement: Write a TypeScript function that rotates an array's elements to the left by one position (the first element moves to the end).

Example 1:
Input: [1, 2, 3, 4, 5]
Output: [2, 3, 4, 5, 1]
*/
function rotateLeftByOne(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const firstElement = arr[0];

    for (let i = 0; i < arr.length - 1; i++) {
        arr[i] = arr[i + 1];
    }

    arr[arr.length - 1] = firstElement;

    return arr;
}

console.log(rotateLeftByOne([1, 2, 3, 4, 5])); // [2, 3, 4, 5, 1]
console.log("****************************************************");

/*
6. Maximum Consecutive Ones in a Binary Array
Problem Statement: Write a TypeScript function that returns the maximum number of consecutive 1s present in a binary array.

Example 1:
Input: [1, 1, 0, 1, 1, 1, 0, 1]
Output: 3
*/
function findMaxConsecutiveOnes(arr: number[]): number {
    let maxCount = 0;
    let currentCount = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 1) {
            currentCount++;
            if (currentCount > maxCount) {
                maxCount = currentCount;
            }
        } else {
            currentCount = 0;
        }
    }

    return maxCount;
}

console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1, 0, 1])); // 3
console.log("****************************************************");

/*
7. Check if Array Contains Duplicate Elements
Problem Statement: Write a TypeScript function that checks if any value appears at least twice in an array. Return true if duplicates exist, otherwise false (without using Set).

Example 1:
Input: [1, 2, 3, 1]
Output: true
*/
function containsDuplicates(arr: number[]): boolean {
    const seen: Record<number, boolean> = {};

    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        if (seen[num]) {
            return true;
        }
        seen[num] = true;
    }
    return false;
}

console.log(containsDuplicates([1, 2, 3, 1])); // true
console.log(containsDuplicates([1, 2, 3, 4])); // false
console.log("****************************************************");

/*
8. Find Intersection (Common Elements) of Two Arrays
Problem Statement: Write a TypeScript function that takes two arrays and returns a new array containing unique elements found in both arrays.

Example 1:
Input: arr1 = [1, 2, 2, 1], arr2 = [2, 2]
Output: [2]
*/
function findIntersection(arr1: number[], arr2: number[]): number[] {
    const intersection: number[] = [];

    for (let i = 0; i < arr1.length; i++) {
        const current = arr1[i];
        // Check if it exists in arr2 and is not already added to intersection
        let existsInArr2 = false;
        for (let j = 0; j < arr2.length; j++) {
            if (arr2[j] === current) {
                existsInArr2 = true;
                break;
            }
        }

        let alreadyAdded = false;
        for (let k = 0; k < intersection.length; k++) {
            if (intersection[k] === current) {
                alreadyAdded = true;
                break;
            }
        }

        if (existsInArr2 && !alreadyAdded) {
            intersection.push(current);
        }
    }
    return intersection;
}

console.log(findIntersection([1, 2, 2, 1], [2, 2])); // [2]
console.log("****************************************************");

/*
9. Find the Single Non-Duplicate Number
Problem Statement: Write a TypeScript function where every element in an array appears twice except for one. Find that single element.

Example 1:
Input: [4, 1, 2, 1, 2]
Output: 4
*/
function singleNumber(arr: number[]): number {
    const counts: Record<number, number> = {};

    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        counts[num] = (counts[num] || 0) + 1;
    }

    for (const key in counts) {
        if (counts[key] === 1) {
            return Number(key);
        }
    }
    return -1;
}

console.log(singleNumber([4, 1, 2, 1, 2])); // 4
console.log("****************************************************");

/*
10. Two Sum (Basic Core Logic Search)
Problem Statement: Write a TypeScript function that takes an array of numbers and a target value, returning the indices of the two numbers that add up to the target.

Example 1:
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
*/
function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
