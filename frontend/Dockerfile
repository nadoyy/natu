FROM node:20-alpine

WORKDIR /app

# Copy package.json dan package-lock.json dulu
COPY package*.json ./

# Install dependencies termasuk devDependencies (vite)
RUN npm install

# Copy seluruh source code
COPY . .

# Expose port default Vite
EXPOSE 5173

# Jalankan Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
