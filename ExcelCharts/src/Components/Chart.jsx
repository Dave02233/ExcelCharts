import React from 'react';
import { AreaChart, LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  {
    name: 'Gennaio',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Febbraio',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Marzo',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Aprile',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Maggio',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Giugno',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Luglio',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Agosto',
    uv: 3200,
    pv: 4100,
    amt: 2300,
  },
  {
    name: 'Settembre',
    uv: 3100,
    pv: 4200,
    amt: 2400,
  },
  {
    name: 'Ottobre',
    uv: 3300,
    pv: 4000,
    amt: 2200,
  },
  {
    name: 'Novembre',
    uv: 2900,
    pv: 3900,
    amt: 2100,
  },
  {
    name: 'Dicembre',
    uv: 3700,
    pv: 4500,
    amt: 2500,
  },
];

const areaType = (
  <AreaChart data={data}>
    <CartesianGrid stroke="#e0e0e0" strokeDasharray="6 6" vertical={false} />
    <XAxis dataKey="name" interval={1} tick={{ fontSize: 14, fill: '#222', fontWeight: 600 }} axisLine={{ stroke: '#b0b0b0' }} tickLine={false} />
    <YAxis tick={{ fontSize: 14, fill: '#222', fontWeight: 600 }} axisLine={{ stroke: '#b0b0b0' }} tickLine={false} />
    <Tooltip contentStyle={{ background: '#000000ff', borderRadius: 8, color: '#fff', border: 'none', fontSize: 16 }} labelStyle={{ color: '#fff' }} />
    <Area type="monotone" dataKey="uv" stackId="1" stroke="#1976d2" strokeWidth={1} fill="#1976d233" />
    <Area type="monotone" dataKey="pv" stackId="1" stroke="#43a047" strokeWidth={1} fill="#43a04733" />
    <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffa000" strokeWidth={1} fill="#ffa00033" />
  </AreaChart>
)

const lineType = (
  <LineChart data={data}>
    <CartesianGrid stroke="#e0e0e0" strokeDasharray="6 6" vertical={false} />
    <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#222', fontWeight: 600 }} axisLine={{ stroke: '#b0b0b0' }} tickLine={false} />
    <YAxis tick={{ fontSize: 14, fill: '#222', fontWeight: 600 }} axisLine={{ stroke: '#b0b0b0' }} tickLine={false} />
    <Tooltip contentStyle={{ background: '#000000ff', borderRadius: 8, color: '#fff', border: 'none', fontSize: 16 }} labelStyle={{ color: '#fff' }} />
    <Legend iconType="plainline" wrapperStyle={{ fontSize: 14, color: '#222', fontWeight: 600 }} />
    <Line type="monotone" dataKey="pv" stroke="#1976d2" strokeWidth={3} dot={{ r: 3, fill: '#fff', stroke: '#1976d2', strokeWidth: 3 }} activeDot={{ r: 6, fill: '#1976d2' }} />
    <Line type="monotone" dataKey="uv" stroke="#43a047" strokeWidth={3} dot={{ r: 3, fill: '#fff', stroke: '#43a047', strokeWidth: 3 }} activeDot={{ r: 6, fill: '#43a047' }} />
    <Line type="monotone" dataKey="amt" stroke="#ffa000" strokeWidth={3} dot={{ r: 3, fill: '#fff', stroke: '#ffa000', strokeWidth: 3 }} activeDot={{ r: 6, fill: '#ffa000' }} />
  </LineChart>
)

export const Chart = ({precision}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">

      {precision
      ? lineType
      : areaType
      }

    </ResponsiveContainer>
  );
};

