import { v4 as uuidv4 } from "uuid";
import { addDays, format, startOfWeek, getWeek, addHours, addMinutes, setDay, setMonth, setHours, setMinutes, endOfDay } from 'date-fns'
import axios, { AxiosError } from 'axios'

type AddDishResponse = {
  data: IDish
}

type DeleteDishResponse = {
  
}

type GetDishesResponse = {
  results: IDish[],
  page: number,
  limit: number,
  totalPages: number,
  totalResults: number
};

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

    this.days = dayNamesOfWeek.map((e, i) => ({
      dayName: dayNamesOfWeek[i],
      dayAndMonth: datesOfWeek[i],
      date: addDays(firstDayOfWeek, i),
      dishes: []
    })) as IDay[];

    return this.days;
  }

  add = async (dish: IDish): Promise<IDish> => {
    // 👇️ const data: AddDishesResponse
    return axios.post<AddDishResponse>(
      '/dishes',
      dish,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    ).then(resp => {
      console.log(JSON.stringify(resp, null, 4));
      // 👇️ "response status is: 200"
      console.log('response status is: ', resp.status);
      return resp.data.data;
    }).catch((err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        console.log('error message: ', err.message);
        throw err.message;
      } else {
        console.log('unexpected error: ', err);
        throw err;
      }
    });
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

  // delete = async (dish: IDish): Promise<void> => {
  //   this.dishes = this.dishes.filter(d => d.id !== dish.id)
  //   return Promise.resolve();
  // }

  delete = async (dish: IDish): Promise<void> => {
    // 👇️ const data: AddDishesResponse
    return axios.delete<DeleteDishResponse>(
      '/dishes?id=' + dish.id
    ).then(resp => {
      console.log(JSON.stringify(resp, null, 4));
      // 👇️ "response status is: 200"
      console.log('response status is: ', resp.status);
    }).catch((err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        console.log('error message: ', err.message);
        throw err.message;
      } else {
        console.log('unexpected error: ', err);
        throw err;
      }
    });
  }


  getDishes = async (): Promise<IDish[]> => {
    // 👇️ const data: GetUsersResponse
    return await axios.get<GetDishesResponse>(
      '/dishes',
      {
        headers: {
          Accept: 'application/json',
        },
        params: {
          sortBy: 'name:asc',
          limit: 200,
          page: 1
        }
        ,
      },
    ).then(resp => {

      console.log(JSON.stringify(resp.data, null, 4));
      // 👇️ "response status is: 200"
      console.log('response status is: ', resp.status);

      return resp.data.results;
    }).catch((err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        console.log('error message: ', err.message);
        throw err.message;
      } else {
        // Just a stock error
        console.log('unexpected error: ', err);
        throw err;
      }
    });

  }


  getPlannedDishesOfDay = async (day: IDay): Promise<IPlannedDish[]> => {
    let workingDaysOfWeek = this.createWorkingDaysOfWeek(new Date());

    let dishesOfWeek = workingDaysOfWeek
      .filter(d => d.date.toISOString() === day.date.toISOString())
      .map(d => d.dishes)
      .reduce((a, b) => a.concat(b), []);

    return Promise.resolve(dishesOfWeek)

  }

  addPlannedDish = async (dish: IDish, day: IDay, closingHour: number, closingMinute: number, closingYear: number, closingMonth: number, closingDay: number): Promise<IPlannedDish[]> => {

    let foundDay = this.days.find(d => d.date.toISOString() === day.date.toISOString());
    if (foundDay !== undefined) {

      //Todo: do something clever with the year
      let closingDate = new Date(closingYear, closingMonth, closingDay)
      closingDate = setHours(closingDate, closingHour);
      closingDate = setMinutes(closingDate, closingMinute);

      if (closingDate < new Date()) throw new Error("Closing date must not be less than current date");
      let x = new Date(endOfDay(day.date))
      if (closingDate > new Date(endOfDay(day.date))) throw new Error("Closing date must not be greater than date of planning day");

      foundDay.dishes.push({
        ...dish,
        planningId: uuidv4(),
        closing: closingDate
      } as IPlannedDish);

      return Promise.resolve(foundDay.dishes);
    }

    throw "This should not happen.";
  }

  deletePlannedDish = async (dish: IPlannedDish, day: IDay): Promise<IPlannedDish[]> => {
    let foundDay = this.days.find(d => d.date.toISOString() === day.date.toISOString());

    if (foundDay !== undefined) {

      foundDay.dishes = foundDay?.dishes.filter(d => d.planningId !== dish.planningId);

      return Promise.resolve(foundDay?.dishes);
    }

    throw "This should not happen.";
  }


} 