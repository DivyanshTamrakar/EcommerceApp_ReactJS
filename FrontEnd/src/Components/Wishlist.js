import { useWishlist  } from "../context/wishlist-context";

function Wishlist(){
  const {WishItemInCart,setWishItemInCart} = useWishlist();
    console.log(WishItemInCart)
    const isuserLogin = localStorage.getItem('userId');


    return(

    WishItemInCart.length!==0 ?
      <div>
        <div><h1>Your WishliSt {WishItemInCart.length}</h1></div>  
        <div className="productbox">
      {WishItemInCart.map(function(item){
        return (
          <div key={item.id} className="productItem">
            <img className="corner-radius" src={item.image} height="200px" width="212px"/>
            <div className="namelike">
              <span style={{fontWeight:"bolder"}}>{item.name}</span>
              <span onClick={()=>setWishItemInCart((item)=>item+1)}><i class="fa fa-heart"></i></span>
            </div>
            <span>{item.description}</span>
            <span> Rs.{item.price}</span>
         <div className="button-group">
              
         <button className="btn">Move to Cart</button>
         </div>
          </div>
        );
      })}
      </div>
      </div>
    
    :
    <div style={{marginTop:"10rem"}}>
<span style={{fontSize:"3rem",fontWeight:"bolder"}}>
Your Wishlist  is Empty 
</span>

    </div>
    );



    }
export default Wishlist;    
