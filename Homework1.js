/*
    Homework 1: String Arithmetic Operations
    Deadline: April 4th
    Task:
    Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions, considering only positive integers (negative numbers can be avoided, as all numbers will be positive integers).

    Functions to Implement:
    String.plus(string): This function should take another string as input and return the result of adding the two strings together.
    String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. Note that the first parameter will always be greater than the second parameter.
    String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.
    String.multiply(string): This function should take another string as input and return the result of multiplying the two strings together.

    Constraints:
    All input and output numbers will be positive integers.
    For subtraction, ensure that the first parameter is always greater than the second parameter.
    Division should only result in an integer value. 
*/

/**
 * Replaces a character at a specified index in the string with the given replacement character.
 * @memberof String.prototype
 * @function replaceAt
 * @param {number} index - The index at which to replace the character.
 * @param {string} replacement - The replacement character or substring.
 * @returns {string} A new string with the specified character replaced.
 */
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

/**
 * Checks if the current string (as positive integer) is greater than or equal to another string (as positive integer).
 * @memberof String.prototype
 * @function isGreaterOrEqualThan
 * @param {string} other - The string to compare against.
 * @returns {boolean} `true` if the current string is greater than or equal to `other`, otherwise `false`.
 */
String.prototype.isGreaterOrEqualThan = function (other) {
    if (this.length > other.length) return true;
    if (this.length < other.length) return false;
    for (let i = 0; i < this.length; i++) {
        if (this[i] > other[i]) return true;
        if (this[i] < other[i]) return false;
    }
    return true;
}


/**
 * Check if a string only contains zeros
 * @memberof String.prototype
 * @function onlyZeros
 * @returns {boolean} A boolean indicating if the string contains only zeros or not
 */
String.prototype.onlyZeros = function () {
    for (let i = 0; i < this.length; i++) {
        if (this[i] != 0) return false;
    }
    return true
}

/**
 * Adds another positive integer string to the current string.
 * @memberof String.prototype
 * @function plus
 * @param {string} other - The string to add to the current string.
 * @returns {string} The result of adding the two strings together as a string.
 */
String.prototype.plus = function (other) {
    let result = ''
    let i = this.length - 1
    let j = other.length - 1
    let carry = 0
    while (i >= 0 || j >= 0) {
        let numOne = i >= 0 ? parseInt(this[i]) : 0
        let numTwo = j >= 0 ? parseInt(other[j]) : 0
        let sum = numOne + numTwo + carry
        carry = sum >= 10 ? 1 : 0
        result = result.concat((sum % 10).toString())
        i--
        j--
    }
    if (carry != 0) {
        result = result.concat("1")
    }
    return result.split("").reverse().join("")
}

/**
 * Subtracts another positive integer string from the current string.
 * @memberof String.prototype
 * @function minus
 * @param {string} other - The string to subtract from the current string.
 * @returns {string} The result of subtracting the `other` string from the current string as a string.
 */
String.prototype.minus = function (other) {
    let thisCopy = `${this}`
    let result = ''
    let i = thisCopy.length - 1
    let j = other.length - 1
    while (i >= 0 || j >= 0) {
        let numOne = i >= 0 ? parseInt(thisCopy[i]) : 0
        let numTwo = j >= 0 ? parseInt(other[j]) : 0
        if (numOne < numTwo) {
            let temp = i - 1
            while (temp >= 0) {
                if (thisCopy[temp] > 0) {
                    thisCopy = thisCopy.replaceAt(temp, thisCopy[temp] - 1)
                    numOne = numOne + 10
                    temp++
                    while (temp < i) {
                        thisCopy = thisCopy.replaceAt(temp, 9)
                        temp++
                    }
                    break
                } else {
                    temp--
                }
            }
            if (numOne < numTwo) {
                console.error("Error: number one is smaller than the second number")
                return
            } else {
                while (temp < i) {
                    this[temp] == 9
                }
            }
        }
        let min = numOne - numTwo
        result = result.concat(min.toString())
        i--
        j--
    }
    return result.split("").reverse().join("").replace(/^0+(?=\d+$)/, "");
}

/**
 * Multiplies the current string by another positive integer string.
 * @memberof String.prototype
 * @function multiply
 * @param {string} other - The string to multiply with the current string.
 * @returns {string} The result of multiplying the two strings together as a string.
 */
String.prototype.multiply = function (other) {
    let result = '0'
    let shift = ''

    for (let i = this.length - 1; i >= 0; i--) {
        let carry = 0
        let temp = ''

        for (let j = other.length - 1; j >= 0; j--) {
            let product = parseInt(this[i]) * parseInt(other[j]) + carry
            temp = (product % 10) + temp
            carry = Math.floor(product / 10)
        }

        if (carry > 0) temp = carry + temp
        temp += shift
        result = result.plus(temp)
        shift += '0'
    }
    return result
}

