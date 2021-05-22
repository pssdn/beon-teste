## Task Management - Beon Teste

Sistema desenvolvido para atender à demanda de uma API que gerencie uma lista de atividades.

### Instalação

- Clone do Repositório

```shell
git clone https://github.com/vkunssec/beon-teste.git
```

- Instalação de Dependências

```shell
npm install
```

- Iniciando Redis via Docker

```shell
docker compose up -d
```

Por padrão o Redis roda na porta 6379. Caso seja alterado esse padrão, o [serverless.yml](serverless.yml) deve ser atualizado na linha 14 (_environment -> REDIS_URL_) com a nova URL para o acesso ao serviço.

### Inicialização

```shell
npm run start
```

### Assinatura de Rodas

Estágio padrão do sistema é como _Development_, logo, a assinatura das rodas começa com _/dev_, sendo seguida dos valores descritos a seguir.

#### `/task`, método `POST`

Inserir nova tarefa.

- Parâmetros

  Os parâmetro devem ser enviados seguindo o formato `JSON`.

  - `name`: Nome da tarefa.

    - Tipo: `string`

  - `dateStart`: Data de inicio da tarefa.

    - Tipo: `string`

  - `situation`: Situação da tarefa (Pendente, Concluida).

    - Tipo: `string`

  - `priority`: Grau de prioridade (Baixa, Média, Alta).

    - Tipo: `string`

  - `dateConclusion`: Data de finalização da tarefa (opcional).

    - Tipo: `string` || `null`

- Retorno

```javascript
{
  id: "c0d45c57-ce83-4ad...",
  task: {
    name: "Task",
    dateStart: "01/05/2021",
    situation: "Pending",
    priority: "Low",
    dateConclusion: null
  }
}
```

#### `/tasks`, método `GET`

Buscando todas as tarefas já inseridas.

- Retorno

```javascript
[
  {
    id: "bd9eb57a-8afd-423...",
    task: {
      name: "Task",
      dateStart: "01/05/2021",
      situation: "Concluded",
      priority: "High",
      dateConclusion: "07/05/2021",
    },
  },
  {
    id: "93d23b5f-837e-4cf...",
    task: {
      name: "Another Task",
      dateStart: "01/05/2021",
      situation: "Pending",
      priority: "Low",
      dateConclusion: null,
    },
  },
  ...
];
```

#### `/task/:id`, método `GET`

Buscando tarefa por Identificador.

- Parâmetros

  - `:id`: Identificador único para cada tarefa.

- Retorno

```javascript
{
  id: "c0d45c57-ce83-4ad...",
  task: {
    name: "Task",
    dateStart: "01/05/2021",
    situation: "Pending",
    priority: "Low",
    dateConclusion: null
  }
}
```

#### `/task/:id`, método `PATCH`

Atualizar uma tarefa.

- Parâmetros

  - `:id`: Identificador único para cada tarefa.

  Todos os parâmetros abaixo são opcionais.<br>Os parâmetro devem ser enviados seguindo o formato `JSON`.

  - `name`: Nome da tarefa.

    - Tipo: `string`

  - `dateStart`: Data de inicio da tarefa.

    - Tipo: `string`

  - `situation`: Situação da tarefa (Pendente, Concluida).

    - Tipo: `string`

  - `priority`: Grau de prioridade (Baixa, Média, Alta).

    - Tipo: `string`

  - `dateConclusion`: Data de finalização da tarefa.

    - Tipo: `string` || `null`

- Retorno

```javascript
{
  id: "c0d45c57-ce83-4ad...",
  task: {
    name: "Task",
    dateStart: "01/05/2021",
    situation: "Concluded",
    priority: "Low",
    dateConclusion: "07/05/2021"
  }
}
```

#### `/task/:id`, método `DELETE`

Exclusão de um item da lista.

- Parâmetros

  - `:id`: Identificador único para cada tarefa.
