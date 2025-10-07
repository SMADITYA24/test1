FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20-alpine AS final
WORKDIR /app
COPY --from=build /app .
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]