# API de Produtos com FastAPI e MongoDB

---

Esta é uma API RESTful simples para gestão de produtos, desenvolvida com **FastAPI** e utilizando **MongoDB** como base de dados. Ela permite operações CRUD (Criar, Ler, Atualizar, Excluir) em registos de produtos.

## ✨ Funcionalidades

* **Criação de Produtos:** Adiciona novos produtos com detalhes como nome, descrição, preço e quantidade em stock.
* **Listagem de Produtos:** Retorna uma lista de todos os produtos ou produtos específicos por ID.
* **Atualização de Produtos:** Modifica os detalhes de um produto existente.
* **Exclusão de Produtos:** Remove um produto da base de dados.
* **Validação de Dados:** Utiliza Pydantic para validação automática de dados dos pedidos e respostas.
* **Documentação Automática:** Fornecida pelo FastAPI (Swagger UI e ReDoc).

## 🚀 Tecnologias Utilizadas

* **FastAPI:** Framework web moderno e rápido para construção de APIs.
* **Python 3.x:** Linguagem de programação.
* **MongoDB:** Base de dados NoSQL para armazenamento de dados dos produtos.
* **Pydantic:** Para validação de dados e serialização.
* **Motor:** Driver assíncrono para MongoDB.
* **Uvicorn:** Servidor ASGI para executar a aplicação FastAPI.
* **python-dotenv:** Para carregar variáveis de ambiente.

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados na sua máquina:

* **Python 3.8+**
* **pip** (gerenciador de pacotes do Python)
* **MongoDB** (servidor e/ou MongoDB Compass para visualização)
* **Git**

## 📦 Instalação e Configuração

Siga os passos abaixo para configurar e executar a API localmente:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/danilusilva/trabalho-carlinhos.git
    cd trabalho-carlinhos
    ```

2.  **Crie e ative um ambiente virtual (recomendado):**
    ```bash
    python -m venv venv
    # No Windows:
    .\venv\Scripts\activate
    # No macOS/Linux:
    source venv/bin/activate
    ```

3.  **Instale as dependências do Python:**
    ```bash
    pip install -r requirements.txt
    ```
    (Certifique-se de ter um arquivo `requirements.txt` com todas as suas dependências, como `fastapi`, `uvicorn`, `motor`, `pydantic`, `python-dotenv`)

4.  **Configure o MongoDB:**
    * Certifique-se de que o seu servidor MongoDB esteja a ser executado.
    * Crie um arquivo `.env` na raiz do projeto (na mesma pasta onde está o `main.py` ou `app.py`) com a sua string de conexão do MongoDB:
        ```
        MONGO_DETAILS="mongodb://localhost:27017"
        DATABASE_NAME="nomedasuabase"
        COLLECTION_NAME="produtos"
        ```
        *Substitua `nomedasuabase` pelo nome da base de dados que deseja usar.*

## ▶️ Como Executar a API

Com todas as dependências instaladas e o MongoDB configurado, você pode iniciar a API:

```bash
uvicorn main:app --reload
