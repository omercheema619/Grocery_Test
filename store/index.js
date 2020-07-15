export const state =()=>({

//state
cart:[],
cartLength:0,
deliveryDate:"Delivery date is 10th May"


})

export const getters = {
    countInCart(state){
    //     console.log("Count in Cart: ");
        
    //     console.log(state.cart);
    //     state.cart.forEach(product => 
    //         {
    //         console.log(product[0].quantity);
    //         console.log(product[0].title);
    //         })
            return state.cart;    
    },
    getCart(state){
        console.log("In get Cart: "+state.cart);
        console.log(state.cart);
        // console.log(state.cart[0].quantity);
        
        return state.cart;
    },
    getCartLength(state){
        console.log("GetCartLength: ");
        console.log(state.cartLength);
        
        return state.cartLength;
    },
    getCartTotalPrice(state){
        let total = 0;
        state.cart.map(product=>{
            console.log(product[0].unitPrice);
            console.log(product[0].quantity);
            if(product[0].isOnSale){

                total+=product[0].salePrice * product[0].quantity;
            }else{

                total+=product[0].unitPrice * product[0].quantity;
            }
            
        })
        // console.log("Cart total Quantity: "+product[0].quantity);
        console.log("getCart total Price: ");
        console.log(total);
        var subTotalFormatted=parseFloat(total).toFixed(2);
        // return Math.round(total,2);
        return subTotalFormatted;
    },
    getEstimatedDelivery(state){
        return state.deliveryDate;
    },

    isAuthenticated(state) {
        return state.auth.loggedIn
       },
    loggedInUser(state) {
    return state.auth.user
    }
}

export const actions ={
    countInCart({state},product){
        console.log("I am in count cart");
        // console.log(state.cart);
        
        state.cart.forEach(product1 => 
            {
                // console.log(product1[0].quantity);
                // console.log(product1[0].title);
                if(product1[0]._id === product._id){
                    console.log("Found the match: "+ product1[0].title);
                    console.log("Found the match: "+ product1[0].quantity);
                    
                    return product1[0].quantity;
                }
                // console.log(product1[0]._id);
                // console.log(product._id);
                    })
        // return state.cart;
        
    },
    addProductToCart({state,commit},product){
        console.log("In AddProduct to Cart ");
        
        // const cartProduct = state.cart.find(function(prod) {
        //     console.log("Prod_id ="+JSON.stringify(prod[0]._id) + " && Product_id = "+ JSON.stringify(product[0]._id));
        //     return    prod[0]._id === product[0]._id
        // })
        console.log(product);
        console.log(product._id);
        
        const cartProduct = state.cart.find(prod => prod[0]._id === product[0]._id)
        console.log("Cart in add product to cart: ");
                
        console.log(state.cart);
        
        if(!cartProduct){
            commit('pushProductToCart',product)
        }else{
            commit('incrementProductQty',cartProduct)
        }

        commit('incrementCartLength')
    },
    addProductToCart1({state,commit},product){
        console.log("In AddProduct to Cart second function:");
        
        // const cartProduct = state.cart.find(function(prod) {
        //     console.log("Prod_id ="+JSON.stringify(prod[0]._id) + " && Product_id = "+ JSON.stringify(product[0]._id));
        //     return    prod[0]._id === product[0]._id
        // })
       
        let product1 = [] 
        product1.push(product);
        console.log(product1);
        // console.log(product1[0]._id);
        
        const cartProduct = state.cart.find(prod => prod[0]._id === product1[0]._id)
        console.log("Cart in add product to cart: ");
                
        console.log(state.cart);
        
        if(!cartProduct){
            commit('pushProductToCart',product1)
        }else{
            commit('incrementProductQty',cartProduct)
        }

        commit('incrementCartLength')
    }            
}

export const mutations = {
    pushProductToCart(state, product){
        product[0].quantity = 1;
        state.cart.push(product);
        
        console.log("Printing product:");
        console.log(product[0]);
        console.log("Printing Cart: ");
        console.log(state.cart);
        
    },
    incrementProductQty(state,product){
        product[0].quantity ++;
        console.log("Product Quantity in increment product: "+product[0].quantity);
        let indexOfProduct = state.cart.indexOf(product);
        //update the index with the product which has quantity revised
        state.cart.splice(indexOfProduct,1,product);
        console.log("*******  increment Product Quantity *******");
        
        console.log(state.cart);
        // console.log(state.cart[0]);
        // console.log(state.cart[0].quantity);
        // console.log(state.cart[1]);
        console.log(product[0].quantity);
        console.log(state.cartLength);
    },
    incrementCartLength(state){
        state.cartLength = 0;
        if(state.cart.length > 0){
            state.cart.map(product => {
                // console.log("In increment Cart: ");
                // console.log(product);
                
                state.cartLength += product[0].quantity;
            })
        }
        console.log("Cartlength is : "+state.cartLength);
    },
    //1- find product in the cart 
    //2- and change quantity
    //3- Update the length of the cart
    //4- Replace the old product with the updated product
    changeQuantity(state,{product,qty}){
        //1
        let cartProduct = state.cart.find(prod => prod[0]._id === product[0]._id);
        console.log("changing Cart product: ");
        
        console.log(cartProduct);
        
        cartProduct[0].quantity=qty;
        console.log("Printing cart quantity:");
        console.log(cartProduct.quantity);
        

        //2
        state.cartLength= 0;
        if(state.cart.length > 0){
            state.cart.map(product =>{
                state.cartLength += product[0].quantity;
            })
            console.log("Cart length in increment cart length : "+state.cartLength);
        }
        //3
        let indexOfProduct = state.cart.indexOf(cartProduct);
        state.cart.splice(indexOfProduct,1,cartProduct);
    },
    logOutUser(state){
        console.log("I am in logout User - STATE");
        
    },
    /*
    1- Remove product quantity from cartLength
    2- get the index of product we want to delete
    3- Remove that product using splice

    */
    removeProduct(state, product){
        state.cartLength -=product[0].quantity;
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct,1);
    },
    clearCart(state){
        state.cart= []
        state.cartLength= 0
        state.deliveryDate= 'Reset'
    }
    
}
