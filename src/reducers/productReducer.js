import { types } from "./types";

export const initialProductState = {
  products: [
    {
      id: 1,
      title: "Product 1",
    },
    {
      id: 2,
      title: "Product 2",
    },
  ],

  cart: [
    {
      id: 1,
      title: "Product 1",
      quantity: 1,
    },
  ],

  activeProduct: {
    id: 2,
    title: "Product 1",
  },
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case types.productShow:
      return {
        ...state,
        activeProduct: action.payload,
      };

    case types.productAddToCart: {
      const newProduct = action.payload;
      const cartContainProduct = state.cart.find(
        (product) => product.id === newProduct.id
      );

      return cartContainProduct
        ? {
            ...state,
            cart: state.cart.map((product) =>
              product.id === newProduct.id
                ? { ...product, quantity: product.quantity + 1 }
                : product
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };
    }

    case types.productRemoveFromCart:
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload),
      };

    case types.productRemoveOneFromCart: {
      const productDelete = state.cart.find(
        (product) => product.id === action.payload
      );

      return productDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((product) =>
              product.id === action.payload
                ? { ...product, quantity: product.quantity - 1 }
                : product
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((product) => product.id !== action.payload),
          };
    }
    default:
      return state;
  }
};

/*

case types.productShow:
      return {
        ...state, ----> solo nos interesa modificar activeProduct para cambiar el titulo, por eso copiamos el state.
        activeProduct: action.payload,
      };


case types.productAddToCart:
      return {
        ...state, --> copiamos el actual state con toda la info adentro, nos interesa modificar solo cart porque vamos a agregar un nuevo producto dentro de la lista
        cart: [...state.cart, action.payload], ---> como cart es parte del objecto state, solo copiamos la info que tiene adentro con state.cart y le agregamos el action.payload que es el que trae el nuevo producto
      };

case types.productRemoveFromCart:
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload), ---> retorna todos los productos con id diferente al action.payload que es el producto que querems eliminar
      };


      Mejorando add product

       case types.productAddToCart: {

        Englobamos todo en llaves nueevamente para desarrollar la logica

      const newProduct = action.payload; --> aqui estamos pasado el producto
      const cartContainProduct = state.cart.find(
        (product) => product.id === newProduct.id
      ); ---> con "find" buscamos el id del product si existe entonces:

      return cartContainProduct
        ? 
        // Si existe, entonces copia el state, pero modifica cart, en cart vamos a usar map loop,
        y vas a comparar producto con product, si el id es el mismo con el de la referencia newProduct.id
        entonces como es un objecto vas a copiar el valor de ese objecto pero a quantity vas a incrementarle + 1 , porque el objeto ya estaba dentro de la lista de cart
        {
            ...state,
            cart: state.cart.map((product) =>
              product.id === newProduct.id
                ? { ...product, quantity: product.quantity + 1 }
                : product
            ),
          }
        : 
        // Si no existe, regresa entonces regresa el mismo state, pero en cart , haz la copia y agrega el nuevo product, a ese nuevo product que es un objecto y tiene el value: quantity, asignale valor de 1 porque no existia
        {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };
    }

    // Product remove one from cart:


     case types.productRemoveFromCart:
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload),
      };

      // Remove one product from cart list , and if the quantity is 1 remove the element.

    case types.productRemoveOneFromCart: {
      const productDelete = state.cart.find(
        (product) => product.id === action.payload
      ); ---> Buscando el producto dentro de cart que sea igual al action.payload que tiene el id.

      // Si tenemos un producto con una cantidad mayor a 1 entonces:
      return productDelete.quantity > 1
        ? 
        // copia el state original, nos vamos a cart object y hacemos un map, buscamos el producto que matchs con el id , si lo encuentra copia el product pero disminuye en 1 la cantidad
        {
            ...state,
            cart: state.cart.map((product) =>
              product.id === action.payload
                ? { ...product, quantity: product.quantity - 1 }
                : product
            ),
          }
        : 
        // Si el producto tiene una quantity < 1 entonces, eliminalo de la lista, con un filter y retorna la copia del state con los productos del cart que son diferentes. 
        {
            ...state,
            cart: state.cart.filter((product) => product.id !== action.payload),
          };
    }

*/
