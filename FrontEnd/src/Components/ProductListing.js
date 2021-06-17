import {postData} from '../FetchingApi/fetchApi.js'
import {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Toast} from "../Toast/toast"
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faFilter} from '@fortawesome/free-solid-svg-icons'



function ProductListing(){
  const { GetProductData , filteredData , dispatch } = useProduct();
  const [ft,setft] = useState(false);

  const userId = localStorage.getItem('userId');
  let navigate = useNavigate();

  useEffect( ()=>{
    GetProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userId]);

 
  
  async function AddToCartHandler(item){

    if(userId !== null ){
      const body = {
        name: item.name,
        productModel: item.productModel,
        productUrl: item.productUrl,
        productId:item._id,
        customerId: userId,
        inStock: item.inStock,
        fastDelivery: item.fastDelivery,
        productdescription: item.productdescription,
        image: item.image,
        price: item.price,
        }
        let response = await postData(body,'/carts');
        if(response.available === true)
        {
          toast.info(response.message);
        }
    }else{
      navigate("/login");

    }
    
      
  }
  
   async function AddToWishilstHandler(item){
const body =  {
  name: item.name,
  productModel: item.productModel,
  productUrl: item.productUrl,
  productId:item._id,
  customerId: userId,
  inStock: item.inStock,
  fastDelivery: item.fastDelivery,
  productdescription: item.productdescription,
  image: item.image,
  price: item.price,
  }
  let response = await postData(body,'/wishlists');
  console.log("under wishlist");
  console.log(response);
  if(response.available === true)
      {
        toast.info(response.message);
      }
  

  }
  

    return(
     <div style={{backgroundColor:'whitesmoke'}}>
      <div>
 <button onClick={()=>setft(!ft)} className="btn" style={{backgroundColor:'rgb(255,214,36)'}}>Show Filters</button>
 {ft &&  <div className="FilterFrame">
<div className="filterBox">
<div>
<input onClick={()=>dispatch({type:"TOGGLE_INVENTORY"})}  type="checkbox" />
<h4>InStock </h4>
</div>
<div>
<input onClick={()=>dispatch({type:"TOGGLE_DELIVERY"})} type="checkbox" />
<h4>fast-Delivery</h4>
</div>
 </div>  



 <div className="filterBox">
<div>
<input onClick={()=>dispatch({type:"SORT",payload:"PRICE_LOW_TO_HIGH"})} type="radio" name="sort" />
<h4>Price Low To High</h4>
</div>
<div>
<input onClick={()=>dispatch({type:"SORT",payload:"PRICE_HIGH_TO_LOW"})} type="radio" name="sort" />
<h4>Price Hight To Low</h4>
</div>


  
 </div> 




</div>
}
      {
        filteredData.length!==0?
          <div className="productbox">
        {filteredData.map(function(item){
          return (
            <div key={item.id} className="productItem">
              {item.inStock && <div className="bestseller"></div>}
              <img src={item.image} alt="Itemimage" height="300px" width="100%"/>
              <div className="name-like-section">
                <div style={{display:'flex',flexDirection:'column'}}>
                  <span style={{fontWeight:'1000'}}>{item.name}</span>
                  <span style={{fontSize:'12px'}}>by Amazon Brand - Solimo</span>
                  </div>
                <span onClick={()=>AddToWishilstHandler(item)}><FontAwesomeIcon icon={faHeart}  color="black" aria-hidden='true' /></span>
              </div>
              <span className="margin" style={{fontSize:'13px',color:'green',fontWeight:'bolder'}}>16,710 Reviews</span>
              <span className="margin" style={{fontSize:'15px',fontWeight:'700'}}>₹ {item.price}.00</span>
              <span className="margin" style={{fontSize:'13px',color:`${item.inStock ?'green':'red'}`,fontWeight:'bolder'}}>{ item.inStock ? "InStock":"Out of Stock"}</span>
              <div className="margin" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <span style={{marginTop:'0.2rem',fontWeight:'500'}}>
                 {
                   item.fastDelivery && "Fast Delivery Available"
                 }
                </span>
                <span>
                <button onClick={()=>AddToCartHandler(item)} className="btn">Add To Cart</button>
                </span>
              </div>
            </div>
          );
        })}
        </div>
        :<div className="loader" > </div>
      }
      </div>
      { Toast() }
 
     </div>
     
      );
    }
    

export default ProductListing;

