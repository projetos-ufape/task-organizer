FROM node:22
WORKDIR /app
RUN apt-get update && apt-get install -y swi-prolog
CMD ["node", "index.js"]
