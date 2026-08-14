require("dotenv").config();

const http = require("http");

const PORT = Number(process.env.PORT || 3000);

const MODE = String(
  process.env.TRADING_MODE || "simulation"
).toLowerCase();

const allowedModes = ["simulation", "real"];

if (!allowedModes.includes(MODE)) {
  console.error(
    "ERRO: TRADING_MODE deve ser 'simulation' ou 'real'."
  );

  process.exit(1);
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.url === "/") {
    return res.end(
      JSON.stringify({
        status: "online",
        project: "MoneyBinance",
        tradingMode: MODE,
        realTradingEnabled: MODE === "real"
      })
    );
  }

  if (req.url === "/status") {
    return res.end(
      JSON.stringify({
        status: "online",
        tradingMode: MODE,
        simulation: MODE === "simulation",
        real: MODE === "real"
      })
    );
  }

  res.statusCode = 404;

  return res.end(
    JSON.stringify({
      error: "Rota nao encontrada"
    })
  );
});

server.listen(PORT, () => {
  console.log("=================================");
  console.log("       MONEY BINANCE");
  console.log("=================================");
  console.log(`Servidor: http://localhost:${PORT}`);
  console.log(`Modo: ${MODE}`);

  if (MODE === "simulation") {
    console.log("SIMULACAO ATIVA");
    console.log("Nenhuma ordem real sera enviada.");
  }

  if (MODE === "real") {
    console.log("MODO REAL SELECIONADO");
    console.log(
      "ATENCAO: a integracao de ordens reais ainda deve ser validada."
    );
  }
});
