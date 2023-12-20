import React from "react";
import { Nav, NavDropdown, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavBarCategories = ({ categories, products }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav-menu">
        <nav className="nav-categories navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav navbar-menu">
            {categories?.slice(0, 4).map((category) => {
              return (
                <li
                  className="nav-item dropdown"
                  key={category._id}
                  onClick={() =>
                    navigate("/products", {
                      state: { category: category._id },
                    })
                  }
                >
                  <Link
                    className="li-cat nav-link dropdown-toggle nav-menu-link col-md-3"
                    id="womenDropdown"
                    role="button"
                    data-toggle="dropdown"
                  >
                    {category.name}
                  </Link>
                  <div className="dropdown-menu cat-drop">
                    {products?.map((product) => {
                      return (
                        product.category === category._id && (
                          <Link
                            className="dropdown-item"
                            key={product._id}
                            to={`/products/${product._id}`}
                          >
                            <Image
                              src={product?.image?.[0]}
                              width={"30px"}
                              alt={product.name}
                              rounded
                            ></Image>
                            {product.name.toUpperCase().substring(0, 50)}
                          </Link>
                        )
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBarCategories;
