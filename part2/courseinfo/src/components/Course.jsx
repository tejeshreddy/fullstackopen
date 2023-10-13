import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {
  const total = course.parts.reduce(
    (accumulator, currentVal) => accumulator + currentVal.exercises,
    0
  );
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  );
};

export default Course;
