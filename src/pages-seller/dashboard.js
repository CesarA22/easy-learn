import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles-seller/dashboard.css';
import { AuthContext } from '../context/AuthContext.js';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const token = user?.token;

    const [salesToday, setSalesToday] = useState(0);
    const [summary, setSummary] = useState({ available: 0, pending: 0, reserved: 0, total: 0 });
    const [extract, setExtract] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');

                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token não encontrado');
                }

                const [salesResponse, summaryResponse, extractResponse] = await Promise.all([
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/seller/dashboard/sales`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/seller/dashboard/summary`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/seller/dashboard/extract`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                if (!salesResponse.ok || !summaryResponse.ok || !extractResponse.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { dailySales } = await salesResponse.json();
                const summaryResponseData = await summaryResponse.json();
                const extractResponseData = await extractResponse.json();

                const today = new Date().toISOString().split('T')[0];
                const todaySales = dailySales.find((data) => data.date === today)?.sales || 0;

                setSalesToday(todaySales);
                setSummary({
                    available: summaryResponseData?.available || 0,
                    pending: summaryResponseData?.pending || 0,
                    reserved: summaryResponseData?.reserved || 0,
                    total: summaryResponseData?.total || 0,
                });
                setExtract(extractResponseData || []);
                setSalesData(dailySales);
            } catch (err) {
                setError('Erro ao carregar dados do painel.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const chartData = {
        labels: salesData.map((data) => data.date),
        datasets: [
            {
                label: 'Vendas no dia',
                data: salesData.map((data) => data.sales),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="logo" onClick={() => navigate('/')}>
                    Easy Learn
                </div>
                <nav className="menu">
                    <ul>
                        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                        <li onClick={() => navigate('/products')}>Produtos</li>
                        <li onClick={() => navigate('/sales')}>Vendas</li>
                        <li onClick={() => navigate('/finances')}>Finanças</li>
                    </ul>
                </nav>
                <div className="settings">
                    <p>Configurações</p>
                    <p onClick={() => navigate('/user-screen-seller')}>
                        {user ? user.name : 'Nome do perfil'}
                    </p>
                </div>
            </aside>
            <main className="dashboard__main-content">
                <header>
                    <h1>Boas-vindas, {user ? user.name : 'Nome do perfil'}</h1>
                </header>
                <section className="summary">
                    <div className="summary-item">
                        <p>Vendas hoje</p>
                        <span>R$ {salesToday.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <p>Saldo disponível</p>
                        <span>R$ {summary.available.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <p>Pendente</p>
                        <span>R$ {summary.pending.toFixed(2)}</span>
                    </div>
                    <div className="summary-item">
                        <p>Total</p>
                        <span>R$ {summary.total.toFixed(2)}</span>
                    </div>
                </section>
                <section className="chart">
                    <h2>Gráfico de Faturamento</h2>
                    <div className="chart-content">
                        <Bar
                            data={chartData}
                            options={{ responsive: true, maintainAspectRatio: false }}
                        />
                    </div>
                </section>
                <section className="finances">
                    <h2>Finanças</h2>
                    <div className="finance-summary">
                        <div className="finance-item">
                            <p>Saldo disponível</p>
                            <span>R$ {summary.available.toFixed(2)}</span>
                        </div>
                        <div className="finance-item">
                            <p>Pendente</p>
                            <span>R$ {summary.pending.toFixed(2)}</span>
                        </div>
                        <div className="finance-item">
                            <p>Reservado</p>
                            <span>R$ {summary.reserved.toFixed(2)}</span>
                        </div>
                        <div className="finance-item">
                            <p>Total</p>
                            <span>R$ {summary.total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="withdraw">
                        <h2>Solicite um saque</h2>
                        <div className="withdraw-form">
                            <input type="number" placeholder="Valor" />
                            <button>Solicitar saque</button>
                        </div>
                    </div>
                    <div className="extract">
                        <h2>Extrato</h2>
                        <div className="extract-content">
                            {extract.length > 0 ? (
                                extract.map((item, index) => (
                                    <div key={index} className="extract-item">
                                        <p>{item.description || `Pedido #${item.id}`}</p>
                                        <span>R$ {(item.total || 0).toFixed(2)}</span>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhum extrato disponível</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
