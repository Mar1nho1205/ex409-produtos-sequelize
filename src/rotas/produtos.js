const express = require("express");
const { Produto } = require("../models/produto");

const router = express.Router();

// ─── Sua tarefa: CRUD completo de Produtos ────────────────────────────────────
// Produto = { id (inteiro, automático), descricao (texto), preco (float) }
// Use o Sequelize (modelo Produto) para acessar o banco. As funções são async.
//
// Contrato esperado pela validação:
//
//  GET    /produtos        → 200 + array de todos os produtos
//  GET    /produtos/:id    → 200 + o produto; 404 se não existir
//  POST   /produtos        → corpo { descricao, preco }
//                             201 + produto criado; 400 se faltar descricao ou preco
//  PUT    /produtos/:id     → substitui { descricao, preco } (ambos obrigatórios)
//                             200 + produto atualizado; 400 se faltar campo; 404 se não existir
//  PATCH  /produtos/:id     → atualiza parcialmente (descricao e/ou preco)
//                             200 + produto atualizado; 404 se não existir
//  DELETE /produtos/:id     → 204 (sem corpo); 404 se não existir

// GET /produtos — lista todos
router.get("/", async (req, res) => {
  const produtos = await Produto.findAll();
  res.status(200).json(produtos);
});

// GET /produtos/:id — um produto
router.get("/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' })
  }

  return res.status(200).json(produto);
});

// POST /produtos — cria
router.post("/", async (req, res) => {
  const { descricao, preco } = req.body;
  const produto = await Produto.create({ descricao, preco });

  if (!descricao || !preco) {
    return res.status(400).json({ erro: 'Descrição ou Preço faltando para concluir o cadastro do produto' })
  }

  res.status(201).json(produto);
});

// PUT /produtos/:id — substitui (descricao e preco obrigatórios)
router.put("/:id", async (req, res) => {
  const { descricao, preco } = req.body;

  if (!descricao || !preco) {
    return res.status(400).json({ erro: 'Descrição ou Preço faltando para a atualização do produto' })
  }

  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' })
  }

  produto.descricao = descricao;
  produto.preco = preco;

  await produto.save();

  res.status(200).json(produto);
});

// PATCH /produtos/:id — atualização parcial
router.patch("/:id", async (req, res) => {
  const { descricao, preco } = req.body;

  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' })
  }

  if (descricao !== undefined) produto.descricao = descricao;
  if (preco !== undefined) produto.preco = preco;
  await produto.save();

  res.status(200).json(produto)
});

// DELETE /produtos/:id — remove
router.delete("/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' })
  }

  await produto.destroy();

  res.status(204).send();
});

module.exports = router;
