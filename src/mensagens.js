// Templates de mensagens
const moment = require('moment');
moment.locale('pt-br');

const config = require('./config');

const mensagens = {
  // Boas-vindas
  boasVindas: () => {
    return `🦷 *${config.consultorio.nome}*

Olá! Sou a assistente virtual! 😊

${config.mensagens.menuPrincipal}`;
  },

  // Lista de horários disponíveis
  horariosDisponiveis: (horarios) => {
    if (!horarios || horarios.length === 0) {
      return '❌ Desculpe, não há horários disponíveis no momento.\n\nPor favor, entre em contato pelo telefone para mais informações.';
    }

    let msg = '📅 *Horários Disponíveis:*\n\n';

    horarios.forEach((slot, index) => {
      const data = moment(slot.data, 'DD/MM/YYYY').format('dddd, DD/MM');
      msg += `*${index + 1}* - ${data} às ${slot.hora}\n`;
    });

    msg += '\n💬 Digite o *número* do horário desejado.';
    return msg;
  },

  // Confirmação de agendamento
  confirmacaoAgendamento: (agendamento) => {
    return `✅ *Consulta Agendada com Sucesso!*

👤 *Paciente:* ${agendamento.paciente}
🦷 *Profissional:* ${config.consultorio.dentista}
📅 *Data:* ${moment(agendamento.data, 'DD/MM/YYYY').format('dddd, DD/MM/YYYY')}
🕐 *Horário:* ${agendamento.hora}
📍 *Local:* ${config.consultorio.nome}

⚠️ *Importante:*
• Chegue com 10 minutos de antecedência
• Traga documento com foto
• Em caso de impedimento, favor avisar com antecedência

Você receberá uma confirmação 24h antes da consulta.

Até breve! 😊`;
  },

  // Confirmação 24h antes
  confirmacao24h: (agendamento) => {
    return `🔔 *Lembrete de Consulta*

Olá ${agendamento.paciente}! 👋

Você tem uma consulta agendada para *AMANHÃ*:

🦷 *Profissional:* ${config.consultorio.dentista}
📅 *Data:* ${moment(agendamento.data, 'DD/MM/YYYY').format('dddd, DD/MM/YYYY')}
🕐 *Horário:* ${agendamento.hora}
📍 *Local:* ${config.consultorio.nome}

Por favor, confirme sua presença:

✅ Digite *SIM* para confirmar
❌ Digite *NAO* para remarcar

_Aguardo sua resposta!_ 😊`;
  },

  // Lembrete 3h antes
  lembrete3h: (agendamento) => {
    return `⏰ *Lembrete*

Olá ${agendamento.paciente}!

Sua consulta é *HOJE* às *${agendamento.hora}*

🦷 ${config.consultorio.dentista}
📍 ${config.consultorio.nome}

Nos vemos em breve! 😊

_Não esqueça de chegar com 10 minutos de antecedência._`;
  },

  // Confirmação recebida
  confirmacaoRecebida: () => {
    return '✅ *Presença confirmada!*\n\nObrigado! Nos vemos em breve! 😊';
  },

  // Consulta de agendamento
  consultaAgendamento: (agendamento) => {
    if (!agendamento) {
      return '❌ Não encontrei nenhum agendamento em seu nome.\n\nDeseja agendar uma consulta?';
    }

    const status = agendamento.confirmado === 'sim' ? '✅ Confirmado' : '⏳ Aguardando confirmação';

    return `📋 *Seu Agendamento*

👤 *Paciente:* ${agendamento.paciente}
🦷 *Profissional:* ${config.consultorio.dentista}
📅 *Data:* ${moment(agendamento.data, 'DD/MM/YYYY').format('dddd, DD/MM/YYYY')}
🕐 *Horário:* ${agendamento.hora}
📍 *Local:* ${config.consultorio.nome}
📊 *Status:* ${status}

${config.mensagens.menuPrincipal}`;
  },

  // Reagendamento
  solicitacaoReagendamento: (agendamentoAtual) => {
    return `🔄 *Reagendamento*

Sua consulta atual:
📅 ${moment(agendamentoAtual.data, 'DD/MM/YYYY').format('DD/MM/YYYY')} às ${agendamentoAtual.hora}

Vou buscar novos horários disponíveis...`;
  },

  // Cancelamento confirmado
  cancelamentoConfirmado: (agendamento) => {
    return `✅ *Consulta Cancelada*

Sua consulta de ${moment(agendamento.data, 'DD/MM/YYYY').format('DD/MM/YYYY')} às ${agendamento.hora} foi cancelada com sucesso.

Caso precise reagendar, é só me chamar! 😊`;
  },

  // Erro genérico
  erro: () => {
    return '❌ Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato pelo telefone.';
  },

  // Opção inválida
  opcaoInvalida: () => {
    return '❌ Opção inválida. Por favor, escolha uma opção do menu.\n\n' + config.mensagens.menuPrincipal;
  },

  // Falar com atendente
  falarComAtendente: () => {
    return `📞 *Falar com Atendente*

Nosso horário de atendimento:
Segunda a Sexta: ${config.horarios.abertura} às ${config.horarios.fechamento}

📱 Telefone: ${config.consultorio.telefone}

Um de nossos atendentes irá responder em breve! 😊`;
  }
};

module.exports = mensagens;
