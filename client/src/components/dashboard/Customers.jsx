import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import customAxios from '../../api/axiosInstance';
import toast from 'react-hot-toast';

const Customers = () => {
    const headline = ["Sl. No", "Name", "Email", "Mobile", "Location", "Action"]
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
    });
    const token = localStorage.getItem("token");


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            await customAxios.get('/api/customer/customers')
                .then((result) => {
                    setCustomers(result.data.customers)
                }).catch((error) => {
                    console.log(error);
                })
        }
        fetchCustomers();
    }, []);

    const toggleBlock = async (id) => {
        try {
            const response = await customAxios.patch(`/api/customer/block/${id}`);
            toast.success(response.data.message);
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) =>
                    customer._id === id
                        ? { ...customer, isBlocked: !customer.isBlocked }
                        : customer
                )
            );
        } catch (error) {
            console.log(error)
        }
    };

    const handleAddCustomer = () => {
        setIsEdit(false);
        setFormData({
            name: '',
            email: '',
            mobileNumber: '',
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: ''
            },
        });
        setShowForm(true);
    };

    const handleEditCustomer = (user) => {
        setIsEdit(true);
        setEditingId(user._id);
        setFormData({
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            address: {
                street: user.address.street,
                city: user.address.city,
                state: user.address.state,
                zipCode: user.address.zipCode,
                country: user.address.country
            }
        });
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const addressFields = ['street', 'city', 'state', 'zipCode', 'country'];

        if (addressFields.includes(name)) {
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };


    const handleSubmit = async () => {
        const { name, email, mobileNumber, address } = formData;
        if (!name || !email || !mobileNumber || !address.street || !address.city || !address.state || !address.zipCode || !address.country) {
            toast.success("All fields are required");
            return;
        }
        try {
            if (isEdit) {
                await customAxios.put(`/api/customer/updatecustomer/${editingId}`, formData, {
                    headers: { Authorization: token }
                });
                toast.success("Customer updated successfully");
            } else {
                await customAxios.post('/api/customer/addcustomer', formData, {
                    headers: {
                        Authorization: token
                    }
                });
                toast.success("Customer added successfully");
            }
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="flex">
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-grow">
                <Navbar />
                <div className="p-4">

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className='flex justify-between'>
                            <h3 className="text-xl font-bold mb-4">Customers</h3>
                            <button
                                onClick={handleAddCustomer}
                                className='bg-blue-500 rounded text-white w-[150px] hover:bg-blue-600'>
                                Add Customer
                            </button>
                        </div>
                        <table className="min-w-full table-auto border-collapse text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    {headline.map((title, index) => (
                                        <th key={index} className="py-3 px-4 border-b font-semibold text-gray-700">{title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {customers && customers.map((user, index) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border-b">{index + 1}</td>
                                        <td className="py-3 px-4 border-b">{user.name}</td>
                                        <td className="py-3 px-4 border-b">{user.email}</td>
                                        <td className="py-3 px-4 border-b">{user.mobileNumber}</td>
                                        <td className="py-3 px-4 border-b">{user.address.city},{user.address.state}</td>
                                        <td className="py-3 px-4 border-b">
                                            <button
                                                onClick={() => handleEditCustomer(user)}
                                                className={"py-1 px-3 rounded bg-blue-500 text-white hover:bg-blue-600"}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => toggleBlock(user._id)}
                                                className={`py-1 px-3 rounded ml-4 ${user.isBlocked ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                                                    } text-white`}
                                            >
                                                {user.isBlocked ? 'Unblock' : 'Block'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showForm && (
                        <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                                <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit Customer' : 'Add Customer'}</h2>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="Mobile"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.address.street}
                                        onChange={handleChange}
                                        placeholder="street"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.address.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.address.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.address.zipCode}
                                        onChange={handleChange}
                                        placeholder="ZipCode"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.address.country}
                                        onChange={handleChange}
                                        placeholder="Country"
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Customers
