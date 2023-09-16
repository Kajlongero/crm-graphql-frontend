import Sidebar from "../components/Sidebar";

export default function CommonsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-200 min-h-screen">
      <Sidebar />
      <div className='w-2/3 lg:w-4/5 px-4 py-3'>
        {children}
      </div>
    </div>
  )
}