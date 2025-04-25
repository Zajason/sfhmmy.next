import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkIn } from '../../apis/AuthApi';
import { Meteors } from '../../components/meteorAnimation';
import NavbarMain from '../../components/navbar/navbar_main';

const CheckInPage = () => {
  const router = useRouter();
  const { workshop_id } = router.query;
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);

  useEffect(() => {
    if (!router.isReady) return; // Wait for the router to be ready

    const handleCheckIn = async () => {
      console.log('handleCheckIn called'); // Debug point 1
      console.log('workshop_id:', workshop_id); // Debug point 2

      if (!workshop_id) {
        console.warn('workshop_id is not available'); // Debug point 3
        return;
      }

      try {
        console.log('Calling checkIn with workshop_id:', workshop_id); // Debug point 4
        const response = await checkIn(workshop_id);
        console.log('checkIn response:', response);
        console.log('checkIn successful, redirecting to workshop page'); // Debug point 5
        try {
          router.push(`/workshops/${workshop_id}`);
        } catch (navError) {
          console.error('Error during redirect:', navError);
        }
      } catch (error) {
        console.error('Error during check-in:', error); // Debug point 6
        const errorMessage = (error as any)?.response?.data?.message;
        if (errorMessage === 'You have already checked in.') {
          setAlreadyCheckedIn(true);
        } else {
          router.push('/404');
        }
      }
    };

    handleCheckIn();
  }, [router.isReady, workshop_id, router]);

  if (alreadyCheckedIn) {
    return (
      <div className="relative w-full h-screen bg-black overflow-hidden">
        <NavbarMain />
        <div className="absolute inset-0 z-0">
          <Meteors number={30} />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-6xl font-bold">ALREADY CHECKED-IN</h1>
        </div>
      </div>
    );
  }

  return <div className="text-white text-center py-24">Checking in...</div>;
};

export default CheckInPage;