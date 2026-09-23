const express = require("express");
const { sequelize }  = require("./models/produto");
const produtosRouter = require("./rotas/produtos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /health — já implementada. Use para conferir que o servidor sobe.
// A validação espera que GET /health responda com status 200.
app.get("/health", (req, res) => {
  res.json({ status: "ok", api: "Produtos" });
});

// Todas as rotas de /produtos ficam no roteador dedicado.
app.use("/produtos", produtosRouter);

// Sincroniza o banco (cria a tabela) e sobe o servidor.
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`API de Produtos rodando em http://localhost:${PORT}`);
  });
});

module.exports = app;