/**
 * Divides the current string by another positive integer string and returns only the quotient.
 * @memberof String.prototype
 * @function divide
 * @param {string} other - The string to divide the current string by.
 * @returns {string} The quotient of dividing the current string by `other` as a string.
 */
String.prototype.divide = function (divisor) {
    if (divisor.onlyZeros()) {
        console.error("Error: Cannot divide by zero")
        return
    }

    let dividend = this.toString()
    divisor = divisor.toString()

    if (!dividend.isGreaterOrEqualThan(divisor)) {
        return '0'
    }

    let quotient = ''
    let currentDividend = ''

    for (let i = 0; i < dividend.length; i++) {
        currentDividend += dividend[i]
        currentDividend = currentDividend.replace(/^0+/, '') || '0'

        if (currentDividend.isGreaterOrEqualThan(divisor)) {
            let count = 0
            while (currentDividend.isGreaterOrEqualThan(divisor)) {
                currentDividend = (currentDividend).minus(divisor)
                count++
            }
            quotient += count.toString()
        } else {
            quotient += '0'
        }
    }

    return quotient.replace(/^0+/, '') || '0'
}

//Usages
console.log("Divide demo usages:");
console.log("1/10 =", "1".divide("10"));
console.log("129894/13 =", "129894".divide("13"));
console.log("4444444444444444444444444444444440000000000000000000000000000000/2 =", "4444444444444444444444444444444440000000000000000000000000000000".divide("2"));
console.log("2222222222222222222222222222222222222222222222000 / 2222222222222222222222222222222222222222222222=", "2222222222222222222222222222222222222222222222000".divide("2222222222222222222222222222222222222222222222"));
console.log("222222222222222222222222222222222222222222222000 / 222222222222222222222222222222222222222222222=", "222222222222222222222222222222222222222222222000".divide("222222222222222222222222222222222222222222222"));
console.log("22222222222222222222222222222222222222222222000 / 22222222222222222222222222222222222222222222=", "22222222222222222222222222222222222222222222000".divide("22222222222222222222222222222222222222222222"));
console.log("2222222222222222222222222222222222222222222000 / 2222222222222222222222222222222222222222222=", "2222222222222222222222222222222222222222222000".divide("2222222222222222222222222222222222222222222"));
console.log("222222222222222222222222222222222222222222000 / 222222222222222222222222222222222222222222=", "222222222222222222222222222222222222222222000".divide("222222222222222222222222222222222222222222"));
console.log("2222222222222222222222222222222222222222000 / 2222222222222222222222222222222222222222=", "22222222222222222222222222222222222222222000".divide("22222222222222222222222222222222222222222"));
console.log("222222222222222222222222222222222222222000 / 222222222222222222222222222222222222222=", "2222222222222222222222222222222222222222000".divide("2222222222222222222222222222222222222222"));
console.log("22222222222222222222222222222222222222000 / 22222222222222222222222222222222222222=", "222222222222222222222222222222222222222000".divide("222222222222222222222222222222222222222"));
console.log("2222222222222222222222222222222222222000 / 2222222222222222222222222222222222222=", "22222222222222222222222222222222222222000".divide("22222222222222222222222222222222222222"));
console.log("222222222222222222222222222222222222000 / 222222222222222222222222222222222222=", "2222222222222222222222222222222222222000".divide("2222222222222222222222222222222222222"));
console.log("22222222222222222222222222222222222000 / 22222222222222222222222222222222222=", "222222222222222222222222222222222222000".divide("222222222222222222222222222222222222"));
console.log("2222222222222222222222222222222222000 / 2222222222222222222222222222222222=", "22222222222222222222222222222222222000".divide("22222222222222222222222222222222222"));
console.log("222222222222222222222222222222222000 / 222222222222222222222222222222222=", "2222222222222222222222222222222222000".divide("2222222222222222222222222222222222"));
console.log("22222222222222222222222222222222000 / 22222222222222222222222222222222=", "222222222222222222222222222222222000".divide("222222222222222222222222222222222"));
console.log("1/0 =", "1".divide("0"));

console.log("Multiply demo usages:");
console.log("89555*1000001 =", "89555".multiply("1000001"));
console.log("1*1 =", "1".multiply("1"));
console.log("111111111111111*2222222222222 =", "111111111111111".multiply("2222222222222"));

console.log("Plus demo usages:");
console.log("895235252355+3252353325 =", "895235252355".plus("3252353325"));
console.log("1+1 =", "1".plus("1"));
console.log("1111111111111112222223333334444444444444+2222222222222 =", "1111111111111112222223333334444444444444".plus("2222222222222"));

console.log("Minus demo usages:");
console.log("89555-1000001 =", "89555".minus("1000001"));
console.log("1-1 =", "1".minus("1"));
console.log("1111111111111112222223333334444444444444-4323532523523532532532432 =", "1111111111111112222223333334444444444444".minus("4323532523523532532532432"));