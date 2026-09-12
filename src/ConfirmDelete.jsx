import "./App.css";

export default function ConfirmDelete({ howUse, children, setConfirmDelete, handleDeleteSlot }) {
    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" >

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

                <h2 className="text-xl font-bold text-gray-800">
                    {howUse}?
                </h2>

                <p className="text-gray-600 mt-3">
                    Are you sure you want to <span className="font-bold">{howUse}</span> this time slot?
                </p>


                {children}


                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={() => setConfirmDelete()}
                        className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => handleDeleteSlot()}
                        className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                    >
                        delete
                    </button>

                </div>

            </div>

        </div>

    );
}

