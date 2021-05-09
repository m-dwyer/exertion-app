db = db.getSiblingDB('exertion')

db.createUser({
  user: 'exertion',
  pwd: 'mysecretpass',
  roles: [{ role: 'readWrite', db: 'exertion' }]
})

db.getCollection('activitytypes').insertOne({
  name: 'Cycling'
})
