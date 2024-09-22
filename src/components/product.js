
import {useNavigate} from 'react-router-dom';


export default function Product({data, url}) {

    let navigate = useNavigate();

    return (
        <div key={data.id} className="col-md-4">
            <img onClick={()=>{
                navigate(`/detail/${data.id}`)
            }
            } src={url} width="80%" />
            <h4>상품명: {data.title}</h4>
            <p>상품 설명: {data.price}</p>
        </div>
    )
}