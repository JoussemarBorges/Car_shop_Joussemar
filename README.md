
# Projeto Car Shop

Projeto realizado com o propósito de aplicar os princípios de POO(Programação Orientada a Objetos) para a construção de uma API REST com CRUD. Essa API simula o back-end de um software de gestão de uma concessionária de veículos. Nela é possível realizar o cadastro de um novo veículo, buscar todos os veículos cadastrados, buscar um veículo específico pelo Id, atualizar o cadsatro ou deletar um veículo específico pelo Id.
Foi utilizado o banco de dados MongoDB e a estrutura do projeto foi organizada com a arquitetura de software em três camadas básicas sendo a Controller, Service e Model(configuradas com o ODM Mongoose).
Além do desenvolvimento da API, foi aplicado o conceito de testes unitários, onde foi possível ter uma cobertura de 100% de testes de todas as camadas da aplicação.
Me ogrulho muito desse projeto por ter conseguido aplicar com clareza os conceitos descritos aqui.


## Orientações
<details>
<summary><strong>🐳Para rodar o projeto localmente utilizando o docker:</strong></summary>

    1. Clone o repositório
        - Use o comando: `git clone https://github.com/JoussemarBorges/Car_shop_Joussemar`.
        - Entre na pasta do repositório que você acabou de clonar:
        - `cd sd-024-a-project-car-shop`

    2. Instale as dependências:
        - `npm install`

    3. Certifique-se de ter o docker instalado na versão 1.29 ou superior. Você pode verificar como instalar o docker na documentação: https://docs.docker.com/compose/install/.

     4. O arquivo docker-compose.yml contém as configurações necessárias para rodar os serviços "app-car-shop" - que irá rodar o node - e "mongodb" que irá rodar o mongodb.
        - Já esxiste um arquivo Dokcerfile na raiz do projeto com as configurações necessárias para montar a imagem do node.

    5. Para subir os containers, conforme as configurações acima, rode o comando:
        - docker-compose up - d
        - Esse comando fará a montagem dos container em segundo plano(-d)
        - A partir daqui já é possível rodar o container car_shop via CLI ou abri-lo no VS Code.
        - Caso deseje usar o terminal interativo do container criado pelo compose, utilize o comando docker exec -it car_shop bash
</details>


## Documentação da API

### Há duas coleções no Data Base car_shop_db. As regras das requisições se aplicam para ambas as coleções, com pequenas diferenças que serão exemplificadas.
<details>
<summary><strong>Cadastra um veículo na coleção correspondente (cars ou motorcycles) do DB:</strong></summary>

```http
POST /cars/
POST /motorcycle/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `body` | object | **Obrigatório**. Propriedades e valores para atualização|

    - O body da requisição deve seguir o padrão conforme exemplo abaixo:
        Car:
        { 
            "model": "Marea",
            "year": 1992,
            "color": "Red",
            "status": true, **O único campo opcional**
            "buyValue": 12.000,
            "doorsQty": 2,
            "seatsQty": 5
        }

        Motorcycle:
        {
            "model": "Honda Cb 600f Hornet",
            "year": 2005,
            "color": "Yellow",
            "status": true,
            "buyValue": 30.000,
            "category": "Street",
            "engineCapacity": 600
        }

    - Retorna o status 201 caso seja possível cadastrar um veículo com sucesso!

    - Retorna um json com os dados cadastrados no DB:

        Car:
        {
            "id": "6348513f34c397abcad040b2",
            "model": "Marea",
            "year": 2002,
            "color": "Black",
            "status": true,
            "buyValue": 15.990,
            "doorsQty": 4,
            "seatsQty": 5
        }

        Motorcylce:
        {
            "id": "6348513f34c397abcad040b2",
            "model": "Honda Cb 600f Hornet",
            "year": 2005,
            "color": "Yellow",
            "status": true,
            "buyValue": 30.000,
            "category": "Street",
            "engineCapacity": 600
        }

</details>

<details>
<summary><strong>Retorna todos os veículos cadastrados no DB:</strong></summary>

```http
GET /cars/
GET /motorcycle/
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| ` - ` | ` - ` | `  --  ` |

    - Em caso de Sucesso retornará  ostatus 200 com a seguinte estrutura:
        
        Cars:
        [{
            "id": "634852326b35b59438fbea2f",
            "model": "Marea",
            "year": 2002,
            "color": "Black",
            "status": true,
            "buyValue": 15.99,
            "doorsQty": 4,
            "seatsQty": 5
        },
        {
            "id": "634852326b35b59438fbea31",
            "model": "Tempra",
            "year": 1995,
            "color": "Black",
            "buyValue": 39,
            "doorsQty": 2,
            "seatsQty": 5
        }]

        Motorcycles:
        [{
            "id": "634852326b35b59438fbea2f",
            "model": "Honda Cb 600f Hornet",
            "year": 2005,
            "color": "Yellow",
            "status": true,
            "buyValue": 30.000,
            "category": "Street",
            "engineCapacity": 600
        },
        {
            "id": "634852326b35b59438fbea31",
            "model": "Honda Cbr 1000rr",
            "year": 2011,
            "color": "Orange",
            "status": true,
            "buyValue": 59.900,
            "category": "Street",
            "engineCapacity": 1000
        }]


