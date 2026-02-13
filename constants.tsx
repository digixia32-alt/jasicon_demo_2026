
import React from 'react';
import { FacultyMember, CommitteeMember, ProgramSession, Workshop, ExtendedCommitteeSection } from './types';

export const COLORS = {
  bg: '#0B0F14',
  surface: '#121826',
  gold: '#C9A24D',
  teal: '#2EC4B6',
  textPrimary: '#E6EAF0',
  textSecondary: '#9AA4B2',
  border: '#1F2937'
};

export const COMMITTEE: CommitteeMember[] = [
  { id: 'c1', name: 'Dr. Sanjay Kumar', role: 'Chairman, ASI (Jharkhand)', imageUrl: '/assets/Sanjay.jpeg' },
  { id: 'c2', name: 'Dr. Rajesh Kumar Singh', role: 'Secretary, ASI (Jharkhand)', imageUrl: '/assets/rajesh.png' },
  { id: 'c3', name: 'Dr. B. N. Prasad', role: 'Treasurer, ASI (Jharkhand)', imageUrl: '/assets/Prasad.jpeg' },
  //   { id: 'c4', name: 'Dr. Jugal Kishore Choudhary', role: 'Organizing Chairman', imageUrl: 'https://placehold.co/400x400?text=Photo' },
  //   { id: 'c5', name: 'Dr. Kumar Gourav', role: 'Organizing Secretary', imageUrl: 'https://placehold.co/400x400?text=Photo' },
  //   { id: 'c6', name: 'Dr. Vijay Kumar', role: 'Organizing Treasurer', imageUrl: '/assets/vijay.png' }
]


export const EXTENDED_COMMITTEE: ExtendedCommitteeSection[] = [
  {
    title: 'E.C. Member, ASI (Jharkhand)',
    members: ['Dr. Vijay Kumar', 'Dr. Md. Azad']
  },
  {
    title: 'Chief Patron',
    members: ['Dr. R. P. Shrivastava']
  },
  {
    title: 'Patron',
    members: ['Dr. K. N. Jha', 'Dr. N. M. Sharma']
  },
  {
    title: 'Advisor-Jharkhand',
    members: [
      'Dr. (Prof.) Majid Alam', 'Dr. M. S. Bhatt', 'Dr. M. P. Jha', 'Dr. N. K. Jha',
      'Dr. D. P. Bhadani', 'Dr. Sridhar Pradhan', 'Dr. Om Prakash', 'Dr. N. K. Choudhary',
      'Dr. Shital Maluwa', 'Dr. Uday Shrivastva', 'Dr. Arunima Verma'
    ]
  },
  {
    title: 'Advisor-Deoghar',
    members: [
      'Dr. Sunil Kr. Singh', 'Dr. Subhash Chandra Choudhary', 'Dr. Ranjan Sinha',
      'Dr. Arun Kr. Gupta', 'Dr. D. Tiwary (National Vice President, IMA)',
      'Dr. N. C. Gandhi', 'Dr. Gauri Shankar'
    ]
  },
  {
    title: 'Reception Committee',
    members: ['Dr. Rajiv Pandey', 'Dr. Rajesh Kumar', 'Dr. Devanand Prakash']
  },
  {
    title: 'Fund Raising Committee',
    members: ['Dr. Chittranjan Pankaj']
  },
  {
    title: 'Scientific Committee',
    members: ['Dr. Rajesh Ranjan', 'Dr. Kumar Mrigank Singh', 'Dr. Satvir', 'Dr. Ashish Kumar']
  },
  {
    title: 'Souvenir Committee',
    members: ['Dr. Abinash Kr. Singh', 'Dr. Saurabh Sultania']
  },
  {
    title: 'Catering & Entertainment',
    members: ['Dr. Jagjivan Murmu', 'Dr. Vinod Kumar']
  },
  {
    title: 'Media & IT',
    members: ['Dr. Ravi Kumar']
  }
];

// Added missing FACULTY constant to resolve import error in Faculty.tsx
export const FACULTY: FacultyMember[] = [
  {
    id: 'f1',
    name: 'Dr. Elizabeth Thorne',
    designation: 'Professor & Head, Fetal Medicine',
    institution: "King's College London, UK",
    imageUrl: 'https://picsum.photos/seed/fac1/600/800',
    category: 'Keynote'
  },
  {
    id: 'f2',
    name: 'Dr. Rajesh Khanna',
    designation: 'Director, Robotic Surgery',
    institution: 'Apollo Hospitals, Hyderabad',
    imageUrl: 'https://picsum.photos/seed/fac2/600/800',
    category: 'International'
  },
  {
    id: 'f3',
    name: 'Dr. Sarah Chen',
    designation: 'Fetal Medicine Specialist',
    institution: 'Mount Sinai Hospital, NYC',
    imageUrl: 'https://picsum.photos/seed/fac3/600/800',
    category: 'National'
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: 'w1',
    title: 'Advanced Laparoscopy Masterclass',
    price: 15000,
    description: 'Hands-on training on pelvic anatomy and suturing techniques.',
    slots: 30,
    imageUrl: 'https://picsum.photos/seed/ws1/600/400'
  },
  {
    id: 'w2',
    title: 'Infertility & IVF Management',
    price: 12000,
    description: 'Comprehensive guide to ovarian stimulation and lab protocols.',
    slots: 50,
    imageUrl: 'https://picsum.photos/seed/ws2/600/400'
  }
];

export const PROGRAM: ProgramSession[] = [
  { id: 's1', time: '09:00 AM', topic: 'Keynote: Future of Fetal Medicine', speaker: 'Dr. Elizabeth Thorne', hall: 'Main Hall A', day: 1 },
  { id: 's2', time: '11:00 AM', topic: 'Debate: Robotic vs Laparoscopic Surgery', speaker: 'Dr. Rajesh Khanna', hall: 'Hall B', day: 2 },
  { id: 's3', time: '02:00 PM', topic: 'Workshop: High-Risk Pregnancy Protocols', speaker: 'Dr. Sarah Chen', hall: 'Hall C', day: 3 }
];
