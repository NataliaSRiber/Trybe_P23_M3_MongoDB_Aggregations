db.movies.aggregate([
  {
    $match: {
      $and: [
        { languages: "English" },
        { cast: { $exists: true } },
      ],
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
]);
