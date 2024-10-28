import TrackProgress from "./TrackProgress";
function ToodayUserMacros(props) {
  const { uiCalories } = props;

  return (
    <>
      <h1>SAL {uiCalories !== 0 ? "da" : "nu"}</h1>

      {uiCalories !== 0 ? (
        <div>
          <h2>Calories: {uiCalories.calories}</h2>
          <h2>Protein: {uiCalories.protein}g</h2>
          <h2>Carbs: {uiCalories.carbs}g</h2>
          <h2>Fat: {uiCalories.fat}g</h2>
        </div>
      ) : (
        <h2>nu</h2>
      )}
      {uiCalories !== 0 && (
        <TrackProgress
          uiCalories={uiCalories.calories}
          uiProtein={uiCalories.protein}
          uiCarbs={uiCalories.carbs}
          uiFat={uiCalories.fat}
        />
      )}
    </>
  );
}

export default ToodayUserMacros;
