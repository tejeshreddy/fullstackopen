const Part = (props) => {
  return (
    <p key={props.name}>
      {props.name} {props.exercises}
    </p>
  );
};

export default Part;
