import { v4 as uuidv4 } from "uuid";

export class DishesService {


  private dishes: IDish[] = [
    {
      id: uuidv4(),
      name: 'Spätzle mit Soße',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
      persons: 1,
      ingredients: [{
        id: uuidv4(),
        name: "Spätzle",
        amount: 250,
        unit: 'gr'
      },
      {
        id: uuidv4(),
        name: "Bratensoße",
        amount: 100,
        unit: 'ml'
      }
      ]
    },
    {
      id: uuidv4(),
      name: 'xxx',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'yyy',
      description: '',
      ingredients: [],
      persons: 1
    },
  ]

  add = async (dish: IDish): Promise<void> => {
    dish.id = uuidv4();

    //give Id to all ingredients
    dish.ingredients = dish.ingredients.map(i => {
      if (i.id === undefined)
        return {
          ...i,
          id: uuidv4()
        };
      else
        return i;
    });

    this.dishes.push(dish);
    return Promise.resolve();
  }

  update = async (dish: IDish): Promise<void> => {

    //give Id to all ingredients
    dish.ingredients = dish.ingredients.map(i => {
      if (i.id === undefined)
        return {
          ...i,
          id: uuidv4()
        };
      else
        return i;
    });

    this.dishes = this.dishes.map(d => d.id == dish.id ? dish : d);
    return Promise.resolve();
  }

  delete = async (dish: IDish) :  Promise<void>=> {
    this.dishes = this.dishes.filter(d => d.id !== dish.id)
    return Promise.resolve();
  }

  getDishes = async (): Promise<IDish[]> => {
    return Promise.resolve(this.dishes);
  }

}