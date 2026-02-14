module.exports = {
  apps: [
    {
      name: "habitat-service",
      script: "./app.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
        PORT: 5000,
        JWT_SECRET: "habitat1234"
      },
      env_test: {
        NODE_ENV: "test",
        PORT: 5000,
        JWT_SECRET: "habitat1234",
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASSWORD: "sabya@8855",
        DB_NAME: "habitatplush_test",
        TEST: "workingfine",

        ADMIN_BASE_URL: "https://147.79.70.208/admin",
        ADMIN_BASE_URL: "https://test.habitatplush.com/admin",
        JWT_SECRET: "habitat1234",
        REACT_APP_PUBLIC_FRONTEND_URL: "https://test.habitatplush.com",
      },
      env_production: {
	NODE_ENV: "production",
        PORT: 5000,
        JWT_SECRET: "habitat1234"
      }
    }
  ]
};

