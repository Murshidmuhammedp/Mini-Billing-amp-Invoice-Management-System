import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import customAxios from '../../api/axiosInstance';
import toast from 'react-hot-toast';

const Products = () => {
    const headline = ["Sl. No", "Product Name", "Description", "Quantity", "Price", "Action"]
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        quantity: '',
        price: ' '
    });
    const token = localStorage.getItem("token");


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            await customAxios.get('/api/product/products', {
                headers: {
                    Authorization: token
                }
            })
                .then((result) => {
                    setProducts(result.data.products)
                }).catch((error) => {
                    console.log(error);
                })
        }
        fetchProducts();
    }, []);

    const toggleBlock = async (id) => {
        await customAxios.patch(`/api/product/islisted/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then((result) => {
                alert(result.data.message)
            }).catch((error) => {
                console.log(error);
            })
    };

    const handleAddProduct = () => {
        setIsEdit(false);
        setFormData({
            productName: '',
            description: '',
            quantity: '',
            price: '',
        });
        setShowForm(true);
    };

    const handleEditProduct = (product) => {
        setIsEdit(true);
        setEditingId(product._id);
        setFormData({
            productName: product.productName,
            description: product.description,
            quantity: product.quantity,
            price: product.price
        });
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const { productName, description, quantity, price } = formData;
        if (!productName || !description || !quantity || !price) {
            toast.success("All fields are required");
            return;
        }
        try {
            if (isEdit) {
                await customAxios.put(`/api/product/updateproduct/${editingId}`, formData, {
                    headers: {
                        Authorization: token
                    }
                });
                toast.success("Product updated successfully");
            } else {
                await customAxios.post('/api/product/addproduct', formData, {
                    headers: {
                        Authorization: token
                    }
                });
                toast.success("Product added successfully");
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
                            <h3 className="text-xl font-bold mb-4">Products</h3>
                            <button
                                onClick={handleAddProduct}
                                className='bg-blue-500 rounded text-white w-[150px] hover:bg-blue-600'>
                                Add Product
                            </button>
                        </div>
                        <table className="min-w-full table-auto border-collapse text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    {headline.map((title, index) => (
                                        <th key={index} className="py-2 px-4 border-b font-semibold text-gray-700">{title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product, index) => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border-b">{index + 1}</td>
                                        <td className="py-3 px-4 border-b">{product.productName}</td>
                                        <td className="py-3 px-4 border-b">{product.description}</td>
                                        <td className="py-3 px-4 border-b">{product.quantity}</td>
                                        <td className="py-3 px-4 border-b">{product.price}</td>
                                        <td className="py-3 px-4 border-b">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className={"py-1 px-3 rounded bg-blue-500 text-white hover:bg-blue-600"}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => toggleBlock(product._id)}
                                                className={`py-1 px-3 rounded ml-4 ${product.isListed ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
                                                    } text-white`}
                                            >
                                                {product.isListed ? 'Unlisted' : 'Listed'}
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
                                <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit Product' : 'Add Product'}</h2>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        placeholder="Product Name"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="Quantity"
                                        className="w-full border p-2 rounded"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Price"
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

export default Products;
