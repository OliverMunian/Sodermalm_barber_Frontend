import { MdCancel } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";

function FormSubmit() {
  return (
    <div className="mb-2 mt-2 w-full rounded-3xl bg-white p-2">
      <div className="flex w-full justify-center">
        <h1 className="text-xl font-semibold italic text-black">
          Your idendity
        </h1>
      </div>
      <form className="flex flex-col items-center">
        <input
          placeholder="Firstname"
          className="m-2 w-full rounded-lg border-b border-white bg-gray-200 p-3 text-black"
        />
        <input
          placeholder="Name"
          className="m-2 w-full rounded-lg border-b border-white bg-gray-200 p-3 text-black"
        />
        <input
          placeholder="Email"
          className="m-2 w-full rounded-lg border-b border-white bg-gray-200 p-3 text-black"
        />
        <div className="flex w-full justify-around">
          <button className="mt-3 flex items-center rounded-xl border-2 border-red-800 px-6 py-2 hover:bg-red-500">
            <p className="text-red-800">Cancel</p>
            <MdCancel className="ml-2 text-red-800" size={20} />
          </button>
          <button className="mt-3 flex rounded-xl border-2 border-green-800 px-6 py-2 hover:bg-green-500">
            <p className="text-green-800">Submit</p>
            <FaCalendarCheck className="ml-2 text-green-800" size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormSubmit;
