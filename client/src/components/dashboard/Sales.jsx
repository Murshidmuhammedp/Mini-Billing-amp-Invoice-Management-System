import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import customAxios from '../../api/axiosInstance';

const SalesInvoice = () => {
    const tableHeadings = ["Invoice No", "Customer", "Total Amount", "Payment", "Status", "Action"];
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [invoiceItems, setInvoiceItems] = useState([
        { productId: "", quantity: 1, price: 0, name: "" },
    ]);
    const [paymentStatus, setPaymentStatus] = useState('Unpaid');
    const token = localStorage.getItem("token");

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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
                console.log(productRes.data.products, "sales product kitti");
                console.log(customerRes.data.customers, "sales customer got it");
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

    const handleSubmit = async () => {
        if (!selectedCustomer || invoiceItems.length === 0) {
            alert("Select a customer and at least one product.");
            return;
        }

        const items = invoiceItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        const invoiceData = {
            customerId: selectedCustomer,
            items: selectedProducts,
            subtotal,
            tax,
            total: grandTotal,
            status: paymentStatus
        };

        try {
            if (isEdit) {
                await customAxios.put(`/api/invoice/${editingId}`, invoiceData,
                    { headers: { Authorization: token } });
                alert("Invoice updated successfully");
            } else {
                await customAxios.post('/api/invoice', invoiceData,
                    { headers: { Authorization: token } });
                alert("Invoice created successfully");
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
                                {/* {products && products.map((product, index) => (
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
                                ))} */}
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
