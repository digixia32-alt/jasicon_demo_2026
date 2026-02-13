
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  registrationStatus?: 'pending' | 'completed' | 'none';
  regDetails?: {
    fullName: string;
    age: string;
    mobile: string;
    institution: string;
    designation: string;
    medicalRegNo: string;
    category: string;
    selectedWorkshops: string[];
  };
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  institution: string;
  imageUrl: string;
  category: 'Keynote' | 'International' | 'National';
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface ProgramSession {
  id: string;
  time: string;
  topic: string;
  speaker: string;
  hall: string;
  day: number;
}

export interface Workshop {
  id: string;
  title: string;
  price: number;
  description: string;
  slots: number;
  imageUrl: string;
}

export interface RegistrationData {
  userId: string;
  personalDetails: {
    fullName: string;
    age: string;
    mobile: string;
    city: string;
  };
  professionalDetails: {
    institution: string;
    designation: string;
    medicalRegNo: string;
  };
  category: string;
  workshops: string[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid';
}

export interface ExtendedCommitteeSection {
  title: string;
  members: string[];
}
