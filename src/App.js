import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import data from './data.js';
import { createContext, useState } from 'react';
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
            <div className='main-bg'></div>
            <div className="container">
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


