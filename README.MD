# 🍕 Food Explorer API

## Sobre o Projeto
O **Food Explorer** é uma aplicação Web que simula um restaurante Delivery. Com uma interface flexível e envolente, o usuário pode navegar pelo Menu do restaurante e favoritar suas opções favoritas! O **Food Explorer** é mais que apenas uma aplicação Web, é também, uma viagem gastrônomica Online!

## 📋 Índice

- 📦 [Pré-requisitos](##-Pré-Requisitos)
- 🛠️ [Instalação](##-Instalação)
- 💻 [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- 🤝 [Contribuições](#-contribuições)

## 📦 Pré-Requisitos

Liste de pré-requisitos necessários para que o projeto seja executado com sucesso:

- [Node.js](https://nodejs.org/) - Versão v18.18.0 ou superior.
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/pt/) - Versão 8.0 ou superior.

## 🛠️ Instalação

Siga os passos abaixo para instalar e configurar a aplicação em um ambiente local:

1. 📥 **Clone o repositório:**

    ```bash
    git clone https://github.com/IanGs1/foodexplorer-api
    ```

2. 📂 **Navegue para o diretório do projeto:**

    ```bash
    cd ./foodexplorer-api
    ```

3. 📦 **Instale as dependências:**

    ```bash
    pnpm install
     ou
    pnpm i
    ```

4.  **⚙️ Defina as váriaveis de Ambiente**
Crie um arquivo com o nome `.env` e defina suas váriaveis de ambiente com as chaves listadas abaixo:

```dotenv 
  JWT_SECRET=""
```

5. ▶️ **Inicie o Servidor**
    ```bash
    pnpm knex migrate:latest
    
    pnpm run dev
    ```

Com tudo isso feito, a aplicação está pronta para ser usada e testada no seu ambiente! 

## 📮 Rotas

### Usuário (Users)

#### Create
```http
  POST /users
```
|  Body Params  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório** O Nome do seu usuário |
| `email` | `string` | **Obrigatório** O Email do seu usuário |
| `password` | `string` | **Obrigatório** A senha do seu usuário |

#### Login
```http
  POST /sessions 
```
|  Body Params  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório** O Email do seu usuário |
| `password` | `string` | **Obrigatório** A senha do seu usuário |

### Pratos (Dishes)

#### Create
```http
  POST /dishes
```
|  Header  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `authorization` | **Obrigatório** Token de Autenticação do Usuário |

|  Body Params  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório** O nome do seu Prato |
| `category` | `string` | **Obrigatório** A categoria do seu Prato | 
| `description` | `string` | **Obrigatório** A descrição do seu Prato | 
| `price` | `float` | **Obrigatório** O Preço do seu Prato | 
| `ingredients` | `array` | **Obrigatório** Os ingredientes do seu Prato | 

#### Show 
```http
  GET /dishes/:dishId
```

|  Header  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `authorization` | **Obrigatório** Token de Autenticação do Usuário |

|  Route Params  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `dishId` | `integer` | **Obrigatório** ID do Prato que quer buscar |

#### Index
```http
  GET /dishes
```

|  Header  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `authorization` | **Obrigatório** Token de Autenticação do Usuário |

|  Query Params  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Nome do Prato que quer buscar |
| `ingredients` | `string` | Ingredientes do Prato que quer buscar |

#### Update
```http
  PUT /dishes/:dishId
```

|  Header  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `authorization` | **Obrigatório** Token de Autenticação do Usuário |

|  Route Params  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `dishId` | `integer` | **Obrigatório** ID do Prato que quer buscar |

|  Body Params  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | O nome do seu Prato |
| `category` | `string` | A categoria do seu Prato | 
| `description` | `string` | A descrição do seu Prato | 
| `price` | `float` | O Preço do seu Prato | 
| `ingredients` | `array` | Os ingredientes do seu Prato | 

#### Patch (Dish Photo)
```http
  PATCH /dishes/:dishId
```

|  Header  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `authorization` | **Obrigatório** Token de Autenticação do Usuário |

|  Route Params  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `dishId` | `integer` | **Obrigatório** ID do Prato que quer buscar |

|  Nome  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `photo` | `multipart/image` | **Obrigatório** Foto do Prato a ser enviada |

### Categorias (Categories)

#### Index
```http
  GET /categories
```

|  Header  | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `authorization` | **Obrigatório** Token de Autenticação do Usuário |


## 💻 Tecnologias Utilizadas
Segue abaixo a lista das principais tecnologias utilizada para o desenvolvimento da API:
- [**Express**](https://expressjs.com/pt-br/)
- [**Knex**](https://www.npmjs.com/package/knex)
- [**express-async-errors**](https://www.npmjs.com/package/express-async-errors)
- [**bcryptjs**](https://www.npmjs.com/package/bcrypt/)
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken)

## 🤝 Contribuições

Agradeço por considerar contribuir para a **API do FoodExplorer**! Contribuições são importantes para melhorar e evoluir o projeto. Aqui estão algumas maneiras pelas quais você pode contribuir:

### 1. Abertura de Issues

Se você encontrar problemas, bugs ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue. Certifique-se de incluir detalhes suficientes para que possamos entender o problema ou a sugestão.

### 2. Envio de Pull Requests (PRs)

Se você deseja fazer alterações no código, pode criar um fork deste repositório, fazer suas alterações no seu fork e, em seguida, enviar um Pull Request. Certifique-se de descrever as alterações que você fez e explicar como isso beneficia o projeto.

### 3. Melhoria da Documentação

A documentação é fundamental para manter a API acessível e fácil de entender. Se você identificar partes do código que precisam de documentação adicional, pode contribuir adicionando comentários claros ou atualizando o README.

### Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma nova branch para suas alterações: `git checkout -b feature/nome-da-sua-feature`.
3. Faça suas alterações e commit: `git commit -m "Adiciona nova funcionalidade"`.
4. Envie suas alterações para o GitHub: `git push origin feature/nome-da-sua-feature`.
5. Abra um Pull Request para este repositório.

🤝 Agradeço por sua contribuição!