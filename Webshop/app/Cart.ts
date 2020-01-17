export class Cart {
    total = 0.00;
    products = [];

    constructor(){
        this.products = new Array();
    }

    getTotal(){
        this.calculateTotal()
        return this.total;
    }

    addToCart(product: any){

        if (this.products.find(p => p.id === product.id) != undefined){
            this.incrementProductAmount(product);
        }else{
            product.amount = 1;
            this.products.push(product);
        }
        this.calculateTotal();
    }

    getCart(){
        return this;
    }

    calculateTotal(){
        this.total = 0;
        this.products.forEach(p =>{
            this.total += p.amount * p.price;
        });
        this.total.toFixed(2);
    }

    removeFromCart(product: any){
        const index = this.products.findIndex(p => p.id == product.id);
        this.products.splice(index, 1);
    }

    incrementProductAmount(product: any){
        const productToIncrement = this.products.find(p => p.id == product.id);
        productToIncrement.amount++;
        this.total += product.price;
        this.calculateTotal();
    }

    decrementProductAmount(product: any){
        console.log(product.id);
        const productToIncrement = this.products.find(p => p.id == product.id);
        this.total -= product.price;
        console.log(productToIncrement.id);
        
        if (productToIncrement.amount-- === 1){
            this.removeFromCart(productToIncrement);
        }
        this.calculateTotal();
    }
}