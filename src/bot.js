// Bot Principal - WhatsApp
const venom = require('venom-bot');
const mensagens = require('./mensagens');
const sheets = require('./sheets');
const config = require('./config');
const scheduler = require('./scheduler');

// Armazena estado da conversa de cada usuário
const conversas = new Map();

// Inicializa o bot
async function iniciar() {
  console.log('🤖 Iniciando bot...');

  venom
    .create({
      session: 'secretaria-dentista',
      multidevice: true,
      headless: 'new',
      logQR: true,
      disableWelcome: true,
      updatesLog: false
    })
    .then((client) => {
      console.log('✅ Bot conectado com sucesso!');
      console.log(`🦷 ${config.consultorio.nome}`);
      console.log(`👨‍⚕️ ${config.consultorio.dentista}`);
      console.log('\n📱 Aguardando mensagens...\n');

      iniciarBot(client);

      // Inicia scheduler após bot conectar
      scheduler.iniciar(client);
    })
    .catch((erro) => {
      console.error('❌ Erro ao iniciar bot:', erro);
    });
}

function iniciarBot(client) {
  // Escuta mensagens recebidas
  client.onMessage(async (message) => {
    try {
      // Ignora grupos e status
      if (message.isGroupMsg || message.from === 'status@broadcast') return;

      const numero = message.from;
      const texto = message.body.trim();

      console.log(`📨 Mensagem de ${numero}: ${texto}`);

      await processarMensagem(client, numero, texto);
    } catch (erro) {
      console.error('❌ Erro ao processar mensagem:', erro);
    }
  });

  // Manda status online
  client.sendPresenceAvailable();
}

async function processarMensagem(client, numero, texto) {
  const textoLower = texto.toLowerCase();

  // Obtém estado da conversa
  let estado = conversas.get(numero) || { etapa: 'inicio' };

  // Comandos de saudação
  if (
    textoLower.includes('oi') ||
    textoLower.includes('olá') ||
    textoLower.includes('ola') ||
    textoLower.includes('bom dia') ||
    textoLower.includes('boa tarde') ||
    textoLower.includes('boa noite') ||
    estado.etapa === 'inicio'
  ) {
    await client.sendText(numero, mensagens.boasVindas());
    estado.etapa = 'menu';
    conversas.set(numero, estado);
    return;
  }

  // Menu principal
  if (estado.etapa === 'menu') {
    if (texto === '1') {
      // Agendar consulta
      const horarios = await sheets.listarHorariosDisponiveis();
      await client.sendText(numero, mensagens.horariosDisponiveis(horarios));

      estado.etapa = 'escolhendo_horario';
      estado.horarios = horarios;
      conversas.set(numero, estado);
      return;
    }

    if (texto === '2') {
      // Consultar agendamento
      const agendamento = await sheets.buscarAgendamentoPorTelefone(numero);
      await client.sendText(numero, mensagens.consultaAgendamento(agendamento));
      return;
    }

    if (texto === '3') {
      // Remarcar consulta
      const agendamentoAtual = await sheets.buscarAgendamentoPorTelefone(numero);

      if (!agendamentoAtual) {
        await client.sendText(numero, '❌ Você não tem consulta agendada.');
        return;
      }

      await client.sendText(numero, mensagens.solicitacaoReagendamento(agendamentoAtual));
      await sheets.cancelarAgendamento(numero);

      const horarios = await sheets.listarHorariosDisponiveis();
      await client.sendText(numero, mensagens.horariosDisponiveis(horarios));

      estado.etapa = 'escolhendo_horario';
      estado.horarios = horarios;
      conversas.set(numero, estado);
      return;
    }

    if (texto === '4') {
      // Cancelar consulta
      const agendamento = await sheets.cancelarAgendamento(numero);

      if (agendamento) {
        await client.sendText(numero, mensagens.cancelamentoConfirmado(agendamento));
      } else {
        await client.sendText(numero, '❌ Você não tem consulta agendada.');
      }

      estado.etapa = 'menu';
      conversas.set(numero, estado);
      return;
    }

    if (texto === '5') {
      // Falar com atendente
      await client.sendText(numero, mensagens.falarComAtendente());
      return;
    }

    // Opção inválida
    await client.sendText(numero, mensagens.opcaoInvalida());
    return;
  }

  // Escolhendo horário
  if (estado.etapa === 'escolhendo_horario') {
    const escolha = parseInt(texto);

    if (isNaN(escolha) || escolha < 1 || escolha > estado.horarios.length) {
      await client.sendText(numero, '❌ Opção inválida. Por favor, digite o número do horário desejado.');
      return;
    }

    const horarioEscolhido = estado.horarios[escolha - 1];

    // Pede nome do paciente
    await client.sendText(numero, '📝 Por favor, digite seu *nome completo*:');

    estado.etapa = 'coletando_nome';
    estado.horarioEscolhido = horarioEscolhido;
    conversas.set(numero, estado);
    return;
  }

  // Coletando nome
  if (estado.etapa === 'coletando_nome') {
    const nome = texto;

    if (nome.length < 3) {
      await client.sendText(numero, '❌ Por favor, digite seu nome completo.');
      return;
    }

    // Cria agendamento
    const agendamento = await sheets.criarAgendamento({
      paciente: nome,
      telefone: numero,
      data: estado.horarioEscolhido.data,
      hora: estado.horarioEscolhido.hora
    });

    await client.sendText(numero, mensagens.confirmacaoAgendamento(agendamento));

    // Reseta estado
    estado.etapa = 'menu';
    conversas.set(numero, estado);
    return;
  }

  // Resposta a confirmação
  if (textoLower === 'sim' || textoLower === 'confirmo') {
    const confirmou = await sheets.confirmarPresenca(numero);

    if (confirmou) {
      await client.sendText(numero, mensagens.confirmacaoRecebida());
    } else {
      await client.sendText(numero, '❌ Não encontrei seu agendamento.');
    }
    return;
  }

  if (textoLower === 'nao' || textoLower === 'não' || textoLower === 'remarcar') {
    await client.sendText(numero, '📋 Vou te ajudar a remarcar!\n\nDigite *3* para ver novos horários.');
    return;
  }

  // Mensagem não reconhecida
  await client.sendText(numero, mensagens.boasVindas());
  estado.etapa = 'menu';
  conversas.set(numero, estado);
}

module.exports = { iniciar };
