import {useState } from 'react';
import logo from './logos.jpg';
import {
	Brand,
	BrandImage,
	Container,
	NavLink,
	Menu,
	MenuItems,
	Nav,
	MobileMenu,
	MobileMenuContainer,
	MobileMenuHover,
} from './Header_css';
import { NavbarData } from './header_data';
import LogoutButton from './LogoutButton';

export default function Header() {

	const screenSize = 580;
	const [menu] = useState(false);
	const [toggleMenu, setToggleMenu] = useState(false);

	// window.addEventListener('resize', (e) => {
	// 	if (e.target.innerWidth < screenSize) {
	// 		setMenu(true);
	// 	} else {
	// 		setMenu(false);
	// 	}
	// });

	// useEffect(() => {
	// 	if (window.innerWidth < screenSize) setMenu(true);
	// }, []);

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
						fontSize: '28px',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						textDecoration: 'underline',
						textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
						letterSpacing: '2px',
						textTransform: 'uppercase',
						fontFamily: 'Arial, sans-serif',
						textAlign: 'center'
					}}>
						Radiologist Dashboard
					</h4>
					</Brand>

					<MobileMenuContainer
						menu={menu}
						onClick={() => setToggleMenu(!toggleMenu)}
					>
						<MobileMenu />
						<MobileMenuHover />
					</MobileMenuContainer>
					<Menu toggleMenu={toggleMenu} ss={screenSize}>
						{NavbarData.map((item, index) => (
							<MenuItems key={index} toggleMenu={toggleMenu} ss={screenSize}>
								<NavLink to={item.link}>{item.title}</NavLink>
							</MenuItems>
						))}
						<LogoutButton />
					</Menu>
				</Container>
			</Nav>
		</div>
	);
}