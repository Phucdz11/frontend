import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../style/image/kht.png';

const Header = () => {
    return (
        <header className="p-3 d-flex align-items-center justify-content-between fixed-top border-bottom" style={{ backgroundColor: 'white'}}>
            <div className="d-flex align-items-center">
                <a href="/user/dashboard">
                    <img 
                        src={logo}
                        alt="TST" 
                        style={{ width: '150px', height: '75px', marginLeft: '10px' }} 
                    />
                </a>
                {/* <a href="/dashboard" className="ms-0 mb-0" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold'}}>Khoa Học Trẻ</a> */}
            </div>
            {/* <form class="form-inline d-flex">
                <div class="input-group ">
                    <input class="form-control rounded border-1 p-1" type="search" placeholder="Search" aria-label="Search" style={{ boxShadow: 'none', width: '235px' }} />
                    <div class="input-group-append ">
                        <button class="btn btn-outline-secondary ms-1" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form> */}
        </header>
    );
};
export default Header;