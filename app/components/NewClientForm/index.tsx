'use client';

export default function NewClientForm () {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex justify-center w-full max-w-lg">
        <form
          className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 max-w-sm"
        > 
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg"
            htmlFor="input-first-name"
          > 
            First name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="input-last-name"
          > 
            Last name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="input-last-name"
          > 
            Company
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            name="company"
            type="text"
            placeholder="Company"
          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="input-last-name"
          > 
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
          />
          <label 
            className="block text-gray-700 font-bold mb-2 text-lg mt-4"
            htmlFor="input-last-name"
          > 
            Phone (optional)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone (optional)"
          />
          <input 
            type="submit"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase rounded font-bold hover:bg-gray-900 cursor-pointer"
            value="add new client"
          />
        </form>
      </div>
    </div>
  )
}