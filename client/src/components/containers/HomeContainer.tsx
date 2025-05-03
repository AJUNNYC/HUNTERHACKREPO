import HomeView from "../views/HomeView";

//import { useEffect, useRef, useState } from "react";
import { useEffect, useState } from "react";
import { Request, Service } from "../../types/types";


export default function HomeContainer() {

  const [requests, setRequests] = useState<Request[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const requests_lazySeed: Request[] = [
    {
      id: '1',
      title: 'Community Garden Help Needed',
      description: 'Looking for volunteers to help plant and maintain our new community garden this weekend.',
      userId: '',
      userName: 'User1',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '2',
      title: 'After-School Tutoring',
      description: 'Seeking math and science tutors for our after-school program, 2-3 hours per week.',
      userId: '',
      userName: 'User2',
      createdAt: '',
      updatedAt: '',
    },
  ]

  const mockServices: Service[] = [
    {
      id: '1',
      title: 'Web Development Help',
      description:
        'Experienced web developer offering free website creation for non-profits and community organizations.',
      userId: '',
      userName: 'UserA',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: '2',
      title: 'Senior Assistance',
      description:
        'Available to help seniors with grocery shopping, transportation to appointments, and companionship.',
      userId: '',
      userName: 'UserB',
      createdAt: '',
      updatedAt: '',
    },
  ];

  useEffect(() => {
    setRequests(requests_lazySeed)
    setServices(mockServices)
  }, []);

  return (
    <HomeView 
      requests={requests}
      services={services}
    />
  );
}