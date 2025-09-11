import React, { useState } from 'react';

const styles = `
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: left;
    align-items: flex-start;
    padding-top: 20px;
    z-index: 1000;
  }

  .modal-content {
    background-color: #fff;
    width: 90%;
    max-width: 300px;
    height: 100vh;
    // border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    width: 150px;
    height: auto;
  }

  .close {
    font-size: 24px;
    cursor: pointer;
    color: #666;
  }

  .menu-item {
    font-size: 16px;
    color: #333;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    text-align: left;
  }

  .sign-in {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    color: #333;
    text-align: left;
  }

  .profile-icon {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 768px) {
    .modal {
      display: none;
    }
  }
`;

const MoreModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <style>{styles}</style>
      <div className="modal-content">
        <div className="header">
          <img src="/assets/images/KF/logo.svg" alt="Enterprise Journey" className="logo" />
          <span className="close" onClick={handleClose}>×</span>
        </div>
        {/* <div className="menu-item">Discover AbuDhabi</div> */}
        <div className="menu-item">Become a Partner</div>
        <div className="sign-in">
          <img src="/assets/images/KF/profile.svg" alt="Profile" className="profile-icon" />
          Sign In or Register
        </div>
      </div>
    </div>
  );
};

export default MoreModal;