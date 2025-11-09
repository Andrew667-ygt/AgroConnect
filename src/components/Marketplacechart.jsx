import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

export default function MarketplaceCart() {
  const { cartItems, setCartItems } = useCart();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure price exists and is a number
    const savedCart = cartItems.map(item => ({
      ...item,
      price: Number(item.price) || 0
    }));
    setCartItems(savedCart);
    calculateTotal(savedCart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      return acc + (price * item.quantity);
    }, 0);
    setTotal(sum);
  };

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">Your cart is empty</h4>
          <Button 
            variant="success" 
            className="mt-3"
            onClick={() => navigate('/marketplace')}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            {cartItems.map(item => (
              <Card key={item.id} className="mb-3">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <img 
                        src={item.featured_img} 
                        alt={item.name} 
                        className="img-fluid rounded"
                      />
                    </Col>
                    <Col xs={9}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>{item.name}</h5>
                          <p className="text-muted mb-0">
                            Price: ₵{(Number(item.price) || 0).toFixed(2)}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <FiMinus />
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <FiPlus />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            className="ms-3"
                            onClick={() => removeItem(item.id)}
                          >
                            <FiTrash2 />
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5 className="mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <span>₵{total.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong>₵{total.toFixed(2)}</strong>
                </div>
                <Button 
                  variant="success" 
                  className="w-100"
                  disabled={cartItems.length === 0}
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}