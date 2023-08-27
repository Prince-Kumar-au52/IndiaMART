async function FetchData() {
    try {
      let res = await fetch(
        "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products"
      );
      res = await res.json();
      FilterData(res.data);
      //  console.log(data)
    } catch (err) {
      console.log("error", err);
    }
  }

  FetchData();
  let filterby = document.getElementById("filter");
  filterby.addEventListener("change", () => {
    FetchData();
  });
  function FilterData(data) {
    if (filterby.value === "") {
      DisplayData(data);
    } else {
      data = data.filter((ele) => {
        return ele.category == filterby.value;
      });
      DisplayData(data);
    }
   
  }



  let Cart = JSON.parse(localStorage.getItem("cart")) || [];

  let Container = document.getElementById("product-container");
  function DisplayData(data) {
    Container.innerHTML = "";
    data.forEach((product) => {
      let Card = document.createElement("div");
      let Image = document.createElement("img");
      let Brand = document.createElement("h2");
      let Category = document.createElement("h4");
      let Price = document.createElement("h3");
      let Detail = document.createElement("p");
      let AddtoCart = document.createElement("button");



      Image.src = product.img;
      Brand.textContent = product.brand;
      Category.textContent = product.category;
      Price.textContent = `₹${product.price}`;
      Detail.textContent = product.details;
      AddtoCart.textContent = "Add To Cart";

      

      AddtoCart.addEventListener("click", () => {
        if (checkDuplicate(product)) {
          alert("Product Already in Cart");
        } else {
          Cart.push({ ...product, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(Cart));
          alert("Product Added To Cart");
        }
      });

      Card.append(Image, Brand, Price, Detail, Category, AddtoCart);
      Container.append(Card);
    });

    console.log("display", data);
  }

  function checkDuplicate(product) {
    for (let i = 0; i < Cart.length; i++) {
      if (Cart[i].id == product.id) {
        return true;
      }
    }
    return false;
  }