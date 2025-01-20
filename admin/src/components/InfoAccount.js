import React, { useState, useEffect } from 'react';
import '../style/Content.css';
import { useUser } from '../context/UserContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const InfoAccount = () => {
    const { username, fullname, password } = useUser(); // Giả sử password cũng được cung cấp từ context
    const [showPassword, setShowPassword] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAdminPassword, setShowAdminPassword] = useState({}); // Trạng thái hiển thị mật khẩu admin
    const [showUserPassword, setShowUserPassword] = useState({}); // Trạng thái hiển thị mật khẩu user

    const togglePasswordVisibility = (type, id) => {
        if (type === 'admin') {
            setShowAdminPassword(prev => ({ ...prev, [id]: !prev[id] }));
        } else if (type === 'user') {
            setShowUserPassword(prev => ({ ...prev, [id]: !prev[id] }));
        }
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const adminResponse = await fetch('http://localhost:8081/api/admin/getadminaccount');
                const userResponse = await fetch('http://localhost:8081/api/admin/getuseraccount');

                const adminData = await adminResponse.json();
                const userData = await userResponse.json();

                setAdmins(adminData);
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        };

        fetchAccounts();
    }, []);

    return (
        <div className="main-content">
            <h5>Thông tin tài khoản</h5>
            <div className="card mt-4">
                <div className="card-body">
                    <h6 className="card-title mb-3 text-success">Tài khoản đang hoạt động</h6>
                    <p className="card-text"><strong>Tên đăng nhập:</strong> {username}</p>
                    <p className="card-text"><strong>Họ và tên:</strong> {fullname}</p>
                    <p className="card-text">
                        <strong>Mật khẩu:</strong> 
                        <span className="ms-2">
                            {showPassword ? password : '••••••••••'}
                        </span>
                        <button 
                            onClick={() => setShowPassword(prev => !prev)} 
                            className="btn btn-link ms-1"
                            style={{ textDecoration: 'none' }}
                        >
                            {showPassword ? <AiFillEyeInvisible className='me-1 mb-1' style={{ fontSize: '20px', color: 'black' }} /> : <AiFillEye className='me-1 mb-1' style={{ fontSize: '20px', color: 'black' }} />}
                        </button>
                    </p>
                </div>
            </div>

            {/* Box cho tất cả tài khoản admin */}
            <div className="card mt-4">
                <div className="card-body">
                    <h6 className="card-title mb-3">Tài khoản Admin</h6>
                    {admins.map((admin) => (
                        <div key={admin.id}> 
                            <p className="card-text">
                                <strong>Tên đăng nhập:</strong> 
                                <span className='ms-2' onClick={() => setSelectedAdmin(selectedAdmin === admin ? null : admin)} style={{ cursor: 'pointer', color: 'blue' }}>
                                    {admin.username}
                                </span>
                            </p>
                            {selectedAdmin === admin && (
                                <>
                                    <p className="card-text"><strong>Họ và tên:</strong> {admin.fullname}</p>
                                    <p className="card-text">
                                        <strong>Mật khẩu:</strong> 
                                        <span className="ms-2">
                                            {showAdminPassword[admin.id] ? admin.password : '••••••••••'}
                                        </span>
                                        <button 
                                            onClick={() => togglePasswordVisibility('admin', admin.id)} 
                                            className="btn btn-link ms-1"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {showAdminPassword[admin.id] ? <AiFillEyeInvisible className='me-1 mb-1' style={{ fontSize: '20px', color: 'black' }} /> : <AiFillEye className='me-1 mb-1' style={{ fontSize: '20px', color: 'black' }} />}
                                        </button>
                                    </p>
                                </>
                            )}
                            <hr /> 
                        </div>
                    ))}
                </div>
            </div>

            {/* Box cho tất cả tài khoản user */}
            <div className="card mt-4">
                <div className="card-body">
                    <h6 className="card-title mb-3">Tài khoản User</h6>
                    {users.map((user) => (
                        <div key={user.id}> 
                            <p className="card-text">
                                <strong>Tên đăng nhập:</strong> 
                                <span className='ms-2' onClick={() => setSelectedUser(selectedUser === user ? null : user)} style={{ cursor: 'pointer', color: 'blue' }}>
                                    {user.username}
                                </span>
                            </p>
                            {selectedUser === user && (
                                <>
                                    <p className="card-text"><strong>Họ và tên:</strong> {user.fullname}</p>
                                    <p className="card-text"><strong>Số điện thoại:</strong> {user.phone}</p> {/* Hiển thị số điện thoại */}
                                    <p className="card-text">
                                        <strong>Mật khẩu:</strong> 
                                        <span className="ms-2">
                                            {showUserPassword[user.id] ? user.password : '••••••••••'}
                                        </span>
                                        <button 
                                            onClick={() => togglePasswordVisibility('user', user.id)} 
                                            className="btn btn-link ms-1"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {showUserPassword[user.id] ? <AiFillEyeInvisible className='me-1 mb-1' style={{ fontSize: '20px', color: 'black' }} /> : <AiFillEye className='me-1 mb-1' style={{ fontSize: '20px', color: 'black' }} />}
                                        </button>
                                    </p>
                                </>
                            )}
                            <hr /> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfoAccount;