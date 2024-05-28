import React from 'react';
import { FaUserCircle, FaTachometerAlt, FaChartBar, FaBox, FaDollarSign, FaCog, FaPlus } from 'react-icons/fa';
import '../styles/create-product.css';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div>
        <div className="logo">EasyLearn</div>
        <div className="menu">
          <div className="menu-item"><FaTachometerAlt style={{ marginRight: '10px' }} /> Dashboard</div>
          <div className="menu-item"><FaChartBar style={{ marginRight: '10px' }} /> Vendas</div>
          <div className="menu-item"><FaBox style={{ marginRight: '10px' }} /> Produtos</div>
          <div className="menu-item"><FaDollarSign style={{ marginRight: '10px' }} /> Finanças</div>
        </div>
      </div>
      <div className="bottom-menu">
        <div className="menu-item"><FaCog style={{ marginRight: '10px' }} /> Configurações</div>
        <div className="user"><FaUserCircle style={{ marginRight: '10px' }} /> Nome do Usuário</div>
      </div>
    </div>
  );
};

const UploadField = ({ onFileChange }) => {
  return (
    <div className="upload-container">
      <button className="upload-button" onClick={() => document.getElementById('fileInput').click()}>
        <FaPlus />
      </button>
      <input type="file" id="fileInput" style={{ display: 'none' }} onChange={onFileChange} />
      <div>Faça o upload de seu produto/arquivo</div>
    </div>
  );
};

const TextField = ({ label, type = 'text', isTextArea = false }) => {
  return (
    <div className="field-container">
      <label className="label">{label}</label>
      {isTextArea ? <textarea className="textarea" rows="4" /> : <input className="input" type={type} />}
    </div>
  );
};

const PostCoursePage = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // handle file preview or upload logic here
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content">
        <h1>Postar Curso</h1>
        <div className="form-container">
          <div className="left-container">
            <UploadField onFileChange={handleFileChange} />
            <TextField label="Conteúdo do produto:" isTextArea={true} />
          </div>
          <div className="right-container">
            <TextField label="Título do produto:" />
            <TextField label="Categoria do produto:" />
            <TextField label="Descrição do produto:" isTextArea={true} />
            <TextField label="Preço do produto:" type="number" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateProduct = () => {
  return <PostCoursePage />;
};

export default CreateProduct;
