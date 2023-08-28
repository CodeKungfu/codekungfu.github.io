const { useState, useEffect } = React;
export function Modal({error}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (error) {
            setIsModalOpen(true) 
        } else {
            setIsModalOpen(false) 
        }
    }, [error])
    return (
        <>
            <div style={{ display: isModalOpen ? 'block' : 'none' }}>
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded p-4">
                        <h2 className="text-xl font-bold mb-2">接口异常</h2>
                        <p>{error}</p>
                        <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </>
        
    )
}