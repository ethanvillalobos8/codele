'use client'

import { useEffect, useState } from 'react';

const programmingProblems = [
    {
        id: 1,
        description: "Write a program that prints 'Hello, World!' to the console.",
        partialCode: "print(_______)\n\n# Write your code here\n",
        tags: ["Basics", "Printing"]
    },
    {
        id: 2,
        description: "Given two integers, return their sum.",
        partialCode: "def sum(a, b):\n    return _______\n\n# Write your code here\n",
        input: "Two integers, a and b.",
        output: "The sum of a and b.",
        tags: ["Arithmetic", "Basics"]
    },
    {
        id: 3,
        description: "Given three integers, return the largest.",
        partialCode: "def maxOfThree(a, b, c):\n    return max(_______)\n\n# Write your code here\n",
        input: "Three integers, a, b, and c.",
        output: "The largest integer.",
        tags: ["Conditional", "Basics"]
    },
    {
        id: 4,
        description: "Count the number of vowels in a given string.",
        partialCode: "def countVowels(s):\n    vowels = 'aeiou'\n    count = 0\n    for char in s:\n        if char in vowels:\n            count += 1\n    return _______\n\n# Write your code here\n",
        input: "A string s.",
        output: "Number of vowels in s.",
        tags: ["String", "Looping"]
    },
    {
        id: 5,
        description: "Check whether a given string is a palindrome.",
        partialCode: "def isPalindrome(s):\n    return s == s[::-1]\n\n# Write your code here\n",
        input: "A string s.",
        output: "true if s is a palindrome, otherwise false.",
        tags: ["String", "Logic"]
    },
    {
        id: 6,
        description: "For each number from 1 to n, print 'Fizz' if it's divisible by 3, 'Buzz' if it's divisible by 5, 'FizzBuzz' if it's divisible by both, or the number itself if none of those conditions are true.",
        partialCode: "def fizzBuzz(n):\n    for i in range(1, n+1):\n        if i % 3 == 0 and i % 5 == 0:\n            print('FizzBuzz')\n        elif _______:\n            print('Fizz')\n        elif _______:\n            print('Buzz')\n        else:\n            print(i)\n\n# Write your code here\n",
        input: "An integer n.",
        output: "Strings or integers as per the FizzBuzz logic.",
        tags: ["Looping", "Conditionals"]
    },
    {
        id: 7,
        description: "Calculate the factorial of a given non-negative integer.",
        partialCode: "def factorial(n):\n    if n == 0:\n        return _______\n    else:\n        return n * factorial(n-1)\n\n# Write your code here\n",
        input: "A non-negative integer n.",
        output: "The factorial of n.",
        tags: ["Looping", "Recursion", "Mathematics"]
    },
    {
        id: 8,
        description: "Given an array of numbers, calculate the average.",
        partialCode: "def average(numbers):\n    total = sum(numbers)\n    count = len(numbers)\n    return _______\n\n# Write your code here\n",
        input: "An array of numbers.",
        output: "The average of the numbers.",
        tags: ["Array", "Arithmetic"]
    },
    {
        id: 9,
        description: "Implement a linear search algorithm to find a specific element in an array.",
        partialCode: "def linearSearch(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return _______\n    return -1\n\n# Write your code here\n",
        input: "An array of integers, and an integer target.",
        output: "The index of target in the array, or -1 if it's not present.",
        tags: ["Array", "Searching"]
    },
    {
        id: 10,
        description: "Reverse the given string.",
        partialCode: "def reverseString(s):\n    return _______\n\n# Write your code here\n",
        input: "A string s.",
        output: "The reverse of s.",
        tags: ["String", "Looping"]
    },
    {
        id: 11,
        description: "Given an array of integers, return the sum of its elements.",
        partialCode: "def sumArray(arr):\n    total = 0\n    for num in arr:\n        total += num\n    return _______\n\n# Write your code here\n",
        input: "An array of integers.",
        output: "The sum of the array elements.",
        tags: ["Array", "Looping"]
    },
    {
        id: 12,
        description: "Count the frequency of each character in a given string.",
        partialCode: "def charFrequency(s):\n    freq = {}\n    for char in s:\n        if char in freq:\n            freq[char] += 1\n        else:\n            freq[char] = 1\n    return _______\n\n# Write your code here\n",
        input: "A string s.",
        output: "A dictionary or map of characters and their frequencies.",
        tags: ["String", "HashMap"]
    },
    {
        id: 13,
        description: "Check if a given number is prime.",
        partialCode: "def isPrime(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return _______\n\n# Write your code here\n",
        input: "An integer n.",
        output: "true if n is prime, otherwise false.",
        tags: ["Mathematics", "Looping"]
    },
    {
        id: 14,
        description: "Determine if a given year is a leap year.",
        partialCode: "def isLeapYear(year):\n    if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n        return True\n    return _______\n\n# Write your code here\n",
        input: "An integer representing a year.",
        output: "true if it's a leap year, otherwise false.",
        tags: ["Conditional", "Basics"]
    },
    {
        id: 15,
        description: "Convert a binary number (as a string) to its decimal equivalent.",
        partialCode: "def binaryToDecimal(binary):\n    return int(_______, 2)\n\n# Write your code here\n",
        input: "A string representing a binary number.",
        output: "The decimal equivalent as an integer.",
        tags: ["String", "Mathematics"]
    },
    {
        id: 16,
        description: "Calculate the simple interest for given principal, rate, and time.",
        partialCode: "def simpleInterest(principal, rate, time):\n    return (principal * rate * time) / 100\n\n# Write your code here\n",
        input: "Three numbers: principal, rate of interest, and time.",
        output: "The calculated simple interest.",
        tags: ["Arithmetic", "Basics"]
    },
    {
        id: 17,
        description: "Check if a number is an Armstrong number.",
        partialCode: "def isArmstrong(n):\n    sum = 0\n    temp = n\n    while temp > 0:\n        digit = temp % 10\n        sum += digit ** 3\n        temp //= 10\n    return n == _______\n\n# Write your code here\n",
        input: "An integer n.",
        output: "true if n is an Armstrong number, otherwise false.",
        tags: ["Mathematics", "Looping"]
    },
    {
        id: 18,
        description: "Generate the Fibonacci series up to the nth term.",
        partialCode: "def fibonacci(n):\n    a, b = 0, 1\n    series = []\n    for _ in range(n):\n        series.append(a)\n        a, b = b, a + b\n    return _______\n\n# Write your code here\n",
        input: "An integer n.",
        output: "An array or list of the first n Fibonacci numbers.",
        tags: ["Looping", "Series"]
    },
    {
        id: 19,
        description: "Check if a number is a palindrome.",
        partialCode: "def isNumPalindrome(n):\n    return str(n) == str(n)[::-1]\n\n# Write your code here\n",
        input: "An integer n.",
        output: "true if n is a palindrome, otherwise false.",
        tags: ["Mathematics", "Logic"]
    },
    {
        id: 20,
        description: "Find the minimum and maximum elements in an array.",
        partialCode: "def findMinMax(arr):\n    return (min(arr), max(arr))\n\n# Write your code here\n",
        input: "An array of integers.",
        output: "A tuple or pair with the minimum and maximum values.",
        tags: ["Array", "Looping"]
    },
    {
        id: 21,
        description: "Convert temperature from Fahrenheit to Celsius and vice versa.",
        partialCode: "def convertTemperature(temp, unit):\n    if unit == 'Celsius':\n        return (temp * 9/5) + 32\n    elif unit == 'Fahrenheit':\n        return (temp - 32) * 5/9\n\n# Write your code here\n",
        input: "A number (temperature) and the unit to convert to.",
        output: "Converted temperature.",
        tags: ["Arithmetic", "Basics"]
    },
    {
        id: 22,
        description: "Given an array of integers, count the number of even and odd numbers.",
        partialCode: "def countEvenOdd(arr):\n    even, odd = 0, 0\n    for num in arr:\n        if num % 2 == 0:\n            even += 1\n        else:\n            odd += 1\n    return (even, odd)\n\n# Write your code here\n",
        input: "An array of integers.",
        output: "A pair or object with counts of even and odd numbers.",
        tags: ["Array", "Looping", "Conditionals"]
    },
    {
        id: 23,
        description: "Given the radius of a circle, calculate its area.",
        partialCode: "def circleArea(radius):\n    pi = 3.14159\n    return pi * radius ** 2\n\n# Write your code here\n",
        input: "A number representing the radius of the circle.",
        output: "The area of the circle.",
        tags: ["Mathematics", "Basics"]
    },
    {
        id: 24,
        description: "Sort an array of integers in ascending order.",
        partialCode: "def sortArray(arr):\n    arr.sort()\n    return arr\n\n# Write your code here\n",
        input: "An array of integers.",
        output: "The sorted array.",
        tags: ["Array", "Sorting"]
    },
    {
        id: 25,
        description: "Remove duplicate elements from an array.",
        partialCode: "def removeDuplicates(arr):\n    return list(set(arr))\n\n# Write your code here\n",
        input: "An array of integers.",
        output: "An array with duplicates removed.",
        tags: ["Array", "HashMap"]
    }
];

