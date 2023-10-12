const Total = (props) => {
  console.log(props);
  let sum = 0;
  for (const part of props.parts) {
    sum += part.exercises;
  }

  return <p>Number of exercises {sum}</p>;
};

export default Total;
