// Configurações do Bot
require('dotenv').config();

module.exports = {
  consultorio: {
    nome: process.env.CONSULTORIO_NOME || 'Clínica Odontológica',
    dentista: process.env.DENTISTA_NOME || 'Dra. Dentista',
    telefone: process.env.CONSULTORIO_TELEFONE || '',
  },

  horarios: {
    abertura: process.env.HORARIO_ABERTURA || '08:00',
    fechamento: process.env.HORARIO_FECHAMENTO || '18:00',
    duracaoConsulta: 60, // minutos
  },

  confirmacao: {
    horasAntes: parseInt(process.env.CONFIRMAR_HORAS_ANTES) || 24,
    lembreteHoras: parseInt(process.env.LEMBRAR_HORAS_ANTES) || 3,
  },

  sheets: {
    spreadsheetId: process.env.GOOGLE_SHEET_ID || '',
    credentialsPath: process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json',
  },

  mensagens: {
    saudacao: '🦷 Olá! Bem-vindo à Clínica Odontológica! 😊\n\nComo posso ajudar?',

    menuPrincipal: `
📋 *Menu Principal*

1️⃣ - Agendar consulta
2️⃣ - Consultar meu agendamento
3️⃣ - Remarcar consulta
4️⃣ - Cancelar consulta
5️⃣ - Falar com atendente

Digite o número da opção desejada.`,

    agradecimento: 'Obrigado por entrar em contato! Até breve! 😊',
  }
};
