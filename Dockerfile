# Gunakan image Node.js sebagai base image
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Build aplikasi
RUN npm run build

# Ekspose port yang akan digunakan
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
