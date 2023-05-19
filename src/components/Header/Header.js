import { useEffect, useState } from 'react';
import logo from './logos.jpg';
import {
	Brand,
	BrandImage,
	Container,
	Nav,
} from './Header_css';


export default function Header() {
	const screenSize = 580;
	const [setMenu] = useState(false);

	window.addEventListener('resize', (e) => {
		if (e.target.innerWidth < screenSize) {
			setMenu(true);
		} else {
			setMenu(false);
		}
	});

	useEffect(() => {
		if (window.innerWidth < screenSize) setMenu(true);
	  }, [setMenu]);	  

	return (
		<div>
			<Nav>
				<Container ss={screenSize}>
					<Brand>
						<BrandImage src={logo} alt="logo" />
						<h4 style={{
						background: 'linear-gradient(to right, #009EDB, #00001C)',
						color: '#FFFFFF',
						transition: 'color 0.3s ease-in-out',
						marginRight: '30px',
						fontWeight: 'bold',
						fontSize: '40px',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						textDecoration: 'underline',
						textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
						letterSpacing: '2px',
						textTransform: 'uppercase',
						fontFamily: 'Arial, sans-serif',
						textAlign: 'center'
					}}>
						Detect Neoplasm
					</h4>
					</Brand>
				</Container>
			</Nav>
		</div>
	);
}