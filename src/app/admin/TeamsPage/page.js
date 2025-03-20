import AdminNav from "@/app/Components/AdminNav";
import AdminSideBar from "@/app/Components/AdminSideBar";
import AdminFooter from "@/app/Components/AdminFooter";

const TeamPage = () => {
    return (
        <div>
            <header>
                <AdminNav />
            </header>

            <main>
                <AdminSideBar />
            </main>

            <footer>
                <AdminFooter />
            </footer>
        </div>
    );
};

export default TeamPage;