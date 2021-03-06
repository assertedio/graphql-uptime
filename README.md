# graphql-uptime
Local example GraphQL API uptime test with Asserted

![asserted.io](https://raw.githubusercontent.com/assertedio/graphql-uptime/master/images/logo.png)

[Test in Prod](https://asserted.io)

## Walkthough

This example is referenced in a walkthrough about [GraphQL Health Checks and Uptime](https://asserted.io/posts/graphql-health-check-uptime)

## Try it out

```bash
# Clone example
git clone https://github.com/assertedio/graphql-uptime

# Enter directory and install
cd graphql-uptime/
npm install

# Run asserted tests
npm run test:asrtd
```

## Add to your own project
In order to create your own tests in your own repo, you should [create an account](https://app.asserted.io) and follow the quick onboarding.

## Learn more
- [General Documentation](https://docs.asserted.io)
- [asrtd CLI tool](https://github.com/assertedio/asrtd)

## Notes

- Typically the `asrtd` command line tool is installed globally with `npm i -g asrtd`.
- All code related to running the tests for Asserted should be in the `.asserted` directory. 
