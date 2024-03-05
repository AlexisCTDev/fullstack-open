function Header ({ title }) {
  return (
    <header>
      <h2>{title}</h2>
    </header>
  )
}

function Part ({ name, exercises }) {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

function TotalExercises ({ parts }) {
  const totalExercises = parts.reduce(
    (total, currentPart) => total + currentPart.exercises,
    0
  )

  return (
    <p style={{ fontWeight: 'bold' }}>Total of {totalExercises} exercises</p>
  )
}

function Content ({ parts }) {
  return (
    <section>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}

      <TotalExercises parts={parts} />
    </section>
  )
}

export default function Course ({ courses }) {
  return (
    <>
      <section>
        {courses.map((course) => (
          <div key={course.id}>
            <Header title={course.name} />
            <Content parts={course.parts} />
          </div>
        ))}
      </section>
    </>
  )
}
