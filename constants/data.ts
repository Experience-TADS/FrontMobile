export const STATUS = [
  { k: 'AGUARDANDO', l: 'Aguardando', c: '#6B7280', msg: 'Seu pedido foi confirmado e o chassi entrou na fila de produção.', tip: 'Cada chassi recebe um número único de identificação que acompanha o carro até a entrega.' },
  { k: 'MONTAGEM_ESTRUTURAL', l: 'Montagem estrutural', c: '#2563EB', msg: 'A carroceria está sendo montada na linha de produção.', tip: 'A estrutura é montada por robôs de solda que repetem cada ponto com precisão.' },
  { k: 'PINTURA', l: 'Pintura', c: '#7C3AED', msg: 'Seu veículo está recebendo a pintura. São aplicadas múltiplas camadas para durabilidade e brilho.', tip: 'O processo de pintura envolve até 5 camadas, incluindo primer, base e verniz.' },
  { k: 'INSTALACAO_MOTOR', l: 'Instalação do motor', c: '#D97706', msg: 'O conjunto de motor e transmissão está sendo instalado no chassi.', tip: 'Motor e transmissão chegam montados e são encaixados na carroceria em uma única etapa.' },
  { k: 'ACABAMENTO_INTERNO', l: 'Acabamento interno', c: '#4338CA', msg: 'Bancos, painel, volante e revestimentos estão sendo instalados.', tip: 'Cada peça do interior é conferida quanto a encaixe e folgas antes de seguir.' },
  { k: 'INSPECAO_FINAL', l: 'Inspeção final', c: '#EA580C', msg: 'Seu Toyota passa por uma inspeção completa de qualidade e testes de funcionamento.', tip: 'Faróis, freios, eletrônica e vedação são testados antes da liberação.' },
  { k: 'LIBERACAO_TRANSPORTE', l: 'Liberação para transporte', c: '#0D9488', msg: 'Aprovado na inspeção. Seu veículo aguarda o transporte até a concessionária.', tip: 'O carro viaja protegido até a loja e só então é confirmado como recebido.' },
  { k: 'NA_CONCESSIONARIA', l: 'Na concessionária', c: '#16A34A', msg: 'Seu Toyota chegou à concessionária e está sendo preparado para a entrega.', tip: 'Na entrega, o vendedor apresenta os recursos do carro e combina a primeira revisão.' },
  { k: 'ENTREGUE', l: 'Entregue', c: '#1A1A1A', msg: 'Entrega concluída. Aproveite o seu Toyota.', tip: 'Guarde o número do chassi: ele identifica o seu veículo em qualquer serviço.' },
];

export const TIPO = {
  VISITA: { l: 'Visita', c: '#2563EB' },
  TEST_DRIVE: { l: 'Test drive', c: '#7C3AED' },
  ENTREGA: { l: 'Entrega', c: '#16A34A' },
} as const;

export const AST = {
  PENDENTE: { l: 'Pendente', c: '#D97706' },
  CONFIRMADO: { l: 'Confirmado', c: '#16A34A' },
  CANCELADO: { l: 'Cancelado', c: '#DC2626' },
} as const;

export const LV = [
  { n: 'Bronze', min: 0, c: '#EA580C' },
  { n: 'Prata', min: 1000, c: '#6B7280' },
  { n: 'Ouro', min: 2500, c: '#D97706' },
  { n: 'Diamante', min: 5000, c: '#2563EB' },
];

export const EXT = [
  { d: '2026-09-02T10:00', t: 'Missão: criar conta', v: 100 },
  { d: '2026-09-03T18:20', t: 'Bônus de boas-vindas', v: 200 },
  { d: '2026-10-14T11:30', t: 'Visita à concessionária', v: 150 },
  { d: '2026-10-15T10:45', t: 'Missão: primeiro pedido', v: 500 },
  { d: '2026-10-30T14:10', t: 'Missão: indicar um amigo', v: 300 },
  { d: '2026-10-31T16:00', t: 'Resgate: Chaveiro Toyota', v: -200 },
];

