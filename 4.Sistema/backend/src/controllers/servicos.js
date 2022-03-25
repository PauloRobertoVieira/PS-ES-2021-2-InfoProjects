const express = require('express')
const app = express.Router()

const { query } = require("../db")

const Servico = require('../models/entities/servico')
const ServicoRepositorio = require('../models/repositories/servico')

const repositorio = new ServicoRepositorio()

app.get('/', (req, res, next) => {
  repositorio.listar().then((servicos) => {
    res.json(servicos)
  }).catch((error) => {
    console.log("deu erro")
    next(error)
  })
})

app.get('/:id', (req, res, next) => {
  repositorio.ler(req.params.id).then(servico => {
    if (!servico) {
      res.status(404).json({ message: "Servico not found" })
    } else {
      res.json(servico)
    }
  }).catch((error) => {
    console.log("Erro em listar servicos")
    next(error)
  })
})

app.post('', (req, res, next) => {
  const post = req.body
  const servico = new Servico(null, post.nome, post.custo, post.descricao)
  if (servico.validar()) {
    repositorio.criar(servico).then(newServices => {
      res.status(201).json(newServices)
    }).catch((error) => {
      console.log("Erro ao criar servico")
      next(error)
    })
  } else {
    res.status(400).json({
      validation: servico.validation
    })
  }
})

app.put('/:id', (req, res, next) => {
  const put = req.body
  const servico = new Servico(req.params.id, put.nome, put.custo, put.descricao)
  repositorio.alterar(servico).then((updateService) => {
    res.json(updateService);
  }).catch((error) => {
    console.log("Erro ao alterar servico")
    next(error)
  })
})

app.delete('/:id', (req, res, next) => {
  repositorio.ler(req.params.id).then((servico) => {
    if (!servico) {
      res.status(404).json({ message: "Servico not found" })
    } else {
      repositorio.deletar(servico).then((isSuccess) => {
        if (isSuccess) {
          res.json({ message: "Servico removido" })
        } else {
          res.status(400).json({ message: "Servico não deletado" })
        }
      })
    }
  }).catch((error) => {
    console.log("Erro ao excluir")
    next(error)
  })
})

module.exports = app