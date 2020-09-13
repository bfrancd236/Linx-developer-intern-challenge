# Linx-developer-intern-challenge
Desafio técnico da Linx | Encurtador de URL | Front-end (React.js) Back-end (Node.js) Banco de Dados (Mongodb)

## Pré-requisitos:
### Back-end
- Yarn
- Node
- MongoDB
- Nodemon
- Nginx
- Short-Id
### Front-end
- React
- React-router

### Configurando MongoDB
Estou assumindo que o MongoDB já está instalado em sua máquina local. Verifique se o MongoDB está em execução ou não usando o comando a seguir.
> Mongod

Ele iniciará mongod serverse o MongoDB estiver instalado corretamente em sua máquina.
Utilizei a conexão express ao mongo através do Mongooose.

### Problemas enfretados e solução
Durante a fase de desenvolvimento do desafio, obtive alguns problemas em relação ao linkar o link urlOriginal ao link encurtado por problemas de CORS.
> “response to the preflight request doesn’t pass access control check no ‘access-control-allow-origin’”

**Solução** foi a utilização de CORS no aplicativo express, mas ao entrar no link obtive o error 404 Not Found no qual o redirecionamento não estava funcionando sendo a 
solução mapear o URL curto para o URL original através do web server **Nginx**, quando chamamos http://localhost/[0–9a-z@]{5,15}$[URL abreviada], o Nginx chamará a API
http://localhost:7000/api/item/$1. Assim, o servidor expresso renderizará a URL original correspondente.

### Vamos rodar as aplicações
Após clonar o projeto e configuração no MongoDB realize a configuranção do nginx realize:
### Iniciar back-end
>cd server/         <- Abrir pasta

>yarn install       <- instalar dependencias

>yarn run server    <-automatização no yarn

### Iniciar front-end
> cd client/     <- Abrir pasta

> yarn install   <- instalar dependencias

> yarn run start <- iniciar automatização start

## Considerações finais
Gostaria de agradecer a oportunidade e pedir desculpa pela não conclusão completa de funcionalidades solicitadas como: TOP 5 e contador de click's. Infelizmente tive problemas pessoas não sendo possivel a conclusão,
mas fiquei muito feliz em ter participado e obter aprendizado sobre a lógica por trás dos encurtadores de link's, estava meio desanimado mas isso ajudou muito na motivação no desenvolvimento.
Em caso de dúvidas estarei disposto a sancionar.

