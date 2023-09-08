import style from './styles/Pagination.module.css';

const Pagination = ({ products, paginated, currentPage }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(products / 10); i++) {
    pages.push(i);
  }
  return (
    <nav className={style.container}>
      <ul>
        <button className={style.back} onClick={() => paginated(currentPage - 1)} disabled={currentPage === 1}>«</button>
        {
          pages.map(page => {
            return (
              <button className={style.buttons} key={page} onClick={() => paginated(page)}>{page}</button>
            )
          })
        }
        <button className={style.next} onClick={() => paginated(currentPage +1)} disabled={currentPage === 8}>»</button>

      </ul>
    </nav>
  )
}

export default Pagination;