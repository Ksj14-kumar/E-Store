FROM node:16-alpine

WORKDIR /server/

COPY . /server/
ENV URI_DB= \ 
    PORT=5100 \
    NUM_VERIFY_API_KEY= \
    SENDER_MAIL= \
    SENDER_MAIL_PASSWORD= \
    Mobile_Num_for_twilio= \
    TWILIO_SID= \
    TWILIO_TOKEN= \
    BACKEND_DOMAIN=http://localhost:5100 \
    STRIPE_SECRET= \
    UI_URL=http://localhost:5173 \
    STRIPE_END_POINT_SECRET= \
    GOOGLE_CLIENT_ID= \
    GOOGLE_CLIENT_SECRET= 

ADD . /server/

RUN npm install
EXPOSE 5100

CMD ["npm","run","dev"]
