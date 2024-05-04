import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Api from "../../../../tools/api";

function EditCategory({ show, handleClose, category, fetchCategories }) {
  const [formData, setFormData] = useState({
    name: "",
    desc: ""
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        desc: category.desc
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.fetch({
        url: `editcategory/${category.id}`,
        method: "PUT",
        token: localStorage.getItem("token"),
        body: formData
      });
      console.log("response", response);
      fetchCategories();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control style={{marginBottom:"10px"}}
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control style={{marginBottom:"10px"}}
              type="text"
              placeholder="Enter description"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditCategory;
