import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import './ListEmployeeComponent.css'; // Import custom styles

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
        };
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then((res) => {
            this.setState({
                employees: this.state.employees.filter((employee) => employee.id !== id),
            });
        });
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div className="container my-5">
                <div className="header-section text-center mb-4">
                    <h2>Employees List</h2>
                </div>
                <div className="row mb-3">
                    <button className="btn btn-primary add-btn" onClick={this.addEmployee}>
                        Add Employee
                    </button>
                </div>
                <div className="row">
                    <table className="table table-striped table-hover table-bordered shadow">
                        <thead className="thead-dark">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td className="action-buttons">
                                        <button
                                            onClick={() => this.editEmployee(employee.id)}
                                            className="btn btn-info btn-sm"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => this.deleteEmployee(employee.id)}
                                            className="btn btn-danger btn-sm mx-2"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => this.viewEmployee(employee.id)}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;
