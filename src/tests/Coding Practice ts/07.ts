/*
1. Integer Square Root (Binary Search Approach)
Problem Statement: Implement a function that calculates the integer square root of a given non-negative number without using built-in square root functions.
*/
function customSqrt(n: number): number {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return n;

    let low = 1;
    let high = n;
    let result = 0;

    while (low <= high) {
        let mid = (low + high) / 2 | 0;
        if (mid * mid === n) {
            return mid;
        }
        if (mid * mid < n) {
            result = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}

console.log(customSqrt(26));
/*
2. Power Function ($x^n$)Problem Statement: Write a function to calculate the power of a number (base raised to an exponent) without using Math.pow or the ** operator, supporting both positive and negative exponents.
*/
function customPower(base: number, exponant: number): number {
    if (exponant === 0) return 1;

    let result = 1;
    let absExp = exponant < 0 ? -exponant : exponant;

    for (let i = 0; i < absExp; i++) {
        result *= base;
    }

    return exponant < 0 ? 1 / result : result;
}

console.log(customPower(2, -3));