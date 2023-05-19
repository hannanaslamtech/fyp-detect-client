import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiMenuAltRight, BiMenu } from 'react-icons/bi';

export const Nav = styled.nav`
  display: flex;
    background: linear-gradient(to right, #dfe4e7, #000080);
    align-items: center;
    box-shadow: 0 0 10px 1px rgba(128, 128, 128, 0.185);
    position: sticky;
    top: 0%;
    padding: 5px;
    justify-content: space-between;
    font-family: 'Poppins', sans-serif;
    z-index: 100;
    transition: background-color 0.3s ease-in-out;
  }
`;

export const Container = styled.div`
	width: 2100px;
	margin: 0 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media screen and (max-width: ${(props) => props.ss}px) {
		padding: 0 20px;
		width:100%;
		max-width: 1100px;
	}
`;

export const Brand = styled.div`
width: 650px;
display: flex;
height: 100%;
align-items: center;
`;

export const BrandImage = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50px;
	object-fit: cover;
	margin-right:20px;
`;

export const Menu = styled.ul`
list-style: none;
display: flex;
align-items: right;
column-gap: 10px;
margin-top:10px;

	@media screen and (max-width: ${(props) => props.ss}px) {
		width: 100%;
		padding: 20px;
		flex-direction: column;
		background: linear-gradient(to right, #dfe4e7, #01555B);
		border-top: 1px solid #fff;
		position: absolute;
		top: 50px;
		left: 0;
		z-index: ${(props) => (props.toggleMenu ? '1' : '-1')};
		transform: translateY(-100%) scale(0);
		transition: animation 0.3s ease-in, z-index 0.3s ease 0.5s;
		animation: ${(props) =>
			props.toggleMenu ? 'menuOpen 0.5s linear forwards' : ''};
		@keyframes menuOpen {
			0% {
				transform: translateY(-100%) scale(0);
			}
			50% {
				transform: translateY(-50%) scale(0.5);
			}
			100% {
				transform: translateY(0%) scale(1);
			}
		}
	}
`;

export const MenuItems = styled.li`
padding: 5px;
	@media screen and (max-width: ${(props) => props.ss}px) {
		opacity: ${(props) => (props.toggleMenu ? '1' : '0')};
		transition: 1s ease-in;
	}
`;

export const NavLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 5px;
  display: block;
  margin-top:5px;
  text-decoration: none;
  font-weight: 400;
  font-size: 17px;
  position: relative;
  color: #fff;
  &:before {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    border-top: 1px solid  #ffcc00;
    border-left: 1px solid  #ffcc00;
    opacity: 0;
    transition: 0.3s ease-out;
  }
  &:after {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid  #ffcc00;
    border-right: 1px solid  #ffcc00;
    opacity: 0;
    transition: 0.3s ease-out;
  }
  &:hover:before,
  &:hover:after {
    opacity: 1;
  }
  &:hover {
    color: #ffcc00; /* Updated color */
  }
  &:active:before,
  &:active:after {
    opacity: 0;
  }
`;

export const MobileMenuContainer = styled.div`
	width: 22px;
	height: 28px;
	position: relative;
	display: ${(props) => (props.menu ? 'grid' : 'none')};
	place-items: center;
	cursor: pointer;
	overflow: hidden;
	&:hover > :last-child {
		transform: translateX(0%);
	}
`;

export const MobileMenu = styled(BiMenuAltRight)`
	font-size: 28px;
	position: absolute;
`;

export const MobileMenuHover = styled(BiMenu)`
	font-size: 28px;
	position: absolute;
	transform: translateX(50%);
	transform-origin: left;
	transition: 0.3s ease-out;
`;