export const VEI = [
  { chassi: '10001', modelo: 'Corolla XEi', cor: 'Branco Pérola', etapa: 2, pedido: '001', cliente: 'Ana Souza', hist: ['2026-10-21T08:10', '2026-10-22T14:10', '2026-10-24T03:10'] },
  { chassi: '10002', modelo: 'Hilux SRX', cor: 'Cinza Granito', etapa: 4, pedido: '002', cliente: 'Bruno Lima', hist: ['2026-10-12T07:40', '2026-10-12T17:40', '2026-10-13T10:40', '2026-10-14T05:40', '2026-10-15T02:40'] },
  { chassi: '10003', modelo: 'Yaris XLS', cor: 'Vermelho Ruby', etapa: 0, pedido: '003', cliente: 'Camila Rocha', hist: ['2026-11-02T09:15'] },
  { chassi: '10004', modelo: 'RAV4 SX Hybrid', cor: 'Preto Eclipse', etapa: 6, pedido: '004', cliente: 'Diego Martins', hist: ['2026-09-28T08:00', '2026-09-28T18:00', '2026-09-29T11:00', '2026-09-30T06:00', '2026-10-01T01:00', '2026-10-01T20:00', '2026-10-02T15:00'] },
  { chassi: '10005', modelo: 'SW4 SRX', cor: 'Prata Lunar', etapa: 7, pedido: '005', cliente: 'Helena Prado', hist: ['2026-09-14T08:30', '2026-09-14T18:30', '2026-09-15T11:30', '2026-09-16T06:30', '2026-09-17T01:30', '2026-09-17T20:30', '2026-09-18T15:30', '2026-09-19T10:30'] },
  { chassi: '10006', modelo: 'Corolla Altis Hybrid', cor: 'Azul Safira', etapa: 1, pedido: '006', cliente: 'Fábio Nunes', hist: ['2026-10-30T10:00', '2026-10-31T17:00'] },
];

export const PED = [
  { id: '006', cliente: 'Fábio Nunes', vend: 'Carlos Vendedor Toyota', modelo: 'Corolla Altis Hybrid', versao: 'Altis Hybrid', cor: 'Azul Safira', ano: 2024, valor: 187900, data: '2026-10-29T16:20', chassi: '10006' },
  { id: '005', cliente: 'Helena Prado', vend: 'Carlos Vendedor Toyota', modelo: 'SW4', versao: 'SRX', cor: 'Prata Lunar', ano: 2024, valor: 395000, data: '2026-09-12T11:05', chassi: '10005' },
  { id: '004', cliente: 'Diego Martins', vend: 'Carlos Vendedor Toyota', modelo: 'RAV4', versao: 'SX Hybrid', cor: 'Preto Eclipse', ano: 2024, valor: 297900, data: '2026-09-26T09:40', chassi: '10004' },
  { id: '003', cliente: 'Camila Rocha', vend: 'Carlos Vendedor Toyota', modelo: 'Yaris', versao: 'XLS', cor: 'Vermelho Ruby', ano: 2024, valor: 119900, data: '2026-11-02T09:00', chassi: '10003' },
  { id: '002', cliente: 'Bruno Lima', vend: 'Carlos Vendedor Toyota', modelo: 'Hilux', versao: 'SRX', cor: 'Cinza Granito', ano: 2024, valor: 330000, data: '2026-10-10T15:10', chassi: '10002' },
  { id: '001', cliente: 'Ana Souza', vend: 'Carlos Vendedor Toyota', modelo: 'Corolla', versao: 'XEi', cor: 'Branco Pérola', ano: 2024, valor: 149900, data: '2026-10-15T10:30', chassi: '10001' },
];

