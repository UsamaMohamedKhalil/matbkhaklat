import React, { useEffect, useState } from 'react'
import {BsGridFill} from 'react-icons/bs'
import { FaListAlt } from 'react-icons/fa';
import ProductItem from '../productItem/ProductItem'
import Search from '../../search/Search';
import styles from './ProductList.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, selectFilteredProducts ,SORT_PRODUCTS } from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';

const ProductList = ( { products } ) => {
  const [grid,setGrid] = useState(true);
  const [search,setSearch] = useState('');
  const [sort,setSort] = useState('latest');
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  //pagination state
  const [currentPage,setCurrentPage] = useState(1);
  const [productsPerPage,setProductsPerPage] = useState(9);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct =  indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct);

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({
      products,
      search
    }));
  },[dispatch,products, search])

  useEffect(()=>{
    dispatch(SORT_PRODUCTS({
      products,
      sort
    }));
  },[dispatch,products, sort])


  return (
    <div className={styles['product-list']} id='product'>
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsGridFill size={22} color='orangered' onClick={()=>{
            setGrid(true);
          }}/>
          <FaListAlt size={24} color='#0066d4' onClick={()=>{
            setGrid(false);
          }}/>
          <p>
            <b>{filteredProducts.length}</b> طلبات
          </p>
        </div>
        {/*SearchIcon */}
        <div>
          <Search value={search} onChange={(e)=>setSearch(e.target.value) }/>
        </div>
        {/*Sort Product */}
        <div className={styles.sort}>
          <label>الترتيب:</label>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value='latest'>اخر الطلبات</option>
            <option value='lowest-price'>أقل سعراً</option>
            <option value='highest-price'>أعلي سعراً</option>
            <option value='a-z'>أ - ي</option>
            <option value='z-a'>ي - أ</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
          {
            products.length  === 0 ? (
              <p>No Product Found</p>
            ) : (
              <>
                {
                  currentProducts.map((product) => {
                    return (
                      <div key={product.id}>
                        <ProductItem {...product} grid={grid}
                        product={product}/>
                      </div>
                    )
                  })
                }
              </>
            )
          }
      </div>
      <Pagination 
        productsPerPage={productsPerPage} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  )
}

export default ProductList
