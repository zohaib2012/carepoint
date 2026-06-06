import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiClock, FiUser, FiActivity } from 'react-icons/fi';
import toast from 'react-hot-toast';
import API from '../utils/axios';

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

const services = [
  'General Checkup', 'Dental Care', 'Cardiology', 'Pediatrics',
  'Orthopedics', 'Neurology', 'Ophthalmology', 'Pulmonology',
];

export default function BookAppointment() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: '',
    service: '',
    date: null,
    timeSlot: '',
    notes: '',
  });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    API.get('/doctors').then(({ data }) => setDoctors(data)).catch(() => {});
  }, []);

  const selectedDoctor = doctors.find((d) => d._id === form.doctorId);

  const canNext = () => {
    if (step === 1) return form.doctorId && form.service;
    if (step === 2) return form.date && form.timeSlot;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await API.post('/appointments', {
        doctorId: form.doctorId,
        service: form.service,
        date: form.date,
        timeSlot: form.timeSlot,
        notes: form.notes,
      });
      toast.success('Appointment booked successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="gradient-bg py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-white/80 font-semibold text-sm uppercase tracking-wider">Book Now</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">Book an Appointment</h1>
          <p className="text-white/70 mt-4 text-lg">
            Schedule your visit with our expert doctors in just a few clicks.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 text-gray-400'
                }`}>
                  {s}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step >= s ? 'text-primary-600' : 'text-gray-400'}`}>
                  {s === 1 ? 'Details' : s === 2 ? 'Schedule' : 'Confirm'}
                </span>
                {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-primary-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <div className="card p-5 sm:p-8 md:p-10">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Select Doctor & Service</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><FiUser /> Doctor</label>
                  <select value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })} className="input-field">
                    <option value="">Choose a doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>{doc.userId?.name} - {doc.specialty}</option>
                    ))}
                  </select>
                </div>
                {selectedDoctor && (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                    <img src={selectedDoctor.userId?.avatar || `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIwIiBmaWxsPSIjZjFmNWY5Ii8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzOCIgcj0iMTgiIGZpbGw9IiM5NGEzYjgiLz48cGF0aCBkPSJNMTYgOTBjMC0xOC44IDE1LjItMzQgMzQtMzRzMzQgMTUuMiAzNCAzNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==`} alt="" className="w-14 h-14 rounded-xl object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900">{selectedDoctor.userId?.name}</p>
                      <p className="text-sm text-gray-500">{selectedDoctor.specialty} · {selectedDoctor.experience} years</p>
                      <p className="text-sm font-medium text-primary-600">Fee: ${selectedDoctor.fee || '150'}</p>
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><FiActivity /> Service</label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="input-field">
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <button onClick={() => setStep(2)} disabled={!canNext()} className="btn-primary w-full">Continue</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Choose Date & Time</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><FiCalendar /> Date</label>
                  <DatePicker
                    selected={form.date}
                    onChange={(date) => setForm({ ...form, date })}
                    minDate={new Date()}
                    className="input-field w-full"
                    placeholderText="Select a date"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><FiClock /> Time Slot</label>
                  <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setForm({ ...form, timeSlot: slot })}
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          form.timeSlot === slot
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
                  <button onClick={() => setStep(3)} disabled={!canNext()} className="btn-primary flex-1">Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Confirm & Book</h2>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Doctor</span>
                    <span className="font-semibold text-gray-900">{selectedDoctor?.userId?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Service</span>
                    <span className="font-semibold text-gray-900">{form.service}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Date</span>
                    <span className="font-semibold text-gray-900">{form.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Time</span>
                    <span className="font-semibold text-gray-900">{form.timeSlot}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Fee</span>
                    <span className="font-semibold text-primary-600">${selectedDoctor?.fee || '150'}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea rows="3" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field resize-none" placeholder="Any specific concerns or requirements..." />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>
                  <button onClick={handleSubmit} disabled={submitting} className="btn-primary flex-1">
                    {submitting ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
