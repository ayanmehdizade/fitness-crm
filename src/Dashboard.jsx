import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Activity, Flame, Heart } from 'lucide-react';

const data = [
  { day: 'Mon', calories: 420, bpm: 72 },
  { day: 'Tue', calories: 550, bpm: 78 },
  { day: 'Wed', calories: 390, bpm: 70 },
  { day: 'Thu', calories: 610, bpm: 82 },
  { day: 'Fri', calories: 480, bpm: 75 }
];

export default function Dashboard() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Activity color="#2575fc" /> MAKFIT Activity Overview
      </h1>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ padding: '16px', background: '#f2f0f0', borderRadius: '16px', flex: 1 }}>
          <Flame color="#de2d29" /> <strong>550 kcal</strong> Avg
        </div>
        <div style={{ padding: '16px', background: '#f2f0f0', borderRadius: '16px', flex: 1 }}>
          <Heart color="#008052" /> <strong>75 bpm</strong> Resting
        </div>
      </div>
      <div style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="calories" stroke="#2575fc" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}