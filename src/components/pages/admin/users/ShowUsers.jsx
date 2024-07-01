import React, { useState, useEffect } from "react";
import Api from "../../../../tools/api";
import { Button, Table } from "react-bootstrap";
import AddUserForm from "./AddUserForm"; // استيراد المكون الجديد
import Dashboard from "../dashboard";
import EditUserForm from "./EditUserForm";
import Loading from '../../../shared/Loading';

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false); // حالة النافذة المنبثقة
  const [showEditeUserForm, setshowEditeUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true); // تعيين حالة التحميل لتكون صحيحة عند بدء التحميل
      const response = await Api.fetch({
        url: "users",
        method: "GET",
        token: localStorage.getItem("token"),
      });
      setLoading(false); // تعيين حالة التحميل لتكون خاطئة بعد اكتمال التحميل
      setUsers(response.data);
    } catch (error) {
      setLoading(false); // في حالة حدوث خطأ، تأكد من إيقاف حالة التحميل
      setError(error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await Api.fetch({
        url: `users/${userId}`,
        method: "DELETE",
        token: localStorage.getItem("token"),
      });
      fetchUsers();
    } catch (error) {
      setError(error);
    }
  };

  const handleCloseshowEditeUserForm = () => {
    setshowEditeUserForm(false);
  };

  const handleShowEditUserForm = (user) => {
    setSelectedUser(user);
    setshowEditeUserForm(true);
  };

  const handleCloseAddUserForm = () => {
    setShowAddUserForm(false);
  };

  const handleShowAddUserForm = () => {
    setShowAddUserForm(true);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Dashboard />
      <div className="main_content">
        <div
          style={{
            width: "100%",
            height: "50px",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          <span className="subtitle">All Users in Website</span>
        </div>
        <div>
          <Button
            onClick={handleShowAddUserForm}
            style={{
              marginLeft: "90%",
              backgroundColor: "#9F5449",
              border: "none",
            }}
          >
            Add user
          </Button>
          <br />
          {loading ? (
            
            <Loading /> // عرض عنصر التحميل إذا كانت حالة التحميل صحيحة
          ) : (
            <div className="table-responsive" style={{ margin: "20px" }}>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Adress</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.email}</td>
                      <td>{user.name}</td>
                      <td>{user.address}</td>
                      <td>{user.role}</td>
                      <td>
                        <Button
                          style={{ margin: "10px" }}
                          variant="danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleShowEditUserForm(user)}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          <AddUserForm
            show={showAddUserForm}
            handleClose={handleCloseAddUserForm}
            fetchUsers={fetchUsers}
          />
          <EditUserForm
            show={showEditeUserForm}
            handleClose={handleCloseshowEditeUserForm}
            user={selectedUser}
            fetchUsers={fetchUsers}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowUsers;
