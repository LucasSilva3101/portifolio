# ========= STAGE 1: Build da aplicação Angular =========
FROM node:22-alpine AS build

# Pasta de trabalho dentro da imagem
WORKDIR /app

# Copia somente arquivos de dependências primeiro (melhor cache)
COPY package*.json ./

# Instala dependências em modo “clean”
RUN npm ci

# Copia o restante do código-fonte
COPY . .

# Build em modo produção (defaultConfiguration já é "production")
RUN npm run build -- --configuration=production

# ========= STAGE 2: Servir os arquivos estáticos com Nginx =========
FROM nginx:alpine AS runtime

# Limpa o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# IMPORTANTE:
# O Angular 19 com o builder "application" gera:
# dist/portifolio/browser/index.html
# Copiamos o CONTEÚDO de "browser" direto para a raiz do Nginx
COPY --from=build /app/dist/portifolio/browser/ /usr/share/nginx/html

# Porta interna do Nginx
EXPOSE 80

# Sobe o Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
