const Pagination = ({ products, paginated }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(products / 10); i++) {
    pages.push(i);
  }
  return (
    <nav>
      <ul>
        {
          pages.map(page => {
            return (
              <button key={page} onClick={() => paginated(page)}>{page}</button>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default Pagination;