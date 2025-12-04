import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/Products.css";

function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [brands, setBrands] = useState([]);

  const [categories, setCategories] = useState([
    { id: "all", name: "All Products" },
  ]);

  useEffect(() => {
    fetchCategories();
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchInput(searchParam);
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      const categoryList = [{ id: "all", name: "All Products" }];
      data.forEach((cat) => {
        const slug = typeof cat === "string" ? cat : cat.slug;
        const name =
          typeof cat === "string"
            ? cat
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : cat.name;
        categoryList.push({ id: slug, name: name });
      });
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const [addedToCart, setAddedToCart] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(items);
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const toggleWishlist = (product, e) => {
    e.stopPropagation();
    const items = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const exists = items.find(item => item.id === product.id);
    
    if (exists) {
      const updated = items.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setWishlist(updated);
    } else {
      const updated = [...items, product];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setWishlist(updated);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  useEffect(() => {
    if (categories.length > 1) {
      fetchProducts();
    }
  }, [
    selectedCategory,
    searchTerm,
    currentPage,
    sortBy,
    order,
    categories,
    selectedBrands,
    minRating,
    inStockOnly,
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = "";

      if (searchTerm) {
        url = `https://dummyjson.com/products/search?q=${searchTerm}`;
      } else if (selectedCategory !== "all") {
        url = `https://dummyjson.com/products/category/${selectedCategory}`;
      } else {
        url = "https://dummyjson.com/products";
      }

      const skip = (currentPage - 1) * 12;
      const separator = url.includes("?") ? "&" : "?";
      url += `${separator}limit=12&skip=${skip}`;

      const response = await fetch(url);
      const data = await response.json();

      let filteredProducts = data.products || [];

      // Extract unique brands
      const uniqueBrands = [...new Set(filteredProducts.map(p => p.brand).filter(Boolean))];
      setBrands(uniqueBrands);

      // Apply price filter
      if (minPrice || maxPrice) {
        filteredProducts = filteredProducts.filter((p) => {
          const price = p.price;
          if (minPrice && price < Number(minPrice)) return false;
          if (maxPrice && price > Number(maxPrice)) return false;
          return true;
        });
      }

      // Apply brand filter
      if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand));
      }

      // Apply rating filter
      if (minRating) {
        filteredProducts = filteredProducts.filter(p => p.rating >= Number(minRating));
      }

      // Apply stock filter
      if (inStockOnly) {
        filteredProducts = filteredProducts.filter(p => p.stock > 0);
      }

      // Apply sorting
      if (sortBy === "price") {
        filteredProducts.sort((a, b) =>
          order === "asc" ? a.price - b.price : b.price - a.price
        );
      } else if (sortBy === "title") {
        filteredProducts.sort((a, b) =>
          order === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
      }

      setProducts(filteredProducts);
      const total = data.total || filteredProducts.length;
      setTotalPages(Math.ceil(total / 12));
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "price-asc") {
      setSortBy("price");
      setOrder("asc");
    } else if (value === "price-desc") {
      setSortBy("price");
      setOrder("desc");
    } else if (value === "name-asc") {
      setSortBy("title");
      setOrder("asc");
    } else {
      setSortBy("title");
      setOrder("asc");
    }
    setCurrentPage(1);
  };

  const applyPriceFilter = () => {
    setCurrentPage(1);
    fetchProducts();
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("all");
    setSearchTerm("");
    setSearchInput("");
    setSortBy("title");
    setOrder("asc");
    setSelectedBrands([]);
    setMinRating("");
    setInStockOnly(false);
    setCurrentPage(1);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading ShopEase Products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <nav className="products-nav">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <span className="logo-text">
                Shop<span className="logo-accent">Ease</span>
              </span>
            </Link>
            <nav className="main-nav">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/products" className="nav-link">
                Shop
              </Link>
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
              <Link to="/wishlist" className="nav-link">
                Wishlist
              </Link>
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </nav>

      <main className="products-main">
        <div className="products-hero">
          <h1>ShopEase Collection</h1>
          <p>Discover amazing products at great prices</p>
        </div>

        <div className="filters-section">
          <h2 className="filters-title">Sort & Filter</h2>
          
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="search-bar-input"
            />
            <button onClick={handleSearch} className="search-bar-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}>
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Search
            </button>
          </div>

          <div className="filters-header">
            <div className="more-categories">
              <select
                className="category-dropdown"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sort-filter-controls">
              <select 
                onChange={handleSortChange} 
                className="sort-select"
                value={sortBy === 'price' ? `price-${order}` : 'name-asc'}
              >
                <option value="" disabled>Sort By</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="filter-toggle-btn"
              >
                {showFilters ? "Hide Filters" : "More Filters"}
              </button>
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear All
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="advanced-filters">
              <div className="filter-group">
                <label>Price Range:</label>
                <div className="price-filter">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="price-input"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="price-input"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Brand:</label>
                <div className="brand-filter">
                  {brands.slice(0, 8).map(brand => (
                    <label key={brand} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>Minimum Rating:</label>
                <select
                  value={minRating}
                  onChange={(e) => { setMinRating(e.target.value); setCurrentPage(1); }}
                  className="rating-select"
                >
                  <option value="">All Ratings</option>
                  <option value="4">4★ & above</option>
                  <option value="3">3★ & above</option>
                  <option value="2">2★ & above</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => { setInStockOnly(e.target.checked); setCurrentPage(1); }}
                  />
                  In Stock Only
                </label>
              </div>
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{margin: '0 auto 16px'}}>
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <button 
                  className={`wishlist-heart ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={(e) => toggleWishlist(product, e)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <div className="product-image" onClick={() => navigate(`/product/${product.id}`)} style={{cursor: 'pointer'}}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-img"
                  />
                  <div className="product-overlay">
                    <button className="quick-view">Quick View</button>
                  </div>
                </div>

                <div className="product-info" onClick={() => navigate(`/product/${product.id}`)} style={{cursor: 'pointer'}}>
                  <h3 className="product-name">{product.title}</h3>
                  <p className="product-description">{product.description}</p>

                  <div className="product-rating">
                    <div className="stars">★★★★★</div>
                    <span className="rating-text">{product.rating}</span>
                  </div>

                  <div className="product-price">${product.price}</div>

                  <button 
                    className="add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    {addedToCart === product.id ? 'Added to Cart ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}



        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ←
            </button>

            {(() => {
              const pages = [];
              const startPage = Math.max(1, currentPage - 1);
              const endPage = Math.min(totalPages, startPage + 2);
              const adjustedStart = Math.max(1, endPage - 2);
              
              for (let i = adjustedStart; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-btn ${currentPage === i ? "active" : ""}`}
                  >
                    {i}
                  </button>
                );
              }
              return pages;
            })()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Products;
