import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { createContext, useEffect, useState } from 'react';
import Product from './components/product.js';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail.js';
import axios from 'axios';
import Cart from './pages/Cart.js';

export let Context1 = createContext()

function App() {

  let [shoes, setShoes] = useState(data);

  let navigate = useNavigate();

  let [moreCount, setMoreCount] = useState(2);

  let [재고] = useState([10, 11, 12]);

  let [watchedItems, setWatcedItems] = useState([]);

  


  useEffect(() => {
    const data = localStorage.getItem('watched')
    if (data) {
      const watchedIds = JSON.parse(data);
      const foundItems = shoes.filter(shoe => watchedIds.includes(shoe.id));

      const watchedTitles = foundItems.map(item => item.title);
      console.log(watchedTitles)

      setWatcedItems(watchedTitles)
    } else{
      localStorage.setItem('watched', JSON.stringify([]))
    }
  },[])

  return (
    <div className="App">

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {
              navigate('/')
              
            }

            }>Home</Nav.Link>
            <Nav.Link onClick={() => {
              navigate('/detail')
            }}>Detail</Nav.Link>

            <Nav.Link onClick={() => {
              navigate('/cart')
            }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-top'>
              <div className='main-bg position-absolute'></div>
              <div className='main-top-watched'>
                <div className='watched-box-title'>최근 본 상품</div>
                <div className='watched-box-content'>
                  {watchedItems && watchedItems.length > 0 ? (
                    watchedItems.map((item, i) => {
                      return <div key={i} className='watched-item'>
                        {item}
                      </div>
                    })
                  ) : (
                    <div>최근 본 상품이 없습니다.</div>
                  )}

                </div>
              </div>
            </div>
            <div className="container mt-5">
              <div className="row">
                {
                  shoes.map((v, i) => {
                    return <Product key={i} data={v} url={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`} />
                  })
                }
              </div>
              <button onClick={() => {

                console.log(moreCount)

                if (moreCount < 4) {
                  axios.get(`https://codingapple1.github.io/shop/data${moreCount}.json`)
                    .then((res) => {
                      console.log(res.data)

                      let shoesCopy = shoes.slice()

                      shoesCopy.push(...res.data)

                      setShoes(shoesCopy);

                      // Promise.all([ axios.get(), axios.get()])
                      // .then(()=>{})

                    })
                    .catch((error) => {
                      console.log(`fail ${error}`)
                    })

                  setMoreCount(moreCount + 1)
                } else {
                  alert('더 이상 상품이 없습니다.')
                }


              }
              }>더보기</button>
            </div></>
        } />
        <Route path='/detail/:id' element={

          <Context1.Provider value={{ 재고, shoes }}>
            <Detail data={shoes} />
          </Context1.Provider>




        }
        />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<div>없는페이지입니다.</div>} />
      </Routes>



    </div>
  );
}



export default App;


