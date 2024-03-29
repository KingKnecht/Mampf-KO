interface IDish  {
  id: string | undefined
  name: string,
  description : string
  ingredients : IIngredient[],
  persons : number
}

interface IPlannedDish extends IDish {
  planningId : string,
  closing : Date
}



