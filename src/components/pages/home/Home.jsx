import { useContext, useEffect, useState } from "react";
import Categories from "./catigory/Categories";
import Product from "./product/Product";
import styles from './home.module.scss'
import { AppContext } from "../../layout/Layout";
import Api from "../../../tools/api";
import AppBar from "../../layout/AppBar";



export default function HomePage() {
    // init app state
    const appContext = useContext(AppContext)

    // init categories & other states
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [isAddingToOrder, setIsAddingToOrder] = useState(false);
    const [istoken, setIstoken] = useState(false);

    const [selectedProducts, setSelectedProducts] = useState([]); // State to store selected products
    // setIstoken(localStorage.getItem("token"));

    // set fetching categories from API function
    const getCategories = async () => {
        // call API                        
        const response = await Api.fetch({ url: 'categories' })

        // check response
        if (response != null)
            setCategories(response.data) // update state with recevied categories
    }

    // set fetching products from API function
    const getProducts = async () => {
        // call API
        let params
        if (appContext.appState.search != null) {
            params = { name: appContext.appState.search }
        }
        if (appContext.appState.category != null) {
            params = { ...params, category: appContext.appState.category }
        }
        const response = await Api.fetch({
            url: 'products', params: params,
        })

        // check response
        if (response != null) {
            const productsRes = []
            if (response.data != null) {
                for (const keyIndex in response.data) {
                    // object: key - array: index
                    productsRes.push(response.data[keyIndex])
                }
            }
            setProducts(productsRes) // update state with recevied products       
        }
    }

    // set effect functionalities
    useEffect(() => {
        // component did mount => get & update categories from back-end        
        if (categories.length == 0) getCategories()
        getProducts()
    }, [appContext.appState.search, appContext.appState.category])

    const handleProductSelection = (productId, isChecked) => {
        if (isChecked) {
            // Add the selected product to the selectedProducts array
            setSelectedProducts(prevState => [...prevState, productId]);
        } else {
            // Remove the deselected product from the selectedProducts array
            setSelectedProducts(prevState => prevState.filter(id => id !== productId));
        }
    };

    const addToOrder = async () => {
        // Prevent multiple clicks while the product is being added to the order
        if (isAddingToOrder) return;

        setIsAddingToOrder(true);

        // Construct the products array with the desired structure
        const productsToAdd = products
            .filter(product => selectedProducts.includes(product.id)) // Filter only selected products
            .map(product => ({
                id: product.id,
                qty: 1, // Assuming you're adding one quantity for each product
                price: product.price
            }));

        // Call an API to add the products to the order
        try {
            // Assuming there's an API endpoint to add the products to the order
            
            await Api.fetch({
                url: `addorders`,
                method: "POST",
                body: { products: productsToAdd },
                token: localStorage.getItem("token"),
            });
             setIstoken(appContext.appState.token);
            setIsAddingToOrder(false); // Reset the state after successfully adding the products to the order
        } catch (error) {
            console.error("Error adding products to order:", error);
            setIsAddingToOrder(false); // Reset the state in case of an error
            // Handle error appropriately, e.g., show an error message
        }
    };

    return <div > 
                <AppBar/>
                <div className={styles.home}>
                <Categories categories={categories} />
                {
                    (products == null || products.length == 0) ?
                        <h2 style={{textAlign:"center"}}>No Product has been found!</h2>
                        :
                        <div className={styles.products}>
                            {products.map((el, index) => 
                                <Product 
                                    key={el.id} 
                                    product={el} 
                                    addToOrder={addToOrder} 
                                    handleProductSelection={handleProductSelection} 
                                    selectedProducts={selectedProducts}
                                    istoken={istoken}
                                />
                            )}
                        </div>
                }
                  </div>
             </div>
}
