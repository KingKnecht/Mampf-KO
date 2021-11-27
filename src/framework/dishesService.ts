export class DishesService {


  private dishes: IDish[] = [
    {
      id: undefined,
      name: 'Spätzle mit Soß',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
      persons: 1,
      ingredients: [{
        id: undefined,
        name: "Spätzle",
        amount: 250,
        unit: 'gr'
      },
      {
        id: undefined,
        name: "Bratensoße",
        amount: 100,
        unit: 'ml'
      }
    ]
    },
    {
      id: undefined,
      name: 'xxx',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
      ingredients : [],
      persons : 1
    }
  ]

  add = async (dish: IDish): Promise<void> => {
    this.dishes.push(dish);
    return Promise.resolve();
  }

  getDishes = async (): Promise<IDish[]> => {
    return Promise.resolve(this.dishes);
  }

}