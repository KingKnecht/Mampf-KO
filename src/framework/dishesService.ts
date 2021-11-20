export class DishesService {
  
  
  private dishes: IDish[] = [
    {
      id: "1",
      name: 'Spätzle mit Soß',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua'
    },
    {
      id: "2",
      name: 'xxx',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua'
    }
  ]

  add = async(dish : IDish) : Promise<void> => {
    this.dishes.push(dish);
    return Promise.resolve();
  }
  
  getDishes = async() : Promise<IDish[]> => {
    return Promise.resolve(this.dishes);
  }
  
}