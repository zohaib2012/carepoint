import { useState, useEffect } from 'react';
import { FiCalendar, FiUsers, FiUserCheck, FiActivity } from 'react-icons/fi';
import API from '../utils/axios';

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({ appointments: 0, doctors: 0, patients: 0, services: 0 });

  useEffect(() => {
    Promise.all([
      API.get('/appointments'),
      API.get('/doctors'),
      API.get('/users'),
      API.get('/services'),
    ]).then(([apts, docs, users, svcs]) => {
      setStats({
        appointments: apts.data.length,
        doctors: docs.data.length,
        patients: users.data.filter((u) => u.role === 'patient').length,
        services: svcs.data.length,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { icon: FiCalendar, label: 'Total Appointments', value: stats.appointments, color: 'from-blue-500 to-blue-600' },
    { icon: FiUserCheck, label: 'Total Doctors', value: stats.doctors, color: 'from-primary-500 to-primary-600' },
    { icon: FiUsers, label: 'Total Patients', value: stats.patients, color: 'from-purple-500 to-purple-600' },
    { icon: FiActivity, label: 'Services', value: stats.services, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Overview of your healthcare platform</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="card p-6 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
              <card.icon className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
