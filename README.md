# chatfuel-bot-api
API to be called from Chatfuel to help with chatbot tasks

## Deploy using Vercel

Click on the button below to deploy the API using [Vercel](https://vercel.com).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FMarcL%2Fchatfuel-bot-api)

## Usage

### GET /api/verify/email

Make a GET request to the `/api/verify/email` endpoint using the Chatfuel JSON API block. Pass `email` as a query parameter to verify if the email address is valid.

For example, if deployed to your Vercel domain `https://your-project.vercel.app` then make a GET request like this:

```
https://your-project.vercel.app/api/verify/email?email=test@testing.com
```

#### Valid email response

If the email is valid you'll receive the following response.

```json
{
  "set_attributes": {
    "emailValid": true
  }
}
```

This will set a Chatfuel use attribute called `emailValid` and set it to be `true`.

#### Invalid email response: no email

If the email is invalid because no `email` query parameter was provided, you'll receive this response.

```json
{
  "set_attributes": {
    "emailValid": false,
    "error": "No email provided"
  }
}
```

This will set a Chatfuel use attribute called `emailValid` and set it to be `false` and will also set an `error` user attribute with the error message `No email provided`.

#### Invalid email response: invalid domain

If the email is invalid because the email domain does not exist, you'll receive the following response.

```json
{
  "set_attributes": {
    "emailValid": false,
    "error": "Email doesn't have a valid domain: apaihfs.com"
  }
}
```

This will set a Chatfuel use attribute called `emailValid` and set it to be `false` and will also set an `error` user attribute with the error message `Email doesn't have a valid domain: invalid-domain.com`.

#### Invalid email response: valid domain but no MX record

If the email is valid, but no MX record exists, you cannot send email to the email address. For this you'll receive the following response.

```json
{
  "set_attributes": {
    "emailValid": false,
    "error": "Email domain is valid but has no MX record so no email can be delivered: gmail.co.uk"
  }
}
```

This will set a Chatfuel use attribute called `emailValid` and set it to be `false` and will also set an `error` user attribute with the error message `Email domain is valid but has no MX record so no email can be delivered: valid-domain-no-mx-record.com`.
