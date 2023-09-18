import Sidebar from "./components/Sidebar";

export default function Homepage() {
  return (
    <div className="flex bg-gray-200 min-h-screen">
      <Sidebar />
      <div className='w-2/3 lg:w-4/5 px-4 py-3'>
        <h1 className="text-2xl font-light">Homepage</h1>
      </div>
    </div>
  )
}