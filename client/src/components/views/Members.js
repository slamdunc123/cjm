import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import {
  getMembers,
  addMember,
  deleteMember,
  updateMember
} from '../../redux/actions/memberActions';

// reactstrap
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

// prop-types
import PropTypes from 'prop-types';

class Members extends Component {
  // *** STATE ***

  // set initital local state of component
  state = {
    addModal: false,
    updateModal: false,
    deleteModal: false,
    id: '',
    name: '',
    role: '',
    error: '',
    success: ''
  };

  // get app state by getMembers dispatch
  componentDidMount() {
    this.props.getMembers();
  }

  // set add modal state
  addToggle = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  };

  // set update modal state
  updateToggle = () => {
    this.setState({
      updateModal: !this.state.updateModal
    });
  };

  // set delete modal state
  deleteToggle = () => {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  };

  // set state when filling out form fields
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // *** ADD MEMBERS ***

  // set form modals state
  onAddClick = () => {
    this.setState({
      addModal: true,
      updateModal: false,
      deleteModal: false,
      success: ''
    });
  };

  // render add form modal
  renderAddModal = () => {
    if (this.state.addModal) {
      return (
        <div>
          <Modal isOpen={this.state.addModal}>
            {/* <Modal isOpen='true'> */}
            <ModalHeader toggle={this.addToggle}>
              Add Member
              {/* render validation error */}
              <p className='error'>{this.state.error}</p>{' '}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={this.onSubmitAddMember}>
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Add Name'
                    onChange={this.onChange}
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='role'>Role</label>
                  <input
                    type='text'
                    name='role'
                    id='role'
                    placeholder='Add Role'
                    onChange={this.onChange}
                    className='form-control'
                  />
                  <br />
                  <button className='btn btn-info btn-block'>Add Member</button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  };

  // submit add form and call addMember dispatch
  onSubmitAddMember = e => {
    const { name, role } = this.state;
    e.preventDefault();
    // form validation
    if (name === '' || role === '') {
      this.setState({
        error: 'Please fill in all fields'
      });
    } else {
      const newMember = {
        name: name,
        role: role
      };

      this.props.addMember(newMember);
      this.setState({
        addModal: false,
        error: '',
        success: 'Member added successfully',
        name: '',
        role: ''
      });
    }
  };

  // *** UPDATE MEMBER ***

  // set form modals state
  onUpdateClick = (id, name, role) => {
    console.log(id + ' clicked');
    console.log(name + ' clicked');
    this.setState({
      updateModal: true,
      addModal: false,
      deleteModal: false,
      id: id,
      name: name,
      role: role,
      success: ''
    });
  };

  // render update form modal
  renderUpdateModal = () => {
    if (this.state.updateModal) {
      return (
        <div>
          <Modal isOpen={this.state.updateModal}>
            {/* <Modal isOpen='true'> */}
            <ModalHeader toggle={this.updateToggle}>
              Update Member - {this.state.id}
              {/* render validation error */}
              <p className='error'>{this.state.error}</p>{' '}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={this.onSubmitUpdateMember}>
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Update Name'
                    onChange={this.onChange}
                    defaultValue={this.state.name}
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='role'>Role</label>
                  <input
                    type='text'
                    name='role'
                    id='role'
                    placeholder='Update Role'
                    onChange={this.onChange}
                    defaultValue={this.state.role}
                    className='form-control'
                  />
                  <br />
                  <button className='btn btn-info btn-block'>
                    Update Member
                  </button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  };

  // submit update form and call updateMember dispatch
  onSubmitUpdateMember = e => {
    const { id, name, role } = this.state;
    e.preventDefault();
    // form validation
    if (name === '' || role === '') {
      this.setState({
        error: 'Please fill in all fields'
      });
    } else {
      const updatedMember = {
        name: name,
        role: role
      };

      this.props.updateMember(id, updatedMember);
      this.setState({
        updateModal: false,
        error: '',
        success: 'Member updated successfully',
        name: '',
        role: ''
      });
    }
  };

  // *** DELETE MEMBER ***

  // call deleteMember dispatch
  onDeleteClick = (id, name) => {
    this.setState({
      updateModal: false,
      addModal: false,
      deleteModal: true,
      id: id,
      name: name,
      // role: role,
      success: ''
    });
  };

  // render update form modal
  renderDeleteModal = () => {
    if (this.state.deleteModal) {
      return (
        <div>
          <Modal isOpen={this.state.deleteModal}>
            {/* <Modal isOpen='true'> */}
            <ModalHeader toggle={this.deleteToggle}>
              ID: {this.state.id}
              <br />
              Name: {this.state.name}
            </ModalHeader>
            <ModalBody>
              <p className='error'>Are you sure?</p>{' '}
              <form onSubmit={this.onSubmitDeleteMember}>
                <button className='btn btn-info btn-block'>
                  Delete Member
                </button>
              </form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  };

  // submit delete form and call deleteMember dispatch
  onSubmitDeleteMember = e => {
    const { id } = this.state;
    e.preventDefault();
    this.props.deleteMember(id);
    this.setState({
      deleteModal: false,
      error: '',
      success: 'Member deleted successfully'
    });
  };

  // *** RENDER COMPONENT ***

  // render main view
  render() {
    const { members } = this.props.members;
    console.log(this.props.members);

    return (
      <div>
        {/* show modal based on state value */}
        {this.renderAddModal()}
        {this.renderUpdateModal()}
        {this.renderDeleteModal()}
        <p className='success'>{this.state.success}</p>{' '}
        <div className='container'>
          <button
            className='btn btn-info'
            onClick={this.onAddClick}
            id='add-member-button'
          >
            Add Member
          </button>
          <br />
          <br />
          <table className='table table-bordered table-striped'>
            <thead className='bg-info text-light'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member._id}>
                  <td>{member._id}</td>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td>
                    <button
                      className='btn btn-info btn-sm'
                      onClick={() =>
                        this.onUpdateClick(member._id, member.name, member.role)
                      }
                    >
                      Update
                    </button>
                    &nbsp;
                    <button
                      className='btn btn-info btn-sm'
                      onClick={() =>
                        this.onDeleteClick(member._id, member.name)
                      }
                    >
                      Delete
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

// *** PROPS ***

// set prop types
Members.propTypes = {
  getMembers: PropTypes.func.isRequired,
  members: PropTypes.object.isRequired
};

// dispatch actions to state in store
const mapDispatchToProps = dispatch => {
  return {
    getMembers: () => {
      dispatch(getMembers()); // no parameters required to get all members
    },
    addMember: newMember => {
      dispatch(addMember(newMember)); // need to include all relevant fields to Add a new object
    },
    deleteMember: id => {
      dispatch(deleteMember(id)); // need only the id (or array index) to Delete the object
    },
    updateMember: (id, updatedMember) => {
      dispatch(updateMember(id, updatedMember)); // need to include all relevant fields to Add a new object
    }
  };
};

// retrieve state from store and map to the component's props
const mapStateToProps = state => ({
  members: state.members
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members);
