import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkInWaitingList } from '../../apis/AuthApi';

const CheckInWaitingPage = () => {
  const router = useRouter();
  const { workshop_id } = router.query;

  useEffect(() => {
    if (!router.isReady) return; // Wait for the router to be ready

    const handleCheckInWaiting = async () => {
      console.log('handleCheckInWaiting called'); // Debug point 1
      console.log('workshop_id:', workshop_id); // Debug point 2

      if (!workshop_id) {
        console.warn('workshop_id is not available'); // Debug point 3
        return;
      }

      try {
        console.log('Calling checkInWaitingList with workshop_id:', workshop_id); // Debug point 4
        const response = await checkInWaitingList(workshop_id);
        console.log('checkInWaitingList response:', response);
        console.log('checkInWaitingList successful, redirecting to workshop page'); // Debug point 5
        try {
          router.push(`/workshops/${workshop_id}`);
        } catch (navError) {
          console.error('Error during redirect:', navError);
        }
      } catch (error) {
        console.error('Error during check-in waiting list:', error); // Debug point 6
        router.push('/404');
      }
    };

    handleCheckInWaiting();
  }, [router.isReady, workshop_id, router]);

  return <div className="text-white text-center py-24">Checking in to waiting list...</div>;
};

export default CheckInWaitingPage;
