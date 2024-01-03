FROM denoland/deno:alpine-1.37.0

WORKDIR /app/tests

COPY ../drill-and-practice/deps.js .
COPY ../drill-and-practice/deps.js ../drill-and-practice/


RUN deno cache --unstable deps.js /app/drill-and-practice/deps.js

# Set environment variables
ENV DENO_DIR /deno-dir
ENV DENO_CACHE /deno-dir

# Run Deno tests
CMD ["deno", "test", "--allow-net", "--allow-env", "--allow-read", "app.js", "services/optionService_test.js", "services/questionService_test.js", "services/topicService_test.js", "services/userService_test.js"]