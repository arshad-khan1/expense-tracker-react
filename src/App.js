import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      description: "",
      amount: "",
      category: "",
      list: [],
    };
  }

  // Update state based on input field
  updateInput(field, value) {
    this.setState({
      [field]: value,
    });
  }

  // Add expense if input fields are not empty
  addItem() {
    const { description, amount, category } = this.state;
    if (description !== "" && amount !== "" && category !== "") {
      const newExpense = {
        id: Math.random(), // Add a random id for deletion
        description,
        amount: parseFloat(amount), // Convert amount to a number
        category,
      };

      // Update list
      const list = [...this.state.list];
      list.push(newExpense);

      // Reset state
      this.setState({
        list,
        description: "",
        amount: "",
        category: "",
      });
    }
  }

  // Function to delete expense from list using id
  deleteItem(key) {
    const list = [...this.state.list];
    const updatedList = list.filter((item) => item.id !== key);
    this.setState({
      list: updatedList,
    });
  }

  // Function to edit an expense
  editItem = (index) => {
    const expenses = [...this.state.list];
    const expenseToEdit = expenses[index];
    const editedDescription = prompt("Edit description:", expenseToEdit.description);
    const editedAmount = prompt("Edit amount:", expenseToEdit.amount);
    const editedCategory = prompt("Edit category:", expenseToEdit.category);

    if (
      editedDescription !== null &&
      editedAmount !== null &&
      editedCategory !== null &&
      editedDescription.trim() !== "" &&
      editedAmount.trim() !== "" &&
      editedCategory.trim() !== ""
    ) {
      expenses[index] = {
        ...expenseToEdit,
        description: editedDescription,
        amount: parseFloat(editedAmount),
        category: editedCategory,
      };
      this.setState({
        list: expenses,
      });
    }
  };

  // Function to calculate total expenses
  calculateTotal() {
    return this.state.list.reduce((total, item) => total + item.amount, 0).toFixed(2);
  }

  render() {
    return (
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          EXPENSE TRACKER
        </Row>

        <hr />
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Description"
                value={this.state.description}
                onChange={(e) => this.updateInput("description", e.target.value)}
                aria-label="Description"
              />
              <FormControl
                placeholder="Amount"
                type="number"
                value={this.state.amount}
                onChange={(e) => this.updateInput("amount", e.target.value)}
                aria-label="Amount"
              />
              <FormControl
                placeholder="Category"
                value={this.state.category}
                onChange={(e) => this.updateInput("category", e.target.value)}
                aria-label="Category"
              />
              <Button variant="dark" onClick={() => this.addItem()}>
                ADD
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <ListGroup>
              {this.state.list.map((item, index) => (
                <ListGroup.Item
                  key={item.id}
                  variant="dark"
                  action
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{item.description}</strong> - ₹{item.amount.toFixed(2)} ({item.category})
                  </div>
                  <span>
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="light"
                      onClick={() => this.deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                    <Button variant="light" onClick={() => this.editItem(index)}>
                      Edit
                    </Button>
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Total: ₹{this.calculateTotal()}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
