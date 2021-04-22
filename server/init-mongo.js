db = db.getSiblingDB('exertion')

db.createUser({
  user: 'exertion',
  pwd: 'exertion',
  roles: [{ role: 'readWrite', db: 'exertion' }]
})

db.getCollection('activitytypes').insertOne({
  name: 'Cycling'
})
