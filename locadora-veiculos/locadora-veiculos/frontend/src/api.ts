import type {
  Categoria,
  Veiculo,
  Cliente,
  Seguro,
  Locacao,
  Multa,
  Manutencao,
} from './types';

const BASE = 'https://locadora-veiculos-gbjj.onrender.com/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);

  if (!res.ok) {
    throw new Error(`Erro ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Erro ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

async function patch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Erro ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  // CATEGORIAS
  listarCategorias: () =>
    get<Categoria[]>('/categorias'),

  criarCategoria: (c: {
    nome: string;
    valorDiaria: number;
  }) =>
    post<Categoria>('/categorias', c),

  // VEÍCULOS
  listarVeiculos: () =>
    get<Veiculo[]>('/veiculos'),

  criarVeiculo: (v: {
    placa: string;
    modelo: string;
    ano: number;
    categoriaId: number;
  }) =>
    post<Veiculo>('/veiculos', v),

  // CLIENTES
  listarClientes: () =>
    get<Cliente[]>('/clientes'),

  criarCliente: (c: {
    nome: string;
    cpf: string;
    cnh: string;
    telefone: string;
    email: string;
  }) =>
    post<Cliente>('/clientes', c),

  // SEGUROS
  listarSeguros: () =>
    get<Seguro[]>('/seguros'),

  criarSeguro: (s: {
    nome: string;
    valorDiaria: number;
  }) =>
    post<Seguro>('/seguros', s),

  // LOCAÇÕES
  listarLocacoes: () =>
    get<Locacao[]>('/locacoes'),

  criarLocacao: (l: {
    veiculoId: number;
    clienteId: number;
    seguroId: number | null;
    dataInicio: string;
    dataFimPrevista: string;
  }) =>
    post<Locacao>('/locacoes', l),

  finalizarLocacao: (
    id: number,
    dataFimReal: string
  ) =>
    patch<Locacao>(
      `/locacoes/${id}/finalizar`,
      { dataFimReal }
    ),

  // MULTAS
  listarMultas: () =>
    get<Multa[]>('/multas'),

  criarMulta: (m: {
    locacaoId: number;
    motivo: string;
    valor: number;
  }) =>
    post<Multa>('/multas', m),

  // MANUTENÇÕES
  listarManutencoes: () =>
    get<Manutencao[]>('/manutencoes'),

  criarManutencao: (m: {
    veiculoId: number;
    descricao: string;
    dataInicio: string;
    custo: number;
  }) =>
    post<Manutencao>('/manutencoes', m),

  concluirManutencao: (id: number) =>
    patch<Manutencao>(
      `/manutencoes/${id}/concluir`,
      {}
    ),
};