# 📦 Bot Secretária Odontológico - INSTRUÇÕES COMPLETAS

## ✅ O QUE FOI CRIADO

Um sistema completo de agendamento via WhatsApp para consultórios odontológicos.

### 📂 Estrutura do Projeto:

```
bot-secretaria-basico/
├── src/
│   ├── bot.js              # Bot WhatsApp principal
│   ├── config.js           # Configurações
│   ├── mensagens.js        # Templates de mensagens
│   ├── scheduler.js        # Confirmações automáticas
│   └── sheets.js           # Gerenciamento de agendamentos
├── index.js                # Arquivo principal
├── package.json            # Dependências
├── .env                    # Configurações (PERSONALIZAR!)
├── iniciar-bot.bat         # Script para iniciar
├── README.md               # Documentação técnica
├── GUIA_VENDA.md          # Como vender o serviço
└── GUIA_CLIENTE.md        # Entregar para cliente
```

---

## 🚀 COMO USAR - PASSO A PASSO

### **ETAPA 1: Personalizar para sua Cliente**

1. Abra o arquivo `.env`
2. Edite com os dados da dentista:

```env
CONSULTORIO_NOME="Clínica Odontológica Dra. [Nome]"
DENTISTA_NOME="Dra. [Nome Completo]"
CONSULTORIO_TELEFONE="55[DDD][Número]"
```

**Exemplo:**
```env
CONSULTORIO_NOME="Clínica Odontológica Dra. Ana Paula"
DENTISTA_NOME="Dra. Ana Paula Santos"
CONSULTORIO_TELEFONE="5511987654321"
```

---

### **ETAPA 2: Instalar (Se Necessário)**

Se for rodar em outro computador:

```bash
cd bot-secretaria-basico
npm install
```

Aguarde 2-3 minutos para instalar tudo.

---

### **ETAPA 3: Iniciar o Bot**

**Opção A - Modo Fácil:**
- Dê duplo clique em `iniciar-bot.bat`

**Opção B - Pelo Terminal:**
```bash
cd bot-secretaria-basico
npm start
```

---

### **ETAPA 4: Conectar WhatsApp**

1. Um **QR Code** aparecerá no terminal
2. No celular da dentista:
   - Abra WhatsApp
   - Menu → Aparelhos conectados
   - Conectar aparelho
   - Escaneie o QR Code

3. Aguarde mensagem: **"✅ Bot conectado com sucesso!"**

✅ **Pronto! Bot está online!**

---

### **ETAPA 5: Testar**

**Do seu próprio WhatsApp**, mande mensagem para o número conectado:

```
Você: Oi

Bot: 🦷 Clínica Odontológica Dra. Ana Paula

     Olá! Sou a assistente virtual! 😊

     📋 Menu Principal
     1 - Agendar consulta
     2 - Consultar meu agendamento
     ...

Você: 1

Bot: 📅 Horários Disponíveis:
     1 - Terça, 04/03 às 14:00
     2 - Terça, 04/03 às 16:00
     ...

Você: 1

Bot: 📝 Por favor, digite seu nome completo:

Você: João Teste

Bot: ✅ Consulta Agendada com Sucesso!
     👤 Paciente: João Teste
     🦷 Profissional: Dra. Ana Paula Santos
     📅 Data: Terça, 04/03/2026
     ...
```

✅ **Se funcionou assim, está perfeito!**

---

## 💰 COMO COBRAR DA CLIENTE

### Proposta de Valor

**Setup Inicial (uma vez):** R$ 300
- Instalação e configuração
- Personalização com dados do consultório
- Treinamento de uso
- Teste completo

**Mensalidade:** R$ 97/mês
- Bot ativo 24/7
- Confirmações automáticas (24h antes)
- Lembretes automáticos (3h antes)
- Até 200 agendamentos/mês
- Suporte via WhatsApp

**Total primeiro mês:** R$ 397
**Meses seguintes:** R$ 97

---

### Como Apresentar

"Oi [Nome da dentista]! 😊

Criei um sistema automático de agendamento pelo WhatsApp pra você!

**O que ele faz:**
✅ Agenda consultas automaticamente (24/7)
✅ Envia confirmação 1 dia antes
✅ Envia lembrete 3h antes
✅ Reduz faltas em até 50%
✅ Economiza horas de telefone

**Investimento:**
R$ 300 (setup inicial) + R$ 97/mês

Quer que eu instale e te mostre como funciona?"

---

## 📊 SEUS CUSTOS

### Hospedando no seu PC:
- **Custo:** R$ 0-20/mês (energia elétrica)
- **Lucro:** R$ 77-97/mês por cliente

### Hospedando na Nuvem (Oracle Free):
- **Custo:** R$ 0/mês (grátis permanente)
- **Lucro:** R$ 97/mês por cliente

### Hospedando na Nuvem (Contabo):
- **Custo:** R$ 27/mês ÷ 20 clientes = R$ 1,35/cliente
- **Lucro:** R$ 95,65/mês por cliente

---

## 🎯 ONDE HOSPEDAR

### **Opção 1: PC da Dentista (Mais Simples)**
✅ Instala no computador dela
✅ Deixa ligado 24/7
✅ Custo: R$ 20/mês (luz)
✅ Você lucra: R$ 77/mês

