# Projeto Trybe Futebol Clube

## Objetivo

O objetivo deste projeto é criar uma API para gerenciar um time de futebol, utilizando os conhecimentos adquiridos até o momento no módulo de Back-end. Para isso, foi utilizado o framework Express, o ORM Sequelize e o banco de dados MySQL junto ao Sequelize. E usando Typescript para tipagem estática.

## Requisitos do projeto

### 1 - Crie um endpoint **GET** `/teams` que retorna todos os times cadastrados no banco de dados

#### Os seguintes pontos serão avaliados

- Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de times;
- (TDD) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos em /app/backend/src, com um mínimo de 7 linhas cobertas
- Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]
```

- (TDD) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos em /app/backend/src, com um mínimo de 19 linhas cobertas
- Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico

```json
{
  "id": 1,
  "teamName": "Avaí/Kindermann"
}
```

### 2 - Crie um endpoint **POST** `/login` que recebe um email e senha e retorna um token de autenticação

#### Os seguintes pontos serão avaliados

- Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de pessoas usuárias
- (TDD) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos em /app/backend/src, com um mínimo de 25 linhas cobertas
- Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
}
```

- (TDD) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos em /app/backend/src, com um mínimo de 35 linhas cobertas
- Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end
- (TDD) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos em /app/backend/src, com um mínimo de 45 linhas cobertas
- Desenvolva um middleware de validação para o token, verificando se ele é válido, e desenvolva o endpoint /login/role no back-end de maneira que ele retorne os dados corretamente no front-end

### 3 - Crie um endpoint **POST** `/matches` que recebe as informações de uma partida e as salva no banco de dados

#### Os seguintes pontos serão avaliados

- Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de partidas
- (TDD) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos em /app/backend/src, com um mínimo de 70 linhas cobertas
- Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end

```json
[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  ...
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]
```

- Desenvolva o endpoint /matches de forma que seja possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end

  - Essa requisição deverá usar query string para definir o parâmetro: ex: matches?inProgress=true

```json
[
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeamId": 6,
    "homeTeamGoals": 1,
    "awayTeamId": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Ferroviária"
    },
    "awayTeam": {
      "teamName": "Avaí/Kindermann"
    }
  }
]
```

- Essa requisição deverá usar query string para definir o parâmetro. ex: matches?inProgress=false

```json
[
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  }
]
```

- Desenvolva o endpoint /matches/:id/finish de modo que seja possível finalizar uma partida no banco de dados
- Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento
- (TDD) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos em /app/backend/src, com um mínimo de 80 linhas cobertas
- Desenvolva o endpoint /matches de modo que seja possível cadastrar uma nova partida em andamento no banco de dados
- Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times

### 4 - Crie um endpoint **POST** `/leaderboard` que recebe o id de uma partida e atualiza a tabela de classificação

#### Os seguintes pontos serão avaliados

- Desenvolva o endpoint /leaderboard/home de forma que retorne as informações do desempenho dos times da casa com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn
- Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior
- Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
- Desenvolva o endpoint /leaderboard/away de forma que retorne as informações do desempenho dos times visitantes com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn
- Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior
- Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
- Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados
- (Bônus) Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC


## Autor

- [Walber Vaz](https://www.linkedin.com/in/walber-vaz/ "Perfil Linkedin")

## Agradecimentos

- [Trybe](https://www.betrybe.com/ "Trybe")

---

### VQV 🚀
