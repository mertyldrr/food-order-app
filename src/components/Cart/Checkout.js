import { Form } from 'react-bootstrap';

const Checkout = () => {
  return (
    <Form className="d-flex-row">
      <Form.Group className="mb-2">
        <Form.Label>Your Name</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Street</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Post Code</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
    </Form>
  )
};

export default Checkout;