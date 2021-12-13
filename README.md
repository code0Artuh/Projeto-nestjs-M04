# Projeto NEST_JS M04

#### API REST utilizando Nest_JS,Prisma e Postgresql 

<div>
    <img align="right" alt="Rafa-yoda" height="130" width="260" src="https://wso2.cachefly.net/wso2/sites/all/2021-theme/apim-2021/apim4-animations/apim-page-animation-get-business-insights-and-intelligence-through-APIs.gif">
</div>
Projeto 1 do módulo 04.

contem 3 rotas que são interligadas entre elas:

Filmes.

Genero.

Participantes.

modelos para incerção dos dados utilizado no schema.prisma.

Filmes:

	model Filmes {
  	id              Int             @id @default(autoincrement())
  	nome            String
  	imagemUrl       String?
  	data_lancamento DateTime        @default(now())
  	duracao         Int
  	genero_id       Int?
  	Generos         Generos?        @relation(fields: [genero_id], references: [id])
  	Participantes   Participantes[]
	}


Genero:

	model Generos {
  	id     Int      @id @default(autoincrement())
  	nome   String
  	Filmes Filmes[]
	}


Participantes:

	model Participantes {
  	id         Int       @id @default(autoincrement())
  	nome       String
  	imagemUrl  String?
  	nascimento DateTime?
  	film_id    Int?
  	Filmes     Filmes?    @relation(fields: [film_id], references: [id])
	}



# Cada rota contem as opções criar, listar todos, listar por id, editar por id e deletar por id.

Tabela das rotas:

Filmes:

    /filmes/listall
    /filmes/listid/id
    /filmes/update/id
    /filmes/delete/id

Generos:

    /generos/add
    /generos/listall
    /generos/listid/id
    /generos/update/id
    /generos/delete/id


Participantes:

    /participantes/add
    /participantes/listall
    /participantes/listid/id
    /participantes/update/id
    /participantes/delete/id
    

# Funcionamento das rotas, instruções validas para todas as 3 rotas.

add:


    utilizando a rota add você consegue adicionar objetos no banco de dados,
    você precisa seguir o modelo de dados mencionado
    no inicio deste documento, tambem encontrara os modelos detalhados
    no arquivo schema.prisma.

listall:


    utilizando a rota listall você consegue puxar todos os objetos salvos
    dentro do banco de dados e listar todos eles em formato json.

listid:


    utilizando a rota listid você consegue puxar um unico objeto 
    especificado pelo id e recebe ele em formato json.

update:


    utilizando a rota update você consegue alterar as propriedades
    de um objeto já existente no banco de dados,
    devemos nos atentar em seguir
    os mesmos padrões de inserção de dados do add seguindo
    as orientações do schema.prisma de cada rota existente no projeto da api.

delete:


    utilizando a rota delete você consegue apagar
    um objeto especifico de dentro do banco de dados apontando ele pelo id.

# O projeto contem uma collection para ser utilizada na extensão thunder client para realizar testes de conexão em todas as rotas junto com o enviroment.

# O projeto esta rodando com o postgresql, siga o env.bkp para utilizar o dotenv caso queira, basta seguir o conteudo do arquivo para realizar a conexão com o DB.

# Para utilizar a api, é preciso instalar o express, o prisma e utilizar o comando a seguir para linkar os models db do prisma com o banco de dados:

	npx prisma db push
