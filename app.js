const { Client, Events, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const express = require("express");
const app = express();
require('dotenv').config();

// Configurando o EJS como o mecanismo de visualização
app.set("view engine", "ejs");
app.use(express.static("public"));

client.on(Events.ClientReady, (c) => {
  console.log(`Bot logado como ${client.user.tag}`);
});

client.login(process.env.TOKEN)


// como posso melhorar a rota / para que não haja ratelimit no client?

app.get("/", async (req, res) => {
  // Obtendo o nome do servidor do Discord usando o ID do servidor
  try {
    const guild = await client.guilds.fetch("1077296704379953292");
    const clientsServer = guild.memberCount;
    const guildName = guild.name;
    // Renderizar a página EJS e passe o nome do servidor como uma variável
    res.render("index", { serverName: guildName, clients: clientsServer });
  } catch (err) {
    console.error(err);
    // Renderizar a página EJS sem o nome do servidor em caso de erro
    res.render("index");
  }
});

app.get("/equipe", async (req, res) => {
  const userProfessions = {
    "1059674502876897320": {
      profession: "Desenvolvedor de Servidores",
      description: "Descrição",
    },
    "924838482034163764": {
      profession: "No tiengo informaciones ainda",
      description: "Descrição",
    },
    "771885466415923260": {
      profession: "No tiengo informaciones ainda",
      description: "Descrição",
    },
    "783453665322598430": {
      profession: "Desenvolvedor de Servidores",
      description:
        "Comecei a criar servidores Discord há 1 ano e 4 meses. Durante esse tempo, eu adquiri experiência em gerenciamento de servidores, moderação de comunidade e muito mais. Estou sempre em busca de novas maneiras de melhorar a experiência dos usuários e fornecer um ambiente seguro e acolhedor para todos.",
    },
    "993471863294525450": {
      profession: "Designer",
      description: "Descrição",
    },
    "353564076812533771": {
      profession: "Desenvolvedor de Servidores & Analista",
      description: "Descrição",
    },
    "717766639260532826": {
      profession: "Programador",
      description: "Descrição",
    },
    "630094077529948172": {
      profession: "Desenvolvedor de Servidores & Analista",
      description: "Descrição",
    },
  };

  const usersWithAvatar = [];

  for (const userID in userProfessions) {
    try {
      const user = await client.users.fetch(userID);

      usersWithAvatar.push({
        name: `${user.username}#${user.discriminator}`,
        avatarURL: user.displayAvatarURL(),
        profession: userProfessions[userID].profession,
        description: userProfessions[userID].description,
      });
    } catch (err) {
      console.error(err);
    }
  }

  res.render("equipe.ejs", { users: usersWithAvatar });
});

app.get("/sobre", (req, res) => {
  res.render("sobre");
});

app.get("/termosdeuso", (req, res) => {
  res.render("termosdeuso");
});

app.get("/politicadeprivacidade", (req, res) => {
  res.render("politicadeprivacidade");
});

app.get("/server", (req, res) => {
  res.redirect("https://discord.gg/QkpMt8Ksdy");
});

// Inicializar o servidor
const server = app.listen(3000, () => {
  console.log("Server is running on port", server.address().port);
});
