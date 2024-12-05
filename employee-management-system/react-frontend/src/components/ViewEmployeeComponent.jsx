import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import './ViewEmployeeComponent.css'; // Import custom styles

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            employee: {},
        };
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            this.setState({ employee: res.data });
        });
    }

    render() {
        return (
            <div className="container my-5">
                <div className="card col-md-8 offset-md-2 shadow-lg p-4">
                    <h3 className="text-center mb-4">Employee Details</h3>
                    <div className="card-body">
                        <div className="row mb-3">
                            <label className="col-sm-4 font-weight-bold">First Name:</label>
                            <div className="col-sm-8">{this.state.employee.firstName || 'N/A'}</div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 font-weight-bold">Last Name:</label>
                            <div className="col-sm-8">{this.state.employee.lastName || 'N/A'}</div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 font-weight-bold">Email ID:</label>
                            <div className="col-sm-8">{this.state.employee.emailId || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;