</details>

<details>
<summary><strong>Retorna um veículo de um Id específico:</strong></summary>

```http
GET /cars/${id}
GET /motorcycle/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do veículo a ser consultado |
    
    - Em caso de sucesso retornará o status 200 e os dados do veículo referente ao id pesquisado:

        Car:
        {
            "id": "634852326b35b59438fbea2f",
            "model": "Marea",
            "year": 2002,
            "color": "Black",
            "status": true,
            "buyValue": 15.99,
            "doorsQty": 4,
            "seatsQty": 5
        }

        Motorcycle:
        {
            "id": "634852326b35b59438fbea31",
            "model": "Honda Cbr 1000rr",
            "year": 2011,
            "color": "Orange",
            "status": true,
            "buyValue": 59.900,
            "category": "Street",
            "engineCapacity": 1000
        }    

    - Retornará o status 422 e um json com a mensagem de erro, caso o id fornecido não esteja no formato correto (default gerado pelo Mongo DB) : 
        { "message": "Invalid mongo id" }

    - Retornará o status 404 e um json com a mensagem de erro, caso o veículo não tenha sido cadastrado:
        Car: { "message": "Car not found" }

        Motorcycle: { "message": "Motorcycle not found" }

</details>

<details>
<summary><strong>Atualiza um veículo com um Id específico:</strong></summary>

```http
PUT /cars/${id}
PUT /motorcycle/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do veículo a ser atualizado |
| `body` | object | **Obrigatório**. Propriedades e valores para atualização|

    - O body da requisição deve seguir o padrão conforme exemplo abaixo:
        
        Car:
        { 
            "model": "Marea",
            "year": 1992,
            "color": "Red",
            "status": true, **O único campo opcional**
            "buyValue": 12.000,
            "doorsQty": 2,
            "seatsQty": 5
        }

        Motorcycle:
        {
            "model": "Honda Cb 600f Hornet",
            "year": 2014,
            "color": "Red",
            "status": true,
            "buyValue": 45.000,
            "category": "Street",
            "engineCapacity": 600
        }

    - Serão feitas as mesmas validações de formato de Id e de Id cadastrado conforme descrito na documentação de retorno de Id específico;

    - Será retornado os daso atualizados do veículo conforme exemplo abaixo:
    
        Car:
        {
            "id": "634852326b35b59438fbea2f",
            "model": "Marea",
            "year": 1992,
            "color": "Red",
            "status": true,
            "buyValue": 12.000,
            "doorsQty": 2,
            "seatsQty": 5
        }

        MOtorcycle:
        {
            "id": "634852326b35b59438fbea2f",
            "model": "Honda Cb 600f Hornet",
            "year": 2014,
            "color": "Red",
            "status": true,
            "buyValue": 45.000,
            "category": "Street",
            "engineCapacity": 600
        }
    
    - Retornará o status 422 e um json com a mensagem de erro, caso o id fornecido não esteja no formato correto (default gerado pelo Mongo DB) : 
        { "message": "Invalid mongo id" }

    - Retornará o status 404 e um json com a mensagem de erro, caso o veículo não tenha sido cadastrado:
        Car: { "message": "Car not found" }

        Motorcycle: { "message": "Motorcycle not found" }

</details>

<details>
<summary><strong>Excluí um veículo de um Id específico:</strong></summary>

```http
DELETE /cars/${id}
DELETE /motorcycles/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do veículo a ser deletado |


    - Será retornar o status 204 sem o Json caso o veículo sejá excluído com sucesso.

    - Retornará o status 422 e um json com a mensagem de erro, caso o id fornecido não esteja no formato correto (default gerado pelo Mongo DB) : 
        { "message": "Invalid mongo id" }

    - Retornará o status 404 e um json com a mensagem de erro, caso o veículo não tenha sido cadastrado:
        Car: { "message": "Car not found" }

        Motorcycle: { "message": "Motorcycle not found" }
</details>

## Tecnologias utilizadas:
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)  ![Mocha](https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown) ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
    
