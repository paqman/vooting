# vooting
Live voting application

## API
[GET] /poll
Return the current poll and the associated criteria/items
 
[PUT] /vote
```JSON
{
  "idCriteria": number,
  "idItem": number,
  "vote": number
}
```

[POST] /like
```JSON
{
  "idItem": number,
  "like": number
}
```

Add a vote