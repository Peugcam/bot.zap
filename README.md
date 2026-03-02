# 🦷 Bot Secretária Odontológico - Plano Básico

Sistema automatizado de agendamento e confirmação de consultas via WhatsApp para consultórios odontológicos.

**Plano Básico: R$ 97/mês**

---

## ✨ Funcionalidades

### Para o Paciente:
- ✅ Agendar consultas (escolher data e horário)
- ✅ Consultar agendamento
- ✅ Remarcar consulta
- ✅ Cancelar consulta
- ✅ Receber confirmações 24h antes
- ✅ Receber lembretes 3h antes

### Para o Consultório:
- ✅ Agendamentos automáticos
- ✅ Redução de faltas (confirmações)
- ✅ Atendimento 24/7
- ✅ Organização de horários
- ✅ Histórico de consultas

---

## 📋 Requisitos

- Node.js 16+ instalado
- WhatsApp Business ou pessoal
- Computador ou servidor para rodar 24/7

---

## 🚀 Instalação

### 1. Instalar dependências

```bash
cd bot-secretaria-basico
npm install
```

### 2. Configurar ambiente

Copie o arquivo de exemplo:

```bash
copy .env.example .env
```

Edite o arquivo `.env` com os dados do consultório:

```env
CONSULTORIO_NOME="Clínica Sorriso Perfeito"
DENTISTA_NOME="Dra. Maria Silva"
CONSULTORIO_TELEFONE="5511999999999"
HORARIO_ABERTURA="08:00"
HORARIO_FECHAMENTO="18:00"
```

### 3. Iniciar bot

```bash
npm start
```

### 4. Conectar WhatsApp

1. Um QR Code aparecerá no terminal
2. Abra WhatsApp no celular
3. Vá em **Configurações** → **Aparelhos conectados**
4. Escaneie o QR Code

✅ **Pronto! Bot está online!**

---

## 📱 Como Usar (Para Pacientes)

### Agendar Consulta

```
Paciente: Oi
Bot: [Menu com opções]

Paciente: 1
Bot: [Lista de horários disponíveis]

Paciente: 3
Bot: Digite seu nome completo

Paciente: João Silva
Bot: ✅ Consulta agendada para 05/03 às 10:00!
```

### Confirmação Automática (24h antes)

```
Bot: 🔔 Olá João!
     Você tem consulta AMANHÃ às 10:00
     Confirma presença?

     Digite SIM ou NAO

Paciente: SIM
Bot: ✅ Presença confirmada!
```

### Lembrete (3h antes)

```
Bot: ⏰ Olá João!
     Sua consulta é HOJE às 10:00
     Nos vemos em breve! 😊
```

---

## ⚙️ Configurações Avançadas

### Horários Disponíveis

Por padrão, o bot oferece estes horários:
- **Manhã:** 08:00, 09:00, 10:00, 11:00
- **Tarde:** 14:00, 15:00, 16:00, 17:00

Para alterar, edite `src/sheets.js`, linha 15:

```javascript
const horarios = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
```

### Duração das Consultas

Padrão: 60 minutos

Altere em `src/config.js`:

```javascript
duracaoConsulta: 60, // minutos
```

### Horário de Confirmações

Padrão: 9h da manhã

Altere em `src/scheduler.js`:

```javascript
// Mudar '0 9 * * *' para o horário desejado
// Formato: minuto hora * * *
cron.schedule('0 10 * * *', async () => { // 10h
```

---

## 🔧 Integração com Google Sheets (Opcional)

### Por que usar Google Sheets?

- ✅ Visualizar todos os agendamentos
- ✅ Backup automático
- ✅ Compartilhar com equipe
- ✅ Exportar relatórios

### Como integrar:

1. Crie uma planilha no Google Sheets
2. Estruture assim:

| ID | Paciente | Telefone | Data | Hora | Status | Confirmado |
|----|----------|----------|------|------|--------|------------|
| 1 | João Silva | 5511999999999 | 05/03/2026 | 10:00 | agendado | sim |

3. Habilite a API do Google Sheets
4. Baixe as credenciais JSON
5. Salve como `credentials.json`
6. Configure o ID da planilha no `.env`

**Tutoriais detalhados disponíveis em:** https://developers.google.com/sheets/api/quickstart/nodejs

---

## 💰 Modelo de Negócio

### Custos

| Item | Valor |
|------|-------|
| Servidor (Oracle Free) | R$ 0/mês |
| OU Seu PC (luz) | R$ 20/mês |
| **TOTAL** | **R$ 0-20/mês** |

### Preço de Venda

- **Setup:** R$ 300 (uma vez)
- **Mensalidade:** R$ 97/mês

### Lucro

- **Por cliente:** R$ 95,50/mês
- **10 clientes:** R$ 955/mês = R$ 11.460/ano
- **20 clientes:** R$ 1.910/mês = R$ 22.920/ano

---

## 🛠️ Troubleshooting

### Bot não conecta

```bash
# Limpar sessão anterior
rm -rf tokens/
npm start
```

### Mensagens não são respondidas

- Verifique se o bot está online
- Confirme que não é grupo
- Teste enviando "oi"

### Confirmações não enviadas

- Verifique se o horário do cron está correto
- Confira se há agendamentos para amanhã
- Veja os logs no console

---

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 Email: [seu-email]
- 💬 WhatsApp: [seu-whatsapp]

---

## 📄 Licença

Este bot foi desenvolvido para uso em consultórios odontológicos.

© 2026 - Todos os direitos reservados

---

## 🎯 Próximas Melhorias (Plano Profissional)

Quer mais funcionalidades?

### Plano Profissional - R$ 147/mês
- ✅ Até 5 profissionais
- ✅ Relatórios mensais
- ✅ Integração com calendário
- ✅ Dashboard web
- ✅ Suporte prioritário

Entre em contato para upgrade! 🚀
