import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Doctor from './models/Doctor.js';
import Service from './models/Service.js';
import Appointment from './models/Appointment.js';
import Blog from './models/Blog.js';
import Gallery from './models/Gallery.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Doctor.deleteMany({}),
      Service.deleteMany({}),
      Appointment.deleteMany({}),
      Blog.deleteMany({}),
      Gallery.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // ── USERS ──
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@carepoint.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1 (555) 000-0001',
      avatar: '',
    });

    const doctorUser = await User.create({
      name: 'Dr. Sarah Johnson',
      email: 'doctor@carepoint.com',
      password: 'doctor123',
      role: 'doctor',
      phone: '+1 (555) 000-0002',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
    });

    const doctorUser2 = await User.create({
      name: 'Dr. Michael Chen',
      email: 'michael@carepoint.com',
      password: 'doctor123',
      role: 'doctor',
      phone: '+1 (555) 000-0003',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
    });

    const patient = await User.create({
      name: 'John Doe',
      email: 'patient@carepoint.com',
      password: 'patient123',
      role: 'patient',
      phone: '+1 (555) 000-0004',
      avatar: '',
    });

    const patient2 = await User.create({
      name: 'Emily Smith',
      email: 'emily@carepoint.com',
      password: 'patient123',
      role: 'patient',
      phone: '+1 (555) 000-0005',
      avatar: '',
    });

    console.log('Users created');

    // ── DOCTORS ──
    const doc1 = await Doctor.create({
      userId: doctorUser._id,
      specialty: 'Cardiology',
      experience: 12,
      bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in interventional cardiology. She specializes in treating complex heart conditions using minimally invasive techniques.',
      fee: 200,
      rating: 4.8,
      availability: [
        { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
        { day: 'Wednesday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'] },
        { day: 'Friday', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] },
      ],
    });

    const doc2 = await Doctor.create({
      userId: doctorUser2._id,
      specialty: 'Neurology',
      experience: 15,
      bio: 'Dr. Michael Chen is a renowned neurologist with 15 years of experience. He specializes in treating neurological disorders with a focus on patient-centered care and innovative treatments.',
      fee: 250,
      rating: 4.9,
      availability: [
        { day: 'Tuesday', slots: ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'] },
        { day: 'Thursday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'] },
        { day: 'Saturday', slots: ['10:00 AM', '11:00 AM'] },
      ],
    });

    console.log('Doctors created');

    // ── SERVICES ──
    const services = await Service.insertMany([
      { name: 'General Checkup', icon: '🩺', description: 'Comprehensive health examinations including blood tests, vitals, and physical assessment by experienced physicians.' },
      { name: 'Dental Care', icon: '🦷', description: 'Complete dental services from routine cleanings to advanced procedures for a healthy, beautiful smile.' },
      { name: 'Cardiology', icon: '❤️', description: 'Advanced heart care with state-of-the-art diagnostic technology and expert cardiologists.' },
      { name: 'Pediatrics', icon: '👶', description: 'Specialized healthcare for children from newborns to adolescents in a child-friendly environment.' },
      { name: 'Orthopedics', icon: '🦴', description: 'Expert care for bones, joints, and muscles with personalized treatment plans.' },
      { name: 'Neurology', icon: '🧠', description: 'Comprehensive neurological care using advanced diagnostic and treatment techniques.' },
    ]);
    console.log('Services created');

    // ── APPOINTMENTS ──
    const today = new Date();
    const nextWeek = (d) => new Date(today.getTime() + d * 24 * 60 * 60 * 1000);

    await Appointment.insertMany([
      {
        patientId: patient._id,
        doctorId: doc1._id,
        service: 'Cardiology',
        date: nextWeek(2),
        timeSlot: '10:00 AM',
        status: 'confirmed',
        notes: 'Annual heart checkup',
      },
      {
        patientId: patient._id,
        doctorId: doc2._id,
        service: 'Neurology',
        date: nextWeek(5),
        timeSlot: '2:00 PM',
        status: 'pending',
        notes: 'Consultation for migraines',
      },
      {
        patientId: patient2._id,
        doctorId: doc1._id,
        service: 'Cardiology',
        date: nextWeek(3),
        timeSlot: '11:00 AM',
        status: 'confirmed',
        notes: 'Follow-up appointment',
      },
      {
        patientId: patient._id,
        doctorId: doc1._id,
        service: 'General Checkup',
        date: nextWeek(-5),
        timeSlot: '9:00 AM',
        status: 'completed',
        notes: 'Routine checkup - all clear',
      },
      {
        patientId: patient2._id,
        doctorId: doc2._id,
        service: 'Neurology',
        date: nextWeek(-3),
        timeSlot: '1:00 PM',
        status: 'completed',
        notes: 'MRI results discussion',
      },
      {
        patientId: patient._id,
        doctorId: doc2._id,
        service: 'Neurology',
        date: nextWeek(-10),
        timeSlot: '10:00 AM',
        status: 'cancelled',
        notes: 'Patient rescheduled',
      },
    ]);
    console.log('Appointments created');

    // ── BLOGS ──
    await Blog.insertMany([
      {
        title: '5 Tips for a Healthy Heart',
        content: `<p>Maintaining a healthy heart is crucial for overall well-being. Here are five essential tips backed by medical research:</p>
        <h3>1. Stay Active</h3>
        <p>Regular physical activity strengthens your heart muscle and improves circulation. Aim for at least 30 minutes of moderate exercise five days a week.</p>
        <h3>2. Eat Heart-Healthy Foods</h3>
        <p>Incorporate more fruits, vegetables, whole grains, and lean proteins into your diet. Reduce sodium, saturated fats, and processed foods.</p>
        <h3>3. Manage Stress</h3>
        <p>Chronic stress can increase blood pressure and heart rate. Practice meditation, deep breathing, or yoga to keep stress levels in check.</p>
        <h3>4. Get Quality Sleep</h3>
        <p>Poor sleep is linked to higher risks of heart disease. Aim for 7-9 hours of quality sleep each night.</p>
        <h3>5. Regular Checkups</h3>
        <p>Annual checkups help detect potential issues early. Monitor blood pressure, cholesterol, and blood sugar levels regularly.</p>`,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop',
        author: 'Dr. Sarah Johnson',
        date: new Date('2024-03-15'),
      },
      {
        title: 'Understanding Mental Health: A Comprehensive Guide',
        content: `<p>Mental health is just as important as physical health. Understanding and prioritizing your mental well-being is essential for a balanced life.</p>
        <h3>What is Mental Health?</h3>
        <p>Mental health encompasses our emotional, psychological, and social well-being. It affects how we think, feel, and act in daily life.</p>
        <h3>Common Signs to Watch For</h3>
        <ul>
          <li>Persistent sadness or irritability</li>
          <li>Extreme mood changes</li>
          <li>Social withdrawal</li>
          <li>Changes in sleep or appetite</li>
        </ul>
        <h3>When to Seek Help</h3>
        <p>If you experience these symptoms for more than two weeks, consider reaching out to a mental health professional. Early intervention is key to effective treatment.</p>`,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
        author: 'Dr. Emily Rodriguez',
        date: new Date('2024-02-28'),
      },
      {
        title: 'Complete Guide to Pediatric Care for New Parents',
        content: `<p>Becoming a parent is exciting and challenging. Here is everything you need to know about keeping your child healthy.</p>
        <h3>Newborn Care Basics</h3>
        <p>From feeding to sleeping patterns, understanding your newborn's needs is the first step in pediatric care. Regular checkups are crucial in the first year.</p>
        <h3>Vaccination Schedule</h3>
        <p>Follow the recommended vaccination schedule to protect your child from preventable diseases. Vaccines are safe, effective, and essential.</p>
        <h3>Common Childhood Illnesses</h3>
        <p>Learn to identify symptoms of common conditions like ear infections, colds, and fevers. Know when home care is sufficient and when to visit a doctor.</p>
        <h3>Nutrition and Development</h3>
        <p>Proper nutrition is vital for growth. Ensure your child gets a balanced diet with essential vitamins and minerals for healthy development.</p>`,
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=500&fit=crop',
        author: 'Dr. Emily Rodriguez',
        date: new Date('2024-02-10'),
      },
    ]);
    console.log('Blogs created');

    // ── GALLERY ──
    await Gallery.insertMany([
      { imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop', caption: 'Modern Reception Area' },
      { imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=800&fit=crop', caption: 'State-of-the-Art Operating Room' },
      { imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop', caption: 'Patient Comfort Room' },
      { imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop', caption: 'Advanced Diagnostic Lab' },
      { imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=800&fit=crop', caption: 'Rehabilitation Center' },
      { imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop', caption: 'Pediatric Wing' },
      { imageUrl: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=400&fit=crop', caption: 'Pharmacy Section' },
      { imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop', caption: 'Our Dedicated Team' },
    ]);
    console.log('Gallery created');

    console.log('\n=== SEED COMPLETE ===');
    console.log('\n--- Login Credentials ---');
    console.log('Admin:   admin@carepoint.com / admin123');
    console.log('Doctor:  doctor@carepoint.com / doctor123');
    console.log('Patient: patient@carepoint.com / patient123');
    console.log('\nDr. Michael Chen: michael@carepoint.com / doctor123');
    console.log('Emily Smith:      emily@carepoint.com / patient123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();
