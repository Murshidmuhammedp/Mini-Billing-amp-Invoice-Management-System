import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import customAxios from '../../api/axiosInstance';
import toast from 'react-hot-toast';

const SalesInvoice = () => {
    const tableHeadings = ["Invoice No", "Customer", "Total Amount", "Payment", "Date", "Action"];
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [sales, setSales] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [invoiceItems, setInvoiceItems] = useState([
        { productId: "", quantity: 1, price: 0, name: "" },
    ]);
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        quantity: '',
    });
    const [paymentStatus, setPaymentStatus] = useState('Unpaid');
    const token = localStorage.getItem("token");

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await customAxios.get('/api/sales/listSales', {
                    headers: {
                        Authorization: token
                    }
                })
                setSales(response.data.sales)
            } catch (error) {
                console.log(error);
            }
        }
        fetchSales();
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [productRes, customerRes] = await Promise.all([
                    customAxios.get('/api/product/products',
                        {
                            headers:
                            {
                                Authorization: token
                            }
                        }),
                    customAxios.get('/api/customer/customers',
                        {
                            headers:
                            {
                                Authorization: token
                            }
                        })
                ]);
                setProducts(productRes.data.products);
                setCustomers(customerRes.data.customers);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInitialData();
    }, []);

    const handleAddInvoice = () => {
        setIsEdit(false);
        setSelectedCustomer('');
        setInvoiceItems([{ productId: "", quantity: 1, price: 0 }]);
        setPaymentStatus('Unpaid');
        setShowForm(true);
    };

    const handleProductChange = (index, productId) => {
        const selectedProduct = products.find(prod => prod._id === productId);
        const updatedItems = [...invoiceItems];
        updatedItems[index].productId = productId;
        updatedItems[index].price = selectedProduct ? selectedProduct.price : 0;
        setInvoiceItems(updatedItems);
    };

    const handleQuantityChange = (index, quantity) => {
        const updatedItems = [...invoiceItems];
        updatedItems[index].quantity = Number(quantity);
        setInvoiceItems(updatedItems);
    };

    const addProductRow = () => {
        setInvoiceItems([...invoiceItems, { productId: "", quantity: 1, price: 0 }]);
    };
    const removeProductRow = (index) => {
        const updatedItems = [...invoiceItems];
        updatedItems.splice(index, 1);
        setInvoiceItems(updatedItems);
    };

    const calculateSubtotal = () => {
        return invoiceItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.10;
    const grandTotal = subtotal + tax;

    const handleEditSales = (sale) => {
        console.log(sale, "function")
        setIsEdit(true);
        setEditingId(sale._id);
        setFormData({
            productName: sale.customerId.name,
            description: sale.description,
            quantity: sale.quantity,
        });
        setShowForm(true);
    };
    const handlePayment = async (id) => {
        const response = await customAxios.patch(`/api/sales/paymentstatus/${id}`, {
            headers: {
                Authorization: token
            }
        })
    }

    const handleActive = async (id) => {
        const response = await customAxios.patch(`/api/sales/isactive/${id}`, {
            headers: {
                Authorization: token
            }
        })
    }

    const handleSubmit = async () => {
        if (!selectedCustomer || invoiceItems.length === 0) {
            toast.success("Select a customer and at least one product.");
            return;
        }

        const products = invoiceItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        const invoiceData = {
            customerId: selectedCustomer,
            products,
            totalPrice: grandTotal,
            isPaid: paymentStatus
        };

        try {
            if (isEdit) {
                await customAxios.put(`/api/invoice/${editingId}`, invoiceData,
                    { headers: { Authorization: token } });
                toast.success("Invoice updated successfully");
            } else {
                await customAxios.post('/api/sales/sales', invoiceData, {
                    headers:
                        { Authorization: token }
                });
                toast.success("Invoice created successfully");
            }
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="flex relative h-screen">
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex flex-col flex-grow ${showForm ? 'blur-sm pointer-events-none transition-all duration-300' : ''}`}>
                <Navbar />
                <div className="p-4">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className='flex justify-between'>
                            <h3 className="text-xl font-bold mb-4">Sales Invoices</h3>
                            <button
                                onClick={handleAddInvoice}
                                className='bg-green-500 rounded text-white w-[150px] hover:bg-green-600'>
                                Add Invoice
                            </button>
                        </div>
                        <table className="min-w-full table-auto border-collapse text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    {tableHeadings.map((title, index) => (
                                        <th key={index} className="py-3 px-4 border-b font-semibold text-gray-700">{title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sales && sales.map((sale, index) => {
                                    const dateOnly = sale.createdAt?.split('T')[0];
                                    return (
                                        <tr key={sale._id} className="hover:bg-gray-50">
                                            <td className="py-3 px-4 border-b">{sale._id}</td>
                                            <td className="py-3 px-4 border-b">{sale.customerId.name}</td>
                                            <td className="py-3 px-4 border-b">{sale.totalPrice}</td>
                                            <td className="py-3 px-4 border-b"> <button
                                                onClick={() => handlePayment(sale._id)}
                                                className={`py-1 px-3 rounded ml-4 ${sale.isPaid ? 'bg-green-400 hover:bg-green-500' : 'bg-red-400 hover:bg-red-500'
                                                    } text-white`}
                                            >
                                                {sale.isPaid ? 'Paid' : 'Unpaid'}
                                            </button>
                                            </td>
                                            <td className="py-3 px-4 border-b">{dateOnly}</td>
                                            <td className="py-3 px-4 border-b">
                                                {/* <button
                                                    onClick={() => handleEditSales(sale)}
                                                    className={"py-1 px-3 rounded bg-blue-500 text-white hover:bg-blue-600"}
                                                >
                                                    Edit
                                                </button> */}
                                                <button
                                                    onClick={() => handleActive(sale._id)}
                                                    className={`py-1 px-3 rounded ml-4 ${sale.isActive ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'
                                                        } text-white`}
                                                >
                                                    {sale.isActive ? 'Active' : 'Unactive'}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right Half-Screen Form */}
            {showForm && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                    <div className="w-full max-w-4xl bg-white shadow-lg rounded p-8 max-h-[90vh] overflow-y-auto">

                        <h2 className="text-2xl font-bold mb-6">Create Sales Invoice</h2>

                        {/* Customer Selection */}
                        <div className="mb-4">
                            <label className="block mb-1 font-semibold">Select Customer:</label>
                            <select
                                value={selectedCustomer}
                                onChange={(e) => setSelectedCustomer(e.target.value)}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">-- Select Customer --</option>
                                {customers.map((cust) => (
                                    <option key={cust._id} value={cust._id}>
                                        {cust.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Product Rows */}
                        <div>
                            <label className="block mb-1 font-semibold">Invoice Items:</label>
                            {invoiceItems.map((item, index) => (
                                <div key={index} className="flex space-x-2 mb-2 items-center">
                                    <select
                                        value={item.productId}
                                        onChange={(e) => handleProductChange(index, e.target.value)}
                                        className="w-1/3 border p-2 rounded"
                                    >
                                        <option value="">-- Product --</option>
                                        {products.map((prod) => (
                                            <option key={prod._id} value={prod._id}>
                                                {prod.productName}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        className="w-1/4 border p-2 rounded"
                                    />
                                    <span className="w-1/4 p-2 text-gray-700">
                                        ₹{item.price * item.quantity}
                                    </span>
                                    <button
                                        onClick={() => removeProductRow(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addProductRow}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            >
                                Add Product
                            </button>
                        </div>

                        {/* Totals */}
                        <div className="mt-6 space-y-1">
                            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                            <p>Tax (10%): ₹{tax.toFixed(2)}</p>
                            <p className="font-bold">Grand Total: ₹{grandTotal.toFixed(2)}</p>
                        </div>

                        {/* Payment Status */}
                        <div className="mt-4">
                            <label className="block mb-1 font-semibold">Payment Status:</label>
                            <select
                                value={paymentStatus}
                                onChange={(e) => setPaymentStatus(e.target.value)}
                                className="w-1/2 border p-2 rounded"
                            >
                                <option value="Unpaid">Unpaid</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>

                        {/* Submit + Cancel Buttons */}
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>


    );
};

export default SalesInvoice;
