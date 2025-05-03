
export type Request = {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export type Service = {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
};


export type PostSummary = {
  id: string;
  type: 'request' | 'service';
  title: string;
  createdAt: string;
};

export type Availability = {
  date: string;
  available: boolean;
};

export type User = {
  userId: string;
  userName: string;
  name: string;
  image: string;
  bio: string;
  requestsFilled: number;
  offersPosted: number;
  recentPosts: PostSummary[];
  availability: Availability[];
};

export const MOCK_REQUESTS: Request[] = [
  {
    id: '1',
    title: 'Community Garden Help Needed',
    description: 'Looking for volunteers to help plant and maintain our new community garden this weekend.',
    userId: '',
    userName: 'GreenThumb',
    createdAt: '2023-05-15',
    updatedAt: '2023-05-15',
    comments: [
      {
        id: '1',
        userId: '',
        userName: 'GardenLover',
        content:
          'I would love to help! I have some experience with vegetable gardening and can bring some seedlings to donate as well.',
        createdAt: '2023-05-15',
      },
      {
        id: '2',
        userId: '',
        userName: 'NewGardener',
        content:
          "I don't have much experience but I'm eager to learn and help. Count me in for Saturday morning!",
        createdAt: '2023-05-16',
      },
    ],
  },
  {
    id: '2',
    title: 'After-School Tutoring',
    description: 'Seeking math and science tutors for our after-school program, 2-3 hours per week.',
    userId: '',
    userName: 'EducateAll',
    createdAt: '2023-05-14',
    updatedAt: '2023-05-14',
    comments: [],
  },
  {
    id: '3',
    title: 'Food Bank Volunteers',
    description: 'Need help sorting and distributing food at our local food bank, flexible hours available.',
    userId: '',
    userName: 'FeedingHope',
    createdAt: '2023-05-13',
    updatedAt: '2023-05-13',
    comments: [],
  },
  {
    id: '4',
    title: 'Senior Center Activities',
    description: 'Looking for volunteers to lead activities at our senior center, such as crafts, music, or games.',
    userId: '',
    userName: 'GoldenYears',
    createdAt: '2023-05-12',
    updatedAt: '2023-05-12',
    comments: [],
  },
  {
    id: '5',
    title: 'Animal Shelter Dog Walkers',
    description: 'Our shelter dogs need exercise! Seeking volunteers to walk dogs for 30-60 minutes.',
    userId: '',
    userName: 'PawsAndWhiskers',
    createdAt: '2023-05-11',
    updatedAt: '2023-05-11',
    comments: [],
  },
];

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Web Development Help',
    description:
      'Experienced web developer offering free website creation for non-profits and community organizations.',
    userId: '',
    userName: 'CodeForGood',
    createdAt: '2023-05-15',
    updatedAt: '2023-05-15',
    comments: [
      {
        id: '1',
        userId: '',
        userName: 'NonProfitOrg',
        content:
          'This is exactly what our organization needs! We have an outdated website that needs a refresh. Would love to connect.',
        createdAt: '2023-05-16',
      },
      {
        id: '2',
        userId: '',
        userName: 'TechNewbie',
        content:
          "Would you be willing to mentor someone who wants to learn web development? I'd love to help with projects and learn from you.",
        createdAt: '2023-05-17',
      },
    ],
  },
  {
    id: '2',
    title: 'Senior Assistance',
    description:
      'Available to help seniors with grocery shopping, transportation to appointments, and companionship.',
    userId: '',
    userName: 'HelpingHands',
    createdAt: '2023-05-14',
    updatedAt: '2023-05-14',
    comments: [],
  },
  {
    id: '3',
    title: 'Math Tutoring',
    description:
      'College math major offering free tutoring for K-12 students in algebra, geometry, and calculus.',
    userId: '',
    userName: 'MathWhiz',
    createdAt: '2023-05-13',
    updatedAt: '2023-05-13',
    comments: [],
  },
  {
    id: '4',
    title: 'Handyman Services',
    description:
      'Retired contractor offering basic home repairs and maintenance for elderly and disabled individuals.',
    userId: '',
    userName: 'FixItFred',
    createdAt: '2023-05-12',
    updatedAt: '2023-05-12',
    comments: [],
  },
  {
    id: '5',
    title: 'Photography Services',
    description:
      'Professional photographer offering free services for non-profit events and fundraisers.',
    userId: '',
    userName: 'LensArtist',
    createdAt: '2023-05-11',
    updatedAt: '2023-05-11',
    comments: [],
  },
];


// Mock user data
export const MOCK_USER: User = {
  userId: '1',
  userName: 'CodeForGood',
  name: 'John Doe',
  image: '/placeholder.svg?height=200&width=200',
  bio: 'Web developer and volunteer enthusiast. I love helping non-profits with their tech needs and participating in community events.',
  requestsFilled: 12,
  offersPosted: 8,
  recentPosts: [
    { id: '1', type: 'service', title: 'Web Development Help', createdAt: '2023-05-15' },
  ],
  availability: [
    { date: '2023-05-20', available: true },
    { date: '2023-05-21', available: true },
    { date: '2023-05-27', available: true },
    { date: '2023-05-28', available: true },
  ],
};



// Examples for me 
// export type PriceLevel = "PRICE_LEVEL_FREE" | "PRICE_LEVEL_INEXPENSIVE" | "PRICE_LEVEL_MODERATE" | "PRICE_LEVEL_EXPENSIVE" | "PRICE_LEVEL_VERY_EXPENSIVE" | "PRICE_LEVEL_UNSPECIFIED";

// export type  Place = {
//   displayName?: { text: string };
//   location?: { latitude: number; longitude: number };
//   photos?: { name: string }[];
//   rating?: number;
//   priceLevel: PriceLevel;
//   formattedAddress?: string;
//   userRatingCount?: number;
//   editorialSummary?: { text: string };
// }
