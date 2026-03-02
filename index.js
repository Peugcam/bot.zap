#!/usr/bin/env node

// Bot Secretária - Consultório Odontológico
// Plano Básico - R$ 97/mês

const bot = require('./src/bot');
const scheduler = require('./src/scheduler');
const config = require('./src/config');

console.log('╔═══════════════════════════════════════════════╗');
console.log('║   🦷 BOT SECRETÁRIA ODONTOLÓGICO 🦷         ║');
console.log('║   Plano Básico - R$ 97/mês                   ║');
console.log('╚═══════════════════════════════════════════════╝');
console.log('');
console.log(`📋 Consultório: ${config.consultorio.nome}`);
console.log(`👨‍⚕️ Profissional: ${config.consultorio.dentista}`);
console.log('');
console.log('🚀 Inicializando sistema...\n');

// Inicia o bot
bot.iniciar();

// Nota: O scheduler será iniciado após o bot conectar
// Isso é feito dentro do bot.js após client estar pronto

console.log('✅ Sistema iniciado com sucesso!');
console.log('\n📱 Aguardando QR Code para conectar WhatsApp...\n');
