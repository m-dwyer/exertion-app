# exertion-app

An attempt at a social fitness / goal tracker, with the aim to challenge and support each other.

# Usage
## Local usage (no Docker)
Install required dependencies:
```
npm install
```

The project is a monorepo using [Lerna](https://github.com/lerna/lerna), so run the `dev` script to launch the development server and client:
```
npm run dev
```

But first, you'll want a local instance of mongodb to connect to.  You could install this, *or* use the mongo service:
```
docker-compose up mongo
```

## Docker usage - dev
Dev environment is the default override, and exposes mongodb locall for debugging/troubleshooting
```
docker-compose build
docker-compose up
```

## Docker usage - production
Production needs to be explicitly specified:
```
docker-compose -f docker-compose.prod.yml -f docker-compose.yml build
docker-compose -f docker-compose.prod.yml -f docker-compose.yml up
```


# Tests

## Unit
Unit tests in [Jest](https://jestjs.io/).  Run with:
```
npm run test
```

## Integration

Coming soon!
