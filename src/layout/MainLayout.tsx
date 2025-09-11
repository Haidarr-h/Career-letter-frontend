import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import type { MainLayoutProps } from "../types/index"

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </>
    )
}

export default MainLayout;