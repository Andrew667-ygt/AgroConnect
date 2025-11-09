import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Nav, Tab, Button, Modal, Form } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FiPlus, FiEdit2, FiTrash2, FiBarChart, FiBox, FiShoppingBag, FiTruck, FiDollarSign } from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    description: '',
    image: null
  });
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [analytics, setAnalytics] = useState({
    salesData: [],
    orderStats: {},
    inventoryStats: {}
  });

  useEffect(() => {
    fetchProducts();
    fetchDashboardData();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/farmer/products', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, inventoryRes, analyticsRes] = await Promise.all([
        fetch('/api/farmer/orders'),
        fetch('/api/farmer/inventory'),
        fetch('/api/farmer/analytics')
      ]);

      const [ordersData, inventoryData, analyticsData] = await Promise.all([
        ordersRes.json(),
        inventoryRes.json(),
        analyticsRes.json()
      ]);

      setOrders(ordersData);
      setInventory(inventoryData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const url = editProduct 
        ? `/api/farmer/products/${editProduct.id}`
        : '/api/farmer/products';
      const method = editProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formDataToSend
      });

      if (response.ok) {
        setShowModal(false);
        fetchProducts();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({ ...product });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/farmer/products/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const resetForm = () => {
    setEditProduct(null);
    setFormData({
      name: '',
      category: '',
      quantity: '',
      price: '',
      description: '',
      image: null
    });
  };

  const salesChartData = {
    labels: analytics.salesData.map(d => d.date),
    datasets: [{
      label: 'Sales (GH₵)',
      data: analytics.salesData.map(d => d.amount),
      borderColor: '#28a745',
      tension: 0.4
    }]
  };

  const inventoryChartData = {
    labels: inventory.map(item => item.name),
    datasets: [{
      label: 'Stock Level (kg)',
      data: inventory.map(item => item.quantity),
      backgroundColor: '#28a745'
    }]
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'warning',
      'processing': 'info',
      'shipped': 'primary',
      'delivered': 'success',
      'cancelled': 'danger'
    };
    return colors[status] || 'secondary';
  };

  const getStockStatus = (item) => {
    const available = item.quantity - item.reserved;
    if (available <= 0) return 'Out of Stock';
    if (available < 10) return 'Low Stock';
    return 'In Stock';
  };

  const getStockStatusColor = (item) => {
    const available = item.quantity - item.reserved;
    if (available <= 0) return 'danger';
    if (available < 10) return 'warning';
    return 'success';
  };

  const handleOrderAction = async (orderId) => {
    try {
      // Fetch order details
      const response = await fetch(`/api/farmer/orders/${orderId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const orderDetails = await response.json();
      
      // You can add modal or navigation logic here to manage the order
      console.log('Managing order:', orderDetails);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleUpdateStock = async (itemId) => {
    try {
      // You can add modal or form logic here to update stock
      const newQuantity = window.prompt('Enter new stock quantity:');
      if (newQuantity === null) return;

      const response = await fetch(`/api/farmer/inventory/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: parseInt(newQuantity, 10) })
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data after update
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <Container fluid className="dashboard-container mt-4">
      {/* Dashboard Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="icon-wrapper bg-success-light">
                  <FiDollarSign className="text-success" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-1">Total Sales</h6>
                  <h4 className="mb-0">₵{analytics.orderStats.totalSales}</h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="icon-wrapper bg-primary-light">
                  <FiShoppingBag className="text-primary" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-1">Total Orders</h6>
                  <h4 className="mb-0">{orders.length}</h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="icon-wrapper bg-warning-light">
                  <FiTruck className="text-warning" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-1">Pending Orders</h6>
                  <h4 className="mb-0">{orders.filter(o => o.status === 'pending').length}</h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="icon-wrapper bg-danger-light">
                  <FiBox className="text-danger" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-1">Low Stock Products</h6>
                  <h4 className="mb-0">{inventory.filter(item => item.quantity < 10).length}</h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tab.Container defaultActiveKey="analytics">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="analytics">Analytics</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="inventory">Inventory</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="products">Products</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="analytics">
                <Card>
                  <Card.Body>
                    <h5>Sales Overview</h5>
                    <Line data={salesChartData} />
                  </Card.Body>
                </Card>
                <Card className="mt-4">
                  <Card.Body>
                    <h5>Inventory Levels</h5>
                    <Bar data={inventoryChartData} />
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="orders">
                <Card>
                  <Card.Body>
                    <h5>Recent Orders</h5>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Products</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.customer.name}</td>
                            <td>{order.items.length} items</td>
                            <td>₵{order.total}</td>
                            <td>
                              <span className={`badge bg-${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleOrderAction(order.id)}
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="inventory">
                <Card>
                  <Card.Body>
                    <h5>Inventory Management</h5>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>In Stock</th>
                          <th>Reserved</th>
                          <th>Available</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventory.map(item => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}kg</td>
                            <td>{item.reserved}kg</td>
                            <td>{item.quantity - item.reserved}kg</td>
                            <td>
                              <span className={`badge bg-${getStockStatusColor(item)}`}>
                                {getStockStatus(item)}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-success"
                                onClick={() => handleUpdateStock(item.id)}
                              >
                                Update Stock
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="products">
                <Card className="products-table-card">
                  <Card.Body>
                    <h4>My Products</h4>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price (₵)</th>
                          <th>Quantity</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td>
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="product-thumb"
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}kg</td>
                            <td>
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(product)}
                              >
                                <FiEdit2 />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDelete(product.id)}
                              >
                                <FiTrash2 />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price per kg (₵)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                accept="image/*"
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                {editProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}