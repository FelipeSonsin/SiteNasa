# NASA APOD Project

Este projeto consiste em uma aplicação web que consome a API da NASA (Astronomy Picture of the Day - APOD) para exibir a imagem ou vídeo astronômico de uma data específica (baseada no nascimento ou qualquer outra data).

## Estrutura do Projeto

- `/backend`: API construída com FastAPI.
- `/frontend`: Interface web simples (HTML/JS/CSS).

## Pré-requisitos

- Python 3.8+ instalado.
- Uma chave de API da NASA (obtenha em [api.nasa.gov](https://api.nasa.gov/)).

---

## Passo 1: Configurar o Ambiente Virtual e Backend

Navegue até a pasta do backend e siga as instruções abaixo:

1.  **Acesse o diretório do backend:**
    ```powershell
    cd backend
    ```

2.  **Crie o ambiente virtual (venv):**
    ```powershell
    python -m venv venv
    ```

3.  **Ative o ambiente virtual:**
    - No Windows (PowerShell):
      ```powershell
      .\venv\Scripts\Activate.ps1
      ```
    - No Windows (Prompt de Comando):
      ```cmd
      .\venv\Scripts\activate
      ```

4.  **Instale as dependências:**
    ```powershell
    pip install -r requirements.txt
    ```

5.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` dentro da pasta `backend` (se ainda não existir) e adicione sua chave da NASA:
    ```env
    NASA_API_KEY=SUA_CHAVE_AQUI
    ```

6.  **Execute o servidor backend:**
    ```powershell
    uvicorn main:app --reload
    ```
    O backend estará rodando em `http://127.0.0.1:8000`.

---

## Passo 2: Configurar e Rodar o Frontend

O frontend é composto por arquivos estáticos e pode ser rodado de forma simples:

1.  **Opção A (Recomendada):** Use a extensão "Live Server" no VS Code para abrir o arquivo `frontend/index.html`.
2.  **Opção B:** Basta abrir o arquivo `frontend/index.html` diretamente em seu navegador.

> [!IMPORTANT]
> Certifique-se de que o backend está rodando antes de tentar buscar dados no frontend.

---

## Verificação de Saúde

Para testar se o backend está funcionando, acesse:  
`http://127.0.0.1:8000/`  
Você deve ver uma mensagem `{"status": "ok"}`.
