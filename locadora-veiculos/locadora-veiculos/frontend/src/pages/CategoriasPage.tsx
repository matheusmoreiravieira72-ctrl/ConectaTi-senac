import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Categoria } from '../types';

export default function CategoriasPage() {
  const [lista, setLista] = useState<Categoria[]>([]);
  const [form, setForm] = useState({ nome: '', valorDiaria: '' });

  async function carregar() { setLista(await api.listarCategorias()); }
  useEffect(() => { carregar(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const valorNum = Number(form.valorDiaria);

    // Validação 1: Impede valor menor ou igual a zero
    if (isNaN(valorNum) || valorNum <= 0) {
      alert('Erro: O valor da diária deve ser maior que zero!');
      return;
    }

    // Validação 2: Impede nomes duplicados (insensível a maiúsculas/minúsculas)
    const nomeExiste = lista.some(
      c => c.nome.trim().toLowerCase() === form.nome.trim().toLowerCase()
    );

    if (nomeExiste) {
      alert('Erro: Já existe uma categoria cadastrada com este nome!');
      return;
    }

    await api.criarCategoria({ nome: form.nome.trim(), valorDiaria: valorNum });
    setForm({ nome: '', valorDiaria: '' });
    carregar();
  }

  function fmt(v: number) { return 'R$ ' + v.toFixed(2).replace('.', ','); }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Categorias</h1>
        <p>Classes de veículos e o valor da diária de cada uma.</p>
      </div>
      <div className="card">
        <form className="grid-form" onSubmit={handleSubmit}>
          <input 
            placeholder="Nome (ex: SUV)" 
            value={form.nome} 
            onChange={e => setForm({ ...form, nome: e.target.value })} 
            required 
          />
          <input 
            type="number" 
            step="0.01" 
            min="0.01"
            placeholder="Valor da diária (R$)" 
            value={form.valorDiaria}
            onChange={e => setForm({ ...form, valorDiaria: e.target.value })} 
            required 
          />
          <button type="submit" className="btn-primary">Adicionar</button>
        </form>
      </div>
      <div className="card">
        <table className="data-table">
          <thead><tr><th>Nome</th><th>Diária</th></tr></thead>
          <tbody>
            {lista.map(c => <tr key={c.id}><td>{c.nome}</td><td>{fmt(c.valorDiaria)}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}