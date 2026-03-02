// Gerenciamento de Google Sheets
const moment = require('moment');
moment.locale('pt-br');

// Simulação de banco de dados (depois integrar com Google Sheets)
let agendamentos = [];
let proximoId = 1;

const sheets = {
  // Listar horários disponíveis (próximos 7 dias)
  async listarHorariosDisponiveis() {
    const horariosDisponiveis = [];
    const hoje = moment();

    // Gera horários para próximos 7 dias
    for (let i = 1; i <= 7; i++) {
      const dia = moment(hoje).add(i, 'days');

      // Pula finais de semana
      if (dia.day() === 0 || dia.day() === 6) continue;

      // Horários disponíveis: 8h, 9h, 10h, 11h, 14h, 15h, 16h, 17h
      const horarios = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

      for (const hora of horarios) {
        // Verifica se horário está ocupado
        const ocupado = agendamentos.some(ag =>
          ag.data === dia.format('DD/MM/YYYY') &&
          ag.hora === hora &&
          ag.status !== 'cancelado'
        );

        if (!ocupado) {
          horariosDisponiveis.push({
            data: dia.format('DD/MM/YYYY'),
            hora: hora,
            diaSemana: dia.format('dddd')
          });
        }
      }
    }

    return horariosDisponiveis.slice(0, 10); // Retorna apenas 10 primeiros
  },

  // Criar agendamento
  async criarAgendamento(dados) {
    const novoAgendamento = {
      id: proximoId++,
      paciente: dados.paciente,
      telefone: dados.telefone,
      data: dados.data,
      hora: dados.hora,
      status: 'agendado',
      confirmado: 'nao',
      criadoEm: moment().format('DD/MM/YYYY HH:mm')
    };

    agendamentos.push(novoAgendamento);
    return novoAgendamento;
  },

  // Buscar agendamento por telefone
  async buscarAgendamentoPorTelefone(telefone) {
    // Busca o agendamento mais recente não cancelado
    const agendamentosAtivos = agendamentos
      .filter(ag => ag.telefone === telefone && ag.status !== 'cancelado')
      .sort((a, b) => {
        const dataA = moment(a.data, 'DD/MM/YYYY');
        const dataB = moment(b.data, 'DD/MM/YYYY');
        return dataB.diff(dataA);
      });

    return agendamentosAtivos[0] || null;
  },

  // Confirmar presença
  async confirmarPresenca(telefone) {
    const agendamento = await this.buscarAgendamentoPorTelefone(telefone);
    if (agendamento) {
      agendamento.confirmado = 'sim';
      return true;
    }
    return false;
  },

  // Cancelar agendamento
  async cancelarAgendamento(telefone) {
    const agendamento = await this.buscarAgendamentoPorTelefone(telefone);
    if (agendamento) {
      agendamento.status = 'cancelado';
      return agendamento;
    }
    return null;
  },

  // Buscar agendamentos para confirmação (24h antes)
  async buscarAgendamentosParaConfirmacao() {
    const amanha = moment().add(1, 'day').format('DD/MM/YYYY');

    return agendamentos.filter(ag =>
      ag.data === amanha &&
      ag.status === 'agendado' &&
      ag.confirmado === 'nao'
    );
  },

  // Buscar agendamentos para lembrete (3h antes)
  async buscarAgendamentosParaLembrete() {
    const hoje = moment().format('DD/MM/YYYY');
    const daquiA3h = moment().add(3, 'hours').format('HH:mm');

    return agendamentos.filter(ag => {
      if (ag.data !== hoje || ag.status !== 'agendado') return false;

      const horaAgendamento = moment(ag.hora, 'HH:mm');
      const horaLembrete = moment(daquiA3h, 'HH:mm');

      // Verifica se está entre 3h e 2h50min antes
      const diferencaMinutos = horaAgendamento.diff(horaLembrete, 'minutes');
      return diferencaMinutos >= 0 && diferencaMinutos <= 10 && ag.confirmado === 'sim';
    });
  },

  // Listar todos os agendamentos (para debug)
  listarTodos() {
    return agendamentos;
  },

  // Limpar dados (para testes)
  limparDados() {
    agendamentos = [];
    proximoId = 1;
  }
};

module.exports = sheets;