export const AG = [
  { id: 1, cliente: 'Helena Prado', tipo: 'ENTREGA' as const, dt: '2026-11-03T09:30', obs: 'Entrega do SW4 SRX', status: 'CONFIRMADO' as const, vend: 'Carlos Vendedor Toyota' },
  { id: 2, cliente: 'Diego Martins', tipo: 'TEST_DRIVE' as const, dt: '2026-11-03T14:00', obs: 'Interesse em versão híbrida', status: 'CONFIRMADO' as const, vend: 'Carlos Vendedor Toyota' },
  { id: 3, cliente: 'Bruno Lima', tipo: 'VISITA' as const, dt: '2026-11-03T16:30', obs: '', status: 'PENDENTE' as const, vend: 'Carlos Vendedor Toyota' },
  { id: 4, cliente: 'Camila Rocha', tipo: 'VISITA' as const, dt: '2026-11-05T10:00', obs: 'Levar documentos do financiamento', status: 'PENDENTE' as const, vend: 'Carlos Vendedor Toyota' },
  { id: 5, cliente: 'Fábio Nunes', tipo: 'TEST_DRIVE' as const, dt: '2026-11-06T15:00', obs: '', status: 'CONFIRMADO' as const, vend: 'Carlos Vendedor Toyota' },
  { id: 6, cliente: 'Paulo Ribeiro', tipo: 'ENTREGA' as const, dt: '2026-11-07T11:00', obs: 'Cliente pediu remarcação', status: 'CANCELADO' as const, vend: 'Carlos Vendedor Toyota' },
  { id: 7, cliente: 'Ana Souza', tipo: 'TEST_DRIVE' as const, dt: '2026-11-15T14:00', obs: 'Trazer CNH', status: 'PENDENTE' as const, vend: 'Carlos Vendedor Toyota' },
  { id: 8, cliente: 'Ana Souza', tipo: 'VISITA' as const, dt: '2026-10-14T10:00', obs: 'Escolha de cor', status: 'CONFIRMADO' as const, vend: 'Carlos Vendedor Toyota' },
  { id: 9, cliente: 'Ana Souza', tipo: 'VISITA' as const, dt: '2026-10-05T16:00', obs: '', status: 'CANCELADO' as const, vend: 'Carlos Vendedor Toyota' },
];

export const CURRENT_USER = {
  n: 'Ana Souza',
  e: 'ana.souza@email.com',
  r: 'CLIENTE',
};

const pad = (n: number) => String(n).padStart(2, '0');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const MES_ABREV = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MES_FULL = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const SEMANA = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

export function brl(n: number): string {
  const int = Math.floor(n);
  const dec = Math.round((n - int) * 100);
  const intStr = int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${intStr},${pad(dec)}`;
}

export function fmtN(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function fdShort(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MES_ABREV[d.getMonth()]} ${d.getFullYear()}`;
}

export function ft(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function hoje(): string {
  const d = new Date();
  return cap(`${SEMANA[d.getDay()]}, ${d.getDate()} de ${MES_FULL[d.getMonth()]} de ${d.getFullYear()}`);
}

export function ini(n: string): string {
  return n.split(' ').filter(Boolean).slice(0, 2).map(x => x[0]).join('').toUpperCase();
}

export const saldo = (): number => EXT.reduce((s, x) => s + x.v, 0);
export const lifetime = (): number => EXT.filter(x => x.v > 0).reduce((s, x) => s + x.v, 0);

export function lvIdx(): number {
  const lt = lifetime();
  let i = 0;
  LV.forEach((l, k) => { if (lt >= l.min) i = k; });
  return i;
}

export function lvPct(): number {
  const i = lvIdx();
  const a = LV[i];
  const b = LV[i + 1];
  if (!b) return 100;
  return Math.min(100, Math.round((lifetime() - a.min) / (b.min - a.min) * 100));
}

export function lvNext(): string {
  const b = LV[lvIdx() + 1];
  return b ? `Faltam ${fmtN(b.min - lifetime())} pts para o nível ${b.n}` : 'Nível máximo alcançado';
}

export function nextAg(nome: string) {
  const now = new Date();
  return AG
    .filter(a => a.cliente === nome && a.status !== 'CANCELADO' && new Date(a.dt) >= now)
    .sort((a, b) => a.dt.localeCompare(b.dt))[0];
}

export function daysSince(iso: string): number {
  const now = new Date();
  const d = new Date(iso);
  return Math.max(1, Math.round((now.getTime() - d.getTime()) / 86400000));
}
