FROM public.ecr.aws/lambda/nodejs:16

COPY . .
RUN npm install -g yarn
RUN yarn build
RUN npx prisma generate

CMD ["dist/lambda.handler"]