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

export function fdt(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fd(iso: string): string {
  const d = new Date(iso);
  const pad2 = (n: number) => String(n).padStart(2, '0');
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export const QPT = 50;

export const QZ: Record<string, { q: string; o: string[]; a: number; e: string }[]> = {
  AGUARDANDO: [
    { q: 'O que identifica de forma única cada veículo produzido?', o: ['A cor da carroceria', 'O número do chassi', 'O nome da versão', 'O ano do modelo'], a: 1, e: 'O número do chassi é único e acompanha o veículo em registros, garantia e serviços.' },
    { q: 'Para que serve guardar o número do chassi?', o: ['Identificar o veículo em documentos e serviços', 'Aumentar a potência do motor', 'Escolher a cor do carro', 'Reduzir o consumo'], a: 0, e: 'Ele é a identidade do veículo em qualquer atendimento ou consulta.' },
  ],
  MONTAGEM_ESTRUTURAL: [
    { q: 'Qual parte do carro forma a estrutura que sustenta os demais componentes?', o: ['Painel', 'Carroceria', 'Escapamento', 'Estofamento'], a: 1, e: 'A carroceria é a estrutura sobre a qual motor, interior e demais itens são montados.' },
    { q: 'Como as chapas da carroceria costumam ser unidas na linha de produção?', o: ['Com fita adesiva', 'Com solda, muitas vezes feita por robôs', 'Com parafusos de madeira', 'Com cola escolar'], a: 1, e: 'Robôs de solda repetem cada ponto com a mesma precisão em todos os carros.' },
    { q: 'Por que a estrutura é importante para a segurança?', o: ['Deixa o carro mais silencioso', 'Ajuda a absorver e distribuir a energia de um impacto', 'Aumenta o porta-malas', 'Melhora o som'], a: 1, e: 'Uma estrutura bem projetada protege os ocupantes ao distribuir a energia da colisão.' },
  ],
  PINTURA: [
    { q: 'Qual camada dá o brilho final e protege a pintura?', o: ['Primer', 'Base', 'Verniz', 'Massa'], a: 2, e: 'O verniz é a camada final: dá brilho e protege a cor contra sol e riscos leves.' },
    { q: 'Qual camada ajuda na aderência da tinta e na proteção contra corrosão?', o: ['Primer', 'Verniz', 'Cera', 'Película'], a: 0, e: 'O primer prepara a superfície e ajuda a tinta a fixar.' },
    { q: 'Por que a pintura é aplicada em camadas?', o: ['Só para gastar menos tinta', 'Para dar durabilidade e brilho', 'Para deixar o carro mais leve', 'Para trocar de cor depois'], a: 1, e: 'Cada camada tem uma função, e juntas garantem durabilidade e acabamento.' },
  ],
  INSTALACAO_MOTOR: [
    { q: 'Qual componente leva a força do motor até as rodas?', o: ['Transmissão', 'Retrovisor', 'Para-brisa', 'Buzina'], a: 0, e: 'A transmissão (câmbio) conecta o motor às rodas.' },
    { q: 'Um motor híbrido combina o motor a combustão com qual outro?', o: ['Motor a vapor', 'Motor elétrico', 'Turbina a gás', 'Motor a pedal'], a: 1, e: 'Nos híbridos, o motor elétrico trabalha junto com o a combustão.' },
  ],
  ACABAMENTO_INTERNO: [
    { q: 'Qual item mostra velocidade, rotação e alertas ao motorista?', o: ['Painel de instrumentos', 'Porta-copos', 'Quebra-sol', 'Tapete'], a: 0, e: 'O painel de instrumentos reúne as informações de funcionamento do carro.' },
    { q: 'Qual item dentro da cabine protege os ocupantes em uma colisão?', o: ['Cinto de segurança', 'Cinzeiro', 'Calha de chuva', 'Antena'], a: 0, e: 'O cinto é o item de segurança mais importante e deve ser usado por todos.' },
  ],
  INSPECAO_FINAL: [
    { q: 'Qual sistema é testado para garantir uma parada segura?', o: ['Freios', 'Rádio', 'Ar-condicionado', 'Vidros elétricos'], a: 0, e: 'Os freios passam por testes antes de o carro ser liberado.' },
    { q: 'O que um teste de vedação verifica?', o: ['A velocidade máxima', 'Se há entrada de água ou ruído excessivo', 'O volume do porta-malas', 'A cor da tinta'], a: 1, e: 'Ele confirma que portas e vidros vedam bem contra água e ruído.' },
    { q: 'Por que existe uma inspeção final antes da liberação?', o: ['Para confirmar que o carro atende aos padrões de qualidade', 'Para trocar a cor', 'Para aumentar o preço', 'Para adiantar a entrega'], a: 0, e: 'É a última checagem antes de o veículo seguir para a concessionária.' },
  ],
  LIBERACAO_TRANSPORTE: [
    { q: 'O que acontece nesta etapa?', o: ['O carro volta para a pintura', 'O carro aprovado aguarda o transporte até a concessionária', 'O motor é instalado', 'O cliente recebe as chaves'], a: 1, e: 'Aprovado na inspeção, o veículo está pronto para viajar até a loja.' },
    { q: 'Por que o carro é protegido durante o transporte?', o: ['Para evitar riscos e sujeira no trajeto', 'Para trocar de cor', 'Para ficar mais leve', 'Para reduzir o preço'], a: 0, e: 'A proteção evita danos à pintura e ao interior até a chegada.' },
  ],
  NA_CONCESSIONARIA: [
    { q: 'O que acontece na entrega do veículo?', o: ['O carro é refeito', 'O vendedor apresenta os recursos do carro e confirma a documentação', 'O carro volta à fábrica', 'O cliente escolhe a cor'], a: 1, e: 'Na entrega o vendedor explica o carro e fecha os detalhes com você.' },
    { q: 'Quando fazer a primeira revisão?', o: ['Nunca', 'Conforme o plano de manutenção do manual', 'Só se quebrar', 'Todo dia'], a: 1, e: 'O plano de manutenção do manual do proprietário define os prazos.' },
  ],
  ENTREGUE: [
    { q: 'Onde fica o plano de manutenção do seu carro?', o: ['No manual do proprietário', 'No retrovisor', 'No tanque', 'Na buzina'], a: 0, e: 'O manual traz os prazos de revisão e orientações de uso.' },
    { q: 'Qual número identifica o seu veículo em qualquer serviço?', o: ['O número do chassi', 'O número da placa do vizinho', 'O CEP', 'O ano do modelo'], a: 0, e: 'O chassi é a identidade do veículo do começo ao fim.' },
  ],
};

export const MIS = [
  { id: 1, t: 'Criar conta', d: 'Cadastro concluído no Toyota Experience', pts: 100, st: 'feita' as const, ic: 'user' },
  { id: 2, t: 'Fazer o primeiro pedido', d: 'Seu Corolla XEi está em fabricação', pts: 500, st: 'feita' as const, ic: 'receipt' },
  { id: 3, t: 'Indicar um amigo', d: 'Seu amigo concluiu o cadastro', pts: 300, st: 'feita' as const, ic: 'users' },
  { id: 4, t: 'Avaliar o atendimento', d: 'Conte como foi sua visita à concessionária', pts: 100, st: 'pronta' as const, ic: 'star' },
  { id: 5, t: 'Acompanhar a fabricação por 7 dias', d: 'Abra a linha do tempo do veículo em dias diferentes', pts: 200, st: 'aberta' as const, pr: [5, 7] as [number, number], ic: 'car' },
  { id: 6, t: 'Comparecer ao test drive', d: 'Agendado para 15/11 às 14:00', pts: 150, st: 'aberta' as const, pr: [0, 1] as [number, number], ic: 'calendar' },
  { id: 7, t: 'Receber o seu Toyota', d: 'Confirmação de entrega pela concessionária', pts: 1000, st: 'aberta' as const, pr: [0, 1] as [number, number], ic: 'trophy' },
];

export const REW = [
  { id: 1, n: 'Chaveiro Toyota', d: 'Chaveiro metálico com a marca Toyota Experience.', c: 300, k: 'Brindes', lv: 0 },
  { id: 2, n: 'Boné Toyota Experience', d: 'Boné bordado, tamanho único.', c: 500, k: 'Brindes', lv: 0 },
  { id: 3, n: 'Garrafa térmica', d: 'Garrafa de aço inox de 500 ml.', c: 450, k: 'Brindes', lv: 0 },
  { id: 4, n: 'Lavagem completa', d: 'Lavagem externa e aspiração interna na concessionária.', c: 600, k: 'Serviços', lv: 0 },
  { id: 5, n: 'Check-up de 20 itens', d: 'Inspeção de itens de segurança e conforto.', c: 700, k: 'Serviços', lv: 0 },
  { id: 6, n: 'Higienização do ar-condicionado', d: 'Limpeza do sistema e troca do filtro de cabine.', c: 1200, k: 'Serviços', lv: 0 },
  { id: 7, n: 'Troca de óleo', d: 'Troca do óleo do motor e do filtro de óleo.', c: 1800, k: 'Serviços', lv: 1 },
  { id: 8, n: 'Kit de tapetes', d: 'Jogo de tapetes para o seu modelo.', c: 900, k: 'Acessórios', lv: 0 },
  { id: 9, n: 'Revisão básica de cortesia', d: 'Mão de obra da revisão periódica na concessionária.', c: 3500, k: 'Serviços', lv: 2 },
];

export const VOU = [
  { code: 'TX-8K2QD', n: 'Chaveiro Toyota', dt: '2026-10-31T16:00', used: true },
];

export function qzMax(k: string): number {
  return (QZ[k]?.length ?? 0) * QPT + QPT;
}

export function qzIdx(k: string): number {
  return STATUS.findIndex(s => s.k === k);
}

export function qzOpen(k: string, etapaAtual: number): boolean {
  return qzIdx(k) <= etapaAtual;
}

export const CAR_IMAGES: Record<string, string> = {
  'Corolla':  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2019_Toyota_Corolla_sedan_%28facelift%2C_white%29%2C_front_8.21.19.jpg/320px-2019_Toyota_Corolla_sedan_%28facelift%2C_white%29%2C_front_8.21.19.jpg',
  'Hilux':    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/2020_Toyota_HiLux_SR5_%28GUN126R%29_dual_cab_utility_%282020-10-26%29_01.jpg/320px-2020_Toyota_HiLux_SR5_%28GUN126R%29_dual_cab_utility_%282020-10-26%29_01.jpg',
  'Yaris':    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/2020_Toyota_Yaris_sedan_%28facelift%2C_white%29%2C_front_8.21.19.jpg/320px-2020_Toyota_Yaris_sedan_%28facelift%2C_white%29%2C_front_8.21.19.jpg',
  'RAV4':     'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/2019_Toyota_RAV4_XLE_%28facelift%29%2C_front_8.6.19.jpg/320px-2019_Toyota_RAV4_XLE_%28facelift%29%2C_front_8.6.19.jpg',
  'SW4':      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Toyota_Land_Cruiser_Prado_%28J150%29_%28facelift%2C_white%29%2C_front_8.6.19.jpg/320px-Toyota_Land_Cruiser_Prado_%28J150%29_%28facelift%2C_white%29%2C_front_8.6.19.jpg',
};
