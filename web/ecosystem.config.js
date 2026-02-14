module.exports = {
  apps: [
    {
      name: "habitplus-web-test",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env_test: {
        NODE_ENV: "test",
        PORT: 3000,
        JWT_SECRET: "habitat1234",
        NEXT_PUBLIC_BASE_URL: "https://test.habitatplush.com/",
        NEXT_PUBLIC_API_URL: "https://test.habitatplush.com/api",
        NEXT_PUBLIC_FRONTEND_URL: "https://test.habitatplush.com",
        NEXT_PUBLIC_ENVIRONMENT: "test",
        TEST: "workingfine"
        // add any other variables from .env.test
      }
    }
  ]
};
