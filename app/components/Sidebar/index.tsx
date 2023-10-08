import Navlinks from "../Navlinks";

export default function Sidebar() {

  return (
    <aside className="bg-gray-800 sm:w-1/3 sm:min-h-screen lg:w-1/5 px-4 py-3">  
      <div>
        <h2 className="font-bold text-white text-2xl">CRM Customers</h2>
      </div>
      <nav className="list-none mt-5 flex flex-col gap-2 text-white">
        <Navlinks />
      </nav>
    </aside>
  )
}