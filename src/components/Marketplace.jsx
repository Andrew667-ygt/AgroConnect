import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import { FiSearch, FiFilter } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);    
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    region: 'all',
    sortBy: 'newest'
  });

  const { addToCart } = useCart();

  const handleAddToCart = (products) => {
    addToCart(products);
    // Optional: Show success toast
    toast.success('Added to cart!');
  };


  useEffect(() => {
    fetchProducts();
  }, );

  const fetchProducts = async () => {
    setError(null);
  
    try {
      const res = await axios.get(`${baseUrl}/courses/`, {
        // params: {
        //   search: filters.search,
        //   category: filters.category !== 'all' ? filters.category : undefined,
        //   region: filters.region !== 'all' ? filters.region : undefined,
        //   ordering: getSortParam(filters.sortBy)
        // }
      });
      if (res.status === 200) {
        setProducts(res.data);
        console.log('Successful response with data');
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }

  };

  const getSortParam = (sortBy) => {
    switch (sortBy) {
      case 'price-low':
        return 'price';
      case 'price-high':
        return '-price';
      case 'newest':
        return '-created_at';
      default:
        return '';
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <Container fluid className="marketplace-container">
      {/* Filter Sidebar */}
      <Row>
        <Col md={3} className="filters-sidebar">
          <Card className="filter-card">
            <Card.Body>
              <h5 className="mb-4">Filter Products</h5>
              
              <InputGroup className="mb-4">
                <InputGroup.Text>
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </InputGroup>

              <Form.Group className="mb-4">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="tubers">Tubers</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Region</Form.Label>
                <Form.Select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                >
                  <option value="all">All Regions</option>
                  <option value="ashanti">Ashanti Region</option>
                  <option value="greater-accra">Greater Accra</option>
                  <option value="northern">Northern Region</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Products Grid */}
        <Col md={9}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <Row xs={1} md={2} lg={3} className="g-4">
            {loading ? (
              <div className="text-center w-100 py-5">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center w-100 py-5">
                <h4 className="text-muted">No products found</h4>
              </div>
            ) : (
              products.map(course => (
                <Col key={course.id}>
                  <Card className="product-card h-100">
                    <div className="product-image-container">
                      <Card.Img 
                        variant="top" 
                        src={course.featured_img} 
                        className="product-image"
                      />
                      {course.organic && (
                        <span className="badge bg-success organic-badge">
                          Organic
                        </span>
                      )}
                    </div>
                    <Card.Body>
                      <Card.Title>{course.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {course.title} • {course.category}
                      </Card.Subtitle>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="text-success mb-0">₵{course.price}/kg</h5>
                        <button 
                          onClick={()=> handleAddToCart(course)}
                          className="btn btn-outline-success" to='/'>
                          Add to Cart
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}