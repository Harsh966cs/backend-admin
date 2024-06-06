db.MyCollection.find({ "publishedAt": {
    "$gte": new Date('2024-06-04'), "$lt": new Date('2024-06-04')
}})
