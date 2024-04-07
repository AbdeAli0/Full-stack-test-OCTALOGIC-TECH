import React, { useEffect, useState } from 'react'

const Table = () => {


    const [data, setData] = useState([])

    useEffect(() => {
        console.log("hello");
        const url = 'http://localhost:8080/booking';

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                setData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const convertTime = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based, so add 1
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        console.log(formattedDate);
        return formattedDate
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type Id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Start</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking End</th>

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        data.map((items) => {
                            return <tr>
                                <td className="px-6 py-4 whitespace-nowrap">{items.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{items.firstName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{items.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{items.type === "cartype"? "Four Wheeler": "Two Wheeler"}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{items.typeId}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{items.modelName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{convertTime(items.bookingStart)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{convertTime(items.bookingEnd)}</td>
                            </tr>

                        })
                    }
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    )
}

export default Table