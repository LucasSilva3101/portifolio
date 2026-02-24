# ========= STAGE 1: Build da aplicação Angular =========
FROM node:22-alpine AS build

# Diretório de trabalho dentro da imagem
WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala dependências (usa a versão do projeto)
RUN npm ci

# Copia o restante do código (src, angular.json, etc.)
COPY . .

# Build em modo produção
RUN npm run build -- --configuration=production

# ========= STAGE 2: Servir os arquivos com Nginx =========
FROM nginx:alpine AS runtime

# Limpa o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# *** CAMINHO CERTO DO SEU BUILD ***
# Seu output é: dist/portifolio
COPY --from=build /app/dist/portifolio/ /usr/share/nginx/html

# Expõe a porta HTTP
EXPOSE 80

# Inicia o Nginx em modo foreground
CMD ["nginx", "-g", "daemon off;"]
