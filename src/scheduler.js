// Agendador de confirmações e lembretes
const cron = require('node-cron');
const mensagens = require('./mensagens');
const sheets = require('./sheets');

let clienteWhatsApp = null;

function iniciar(client) {
  clienteWhatsApp = client;

  console.log('⏰ Scheduler iniciado!');

  // Confirmações 24h antes - Roda todo dia às 9h
  cron.schedule('0 9 * * *', async () => {
    console.log('🔔 [CRON] Enviando confirmações de consultas...');
    await enviarConfirmacoes();
  });

  // Lembretes 3h antes - Roda a cada hora
  cron.schedule('0 * * * *', async () => {
    console.log('⏰ [CRON] Verificando lembretes...');
    await enviarLembretes();
  });

  console.log('✅ Agendamentos configurados:');
  console.log('   📨 Confirmações: Todos os dias às 9h');
  console.log('   ⏰ Lembretes: A cada hora\n');
}

async function enviarConfirmacoes() {
  try {
    const agendamentos = await sheets.buscarAgendamentosParaConfirmacao();

    console.log(`   📋 Encontrados ${agendamentos.length} agendamentos para confirmar`);

    for (const agendamento of agendamentos) {
      try {
        const mensagem = mensagens.confirmacao24h(agendamento);
        await clienteWhatsApp.sendText(agendamento.telefone, mensagem);

        console.log(`   ✅ Confirmação enviada para ${agendamento.paciente}`);

        // Aguarda 2 segundos entre mensagens
        await sleep(2000);
      } catch (erro) {
        console.error(`   ❌ Erro ao enviar para ${agendamento.paciente}:`, erro.message);
      }
    }

    console.log('   ✅ Confirmações concluídas!\n');
  } catch (erro) {
    console.error('❌ Erro ao enviar confirmações:', erro);
  }
}

async function enviarLembretes() {
  try {
    const agendamentos = await sheets.buscarAgendamentosParaLembrete();

    if (agendamentos.length === 0) return;

    console.log(`   📋 Encontrados ${agendamentos.length} lembretes para enviar`);

    for (const agendamento of agendamentos) {
      try {
        const mensagem = mensagens.lembrete3h(agendamento);
        await clienteWhatsApp.sendText(agendamento.telefone, mensagem);

        console.log(`   ✅ Lembrete enviado para ${agendamento.paciente}`);

        // Aguarda 2 segundos entre mensagens
        await sleep(2000);
      } catch (erro) {
        console.error(`   ❌ Erro ao enviar para ${agendamento.paciente}:`, erro.message);
      }
    }

    console.log('   ✅ Lembretes concluídos!\n');
  } catch (erro) {
    console.error('❌ Erro ao enviar lembretes:', erro);
  }
}

// Função auxiliar para delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { iniciar };
