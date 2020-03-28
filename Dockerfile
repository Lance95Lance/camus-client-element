FROM reg-cnsh.cloud.alipay.com/qjxhugcn/node:latest AS BUILDER
WORKDIR /usr/src/app/
COPY .npmrc ./
COPY package.json ./
RUN npm install yarn -g
RUN yarn install
COPY ./ ./
RUN yarn build

FROM reg-cnsh.cloud.alipay.com/library/nginx:latest
WORKDIR /usr/src/app/
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=BUILDER /usr/src/app/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
