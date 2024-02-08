'use client'

import { useEffect, useState } from 'react';

const programmingProblems = [
    {
        id: 1,
        description: "Write a function that finds and returns the largest number in a list.",
        providedCode: 
        "# This function is designed to find the largest number in a list, but it has two bugs. Can you fix them?\ndef find_largest(numbers):\n    largest = numbers[0]\n    for i in range(len(numbers)):\n        if largest < numbers[i]:\n            largest = i\n    return largest",
        correctCode: "def find_largest(numbers):\n    largest = numbers[0]\n    for number in numbers:\n        if largest < number:\n            largest = number\n    return largest",
        input: "A list of numbers.",
        output: "The largest number in the list.",
        tags: ["Lists", "Loop"]
    },      
    {
        id: 2,
        description: "Write a function that reverses a string.",
        providedCode: 
        "# This function is supposed to reverse a string, but it has one bug. Can you find and fix it?\ndef reverse_string(s):\n    return s[:1]",
        correctCode: "def reverse_string(s):\n    return s[::-1]",
        input: "A string.",
        output: "The reversed string.",
        tags: ["String", "Slicing"]
    },    
    {
        id: 3,
        description: "Write a function to calculate the factorial of a number.",
        providedCode: 
        "# This function is intended to calculate the factorial of a number, but it contains two bugs. Can you identify and correct them?\ndef factorial(n):\n    if n == 0:\n        return 0\n    else:\n        return n * factorial(n-1)",
        correctCode: "def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    else:\n        return n * factorial(n-1)",
        input: "A non-negative integer.",
        output: "The factorial of the number.",
        tags: ["Recursion", "Math"]
    },      
    {
        id: 4,
        description: "Write a function to check if a number is a prime number.",
        providedCode: 
        "# This function aims to check if a number is prime, but it has two bugs. Can you fix them?\ndef is_prime(num):\n    if num < 2:\n        return False\n    for i in range(2, num):\n        if num % i == 0:\n            return False\n    return True",
        correctCode: "def is_prime(num):\n    if num < 2:\n        return False\n    for i in range(2, int(num**0.5) + 1):\n        if num % i == 0:\n            return False\n    return True",
        input: "An integer.",
        output: "True if the number is prime, False otherwise.",
        tags: ["Math", "Loop"]
    },       
    {
        id: 5,
        description: "Write a function that returns the sum of all numbers in a range (inclusive).",
        providedCode: 
        "# This function should return the sum of all numbers in a given range, but it has one bug. Can you spot and fix it?\ndef sum_in_range(start, end):\n    total = 0\n    for i in range(start, end):\n        total += i\n    return total",
        correctCode: "def sum_in_range(start, end):\n    total = 0\n    for i in range(start, end + 1):\n        total += i\n    return total",
        input: "Two integers, representing the start and end of the range.",
        output: "The sum of all numbers in the range.",
        tags: ["Loop", "Math"]
    },      
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