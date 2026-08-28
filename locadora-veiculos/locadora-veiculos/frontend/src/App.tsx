import { useState, useEffect } from 'react';
import LocacoesPage from './pages/LocacoesPage';
import VeiculosPage from './pages/VeiculosPage';
import CategoriasPage from './pages/CategoriasPage';
import ClientesPage from './pages/ClientesPage';
import SegurosPage from './pages/SegurosPage';
import MultasPage from './pages/MultasPage';
import ManutencaoPage from './pages/ManutencaoPage';

type Aba =
  | 'locacoes'
  | 'veiculos'
  | 'categorias'
  | 'clientes'
  | 'seguros'
  | 'multas'
  | 'manutencao';

const NAV_ITEMS = [
  { id: 'locacoes' as Aba, label: 'Locações', icon: '🔑' },
  { id: 'veiculos' as Aba, label: 'Veículos', icon: '🚗' },
  { id: 'categorias' as Aba, label: 'Categorias', icon: '🏷️' },
  { id: 'clientes' as Aba, label: 'Clientes', icon: '👥' },
  { id: 'seguros' as Aba, label: 'Seguros', icon: '🛡️' },
  { id: 'multas' as Aba, label: 'Multas', icon: '⚠️' },
  { id: 'manutencao' as Aba, label: 'Manutenção', icon: '🔧' },
];

export default function App() {
  const [aba, setAba] = useState<Aba>('veiculos');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="shell">

      <aside className="sidebar">

        <div className="brand">
          <span className="brand-mark">RV</span>

          <div>
            <div className="brand-name">
              RodaViva
            </div>

            <div className="brand-sub">
              Locadora de veículos
            </div>
          </div>
        </div>

        <nav className="side-nav">

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={
                'side-link' +
                (aba === item.id ? ' active' : '')
              }
              onClick={() => setAba(item.id)}
            >
              <span className="side-icon">
                {item.icon}
              </span>

              {item.label}
            </button>
          ))}

        </nav>

        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="side-link"
            style={{ width: '100%', justifyContent: 'center', background: 'rgba(255,255,255,.05)' }}
          >
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
          </button>
        </div>

        <div className="sidebar-footer">
          UC9 · Manutenção de sistemas
          <br />
          Senac DF
        </div>

      </aside>

      <main className="content">

        {aba === 'locacoes' && <LocacoesPage />}

        {aba === 'veiculos' && <VeiculosPage />}

        {aba === 'categorias' && <CategoriasPage />}

        {aba === 'clientes' && <ClientesPage />}

        {aba === 'seguros' && <SegurosPage />}

        {aba === 'multas' && <MultasPage />}

        {aba === 'manutencao' && <ManutencaoPage />}

      </main>

    </div>
  );
}