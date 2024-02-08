'use client'

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { fetchUserData } from '@/pages/api/fetch-data';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

import { IoIosStats } from "react-icons/io";

const Statistics = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const data = await fetchUserData();
                setUserData(data);
            } else {
                console.log("No user logged in");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (!userData) {
        return <div>Your stats will show up here after your first attempt submission.</div>;
    }

    // Calculating win percentage
    const winPercentage = userData.totalGamesPlayed > 0 ? (userData.wins / userData.totalGamesPlayed * 100).toFixed(2) : 0;

    // Chart userData.dailyAttempts from 1 - 6 decending
    const GuessDistributionChart = () => {
        if (!userData.dailyAttempts) {
            return <p>No guess data available.</p>;
        }

        const attemptFrequencies = new Array(6).fill(0);
        Object.values(userData.dailyAttempts).forEach(attempts => {
            if (attempts >= 1 && attempts <= 6) {
                attemptFrequencies[attempts - 1]++;
            }
        });

        const chartData = {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [
                {
                    data: attemptFrequencies,
                    backgroundColor: '#4c506a',
                },
            ],
        };

        // Cumulative sum of attemptFrequencies
        function cumulativeSum(attemptFrequencies) {
            for (let i = 0; i < 6; i++) {
                attemptFrequencies[i] += attemptFrequencies[i - 1] || 0;
                return attemptFrequencies;
            }
        }

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: cumulativeSum(attemptFrequencies),
                    ticks: {
                        display: false,
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    }
                },
                y: {
                    ticks: {
                        color: '#c2bed9',
                    },
                    grid: {
                        display: false,
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            animation: {
                duration: 0,
            },
        };

        return <Bar className="text-white drop-shadow-none" data={chartData} options={chartOptions} />;
    };

    return (
        <div className="flex-rows h-auto w-full mb-2 mt-4 shadow-md text-wrap overflow-auto">
            <h2 className="flex text-lg md:text-xl font-semibold text-[#f6f6f6] items-center py-2">Your Statistics<span className='ml-1 text-2xl text-[#55e088]'><IoIosStats /></span></h2>
            <div className="grid grid-cols-2 gap-1 text-[#f6f6f6] mb-4 h-full text-xs md:text-base">
                <div className='grid grid-cols-5 text-wrap'>
                    <p className='text-[#c2bed9] col-span-4'>Games Played:</p>
                    <span className="font-semibold text-[#f6f6f6]">{userData.totalGamesPlayed}</span>
                </div>
                <div className='grid grid-cols-5 text-wrap'>
                    <p className='text-[#c2bed9] col-span-4'>Win Percentage:</p>
                    <span className="font-semibold text-[#f6f6f6]">{Math.round(winPercentage)}%</span>    
                </div>
                <div className='grid grid-cols-5 text-wrap'>
                    <p className='text-[#c2bed9] col-span-4'>Current Win Streak:</p>
                    <span className="font-semibold text-[#f6f6f6]">{userData.currentStreak}</span>
                </div>
                <div className='grid grid-cols-5 text-wrap'>
                    <p className='text-[#c2bed9] col-span-4'>Maximum Win Streak:</p>
                    <span className="font-semibold text-[#f6f6f6]">{userData.maxStreak}</span>
                </div>
            </div>
            <div className='h-full'>
                <h3 className="text-md md:text-lg font-semibold text-[#f6f6f6] mb-1">Guess Distribution</h3>
                <div>
                    <GuessDistributionChart />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