// Clear local storage for testing
// localStorage.clear();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getTodaysProblem(shuffledProblems) {
    const lastAccessDate = localStorage.getItem('lastAccessDate');
    const today = new Date().toDateString();

    if (lastAccessDate !== today) {
        let currentIndex = parseInt(localStorage.getItem('currentIndex'), 10);
        const todaysProblem = shuffledProblems[currentIndex];

        currentIndex = (currentIndex + 1) % shuffledProblems.length;
        localStorage.setItem('currentIndex', currentIndex.toString());
        localStorage.setItem('lastAccessDate', today);

        return todaysProblem;
    }

    const currentIndex = (parseInt(localStorage.getItem('currentIndex'), 10) - 1 + shuffledProblems.length) % shuffledProblems.length;
    return shuffledProblems[currentIndex];
}

function initializeProblems(problems) {
    const storedProblems = localStorage.getItem('shuffledProblems');
    if (!storedProblems) {
        const shuffledProblems = shuffleArray([...problems]);
        localStorage.setItem('shuffledProblems', JSON.stringify(shuffledProblems));
        localStorage.setItem('lastAccessDate', new Date().toDateString());
        localStorage.setItem('currentIndex', '0');
        return shuffledProblems;
    }
    return JSON.parse(storedProblems);
}

export const useTodaysProblem = () => {
    const [todaysProblem, setTodaysProblem] = useState(null);

    useEffect(() => {
        const shuffledProblems = initializeProblems(programmingProblems);
        setTodaysProblem(getTodaysProblem(shuffledProblems));
    }, []);

    return todaysProblem;
};

export let todaysProb = [];

export default function ProblemData() {
    const todaysProblem = useTodaysProblem();

    // Check if todaysProblem is not null
    if (!todaysProblem) {
        return <div className='mb-4'>Loading problem...</div>;
    }

    todaysProb = todaysProblem;

    return (
        <>
        </>
    );
}