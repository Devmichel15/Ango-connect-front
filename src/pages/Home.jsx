import SideBar from "../components/SideBar";
import Feed from "../components/Feed";

function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <aside className="hidden md:block w-64 fixed left-0 top-0 h-screen">
        <SideBar />
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 md:ml-64 flex justify-center">
        <div className="w-full max-w-2xl">
          <Feed />
        </div>
      </main>

    </div>
  );
}

export default Home;
