FROM node:14.16.0
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "/usr/src/app/"]
RUN npm --verbose install
COPY . /usr/src/app/
EXPOSE 3000
CMD ["npm", "start"]