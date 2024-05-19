## Description

[Nest](https://github.com/nestjs/nest) framework was used as the basis for this project.

## Running the app

The app has been tested with demo mail and there are no mail credentials in the environment. If you want to test sending emails, you should add them to the .env file.

```bash
docker compose up -d
```

## Test
Integration tests were written for the project with mocked sending emails and retrieving currency exchange rate data.
```bash
npm run test
```
