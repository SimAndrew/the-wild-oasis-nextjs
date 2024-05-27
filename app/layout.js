import Logo from '@/app/_components/Logo.js';
import Navigation from '@/app/_components/Navigation.js';

export const metadata = {
	title: {
		template: '%s / The Wild Oasis',
		default: 'Welcome / The Wild Oasis',
	},
	description:
		'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<header>
					<Logo />
					<Navigation />
				</header>

				<main>{children}</main>

				<footer>Copyright by The Wild Oasis</footer>
			</body>
		</html>
	);
}
