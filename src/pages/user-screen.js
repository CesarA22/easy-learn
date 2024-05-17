// src/components/UserScreen.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './src/styles/user-screen.css';

function UserScreen() {
  const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="user-screen-container">
      <aside className="sidebar">
        <div className="logo" onClick={() => history.push('/login')}>Easy Learn</div>
        <nav className="menu">
          <ul>
            <li onClick={() => history.push('/dashboard-user')}>Dashboard</li>
            <li>Vendas</li>
            <li>Produtos</li>
            <li>Finanças</li>
          </ul>
        </nav>
        <div className="settings">
          <p>Configurações</p>
          <p onClick={() => history.push('/user-screen')}>Carlos Eduardo</p>
        </div>
      </aside>
      <main className="main-content">
        <header>
          <h1>Configurações</h1>
        </header>
        <section className="profile">
          <h2>Perfil</h2>
          <div className="profile-content">
            <div className="profile-picture">
              <div className="picture">PB</div>
              <div className="edit-icon" onClick={toggleSidebar}>+</div>
            </div>
            <div className="profile-details">
              <p><strong>Nome:</strong> PIMEGONHO BIZONHO</p>
              <p><strong>Documento:</strong> 000.000.000-00</p>
              <p><strong>Telefone:</strong> +55 11 00000-0000</p>
            </div>
            <div className="profile-verification">
              <p><strong>Verificação:</strong> <span className="verified">Dados Verificados</span></p>
              <p><strong>E-mail:</strong> pimegonho.bizonho@gmail.com</p>
              <p><strong>Idioma:</strong> Português</p>
            </div>
            <button className="edit-button" onClick={toggleSidebar}>Editar</button>
          </div>
        </section>
        <section className="business">
          <h2>Negócios</h2>
          <div className="business-content">
            <button className="new-business-button">+ Novo Negócio</button>
          </div>
        </section>
      </main>

      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="edit-sidebar" onClick={e => e.stopPropagation()}>
            <div className="edit-header">
              <h2>Editar perfil</h2>
              <span className="close-btn" onClick={toggleSidebar}>×</span>
            </div>
            <div className="edit-content">
              <form>
                <section>
                  <h3>Identificação</h3>
                  <div className="form-group">
                    <label>Nome</label>
                    <input type="text" placeholder="Carlos Eduardo Fontes Camacho" />
                  </div>
                  <div className="form-group">
                    <label>Nacionalidade</label>
                    <select>
                      <option>Brasil</option>
                      {/* Outros países */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Idioma</label>
                    <select>
                      <option>Português</option>
                      {/* Outros idiomas */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Documento primário</label>
                    <select>
                      <option>CPF</option>
                      {/* Outros documentos */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Nº do documento primário</label>
                    <input type="text" placeholder="123.456.789-00" />
                  </div>
                  <div className="form-group">
                    <label>Documento extra</label>
                    <select>
                      <option>RG</option>
                      {/* Outros documentos */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Nº do documento extra</label>
                    <input type="text" placeholder="3961408466" />
                  </div>
                  <div className="form-group">
                    <label>Data de emissão do documento extra</label>
                    <input type="date" placeholder="01/01/2020" />
                  </div>
                  <div className="form-group">
                    <label>Data de nascimento</label>
                    <input type="date" placeholder="01/01/1990" />
                  </div>
                </section>
                <section>
                  <h3>Telefone</h3>
                  <div className="form-group">
                    <input type="text" placeholder="+55 11 98201-6760" />
                    <button>Atualizar</button>
                  </div>
                </section>
                <section>
                  <h3>E-mail</h3>
                  <div className="form-group">
                    <input type="email" placeholder="carlos.eduardo.fontes@gmail.com" />
                    <button>Atualizar</button>
                  </div>
                </section>
                <section>
                  <h3>Endereço</h3>
                  <div className="form-group">
                    <label>País</label>
                    <select>
                      <option>Brasil</option>
                      {/* Outros países */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>CEP</label>
                    <input type="text" placeholder="06454-000" />
                  </div>
                  <div className="form-group">
                    <label>Endereço</label>
                    <input type="text" placeholder="Rua, Avenida, Alameda" />
                  </div>
                  <div className="form-group">
                    <label>Número</label>
                    <input type="text" placeholder="123" />
                  </div>
                  <div className="form-group">
                    <label>Complemento</label>
                    <input type="text" placeholder="Ap, Bloco" />
                  </div>
                  <div className="form-group">
                    <label>Bairro</label>
                    <input type="text" placeholder="Centro" />
                  </div>
                  <div className="form-group">
                    <label>Cidade</label>
                    <input type="text" placeholder="São Paulo" />
                  </div>
                  <div className="form-group">
                    <label>Estado</label>
                    <select>
                      <option>Selecione</option>
                      {/* Outros estados */}
                    </select>
                  </div>
                </section>
                <section>
                  <h3>Segurança</h3>
                  <div className="form-group">
                    <p>Se você redefinir sua senha, sairá de todas as sessões de Kirvano ativas em outros dispositivos.</p>
                    <button>Redefinir senha</button>
                  </div>
                </section>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={toggleSidebar}>Cancelar</button>
                  <button type="submit" className="save-btn">Salvar dados</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserScreen;
