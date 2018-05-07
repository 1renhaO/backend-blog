FROM node
COPY ./* /backend-blog/
RUN npm i yarn --global \
    && yarn global add pm2 \
    && pm2 install pm2-intercom \
    && cd /backend-blog \
    && yarn \
    && yarn start
