import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom"
import { Nav } from "react-bootstrap";

export default function Detail(props) {

  // html 랜더링이 끝난 후 실행

  let [visibility, setVisibility] = useState(true);

  let [tab, setTab] = useState(0);

  let [detailFade, setDetailFade] = useState('');

  useEffect(() => {

    // 유즈임팩트 실행전에 실행할 수 있는 함수
    // return ()=>{

    // }

    setTimeout(() => {
      setVisibility(false)
    }, 2000);
  }, [])

  useEffect(()=>{
    setDetailFade('end');
  }, [detailFade])

  let { id } = useParams();
  let 찾은상품 = props.data.find(function (x) {
    return x.id == id
  });

  

  return (
    <div className={`start ${detailFade}`}>
      {
        visibility ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null
      }
      <div className="detail-box">


        <div style={{
          'width': '100%'
        }}>
          <img src={`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`} width="80%" />
        </div>

        <div style={{
          'width': '100%'
        }}>
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
      <Nav.Item>
        <Nav.Link eventKey="link0" onClick={()=>{
          setTab(0);
        }}>버튼0</Nav.Link>
      </Nav.Item>
      <Nav.Item >
        <Nav.Link eventKey="link1" onClick={()=>{
          setTab(1);
        }}>버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link2" onClick={()=>{
          setTab(2);
        }}>버튼2</Nav.Link>
      </Nav.Item>
    </Nav>

    <TabContent tab={tab}/>
    </div>

  )

  function TabContent({tab}){
    console.log(tab)

    let [fade, setFade] = useState('');

    useEffect(()=>{

     let a = setTimeout(()=>{
        setFade('end');
      }, 100)
      
      return ()=>{
        clearTimeout(a)
        setFade('')
      }
    }, [tab])
    return (
      <div className={`start ${fade}`}>
      {
        [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]
      }
    </div>
    )
  }
}