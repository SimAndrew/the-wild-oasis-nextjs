import Link from 'next/link.js';

function Logo() {
	return (
		<Link href="/" className="z-10 flex items-center gap-4">
			<img src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" />
			<span className="text-primary-100 text-xl font-semibold">
				The Wild Oasis
			</span>
		</Link>
	);
}

export default Logo;
