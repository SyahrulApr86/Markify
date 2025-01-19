# Gunakan image Bun sebagai base
FROM oven/bun:latest

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file proyek ke container
COPY . .

# Install dependensi menggunakan Bun
RUN bun install

# Build aplikasi menggunakan Vite
RUN bun run build

EXPOSE 8080

# Perintah untuk menjalankan aplikasi
CMD ["bun", "run", "dev", "--host"]
