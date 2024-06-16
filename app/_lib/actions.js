'use server';

import { auth, signIn, signOut } from '@/app/_lib/auth';
import { supabase } from '@/app/_lib/supabase';
import { revalidatePath } from 'next/cache';

export async function updateGuest(formData) {
	const session = await auth();
	if (!session) throw new Error('You must be Logged In!');

	const nationalID = formData.get('nationalID');
	const [nationality, countryFlag] = formData.get('nationality').split('%');

	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
		throw new Error('Please provide a valid national ID!');

	const updateData = {
		nationality,
		countryFlag,
		nationalID,
	};

	const { data, error } = await supabase
		.from('guests')
		.update(updateData)
		.eq('id', session.user.guestId);

	if (error) throw new Error('Guest could not be updated!');

	revalidatePath('/account/profile');
}

export async function signInAction() {
	await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
	await signOut({ redirectTo: '/' });
}
