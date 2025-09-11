const Navbar = () => {
    return (
        <nav className="py-3 px-[6%] bg-accentCustom">
            <ul className="flex flex-row justify-between text-white font-medium">
                <li>Career Letter</li>
                <ul className="flex flex-row gap-4">
                    <li><a href="">Generate</a></li>
                    <li><a href="https://haidar-hanif.netlify.app">Visit Developer's Profile</a></li>
                </ul>
            </ul>
        </nav>
    )
}

export default Navbar;