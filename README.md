# vooting
Live voting application

## API
``[GET] /poll``

Return the current poll and the associated criteria/items

- Response
```JSON
{
  "poll": {
    "idPoll": "integer",
    "name": "string",
    "creationDate": "datetime",
    "isActive": "boolean",
    "alias": "string"
  },
  "items": [
    {
      "idItem": "number",
      "name": "string",
      "picture": "string",
      "author": "string",
      "idPoll": "number"
    }
  ],
  "criterias": [
    {
      "idCriteria": "number",
      "name": "string",
      "idPoll": "number"
    }
  ]
}
```


``[POST] /vote``

Add a vote

- Request

```JSON
{
  "idCriteria": number,
  "idItem": number,
  "vote": number
}
```

``[POST] /like``
- Request

```JSON
{
  "idItem": number,
  "like": number
}
```

Add a vote