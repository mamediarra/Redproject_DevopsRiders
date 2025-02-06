# Utilise l'image de base Node.js
FROM node:16

# Crée et définit le répertoire de travail
WORKDIR /usr/src/app

# Copie les fichiers du projet dans l'image Docker
COPY package*.json ./
RUN npm install
COPY . .

# Expose le port sur lequel l'application écoute
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["node", "index.js"]
