let url = (id) =>
`
{
  stop(id: "HSL:${id}") {     
    name
      stoptimesWithoutPatterns {
      trip {
        route {
          gtfsId
          longName
          shortName
        }
      }
      scheduledArrival
      realtimeArrival
    }
  }
}
`