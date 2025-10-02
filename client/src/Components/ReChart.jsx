import React, { useEffect, useState } from 'react';
import { AreaChart, LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from './Styles/Chart.module.css';

const startingData = [
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



export const ReChart = ({precision}) => {

  const [data, setData] = useState([]);

  const findMax = (data, offset = 100) => {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
      const { uv, pv, amt } = data[i];
      if (uv > max) max = uv;
      if (pv > max) max = pv;
      if (amt > max) max = amt;
    }
    return max + offset;
  }

  const ticksCount = (max, inc) => {
    const arr = [];
    for (let i = 0; i <= max; i += inc) {
      arr.push(i);
    }
    return arr;
  }

  const areaType = (
    <AreaChart data={data}>
      <CartesianGrid stroke="#e0e0e0" strokeDasharray="6 6" vertical={false} />
      <XAxis dataKey="name" interval={1} tick={{ fontSize: 14, fill: '#222', fontWeight: 600 }} axisLine={{ stroke: '#b0b0b0' }} tickLine={false} />
      <YAxis tick={{ fontSize: 14, fill: '#222', fontWeight: 600 }} axisLine={{ stroke: '#b0b0b0' }} tickLine={false} />
      <Tooltip contentStyle={{ background: '#000000ff', borderRadius: 8, color: '#fff', border: 'none', fontSize: 16 }} labelStyle={{ color: '#fff' }} />
      <Legend iconType="plainline" wrapperStyle={{ fontSize: 14, color: '#222', fontWeight: 600 }} />
      <Area type="monotone" dataKey="uv" stackId="1" stroke="#1976d2" strokeWidth={1} fill="#1976d233" animationDuration={300} />
      <Area type="monotone" dataKey="pv" stackId="1" stroke="#43a047" strokeWidth={1} fill="#43a04733" animationDuration={300} />
      <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffa000" strokeWidth={1} fill="#ffa00033" animationDuration={300} />
    </AreaChart>
  )

  const lineType = (
    <LineChart data={data}>
      <CartesianGrid stroke="#e0e0e0" strokeDasharray="6 6" vertical={false} />
      <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#222', fontWeight: 600 }} axisLine={{ stroke: '#b0b0b0' }} tickLine={false} />
      <YAxis 
        tick={{ fontSize: 14, fill: '#222', fontWeight: 600 }} 
        axisLine={{ stroke: '#b0b0b0' }} 
        tickLine={false}
        interval={0}
        domain={[0, findMax(data, 250)]}
        ticks={ticksCount(findMax(data, 250), 500)}
      />
      <Tooltip contentStyle={{ background: '#000000ff', borderRadius: 8, color: '#fff', border: 'none', fontSize: 16 }} labelStyle={{ color: '#fff' }} />
      <Legend iconType="plainline" wrapperStyle={{ fontSize: 14, color: '#222', fontWeight: 600 }} />
      <Line type="monotone" dataKey="pv" stroke="#1976d2" strokeWidth={3} dot={{ r: 3, fill: '#fff', stroke: '#1976d2', strokeWidth: 3 }} activeDot={{ r: 6, fill: '#1976d2' }} animationDuration={300} />
      <Line type="monotone" dataKey="uv" stroke="#43a047" strokeWidth={3} dot={{ r: 3, fill: '#fff', stroke: '#43a047', strokeWidth: 3 }} activeDot={{ r: 6, fill: '#43a047' }} animationDuration={300} />
      <Line type="monotone" dataKey="amt" stroke="#ffa000" strokeWidth={3} dot={{ r: 3, fill: '#fff', stroke: '#ffa000', strokeWidth: 3 }} activeDot={{ r: 6, fill: '#ffa000' }} animationDuration={300} />
    </LineChart>
  )

  useEffect(() => {
    // Usa la connessione WebSocket globale (window.wsRef)
    let ws = window.wsRef && window.wsRef.current ? window.wsRef.current : null;
    if (!ws) {
      ws = new window.WebSocket('ws://localhost:3001');
      window.wsRef = { current: ws };
    }
    ws.onmessage = (event) => {
      try {
        const received = JSON.parse(event.data);
        console.log('Dati ricevuti dal backend:', received);
        // Adatta qui la formattazione dei dati ricevuti
        let formatted = [];
        if (Array.isArray(received)) {
          // Esempio: se i dati sono [{mese: 'Gennaio', uv: ..., pv: ..., amt: ...}, ...]
          formatted = received.map(item => ({
            name: item.name || item.mese || '',
            uv: item.uv ?? item.UV ?? 0,
            pv: item.pv ?? item.PV ?? 0,
            amt: item.amt ?? item.AMT ?? 0
          }));
        } else if (received.data && Array.isArray(received.data)) {
          formatted = received.data.map(item => ({
            name: item.name || item.mese || '',
            uv: item.uv ?? item.UV ?? 0,
            pv: item.pv ?? item.PV ?? 0,
            amt: item.amt ?? item.AMT ?? 0
          }));
        }
        setData(formatted);
      } catch (e) {
        console.log('Errore parsing dati backend:', e);
      }
    };
    return () => {
      ws.onmessage = null;
    };
  }, []);

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        {precision
        ? lineType
        : areaType
        }
      </ResponsiveContainer>
    </div>
  );
};

