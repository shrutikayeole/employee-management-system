import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            errorMessage: '', // State to store validation message
        };
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return;
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId,
                });
            });
        }
    }

    validateGmail = () => {
        const { emailId } = this.state;
        if (!emailId.endsWith('@gmail.com')) {
            this.setState({ errorMessage: 'Email must be a valid @gmail.com address' });
            return false;
        }
        this.setState({ errorMessage: '' }); // Clear error message if valid
        return true;
    };

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if (!this.validateGmail()) {
            return; // Prevent submission if validation fails
        }
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
        console.log('employee => ' + JSON.stringify(employee));

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then((res) => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
                this.props.history.push('/employees');
            });
        }
    };

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    };

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    };

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    };

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>;
        } else {
            return <h3 className="text-center">Update Employee</h3>;
        }
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#f7f7f7',
                }}
            >
                <div
                    style={{
                        width: '50%',
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '30px',
                    }}
                >
                    {this.getTitle()}
                    <div style={{ marginTop: '20px' }}>
                        <form>
                            <div className="form-group">
                                <label style={{ fontWeight: 'bold' }}>First Name:</label>
                                <input
                                    placeholder="First Name"
                                    name="firstName"
                                    className="form-control"
                                    value={this.state.firstName}
                                    onChange={this.changeFirstNameHandler}
                                />
                            </div>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label style={{ fontWeight: 'bold' }}>Last Name:</label>
                                <input
                                    placeholder="Last Name"
                                    name="lastName"
                                    className="form-control"
                                    value={this.state.lastName}
                                    onChange={this.changeLastNameHandler}
                                />
                            </div>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label style={{ fontWeight: 'bold' }}>Email Id:</label>
                                <input
                                    placeholder="Email Address"
                                    name="emailId"
                                    className="form-control"
                                    value={this.state.emailId}
                                    onChange={this.changeEmailHandler}
                                    onBlur={this.validateGmail} // Validate on blur
                                />
                                {this.state.errorMessage && (
                                    <div style={{ color: 'red', marginTop: '5px' }}>
                                        {this.state.errorMessage}
                                    </div>
                                )}
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={this.cancel.bind(this)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;
