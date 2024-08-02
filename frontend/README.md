<div align="center">
  <a href="" rel="noopener">
 <img width="200px" height="200px" src="https://vuejs.org/logo.svg" alt="Project logo"></a>
</div>

<h1 align="center">Code Challenge ProUnion #2 - Frontend</h1>
<h2 align="center">Sistema de Gerenciamento de Usuários</h2>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/RenanGalvao/code-challenge-prounion-2.svg)](https://github.com/RenanGalvao/code-challenge-prounion-2/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/RenanGalvao/code-challenge-prounion-2.svg)](https://github.com/RenanGalvao/code-challenge-prounion-2/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
  
</div>

---

## Tabela de Conteúdos
- [Sobre](#sobre)
- [Requisitos](#requisitos)
- [Uso](#uso)
- [Principais Tecnologias](#tec)
- [Autor](#autor)


## Sobre <a name="sobre"></a>
A aplicação segue as orientações básicas do desafio. Foi feito como [SSG](https://vuejs.org/guide/extras/ways-of-using-vue.html#jamstack-ssg)/[SPA](https://vuejs.org/guide/extras/ways-of-using-vue.html#single-page-application-spa), não seria necessário criar uma imagem docker para ele mas como não sabia muito bem se o Vue iria gerar um servidor ou não deixei assim, porém com um setup mínimo, olhe o Dockerfile para mais informações. 

Apenas usuários com acesso de ADMIN conseguem criar, atualizar, editar e remover usuários, usuários comuns apesar de conseguirem logar não conseguem fazer nenhuma dessas ações, o layout inclusive é diferente.

Busquei fazer uso das features do Vue conforme a necessidade, fiz uso de [rotas](https://router.vuejs.org/) já que há várias views, [Pinia](https://pinia.vuejs.org/) para lidar com estado compartilhado, [composables](https://vuejs.org/guide/reusability/composables.html) para lidar com códigos reutilizáveis e claro, componentes na medida do razoável para evitar repetições. O layout é responsível e simples.

## Requisitos <a name="requisitos"></a>
- [NodeJS 21.x](https://nodejs.org/en/download/prebuilt-installer/current)


## Uso <a name="uso"></a>
- Primeiro clone o projeto: ``git clone https://github.com/RenanGalvao/code-challenge-prounion-2.git``
- Acesse a pasta clonada ``code-challenge-prounion-2``

### Desenvolvimento
- Navegue até a pasta ``frontend``
- Crie uma cópia do arquivo ``.env.example`` com o nome de ``.env``
- Instale os pacotes necessários ``npm install``
- Suba o aplicativo ``npm run dev``
- Acesse [http://localhost:3010](http://localhost:3010) pelo navegador
- Usuário: ``admin@admin.com``
- Senha: ``12345678``

Note que se você não subir o [backend](../backend/README.md) também, serão apresentadas mensages de erro quando o aplicativo tentar fazer requisições à API.

### Produção
Inicie o projeto a partir do ``docker-compose.yml`` da pasta raiz.


## Principais Tecnologias <a name="tec"></a>
- [Docker](https://www.docker.com/) - Virtualização
- [NodeJs](https://nodejs.org/en/) - Runtime
- [VueJs](https://vuejs.org/) - Framework
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS


## Autor <a name="autor"></a>
[@RenanGalvao](https://renangalvao.github.io/whoami/)