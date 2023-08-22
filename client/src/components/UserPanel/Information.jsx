const Information = ({ user }) => {
  return (
    <div>
      <p>Hello {user.name} {user.lastname}.</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  )
}

export default Information;