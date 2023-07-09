import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Spinner from "../Layout/Spinner";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState();

  const dummy_data = [
    {
      description: "Delicious pizza with pepperoni and cheese",
      id: 1,
      name: "steak",
      price: "37.27",
    },
    {
      description: "Refreshing salad with mixed greens and vinaigrette",
      id: 2,
      name: "curry",
      price: "40.04",
    },
    {
      description: "Delicious pizza with pepperoni and cheese",
      id: 3,
      name: "pasta",
      price: "41.83",
    },
    {
      description: "Savory steak with mashed potatoes and gravy",
      id: 4,
      name: "sushi",
      price: "39.41",
    },
    {
      description: "Creamy pasta with garlic and parmesan",
      id: 5,
      name: "sushi",
      price: "50.51",
    },
    {
      description: "Mouthwatering burger with bacon and avocado",
      id: 6,
      name: "ice cream",
      price: "28.08",
    },
    {
      description: "Savory steak with mashed potatoes and gravy",
      id: 7,
      name: "pizza",
      price: "50.89",
    },
    {
      description: "Creamy pasta with garlic and parmesan",
      id: 8,
      name: "steak",
      price: "52.86",
    },
    {
      description: "Delicious pizza with pepperoni and cheese",
      id: 9,
      name: "curry",
      price: "37.59",
    },
  ];

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     const response = await fetch(
  //       "https://react-http-5f6a7-default-rtdb.firebaseio.com/meals.json"
  //     );

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }

  //     const responseData = await response.json();

  //     const transferMeals = [];

  //     for (const key in responseData) {
  //       transferMeals.push({
  //         id: key,
  //         name: responseData[key].name,
  //         description: responseData[key].description,
  //         price: responseData[key].price,
  //       });
  //     }

  //     setMeals(transferMeals);
  //     setIsLoading(false);
  //   };

  //   fetchMeals().catch((error) => {
  //     setIsLoading(false);
  //     setHasError(error.message);
  //   });
  // }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return (
      <section className={classes.error}>
        <p>{hasError}</p>
      </section>
    );
  }
  // console.log("dummy_data", dummy_data);
  const mealslist = dummy_data.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealslist}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
