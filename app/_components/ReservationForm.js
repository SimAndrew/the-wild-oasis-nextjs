'use client';

import { useReservation } from '@/app/_components/ReservationContext';
import { differenceInDays, formatISO, isValid } from 'date-fns';
import { createBooking } from '@/app/_lib/actions';
import SubmitButton from '@/app/_components/SubmitButton';

function ReservationForm({ cabin, user }) {
	const { range, resetRange } = useReservation();
	const { maxCapacity, regularPrice, discount, id } = cabin;

	const isValidStartDate = range?.from && isValid(new Date(range.from));
	const isValidEndDate = range?.to && isValid(new Date(range.to));

	const startDate = isValidStartDate
		? formatISO(new Date(range.from), { representation: 'date' })
		: null;

	const endDate = isValidEndDate
		? formatISO(new Date(range.to), { representation: 'date' })
		: null;

	const numNights =
		isValidStartDate && isValidEndDate
			? differenceInDays(new Date(endDate), new Date(startDate))
			: 0;

	const cabinPrice = numNights * (regularPrice - discount);

	const bookingData = {
		startDate,
		endDate,
		numNights,
		cabinPrice,
		cabinId: id,
	};

	const createBookingWithData = createBooking.bind(null, bookingData);

	return (
		<div className="scale-[1.01]">
			<div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
				<p>Logged in as</p>

				<div className="flex gap-4 items-center">
					<img
						referrerPolicy="no-referrer"
						className="h-8 rounded-full"
						src={user.image}
						alt={user.name}
					/>
					<p>{user.name}</p>
				</div>
			</div>

			<form
				// action={createBookingWithData}
				action={async (formData) => {
					await createBookingWithData(formData);

					resetRange();
				}}
				className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
			>
				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="numGuests"
						id="numGuests"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						required
					>
						<option value="" key="">
							Select number of guests...
						</option>
						{Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
							<option value={x} key={x}>
								{x} {x === 1 ? 'guest' : 'guests'}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label htmlFor="observations">
						Anything we should know about your stay?
					</label>
					<textarea
						name="observations"
						id="observations"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						placeholder="Any pets, allergies, special requirements, etc.?"
					/>
				</div>

				<div className="flex justify-end items-center gap-6">
					{!(startDate && endDate) ? (
						<p className="text-primary-300 text-base">
							Start by selecting dates
						</p>
					) : (
						<SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
					)}
				</div>
			</form>
		</div>
	);
}

export default ReservationForm;
