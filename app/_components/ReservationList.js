'use client';

import { useOptimistic } from 'react';
import ReservationCard from '@/app/_components/ReservationCard';
import { deleteBooking } from '@/app/_lib/actions';

function ReservationList({ bookings }) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(curBookings, bookingId) => {
			return curBookings.filter((booking) => booking.id !== bookingId);
		},
	);

	async function handleDelete(bookingId) {
		optimisticDelete(bookingId);

		await deleteBooking(bookingId);
	}

	return (
		<ul className="space-y-6">
			{optimisticBookings.map((booking) => (
				<ReservationCard
					booking={booking}
					onDelete={handleDelete}
					key={booking.id}
				/>
			))}
		</ul>
	);
}

export default ReservationList;
