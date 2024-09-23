import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store/userSlice";
import { chnageCount } from "../store";



export default function Cart() {

    let user = useSelector((state) => { return state.user })

    let stock = useSelector((state) => { return state.stock })

    let product = useSelector((state) => { return state.product })

    let dispatch = useDispatch()

    return (
        <div>
            <h4>장바구니</h4>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        product.map((a, i) => {
                           
                          return  <tr key={i}>
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.count}</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(chnageCount(a.id))
                                    }}>+</button>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </Table>
        </div>
    )
}