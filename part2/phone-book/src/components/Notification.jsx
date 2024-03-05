export default function notification({ notification }) {
  if (notification === null) return

  return (
    <section className={`notification ${notification.type}`}>
      <p>{notification.message}</p>
    </section>
  )
}
