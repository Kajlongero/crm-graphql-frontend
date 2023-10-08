'use client';
import { ChartsInterface } from '@/app/interfaces/charts-interface';
import React, { Suspense, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartComponent({ data }: { data: ChartsInterface[] }) {

  const [hydrated, setHydrated] = useState(false);
  
	useEffect(() => {
		setHydrated(true);

	}, []);

	if (!hydrated) {
		return null;
	}

  return (
    <Suspense>
      <ResponsiveContainer
        width={'99%'}
        height={550}
      >
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Suspense>
  )
}