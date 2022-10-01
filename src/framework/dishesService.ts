import { v4 as uuidv4 } from "uuid";
import { addDays, format, startOfWeek, getWeek, addHours, addMinutes } from 'date-fns'

export class DishesService {


  private dishes: IDish[] = [
    {
      id: uuidv4(),
      name: 'Spätzle mit Soß',
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
      name: 'Gaisburger Marsch + Nachtisch',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Mozzarella-Hähnchen in Basilikum-Sahnesauce',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Toskanischer Hähnchen-Auflauf',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Champignon-Kartoffel-Omelette',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Maultaschen-Pilz-Pfanne',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Lachsfilet mit kalter Joghurt-Sauce mit Dill und Kapern',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Gekräutertes Schweinefilet im Speckmantel in Zwetschgensauce',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Kaltes Schweinefilet',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Filettopf',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Kartoffel-Brokkoli-Auflauf',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Bauerntopf',
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
      name: 'Philadelphia-Hähnchen',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Käsespätzle',
      description: '',
      ingredients: [],
      persons: 1
    },
    {
      id: uuidv4(),
      name: 'Saftiger Kürbis-Gnocchi-Auflauf',
      description: '',
      ingredients: [],
      persons: 1
    },
  ]

  private days: IDay[] = []

  createWorkingDaysOfWeek = (startDate: Date): IDay[] => {

    const firstDayOfWeek = startOfWeek(startDate, { locale: undefined, weekStartsOn: 1 });
    const dayNamesOfWeek = Array.from(Array(5)).map((e, i) => format(addDays(firstDayOfWeek, i), 'EEEE'));
    const datesOfWeek = Array.from(Array(5)).map((e, i) => format(addDays(firstDayOfWeek, i), 'dd MMM'));

    let daysObj = dayNamesOfWeek.map((e, i) => ({
      dayName: dayNamesOfWeek[i],
      dayAndMonth: datesOfWeek[i],
      date: addDays(firstDayOfWeek, i),
      dishes: [this.dishes[0], this.dishes[2]]
    })) as IDay[];

    return daysObj;
  }



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

  delete = async (dish: IDish): Promise<void> => {
    this.dishes = this.dishes.filter(d => d.id !== dish.id)
    return Promise.resolve();
  }

  getDishes = async (): Promise<IDish[]> => {
    return Promise.resolve(this.dishes);
  }

  getPlannedDishesOfDay = async (day: IDay): Promise<IPlannedDish[]> => {
    let workingDaysOfWeek = this.createWorkingDaysOfWeek(new Date());

    let dishesOfWeek = workingDaysOfWeek
      .filter(d => d.date.toDateString() === day.date.toDateString())
      .map(d => d.dishes)
      .reduce((a, b) => a.concat(b));

    return Promise.resolve(dishesOfWeek)
    //return Promise.resolve([this.dishes[0]])
  }
  addPlannedDish = async (dish : IDish, day: IDay,  hour: number, minute: number) : Promise<IPlannedDish[]> => {
    day.dishes.push({
      ...dish,
      closing : addMinutes(addHours(day.date, hour), minute)
    } as IPlannedDish);

    return Promise.resolve(day.dishes);
  }


} 