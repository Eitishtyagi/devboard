# Step 1 — Base image lo
FROM node:18-alpine

# Step 2 — Folder banao container ke andar
WORKDIR /app

# Step 3 — package.json copy karo pehle
COPY package*.json ./

# Step 4 — Dependencies install karo
RUN npm install

# Step 5 — Baaki code copy karo
COPY . .

# Step 6 — Batao konsa port use hoga
EXPOSE 5000

# Step 7 — App start karo
CMD ["node", "server.js"]