**Ideal para:** Primeira cliente, teste

---

### **Opção 2: Seu PC (Melhor no Começo)**
✅ Você gerencia tudo
✅ Mais controle
✅ Custo: R$ 20/mês (sua luz)
✅ Você lucra: R$ 77/mês

**Ideal para:** Começar, aprender, ter controle

---

### **Opção 3: Nuvem - Oracle Free (Melhor Longo Prazo)**
✅ Grátis para sempre
✅ 24GB RAM
✅ Roda vários bots
✅ Custo: R$ 0/mês
✅ Você lucra: R$ 97/mês

**Ideal para:** Depois de validar, múltiplos clientes

---

### **Opção 4: Nuvem - Railway (Mais Fácil)**
✅ Deploy em 5 minutos
✅ 500h grátis/mês (21 dias)
✅ Depois: R$ 30/mês
✅ Custo: R$ 0-30/mês
✅ Você lucra: R$ 67-97/mês

**Ideal para:** Quer facilidade, não sabe configurar servidor

---

## 🔧 MANUTENÇÃO

### O que fazer se o bot cair:

1. Abra o terminal/pasta do bot
2. Rode novamente: `npm start`
3. Escaneie QR Code novamente (se necessário)

### Alterar horários disponíveis:

1. Abra `src/sheets.js`
2. Linha 15, altere:
```javascript
const horarios = ['08:00', '09:00', '10:00', '14:00', '15:00'];
```
3. Salve e reinicie o bot

### Mudar horário das confirmações:

1. Abra `src/scheduler.js`
2. Linha 10, altere:
```javascript
cron.schedule('0 9 * * *', ... // 9h da manhã
// Para 10h: '0 10 * * *'
```

---

## 📱 SUPORTE PARA CLIENTE

Quando ela tiver dúvidas, você responde:

**"Como vejo os agendamentos?"**
→ Por enquanto aparecem no terminal. Depois integramos com Google Sheets.

**"Posso mudar os horários?"**
→ Sim! Me manda a lista de horários que você atende e eu atualizo em 5 minutos.

**"E se eu fechar o consultório um dia?"**
→ Me avisa que eu cancelo/remarca todos os agendamentos daquele dia.

**"Tem limite de mensagens?"**
→ Não! Até 200 agendamentos/mês (muito além do normal).

---

## 🚀 COMO ESCALAR (Múltiplos Clientes)

### Com 1 servidor (Oracle/Contabo):
- Rode **até 50 bots** simultaneamente
- Crie uma pasta para cada cliente
- Configure cada um com dados diferentes
- Inicie todos ao mesmo tempo

### Exemplo:
```
bots/
├── dentista-maria/      # Cliente 1
├── dentista-joao/       # Cliente 2
├── dentista-ana/        # Cliente 3
└── ...
```

Cada um com seu WhatsApp e configurações próprias.

---

## 💡 DICAS DE SUCESSO

### Para Vender Mais:

1. **Ofereça teste grátis:** 7 dias
2. **Mostre na prática:** Agende você mesmo na frente dela
3. **Fale em economia:** "Reduz 50% das faltas"
4. **Compare com secretária:** "R$ 97 vs R$ 2.800"
5. **Facilite pagamento:** Pix, cartão, parcelado

### Para Manter Clientes:

1. **Responda rápido:** Suporte em até 24h
2. **Seja proativo:** "Tudo funcionando bem?"
3. **Mostre valor:** "Você teve X agendamentos este mês!"
4. **Atualize:** Adicione features novas grátis
5. **Cobre anual:** Ofereça desconto para fidelizar

---

## 📞 CONTRATO MODELO (Opcional)

```
CONTRATO DE PRESTAÇÃO DE SERVIÇOS

CONTRATANTE: [Nome da Dentista]
CONTRATADO: [Seu Nome]

OBJETO: Sistema automatizado de agendamento via WhatsApp

VALORES:
- Setup inicial: R$ 300,00 (pagamento único)
- Mensalidade: R$ 97,00
- Vencimento: Todo dia [X] do mês

SERVIÇOS INCLUÍDOS:
✓ Bot WhatsApp ativo 24/7
✓ Confirmações automáticas (24h antes)
✓ Lembretes automáticos (3h antes)
✓ Suporte via WhatsApp
✓ Atualizações incluídas

PRAZO: Indeterminado
CANCELAMENTO: Com 30 dias de antecedência

______________________        ______________________
CONTRATANTE                    CONTRATADO
```

---

## ✅ CHECKLIST FINAL

Antes de entregar para cliente:

- [ ] Bot instalado e funcionando
- [ ] Dados personalizados (.env)
- [ ] WhatsApp conectado
- [ ] Teste de agendamento feito
- [ ] Confirmações testadas
- [ ] Dados de pagamento acertados
- [ ] Guia do cliente entregue
- [ ] Suporte combinado

---

## 🎉 PRONTO PARA USAR!

Você tem agora:

✅ Bot completo funcionando
✅ Documentação de venda
✅ Guia do cliente
✅ Instruções completas
✅ Plano de crescimento

**Seu primeiro cliente está a uma conversa de distância!**

**Boa sorte! 🚀💰**

---

## 📞 Suporte

Qualquer dúvida sobre o código ou funcionamento, é só perguntar! 😊
