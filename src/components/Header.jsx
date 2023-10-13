import logo from "../images/logo.png";

function Header() {
	return (
		<div className="text-center">
			<header className="App-header m-6">
				<img
					src={logo}
					className="img-fluid"
					alt="logo"
					style={{ maxHeight: "100px" }}
				/>
				<h1>HUNGRY?</h1>
				<h2>Let's Decide What to Eat!</h2>
			</header>
		</div>
	);
}

export default Header;
