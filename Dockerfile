FROM node
COPY ./* /backend-blog/
RUN npm i yarn --global \
    && yarn global add pm2 \
    && cd /backend-blog \
    && yarn \
    && yarn start
